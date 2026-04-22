// 我的收藏页面
Page({
  data: {
    collections: []
  },

  onLoad() {
    console.log('Collection page loaded');
    this.loadCollections();
  },

  // 加载收藏数据
  loadCollections() {
    console.log('Loading collections');
    // 从本地存储获取收藏数据
    const collections = wx.getStorageSync('collectedList') || [];
    console.log('Collections found:', collections);
    this.setData({ collections });
  },

  // 返回
  goBack() {
    console.log('Going back');
    wx.navigateBack();
  },

  // 查看详情
  viewDetail(e) {
    console.log('View detail called:', e);
    const id = e.currentTarget.dataset.id;
    console.log('Detail id:', id);
    const collection = this.data.collections.find(item => item.id === id || item.name === id);

    if (collection) {
      console.log('Collection found:', collection);
      wx.navigateTo({
        url: `/pages/culture-detail/detail?id=${id}&name=${encodeURIComponent(collection.name)}`,
        success: () => {
          console.log('Navigation to detail success');
        },
        fail: (err) => {
          console.error('Navigation to detail failed:', err);
        }
      });
    } else {
      console.log('Collection not found');
      wx.showToast({ title: '内容不存在', icon: 'error' });
    }
  },

  // 移除收藏
  removeCollection(e) {
    console.log('Remove collection called:', e);
    const id = e.currentTarget.dataset.id;
    console.log('Remove id:', id);
    const collections = this.data.collections.filter(item => item.id !== id && item.name !== id);

    // 更新本地存储
    wx.setStorageSync('collectedList', collections);
    this.setData({ collections });

    wx.showToast({
      title: '已移除收藏',
      icon: 'success'
    });
  },

  // 去探索
  goExplore() {
    console.log('Go explore');
    wx.navigateTo({
      url: '/moudules/modules/modules'
    });
  }
});