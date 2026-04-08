// gujianSub/gujianSub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [
      {
        id: 1,
        title: '应县木塔',
        dynasty: '辽·清宁二年',
        description: '世界最高木塔，无钉无铆',
        image: '/images/blank.png',
        url: '/gujianSub/gongdian/detail?id=1'
      },
      {
        id: 2,
        title: '故宫',
        dynasty: '明·永乐四年',
        description: '世界上现存规模最大、保存最为完整的木质结构古建筑之一',
        image: '/images/blank.png',
        url: '/gujianSub/gongdian/detail?id=2'
      },
      {
        id: 3,
        title: '苏州园林',
        dynasty: '明·嘉靖年间',
        description: '中国古典园林的杰出代表',
        image: '/images/blank.png',
        url: '/gujianSub/yuanlin/detail?id=1'
      }
    ],
    currentBanner: 0,
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
    ],
    recommendList: [
      {
        id: 1,
        title: '营造学堂：斗拱入门',
        duration: '12分钟',
        learners: '1.2万人已学',
        image: '/images/blank.png'
      },
      {
        id: 2,
        title: '专题：唐代木构巡礼',
        duration: '8座建筑',
        learners: '3条路线',
        image: '/images/blank.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.startBannerAutoPlay();
  },

  /**
   * 开始轮播图自动播放
   */
  startBannerAutoPlay() {
    this.bannerTimer = setInterval(() => {
      const current = this.data.currentBanner;
      const next = (current + 1) % this.data.bannerList.length;
      this.setData({ currentBanner: next });
    }, 3000);
  },

  /**
   * 停止轮播图自动播放
   */
  onHide() {
    if (this.bannerTimer) {
      clearInterval(this.bannerTimer);
    }
  },

  /**
   * 轮播图切换
   */
  bannerChange(e) {
    this.setData({ currentBanner: e.detail.current });
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
   * 跳转到推荐内容
   */
  goToRecommend(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/gujianSub/gongdian/detail?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到发现页面
   */
  goToDiscover() {
    wx.navigateTo({
      url: '/gujianSub/discover/discover',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到雅集页面
   */
  goToSocial() {
    wx.navigateTo({
      url: '/gujianSub/social/social',
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
