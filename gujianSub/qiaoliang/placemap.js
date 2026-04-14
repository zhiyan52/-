Page({
  data: {
    centerLat: 37.7462, // 以赵州桥为中心
    centerLng: 114.7431,
    markers: [
      {
        id: 1,
        latitude: 37.7462,
        longitude: 114.7431,
        name: "赵州桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 2,
        latitude: 39.8291,
        longitude: 116.2133,
        name: "卢沟桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 3,
        latitude: 24.9111,
        longitude: 118.6064,
        name: "洛阳桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 4,
        latitude: 23.6598,
        longitude: 116.6447,
        name: "广济桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 5,
        latitude: 24.6908,
        longitude: 118.4611,
        name: "安平桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 6,
        latitude: 32.4056,
        longitude: 119.4303,
        name: "五亭桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 7,
        latitude: 25.8097,
        longitude: 109.6225,
        name: "风雨桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 8,
        latitude: 39.9931,
        longitude: 116.2694,
        name: "玉带桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 9,
        latitude: 29.9139,
        longitude: 102.2508,
        name: "泸定桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 10,
        latitude: 37.7797,
        longitude: 112.4333,
        name: "十字桥",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      }
    ]
  },

  onLoad() {
    // 可获取用户当前位置，将地图中心设为用户位置
    wx.getLocation({
      success: (res) => {
        this.setData({
          centerLat: res.latitude,
          centerLng: res.longitude
        });
      }
    });
  },

  // 点击地图标记，跳转到对应桥梁详情页
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    const bridgeList = [
      { name: "赵州桥", latitude: 37.7462, longitude: 114.7431 },
      { name: "卢沟桥", latitude: 39.8291, longitude: 116.2133 },
      { name: "洛阳桥", latitude: 24.9111, longitude: 118.6064 },
      { name: "广济桥", latitude: 23.6598, longitude: 116.6447 },
      { name: "安平桥", latitude: 24.6908, longitude: 118.4611 },
      { name: "五亭桥", latitude: 32.4056, longitude: 119.4303 },
      { name: "风雨桥", latitude: 25.8097, longitude: 109.6225 },
      { name: "玉带桥", latitude: 39.9931, longitude: 116.2694 },
      { name: "泸定桥", latitude: 29.9139, longitude: 102.2508 },
      { name: "十字桥", latitude: 37.7797, longitude: 112.4333 }
    ];
    const item = bridgeList[markerId - 1];
    wx.navigateTo({
      url: `/gujianSub/qiaoliang/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  }
});