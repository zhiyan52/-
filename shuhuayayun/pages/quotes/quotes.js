// shuhuayayun/pages/quotes/quotes.js
Page({
  data: {
    quotes: [
      "笔落惊风雨，诗成泣鬼神",
      "远看山有色，近听水无声",
      "丹青不知老将至，富贵于我如浮云",
      "胸中有丘壑，下笔如有神",
      "书画同源，心手相应",
      "外师造化，中得心源",
      "意在笔先，画尽意在",
      "书画贵有古意，若无古意，虽工无益",
      "笔意贵淡不贵艳，贵畅不贵紧",
      "书之妙道，神采为上，形质次之",
      "画者，文之极也",
      "诗中有画，画中有诗",
      "书法者，心法也",
      "画品即人品",
      "文以载道，画以传情"
    ],
    currentQuote: null,
    generating: false
  },
  
  onLoad: function() {
    console.log('书画佳句卡片生成页面加载');
    // 初始生成一句
    this.generateQuote();
  },
  
  generateQuote: function() {
    this.setData({
      generating: true
    });
    
    // 模拟生成过程
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.data.quotes.length);
      this.setData({
        currentQuote: this.data.quotes[randomIndex],
        generating: false
      });
    }, 1000);
  },
  
  saveCard: function() {
    if (!this.data.currentQuote) {
      wx.showToast({
        title: '请先生成卡片',
        icon: 'none'
      });
      return;
    }
    
    // 模拟保存功能
    wx.showToast({
      title: '卡片已保存',
      icon: 'success'
    });
  }
});