// cloudfunctions/heritageAI/index.js
const cloud = require('wx-server-sdk');
const https = require('https');
cloud.init();

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // 请替换为您的DeepSeek API密钥

const PROMPT_TEMPLATES = {
  // 历史假设：严格控制边界
  story: (treasure, milestone, whatIf) => `
你是一位严谨的中国艺术史学者。请基于以下史实，对"${whatIf}"进行合理推演。
必须遵守：
1. 不虚构重大历史事件
2. 不改变已确认的人物关系
3. 明确标注"此为假设"

藏品：${treasure.meta ? treasure.meta.name : treasure.name}
当前节点：${milestone.year}年，${milestone.title}
已知史实：${milestone.event}
相关背景：${milestone.detail ? milestone.detail.text : ''}

请写一段150字内的推演，语言典雅，结尾用"——此为历史假设"收束。`,

  // 节点题诗
  poem: (treasure, milestone) => `
为${treasure.meta ? treasure.meta.name : treasure.name}的流传节点题诗：
${milestone.year}年，${milestone.location.name}，${milestone.title}。
${milestone.event.slice(0, 50)}...

写一首七言绝句，嵌入地名，含蓄深沉，50字内。`,

  // 跨作品比较
  compare: (t1, t2, node1, node2) => `
比较两件作品在相似节点的命运：
A：${t1.meta ? t1.meta.name : t1.name}，${node1.year}年于${node1.location.name}，${node1.title}
B：${t2.meta ? t2.meta.name : t2.name}，${node2.year}年于${node2.location.name}，${node2.title}

分析异同，200字内，不评判高下。`,

  // 路线生成
  route: (exhibits, routeType) => {
    const routeDescriptions = {
      quick: '快速打卡路线，选择最具代表性的展品，适合时间有限的游客',
      deep: '深度研学路线，包含更多展品，适合对文化艺术有深入兴趣的游客',
      family: '亲子路线，选择适合儿童理解和欣赏的展品，互动性强'
    };

    const exhibitList = exhibits.map(exhibit => `${exhibit.id}: ${exhibit.name} (${exhibit.zoneName})`).join('\n');

    return `
你是一位专业的博物馆导览专家，请根据以下展品列表，为${routeDescriptions[routeType]}生成一个合理的游览路线。

展品列表：
${exhibitList}

请返回一个展品ID的数组，按照游览顺序排列，确保路线合理且高效。
输出格式：只返回展品ID数组，如["ex1", "ex3", "ex5"]
`;
  }
};

// 发送HTTP请求到DeepSeek API
function callDeepSeekAPI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一位严谨的中国艺术史学者，擅长基于史实进行合理的历史推演。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const options = {
      hostname: 'api.deepseek.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        try {
          const jsonResponse = JSON.parse(body);
          if (jsonResponse.choices && jsonResponse.choices[0]) {
            resolve(jsonResponse.choices[0].message.content);
          } else {
            reject(new Error('Invalid API response'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

exports.main = async (event) => {
  const { type, treasureId, milestoneId, userId, params, routeType, exhibits } = event;

  try {
    // 处理路线生成请求
    if (type === 'route') {
      // 构建提示词
      const prompt = PROMPT_TEMPLATES[type](exhibits, routeType);

      // 调用 DeepSeek
      let result;
      try {
        const apiResult = await callDeepSeekAPI(prompt);
        // 解析AI返回的数组
        try {
          // 提取数组部分
          const arrayMatch = apiResult.match(/\[(.*?)\]/s);
          if (arrayMatch) {
            const arrayStr = '[' + arrayMatch[1] + ']';
            result = JSON.parse(arrayStr);
          } else {
            // 降级：返回默认路线
            result = getFallbackRoute(routeType);
          }
        } catch (parseError) {
          console.error('Failed to parse route result:', parseError);
          // 降级：返回默认路线
          result = getFallbackRoute(routeType);
        }
      } catch (apiError) {
        console.error('DeepSeek API error:', apiError);
        // API调用失败时返回降级响应
        result = getFallbackRoute(routeType);
      }

      return { route: result };
    }

    // 处理其他类型请求
    // 获取数据
    const db = cloud.database();
    let treasure;
    let milestone;

    try {
      const treasureRes = await db.collection('collection_core').doc(treasureId).get();
      treasure = treasureRes.data;

      if (treasure && treasure.heritage && treasure.heritage.milestones) {
        milestone = treasure.heritage.milestones.find(m => m.id === milestoneId);
      }
    } catch (e) {
      console.log('Database not available, using mock data');
    }

    // 如果数据库没有数据，使用mock数据
    if (!treasure) {
      const MOCK_DATA = require('./mock-data.js');
      treasure = MOCK_DATA;
      milestone = MOCK_DATA.heritage.milestones.find(m => m.id === milestoneId);
    }

    if (!milestone) {
      // 如果找不到特定节点，使用第一个节点
      milestone = treasure.heritage.milestones[0];
    }

    // 构建提示词
    const prompt = PROMPT_TEMPLATES[type](treasure, milestone, params.whatIf);

    // 调用 DeepSeek
    let result;
    try {
      result = await callDeepSeekAPI(prompt);
    } catch (apiError) {
      console.error('DeepSeek API error:', apiError);
      // API调用失败时返回降级响应
      result = getFallbackResponse(type, params.whatIf, milestone);
    }

    // 特殊：假设类结果存入独立集合，供审核/学习
    if (type === 'story') {
      try {
        await db.collection('ai_whatifs').add({
          data: {
            treasureId,
            milestoneId: milestone.id,
            question: params.whatIf,
            result: result,
            userId,
            status: 'active',
            createTime: new Date()
          }
        });
      } catch (e) {
        console.log('Failed to save to database:', e);
      }
    }

    return { result: result };
  } catch (error) {
    console.error('Error in heritageAI:', error);
    // 降级处理
    if (type === 'route') {
      return { route: getFallbackRoute(routeType) };
    }
    return { result: '推演过程中出现错误，请稍后再试。' };
  }
};

// 降级响应
function getFallbackResponse(type, whatIf, milestone) {
  if (type === 'story') {
    const fallbacks = {
      '不分开': '若1652年未被火焚，全卷或归清宫完整保存。然世事无常，聚散有时，今日之憾，或成他日之幸。——此为历史假设',
      '1652': '若1652年未被火焚，全卷或归清宫完整保存。然世事无常，聚散有时，今日之憾，或成他日之幸。——此为历史假设',
      '乾隆': '若乾隆得此卷时知其真伪，或不会题跋满纸。然其题跋亦成文化之痕，是耶非耶，难以定论。——此为历史假设',
      '1948': '若1948年全卷赴台，两岸人民或可共同欣赏此中华瑰宝。然历史不能假设，今日之憾，犹可弥补。——此为历史假设',
      'default': `关于"${whatIf}"，历史无假设，然想象可通古今。此作历经七百年，每一次流转皆为时代之痕，不可易也。——此为历史假设`
    };

    for (const key in fallbacks) {
      if (whatIf.includes(key)) return fallbacks[key];
    }
    return fallbacks.default;
  }

  if (type === 'poem') {
    return '墨香千年绕画楼，富春山水意难收。\n谁知此卷分离苦，珍重当期共赏秋。';
  }

  return '推演过程中出现错误，请稍后再试。';
}

// 降级路线
function getFallbackRoute(routeType) {
  const fallbackRoutes = {
    quick: ['ex1', 'ex3', 'ex5', 'ex7'],
    deep: ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6'],
    family: ['ex1', 'ex3', 'ex5', 'ex7', 'ex9'],
    recommended: ['ex1', 'ex3', 'ex5', 'ex7', 'ex9']
  };

  return fallbackRoutes[routeType] || fallbackRoutes.recommended;
}
