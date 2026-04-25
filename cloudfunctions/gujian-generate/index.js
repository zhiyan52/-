// cloudfunctions/gujian-generate/index.js
// 古建筑构件图片生成云函数 - 支持混元API + 本地后备库
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// ============================================
// 本地图片后备库 - 古建筑构件
// ============================================
const localImageLibrary = {
  "斗拱": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/f755ddffe515f9da438580307fab6855.jpg",
  "飞檐": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/9c4146c7c9686c90bc29fa58611d7f6b.jpg",
  "榫卯": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/23dadae4b6bbe13cda330381bf72cb56.jpg",
  "瓦当": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/4360808c464d73e08a468d2fd1a274f1.jpg",
  "藻井": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d76b5ad9e8519d90cf861091384b2027.jpg",
  "马头墙": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/7f88d2cba24ffb822706ea0df8c3a29a.jpg",
  "雀替": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/3a3bf09c166dd5637d8330660a3190bb.jpg",
  "柱础": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/5808894a5b74681599fc8c81f97e62fb.jpg",
  "default": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/default.jpg"
}

// 构件知识库
const knowledgeBase = {
  "斗拱": "斗拱是中国古建筑特有的构件，位于立柱与横梁之间，既能承重、抗震，又有极强的装饰性，也是建筑等级的象征。",
  "飞檐": "飞檐是中国古建筑屋顶的檐角向上翘起的部分，既利于排水，又造型优美，体现了古人'如鸟斯革，如翚斯飞'的审美。",
  "榫卯": "榫卯是古代工匠不用钉子，通过构件凹凸咬合实现连接的技艺，兼具结构稳定性与艺术性，是中国木构建筑的精髓。",
  "瓦当": "瓦当是古代建筑屋檐筒瓦顶端的遮挡部分，有圆形和半圆形，常刻有文字、图案，兼具实用与装饰功能。",
  "藻井": "藻井是中国古代建筑中天花板上的一种装饰，多为方形、圆形、八角形等，象征天宇，常绘有精美的图案。",
  "马头墙": "马头墙是徽派建筑的特色，高出屋顶的山墙，既防火又防风，造型如马头昂起，具有独特的艺术美感。",
  "雀替": "雀替是中国古建筑中置于梁枋与柱交接处的木构件，既加固结构，又有装饰作用，常雕刻精美图案。",
  "柱础": "柱础是建筑物柱子下面的石墩，既防潮又防腐，也有装饰功能，常见鼓形、方形、莲花形等造型。"
}

// 通用背景图
const genericBackgrounds = [
  "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/ancient.jpg",
  "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/traditional.jpg"
]

// ============================================
// 工具函数
// ============================================

function getLocalImage(keyword) {
  if (!keyword) return localImageLibrary["default"]

  for (const key of Object.keys(localImageLibrary)) {
    if (keyword.includes(key) || key.includes(keyword)) {
      return localImageLibrary[key]
    }
  }

  const index = Math.abs(hashCode(keyword)) % genericBackgrounds.length
  return genericBackgrounds[index]
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

// ============================================
// 腾讯混元Image API 调用
// ============================================

function generateTC3Signature(secretId, secretKey, service, host, action, payload, timestamp) {
  const date = new Date(timestamp * 1000).toISOString().split('T')[0]
  const httpRequestMethod = 'POST'
  const canonicalUri = '/'
  const canonicalQueryString = ''
  const canonicalHeaders = `content-type:application/json\nhost:${host}\n`
  const signedHeaders = 'content-type;host'
  const hashedRequestPayload = crypto.createHash('sha256').update(payload).digest('hex')
  const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`

  const algorithm = 'TC3-HMAC-SHA256'
  const credentialScope = `${date}/${service}/tc3_request`
  const hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex')
  const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`

  const secretDate = crypto.createHmac('sha256', `TC3${secretKey}`).update(date).digest()
  const secretService = crypto.createHmac('sha256', secretDate).update(service).digest()
  const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request').digest()
  const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex')

  const authorization = `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
  return authorization
}

async function callHunyuanAPI(prompt, size = "1024x1024") {
  const secretId = process.env.TENCENT_SECRET_ID
  const secretKey = process.env.TENCENT_SECRET_KEY

  if (!secretId || !secretKey) {
    throw new Error('Hunyuan API credentials not configured')
  }

  const service = 'hunyuan'
  const host = 'hunyuan.tencentcloudapi.com'
  const action = 'GenerateImage'
  const version = '2023-09-01'
  const timestamp = Math.floor(Date.now() / 1000)

  const payload = JSON.stringify({
    Prompt: prompt,
    ImageSize: size,
    Enable_Picture_Audio: false
  })

  const authorization = generateTC3Signature(secretId, secretKey, service, host, action, payload, timestamp)

  const options = {
    hostname: host,
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Host': host,
      'X-Action': action,
      'X-Version': version,
      'X-Timestamp': timestamp.toString(),
      'Authorization': authorization,
      'X-Region': 'ap-guangzhou'
    }
  }

  return new Promise((resolve, reject) => {
    const https = require('https')

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          if (result.Response && result.Response.ImageResults && result.Response.ImageResults.length > 0) {
            resolve(result.Response.ImageResults[0].ImageUrl)
          } else if (result.Response && result.Response.Error) {
            reject(new Error(result.Response.Error.Message || 'API Error'))
          } else {
            reject(new Error('Invalid API response'))
          }
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

// ============================================
// 云函数入口
// ============================================

exports.main = async (event, context) => {
  const { userDesc } = event

  if (!userDesc) {
    return { success: false, error: "请输入古建描述" }
  }

  // 提取构件类型
  let component = "古建筑"
  const components = Object.keys(localImageLibrary)
  for (const comp of components) {
    if (userDesc.includes(comp)) {
      component = comp
      break
    }
  }

  // 构建提示词
  const prompt = `中国古代建筑，${userDesc}，正面特写，展示营造技艺细节，工笔画风格，高清线稿+上色，无多余元素`

  // 获取知识介绍
  const knowledgeText = knowledgeBase[component] || "这是一种具有独特历史价值和艺术魅力的古建筑构件，展现了中国传统建筑的精髓。"

  // 优先尝试混元API
  try {
    const imageUrl = await callHunyuanAPI(prompt, "1024x1024")
    return {
      success: true,
      imageUrl: imageUrl,
      source: 'hunyuan',
      intro: knowledgeText
    }
  } catch (hunyuanError) {
    console.log('混元API调用失败，使用本地后备方案:', hunyuanError.message)

    // 后备方案：返回本地图片
    const localImage = getLocalImage(component)
    return {
      success: true,
      imageUrl: localImage,
      source: 'local_backup',
      intro: knowledgeText,
      note: '混元API暂时不可用，已使用本地后备图片'
    }
  }
}
