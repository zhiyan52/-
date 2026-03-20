// pages/shuhua/shuhua.js
 Page({
  data: {
    categoryList: [
      {
        id: 1,
        name: '书法',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/9853c0f7ee3ccbe0a2111ce6fe973d0b.jpg'
      },
      {
        id: 2,
        name: '国画',
        img: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/68a9c2fb1ec2f3615e07a6d69dabaf4c.jpg'
      },
    ]
  },

  goBack() {
    wx.navigateBack();
  },
  onCategoryTap(e) {
    const id = parseInt(e.currentTarget.dataset.id); // 确保 id 是数字类型
  
    // 核心：分包路径映射（直接用分包根目录，不包含pages）
    const subPackagePageMap = {
      1: '/shuhuaSub/shufa/shufa',   // 分包根目录/宫殿页面路径
      2: '/shuhuaSub/guohua/guohua',     // 分包根目录/园林页面路径
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
});