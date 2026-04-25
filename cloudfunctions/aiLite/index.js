// cloudfunctions/aiLite/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event) => {
  const { keyword } = event
  const key = "填写你的DeepSeek密钥";

  try {
    const res = await cloud.http.request({
      url: "https://api.deepseek.com/v1/chat/completions",
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      data: {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是非遗文化解说员，回答简短精简，50–80字，通俗易懂，贴合传统技艺。"
          },
          {
            role: "user",
            content: `简单补充介绍：${keyword}`
          }
        ],
        temperature: 0.8
      }
    })
    return {
      code: 200,
      content: res.data.choices[0].message.content
    }
  } catch (err) {
    return {
      code: -1,
      content: "AI拓展功能暂时不可用，请浏览本地完整资料。"
    }
  }
}