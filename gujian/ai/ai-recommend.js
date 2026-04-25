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
        title: '故宫太和殿',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/gongdian1.jpg',
        time: '2024-04-14 10:30'
      },
      {
        title: '苏州园林',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhineng/yuanlin.jpg',
        time: '2024-04-14 09:15'
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
        title: '天坛祈年殿',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhineng/tiantan.jpg',
        desc: '明清两代皇帝祭天的场所，建筑精美，历史悠久。',
        tags: ['皇家建筑', '宗教建筑', '历史文化']
      },
      {
        title: '颐和园',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhineng/yinhe.jpg',
        desc: '中国古典园林的杰出代表，融合了自然与人文景观。',
        tags: ['园林建筑', '皇家园林', '世界遗产']
      },
      {
        title: '拙政园',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhuozhengyuan.jpg',
        desc: '苏州园林的代表作，以水为中心，布局精巧。',
        tags: ['园林建筑', '江南园林', '世界遗产']
      },
      {
        title: '长城',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhineng/changchen.jpg',
        desc: '中国古代伟大的防御工程，象征着中华民族的坚韧不拔。',
        tags: ['防御建筑', '世界遗产', '历史文化']
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