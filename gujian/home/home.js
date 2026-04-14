Page({
  data: {
    activeTab: 0,
    interactiveFeatures: [
      {
        id: 'culture',
        title: '建筑文化',
        desc: '探索传统建筑的文化内涵',
        icon: '/icons/culture.png'
      },
      {
        id: 'structure',
        title: '营造技艺',
        desc: '了解古代建筑的建造工艺',
        icon: '/icons/structure.png'
      },
      {
        id: 'visit',
        title: '虚拟游览',
        desc: '沉浸式体验古建筑魅力',
        icon: '/icons/visit.png'
      },
      {
        id: 'collection',
        title: '我的收藏',
        desc: '保存喜欢的古建筑资料',
        icon: '/icons/collection.png'
      }
    ]
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  onShow: function () {
    // 页面显示时执行
  },

  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });

    // 根据不同标签页跳转到对应页面
    switch (index) {
      case 0:
        // 首页，无需跳转
        break;
      case 1:
        wx.navigateTo({
          url: '/gujian/category/category'
        });
        break;
      case 2:
        wx.navigateTo({
          url: '/profile/profile/profile'
        });
        break;
    }
  },

  navigateToFeature: function (e) {
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    });
  },

  // 智能功能跳转
  navigateToAI: function () {
    wx.navigateTo({
      url: '/gujian/ai/ai-guide'
    });
  },

  navigateToQA: function () {
    wx.navigateTo({
      url: '/gujian/ai/ai-qa'
    });
  },

  navigateToRecommend: function () {
    wx.navigateTo({
      url: '/gujian/ai/ai-recommend'
    });
  },

  navigateToVoice: function () {
    wx.navigateTo({
      url: '/gujian/ai/ai-voice'
    });
  }
});