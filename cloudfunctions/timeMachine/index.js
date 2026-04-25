const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const crypto = require('crypto');

// 生成查询指纹
function hashQuery(heritageId, era, choices) {
  const str = `${heritageId}|${era}|${choices.join(',')}`;
  return crypto.createHash('md5').update(str).digest('hex');
}

exports.main = async (event, context) => {
  const { heritageId, era, userChoice, choiceHistory = [] } = event;
  const fullHistory = [...choiceHistory, userChoice];
  
  try {
    // ========== 第一层：查本地知识库 ==========
    const baseInfo = await db.collection('heritage_base')
      .doc(heritageId)
      .get();
    
    const eraData = baseInfo.data.eraFacts[era];
    const currentDecision = eraData.decisions[fullHistory.length - 1];
    
    // 找到用户选择的选项
    const selectedOption = currentDecision.options.find(
      opt => opt.id === userChoice
    );
    
    // ========== 第二层：查AI缓存 ==========
    const queryHash = hashQuery(heritageId, era, fullHistory);
    const cacheHit = await db.collection('ai_cache')
      .where({ queryHash })
      .get();
    
    if (cacheHit.data.length > 0) {
      // 缓存命中，更新使用计数
      await db.collection('ai_cache').doc(cacheHit.data[0]._id).update({
        data: { useCount: db.command.inc(1) }
      });
      
      return {
        source: 'cache',
        base: {
          scene: currentDecision.scene,
          role: currentDecision.role,
          isCorrect: selectedOption.correct,
          optionText: selectedOption.text
        },
        ai: cacheHit.data[0].aiContent,
        tokenCost: 0
      };
    }
    
    // ========== 第三层：调用DeepSeek（控制触发条件）==========
    
    // 触发策略：只有"复杂路径"才调用AI
    const shouldCallAI = checkAITrigger(fullHistory, selectedOption);
    
    if (!shouldCallAI) {
      // 使用预存模板
      const templateResult = fillTemplate(
        currentDecision.resultTemplate,
        selectedOption,
        eraData
      );
      
      return {
        source: 'template',
        base: {
          scene: currentDecision.scene,
          role: currentDecision.role,
          isCorrect: selectedOption.correct,
          optionText: selectedOption.text
        },
        content: templateResult,
        tokenCost: 0
      };
    }
    
    // 调用腾讯云内置 deepseek
    const prompt = buildPrompt({
      heritageName: baseInfo.data.name,
      era,
      eraFacts: eraData,
      role: currentDecision.role,
      scene: currentDecision.scene,
      userChoice: selectedOption.text,
      isCorrect: selectedOption.correct,
      history: fullHistory
    });
    
    const aiResult = await cloud.callAI({
      model: 'deepseek',
      messages: [
        { role: 'system', content: '你是一位严谨的历史文化叙事者，熟悉中国非遗技艺的历史演变。输出必须基于史实，不得虚构未证实的内容。' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 350,
      temperature: 0.6  // 降低随机性，保证史实准确
    });
    
    // 解析AI输出
    const parsed = parseAIOutput(aiResult.result);
    
    // 写入缓存
    await db.collection('ai_cache').add({
      data: {
        queryHash,
        heritageId,
        era,
        choicePath: fullHistory,
        aiContent: parsed,
        createTime: db.serverDate(),
        useCount: 1,
        tokenCost: aiResult.usage?.total_tokens || 0
      }
    });
    
    return {
      source: 'ai',
      base: {
        scene: currentDecision.scene,
        role: currentDecision.role,
        isCorrect: selectedOption.correct,
        optionText: selectedOption.text
      },
      ai: parsed,
      tokenCost: aiResult.usage?.total_tokens || 0
    };
    
  } catch (err) {
    return { error: err.message };
  }
};

// 判断是否触发AI：复杂路径或首次错误
function checkAITrigger(history, selectedOption) {
  // 策略1：用户连续2次错误，需要AI生成鼓励性解释
  const recentWrong = history.slice(-2).filter((h, i) => {
    // 简化判断，实际需查数据库
    return false; 
  }).length;
  
  // 策略2：第3个及以上决策点，路径组合多，无预存
  if (history.length >= 3) return true;
  
  // 策略3：特定关键决策（如"转型/坚守"类选择）
  const keyDecisions = ['转型', '坚守', '创新', '放弃'];
  const isKeyDecision = keyDecisions.some(k => 
    selectedOption.text.includes(k)
  );
  
  return isKeyDecision || recentWrong >= 2;
}

// 构建Prompt（严格控制长度）
function buildPrompt({ heritageName, era, eraFacts, role, scene, userChoice, isCorrect, history }) {
  return `
非遗：${heritageName}
时代：${era}
史实约束：${eraFacts.keyTech}，代表窑口${eraFacts.representative}，${eraFacts.socialContext}

你的身份：${role}
场景：${scene}
用户选择："${userChoice}"（${isCorrect ? '符合史实' : '与史实有偏差'}）

请生成（严格JSON格式）：
{
  "narrative": "用第二人称'你'写即时场景叙事，80字内，有画面感",
  "consequence": "这个选择在该时代的长远后果，60字内，基于史实推演",
  "realReference": "对应的真实历史事件或文献记载，40字内",
  "reflection": "向用户提出的反思问题，20字内"
}
`;
}

// 解析AI输出
function parseAIOutput(raw) {
  try {
    // 提取JSON部分
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : {
      narrative: raw.slice(0, 80),
      consequence: "",
      realReference: "",
      reflection: ""
    };
  } catch {
    return {
      narrative: raw.slice(0, 100),
      consequence: "",
      realReference: "",
      reflection: ""
    };
  }
}

// 填充预存模板
function fillTemplate(template, option, eraData) {
  return {
    narrative: template[option.correct ? 'correct' : 'wrong']
      .replace('{option}', option.text)
      .replace('{era}', eraData.keyTech),
    consequence: `在${eraData.representative}的实践中，这代表了${eraData.socialContext.slice(0, 30)}...`,
    realReference: `参见《景德镇陶录》对${eraData.keyTech}的记载`,
    reflection: "如果是你，会如何平衡技艺与市场？"
  };
}