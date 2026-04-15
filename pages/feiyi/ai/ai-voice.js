Page({
  data: {
    currentPlaying: null,
    currentVoice: null,
    isPlaying: false,
    voiceList: [
      {
        id: 1,
        title: '京剧的艺术魅力',
        description: '深入了解京剧的历史与表演艺术',
        image: 'https://picsum.photos/200/200?random=401',
        duration: '8:30',
        views: '2.5万'
      },
      {
        id: 2,
        title: '苏绣的制作工艺',
        description: '听传承人讲述苏绣的针法技巧',
        image: 'https://picsum.photos/200/200?random=402',
        duration: '12:15',
        views: '1.8万'
      },
      {
        id: 3,
        title: '皮影戏的故事',
        description: '走进皮影戏的奇妙世界',
        image: 'https://picsum.photos/200/200?random=403',
        duration: '6:45',
        views: '3.2万'
      },
      {
        id: 4,
        title: '太极拳养生之道',
        description: '学习太极拳的养生秘诀',
        image: 'https://picsum.photos/200/200?random=404',
        duration: '15:20',
        views: '4.1万'
      },
      {
        id: 5,
        title: '青花瓷的传奇',
        description: '探索青花瓷的千年历史',
        image: 'https://picsum.photos/200/200?random=405',
        duration: '10:05',
        views: '2.9万'
      }
    ]
  },

  onLoad: function (options) {

  },

  togglePlay: function (e) {
    const id = e.currentTarget.dataset.id;
    const voice = this.data.voiceList.find(item => item.id === id);

    if (this.data.currentPlaying === id) {
      this.setData({
        isPlaying: !this.data.isPlaying
      });
    } else {
      this.setData({
        currentPlaying: id,
        currentVoice: voice,
        isPlaying: true
      });
    }

    wx.showToast({
      title: this.data.isPlaying ? '开始播放' : '暂停播放',
      icon: 'none'
    });
  },

  togglePlayMain: function () {
    this.setData({
      isPlaying: !this.data.isPlaying
    });
  },

  prevVoice: function () {
    const currentIndex = this.data.voiceList.findIndex(item => item.id === this.data.currentPlaying);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.data.voiceList.length - 1;
    const prevVoice = this.data.voiceList[prevIndex];

    this.setData({
      currentPlaying: prevVoice.id,
      currentVoice: prevVoice,
      isPlaying: true
    });
  },

  nextVoice: function () {
    const currentIndex = this.data.voiceList.findIndex(item => item.id === this.data.currentPlaying);
    const nextIndex = currentIndex < this.data.voiceList.length - 1 ? currentIndex + 1 : 0;
    const nextVoice = this.data.voiceList[nextIndex];

    this.setData({
      currentPlaying: nextVoice.id,
      currentVoice: nextVoice,
      isPlaying: true
    });
  }
});