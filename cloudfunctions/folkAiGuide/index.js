// cloudfunctions/folkAiGuide/index.js
const cloud = require('wx-server-sdk');
const https = require('https');
cloud.init();

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // 请替换为您的DeepSeek API密钥

const PROMPT_TEMPLATES = {
  // 路线生成
  route: (points, routeType) => {
    const routeDescriptions = {
      family: '亲子民俗路线，选择适合家庭参观、互动性强的民俗点位，适合带孩子了解传统文化',
      experience: '非遗体验路线，选择可以动手体验、参与感强的非遗项目点位',
      festival: '节庆打卡路线，选择与节庆习俗相关的点位，适合节日期间参观',
      recommended: '推荐路线，选择最具代表性的民俗点位，综合展示传统文化'
    };

    const pointList = points.map(point => `${point.id}: ${point.name} (${point.zoneName} - ${point.theme})`).join('\n');

    return `
你是一位专业的民俗文化馆导览专家，请根据以下民俗点位列表，为${routeDescriptions[routeType]}生成一个合理的游览路线。

点位列表：
${pointList}

请返回一个点位ID的数组，按照游览顺序排列，确保路线合理且高效。
输出格式：只返回点位ID数组，如["p1", "p3", "p5"]
`;
  },

  // 背景故事生成
  story: (point) => `
请为以下民俗点位创作一个生动的背景故事，让参观者能够更好地理解和感受这个民俗文化。

点位名称：${point.name}
民俗主题：${point.theme}
简介：${point.description}

要求：
1. 故事要生动有趣，富有感染力
2. 结合历史背景和文化内涵
3. 字数在200-300字之间
4. 语言要通俗易懂，适合大众阅读
5. 可以包含相关的历史典故或民间传说

请直接返回故事内容，不要添加其他说明。`
};

// 发送HTTP请求到DeepSeek API
function callDeepSeekAPI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一位专业的民俗文化专家，擅长讲述生动有趣的民俗故事和规划合理的文化游览路线。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
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
  const { type, routeType, points, pointId, params } = event;

  try {
    // 处理路线生成请求
    if (type === 'route') {
      const prompt = PROMPT_TEMPLATES[type](points, routeType);

      let result;
      try {
        const apiResult = await callDeepSeekAPI(prompt);
        // 解析AI返回的数组
        try {
          const arrayMatch = apiResult.match(/\[(.*?)\]/s);
          if (arrayMatch) {
            const arrayStr = '[' + arrayMatch[1] + ']';
            result = JSON.parse(arrayStr);
          } else {
            result = getFallbackRoute(routeType);
          }
        } catch (parseError) {
          console.error('Failed to parse route result:', parseError);
          result = getFallbackRoute(routeType);
        }
      } catch (apiError) {
        console.error('DeepSeek API error:', apiError);
        result = getFallbackRoute(routeType);
      }

      return { route: result };
    }

    // 处理背景故事生成请求
    if (type === 'story') {
      const prompt = PROMPT_TEMPLATES[type](params);

      let result;
      try {
        result = await callDeepSeekAPI(prompt);
      } catch (apiError) {
        console.error('DeepSeek API error:', apiError);
        result = getFallbackStory(params);
      }

      // 保存到数据库
      try {
        const db = cloud.database();
        await db.collection('ai_stories').add({
          data: {
            pointId: pointId,
            pointName: params.name,
            story: result,
            createTime: new Date()
          }
        });
      } catch (e) {
        console.log('Failed to save story to database:', e);
      }

      return { story: result };
    }

    // 处理聊天请求
    if (type === 'chat') {
      const prompt = `
你是一位专业的民俗文化专家，擅长用通俗易懂的语言向青少年讲解民俗文化知识。

请回答以下问题：
${question}

要求：
1. 回答要准确、全面，符合历史事实
2. 语言要生动有趣，适合青少年理解
3. 可以适当加入故事性元素，增强吸引力
4. 回答长度控制在200-300字之间
5. 避免使用过于专业的术语

请直接返回回答内容，不要添加其他说明。`;

      let result;
      try {
        result = await callDeepSeekAPI(prompt);
      } catch (apiError) {
        console.error('DeepSeek API error:', apiError);
        result = '抱歉，我暂时无法回答这个问题，请尝试其他问题。';
      }

      return { answer: result };
    }

    return { error: 'Unknown request type' };
  } catch (error) {
    console.error('Error in folkAiGuide:', error);

    if (type === 'route') {
      return { route: getFallbackRoute(routeType) };
    }
    if (type === 'story') {
      return { story: getFallbackStory(params) };
    }

    return { error: 'Internal server error' };
  }
};

// 降级路线
function getFallbackRoute(routeType) {
  const fallbackRoutes = {
    family: ['p1', 'p4', 'p6', 'p8', 'p10'],
    experience: ['p2', 'p4', 'p6', 'p8', 'p10'],
    festival: ['p1', 'p3', 'p5', 'p7', 'p9'],
    recommended: ['p1', 'p3', 'p5', 'p7', 'p9']
  };

  return fallbackRoutes[routeType] || fallbackRoutes.recommended;
}

// 降级故事
function getFallbackStory(params) {
  return `${params.name}承载着深厚的民俗文化传统。${params.description}这一民俗活动源远流长，凝聚着中华民族的智慧与情感。在历史的长河中，它不仅是人们日常生活的重要组成部分，更是传承文化、凝聚情感的重要纽带。每一个参与其中的人，都能感受到传统文化的魅力与温度。`;
}
