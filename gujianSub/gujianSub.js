Page({
  data: {
    bannerList: [
      {
        id: 1,
        title: '应县木塔',
        dynasty: '辽·清宁二年',
        description: '世界最高木塔，无钉无铆',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
        url: '/gujianSub/gongdian/detail?id=1'
      },
      {
        id: 2,
        title: '故宫',
        dynasty: '明·永乐四年',
        description: '世界上现存规模最大、保存最为完整的木质结构古建筑之一',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
        url: '/gujianSub/gongdian/detail?id=2'
      },
      {
        id: 3,
        title: '苏州园林',
        dynasty: '明·嘉靖年间',
        description: '中国古典园林的杰出代表',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
        url: '/gujianSub/yuanlin/detail?id=1'
      }
    ],
    currentBanner: 0,
    categoryList: [
      {
        id: 'gongdian',
        name: '宫殿',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
        url: '/gujianSub/gongdian/gongdian'
      },
      {
        id: 'yuanlin',
        name: '园林',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
        url: '/gujianSub/yuanlin/yuanlin'
      },
      {
        id: 'minju',
        name: '民居',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
        url: '/gujianSub/minju/minju'
      },
      {
        id: 'tage',
        name: '塔阁',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
        url: '/gujianSub/tage/tage'
      },
      {
        id: 'qiaoliang',
        name: '桥梁',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png',
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
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png'
      },
      {
        id: 2,
        title: '专题：唐代木构巡礼',
        duration: '8座建筑',
        learners: '3条路线',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/blank.png'
      }
    ]
  },

  onLoad(options) {
    console.log('加载古建雅韵分类页面');
  },

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

  goToCategoryList() {
    wx.navigateTo({
      url: '/gujianSub/gujianSub',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

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