// pages/feiyi/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 获取音频
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
        // 播放音频
        this.audioManager.play(res.result.data.audioUrl);
      } else {
        console.error('获取音频失败:', res.result.message);
      }

    } catch (err) {
      console.error('调用云函数失败:', err);
    }
  },

  // 跳转到古建雅韵页面
  goToGujian() {
    wx.navigateTo({
      url: '/gujianSub/gujianSub',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  }
})