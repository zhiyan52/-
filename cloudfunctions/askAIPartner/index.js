// cloudfunctions/askAIPartner/index.js
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event) => {
  const { question, context, cacheKey } = event;
  
  // 第一层：查缓存
  const cache = await db.collection('ai_cache').where({ queryHash: cacheKey }).get();
  if (cache.data.length > 0) {
    return { answer: cache.data[0].answer, source: 'cache' };
  }
  
  // 第二层：查预存QA库
  const qaMatch = await db.collection('qa_database')
    .where({
      keywords: db.command.in(question.split('').slice(0, 4))
    })
    .get();
  
  if (qaMatch.data.length > 0) {
    const bestMatch = qaMatch.data[0];
    return { answer: bestMatch.answer.brief, source: 'qa_database' };
  }
  
  // 第三层：调用DeepSeek（极少触发）
  const prompt = `
你是非遗AI学伴，熟悉中国传统技艺。请用通俗语言回答，控制在100字内。

背景：用户在了解${context.craftName}的"${context.stepName}"工序。
该工序目的：${context.stepPurpose}

用户问题：${question}

师傅语录参考："${context.masterQuote.text}"（${context.masterQuote.author}）
`;

  const aiResult = await cloud.callAI({
    model: 'deepseek',
    messages: [
      { role: 'system', content: '你是非遗传承人的AI助手，回答基于传统技艺知识，不虚构。' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 150
  });
  
  const answer = aiResult.result;
  
  // 写入缓存
  await db.collection('ai_cache').add({
    data: {
      queryHash: cacheKey,
      question,
      answer,
      context,
      createTime: db.serverDate()
    }
  });
  
  return { answer, source: 'ai', tokenCost: aiResult.usage && aiResult.usage.total_tokens ? aiResult.usage.total_tokens : 0 };
};