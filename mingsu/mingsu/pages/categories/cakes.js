// mingsu/mingsu/pages/categories/cakes.js
Page({
  data: {
    cakeList: [
      {
        id: 10,
        title: '苏州月饼',
        desc: '苏州传统月饼，以酥皮和豆沙馅为特色',
        origin: '江苏苏州',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/10.jpg'
      },
      {
        id: 11,
        title: '北京萨其马',
        desc: '北京传统糕点，口感酥脆，甜而不腻',
        origin: '北京',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/11.jpg'
      },
      {
        id: 12,
        title: '广东老婆饼',
        desc: '广东传统糕点，皮薄馅多，口感酥脆',
        origin: '广东',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/12.jpg'
      },
      {
        id: 13,
        title: '杭州定胜糕',
        desc: '杭州传统糕点，象征胜利，口感软糯香甜',
        origin: '浙江杭州',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/13.jpg'
      },
      {
        id: 14,
        title: '上海杏花楼月饼',
        desc: '上海传统月饼，以莲蓉馅和咸蛋黄为特色',
        origin: '上海',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/14.jpg'
      },
      {
        id: 15,
        title: '成都三大炮',
        desc: '成都传统糕点，口感软糯，甜而不腻',
        origin: '四川成都',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/15.jpg'
      }
    ]
  },

  onLoad() {
    this.loadCakeData();
  },

  loadCakeData() {
    console.log('加载传统糕饼数据');
  },

  goBack() {
    wx.navigateBack();
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/detail/detail?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  }
});
