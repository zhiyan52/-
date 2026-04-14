/**
 * 音频管理器
 * 管理所有音频的播放、缓存、预加载
 */

const { AUDIO_CONFIG, AudioUtils, HeritageDataUtils } = require('../data/index.js');

class AudioManager {
  constructor() {
    // 音频上下文池（复用实例）
    this.audioContext = null;
    // 当前播放信息
    this.currentPlaying = {
      id: null,
      heritageId: null,
      startTime: 0,
      isPlaying: false
    };
    // 缓存的音频文件路径（本地临时文件）
    this.cacheMap = new Map();
    // 预加载队列
    this.preloadQueue = [];
    // 事件监听器
    this.listeners = {
      onPlay: [],
      onPause: [],
      onStop: [],
      onEnded: [],
      onError: [],
      onProgress: []
    };
    // 进度定时器
    this.progressTimer = null;
    
    this._init();
  }

  // 单例模式
  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  _init() {
    try {
      // 初始化音频上下文
      this.audioContext = wx.createInnerAudioContext();
      
      // 绑定事件
      this.audioContext.onPlay(() => {
        this.currentPlaying.isPlaying = true;
        this.currentPlaying.startTime = Date.now();
        this._emit('onPlay', this.currentPlaying);
        this._startProgressTimer();
      });

      this.audioContext.onPause(() => {
        this.currentPlaying.isPlaying = false;
        this._emit('onPause', this.currentPlaying);
        this._stopProgressTimer();
      });

      this.audioContext.onStop(() => {
        this.currentPlaying.isPlaying = false;
        this._emit('onStop', this.currentPlaying);
        this._stopProgressTimer();
      });

      this.audioContext.onEnded(() => {
        this.currentPlaying.isPlaying = false;
        this._emit('onEnded', this.currentPlaying);
        this._stopProgressTimer();
        // 播放完成，清理当前状态
        this.currentPlaying.id = null;
        this.currentPlaying.heritageId = null;
      });

      this.audioContext.onError((err) => {
        console.error('[AudioManager] 播放错误:', err);
        this.currentPlaying.isPlaying = false;
        this._emit('onError', { ...this.currentPlaying, error: err });
        this._stopProgressTimer();
      });

      // 加载缓存信息
      this._loadCacheInfo();
    } catch (err) {
      console.error('[AudioManager] 初始化失败:', err);
    }
  }

  // 播放音频
  async play(heritageId, audioUrl) {
    try {
      // 如果正在播放同一音频，则暂停
      if (this.currentPlaying.heritageId === heritageId && this.currentPlaying.isPlaying) {
        this.pause();
        return { status: 'paused', heritageId };
      }

      // 停止当前播放
      this.stop();

      // 检查本地缓存
      const localPath = await this._getLocalPath(heritageId, audioUrl);
      
      // 设置音频源
      this.audioContext.src = localPath;
      this.audioContext.play();

      // 更新状态
      this.currentPlaying = {
        id: `play_${Date.now()}`,
        heritageId,
        startTime: Date.now(),
        isPlaying: true,
        duration: AUDIO_CONFIG.global.duration
      };

      return { status: 'playing', heritageId, id: this.currentPlaying.id };
    } catch (err) {
      console.error('[AudioManager] 播放失败:', err);
      return { status: 'error', heritageId, error: err };
    }
  }

  // 暂停
  pause() {
    try {
      if (this.audioContext && this.currentPlaying.isPlaying) {
        this.audioContext.pause();
      }
    } catch (err) {
      console.error('[AudioManager] 暂停失败:', err);
    }
  }

  // 停止
  stop() {
    try {
      if (this.audioContext) {
        this.audioContext.stop();
      }
      this._stopProgressTimer();
    } catch (err) {
      console.error('[AudioManager] 停止失败:', err);
    }
  }

  // 获取播放状态
  getStatus() {
    return {
      ...this.currentPlaying,
      progress: this._calculateProgress()
    };
  }

  // 预加载音频
  async preload(heritageIds) {
    try {
      if (!heritageIds || !Array.isArray(heritageIds)) return;
      
      const networkType = await this._getNetworkType();
      
      // 检查是否满足预加载条件
      if (!AudioUtils.shouldPreload(networkType)) {
        console.log('[AudioManager] 网络条件不满足预加载要求');
        return;
      }

      // 过滤已缓存的项目
      const needLoad = heritageIds.filter(id => !this.cacheMap.has(id));
      
      // 添加到队列
      this.preloadQueue.push(...needLoad);
      
      // 执行预加载（限制并发）
      this._processPreloadQueue();
    } catch (err) {
      console.error('[AudioManager] 预加载失败:', err);
    }
  }

  // 清理缓存
  clearCache(heritageId) {
    try {
      if (heritageId) {
        // 清理指定缓存
        const cacheKey = AudioUtils.getCacheKey(heritageId);
        wx.removeStorageSync(cacheKey);
        this.cacheMap.delete(heritageId);
      } else {
        // 清理所有缓存
        this.cacheMap.forEach((_, id) => {
          const cacheKey = AudioUtils.getCacheKey(id);
          wx.removeStorageSync(cacheKey);
        });
        this.cacheMap.clear();
      }
    } catch (err) {
      console.error('[AudioManager] 清理缓存失败:', err);
    }
  }

  // 事件监听
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  off(event, callback) {
    if (this.listeners[event]) {
      const idx = this.listeners[event].indexOf(callback);
      if (idx > -1) {
        this.listeners[event].splice(idx, 1);
      }
    }
  }

  // 销毁
  destroy() {
    try {
      this.stop();
      if (this.audioContext) {
        this.audioContext.destroy();
        this.audioContext = null;
      }
      this._stopProgressTimer();
      AudioManager.instance = null;
    } catch (err) {
      console.error('[AudioManager] 销毁失败:', err);
    }
  }

  // ============ 私有方法 ============

  _emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[AudioManager] 事件回调错误:`, err);
        }
      });
    }
  }

  // 获取本地路径（优先使用缓存）
  async _getLocalPath(heritageId, cloudUrl) {
    try {
      // 检查内存缓存
      if (this.cacheMap.has(heritageId)) {
        return this.cacheMap.get(heritageId);
      }

      // 检查本地文件缓存
      const cacheKey = AudioUtils.getCacheKey(heritageId);
      const cached = wx.getStorageSync(cacheKey);
      
      if (cached && cached.tempPath && this._checkFileExists(cached.tempPath)) {
        this.cacheMap.set(heritageId, cached.tempPath);
        return cached.tempPath;
      }

      // 下载到本地
      if (cloudUrl) {
        const res = await wx.cloud.downloadFile({
          fileID: cloudUrl
        });
        
        // 保存缓存信息
        const cacheInfo = {
          heritageId,
          tempPath: res.tempFilePath,
          downloadTime: Date.now(),
          cloudUrl
        };
        
        wx.setStorageSync(cacheKey, cacheInfo);
        this.cacheMap.set(heritageId, res.tempFilePath);
        
        return res.tempFilePath;
      }
      
      return cloudUrl;
    } catch (err) {
      console.error('[AudioManager] 下载音频失败:', err);
      // 失败时返回云路径（尝试直接播放）
      return cloudUrl;
    }
  }

  _checkFileExists(path) {
    try {
      wx.getFileSystemManager().accessSync(path);
      return true;
    } catch {
      return false;
    }
  }

  _loadCacheInfo() {
    try {
      // 从存储中加载缓存信息
      const keys = wx.getStorageInfoSync().keys;
      keys.forEach(key => {
        if (key.startsWith('audio_')) {
          const info = wx.getStorageSync(key);
          if (info && info.tempPath) {
            const heritageId = key.replace('audio_', '');
            this.cacheMap.set(heritageId, info.tempPath);
          }
        }
      });
      console.log(`[AudioManager] 已加载 ${this.cacheMap.size} 个音频缓存`);
    } catch (err) {
      console.error('[AudioManager] 加载缓存信息失败:', err);
    }
  }

  async _processPreloadQueue() {
    try {
      const maxConcurrent = 2; // 最大并发下载数
      const loading = [];

      while (this.preloadQueue.length > 0 && loading.length < maxConcurrent) {
        const id = this.preloadQueue.shift();
        const heritage = this._getHeritageById(id);
        
        if (heritage && heritage.audio && heritage.audio.hasAudio && heritage.audio.src) {
          const promise = this._getLocalPath(id, heritage.audio.src)
            .then(() => {
              console.log(`[AudioManager] 预加载完成: ${id}`);
            })
            .catch(err => {
              console.error(`[AudioManager] 预加载失败: ${id}`, err);
            })
            .finally(() => {
              const idx = loading.indexOf(promise);
              if (idx > -1) loading.splice(idx, 1);
            });
          
          loading.push(promise);
        }
      }

      // 继续处理队列
      if (this.preloadQueue.length > 0) {
        setTimeout(() => this._processPreloadQueue(), 100);
      }
    } catch (err) {
      console.error('[AudioManager] 处理预加载队列失败:', err);
    }
  }

  _getHeritageById(id) {
    try {
      return HeritageDataUtils.getById(id);
    } catch (err) {
      console.error('[AudioManager] 获取非遗信息失败:', err);
      return null;
    }
  }

  _getNetworkType() {
    return new Promise((resolve) => {
      wx.getNetworkType({
        success: (res) => resolve(res.networkType),
        fail: () => resolve('unknown')
      });
    });
  }

  _startProgressTimer() {
    this._stopProgressTimer();
    this.progressTimer = setInterval(() => {
      const progress = this._calculateProgress();
      this._emit('onProgress', {
        heritageId: this.currentPlaying.heritageId,
        progress,
        duration: AUDIO_CONFIG.global.duration
      });
    }, 100);
  }

  _stopProgressTimer() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  _calculateProgress() {
    if (!this.currentPlaying.isPlaying || !this.currentPlaying.startTime) {
      return 0;
    }
    const elapsed = (Date.now() - this.currentPlaying.startTime) / 1000;
    return Math.min(elapsed, AUDIO_CONFIG.global.duration);
  }
}

module.exports = AudioManager.getInstance();
