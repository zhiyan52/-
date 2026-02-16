 // pages/map/map.js
Page({
  data: {
    userLocation: null, // 用户定位
    nearbySites: [] // 附近古建
  },

  onLoad() {
    // 1. 获取用户定位（需用户授权）
    wx.getLocation({
      type: "gcj02", // 微信地图坐标系
      success: (res) => {
        this.setData({
          userLocation: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        });
        // 2. 从数据库加载附近古建（距离<5km）
        this.loadNearbySites(res.latitude, res.longitude);
      },
      fail: () => wx.showToast({ title: "请开启定位权限", icon: "none" })
    });
  },

  // 加载附近古建（云函数实现距离计算）
  loadNearbySites(lat, lng) {
    wx.cloud.callFunction({
      name: "getNearbySites",
      data: { lat, lng, distance: 5000 }, // 5km范围内
      success: (res) => {
        this.setData({ nearbySites: res.result.data });
      }
    });
  }
})