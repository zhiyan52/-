 // cloudfunctions/nfyiyi_guide/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 引入axios用于调用DeepSeek
const axios = require('axios')

// DeepSeek API Key（建议在云函数环境变量里配置）
const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY || 'sk-db4358439d684158895f40d0a4612c4a'

exports.main = async (event, context) => {
  const { category } = event // 传入非遗品类，如：剪纸、刺绣、皮影

  if (!category) {
    return { success: false, msg: '请传入非遗品类' }
  }

  try {
    
    const guidePrompt = `
    你是一位专业的非遗文化导师。
    请为【${category}】设计一套完整的智能学习导览路径。
    要求：
    1. 结构清晰，分为 4 个步骤：【文化背景】→【核心工序】→【经典案例】→【创作灵感】。
    2. 每个步骤用一句话总结，语言通俗易懂，适合初学者。
    3. 输出格式严格遵循 JSON，不要有多余内容。
    示例格式：{"文化背景":"...","核心工序":"...","经典案例":"...","创作灵感":"..."}
    `

    const guideRes = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: guidePrompt }],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const guideData = JSON.parse(guideRes.data.choices[0].message.content)

     
    // 基于DeepSeek生成的「核心工序」生成教学示意图
    const imagePrompt = `
    一张专业的非遗文化教学示意图，主题：${category}的制作工序。
    风格：线条清晰、扁平化、中国风、适合教学展示。
    画面内容：还原${guideData['核心工序']}的关键动作与结构。
    要求：画面干净，无文字，无多余装饰，适合作为小程序学习页面的配图。
    `

    const imageRes = await cloud.openapi.ai.hunyuan.image.generate({
      Prompt: imagePrompt,
      Resolution: "768x768" 
    })

    const imageUrl = imageRes.Images[0].Url

     
    return {
      success: true,
      guide: guideData, // 结构化导览文案
      imageUrl: imageUrl // 生成的工序示意图
    }

  } catch (err) {
    console.error('导览生成失败：', err)
    return {
      success: false,
      msg: err.message || '生成失败，请稍后重试'
    }
  }
}