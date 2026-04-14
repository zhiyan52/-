/**
 * 数据层统一导出
 */

const { CATEGORIES, CategoryMap, DEFAULT_CATEGORY } = require('./categories');
const { HERITAGE_LIST, HeritageDataUtils } = require('./heritage-list');
const { INHERITORS, InheritorUtils } = require('./inheritors');
const { AUDIO_CONFIG, AudioUtils } = require('./audio-config');

module.exports = {
  // 分类数据
  CATEGORIES,
  CategoryMap,
  DEFAULT_CATEGORY,
  
  // 非遗项目数据
  HERITAGE_LIST,
  HeritageDataUtils,
  
  // 传承人数据
  INHERITORS,
  InheritorUtils,
  
  // 音频配置
  AUDIO_CONFIG,
  AudioUtils,
  
  // 数据初始化
  init: () => {
    console.log('[Data] 数据层初始化完成');
    console.log(`[Data] 共加载 ${HERITAGE_LIST.length} 个非遗项目`);
    console.log(`[Data] 共加载 ${INHERITORS.length} 位传承人`);
    console.log(`[Data] 含音频项目 ${HERITAGE_LIST.filter(h => h.audio.hasAudio).length} 个`);
  }
};