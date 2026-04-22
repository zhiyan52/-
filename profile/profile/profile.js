// profile/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoggedIn: false,
    userInfo: {},
    checkinData: {
      totalDays: 45,
      streakDays: 7,
      totalPoints: 1250
    },
    rewards: [
      {
        id: 1,
        title: '初露锋芒',
        desc: '连续打卡7天',
        icon: '🏅',
        achieved: true
      },
      {
        id: 2,
        title: '文化达人',
        desc: '连续打卡30天',
        icon: '🎖️',
        achieved: false
      },
      {
        id: 3,
        title: '传承使者',
        desc: '连续打卡60天',
        icon: '🌟',
        achieved: false
      },
      {
        id: 4,
        title: '文化守护者',
        desc: '连续打卡100天',
        icon: '👑',
        achieved: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.checkLoginStatus();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.checkLoginStatus();
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    console.log('Check login status:', userInfo);
    if (userInfo) {
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      });
      console.log('User logged in');
    } else {
      console.log('User not logged in');
    }
  },

  /**
   * 获取用户信息
   */
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    if (userInfo) {
      wx.showLoading({ title: '登录中...' });

      // 获取登录凭证
      wx.login({
        success: (res) => {
          if (res.code) {
            // 调用云函数进行登录
            wx.cloud.callFunction({
              name: 'user',
              data: {
                action: 'login',
                data: {
                  openid: 'test_openid', // 实际应用中应该从云函数上下文获取
                  userInfo: userInfo
                }
              },
              success: (cloudRes) => {
                if (cloudRes.result.code === 200) {
                  // 存储用户信息到本地
                  wx.setStorageSync('userInfo', userInfo);
                  this.setData({
                    isLoggedIn: true,
                    userInfo: userInfo
                  });
                  wx.hideLoading();
                  wx.showToast({ title: '登录成功', icon: 'success' });
                } else {
                  wx.hideLoading();
                  wx.showToast({ title: '登录失败', icon: 'none' });
                }
              },
              fail: () => {
                // 云函数调用失败，使用本地存储作为备用
                wx.setStorageSync('userInfo', userInfo);
                this.setData({
                  isLoggedIn: true,
                  userInfo: userInfo
                });
                wx.hideLoading();
                wx.showToast({ title: '登录成功', icon: 'success' });
              }
            });
          } else {
            wx.hideLoading();
            wx.showToast({ title: '登录失败', icon: 'none' });
          }
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({ title: '登录失败', icon: 'none' });
        }
      });
    } else {
      wx.showToast({ title: '获取用户信息失败', icon: 'none' });
    }
  },

  /**
   * 绑定手机号
   */
  bindPhone() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '绑定手机号',
      content: '是否授权绑定手机号？',
      success: (res) => {
        if (res.confirm) {
          // 模拟手机号绑定
          const userInfo = this.data.userInfo;
          userInfo.phone = '138****8888'; // 模拟手机号

          // 调用云函数绑定手机号
          wx.cloud.callFunction({
            name: 'user',
            data: {
              action: 'bindPhone',
              data: {
                openid: 'test_openid', // 实际应用中应该从云函数上下文获取
                phone: '138****8888'
              }
            },
            success: (cloudRes) => {
              if (cloudRes.result.code === 200) {
                // 存储用户信息到本地
                wx.setStorageSync('userInfo', userInfo);
                this.setData({
                  userInfo: userInfo
                });
                wx.showToast({ title: '绑定成功', icon: 'success' });
              } else {
                wx.showToast({ title: '绑定失败', icon: 'none' });
              }
            },
            fail: () => {
              // 云函数调用失败，使用本地存储作为备用
              wx.setStorageSync('userInfo', userInfo);
              this.setData({
                userInfo: userInfo
              });
              wx.showToast({ title: '绑定成功', icon: 'success' });
            }
          });
        }
      }
    });
  },

  /**
   * 查看我的收藏
   */
  viewCollection() {
    console.log('viewCollection called');
    if (!this.data.isLoggedIn) {
      console.log('Not logged in');
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    // 跳转到收藏页面
    console.log('Navigating to collection page');
    wx.navigateTo({
      url: '/pages/collection/collection',
      success: () => {
        console.log('Navigation success');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 查看浏览历史
   */
  viewHistory() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.showToast({ title: '查看历史', icon: 'none' });
  },

  /**
   * 查看文化研学足迹地图
   */
  viewCulturalMap() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/pages/cultural-map/cultural-map',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 查看我的数字证书
   */
  viewCertificate() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/pages/certificate/certificate',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 查看设置
   */
  viewSettings() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.showToast({ title: '查看设置', icon: 'none' });
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
          // 清除本地存储的用户信息
          wx.removeStorageSync('userInfo');
          this.setData({
            isLoggedIn: false,
            userInfo: {}
          });
          wx.showToast({ title: '已退出登录', icon: 'success' });
        }
      }
    });
  },

  /**
   * 跳转到古建雅韵个人中心
   */
  goToGujianProfile() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/gujian/home/pages/profile/profile',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到非遗匠心个人中心
   */
  goToFeiyiProfile() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/pages/feiyi/pages/index/profile',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到典藏拾珠个人中心
   */
  goToDiancangProfile() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/diancang/diancang/pages/profile/profile',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到民俗百味个人中心
   */
  goToMingsuProfile() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/profile/profile',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到书画雅集个人中心
   */
  goToShufaProfile() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/collection',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  }
})