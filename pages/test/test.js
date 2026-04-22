// 测试页面
Page({
  data: {},
  
  onLoad() {
    console.log('Test page loaded');
  },
  
  goBack() {
    wx.navigateBack();
  }
});