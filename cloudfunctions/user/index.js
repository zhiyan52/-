// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取用户openid
    const wxContext = cloud.getWXContext()

    return {
      code: 200,
      message: '获取openid成功',
      data: {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
      }
    }
  } catch (error) {
    console.error('获取openid失败:', error)
    return {
      code: 500,
      message: '获取openid失败',
      error: error.message
    }
  }
}
