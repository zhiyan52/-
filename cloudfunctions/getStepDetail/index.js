// cloudfunctions/getStepDetail/index.js
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event) => {
  const { craftId, stepId } = event;
  const OPENID = cloud.getWXContext().OPENID;
  
  // 获取工艺数据
  const craft = await db.collection('craft_processes').doc(craftId).get();
  
  // 找到对应工序
  const stepEntry = Object.entries(craft.data.stepDetails)
    .find(([name, detail]) => detail.id === stepId);
  
  if (!stepEntry) {
    return { error: '工序不存在' };
  }
  
  const [stepName, stepData] = stepEntry;
  
  // 获取用户进度
  const userProgress = await db.collection('user_craft_progress')
    .where({ _openid: OPENID, craftId })
    .get();
  
  return {
    step: {
      name: stepName,
      ...stepData
    },
    craft: {
      _id: craft.data._id,
      name: craft.data.name,
      totalSteps: craft.data.totalSteps,
      phases: craft.data.phases
    },
    userProgress: userProgress.data[0] || null
  };
};