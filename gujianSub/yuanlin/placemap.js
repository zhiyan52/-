Page({
  data: {
    centerLat: 34.2891, // 以大明宫为中心
    centerLng: 108.9562,
    markers: [
      {
        id: 1,
        latitude: 39.9928,
        longitude: 116.2752,
        name: "颐和园",
        iconPath: "/images/marker.png"
      },
      {
        id: 2,
        latitude: 31.3176,
        longitude: 120.6336,
        name: "拙政园",
        iconPath: "/images/marker.png"
      },
      {
        id: 3,
        latitude: 31.3190,
        longitude: 120.6469,
        name: "留园",
        iconPath: "/images/marker.png"
      },
      {
        id: 4,
        latitude: 40.9722,
        longitude: 117.9400,
        name: "承德避暑山庄",
        iconPath: "/images/marker.png"
      },
      {
        id: 5,
        latitude: 31.3090,
        longitude: 120.6297,
        name: "沧浪亭",
        iconPath: "/images/marker.png"
      },
      {
        id: 6,
        latitude: 31.3215,
        longitude: 120.6450,
        name: "狮子林",
        iconPath: "/images/marker.png"
      },
      {
        id: 7,
        latitude: 31.3185,
        longitude: 120.6395,
        name: "环秀山庄",
        iconPath: "/images/marker.png"
      },
      {
        id: 8,
        latitude: 31.5865,
        longitude: 120.2997,
        name: "寄畅园",
        iconPath: "/images/marker.png"
      },
      {
        id: 9,
        latitude: 32.3932,
        longitude: 119.4210,
        name: "个园",
        iconPath: "/images/marker.png"
      },
      {
        id: 10,
        latitude: 31.2272,
        longitude: 121.4808,
        name: "豫园",
        iconPath: "/images/marker.png"
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
    const gardenList = [
      { name: "颐和园", latitude: 39.9928, longitude: 116.2752 },
      { name: "拙政园", latitude: 31.3176, longitude: 120.6336 },
      { name: "留园", latitude: 31.3190, longitude: 120.6469 },
      { name: "承德避暑山庄", latitude: 40.9722, longitude: 117.9400 },
      { name: "沧浪亭", latitude: 31.3090, longitude: 120.6297 },
      { name: "狮子林", latitude: 31.3215, longitude: 120.6450 },
      { name: "环秀山庄", latitude: 31.3185, longitude: 120.6395 },
      { name: "寄畅园", latitude: 31.5865, longitude: 120.2997 },
      { name: "个园", latitude: 32.3932, longitude: 119.4210 },
      { name: "豫园", latitude: 31.2272, longitude: 121.4808 }
    ];
    const item = palaceList[markerId - 1];
    wx.navigateTo({
      url: `/gujianSub/yuanlin/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  }
});