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
        url: targetUrl,
        fail: (err) => {
          wx.showToast({
            title: '分类页面跳转失败',
            icon: 'error'
          });
          console.error('分类跳转失败：', err);
        }
      });
    } else {
      wx.showToast({
        title: '暂无该分类',
        icon: 'error'
      });
    }
  },

  // AR扫描跳转功能
  onARScan() {
    wx.showToast({
      title: '进入AR扫描',
      icon: 'none',
      duration: 800
    });
    // 延迟跳转避免提示框冲突
    setTimeout(() => {
      wx.navigateTo({
        // 请替换为你 AR 扫描页面的实际路径
        // 👉 如果在分包 gujianSub 下：/gujianSub/ar-scan/ar-scan
        // 👉 如果在主包 pages 下：/pages/ar-scan/ar-scan
        url: '/gujianSub/ar-scan/ar-scan', 
        success: () => console.log('AR扫描页面跳转成功'),
        fail: (err) => {
          wx.showToast({
            title: 'AR扫描页面未找到',
            icon: 'error'
          });
          console.error('AR扫描跳转失败：', err);
        }
      });
    }, 800);
  },

  // 趣味问答跳转功能
  onTest() {
    wx.showToast({
      title: '进入趣味问答',
      icon: 'none',
      duration: 800
    });
    setTimeout(() => {
      wx.navigateTo({
        // 请替换为你 趣味问答(wenda1) 页面的实际路径
        // 👉 如果在分包 gujianSub 下：/gujianSub/wenda1/wenda1
        // 👉 如果在主包 pages 下：/pages/wenda1/wenda1
        url: '/gujianSub/wenda1/wenda1', 
        success: () => console.log('趣味问答页面跳转成功'),
        fail: (err) => {
          wx.showToast({
            title: '问答页面未找到',
            icon: 'error'
          });
          console.error('趣味问答跳转失败：', err);
        }
      });
    }, 800);
  },

  // 打卡地图跳转功能
  onMap() {
    wx.showToast({
      title: '进入打卡地图',
      icon: 'none',
      duration: 800
    });
    setTimeout(() => {
      wx.navigateTo({
        // 请替换为你 打卡地图 页面的实际路径
        // 👉 如果在分包 gujianSub 下：/gujianSub/map/map
        // 👉 如果在主包 pages 下：/pages/map/map
        url: '/gujianSub/map/map', 
        success: () => console.log('打卡地图页面跳转成功'),
        fail: (err) => {
          wx.showToast({
            title: '地图页面未找到',
            icon: 'error'
          });
          console.error('打卡地图跳转失败：', err);
        }
      });
    }, 800);
  }
});