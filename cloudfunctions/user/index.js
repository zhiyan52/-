// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const usersCollection = db.collection('users')

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, data } = event

  try {
    switch (action) {
      case 'login':
        return await login(data)
      case 'getUserInfo':
        return await getUserInfo(data)
      case 'updateUserInfo':
        return await updateUserInfo(data)
      case 'bindPhone':
        return await bindPhone(data)
      default:
        return { code: 400, message: '无效的操作' }
    }
  } catch (error) {
    console.error('云函数错误:', error)
    return { code: 500, message: '服务器错误', error: error.message }
  }
}

// 登录/注册
async function login(data) {
  const { openid, userInfo } = data

  // 查找用户
  const user = await usersCollection.where({ openid }).get()

  if (user.data.length > 0) {
    // 用户已存在，更新用户信息
    await usersCollection.doc(user.data[0]._id).update({
      data: {
        ...userInfo,
        updatedAt: new Date()
      }
    })
    return { code: 200, message: '登录成功', data: user.data[0] }
  } else {
    // 用户不存在，创建新用户
    const newUser = {
      openid,
      ...userInfo,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const result = await usersCollection.add({ data: newUser })
    return { code: 200, message: '注册成功', data: { ...newUser, _id: result._id } }
  }
}

// 获取用户信息
async function getUserInfo(data) {
  const { openid } = data

  const user = await usersCollection.where({ openid }).get()
  if (user.data.length > 0) {
    return { code: 200, message: '获取成功', data: user.data[0] }
  } else {
    return { code: 404, message: '用户不存在' }
  }
}

// 更新用户信息
async function updateUserInfo(data) {
  const { openid, userInfo } = data

  const result = await usersCollection.where({ openid }).update({
    data: {
      ...userInfo,
      updatedAt: new Date()
    }
  })

  if (result.updated) {
    return { code: 200, message: '更新成功' }
  } else {
    return { code: 404, message: '用户不存在' }
  }
}

// 绑定手机号
async function bindPhone(data) {
  const { openid, phone } = data

  const result = await usersCollection.where({ openid }).update({
    data: {
      phone,
      updatedAt: new Date()
    }
  })

  if (result.updated) {
    return { code: 200, message: '绑定成功' }
  } else {
    return { code: 404, message: '用户不存在' }
  }
}
