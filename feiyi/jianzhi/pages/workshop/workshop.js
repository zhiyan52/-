// mingsu/jianzhi/pages/workshop/workshop.js
Page({
  data: {
    works: [],
    stats: {
      total: 0,
      perfect: 0,
      threeStars: 0
    },
    filter: 'all', // all | perfect | recent
    sortBy: 'date' // date | score
  },

  onLoad() {
    this.loadWorks();
  },

  onShow() {
    this.loadWorks();
  },

  loadWorks() {
    const progress = wx.getStorageSync('paperCutProgress') || { works: [] };
    const works = progress.works.map(w => ({
      ...w,
      dateStr: this.formatDate(w.date)
    }));

    this.setData({
      works: this.sortWorks(works),
      stats: {
        total: works.length,
        perfect: works.filter(w => w.score >= 90).length,
        threeStars: works.filter(w => w.stars === 3).length
      }
    });
  },

  sortWorks(works) {
    const { sortBy } = this.data;
    return works.sort((a, b) => {
      if (sortBy === 'date') return b.date - a.date;
      return b.score - a.score;
    });
  },

  formatDate(timestamp) {
    const d = new Date(timestamp);
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  },

  switchFilter(e) {
    this.setData({ filter: e.currentTarget.dataset.filter });
  },

  viewWork(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/mingsu/jianzhi/paper-cut/result?workId=${id}&fromWorkshop=1` });
  },

  shareWork(e) {
    const { id } = e.currentTarget.dataset;
    // 生成分享图
  },

  deleteWork(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认删除',
      content: '删除后无法恢复',
      success: (res) => {
        if (res.confirm) {
          // 删除逻辑
        }
      }
    });
  },

  goBack() {
    wx.navigateBack();
  }
});