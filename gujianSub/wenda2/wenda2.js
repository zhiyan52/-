 // gujianSub/wenda2/wenda2.js
Page({
  data: {
    score: 0,
    total: 80,
    correctRate: '0.0',
    rank: '',           // 段位
    rankColor: '',      // 段位颜色
    maxStreak: 0,       // 最高连续正确
    animationData: {},  // 分数动画
    showConfetti: false // 彩纸特效
  },

  onLoad(options) {
    const score = parseInt(options.score) || 0;
    const total = this.data.total;
    const correctRate = ((score / total * 100).toFixed(1));
    
    // 计算段位
    const { rank, rankColor } = this.calculateRank(score);
    
    this.setData({
      score: score,
      correctRate: correctRate,
      rank: rank,
      rankColor: rankColor,
      maxStreak: parseInt(options.maxStreak) || 0
    });

    // 延迟播放动画
    setTimeout(() => {
      this.playScoreAnimation();
      if (score >= 64) {
        this.setData({ showConfetti: true });
      }
    }, 300);
  },

  // 计算段位
  calculateRank(score) {
    if (score >= 72) return { rank: '大师', rankColor: '#9c27b0' };
    if (score >= 64) return { rank: '黄金', rankColor: '#ffd700' };
    if (score >= 48) return { rank: '白银', rankColor: '#c0c0c0' };
    if (score >= 32) return { rank: '青铜', rankColor: '#cd7f32' };
    return { rank: '新手', rankColor: '#8d6e63' };
  },

  // 分数动画
  playScoreAnimation() {
    const animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-out'
    });
    animation.scale(1.2).step({ duration: 300 });
    animation.scale(1).step({ duration: 500 });
    this.setData({ animationData: animation.export() });
  },

  // 再来一局
  handleRestart() {
    wx.vibrateShort({ type: 'light' });
    wx.redirectTo({
      url: '/gujianSub/wenda1/wenda1'
    });
  },

  // 返回首页
  handleBack() {
    wx.vibrateShort({ type: 'light' });
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  // 分享
  onShareAppMessage() {
    const { score, rank } = this.data;
    return {
      title: `我答对${score}题，获得${rank}段位！来挑战古建筑问答`,
      path: '/pages/index/index',
      imageUrl: '/images/share-result.png'
    };
  },

  // 生成海报
  generatePoster() {
    wx.showLoading({ title: '生成中...' });
    // 实际调用 canvas 绘制海报
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '海报已保存', icon: 'success' });
    }, 1500);
  },

  // 查看错题
  viewMistakes() {
    wx.navigateTo({
      url: '/gujianSub/wenda3/wenda3'
    });
  },

  // 排行榜
  viewRank() {
    wx.navigateTo({
      url: '/gujianSub/rank/rank'
    });
  }
});
