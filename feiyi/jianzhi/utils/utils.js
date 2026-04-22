const StorageKeys = {
  PROGRESS: 'paperCutProgress',
  SETTINGS: 'paperCutSettings',
  ACHIEVEMENTS: 'paperCutAchievements'
};

/**
 * 获取进度
 */
function getProgress() {
  return wx.getStorageSync(StorageKeys.PROGRESS) || {
    totalWorks: 0,
    totalStars: 0,
    level: 1,
    unlockedPatterns: ['flower', 'fish'],
    works: [],
    achievements: []
  };
}

/**
 * 保存作品
 */
function saveWork(workData) {
  const progress = getProgress();
  
  const work = {
    id: Date.now().toString(),
    date: Date.now(),
    ...workData
  };
  
  progress.works.push(work);
  progress.totalWorks++;
  progress.totalStars += work.stars;
  
  // 升级检测
  const newLevel = calculateLevel(progress.totalStars);
  if (newLevel > progress.level) {
    progress.level = newLevel;
    // 解锁新图案
    progress.unlockedPatterns = getUnlockedPatterns(newLevel, progress.totalStars);
  }
  
  wx.setStorageSync(StorageKeys.PROGRESS, progress);
  return work;
}

/**
 * 计算等级
 */
function calculateLevel(totalStars) {
  if (totalStars >= 100) return 6;
  if (totalStars >= 70) return 5;
  if (totalStars >= 45) return 4;
  if (totalStars >= 25) return 3;
  if (totalStars >= 10) return 2;
  return 1;
}

/**
 * 获取解锁图案
 */
function getUnlockedPatterns(level, totalStars) {
  const { PATTERN_LIBRARY } = require('./paper-cut-data.js');
  const unlocked = ['flower', 'fish'];
  
  for (const [id, info] of Object.entries(PATTERN_LIBRARY)) {
    if (info.unlockLevel <= level) {
      if (!info.requireStars || totalStars >= info.requireStars) {
        unlocked.push(id);
      }
    }
  }
  
  return [...new Set(unlocked)];
}

module.exports = {
  StorageKeys,
  getProgress,
  saveWork,
  calculateLevel,
  getUnlockedPatterns
};