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
    historyQuotes: [],
    cardBgImage: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/zhinengdaolan/925bee7e5917c2715d9c7c933757ac75.jpg'
  },

  onLoad: function (options) {
    this.initCloud();
    this.generateCard();
    this.loadHistory();
  },

  initCloud: function() {
    if (!wx.cloud) {
      console.error('云开发未初始化');
      return;
    }
    
    wx.cloud.init({
      env: 'cloud1-8glc9jqob91870fc',
      traceUser: true
    });
    
    // 获取背景图临时URL
    this.loadCardBgImage();
  },

  loadCardBgImage: function() {
    const cloudPath = 'diancang/card-bg.jpg';
    
    wx.cloud.getTempFileURL({
      fileList: [cloudPath],
      success: (res) => {
        if (res.fileList.length > 0 && res.fileList[0].tempFileURL) {
          this.setData({
            cardBgImage: res.fileList[0].tempFileURL
          });
        }
      },
      fail: (err) => {
        console.error('获取临时URL失败:', err);
        // 如果获取失败，使用默认背景色
      }
    });
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