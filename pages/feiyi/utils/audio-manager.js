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
  }

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  // 播放音频
  play(audioUrl, heritageId) {
    if (this.currentAudio) {
      this.currentAudio.stop();
    }

    this.currentAudio = wx.createInnerAudioContext();
    this.currentAudio.src = audioUrl;
    this.currentHeritageId = heritageId;
    this.isPlaying = true;

    this.currentAudio.play();

    this.currentAudio.onEnded(() => {
      this.isPlaying = false;
    });

    this.currentAudio.onError((err) => {
      console.error('音频播放失败:', err);
      this.isPlaying = false;
    });
  }

  // 暂停音频
  pause() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.isPlaying = false;
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
