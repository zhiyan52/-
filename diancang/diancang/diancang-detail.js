// diancang/diancang/diancang-detail.js
Page({
  data: {
    bookId: '',
    bookInfo: {},
    sentenceList: [],
    quiz: {},
    selectedOption: -1,
    showResult: false,
    isCorrect: false
  },

  onLoad(options) {
    const bookId = options.id;
    this.setData({ bookId });
    this.loadBookData(bookId);
    this.loadQuizData(bookId);
  },

  // 加载典籍数据（优先读缓存）
  loadBookData(bookId) {
    const cachedData = wx.getStorageSync(`classic_${bookId}`);
    if (cachedData) {
      this.setData({
        bookInfo: cachedData.bookInfo,
        sentenceList: cachedData.sentenceList.map(item => ({
          ...item,
          isCollected: this.isCollected(item.id)
        }))
      });
    } else {
      // 模拟从云端加载数据（实际开发中替换为接口请求）
      const mockData = this.getMockBookData(bookId);
      this.setData({
        bookInfo: mockData.bookInfo,
        sentenceList: mockData.sentenceList.map(item => ({
          ...item,
          isCollected: this.isCollected(item.id)
        }))
      });
      // 缓存到本地
      wx.setStorageSync(`classic_${bookId}`, mockData);
    }
  },

  // 检查是否已收藏
  isCollected(sentenceId) {
    const collected = wx.getStorageSync('collected_sentences') || [];
    return collected.includes(sentenceId);
  },

  // 加载趣味问答数据
  loadQuizData(bookId) {
    // 模拟问答数据
    this.setData({
      quiz: {
        question: '《论语》的核心思想是？',
        options: ['仁', '礼', '义', '智'],
        answer: '仁'
      }
    });
  },

  // 切换收藏状态
  toggleCollect(e) {
    const sentenceId = e.currentTarget.dataset.id;
    let collected = wx.getStorageSync('collected_sentences') || [];
    const index = collected.indexOf(sentenceId);
    if (index > -1) {
      collected.splice(index, 1);
    } else {
      collected.push(sentenceId);
    }
    wx.setStorageSync('collected_sentences', collected);

    // 更新页面状态
    const sentenceList = this.data.sentenceList.map(item => {
      if (item.id === sentenceId) {
        return { ...item, isCollected: !item.isCollected };
      }
      return item;
    });
    this.setData({ sentenceList });
  },

  // 跳转到摘抄页
  goToExtract(e) {
    const sentenceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/diancang/diancang/diancang-extract?id=${sentenceId}`
    });
  },

  // 选择问答选项
  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    const answer = this.data.quiz.options[index];
    this.setData({
      selectedOption: index,
      showResult: true,
      isCorrect: answer === this.data.quiz.answer
    });
  },

  // 模拟数据（实际开发中替换为接口）
  getMockBookData(bookId) {
    if (bookId === 'lunyu') {
      return {
        bookInfo: {
          name: '论语',
          desc: '儒家经典，记录孔子及其弟子言行。'
        },
        sentenceList: [
          {
            id: 'lunyu_001',
            original: '子曰：“学而时习之，不亦说乎？”',
            note: '学：学习；时习：按时温习；说（yuè）：同“悦”，愉快。',
            translation: '孔子说：“学习并且按时温习，不也是很快乐的吗？”'
          },
          {
            id: 'lunyu_002',
            original: '有朋自远方来，不亦乐乎？',
            note: '朋：志同道合的人；乐（lè）：快乐。',
            translation: '有志同道合的人从远方来，不也是很快乐吗？'
          }
        ]
      };
    }
    return {};
  }
});