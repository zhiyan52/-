const { PATTERN_LIBRARY } = require('../../utils/paper-cut-data.js');

Page({
  data: {
    userInfo: null,
    totalWorks: 0,
    totalStars: 0,
    unlockedPatterns: ['flower', 'fish'],
    recentWorks: [],
    seasonalTheme: null,
    dailyTip: ''
  },

  onLoad() {
    this.loadUserProgress();
    this.checkSeasonalTheme();
    this.setData({ dailyTip: this.getRandomTip() });
  },

  onShow() {
    this.loadUserProgress();
  },

  loadUserProgress() {
    const progress = wx.getStorageSync('paperCutProgress') || {
      totalWorks: 0,
      totalStars: 0,
      unlockedPatterns: ['flower', 'fish'],
      works: []
    };

    this.setData({
      totalWorks: progress.totalWorks,
      totalStars: progress.totalStars,
      unlockedPatterns: progress.unlockedPatterns,
      recentWorks: progress.works.slice(-3).reverse()
    });
  },

  checkSeasonalTheme() {
    const now = new Date();
    const month = now.getMonth() + 1;

    const themes = {
      1: { name: '春节', icon: '🧧', pattern: 'zodiac-ox' },
      2: { name: '元宵', icon: '🏮', pattern: 'lantern' },
      5: { name: '端午', icon: '🐲', pattern: 'zodiac-dragon' },
      8: { name: '中秋', icon: '🌕', pattern: 'rabbit' },
      9: { name: '重阳', icon: '🌼', pattern: 'chrysanthemum' }
    };

    if (themes[month]) {
      this.setData({ seasonalTheme: themes[month] });
    }
  },

  startSeasonal() {
    if (this.data.seasonalTheme) {
      wx.navigateTo({
        url: `/feiyi/jianzhi/paper-cut/select?pattern=${this.data.seasonalTheme.pattern}&seasonal=1`
      });
    }
  },

  viewRecentWork(e) {
    const { id } = e.currentTarget.dataset;
    if (id) {
      wx.navigateTo({
        url: `/feiyi/jianzhi/paper-cut/result?workId=${id}`
      });
    }
  },

  getRandomTip() {
    const tips = [
      '"剪纸要心中有样，下刀有神" —— 蔚县剪纸传承人 王老赏',
      '"剪纸是一种语言，表达着人们对生活的热爱" —— 国家级非遗传承人 张锐利',
      '"一刀一剪，剪出人生百态" —— 剪纸艺术家 李守白',
      '"剪纸不仅是技艺，更是文化的传承" —— 民间艺术家 王桂英',
      '"每一张剪纸都是一个故事" —— 传统工艺大师 陈少芳'
    ];
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  },

  startPaperCut() {
    wx.navigateTo({ url: '/feiyi/jianzhi/paper-cut/select' });
  },

  goToWorkshop() {
    wx.navigateTo({ url: '/feiyi/jianzhi/pages/workshop/workshop' });
  },

  goToGallery() {
    wx.navigateTo({ url: '/feiyi/jianzhi/pages/gallery/gallery' });
  },

  onShareAppMessage() {
    return {
      title: '古雅文轩·指尖非遗，一起来剪窗花吧！',
      path: '/pages/index/index'
    };
  }
});