// shufa/shufa/pages/calligraphy/main.js
Page({
  data: {
  },

  onLoad(options) {
  },

  navigateToCalligraphy() {
    wx.switchTab({
      url: '/shufa/shufa/pages/calligraphy/copybook'
    });
  },

  navigateToPainting() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/painting'
    });
  },

  navigateToCharacter() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/character'
    });
  },

  navigateToCollection() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/collection'
    });
  },

  navigateToCopybook() {
    wx.switchTab({
      url: '/shufa/shufa/pages/calligraphy/copybook'
    });
  },

  navigateToCreation() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/creation'
    });
  },

  onShareAppMessage() {
    return {
      title: '书画雅集',
      path: '/shufa/shufa/pages/calligraphy/main'
    };
  }
});
