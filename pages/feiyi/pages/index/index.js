// pages/feiyi/pages/index/index.js
const DataLoader = require('../../utils/data-loader');
const AudioManager = require('../../utils/audio-manager');
const { HeritageDataUtils, INHERITORS } = require('../../data/index.js');

Page({
  data: {
    categories: [],
    currentCategory: 'craft',

    searchKeyword: '',
    isSearching: false,

    heritageList: [],
    page: 1,
    pageSize: 10,
    hasMore: true,
    loading: false,
    sortBy: 'sortOrder',
    listTitle: '传统技艺',

    hotList: [],

    currentPlayingId: '',
    showAudioPlayer: false,
    audioPlaylist: []
  },

  onLoad() {
    this._initPage();
  },

  onShow() {
    this._syncAudioStatus();
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this._loadMore();
    }
  },

  onShareAppMessage() {
  },

  async getAudio(heritageId) {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getAudio',
        data: {
          heritageId: heritageId,
          type: 'intro'
        }
      });

      if (res.result.code === 0) {
        this.audioManager.play(res.result.data.audioUrl);
      } else {
        console.error('获取音频失败:', res.result.message);
      }

    } catch (err) {
      console.error('调用云函数失败:', err);
    }
  },

  onPullDownRefresh() {
    this._refreshData().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  onHide() {
  },

  onUnload() {
    if (!this.data.showAudioPlayer) {
      AudioManager.stop();
    }
  },

  async _initPage() {
    wx.showLoading({ title: '加载中' });

    try {
      const [categories, hotList] = await Promise.all([
        DataLoader.getCategories(),
        DataLoader.getRecommendations('hot', 5)
      ]);

      this.setData({
        categories: categories || [],
        hotList: hotList || []
      });

      await this._loadList();

    } catch (err) {
      console.error('初始化失败:', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

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

      const list = result.list || [];
      const audioItems = list.filter(h => h.audio && h.audio.hasAudio).map(h => h.id);

      this.setData({
        heritageList: reset ? list : [...this.data.heritageList, ...list],
        page: page + 1,
        hasMore: result.hasMore || false,
        audioPlaylist: reset ? audioItems : [...this.data.audioPlaylist, ...audioItems]
      });

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

  onCategoryChange(e) {
    const { id } = (e.currentTarget && e.currentTarget.dataset) || {};
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
    this.setData({ searchKeyword: e.detail && e.detail.value || '' });
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
    const { type } = (e.currentTarget && e.currentTarget.dataset) || {};
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

  goToDetail(e) {
    const { id } = (e.detail) || {};
    if (!id) return;

    wx.navigateTo({
      url: `/pages/feiyi/pages/detail/detail?id=${id}`
    });
  },

  goToInheritor(e) {
    const { id } = (e.detail) || {};
    if (!id) return;

    wx.navigateTo({
      url: `/pages/feiyi/pages/inheritor/inheritor?id=${id}`
    });
  },

  onAudioPlay(e) {
    const { id } = (e.detail) || {};
    if (!id) return;

    this.setData({
      currentPlayingId: id,
      showAudioPlayer: true
    });

    const player = this.selectComponent('#globalPlayer');
    if (player) {
      player.setPlaylist(this.data.audioPlaylist);
    }
  },

  onAudioPause(e) {
    this.setData({ currentPlayingId: '' });
  },

  onAudioEnd(e) {
  },

  onAudioChange(e) {
    const { id } = (e.detail) || {};
    if (!id) return;

    this.setData({ currentPlayingId: id });
  },

  onAudioClose() {
    this.setData({ showAudioPlayer: false });
    AudioManager.stop();
  },

  goToCommunity() {
    wx.navigateTo({
      url: '/pages/feiyi/pages/community/community'
    });
  },

  // 导航到智能导览
  navigateToAI() {
    wx.navigateTo({
      url: '/feiyi/zhineng/daolan/nfyiyi_guide'
    });
  },

  // 导航到文化问答
  navigateToQA() {
    wx.navigateTo({
      url: '/feiyi/zhineng/wenda/qa'
    });
  },

  // 导航到个性化推荐
  navigateToRecommend() {
    wx.navigateTo({
      url: '/pages/feiyi/ai/ai-recommend'
    });
  },

  // 导航到语音讲解
  navigateToVoice() {
    wx.navigateTo({
      url: '/pages/feiyi/ai/ai-voice'
    });
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