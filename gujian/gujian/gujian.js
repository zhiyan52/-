 // pages/gujian/gujian.js
Page({
  data: {
    categoryList: [
      {
        id: 1,
        name: '宫殿',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/GONG.png'
      },
      {
        id: 2,
        name: '园林',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/yuanl.png'
      },
      {
        id: 3,
        name: '居居',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/MING.png'
      },
      {
        id: 4,
        name: '塔阁',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/TA.png'
      },
      {
        id: 5,
        name: '桥梁',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/qiao.png'
      }
    ]
  },

  goBack() {
    wx.navigateBack();
  },

  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: `点击了分类 ${id}`,
      icon: 'none'
    });
    // 这里可以添加页面跳转逻辑，例如：
    // wx.navigateTo({
    //   url: `/pages/detail/detail?id=${id}`
    // });
    wx.navigateTo({
       url: `/`
     });
  },

  onARScan() {
    wx.showToast({
      title: 'AR扫描功能',
      icon: 'none'
    });
  },

  onTest() {
    wx.showToast({
      title: '古建小测功能',
      icon: 'none'
    });
  },

  onMap() {
    wx.showToast({
      title: '打卡地图功能',
      icon: 'none'
    });
  }
});