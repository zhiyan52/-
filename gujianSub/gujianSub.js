// gujianSub/gujianSub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [
      {
        id: 'gongdian',
        name: '宫殿',
        image: '/images/blank.png',
        url: '/gujianSub/gongdian/gongdian'
      },
      {
        id: 'yuanlin',
        name: '园林',
        image: '/images/blank.png',
        url: '/gujianSub/yuanlin/yuanlin'
      },
      {
        id: 'minju',
        name: '民居',
        image: '/images/blank.png',
        url: '/gujianSub/minju/minju'
      },
      {
        id: 'tage',
        name: '塔阁',
        image: '/images/blank.png',
        url: '/gujianSub/tage/tage'
      },
      {
        id: 'qiaoliang',
        name: '桥梁',
        image: '/images/blank.png',
        url: '/gujianSub/qiaoliang/qiaoliang'
      }
    ],
    toolList: [
      {
        id: 'ar',
        name: 'AR扫描',
        icon: '📱',
        url: '/gujianSub/building3D/building3D'
      },
      {
        id: 'quiz',
        name: '趣味问答',
        icon: '❓',
        url: '/gujianSub/wenda1/wenda1'
      },
      {
        id: 'map',
        name: '打卡地图',
        icon: '🗺️',
        url: '/gujianSub/checkinMap/checkinMap'
      },
      {
        id: 'feiyi',
        name: '非遗文化',
        icon: '🎭',
        url: '/pages/feiyi/pages/index/index'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('加载古建雅韵分类页面');
  },

  /**
   * 跳转到分类页面
   */
  goToCategory(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到工具页面
   */
  goToTool(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到分类页面
   */
  goToCategoryList() {
    wx.navigateTo({
      url: '/gujianSub/gujianSub',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到我的页面
   */
  goToProfile() {
    wx.navigateTo({
      url: '/gujianSub/profile/profile',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  }
})
