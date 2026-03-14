Page({
  data: {
    item: {},
    isCollected: false,
    showBackTop: false
  },

  onLoad(options) {
    const item = JSON.parse(decodeURIComponent(options.item));
    this.setData({ item });

    const collected = wx.getStorageSync('collectedList') || [];
    const isCollected = collected.some(i => i.name === item.name);
    this.setData({ isCollected });
  },

  // 监听滚动 → 显示返回顶部
  onPageScroll(e) {
    this.setData({
      showBackTop: e.scrollTop > 500
    });
  },

  // 返回顶部
  backToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  },

  // 点击图片全屏预览
  previewImage() {
    wx.previewImage({
      urls: [this.data.item.img]
    });
  },

  // 导航
  openMap() {
    wx.openLocation({
      latitude: this.data.item.latitude,
      longitude: this.data.item.longitude,
      name: this.data.item.name,
      scale: 18
    });
  },

  // 收藏
  toggleCollect() {
    let list = wx.getStorageSync('collectedList') || [];
    const item = this.data.item;

    if (this.data.isCollected) {
      list = list.filter(i => i.name !== item.name);
      wx.showToast({ title: '取消收藏', icon: 'success' });
    } else {
      list.push(item);
      wx.showToast({ title: '收藏成功', icon: 'success' });
    }

    wx.setStorageSync('collectedList', list);
    this.setData({ isCollected: !this.data.isCollected });
  }
});