/**
 * 音频服务
 * 管理音频的云端存储、本地缓存、播放控制
 */

const { AUDIO_CONFIG, AudioUtils } = require('../data/');
const AudioManager = require('../utils/audio-manager');

class AudioService {
  constructor() {
    this.cloud = wx.cloud;
  }

  // 获取音频信息
  async getAudioInfo(heritageId) {
    const { HeritageDataUtils } = require('../data/');
    const heritage = HeritageDataUtils.getById(heritageId);
    
    if (!heritage || !heritage.audio?.hasAudio) {
      return null;
    }
    
    return {
      id: heritageId,
      name: heritage.name,
      src: heritage.audio.src,
      duration: heritage.audio.duration,
      script: heritage.audio.script,
      format: heritage.audio.format,
      size: AudioUtils.estimateSize(heritage.audio.duration)
    };
  }

  // 预加载音频（支持批量）
  async preloadAudio(heritageIds) {
    // 获取网络状态
    const networkType = await this._getNetworkType();
    
    // 检查是否允许预加载
    if (!AudioUtils.shouldPreload(networkType)) {
      console.log('[AudioService] 网络条件不满足预加载');
      return { loaded: [], skipped: heritageIds };
    }
    
    // 使用AudioManager进行预加载
    await AudioManager.preload(heritageIds);
    
    return { loaded: heritageIds, skipped: [] };
  }

  // 播放音频
  async play(heritageId) {
    const info = await this.getAudioInfo(heritageId);
    if (!info) {
      throw new Error('音频不存在');
    }
    
    return AudioManager.play(heritageId, info.src);
  }

  // 暂停
  pause() {
    AudioManager.pause();
  }

  // 停止
  stop() {
    AudioManager.stop();
  }

  // 获取播放状态
  getStatus() {
    return AudioManager.getStatus();
  }

  // 清理音频缓存
  clearCache(heritageId) {
    if (heritageId) {
      AudioManager.clearCache(heritageId);
    } else {
      // 清理所有
      const { HeritageDataUtils } = require('../data/');
      const allWithAudio = HeritageDataUtils.getWithAudio();
      allWithAudio.forEach(h => AudioManager.clearCache(h.id));
    }
  }

  // 获取缓存状态
  getCacheStatus(heritageId) {
    const cacheKey = AudioUtils.getCacheKey(heritageId);
    const cacheInfo = wx.getStorageSync(cacheKey);
    
    return {
      isCached: !!cacheInfo,
      cacheTime: cacheInfo?.downloadTime || null,
      localPath: cacheInfo?.tempPath || null
    };
  }

  // ============ 云存储操作 ============
  
  // 上传音频（管理后台使用）
  async uploadAudio(filePath, heritageId, options = {}) {
    const { type = 'intro' } = options;
    const cloudPath = `audio/${heritageId}-${type}.mp3`;
    
    try {
      const res = await this.cloud.uploadFile({
        cloudPath,
        filePath,
        config: {
          env: 'cultural-heritage'
        }
      });
      
      return {
        fileID: res.fileID,
        url: res.fileID,
        heritageId,
        type
      };
    } catch (err) {
      console.error('[AudioService] 上传失败:', err);
      throw err;
    }
  }

  // 获取临时下载链接
  async getTempUrl(fileID) {
    try {
      const res = await this.cloud.getTempFileURL({
        fileList: [fileID]
      });
      return res.fileList[0]?.tempFileURL;
    } catch (err) {
      console.error('[AudioService] 获取链接失败:', err);
      return null;
    }
  }

  // ============ 私有方法 ============
  _getNetworkType() {
    return new Promise((resolve) => {
      wx.getNetworkType({
        success: (res) => resolve(res.networkType),
        fail: () => resolve('unknown')
      });
    });
  }
}

module.exports = new AudioService();