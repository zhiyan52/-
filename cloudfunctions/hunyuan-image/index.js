// cloudfunctions/hunyuan-image/index.js
// 混元Image生成云函数 - 支持腾讯混元API + 本地后备库
const cloud = require('wx-server-sdk')
const crypto = require('crypto')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// ============================================
// 本地图片后备库 - 传统建筑与民俗场景
// ============================================
const localImageLibrary = {
  // 古建筑构件类
  "斗拱": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/dougong.jpg",
  "飞檐": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/feiyan.jpg",
  "榫卯": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/sunmao.jpg",
  "瓦当": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/wadang.jpg",
  "藻井": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/zaojing.jpg",
  "马头墙": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/matouqiang.jpg",
  "雀替": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/queti.jpg",
  "柱础": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/components/zhuchu.jpg",

  // 民俗场景类
  "清明踏青": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qingming.jpg",
  "中秋赏月": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/zhongqiu.jpg",
  "春节贴春联": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/chunlian.jpg",
  "端午龙舟": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/duanwu.jpg",
  "重阳登高": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/chongyang.jpg",
  "立春迎春": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/lichun.jpg",
  "立夏尝新": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/lixia.jpg",
  "立秋贴秋膘": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/liqiu.jpg",
  "立冬补冬": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/lidong.jpg",

  // 民俗美食类
  "清明青团": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qingtuan.jpg",
  "中秋月饼": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/yuebing.jpg",
  "春节饺子": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jiaozi.jpg",
  "元宵汤圆": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/tangyuan.jpg",
  "端午粽子": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/zongzi.jpg",
  "腊八粥": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/labazhou.jpg",

  // 节气类
  "二十四节气": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi.jpg",
  "春分": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/chunfen.jpg",
  "夏至": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/xiazhi.jpg",
  "秋分": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qiufen.jpg",
  "冬至": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/dongzhi.jpg",

  // 通用古风背景图
  "古建筑": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/gujian.jpg",
  "民俗": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/minsu.jpg",
  "传统文化": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/wenhua.jpg",
  "水墨": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/shuimo.jpg",
  "工笔画": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/gongbi.jpg",

  // 默认图片
  "default": "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/default.jpg"
}

// 通用背景图列表
const genericBackgrounds = [
  "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/ancient.jpg",
  "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/traditional.jpg",
  "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/common/culture.jpg"
]

// ============================================
// 工具函数
// ============================================

// 根据关键词获取本地图片
function getLocalImage(keyword) {
  if (!keyword) return localImageLibrary["default"]

  // 精确匹配
  if (localImageLibrary[keyword]) {
    return localImageLibrary[keyword]
  }

  // 模糊匹配 - 检查关键词是否包含任何库中的key
  const keys = Object.keys(localImageLibrary)
  for (const key of keys) {
    if (keyword.includes(key) || key.includes(keyword)) {
      return localImageLibrary[key]
    }
  }

  // 根据关键词类型匹配通用图片
  const categoryMap = {
    "建筑": "古建筑",
    "传统": "传统文化",
    "民俗": "民俗",
    "水墨画": "水墨",
    "国画": "工笔画",
    "春天": "立春迎春",
    "夏天": "立夏尝新",
    "秋天": "立秋贴秋膘",
    "冬天": "立冬补冬"
  }

  for (const [k, v] of Object.entries(categoryMap)) {
    if (keyword.includes(k) && localImageLibrary[v]) {
      return localImageLibrary[v]
    }
  }

  // 使用哈希选择通用背景
  const index = Math.abs(hashCode(keyword)) % genericBackgrounds.length
  return genericBackgrounds[index]
}

// 简单的哈希函数
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

// 生成腾讯云签名
function generateTC3Signature(secretId, secretKey, service, host, action, payload, timestamp) {
  const date = new Date(timestamp * 1000).toISOString().split('T')[0]

  // 拼接签名字符串
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

  // 计算签名
  const secretDate = crypto.createHmac('sha256', `TC3${secretKey}`).update(date).digest()
  const secretService = crypto.createHmac('sha256', secretDate).update(service).digest()
  const secretSigning = crypto.createHmac('sha256', secretService).update('tc3_request').digest()
  const signature = crypto.createHmac('sha256', secretSigning).update(stringToSign).digest('hex')

  // 拼接Authorization头
  const authorization = `${algorithm} Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  return authorization
}

// 调用混元Image API
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

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        try {
          const result = JSON.parse(data)

          if (result.Response && result.Response.ImageResults && result.Response.ImageResults.length > 0) {
            const imageUrl = result.Response.ImageResults[0].ImageUrl
            resolve(imageUrl)
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
  const { keyword, prompt, size = "1024x1024" } = event

  // 参数验证
  if (!keyword && !prompt) {
    return {
      success: false,
      error: '请提供关键词或描述'
    }
  }

  // 构建最终提示词
  const finalPrompt = prompt || `${keyword} 中国传统风格，水墨画技法，古风，细腻典雅，文化底蕴深厚，高清`

  // 优先尝试混元API
  try {
    const imageUrl = await callHunyuanAPI(finalPrompt, size)
    return {
      success: true,
      imageUrl: imageUrl,
      source: 'hunyuan',
      keyword: keyword || prompt,
      prompt: finalPrompt
    }
  } catch (hunyuanError) {
    console.log('混元API调用失败，使用本地后备方案:', hunyuanError.message)

    // 后备方案：返回本地图片
    const localImage = getLocalImage(keyword)
    return {
      success: true,
      imageUrl: localImage,
      source: 'local_backup',
      keyword: keyword || prompt,
      prompt: finalPrompt,
      note: '混元API暂时不可用，已使用本地后备图片库'
    }
  }
}
