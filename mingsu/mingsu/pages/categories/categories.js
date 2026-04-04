// mingsu/mingsu/pages/categories/categories.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      {
        id: 'seasons',
        title: '时令食俗',
        icon: '🌱',
        desc: '二十四节气与传统节日的饮食习俗',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20seasonal%20food%20solar%20terms&image_size=square'
      },
      {
        id: 'regions',
        title: '地域珍味',
        icon: '🗺️',
        desc: '中国各地特色民俗小吃与饮食文化',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20regional%20food%20map%20traditional%20cuisine&image_size=square'
      },
      {
        id: 'intangible',
        title: '非遗食韵',
        icon: '🏆',
        desc: '非物质文化遗产美食与制作技艺',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20food%20craftsmanship&image_size=square'
      },
      {
        id: 'cakes',
        title: '传统糕饼',
        icon: '🎂',
        desc: '中式传统糕点与节庆食品文化',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20pastries%20cakes%20festive%20food&image_size=square'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '分类浏览'
    });
  },

  /**
   * 跳转到分类详情页
   */
  goToCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/categories/${categoryId}`
    });
  },

  /**
   * 返回首页
   */
  goToHome() {
    wx.navigateBack({
      delta: 1
    });
  }
})