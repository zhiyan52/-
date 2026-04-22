// diancang/diancang/ai/ai-recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interestTags: ['诗词', '历史', '书画', '戏曲', '民俗', '哲学', '科技', '医学'],
    selectedInterests: [],
    recommendedBooks: [],
    loading: false,
    showRecommendations: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 切换兴趣标签
  toggleInterest(e) {
    const tag = e.currentTarget.dataset.tag;
    const selectedInterests = this.data.selectedInterests;
    
    if (selectedInterests.includes(tag)) {
      // 移除标签
      const index = selectedInterests.indexOf(tag);
      selectedInterests.splice(index, 1);
    } else {
      // 添加标签
      selectedInterests.push(tag);
    }
    
    this.setData({
      selectedInterests: selectedInterests
    });
  },

  // 获取推荐
  getRecommendations() {
    if (this.data.selectedInterests.length === 0) {
      wx.showToast({
        title: '请至少选择一个兴趣标签',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      loading: true
    });
    
    // 模拟推荐数据
    setTimeout(() => {
      const recommendations = this.generateRecommendations();
      this.setData({
        recommendedBooks: recommendations,
        loading: false,
        showRecommendations: true
      });
    }, 1000);
  },

  // 生成推荐数据
  generateRecommendations() {
    const interests = this.data.selectedInterests;
    const allBooks = [
      { id: 1, title: '诗经选注', author: '孔子', category: '诗词', description: '中国第一部诗歌总集，收录西周至春秋时期的诗歌305篇。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shijing.png' },
      { id: 2, title: '史记', author: '司马迁', category: '历史', description: '中国第一部纪传体通史，记载了从黄帝到汉武帝时期的历史。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shiji.png' },
      { id: 3, title: '兰亭集序', author: '王羲之', category: '书画', description: '被誉为"天下第一行书"，是王羲之的代表作。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/lanting.png' },
      { id: 4, title: '牡丹亭', author: '汤显祖', category: '戏曲', description: '明代传奇剧本，讲述杜丽娘与柳梦梅的爱情故事。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/mudan.png' },
      { id: 5, title: '东京梦华录', author: '孟元老', category: '民俗', description: '记载北宋都城东京（今开封）的城市风貌和民俗风情。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/dongjing.png' },
      { id: 6, title: '论语', author: '孔子及其弟子', category: '哲学', description: '记录孔子及其弟子言行的语录体著作，是儒家经典之一。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/lunyu.png' },
      { id: 7, title: '天工开物', author: '宋应星', category: '科技', description: '明代科技著作，记载了中国古代的农业和手工业技术。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/tiangong.png' },
      { id: 8, title: '伤寒杂病论', author: '张仲景', category: '医学', description: '东汉医学著作，是中医临床的经典之作。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shanghan.png' }
    ];
    
    // 根据兴趣标签筛选书籍
    const filteredBooks = allBooks.filter(book => interests.includes(book.category));
    
    // 如果筛选结果少于3本，补充其他相关书籍
    if (filteredBooks.length < 3) {
      const remainingBooks = allBooks.filter(book => !filteredBooks.includes(book));
      const additionalBooks = remainingBooks.slice(0, 3 - filteredBooks.length);
      return [...filteredBooks, ...additionalBooks];
    }
    
    return filteredBooks.slice(0, 5);
  },

  // 查看书籍详情
  viewBookDetail(e) {
    const bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/diancang/diancang/diancang-detail?id=${bookId}`
    });
  },

  // 重新选择兴趣
  resetSelection() {
    this.setData({
      selectedInterests: [],
      recommendedBooks: [],
      showRecommendations: false
    });
  }
})