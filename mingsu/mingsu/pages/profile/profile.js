// mingsu/mingsu/pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20style%20avatar%20portrait&image_size=square',
      name: '民俗文化爱好者',
      points: 120,
      level: '民俗文化爱好者'
    },
    checkinStats: {
      totalDays: 15,
      consecutiveDays: 5,
      certificates: 2
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    });
  },

  /**
   * 跳转到收藏页面
   */
  goToCollections() {
    wx.showToast({
      title: '收藏功能开发中...',
      icon: 'info'
    });
  },

  /**
   * 跳转到足迹页面
   */
  goToFootprints() {
    wx.showToast({
      title: '足迹功能开发中...',
      icon: 'info'
    });
  },

  /**
   * 跳转到打卡页面
   */
  goToCheckin() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/checkin/checkin'
    });
  },

  /**
   * 跳转到社区页面
   */
  goToCommunity() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/community/community'
    });
  },

  /**
   * 跳转到个人资料编辑页面
   */
  goToEditProfile() {
    wx.showToast({
      title: '个人资料编辑功能开发中...',
      icon: 'info'
    });
  },

  /**
   * 清除缓存
   */
  clearCache() {
    wx.showToast({
      title: '缓存已清除',
      icon: 'success'
    });
  },

  /**
   * 关于我们
   */
  aboutUs() {
    wx.showToast({
      title: '关于我们功能开发中...',
      icon: 'info'
    });
  },

  /**
   * 退出登录
   */
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})