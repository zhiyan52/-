 // pages/gujian/gujian.js
Page({
  data: {
    categoryList: [
      {
        id: 1,
        name: '宫殿',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/GONG.png',
        loaded: false
      },
      {
        id: 2,
        name: '园林',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/yuanl.png',
        loaded: false
      },
      {
        id: 3,
        name: '民居',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/MING.png',
        loaded: false
      },
      {
        id: 4,
        name: '塔阁',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/TA.png',
        loaded: false
      },
      {
        id: 5,
        name: '桥梁',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/qiao.png',
        loaded: false
      }
    ],
    pressedIndex: -1,
    loadingProgress: {}
  },

  onLoad() {
    this.preloadImages();
  },

  // 预加载图片
  preloadImages() {
    this.data.categoryList.forEach((item, index) => {
      wx.cloud.downloadFile({
        fileID: item.img,
        success: () => {
          this.setData({
            [`categoryList[${index}].loaded`]: true,
            [`loadingProgress.${item.id}`]: 100
          });
        },
        fail: () => {
          // 云存储图片直接用，标记为已加载
          this.setData({
            [`categoryList[${index}].loaded`]: true,
            [`loadingProgress.${item.id}`]: 100
          });
        }
      });
    });
  },

  goBack() {
    wx.navigateBack();
  },

  // 触摸开始：按压反馈
  onTouchStart(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ pressedIndex: index });
    
    // 轻微震动反馈
    wx.vibrateShort({ type: 'light' });
  },

  // 触摸结束
  onTouchEnd() {
    this.setData({ pressedIndex: -1 });
  },

  onCategoryTap(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const index = e.currentTarget.dataset.index;
    
    // 保持按压状态一会儿再跳转
    this.setData({ pressedIndex: index });
    
    setTimeout(() => {
      this.setData({ pressedIndex: -1 });
      
      const subPackagePageMap = {
        1: '/gujianSub/gongdian/gongdian',
        2: '/gujianSub/yuanlin/yuanlin',
        3: '/gujianSub/minju/minju',
        4: '/gujianSub/tage/tage',
        5: '/gujianSub/qiaoliang/qiaoliang'
      };

      const targetUrl = subPackagePageMap[id];
      if (targetUrl) {
        wx.navigateTo({
          url: targetUrl,
          fail: (err) => {
            wx.showToast({
              title: '页面跳转失败',
              icon: 'error'
            });
            console.error('分类跳转失败：', err);
          }
        });
      }
    }, 150);
  },

  onARScan() {
    wx.vibrateShort({ type: 'light' });
    wx.navigateTo({
      url: '/gujianSub/building3D/building3D',
      fail: () => {
        wx.showToast({ title: 'AR页面未找到', icon: 'error' });
      }
    });
  },

  onTest() {
    wx.vibrateShort({ type: 'light' });
    wx.navigateTo({
      url: '/gujianSub/wenda1/wenda1',
      fail: () => {
        wx.showToast({ title: '问答页面未找到', icon: 'error' });
      }
    });
  },

  onMap() {
    wx.vibrateShort({ type: 'light' });
    wx.navigateTo({
      url: '/gujianSub/map/map',
      fail: () => {
        wx.showToast({ title: '地图页面未找到', icon: 'error' });
      }
    });
  }
});
