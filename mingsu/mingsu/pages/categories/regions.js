// mingsu/mingsu/pages/categories/regions.js
Page({
  data: {
    regionList: [
      {
        id: 2,
        title: '北京烤鸭',
        desc: '北京最著名的菜式，以色泽红艳，肉质肥而不腻，外脆里嫩著称',
        location: '北京',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20traditional%20chinese%20food&image_size=landscape_16_9'
      },
      {
        id: 3,
        title: '四川火锅',
        desc: '四川特色美食，以麻辣鲜香著称，是中国火锅的代表',
        location: '四川',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20hot%20pot%20traditional%20chinese%20food&image_size=landscape_16_9'
      },
      {
        id: 4,
        title: '广式早茶',
        desc: '广东特色饮食文化，包括各种精致的点心和茶品',
        location: '广东',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20morning%20tea%20traditional%20chinese%20food&image_size=landscape_16_9'
      },
      {
        id: 5,
        title: '杭州西湖醋鱼',
        desc: '杭州传统名菜，以西湖草鱼为原料，鱼肉鲜嫩，汤汁酸甜可口',
        location: '浙江',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20west%20lake%20vinegar%20fish%20chinese%20food&image_size=landscape_16_9'
      }
    ]
  },

  onLoad() {
    this.loadRegionData();
  },

  loadRegionData() {
    console.log('加载地域珍味数据');
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
