Page({
  data: {
    centerLat: 34.2185, // 以大雁塔为中心（塔阁主题核心）
    centerLng: 108.9631,
    markers: [
      {
        id: 1,
        latitude: 34.2185,
        longitude: 108.9631,
        name: "大雁塔",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 2,
        latitude: 39.4352,
        longitude: 113.1769,
        name: "应县木塔",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 3,
        latitude: 30.5491,
        longitude: 114.3603,
        name: "黄鹤楼",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 4,
        latitude: 29.3857,
        longitude: 113.1328,
        name: "岳阳楼",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 5,
        latitude: 28.6899,
        longitude: 115.8857,
        name: "滕王阁",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 6,
        latitude: 30.2299,
        longitude: 120.1483,
        name: "雷峰塔",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 7,
        latitude: 34.8161,
        longitude: 114.3611,
        name: "开封铁塔",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 8,
        latitude: 30.2101,
        longitude: 120.1253,
        name: "六和塔",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 9,
        latitude: 34.2511,
        longitude: 108.9515,
        name: "小雁塔",
        iconPath: "https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/images/marker.png"
      },
      {
        id: 10,
        latitude: 31.3267,
        longitude: 120.6283,
        name: "报恩寺塔",
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

  // 点击地图标记，跳转到对应塔阁详情页
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    const towerList = [
      { name: "大雁塔", latitude: 34.2185, longitude: 108.9631 },
      { name: "应县木塔", latitude: 39.4352, longitude: 113.1769 },
      { name: "黄鹤楼", latitude: 30.5491, longitude: 114.3603 },
      { name: "岳阳楼", latitude: 29.3857, longitude: 113.1328 },
      { name: "滕王阁", latitude: 28.6899, longitude: 115.8857 },
      { name: "雷峰塔", latitude: 30.2299, longitude: 120.1483 },
      { name: "开封铁塔", latitude: 34.8161, longitude: 114.3611 },
      { name: "六和塔", latitude: 30.2101, longitude: 120.1253 },
      { name: "小雁塔", latitude: 34.2511, longitude: 108.9515 },
      { name: "报恩寺塔", latitude: 31.3267, longitude: 120.6283 }
    ];
    const item = towerList[markerId - 1];
    wx.navigateTo({
      url: `/gujianSub/tage/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  }
});