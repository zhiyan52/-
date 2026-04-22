const { PATTERN_LIBRARY } = require('../../utils/paper-cut-data.js');

Page({
  data: {
    categories: [
      { id: 'plant', name: '植物', icon: '🌸' },
      { id: 'animal', name: '动物', icon: '🐟' },
      { id: 'auspicious', name: '吉祥', icon: '🧧' },
      { id: 'wedding', name: '婚庆', icon: '💑' },
      { id: 'zodiac', name: '生肖', icon: '🐲' },
      { id: 'festival', name: '节庆', icon: '🎊' }
    ],
    collected: {},
    totalCount: 0,
    collectedCount: 0
  },

  onLoad() {
    this.loadCollection();
  },

  loadCollection() {
    const progress = wx.getStorageSync('paperCutProgress') || { works: [] };
    
    // 统计已收集的图案
    const collected = {};
    for (const work of progress.works) {
      collected[work.patternId] = (collected[work.patternId] || 0) + 1;
    }

    const totalCount = Object.keys(PATTERN_LIBRARY).length;
    const collectedCount = Object.keys(collected).length;

    this.setData({
      collected,
      totalCount,
      collectedCount,
      collectProgress: Math.round(collectedCount / totalCount * 100)
    });
  },

  viewDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/feiyi/jianzhi/pages/gallery/gallery?id=${id}` });
  }
});