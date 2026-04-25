Page({
  data: {
    activeCategory: 'all'
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '传统美术' });
  },

  // 子分类标签点击处理
  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    const categoryName = e.currentTarget.dataset.name;
    
    // 更新选中状态
    this.setData({
      activeCategory: category
    });
    
    // 如果不是"全部"，则跳转到对应分类页面
    if (category !== 'all') {
      wx.navigateTo({
        url: `/traditional/traditional/pages/fine-art/category-list/category-list?category=${category}&name=${encodeURIComponent(categoryName)}`,
        fail: (err) => {
          console.error('跳转失败:', err);
          wx.showToast({ title: '页面加载失败', icon: 'error' });
        }
      });
    }
  },

  // 导航到品类列表页
  navigateToCategory(e) {
    const category = e.currentTarget.dataset.category;
    // 使用data属性获取分类名称，更可靠
    const categoryName = e.currentTarget.dataset.name || e.currentTarget.dataset.category;

    wx.navigateTo({
      url: `/traditional/traditional/pages/fine-art/category-list/category-list?category=${category}&name=${encodeURIComponent(categoryName)}`
    });
  },

  // 导航到详情页
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/traditional/traditional/pages/fine-art/detail/detail?id=${id}`
    });
  },

  // 导航到匠人故事
  navigateToCraftsmanStories() {
    wx.navigateTo({
      url: `/traditional/traditional/pages/fine-art/craftsman/craftsman`
    });
  }
});