Page({
  data: {
    activeTab: 0
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  onShow: function () {
    // 页面显示时执行
  },

  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;

    // 先更新UI状态
    this.setData({
      activeTab: index
    });

    // 直接跳转到对应页面，使用wx.navigateTo
    if (index === 1) {
      // 跳转到分类页面
      wx.navigateTo({
        url: '/gujian/category/category'
      });
    } else if (index === 2) {
      // 跳转到个人中心
      wx.navigateTo({
        url: '/profile/profile/profile'
      });
    }
    // 首页无需跳转
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
  },

  // 跳转到竞赛中心
  navigateToCompetition: function () {
    wx.navigateTo({
      url: '/competition/competition-center'
    });
  }
});