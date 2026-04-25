Page({
  data: {
    messages: [],
    inputValue: '',
    loading: false
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '文化问答' });
    // 初始欢迎消息
    this.addMessage('system', '君子有酒，嘉宾式燕以敖。今日与君论何典？');
  },

  addMessage: function (type, content) {
    const newMessage = {
      type: type, // system, user, ai
      content: content,
      timestamp: new Date().getTime()
    };
    this.setData({
      messages: [...this.data.messages, newMessage]
    });
    // 滚动到底部
    setTimeout(() => {
      const query = wx.createSelectorQuery();
      query.select('.chat-container').boundingClientRect();
      query.select('#message-list').boundingClientRect();
      query.exec((res) => {
        if (res[0] && res[1]) {
          const scrollHeight = res[1].height;
          const containerHeight = res[0].height;
          if (scrollHeight > containerHeight) {
            wx.pageScrollTo({
              scrollTop: scrollHeight - containerHeight,
              duration: 300
            });
          }
        }
      });
    }, 100);
  },

  handleInput: function (e) {
    this.setData({ inputValue: e.detail.value });
  },

  sendMessage: function () {
    const inputValue = this.data.inputValue.trim();
    if (!inputValue) return;

    // 添加用户消息
    this.addMessage('user', inputValue);
    this.setData({ inputValue: '', loading: true });

    // 模拟AI回复
    setTimeout(() => {
      let reply = '';
      const lowerInput = inputValue.toLowerCase();

      if (lowerInput.includes('书法') || lowerInput.includes('字体')) {
        reply = '书法乃中华文化之瑰宝，其发展经历篆书、隶书、楷书、行书、草书五大阶段。王羲之《兰亭集序》被誉为天下第一行书，颜真卿《祭侄文稿》则以情胜。习书者当以中锋行笔，注重笔画之力度与韵律。';
      } else if (lowerInput.includes('国画') || lowerInput.includes('绘画')) {
        reply = '国画重意境，讲究笔墨情趣。山水画为其大宗，花鸟画、人物画亦各有千秋。王希孟《千里江山图》青绿设色，气势磅礴；八大山人笔下鱼鸟，简约而意韵深远。国画之美，在乎留白与气韵。';
      } else if (lowerInput.includes('画家') || lowerInput.includes('书法家')) {
        reply = '古往今来，书画大家辈出。书法有王羲之、颜真卿、柳公权、欧阳询、赵孟頫等；国画有顾恺之、吴道子、王维、徐渭、八大山人等。彼辈以笔墨传情，为后世留下无数艺术珍品。';
      } else if (lowerInput.includes('作品') || lowerInput.includes('名画')) {
        reply = '传世名作众多，如王羲之《兰亭集序》、颜真卿《祭侄文稿》、顾恺之《洛神赋图》、王希孟《千里江山图》、张择端《清明上河图》等。这些作品不仅是艺术瑰宝，更是历史文化的重要载体。';
      } else {
        reply = '书画艺术博大精深，君所问之事，容某细思。若有具体问题，不妨明言，某当竭诚为君解答。';
      }

      this.addMessage('ai', reply);
      this.setData({ loading: false });
    }, 1500);
  }
});