// diancang/diancang/ai/ai-recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interestTags: ['诗词', '历史', '书画', '戏曲', '民俗', '哲学', '科技', '医学'],
    selectedInterests: [],
    recommendedBooks: [],
    visualReferences: [],
    learningProgress: {
      booksRead: 3,
      totalBooks: 10,
      exercisesCompleted: 5,
      totalExercises: 20,
      learningTime: 120
    },
    browsingHistory: [
      {
        id: 1,
        title: '诗经选注',
        cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shijing.png',
        viewTime: '2026-04-21 15:30'
      },
      {
        id: 2,
        title: '史记',
        cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shiji.png',
        viewTime: '2026-04-20 10:15'
      }
    ],
    loading: false,
    showRecommendations: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化页面
    this.loadLearningProgress();
    this.loadBrowsingHistory();
  },

  // 加载学习进度
  loadLearningProgress() {
    // 这里可以从本地存储或云数据库加载学习进度
    // 目前使用模拟数据
  },

  // 加载浏览历史
  loadBrowsingHistory() {
    // 这里可以从本地存储或云数据库加载浏览历史
    // 目前使用模拟数据
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

  // 获取AI推荐
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

    // 调用DeepSeek API获取个性化推荐
    this.callDeepSeekAPI().then(recommendations => {
      // 生成视觉参考图
      return this.generateVisualReferences(recommendations);
    }).then(visualReferences => {
      this.setData({
        recommendedBooks: recommendations,
        visualReferences: visualReferences,
        loading: false,
        showRecommendations: true
      });
    }).catch(err => {
      console.error('获取推荐失败:', err);
      wx.showToast({
        title: '获取推荐失败，请重试',
        icon: 'none'
      });
      this.setData({
        loading: false
      });
      // 使用本地推荐作为后备
      this.useLocalRecommendations();
    });
  },

  // 调用DeepSeek API
  callDeepSeekAPI() {
    return new Promise((resolve, reject) => {
      // 模拟API调用，实际项目中应该使用真实的DeepSeek API
      const apiKey = 'sk-db4358439d684158895f40d0a4612c4a';
      const interests = this.data.selectedInterests;
      const learningProgress = this.data.learningProgress;

      // 构建请求参数
      const requestData = {
        interests: interests,
        learningProgress: learningProgress,
        browsingHistory: this.data.browsingHistory
      };

      // 模拟API响应
      setTimeout(() => {
        const recommendedBooks = this.generateRecommendations();
        resolve(recommendedBooks);
      }, 1500);
    });
  },

  // 生成视觉参考图
  generateVisualReferences(recommendations) {
    return new Promise((resolve, reject) => {
      // 模拟混元图像生成API调用
      const visualReferences = recommendations.map(book => {
        return {
          image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(book.title + ' ' + book.description + ' 中国古风插画')}&image_size=landscape_4_3`,
          description: book.title + ' 意境图'
        };
      });

      // 模拟API响应
      setTimeout(() => {
        resolve(visualReferences);
      }, 1000);
    });
  },

  // 生成推荐数据
  generateRecommendations() {
    const interests = this.data.selectedInterests;
    const allBooks = [
      { id: 1, title: '诗经选注', author: '孔子', category: '诗词', description: '中国第一部诗歌总集，收录西周至春秋时期的诗歌305篇。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shijing.png', recommendScore: '95%' },
      { id: 2, title: '史记', author: '司马迁', category: '历史', description: '中国第一部纪传体通史，记载了从黄帝到汉武帝时期的历史。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shiji.png', recommendScore: '92%' },
      { id: 3, title: '兰亭集序', author: '王羲之', category: '书画', description: '被誉为"天下第一行书"，是王羲之的代表作。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/lanting.png', recommendScore: '90%' },
      { id: 4, title: '牡丹亭', author: '汤显祖', category: '戏曲', description: '明代传奇剧本，讲述杜丽娘与柳梦梅的爱情故事。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/mudan.png', recommendScore: '88%' },
      { id: 5, title: '东京梦华录', author: '孟元老', category: '民俗', description: '记载北宋都城东京（今开封）的城市风貌和民俗风情。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/dongjing.png', recommendScore: '85%' },
      { id: 6, title: '论语', author: '孔子及其弟子', category: '哲学', description: '记录孔子及其弟子言行的语录体著作，是儒家经典之一。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/lunyu.png', recommendScore: '93%' },
      { id: 7, title: '天工开物', author: '宋应星', category: '科技', description: '明代科技著作，记载了中国古代的农业和手工业技术。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/tiangong.png', recommendScore: '87%' },
      { id: 8, title: '伤寒杂病论', author: '张仲景', category: '医学', description: '东汉医学著作，是中医临床的经典之作。', cover: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/books/shanghan.png', recommendScore: '86%' }
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

  // 使用本地推荐作为后备
  useLocalRecommendations() {
    const recommendations = this.generateRecommendations();
    const visualReferences = recommendations.map(book => {
      return {
        image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(book.title + ' ' + book.description + ' 中国古风插画')}&image_size=landscape_4_3`,
        description: book.title + ' 意境图'
      };
    });

    this.setData({
      recommendedBooks: recommendations,
      visualReferences: visualReferences,
      loading: false,
      showRecommendations: true
    });
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
      visualReferences: [],
      showRecommendations: false
    });
  },

  // 返回
  goBack() {
    wx.navigateBack();
  }
})