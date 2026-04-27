Page({
  data: {
    browsingHistory: [],
    recommendations: []
  },

  onLoad: function (options) {
    // 页面加载时获取浏览历史和推荐内容
    this.getBrowsingHistory();
    this.getRecommendations();
  },

  // 获取浏览历史
  getBrowsingHistory: function () {
    // 模拟浏览历史数据
    const history = [
      {
        title: '春节习俗',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/voi/1.jpg',
        
      },
      {
        title: '重阳节习俗',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/voi/4.jpg',
        
      }
    ];

    this.setData({
      browsingHistory: history
    });
  },

  // 获取推荐内容
  getRecommendations: function () {
    // 模拟推荐数据
    const recommendations = [
      {
        title: '舞龙舞狮',
        image: 'https://picsum.photos/200/200?random=221',
        desc: '中国传统表演艺术，象征喜庆和吉祥。',
        tags: ['传统表演', '节庆文化', '民间艺术']
      },
      {
        title: '剪纸艺术',
        image: 'https://picsum.photos/200/200?random=222',
        desc: '中国民间传统装饰艺术，以精美图案著称。',
        tags: ['传统工艺', '民间艺术', '世界遗产']
      },
      {
        title: '中国书法',
        image: 'https://picsum.photos/200/200?random=223',
        desc: '中国传统文化精髓，以笔墨纸砚为工具。',
        tags: ['传统艺术', '文化遗产', '书法艺术']
      },
      {
        title: '中国风筝',
        image: 'https://picsum.photos/200/200?random=224',
        desc: '中国传统民间工艺品，是人类最早的飞行器雏形。',
        tags: ['民间工艺', '传统玩具', '世界遗产']
      }
    ];

    this.setData({
      recommendations: recommendations
    });
  },

  // 刷新推荐
  refreshRecommendations: function () {
    wx.showToast({
      title: '刷新中...',
      icon: 'loading'
    });

    // 模拟刷新推荐
    setTimeout(() => {
      // 重新获取推荐内容
      this.getRecommendations();
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    }, 1000);
  },

  // 查看详情
  viewDetail: function (e) {
    const item = e.currentTarget.dataset.item;
    wx.showToast({
      title: '查看' + item.title,
      icon: 'success'
    });

    // 这里可以跳转到详情页面
    console.log('查看详情:', item.title);
  }
});
