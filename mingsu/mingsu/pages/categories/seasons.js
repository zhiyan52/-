// mingsu/mingsu/pages/categories/seasons.js
Page({
  data: {
    seasonalList: [
      {
        id: 1,
        title: '清明青团',
        desc: '清明节传统食品，象征着对祖先的缅怀',
        season: '春季',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qingtuan.jpg'
      },
      {
        id: 2,
        title: '立夏蛋',
        desc: '立夏吃蛋，祈求夏日平安健康',
        season: '夏季',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/xiadand.jpg'
      },
      {
        id: 3,
        title: '中秋月饼',
        desc: '中秋节传统食品，象征团圆美满',
        season: '秋季',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/mooncake.jpg'
      },
      {
        id: 4,
        title: '冬至饺子',
        desc: '冬至吃饺子，寓意温暖过冬',
        season: '冬季',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/dumpling.jpg'
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
