Page({
  data: {
    collected: false,
    show1: true,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
  },

  onLoad() {
    const c = wx.getStorageSync('gongdian_collect') || false;
    this.setData({ collected: c });
  },

  goBack() {
    wx.navigateBack();
  },

  collect() {
    const newStatus = !this.data.collected;
    this.setData({ collected: newStatus });
    wx.setStorageSync('gongdian_collect', newStatus);
    wx.showToast({ title: newStatus ? '已收藏' : '已取消', icon: 'none' });
  },

  toggle(e) {
    const key = e.currentTarget.dataset.show;
    this.setData({ [key]: !this.data[key] });
  },

  goTo(e) {
    const id = e.currentTarget.dataset.to;
    wx.createSelectorQuery().select('#' + id).boundingClientRect(rect => {
      wx.pageScrollTo({ scrollTop: rect.top - 100, duration: 300 });
    }).exec();
  },

  tip(e) {
    wx.showToast({ title: e.currentTarget.dataset.txt, icon: 'none' });
  },

  preview(e) {
    wx.previewImage({ urls: [e.currentTarget.dataset.src] });
  },

  playVoice() {
    wx.showToast({ title: '开始播放语音讲解', icon: 'none' });
  },

  onShareAppMessage() {
    return { title: '宫殿建筑 | 中国古建知识' };
  }
});