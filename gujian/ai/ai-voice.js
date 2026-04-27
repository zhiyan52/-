Page({
  data: {
    selectedBuilding: null,
    isPlaying: false,
    progress: 0,
    currentTime: '00:00',
    duration: '00:00',
    buildings: {
      'forbidden-city': {
        name: '故宫',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/gongdian1.jpg',
        desc: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。',
        duration: '03:45',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270053491777222429107405094.mp3'
      },
      'summer-palace': {
        name: '颐和园',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhineng/yinhe.jpg',
        desc: '中国古典园林，是保存最完整的一座皇家行宫御苑，被誉为皇家园林博物馆。',
        duration: '04:20',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270055401777222540829627382.mp3'
      },
      'temple-of-heaven': {
        name: '天坛',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhineng/taintan.jpg',
        desc: '明清两代皇帝祭天、祈求五谷丰登的场所，是中国现存最大的古代祭祀性建筑群。',
        duration: '03:15',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270053491777222429107405094.mp3'
      },
      'suzhou-garden': {
        name: '苏州园林',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhineng/yuanlin.jpg',
        desc: '中国古典园林的杰出代表，以精巧的设计和独特的艺术风格闻名于世。',
        duration: '02:50',
        audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270102451777222965689992665.mp3'
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

  // 选择古建筑
  selectBuilding: function (e) {
    const buildingId = e.currentTarget.dataset.building;
    const building = this.data.buildings[buildingId];
    const { audioContext } = this.data;

    // 如果正在播放，则停止
    if (this.data.isPlaying) {
      audioContext.stop();
    }

    this.setData({
      selectedBuilding: building,
      isPlaying: false,
      progress: 0,
      currentTime: '00:00',
      duration: '00:00'
    });
  },

  // 上传音频 - 选择本地音频文件
  uploadAudio: function (e) {
    const buildingId = e.currentTarget.dataset.building;

    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].path;

        wx.showToast({
          title: '音频已选择',
          icon: 'success'
        });

        // 更新音频URL为本地临时路径
        const buildings = this.data.buildings;
        buildings[buildingId].audioUrl = tempFilePath;
        this.setData({ buildings });
      },
      fail: (err) => {
        wx.showToast({ title: '选择失败', icon: 'none' });
        console.error('选择音频失败:', err);
      }
    });
  },

  // 播放/暂停
  playPause: function () {
    if (!this.data.selectedBuilding) {
      wx.showToast({
        title: '请先选择古建筑',
        icon: 'none'
      });
      return;
    }

    const { audioContext, isPlaying, selectedBuilding } = this.data;

    if (isPlaying) {
      // 暂停播放
      audioContext.pause();
    } else {
      // 开始播放
      if (selectedBuilding.audioUrl) {
        // 设置音频源
        audioContext.src = selectedBuilding.audioUrl;
        // 播放音频
        audioContext.play();
      } else {
        wx.showToast({
          title: '请先选择音频文件',
          icon: 'none'
        });
      }
    }
  },

  // 停止
  stop: function () {
    if (!this.data.selectedBuilding) {
      wx.showToast({
        title: '请先选择古建筑',
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
    if (!this.data.selectedBuilding) {
      wx.showToast({
        title: '请先选择古建筑',
        icon: 'none'
      });
      return;
    }

    const { audioContext, selectedBuilding } = this.data;

    if (selectedBuilding.audioUrl) {
      audioContext.src = selectedBuilding.audioUrl;
      audioContext.play();

      this.setData({
        progress: 0,
        currentTime: '00:00',
        isPlaying: true
      });
    } else {
      wx.showToast({
        title: '请先选择音频文件',
        icon: 'none'
      });
    }
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