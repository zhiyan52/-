Page({
  data: {
    centerLat: 34.2891, // 以大明宫为中心
    centerLng: 108.9562,
    markers: [
      {
        id: 1,
        latitude: 39.9163,
        longitude: 116.3972,
        name: "故宫（紫禁城）",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 2,
        latitude: 29.6572,
        longitude: 91.1722,
        name: "布达拉宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 3,
        latitude: 34.2891,
        longitude: 108.9562,
        name: "大明宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 4,
        latitude: 34.2681,
        longitude: 108.9432,
        name: "未央宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 5,
        latitude: 34.3931,
        longitude: 108.8432,
        name: "咸阳宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 6,
        latitude: 34.2711,
        longitude: 108.9462,
        name: "太极宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 7,
        latitude: 34.2591,
        longitude: 108.9632,
        name: "兴庆宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 8,
        latitude: 39.9472,
        longitude: 116.4232,
        name: "雍和宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 9,
        latitude: 41.7962,
        longitude: 123.4562,
        name: "沈阳故宫",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 10,
        latitude: 32.0412,
        longitude: 118.8032,
        name: "南京故宫",
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

  // 点击地图标记，跳转到对应宫殿详情页
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    const palaceList = [
      { name: "故宫（紫禁城）", latitude: 39.9163, longitude: 116.3972 },
      { name: "布达拉宫", latitude: 29.6572, longitude: 91.1722 },
      { name: "大明宫", latitude: 34.2891, longitude: 108.9562 },
      { name: "未央宫", latitude: 34.2681, longitude: 108.9432 },
      { name: "咸阳宫", latitude: 34.3931, longitude: 108.8432 },
      { name: "太极宫", latitude: 34.2711, longitude: 108.9462 },
      { name: "兴庆宫", latitude: 34.2591, longitude: 108.9632 },
      { name: "雍和宫", latitude: 39.9472, longitude: 116.4232 },
      { name: "沈阳故宫", latitude: 41.7962, longitude: 123.4562 },
      { name: "南京故宫", latitude: 32.0412, longitude: 118.8032 }
    ];
    const item = palaceList[markerId - 1];
    wx.navigateTo({
      url: `/gujianSub/gongdian/palacemap?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  }
});