Page({
  data: {
    resultData: {
      type: 'daily',
      total: 10,
      correct: 8,
      score: 90
    },
    accuracy: 0,
    baseScore: 0,
    hasBonus: false,
    isWin: false
  },

  onLoad: function (options) {
    if (options.data) {
      try {
        const resultData = JSON.parse(decodeURIComponent(options.data));
        this.setData({ resultData });
        this.calculateStats();
      } catch (e) {
        console.error('解析数据失败', e);
      }
    }
  },

  calculateStats: function () {
    const { resultData } = this.data;
    const accuracy = Math.round((resultData.correct / resultData.total) * 100);
    const baseScore = resultData.correct * 5;
    const hasBonus = resultData.correct === resultData.total;

    let isWin = false;
    if (resultData.type === 'battle') {
      isWin = resultData.correct > 5;
    }

    this.setData({
      accuracy,
      baseScore,
      hasBonus,
      isWin
    });
  },

  onShareAppMessage: function () {
    const { resultData } = this.data;
    return {
      title: `我在${resultData.type === 'daily' ? '每日挑战' : '好友对战'}中答对了${resultData.correct}题，获得${resultData.score}积分！`,
      path: '/competition/competition-center',
      imageUrl: ''
    };
  },

  goBack: function () {
    wx.navigateBack();
  },

  goHome: function () {
    wx.switchTab({
      url: '/gujian/home/home'
    });
  },

  tryAgain: function () {
    wx.navigateBack({
      delta: 2
    });
  }
});