// mingsu/mingsu/pages/categories/cakes.js
Page({
  data: {
    cakeList: [
      {
        id: 10,
        title: '苏州月饼',
        desc: '苏州传统月饼，以酥皮和豆沙馅为特色',
        origin: '江苏苏州',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20moon%20cake%20traditional%20chinese%20pastry&image_size=landscape_16_9'
      },
      {
        id: 11,
        title: '北京萨其马',
        desc: '北京传统糕点，口感酥脆，甜而不腻',
        origin: '北京',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20sachima%20traditional%20chinese%20pastry&image_size=landscape_16_9'
      },
      {
        id: 12,
        title: '广东老婆饼',
        desc: '广东传统糕点，皮薄馅多，口感酥脆',
        origin: '广东',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20wife%20cake%20traditional%20chinese%20pastry&image_size=landscape_16_9'
      },
      {
        id: 13,
        title: '杭州定胜糕',
        desc: '杭州传统糕点，象征胜利，口感软糯香甜',
        origin: '浙江杭州',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20dingsheng%20cake%20traditional%20chinese%20pastry&image_size=landscape_16_9'
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
