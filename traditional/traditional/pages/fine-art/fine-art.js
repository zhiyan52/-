Page({
  data: {
    activeCategory: 'all'
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '传统美术' });
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory: category
    });
    // 这里可以添加根据分类筛选内容的逻辑
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