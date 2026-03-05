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
    const id = parseInt(e.currentTarget.dataset.id); // 确保 id 是数字类型
  
    // 核心：分包路径映射（直接用分包根目录，不包含pages）
    const subPackagePageMap = {
      1: '/gujianSub/gongdian/gongdian',   // 分包根目录/宫殿页面路径
      2: '/gujianSub/yuanlin/yuanlin',     // 分包根目录/园林页面路径
      3: '/gujianSub/minju/minju',         // 分包根目录/民居页面路径
      4: '/gujianSub/tage/tage',           // 分包根目录/塔阁页面路径
      5: '/gujianSub/qiaoliang/qiaoliang'  // 分包根目录/桥梁页面路径
    };
  
    // 获取目标路径并跳转
    const targetUrl = subPackagePageMap[id];
    if (targetUrl) {
      // 先显示提示
      const categoryItem = this.data.categoryList.find(item => item.id === id);
      if (categoryItem) {
        wx.showToast({
          title: `点击了${categoryItem.name}`,
          icon: 'none'
        });
      }
      // 执行跳转
      wx.navigateTo({
        url: targetUrl
      });
    } else {
      wx.showToast({
        title: '暂无该分类',
        icon: 'error'
      });
    }
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