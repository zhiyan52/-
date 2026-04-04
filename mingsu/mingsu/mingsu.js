 // mingsu/mingsu/mingsu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [
      {
        id: 1,
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20chinese%20folk%20food%20festival%20banner%20with%20traditional%20patterns&image_size=landscape_16_9',
        title: '民俗美食文化节',
        subtitle: '探索中华传统饮食文化'
      },
      {
        id: 2,
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20seasonal%20food%20solar%20terms&image_size=landscape_16_9',
        title: '二十四节气食俗',
        subtitle: '不时不食，顺时而食'
      },
      {
        id: 3,
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20food%20craftsmanship&image_size=landscape_16_9',
        title: '非遗美食技艺',
        subtitle: '传承千年的匠心工艺'
      }
    ],
    seasonalList: [
      {
        id: 1,
        title: '清明青团',
        desc: '清明节传统食品，象征着对祖先的缅怀',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake%20traditional%20food&image_size=square'
      },
      {
        id: 2,
        title: '立夏蛋',
        desc: '立夏吃蛋，祈求夏日平安健康',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20lixia%20solar%20term%20eggs%20traditional%20food&image_size=square'
      }
    ],
    waterfallList: [
      {
        id: 1,
        title: '北京烤鸭',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20traditional%20chinese%20food&image_size=square',
        tags: ['地域珍味', '北京']
      },
      {
        id: 2,
        title: '四川火锅',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20hot%20pot%20traditional%20chinese%20food&image_size=square',
        tags: ['地域珍味', '四川']
      },
      {
        id: 3,
        title: '广式早茶',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20morning%20tea%20traditional%20chinese%20food&image_size=square',
        tags: ['地域珍味', '广东']
      },
      {
        id: 4,
        title: '苏州糕点',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20traditional%20pastries%20chinese%20food&image_size=square',
        tags: ['传统糕饼', '江苏']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadData();
  },

  /**
   * 加载数据
   */
  loadData() {
    // 模拟数据加载
    console.log('加载民俗百味数据');
  },

  /**
   * 跳转到搜索页
   */
  goToSearch() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/search/search'
    });
  },

  /**
   * 跳转到个人中心
   */
  goToProfile() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/profile/profile'
    });
  },

  /**
   * 跳转到分类页面
   */
  goToCategory(e) {
    const type = e.currentTarget.dataset.type;
    let url = '';
    switch (type) {
      case 'seasons':
        url = '/mingsu/mingsu/pages/categories/seasons';
        break;
      case 'regions':
        url = '/mingsu/mingsu/pages/categories/regions';
        break;
      case 'intangible':
        url = '/mingsu/mingsu/pages/categories/intangible';
        break;
      case 'cakes':
        url = '/mingsu/mingsu/pages/categories/cakes';
        break;
      default:
        url = '/mingsu/mingsu/pages/categories/categories';
    }
    wx.navigateTo({
      url: url
    });
  },

  /**
   * 跳转到分类列表页
   */
  goToCategoryList() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/categories/categories'
    });
  },

  /**
   * 跳转到详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/detail/detail?id=${id}`
    });
  },

  /**
   * 跳转到打卡页
   */
  goToCheckin() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/checkin/checkin'
    });
  },

  /**
   * 跳转到食文化小课堂
   */
  goToClassroom() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/encyclopedia/encyclopedia'
    });
  },

  /**
   * 跳转到首页
   */
  goToHome() {
    wx.redirectTo({
      url: '/mingsu/mingsu/mingsu'
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '民俗百味 | 探索中华传统饮食文化',
      path: '/mingsu/mingsu/mingsu',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20food%20culture%20banner&image_size=landscape_16_9'
    };
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '民俗百味 | 探索中华传统饮食文化的魅力',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20food%20culture%20banner&image_size=landscape_16_9'
    };
  }
})