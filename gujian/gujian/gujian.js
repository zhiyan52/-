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

  // 保留返回按钮功能（如需禁用可注释）
  goBack() {
    wx.navigateBack();
  },

  // 分类点击：仅提示，无跳转（保持原有逻辑）
  onCategoryTap(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const categoryItem = this.data.categoryList.find(item => item.id === id);
    if (categoryItem) {
      wx.showToast({
        title: `查看${categoryItem.name}分类`,
        icon: 'none'
      });
    }
  },

  // AR扫描：仅提示，无实际功能（保持原有逻辑）
  onARScan() {
    wx.showToast({
      title: 'AR扫描功能暂未开放',
      icon: 'none'
    });
  },

  // 古建小测：新增跳转至问答页面的逻辑
  onTest() {
    // 跳转到古建小测（quiz）页面（需确保路径与你的实际分包路径一致）
    wx.navigateTo({
      url: '/youxi/index/index', // 核心：问答页面的分包路径
      success: () => {
        // 跳转成功提示（可选）
        wx.showToast({
          title: '进入古建小测',
          icon: 'success',
          duration: 1000
        });
      },
      fail: (err) => {
        // 跳转失败容错
        wx.showToast({
          title: '小测页面暂未开放',
          icon: 'error'
        });
        console.error('古建小测页面跳转失败：', err);
      }
    });
  },

  // 打卡地图：仅提示，无实际功能（保持原有逻辑）
  onMap() {
    wx.showToast({
      title: '打卡地图功能暂未开放',
      icon: 'none'
    });
  }
});