Page({
  data: {
    item: {},
    isCollected: false,
    showBackTop: false
  },

  onLoad(options) {
    // 增加异常处理，防止参数解析失败
    try {
      const item = JSON.parse(decodeURIComponent(options.item));
      // 校验经纬度是否为有效数字，避免导航出错
      if (item.latitude && item.longitude && !isNaN(Number(item.latitude)) && !isNaN(Number(item.longitude))) {
        this.setData({ item });
      } else {
        wx.showToast({
          title: '位置信息异常',
          icon: 'none'
        });
        // 回退到上一页
        setTimeout(() => wx.navigateBack(), 1500);
        return;
      }
    } catch (e) {
      console.error('参数解析失败', e);
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      });
      // 回退到上一页
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    // 读取收藏状态，增加异常处理
    try {
      const collected = wx.getStorageSync('collectedList') || [];
      const isCollected = collected.some(i => i.name === this.data.item.name);
      this.setData({ isCollected });
    } catch (e) {
      console.error('读取收藏数据失败', e);
      this.setData({ isCollected: false });
    }
  },

  // 监听滚动 → 显示返回顶部
  onPageScroll(e) {
    this.setData({
      showBackTop: e.scrollTop > 500
    });
  },

  // 返回顶部（增加动画效果，优化体验）
  backToTop() {
    wx.pageScrollTo({ 
      scrollTop: 0, 
      duration: 300,
      fail: (err) => {
        console.error('返回顶部失败', err);
      }
    });
  },

  // 点击图片全屏预览（增加空值判断）
  previewImage() {
    if (!this.data.item.img) {
      wx.showToast({
        title: '暂无预览图片',
        icon: 'none'
      });
      return;
    }
    wx.previewImage({
      urls: [this.data.item.img],
      fail: (err) => {
        console.error('预览图片失败', err);
        wx.showToast({
          title: '图片预览失败',
          icon: 'none'
        });
      }
    });
  },

  // 导航（核心优化：增加权限校验和异常处理）
  openMap() {
    const { latitude, longitude, name } = this.data.item;
    
    // 先检查是否有位置权限
    wx.getSetting({
      success: (res) => {
        // 未授权位置权限
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              // 授权成功后打开导航
              this._openLocationHandler(latitude, longitude, name);
            },
            fail: () => {
              // 拒绝授权，引导用户手动开启
              wx.showModal({
                title: '需要位置权限',
                content: '请前往设置开启位置权限，以便使用导航功能',
                confirmText: '去设置',
                cancelText: '取消',
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    wx.openSetting();
                  }
                }
              });
            }
          });
        } else {
          // 已授权，直接打开导航
          this._openLocationHandler(latitude, longitude, name);
        }
      },
      fail: (err) => {
        console.error('获取权限设置失败', err);
        wx.showToast({
          title: '权限检查失败',
          icon: 'none'
        });
      }
    });
  },

  // 封装导航核心逻辑，便于复用
  _openLocationHandler(latitude, longitude, name) {
    wx.openLocation({
      latitude: Number(latitude), // 确保是数字类型
      longitude: Number(longitude), // 确保是数字类型
      name: name || '未知地点',
      scale: 18,
      success: () => {
        console.log('导航打开成功');
      },
      fail: (err) => {
        console.error('导航打开失败', err);
        // 区分不同失败原因，给出精准提示
        if (err.errMsg.includes('auth deny')) {
          wx.showToast({
            title: '位置权限被拒绝',
            icon: 'none'
          });
        } else if (err.errMsg.includes('invalid latitude')) {
          wx.showToast({
            title: '位置坐标无效',
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: '导航功能暂不可用',
            icon: 'none'
          });
        }
      }
    });
  },

  // 收藏（优化：增加存储失败处理）
  toggleCollect() {
    let list = wx.getStorageSync('collectedList') || [];
    const item = this.data.item;

    if (this.data.isCollected) {
      list = list.filter(i => i.name !== item.name);
      wx.showToast({ title: '取消收藏', icon: 'success' });
    } else {
      list.push(item);
      wx.showToast({ title: '收藏成功', icon: 'success' });
    }

    // 增加存储失败的异常处理
    try {
      wx.setStorageSync('collectedList', list);
      this.setData({ isCollected: !this.data.isCollected });
    } catch (e) {
      console.error('收藏存储失败', e);
      wx.showToast({
        title: '收藏操作失败',
        icon: 'none'
      });
    }
  }
});