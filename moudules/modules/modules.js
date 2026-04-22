// moudules/modules/modules.js
Page({
  data: {
    // 全站数据统计
    totalUsers: '12,856',
    totalCheckins: '45,238',
    totalViews: '1,245,678',

    // 五大分类统计数据
    categoryStats: {
      gujian: {
        count: '156',
        hot: 'TOP 1',
        update: '今日更新 3 篇'
      },
      feiyi: {
        count: '234',
        hot: 'TOP 2',
        update: '昨日更新 5 篇'
      },
      diancang: {
        count: '89',
        hot: 'TOP 4',
        update: ''
      },
      mingsu: {
        count: '312',
        hot: 'TOP 3',
        update: '本周更新 12 篇'
      },
      shufa: {
        count: '178',
        hot: 'TOP 5',
        update: '今日更新 2 篇'
      }
    },

    // 热门内容推荐
    hotContent: [
      {
        id: 1,
        title: '故宫太和殿建筑艺术赏析',
        category: 'gujian',
        categoryName: '古建雅韵',
        views: '25,678',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forbidden%20city%20taihe%20palace%20ancient%20chinese%20architecture&image_size=landscape_16_9'
      },
      {
        id: 2,
        title: '苏绣技艺传承与创新',
        category: 'feiyi',
        categoryName: '非遗匠心',
        views: '18,945',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20suzhou%20embroidery%20traditional%20craft&image_size=landscape_16_9'
      },
      {
        id: 3,
        title: '《永乐大典》的历史价值',
        category: 'diancang',
        categoryName: '典藏拾珠',
        views: '15,321',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20book%20y永乐大典%20historical%20document&image_size=landscape_16_9'
      },
      {
        id: 4,
        title: '中国传统节日美食文化',
        category: 'mingsu',
        categoryName: '民俗百味',
        views: '22,456',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20festival%20food%20culture&image_size=landscape_16_9'
      },
      {
        id: 5,
        title: '王羲之《兰亭序》书法解析',
        category: 'shufa',
        categoryName: '书画雅集',
        views: '19,876',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20lanting%20xu%20wang%20xizhi&image_size=landscape_16_9'
      }
    ]
  },

  onLoad(options) {
    this.loadData();
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadData();
  },

  loadData() {
    // 模拟数据加载
    wx.showLoading({ title: '加载中...' });
    setTimeout(() => {
      wx.hideLoading();
      // 数据已在data中初始化，实际项目中可从后端获取
    }, 500);
  },

  goToCategory(e) {
    const category = e.currentTarget.dataset.category;
    let url = '';

    switch (category) {
      case 'gujian':
        url = '/gujian/home/home';
        break;
      case 'feiyi':
        url = '/pages/feiyi/pages/index/index';
        break;
      case 'diancang':
        url = '/diancang/diancang/diancang';
        break;
      case 'mingsu':
        url = '/mingsu/mingsu';
        break;
      case 'shufa':
        url = '/shuhua/shuhua/shuhua';
        break;
      default:
        url = '/pages/index/index';
    }

    wx.navigateTo({
      url: url,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToDetail(e) {
    const { id, category } = e.currentTarget.dataset;

    // 根据分类跳转到不同的详情页
    let url = '';
    switch (category) {
      case 'gujian':
        url = `/gujian/home/home?id=${id}`;
        break;
      case 'feiyi':
        url = `/pages/feiyi/pages/detail/detail?id=${id}`;
        break;
      case 'diancang':
        url = `/diancang/diancang/diancang-detail?id=${id}`;
        break;
      case 'mingsu':
        url = `/mingsu/mingsu/pages/detail/detail?id=${id}`;
        break;
      case 'shufa':
        url = `/shufa/shufa/pages/calligraphy/copybook?id=${id}`;
        break;
      default:
        url = '/pages/index/index';
    }

    wx.navigateTo({
      url: url,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  onShareAppMessage() {
    return {
      title: '模块总览 - 全平台内容聚合与数据统计',
      path: '/moudules/modules/modules',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20cultural%20platform%20dashboard%20data%20visualization&image_size=landscape_16_9'
    };
  },

  // 跳转到AI文化助手
  goToAIAssistant() {
    wx.navigateTo({
      url: '/ai-assistant/ai-assistant',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  // 跳转到文化研学足迹地图
  goToCulturalMap() {
    wx.navigateTo({
      url: '/pages/cultural-map/cultural-map',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  }
});
