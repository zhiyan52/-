/**
 * 音频管理器
 * 统一管理音频播放、暂停、切换等操作
 */

class AudioManager {
  constructor() {
    this.currentAudio = null;
    this.currentHeritageId = '';
    this.playlist = [];
    this.isPlaying = false;
    this.events = {};
  }

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  // 绑定事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 解绑事件
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  // 触发事件
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(data);
      });
    }
  }

  // 播放音频
  play(heritageId, audioUrl) {
    if (this.currentAudio) {
      this.currentAudio.stop();
    }

    this.currentAudio = wx.createInnerAudioContext();
    this.currentAudio.src = audioUrl;
    this.currentHeritageId = heritageId;
    this.isPlaying = true;

    this.currentAudio.play();
    this.emit('onPlay', { heritageId: this.currentHeritageId, src: audioUrl });

    this.currentAudio.onEnded(() => {
      this.isPlaying = false;
      this.emit('onEnded', { heritageId: this.currentHeritageId });
    });

    this.currentAudio.onError((err) => {
      console.error('音频播放失败:', err);
      this.isPlaying = false;
    });

    // 监听进度
    this.currentAudio.onTimeUpdate(() => {
      if (this.currentAudio && this.isPlaying) {
        this.emit('onProgress', {
          heritageId: this.currentHeritageId,
          progress: this.currentAudio.currentTime,
          duration: this.currentAudio.duration
        });
      }
    });
  }

  // 暂停音频
  pause() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.emit('onPause', { heritageId: this.currentHeritageId });
    }
  }

  // 停止音频
  stop() {
    if (this.currentAudio) {
      this.currentAudio.stop();
      this.currentAudio.destroy();
      this.currentAudio = null;
      this.currentHeritageId = '';
      this.isPlaying = false;
    }
  }

  // 设置播放列表
  setPlaylist(playlist) {
    this.playlist = playlist;
  }

  // 预加载音频
  preload(heritageIds) {
    // 这里可以实现音频预加载逻辑
    console.log('预加载音频:', heritageIds);
  }

  // 获取当前状态
  getStatus() {
    return {
      isPlaying: this.isPlaying,
      heritageId: this.currentHeritageId
    };
  }
}

module.exports = AudioManager.getInstance();
