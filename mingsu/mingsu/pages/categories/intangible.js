// mingsu/mingsu/pages/categories/intangible.js
Page({
  data: {
    intangibleList: [
      {
        id: 6,
        title: '景德镇陶瓷茶具',
        desc: '景德镇陶瓷烧制技艺，国家级非物质文化遗产',
        level: '国家级非遗',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/6.jpg'
      },
      {
        id: 7,
        title: '苏绣茶席',
        desc: '苏州刺绣技艺，国家级非物质文化遗产',
        level: '国家级非遗',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/7.jpg'
      },
      {
        id: 8,
        title: '茅台酒',
        desc: '贵州茅台酒酿制技艺，国家级非物质文化遗产',
        level: '国家级非遗',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/8.jpg'
      },
      {
        id: 9,
        title: '山西老陈醋',
        desc: '山西老陈醋酿制技艺，国家级非物质文化遗产',
        level: '国家级非遗',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/9.jpg'
      }
    ]
  },

  onLoad() {
    this.loadIntangibleData();
  },

  loadIntangibleData() {
    console.log('加载非遗食韵数据');
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
