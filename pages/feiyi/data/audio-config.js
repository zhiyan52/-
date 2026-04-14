/**
 * 音频配置管理
 * 10秒轻量音频配置（云存储，低码率，边缘端缓存）
 */

const AUDIO_CONFIG = {
  // 全局音频配置
  global: {
    // 音频格式
    format: 'mp3',
    // 码率（低码率节省流量）
    bitrate: '64kbps',
    // 采样率
    sampleRate: 22050,
    // 声道数（单声道减小文件大小）
    channels: 1,
    // 标准时长（秒）
    duration: 10,
    // 最大文件大小（KB）
    maxFileSize: 100,
    // 缓存策略
    cache: {
      // 本地缓存最大数量
      maxCacheCount: 20,
      // 缓存过期时间（天）
      expireDays: 7,
      // 预加载数量
      preloadCount: 3
    }
  },

  // 音频类型配置
  types: {
    // 项目介绍音频
    intro: {
      suffix: '-intro',
      description: '项目核心介绍旁白',
      scriptTemplate: '{name}，{briefDesc}。'
    },
    // 技艺展示音频
    technique: {
      suffix: '-tech',
      description: '制作工艺/表演技巧展示',
      scriptTemplate: '{technique}，{highlight}。'
    },
    // 传承人讲述音频
    story: {
      suffix: '-story',
      description: '传承人故事/口述历史',
      scriptTemplate: '我是{name}，{experience}。'
    }
  },

  // 云存储路径配置
  cloudPath: {
    // 基础路径
    base: 'cloud://cultural-heritage/audio/',
    // 项目音频路径
    heritage: (heritageId, type = 'intro') => {
      return `cloud://cultural-heritage/audio/${heritageId}-${type}.mp3`;
    },
    // 临时文件路径（本地缓存）
    temp: (heritageId) => {
      return `${wx.env.USER_DATA_PATH}/audio/${heritageId}.mp3`;
    }
  },

  // 音频播放配置
  player: {
    // 是否自动播放（默认否）
    autoplay: false,
    // 是否循环播放
    loop: false,
    // 初始音量
    volume: 0.8,
    // 是否遵循静音开关
    obeyMuteSwitch: true,
    // 缓冲提示
    showBufferingToast: false
  },

  // 边缘端缓存配置
  edgeCache: {
    // 启用边缘缓存
    enabled: true,
    // 缓存策略：lru(最近最少使用) / fifo(先进先出)
    strategy: 'lru',
    // 预加载配置
    preload: {
      // 列表页预加载数量
      listPreload: 2,
      // 详情页预加载数量
      detailPreload: 3,
      // 预加载时机：wifi / always / never
      condition: 'wifi'
    }
  }
};

// 音频工具函数
const AudioUtils = {
  // 生成音频路径
  getPath: (heritageId, type = 'intro') => {
    return AUDIO_CONFIG.cloudPath.heritage(heritageId, type);
  },

  // 检查音频是否存在
  checkExists: async (heritageId) => {
    // 实际实现需要调用云函数检查文件是否存在
    return true; // 模拟返回
  },

  // 计算预估文件大小
  estimateSize: (duration = 10) => {
    // 64kbps = 8KB/s, 10秒约80KB
    return (AUDIO_CONFIG.global.bitrate === '64kbps' ? 8 : 16) * duration;
  },

  // 获取缓存key
  getCacheKey: (heritageId) => `audio_${heritageId}`,

  // 判断是否应预加载
  shouldPreload: (networkType) => {
    const condition = AUDIO_CONFIG.edgeCache.preload.condition;
    if (condition === 'never') return false;
    if (condition === 'wifi' && networkType !== 'wifi') return false;
    return true;
  }
};

module.exports = {
  AUDIO_CONFIG,
  AudioUtils
};