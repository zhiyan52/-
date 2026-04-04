// mingsu/mingsu/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    history: [],
    hotKeywords: [
      { id: 1, name: '北京烤鸭' },
      { id: 2, name: '清明青团' },
      { id: 3, name: '四川火锅' },
      { id: 4, name: '广式早茶' },
      { id: 5, name: '非遗技艺' },
      { id: 6, name: '二十四节气' }
    ],
    hasResult: false,
    results: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载搜索历史
    this.loadHistory();
  },

  /**
   * 加载搜索历史
   */
  loadHistory() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({ history });
  },

  /**
   * 输入关键词
   */
  onInput(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  /**
   * 执行搜索
   */
  onSearch() {
    const { keyword } = this.data;
    if (!keyword.trim()) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    // 保存搜索历史
    this.saveHistory(keyword);

    // 模拟搜索结果
    const mockResults = [
      {
        id: 1,
        title: '北京烤鸭',
        desc: '北京烤鸭是具有世界声誉的北京著名菜式，起源于中国南北朝时期。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20traditional%20chinese%20food&image_size=square',
        tags: ['地域珍味', '北京']
      },
      {
        id: 2,
        title: '清明青团',
        desc: '青团是江南地区的传统特色小吃，用艾草的汁拌进糯米粉里，再包裹进豆沙馅儿。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake%20traditional%20food&image_size=square',
        tags: ['时令食俗', '江南']
      }
    ];

    this.setData({
      hasResult: true,
      results: mockResults
    });
  },

  /**
   * 保存搜索历史
   */
  saveHistory(keyword) {
    let history = this.data.history;
    // 去重并添加到开头
    history = history.filter(item => item !== keyword);
    history.unshift(keyword);
    // 最多保存10条
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    this.setData({ history });
    wx.setStorageSync('searchHistory', history);
  },

  /**
   * 清除搜索历史
   */
  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清除搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ history: [] });
          wx.removeStorageSync('searchHistory');
        }
      }
    });
  },

  /**
   * 点击历史记录搜索
   */
  searchByHistory(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword });
    this.onSearch();
  },

  /**
   * 点击热门搜索
   */
  searchByHot(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword });
    this.onSearch();
  },

  /**
   * 跳转到详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/detail/detail?id=${id}`
    });
  },

  /**
   * 显示筛选
   */
  showFilter() {
    wx.showToast({
      title: '筛选功能开发中...',
      icon: 'none'
    });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '民俗百味 | 搜索民俗文化',
      path: '/mingsu/mingsu/pages/search/search'
    };
  }
})