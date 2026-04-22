// cloudfunctions/agentChat/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { message, history = [] } = event;

  if (!message) {
    return {
      code: 400,
      error: "消息内容不能为空"
    };
  }

  try {
    // 调用云开发AI Bot服务
    const botId = event.botId || 'ibot-guyawenxuan-248676-6-1401141450.sh.run.tcloudbase.com';

    // 使用云托管方式调用Agent服务
    const res = await cloud.callContainer({
      config: {
        env: cloud.DYNAMIC_CURRENT_ENV
      },
      path: '/',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        botId: botId,
        msg: message,
        history: history
      }
    });

    return {
      code: 200,
      data: {
        message: res.data.message || res.data.content || res.data,
        content: res.data.message || res.data.content || res.data
      }
    };
  } catch (err) {
    console.error("AI Bot调用失败：", err);
    return {
      code: 500,
      error: err.message || "AI助手暂时无法回答您的问题，请稍后重试"
    };
  }
};