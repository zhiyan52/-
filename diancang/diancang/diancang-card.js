Page({
  data: {
    quotes: [
      {
        quote: '学而时习之，不亦说乎？',
        source: '《论语》'
      },
      {
        quote: '道可道，非常道；名可名，非常名。',
        source: '《道德经》'
      },
      {
        quote: '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
        source: '《诗经》'
      },
      {
        quote: '大学之道，在明明德，在亲民，在止于至善。',
        source: '《大学》'
      },
      {
        quote: '天命之谓性，率性之谓道，修道之谓教。',
        source: '《中庸》'
      },
      {
        quote: '己所不欲，勿施于人。',
        source: '《论语》'
      },
      {
        quote: '知者不言，言者不知。',
        source: '《道德经》'
      },
      {
        quote: '天行健，君子以自强不息。',
        source: '《周易》'
      },
      {
        quote: '地势坤，君子以厚德载物。',
        source: '《周易》'
      },
      {
        quote: '富贵不能淫，贫贱不能移，威武不能屈。',
        source: '《孟子》'
      }
    ],
    currentQuote: {},
    historyQuotes: []
  },

  onLoad: function (options) {
    this.generateCard();
    this.loadHistory();
  },

  generateCard: function () {
    const randomIndex = Math.floor(Math.random() * this.data.quotes.length);
    const randomQuote = this.data.quotes[randomIndex];
    this.setData({ currentQuote: randomQuote });

    // 保存到历史记录
    const historyQuotes = [randomQuote, ...this.data.historyQuotes].slice(0, 5);
    this.setData({ historyQuotes: historyQuotes });
    wx.setStorageSync('diancang_card_history', historyQuotes);
  },

  saveCard: function () {
    wx.showLoading({ title: '保存中...' });

    // 模拟保存功能
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '卡片已保存到相册',
        icon: 'success'
      });
    }, 1000);
  },

  reuseCard: function (e) {
    const index = e.currentTarget.dataset.index;
    const quote = this.data.historyQuotes[index];
    this.setData({ currentQuote: quote });
  },

  loadHistory: function () {
    const historyQuotes = wx.getStorageSync('diancang_card_history') || [];
    this.setData({ historyQuotes: historyQuotes });
  },

  goBack: function () {
    wx.navigateBack();
  }
});