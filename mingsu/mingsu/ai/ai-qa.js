Page({
  data: {
    messages: [],
    inputValue: '',
    faqList: [
      {
        question: '什么是中国春节？',
        answer: '春节是中国最重要的传统节日，象征着团圆与新生，已有4000多年历史。'
      },
      {
        question: '中秋节有哪些习俗？',
        answer: '中秋节的主要习俗有赏月、吃月饼、赏桂花、饮桂花酒等。'
      },
      {
        question: '重阳节有哪些习俗？',
        answer: '重阳节的主要习俗有登高望远、赏菊、插茱萸、饮菊花酒、吃重阳糕，寓意健康长寿。'
      },
      {
        question: '舞龙舞狮的起源是什么？',
        answer: '舞龙舞狮是中国传统表演艺术，起源于汉代，象征喜庆和吉祥。'
      }
    ]
  },

  onLoad: function (options) {
    // 页面加载时添加欢迎消息
    this.addWelcomeMessage();
  },

  // 添加欢迎消息
  addWelcomeMessage: function () {
    const welcomeMessage = {
      type: 'system',
      content: '您好！我是民俗文化智能助手，有任何关于民俗文化的问题都可以问我哦~'
    };

    this.setData({
      messages: [welcomeMessage]
    });
  },

  // 输入框变化
  onInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  // 发送消息
  sendMessage: function () {
    const inputValue = this.data.inputValue.trim();

    if (!inputValue) {
      wx.showToast({
        title: '请输入问题',
        icon: 'none'
      });
      return;
    }

    // 添加用户消息
    const userMessage = {
      type: 'user',
      content: inputValue
    };

    const messages = [...this.data.messages, userMessage];

    this.setData({
      messages: messages,
      inputValue: ''
    });

    // 显示加载动画
    wx.showLoading({
      title: '思考中...',
      mask: true
    });

    // 模拟AI回复
    setTimeout(() => {
      // 添加AI回复
      const aiMessage = {
        type: 'ai',
        content: '这是一个很好的问题！关于' + inputValue + '，这是一个非常有趣的民俗文化话题。由于这是演示版本，我无法提供详细的真实AI回答。在实际使用中，您将获得专业、详细的民俗文化知识解答。'
      };

      const updatedMessages = [...messages, aiMessage];
      this.setData({
        messages: updatedMessages
      });

      wx.hideLoading();
    }, 1500);
  },

  // 选择常见问题
  selectQuestion: function (e) {
    const faq = e.currentTarget.dataset.faq;

    // 添加用户问题
    const userMessage = {
      type: 'user',
      content: faq.question
    };

    const messages = [...this.data.messages, userMessage];

    this.setData({
      messages: messages
    });

    // 显示加载动画
    wx.showLoading({
      title: '思考中...',
      mask: true
    });

    // 添加AI回复
    setTimeout(() => {
      const aiMessage = {
        type: 'ai',
        content: faq.answer
      };

      const updatedMessages = [...messages, aiMessage];
      this.setData({
        messages: updatedMessages
      });

      wx.hideLoading();
    }, 800);
  }
});
