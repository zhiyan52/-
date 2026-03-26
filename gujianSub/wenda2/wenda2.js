 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    total: 80, // 固定为80题，和题库保持一致
    correctRate: '0.0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从答题页接收分数参数
    const score = parseInt(options.score) || 0;
    const total = this.data.total;

    // 在 JS 中计算并格式化正确率（解决 WXML 不能调用 .toFixed() 的问题）
    const correctRate = ((score / total * 100).toFixed(1));

    this.setData({
      score: score,
      correctRate: correctRate
    });
  },

  /**
   * 重新开始答题
   */
  handleRestart() {
    // 使用 redirectTo 替换 navigateTo，避免页面栈堆积导致超时
    wx.redirectTo({
      url: '/gujianSub/wenda1/wenda1' // 替换为你的答题页路径
    });
  },

  /**
   * 返回首页
   */
  handleBack() {
    // 使用 reLaunch 彻底清空页面栈，从根本解决 navigateTo 超时问题
    wx.reLaunch({
      url: '/pages/index/index' // 替换为你的首页路径
    });
  },

  /**
   * 分享功能
   */
  onShareAppMessage() {
    return {
      title: `我答对了${this.data.score}道古建筑题，快来挑战！`,
      path: '/pages/index/index'
    };
  }
});