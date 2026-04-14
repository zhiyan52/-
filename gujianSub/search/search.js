// gujianSub/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    historyList: ['应县木塔', '唐代建筑', '斗拱'],
    hotList: ['故宫', '苏州园林', '赵州桥', '悬空寺', '徽派民居', '大雁塔'],
    dynastyList: ['唐代', '宋代', '辽金', '元代', '明代', '清代'],
    regionList: ['华北', '华东', '华南', '西南', '西北', '东北'],
    typeList: ['宫殿', '园林', '民居', '塔阁', '桥梁', '城防'],
    selectedDynasty: '',
    selectedRegion: '',
    selectedType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 输入搜索内容
   */
  inputSearch(e) {
    this.setData({ searchText: e.detail.value });
  },

  /**
   * 提交搜索
   */
  submitSearch() {
    const text = this.data.searchText.trim();
    if (text) {
      this.addToHistory(text);
      this.performSearch(text);
    }
  },

  /**
   * 添加到历史搜索
   */
  addToHistory(text) {
    let history = this.data.historyList.filter(item => item !== text);
    history.unshift(text);
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    this.setData({ historyList: history });
  },

  /**
   * 执行搜索
   */
  performSearch(keyword) {
    wx.showToast({ title: `搜索: ${keyword}`, icon: 'none' });
    // 这里可以添加搜索逻辑
  },

  /**
   * 点击历史搜索
   */
  clickHistory(e) {
    const text = e.currentTarget.dataset.text;
    this.setData({ searchText: text });
    this.performSearch(text);
  },

  /**
   * 点击热门搜索
   */
  clickHot(e) {
    const text = e.currentTarget.dataset.text;
    this.setData({ searchText: text });
    this.addToHistory(text);
    this.performSearch(text);
  },

  /**
   * 清空历史搜索
   */
  clearHistory() {
    this.setData({ historyList: [] });
  },

  /**
   * 选择朝代
   */
  selectDynasty(e) {
    const dynasty = e.currentTarget.dataset.dynasty;
    this.setData({ selectedDynasty: dynasty });
  },

  /**
   * 选择地域
   */
  selectRegion(e) {
    const region = e.currentTarget.dataset.region;
    this.setData({ selectedRegion: region });
  },

  /**
   * 选择类型
   */
  selectType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ selectedType: type });
  },

  /**
   * 取消搜索
   */
  cancelSearch() {
    wx.navigateBack();
  }
})
