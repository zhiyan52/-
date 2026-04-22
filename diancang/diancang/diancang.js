Page({
  data: {
    activeTab: 1,
    todayDate: '',
    featureList: [
      {
        id: 1,
        title: 'AI问答',
        description: '文心先生为您解答文化疑问',
        icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/icons/ai-qa.png',
        url: '/diancang/diancang/ai/ai-qa'
      },
      {
        id: 2,
        title: '智能导览',
        description: '文心先生带您探文脉',
        icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/icons/ai-guide.png',
        url: '/diancang/diancang/ai/ai-guide'
      },
      {
        id: 3,
        title: '智能推荐',
        description: '文心先生为您精选典籍',
        icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/icons/ai-recommend.png',
        url: '/diancang/diancang/ai/ai-recommend'
      },
      {
        id: 4,
        title: '智能语音',
        description: '与文心先生语音交流',
        icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/icons/ai-voice.png',
        url: '/diancang/diancang/ai/ai-voice'
      }
    ]
  },

  onLoad: function (options) {
    this.setTodayDate();
  },

  setTodayDate: function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const todayDate = `${year}年${month}月${day}日`;

    this.setData({
      todayDate: todayDate
    });
  },

  // 互动活动相关函数
  startKnowledgeQuiz: function () {
    wx.navigateTo({
      url: '/competition/competition-center'
    });
  },

  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });
  },

  // 导航到AI功能页面
  navigateToFeature: function (e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },

  // 查看典籍详情
  viewBookDetail: function (e) {
    const bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/diancang/diancang/diancang-detail?id=${bookId}`
    });
  },

  // 查看更多典籍
  viewMoreBooks: function () {
    wx.navigateTo({
      url: '/diancang/diancang/diancang-list'
    });
  },

  // 进入寻宝游戏
  startTreasureHunt: function () {
    wx.navigateTo({
      url: '/diancang/diancang/diancang-treasure-hunt'
    });
  }
});