Page({
  data: {
    selectedBuilding: null,
    isPlaying: false,
    progress: 0,
    currentTime: '00:00',
    buildings: {
      'forbidden-city': {
        name: '故宫',
        image: '/images/forbidden-city.jpg',
        desc: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。',
        duration: '03:45'
      },
      'summer-palace': {
        name: '颐和园',
        image: '/images/summer-palace.jpg',
        desc: '中国古典园林，是保存最完整的一座皇家行宫御苑，被誉为皇家园林博物馆。',
        duration: '04:20'
      },
      'temple-of-heaven': {
        name: '天坛',
        image: '/images/temple-of-heaven.jpg',
        desc: '明清两代皇帝祭天、祈求五谷丰登的场所，是中国现存最大的古代祭祀性建筑群。',
        duration: '03:15'
      },
      'suzhou-garden': {
        name: '苏州园林',
        image: '/images/suzhou-garden.jpg',
        desc: '中国古典园林的杰出代表，以精巧的设计和独特的艺术风格闻名于世。',
        duration: '02:50'
      }
    }
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  // 选择古建筑
  selectBuilding: function (e) {
    const buildingId = e.currentTarget.dataset.building;
    const building = this.data.buildings[buildingId];

    this.setData({
      selectedBuilding: building,
      isPlaying: false,
      progress: 0,
      currentTime: '00:00'
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

    const isPlaying = this.data.isPlaying;
    this.setData({
      isPlaying: !isPlaying
    });

    if (!isPlaying) {
      wx.showToast({
        title: '开始播放',
        icon: 'success'
      });

      // 模拟播放进度
      this.simulatePlayback();
    } else {
      wx.showToast({
        title: '暂停播放',
        icon: 'success'
      });

      // 停止模拟进度
      if (this.playbackInterval) {
        clearInterval(this.playbackInterval);
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

    this.setData({
      isPlaying: false,
      progress: 0,
      currentTime: '00:00'
    });

    wx.showToast({
      title: '停止播放',
      icon: 'success'
    });

    // 停止模拟进度
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
    }
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

    this.setData({
      progress: 0,
      currentTime: '00:00',
      isPlaying: true
    });

    wx.showToast({
      title: '重新播放',
      icon: 'success'
    });

    // 模拟播放进度
    this.simulatePlayback();
  },

  // 拖动进度条
  seek: function (e) {
    const value = e.detail.value;
    this.setData({
      progress: value
    });

    // 计算当前时间
    const totalMinutes = parseInt(this.data.selectedBuilding.duration.split(':')[0]);
    const totalSeconds = parseInt(this.data.selectedBuilding.duration.split(':')[1]);
    const totalTime = totalMinutes * 60 + totalSeconds;
    const currentTime = Math.floor(totalTime * value / 100);
    const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
    const seconds = (currentTime % 60).toString().padStart(2, '0');

    this.setData({
      currentTime: `${minutes}:${seconds}`
    });
  },

  // 模拟播放进度
  simulatePlayback: function () {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
    }

    let progress = 0;
    this.playbackInterval = setInterval(() => {
      progress += 1;
      if (progress > 100) {
        clearInterval(this.playbackInterval);
        this.setData({
          progress: 100,
          isPlaying: false,
          currentTime: this.data.selectedBuilding.duration
        });
        return;
      }

      // 计算当前时间
      const totalMinutes = parseInt(this.data.selectedBuilding.duration.split(':')[0]);
      const totalSeconds = parseInt(this.data.selectedBuilding.duration.split(':')[1]);
      const totalTime = totalMinutes * 60 + totalSeconds;
      const currentTime = Math.floor(totalTime * progress / 100);
      const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
      const seconds = (currentTime % 60).toString().padStart(2, '0');

      this.setData({
        progress: progress,
        currentTime: `${minutes}:${seconds}`
      });
    }, 1000);
  },

  onUnload: function () {
    // 页面卸载时清理
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
    }
  }
});