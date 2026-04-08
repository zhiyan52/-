// mingsu/mingsu/pages/search/search.js
Page({
  data: {
    searchKeyword: '',
    searchHistory: ['清明青团', '北京烤鸭', '四川火锅', '广式早茶'],
    hotKeywords: ['二十四节气', '非遗美食', '传统糕饼', '地域特色'],
    searchResults: []
  },

  onLoad() {
    this.setFocus();
  },

  setFocus() {
    setTimeout(() => {
      this.setData({ focus: true });
    }, 100);
  },

  handleInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  search() {
    if (!this.data.searchKeyword.trim()) {
      wx.showToast({ title: '请输入搜索关键词', icon: 'error' });
      return;
    }

    this.saveSearchHistory();
    this.performSearch();
  },

  saveSearchHistory() {
    const keyword = this.data.searchKeyword.trim();
    if (keyword) {
      const history = this.data.searchHistory.filter(item => item !== keyword);
      history.unshift(keyword);
      if (history.length > 10) {
        history.pop();
      }
      this.setData({ searchHistory: history });
    }
  },

  performSearch() {
    const keyword = this.data.searchKeyword.trim();
    const results = [
      {
        id: 1,
        title: '清明青团',
        category: '时令食俗',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake&image_size=square'
      },
      {
        id: 2,
        title: '北京烤鸭',
        category: '地域珍味',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck&image_size=square'
      }
    ].filter(item => item.title.includes(keyword) || item.category.includes(keyword));

    this.setData({ searchResults: results });
  },

  selectKeyword(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ searchKeyword: keyword });
    this.search();
  },

  clearHistory() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ searchHistory: [] });
          wx.showToast({ title: '已清除', icon: 'success' });
        }
      }
    });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/detail/detail?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goBack() {
    wx.navigateBack();
  }
});
