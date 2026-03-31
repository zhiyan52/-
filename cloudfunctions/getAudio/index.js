const cloud = require('wx-server-sdk');

cloud.init({ 
  env: cloud.DYNAMIC_CURRENT_ENV 
});

exports.main = async (event, context) => {
  const { heritageId, type = 'intro' } = event;
  
  // 参数校验
  if (!heritageId) {
    return { 
      code: -1, 
      message: 'heritageId is required' 
    };
  }
  
  try {
    // 从数据库获取音频信息
    const db = cloud.database();
    const result = await db.collection('heritage_audio')
      .where({
        heritageId: heritageId,
        type: type
      })
      .get();
    
    if (result.data.length === 0) {
      return {
        code: -2,
        message: 'audio not found'
      };
    }
    
    // 返回音频云存储地址
    return {
      code: 0,
      data: {
        audioUrl: result.data[0].audioUrl,
        duration: result.data[0].duration
      }
    };
    
  } catch (err) {
    return {
      code: -3,
      message: err.message
    };
  }
};