// mingsu/mingsu/pages/categories/seasons.js
Page({
  data: {
    seasonalList: [
      {
        id: 1,
        title: '清明青团',
        desc: '清明节传统食品，象征着对祖先的缅怀',
        season: '春季',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake%20traditional%20food&image_size=landscape_16_9'
      },
      {
        id: 2,
        title: '立夏蛋',
        desc: '立夏吃蛋，祈求夏日平安健康',
        season: '夏季',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20lixia%20solar%20term%20eggs%20traditional%20food&image_size=landscape_16_9'
      },
      {
        id: 3,
        title: '中秋月饼',
        desc: '中秋节传统食品，象征团圆美满',
        season: '秋季',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20mid%20autumn%20festival%20moon%20cakes&image_size=landscape_16_9'
      },
      {
        id: 4,
        title: '冬至饺子',
        desc: '冬至吃饺子，寓意温暖过冬',
        season: '冬季',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20dongzhi%20solar%20term%20dumplings&image_size=landscape_16_9'
      }
    ]
  },

  onLoad() {
    this.loadSeasonalData();
  },

  loadSeasonalData() {
    console.log('加载时令食俗数据');
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
