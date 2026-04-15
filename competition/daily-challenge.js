Page({
  data: {
    countdown: {
      hours: '00',
      minutes: '00',
      seconds: '00'
    },
    countdownTimer: null
  },

  onLoad: function (options) {
    this.startCountdown();
  },

  onUnload: function () {
    if (this.data.countdownTimer) {
      clearInterval(this.data.countdownTimer);
    }
  },

  startCountdown: function () {
    this.updateCountdown();
    const timer = setInterval(() => {
      this.updateCountdown();
    }, 1000);
    this.setData({ countdownTimer: timer });
  },

  updateCountdown: function () {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.setData({
      countdown: {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      }
    });
  },

  startChallenge: function () {
    wx.showLoading({
      title: '加载中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.navigateTo({
        url: '/competition/quiz-page?type=daily'
      });
    }, 500);
  },

  viewHistory: function () {
    wx.showToast({
      title: '历史记录功能开发中',
      icon: 'none'
    });
  }
});