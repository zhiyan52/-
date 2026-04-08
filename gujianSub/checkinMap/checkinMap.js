// gujianSub/checkinMap/checkinMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [
      {
        id: 1,
        latitude: 39.9042,
        longitude: 116.4074,
        name: '故宫',
        address: '北京市东城区景山前街4号',
        type: 'palace',
        status: 'checked', // checked, unchecked, recommended
        distance: '2.5km'
      },
      {
        id: 2,
        latitude: 39.9289,
        longitude: 116.3883,
        name: '颐和园',
        address: '北京市海淀区新建宫门路19号',
        type: 'garden',
        status: 'unchecked',
        distance: '10.2km'
      },
      {
        id: 3,
        latitude: 39.9139,
        longitude: 116.3917,
        name: '天坛',
        address: '北京市东城区天坛内东里7号',
        type: 'temple',
        status: 'recommended',
        distance: '5.1km'
      },
      {
        id: 4,
        latitude: 39.9219,
        longitude: 116.4053,
        name: '北海公园',
        address: '北京市西城区文津街1号',
        type: 'garden',
        status: 'unchecked',
        distance: '3.8km'
      },
      {
        id: 5,
        latitude: 39.9588,
        longitude: 116.4069,
        name: '雍和宫',
        address: '北京市东城区雍和宫大街12号',
        type: 'temple',
        status: 'checked',
        distance: '4.2km'
      }
    ],
    userLocation: {
      latitude: 39.9042,
      longitude: 116.4074
    },
    showList: false,
    selectedMarker: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadMap();
  },

  /**
   * 加载地图
   */
  loadMap() {
    // 这里可以添加地图初始化逻辑
    console.log('加载地图');
  },

  /**
   * 切换列表视图
   */
  toggleList() {
    this.setData({ showList: !this.data.showList });
  },

  /**
   * 打开筛选
   */
  openFilter() {
    wx.showToast({ title: '筛选功能开发中', icon: 'none' });
  },

  /**
   * 点击标记点
   */
  markerTap(e) {
    const markerId = e.markerId;
    const marker = this.data.markers.find(m => m.id === markerId);
    this.setData({ selectedMarker: marker });
  },

  /**
   * 打卡
   */
  checkin() {
    if (this.data.selectedMarker) {
      wx.showToast({ title: `打卡成功：${this.data.selectedMarker.name}`, icon: 'success' });
      // 更新标记点状态
      const markers = this.data.markers.map(marker => {
        if (marker.id === this.data.selectedMarker.id) {
          return { ...marker, status: 'checked' };
        }
        return marker;
      });
      this.setData({ markers });
    }
  },

  /**
   * 导航
   */
  navigate() {
    if (this.data.selectedMarker) {
      wx.openLocation({
        latitude: this.data.selectedMarker.latitude,
        longitude: this.data.selectedMarker.longitude,
        name: this.data.selectedMarker.name,
        address: this.data.selectedMarker.address
      });
    }
  },

  /**
   * 返回
   */
  goBack() {
    wx.navigateBack();
  }
})
