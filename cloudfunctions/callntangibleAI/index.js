const cloud = require('wx-server-sdk')
const tencentcloud = require('tencentcloud-sdk-nodejs')
const axios = require('axios')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 从环境变量读取密钥
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY

// DeepSeek 非遗问答：工序拆解 + 技法讲解 + 作品改进建议
async function deepseek(prompt) {
  const res = await axios({
    method: 'POST',
    url: 'https://api.deepseek.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    data: {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "你是非遗技艺专业指导老师，擅长拆解工序、讲解关键技法细节、给出练习作品改进建议，语言清晰易懂，步骤详细，重点突出，适合学习参考。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4
    }
  })
  return res.data.choices[0].message.content
}

// 混元图像生成
async function hunyuan(prompt) {
  const AiartClient = tencentcloud.aiart.v20221229.Client
  const client = new AiartClient({
    credential: {
      secretId: TENCENT_SECRET_ID,
      secretKey: TENCENT_SECRET_KEY
    },
    region: "ap-beijing"
  })

  const params = {
    Prompt: `非遗技艺，${prompt}，国风手绘示意图，细节清晰，学习参考，干净简洁，无水印`,
    Resolution: "1024x1024",
    Style: "手绘"
  }

  const result = await client.TextToImageRapid(params)
  return result.Response.ImageUrls[0]
}

// 入口
exports.main = async (event) => {
  const { requestType, userContent } = event

  try {
    if (requestType === 'deepseek') {
      const data = await deepseek(userContent)
      return { success: true, data }
    }
    if (requestType === 'hunyuan') {
      const imageUrl = await hunyuan(userContent)
      return { success: true, imageUrl }
    }
    return { success: false, errMsg: '不支持的类型' }
  } catch (e) {
    console.error(e)
    return { success: false, errMsg: e.message }
  }
}