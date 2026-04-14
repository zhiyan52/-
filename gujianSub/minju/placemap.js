Page({
  data: {
    centerLat: 39.9289, // 默认以北京四合院为中心
    centerLng: 116.3883,
    markers: [
      {
        id: 1,
        latitude: 39.9289,
        longitude: 116.3883,
        name: "北京四合院",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 2,
        latitude: 24.7569,
        longitude: 117.0169,
        name: "福建土楼",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 3,
        latitude: 37.2075,
        longitude: 112.1818,
        name: "山西平遥古城民居",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 4,
        latitude: 26.8679,
        longitude: 100.2373,
        name: "云南丽江古城民居",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 5,
        latitude: 30.1089,
        longitude: 117.9278,
        name: "安徽宏村民居",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 6,
        latitude: 22.3569,
        longitude: 112.6389,
        name: "广东开平碉楼",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 7,
        latitude: 36.6069,
        longitude: 109.4722,
        name: "陕西窑洞",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 8,
        latitude: 31.0822,
        longitude: 120.8967,
        name: "江南水乡民居",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 9,
        latitude: 29.5658,
        longitude: 106.5872,
        name: "四川吊脚楼",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 10,
        latitude: 43.9389,
        longitude: 116.0478,
        name: "蒙古包",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      }
    ]
  },

  onLoad() {
    // 获取用户当前位置，兼容授权失败的情况
    wx.getLocation({
      type: 'gcj02', // 微信小程序默认的火星坐标系
      success: (res) => {
        this.setData({
          centerLat: res.latitude,
          centerLng: res.longitude
        });
      },
      fail: (err) => {
        console.log('获取位置失败，使用默认位置', err);
        // 授权失败时仍使用默认位置，不影响功能
      }
    });
  },

  // 点击标记跳转到民居详情
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    // 优化：直接从markers数组获取数据，避免重复定义
    const item = this.data.markers.find(marker => marker.id === markerId);
    
    if (item) {
      wx.navigateTo({
        url: `/gujianSub/minju/detail?item=${encodeURIComponent(JSON.stringify(item))}`
      });
    }
  }
});