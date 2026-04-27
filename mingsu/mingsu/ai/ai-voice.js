Page({
  data: {
    selectedCustom: null,
    isPlaying: false,
    progress: 0,
    currentTime: '00:00',
    duration: '00:00',
    customs: {
      'spring-festival': {
        name: '春节',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/voi/1.jpg',
        desc: '中国最隆重的传统节日，象征着团圆与新生，已有4000多年历史。',
        duration: '03:45',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270714341777245274920124684.mp3'
      },
      'mid-autumn': {
        name: '中秋节',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/voi/2.jpg',
        desc: '中国传统节日，象征团圆与丰收，有赏月、吃月饼的习俗。',
        duration: '04:20',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270712591777245179829251457.mp3'
      },
      'dragon-boat': {
        name: '端午节',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/voi/3.jpg',
        desc: '纪念屈原的传统节日，有赛龙舟、吃粽子的习俗。',
        duration: '03:15',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270705071777244707534326953.mp3'
      },
      'double-ninth': {
        name: '重阳节',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/voi/4.jpg',
        desc: '中国传统节日，有登高、赏菊、插茱萸的习俗，寓意健康长寿。',
        duration: '02:50',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270702371777244557869634735.mp3'
      }
    },
    audioContext: null
  },

  onLoad: function (options) {
    this.initAudioContext();
  },

  /**
   * 初始化音频上下文
   */
  initAudioContext: function () {
    const audioContext = wx.createInnerAudioContext();

    // 监听音频播放事件
    audioContext.onPlay(() => {
      this.setData({ isPlaying: true });
    });

    // 监听音频暂停事件
    audioContext.onPause(() => {
      this.setData({ isPlaying: false });
    });

    // 监听音频停止事件
    audioContext.onStop(() => {
      this.setData({
        isPlaying: false,
        currentTime: '00:00',
        progress: 0
      });
    });

    // 监听音频自然结束事件
    audioContext.onEnded(() => {
      this.setData({
        isPlaying: false,
        currentTime: '00:00',
        progress: 0
      });
    });

    // 监听音频播放进度更新事件
    audioContext.onTimeUpdate(() => {
      const currentTime = audioContext.currentTime;
      const duration = audioContext.duration || 0;
      const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      const currentTimeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      const durationMinutes = Math.floor(duration / 60);
      const durationSeconds = Math.floor(duration % 60);
      const durationStr = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;

      this.setData({
        progress,
        currentTime: currentTimeStr,
        duration: durationStr
      });
    });

    // 监听音频加载错误事件
    audioContext.onError((err) => {
      console.error('音频播放错误:', err);
      wx.showToast({
        title: '音频加载失败',
        icon: 'none'
      });
      this.setData({ isPlaying: false });
    });

    this.setData({ audioContext });
  },

  // 选择民俗
  selectCustom: function (e) {
    const customId = e.currentTarget.dataset.custom;
    const custom = this.data.customs[customId];
    const { audioContext } = this.data;

    // 如果正在播放，则停止
    if (this.data.isPlaying) {
      audioContext.stop();
    }

    this.setData({
      selectedCustom: custom,
      isPlaying: false,
      progress: 0,
      currentTime: '00:00',
      duration: '00:00'
    });
  },

  // 播放/暂停
  playPause: function () {
    if (!this.data.selectedCustom) {
      wx.showToast({
        title: '请先选择民俗',
        icon: 'none'
      });
      return;
    }

    const { audioContext, isPlaying, selectedCustom } = this.data;

    if (isPlaying) {
      // 暂停播放
      audioContext.pause();
    } else {
      // 开始播放
      audioContext.src = selectedCustom.audioUrl;
      audioContext.play();
    }
  },

  // 停止
  stop: function () {
    if (!this.data.selectedCustom) {
      wx.showToast({
        title: '请先选择民俗',
        icon: 'none'
      });
      return;
    }

    const { audioContext } = this.data;
    audioContext.stop();

    this.setData({
      isPlaying: false,
      progress: 0,
      currentTime: '00:00'
    });
  },

  // 重复
  repeat: function () {
    if (!this.data.selectedCustom) {
      wx.showToast({
        title: '请先选择民俗',
        icon: 'none'
      });
      return;
    }

    const { audioContext, selectedCustom } = this.data;

    audioContext.src = selectedCustom.audioUrl;
    audioContext.play();

    this.setData({
      progress: 0,
      currentTime: '00:00',
      isPlaying: true
    });
  },

  // 拖动进度条
  seek: function (e) {
    const value = e.detail.value;
    const { audioContext, duration } = this.data;

    // 计算跳转位置
    const seekTime = (value / 100) * duration;
    audioContext.seek(seekTime);

    this.setData({
      progress: value
    });
  },

  onUnload: function () {
    // 页面卸载时清理
    const { audioContext } = this.data;
    if (audioContext) {
      audioContext.destroy();
    }
  }
});
