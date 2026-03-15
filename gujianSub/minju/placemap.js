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
        iconPath: "/images/marker.png"
      },
      {
        id: 2,
        latitude: 24.7569,
        longitude: 117.0169,
        name: "福建土楼",
        iconPath: "/images/marker.png"
      },
      {
        id: 3,
        latitude: 37.2075,
        longitude: 112.1818,
        name: "山西平遥古城民居",
        iconPath: "/images/marker.png"
      },
      {
        id: 4,
        latitude: 26.8679,
        longitude: 100.2373,
        name: "云南丽江古城民居",
        iconPath: "/images/marker.png"
      },
      {
        id: 5,
        latitude: 30.1089,
        longitude: 117.9278,
        name: "安徽宏村民居",
        iconPath: "/images/marker.png"
      },
      {
        id: 6,
        latitude: 22.3569,
        longitude: 112.6389,
        name: "广东开平碉楼",
        iconPath: "/images/marker.png"
      },
      {
        id: 7,
        latitude: 36.6069,
        longitude: 109.4722,
        name: "陕西窑洞",
        iconPath: "/images/marker.png"
      },
      {
        id: 8,
        latitude: 31.0822,
        longitude: 120.8967,
        name: "江南水乡民居",
        iconPath: "/images/marker.png"
      },
      {
        id: 9,
        latitude: 29.5658,
        longitude: 106.5872,
        name: "四川吊脚楼",
        iconPath: "/images/marker.png"
      },
      {
        id: 10,
        latitude: 43.9389,
        longitude: 116.0478,
        name: "蒙古包",
        iconPath: "/images/marker.png"
      }
    ]
  },

  onLoad() {
    wx.getLocation({
      success: (res) => {
        this.setData({
          centerLat: res.latitude,
          centerLng: res.longitude
        });
      }
    });
  },

  // 点击标记跳转到民居详情
  onMarkerTap(e) {
    const markerId = e.detail.markerId;
    const minjuList = [
      {
        name: "北京四合院",
        latitude: 39.9289,
        longitude: 116.3883
      },
      {
        name: "福建土楼",
        latitude: 24.7569,
        longitude: 117.0169
      },
      {
        name: "山西平遥古城民居",
        latitude: 37.2075,
        longitude: 112.1818
      },
      {
        name: "云南丽江古城民居",
        latitude: 26.8679,
        longitude: 100.2373
      },
      {
        name: "安徽宏村民居",
        latitude: 30.1089,
        longitude: 117.9278
      },
      {
        name: "广东开平碉楼",
        latitude: 22.3569,
        longitude: 112.6389
      },
      {
        name: "陕西窑洞",
        latitude: 36.6069,
        longitude: 109.4722
      },
      {
        name: "江南水乡民居",
        latitude: 31.0822,
        longitude: 120.8967
      },
      {
        name: "四川吊脚楼",
        latitude: 29.5658,
        longitude: 106.5872
      },
      {
        name: "蒙古包",
        latitude: 43.9389,
        longitude: 116.0478
      }
    ];

    const item = minjuList[markerId - 1];
    wx.navigateTo({
      url: `/gujianSub/minju/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  }
});