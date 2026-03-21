Page({
  data: {
    score: 0,
    total: 100,
    rate: 0
  },

  onLoad(options) {
    // 接收答题得分
    const score = Number(options.score) || 0;
    const total = Number(options.total) || 100;
    const rate = Math.round((score / total) * 100);
    this.setData({
      score,
      total,
      rate
    });
  },

  // 重新答题
  restartGame() {
    wx.redirectTo({
      url: '/pages/index/index',
    });
  },

  // 返回首页
  backHome() {
    wx.navigateBack({
      delta: 1
    });
  }
});