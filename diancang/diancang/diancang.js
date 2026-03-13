// pages/classic/classic.js
Page({
  data: {
    tabList: [
      { id: 1, name: '四书五经' },
      { id: 2, name: '诸子百家' },
      { id: 3, name: '唐诗宋词' },
      { id: 4, name: '明清小说' }
    ],
    currentTab: 0,
    bookList: [
      { id: 'lunyu', name: '论语', cover: '/images/classic/lunyu.png', category: 1 },
      { id: 'mengzi', name: '孟子', cover: '/images/classic/mengzi.png', category: 1 },
      { id: 'zhuangzi', name: '庄子', cover: '/images/classic/zhuangzi.png', category: 2 }
    ],
    cachedCount: 2
  },

  onLoad() {
    this.loadCachedData();
  },

  // 切换分类标签
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    this.filterBookList(index);
  },

  // 筛选对应分类的典籍
  filterBookList(tabIndex) {
    const categoryId = this.data.tabList[tabIndex].id;
    // 实际开发中可从全量数据中筛选
    console.log('当前分类ID:', categoryId);
  },

  // 加载本地缓存数据
  loadCachedData() {
    const cached = wx.getStorageSync('cached_classics') || [];
    this.setData({ cachedCount: cached.length });
  },

  // 跳转到典籍详情页
  goToDetail(e) {
    const bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/diancang/diancang/diancang-detail?id=${bookId}`
    });
  }
});