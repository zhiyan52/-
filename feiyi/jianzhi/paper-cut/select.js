const { PATTERN_LIBRARY, FOLD_CONFIGS } = require('../../utils/paper-cut-data.js');

Page({
  data: {
    categories: ['全部', '植物', '吉祥', '婚庆', '生肖', '神话', '节庆'],
    activeCategory: '全部',
    patterns: [],
    userLevel: 1,
    unlockedPatterns: [],
    totalStars: 0,
    selectedPattern: null,
    showFoldSelect: false,
    foldConfigs: FOLD_CONFIGS
  },

  onLoad(options) {
    this.loadUserData();
    this.filterPatterns();

    // 支持从首页传递pattern参数
    if (options.pattern) {
      const pattern = this.data.patterns.find(p => p.id === options.pattern);
      if (pattern && pattern.unlocked) {
        this.setData({ selectedPattern: pattern, showFoldSelect: true });
      }
    }
  },

  loadUserData() {
    const progress = wx.getStorageSync('paperCutProgress') || {
      totalStars: 0,
      unlockedPatterns: ['flower', 'fish'],
      level: 1
    };

    this.setData({
      userLevel: progress.level || 1,
      unlockedPatterns: progress.unlockedPatterns,
      totalStars: progress.totalStars
    });
  },

  filterPatterns() {
    const { activeCategory } = this.data;

    let patterns = Object.entries(PATTERN_LIBRARY).map(([id, info]) => ({
      id,
      ...info,
      unlocked: this.isUnlocked(id, info)
    }));

    if (activeCategory !== '全部') {
      patterns = patterns.filter(p => p.category === activeCategory);
    }

    this.setData({ patterns });
  },

  isUnlocked(id, info) {
    if (this.data.unlockedPatterns.includes(id)) return true;
    if (info.unlockLevel > this.data.userLevel) return false;
    if (info.requireStars && this.data.totalStars < info.requireStars) return false;
    return true;
  },

  switchCategory(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.cat });
    this.filterPatterns();
  },

  selectPattern(e) {
    const { id } = e.currentTarget.dataset;
    const pattern = this.data.patterns.find(p => p.id === id);

    if (!pattern.unlocked) {
      wx.showToast({ title: '未解锁', icon: 'none' });
      return;
    }

    this.setData({
      selectedPattern: pattern,
      showFoldSelect: true
    });
  },

  selectFold(e) {
    const { fold } = e.currentTarget.dataset;
    const { selectedPattern } = this.data;

    wx.navigateTo({
      url: `/mingsu/jianzhi/paper-cut/fold?pattern=${selectedPattern.id}&fold=${fold.id}&complexity=${selectedPattern.difficulty}`
    });

    this.setData({ showFoldSelect: false });
  },

  closeFoldSelect() {
    this.setData({ showFoldSelect: false });
  },

  goBack() {
    wx.navigateBack();
  }
});