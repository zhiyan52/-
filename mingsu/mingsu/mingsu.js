// mingsu/mingsu/mingsu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [
      {
        id: 1,
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/4.jpg',
        title: '民俗美食文化节',
        subtitle: '探索中华传统饮食文化'
      },
      {
        id: 2,
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi.jpg',
        title: '二十四节气食俗',
        subtitle: '不时不食，顺时而食'
      },
      {
        id: 3,
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/c6.jpg',
        title: '非遗美食技艺',
        subtitle: '传承千年的匠心工艺'
      }
    ],
    seasonalList: [
      {
        id: 1,
        title: '清明青团',
        desc: '清明节传统食品，象征着对祖先的缅怀',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/1.jpg'
      },
      {
        id: 2,
        title: '立夏蛋',
        desc: '立夏吃蛋，祈求夏日平安健康',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/s2.jpg'
      }
    ],
    waterfallList: [
      {
        id: 1,
        title: '北京烤鸭',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/2.jpg',
        tags: ['地域珍味', '北京']
      },
      {
        id: 2,
        title: '四川火锅',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/3.jpg',
        tags: ['地域珍味', '四川']
      },
      {
        id: 3,
        title: '广式早茶',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/4.jpg',
        tags: ['地域珍味', '广东']
      },
      {
        id: 4,
        title: '苏州糕点',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/5.jpg',
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
      url: '/mingsu/mingsu/pages/search/search',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到个人中心
   */
  goToProfile() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/profile/profile',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
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
      url: url,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到分类列表页
   */
  goToCategoryList() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/categories/categories',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/detail/detail?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到打卡页
   */
  goToCheckin() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/checkin/checkin',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到食文化小课堂
   */
  goToClassroom() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/encyclopedia/encyclopedia',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
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
      imageUrl: '/images/blank.png'
    };
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '民俗百味 | 探索中华传统饮食文化的魅力',
      imageUrl: '/images/blank.png'
    };
  }
})