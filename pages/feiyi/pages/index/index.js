// pages/feiyi/pages/index/index.js
const DataLoader = require('../../utils/data-loader');
const AudioManager = require('../../utils/audio-manager');
const { HeritageDataUtils, INHERITORS } = require('../../data/index.js');

Page({
  data: {
    // 分类
    categories: [],
    currentCategory: 'all',
    
    // 搜索
    searchKeyword: '',
    isSearching: false,
    
    // 列表
    heritageList: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    sortBy: 'sortOrder',
    listTitle: '全部非遗',
    
    // 推荐
    hotList: [],
    
    // 统计
    stats: {
      total: 0,
      withAudio: 0,
      inheritors: 0
    },
    
    // 音频
    currentPlayingId: '',
    showAudioPlayer: false,
    audioPlaylist: []
  },

  onLoad() {
    this._initPage();
  },

  onShow() {
    // 同步音频状态
    this._syncAudioStatus();
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this._loadMore();
    }
  },

  onPullDownRefresh() {
    this._refreshData().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  onHide() {
    // 页面隐藏时可选暂停音频
  },

  onUnload() {
    // 页面卸载时清理
    if (!this.data.showAudioPlayer) {
      AudioManager.stop();
    }
  },

  // ============ 初始化 ============
  async _initPage() {
    wx.showLoading({ title: '加载中' });
    
    try {
      // 并行加载数据
      const [categories, stats, hotList] = await Promise.all([
        DataLoader.getCategories(),
        DataLoader.getStatistics(),
        DataLoader.getRecommendations('hot', 5)
      ]);
      
      // 获取传承人数量
      const inheritorsCount = Array.isArray(INHERITORS) ? INHERITORS.length : 0;
      
      this.setData({
        categories: categories || [],
        stats: {
          ...stats,
          inheritors: inheritorsCount
        },
        hotList: hotList || []
      });
      
      // 加载列表
      await this._loadList();
      
    } catch (err) {
      console.error('初始化失败:', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  // ============ 数据加载 ============
  async _loadList(reset = false) {
    if (this.data.loading) return;
    
    const page = reset ? 1 : this.data.page;
    
    this.setData({ loading: true });
    
    try {
      const result = await DataLoader.getHeritageList({
        category: this.data.currentCategory,
        page: page,
        pageSize: this.data.pageSize,
        keyword: this.data.searchKeyword,
        sortBy: this.data.sortBy
      });
      
      // 更新播放列表
      const list = result.list || [];
      const audioItems = list.filter(h => h.audio?.hasAudio).map(h => h.id);
      
      this.setData({
        heritageList: reset ? list : [...this.data.heritageList, ...list],
        page: page + 1,
        hasMore: result.hasMore || false,
        audioPlaylist: reset ? audioItems : [...this.data.audioPlaylist, ...audioItems]
      });
      
      // 预加载音频
      if (page === 1 && audioItems.length > 0) {
        AudioManager.preload(audioItems.slice(0, 3));
      }
      
    } catch (err) {
      console.error('加载列表失败:', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  _loadMore() {
    this._loadList();
  },

  async _refreshData() {
    this.setData({
      page: 1,
      hasMore: true,
      heritageList: []
    });
    await this._loadList(true);
  },

  // ============ 事件处理 ============
  onCategoryChange(e) {
    const { id } = e.detail || {};
    if (!id) return;
    
    const { CategoryMap } = require('../../data/index.js');
    const categoryName = CategoryMap.getName(id) || '其他';
    
    this.setData({
      currentCategory: id,
      listTitle: categoryName + '非遗',
      page: 1,
      hasMore: true,
      heritageList: [],
      searchKeyword: '',
      isSearching: false
    });
    
    this._loadList(true);
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail?.value || '' });
  },

  onSearchConfirm() {
    if (!this.data.searchKeyword.trim()) return;
    
    this.setData({
      isSearching: true,
      listTitle: `搜索：${this.data.searchKeyword}`,
      page: 1,
      hasMore: true,
      heritageList: [],
      currentCategory: 'all'
    });
    
    this._loadList(true);
  },

  clearSearch() {
    this.setData({
      searchKeyword: '',
      isSearching: false,
      listTitle: '全部非遗',
      page: 1,
      hasMore: true,
      heritageList: []
    });
    
    this._loadList(true);
  },

  changeSort(e) {
    const { type } = e.currentTarget?.dataset || {};
    if (!type) return;
    
    this.setData({
      sortBy: type,
      page: 1,
      hasMore: true,
      heritageList: []
    });
    
    this._loadList(true);
  },

  viewAllHot() {
    this.setData({
      sortBy: 'sortOrder',
      listTitle: '热门推荐'
    });
    this._loadList(true);
  },

  // ============ 导航 ============
  goToDetail(e) {
    const { id } = e.detail || {};
    if (!id) return;
    
    wx.navigateTo({
      url: `/pages/feiyi/pages/detail/detail?id=${id}`
    });
  },

  goToInheritor(e) {
    const { id } = e.detail || {};
    if (!id) return;
    
    wx.navigateTo({
      url: `/pages/feiyi/pages/inheritor/inheritor?id=${id}`
    });
  },

  // ============ 音频控制 ============
  onAudioPlay(e) {
    const { id } = e.detail || {};
    if (!id) return;
    
    this.setData({
      currentPlayingId: id,
      showAudioPlayer: true
    });
    
    // 设置播放列表到全局播放器
    const player = this.selectComponent('#globalPlayer');
    if (player) {
      player.setPlaylist(this.data.audioPlaylist);
    }
  },

  onAudioPause(e) {
    this.setData({ currentPlayingId: '' });
  },

  onAudioEnd(e) {
    // 自动播放下一首已在组件中处理
  },

  onAudioChange(e) {
    const { id } = e.detail || {};
    if (!id) return;
    
    this.setData({ currentPlayingId: id });
  },

  onAudioClose() {
    this.setData({ showAudioPlayer: false });
    AudioManager.stop();
  },

  _syncAudioStatus() {
    try {
      const status = AudioManager.getStatus();
      if (status.isPlaying && status.heritageId) {
        this.setData({
          currentPlayingId: status.heritageId,
          showAudioPlayer: true
        });
      }
    } catch (err) {
      console.error('同步音频状态失败:', err);
    }
  }
});
