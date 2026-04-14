// pages/shuhua/shuhua.js
 Page({
  data: {
    categoryList: [
      {
        id: 1,
        name: '书法',
        desc: '篆隶楷行草，临帖创作',
        img: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8eea8030d597d75ca17091f7ace26f5d.jpg?sign=b12162b9e3deb072134516573f116905&t=1776175850',
        bgColor: '#2d3748'
      },
      {
        id: 2,
        name: '国画',
        desc: '山水花鸟人物，名家名作',
        img: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg?sign=e74ddbadb70750b501ac085fe694804b&t=1776176161',
        bgColor: '#8B4513'
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