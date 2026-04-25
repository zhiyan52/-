// mingsu/mingsu/pages/ai-learning/qna.js
Page({
  data: {
    // 热门问题
    popularQuestions: [
      {
        id: 1,
        question: '春节的起源是什么？'
      },
      {
        id: 2,
        question: '为什么中秋节要吃月饼？'
      },
      {
        id: 3,
        question: '传统婚礼有哪些仪式？'
      },
      {
        id: 4,
        question: '端午节为什么要赛龙舟？'
      }
    ],
    // 聊天消息
    chatMessages: [
      {
        id: 1,
        type: 'ai',
        content: '你好！我是民俗AI助手，有什么关于民俗文化的问题可以问我哦～',
        time: this.getFormattedTime()
      }
    ],
    // 用户输入
    userInput: '',
    // 加载状态
    loading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'AI互动问答' });
  },

  // 获取格式化时间
  getFormattedTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  },

  // 输入变化
  onInputChange(e) {
    this.setData({ userInput: e.detail.value });
  },

  // 发送问题
  async sendQuestion() {
    const question = this.data.userInput.trim();
    if (!question || this.data.loading) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      time: this.getFormattedTime()
    };

    this.setData({
      chatMessages: [...this.data.chatMessages, userMessage],
      userInput: '',
      loading: true
    });

    try {
      // 调用AI云函数
      const { result } = await wx.cloud.callFunction({
        name: 'folkAiGuide',
        data: {
          type: 'chat',
          question: question
        }
      });

      // 添加AI回复
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: result?.answer || '抱歉，我暂时无法回答这个问题，请尝试其他问题。',
        time: this.getFormattedTime()
      };

      this.setData({
        chatMessages: [...this.data.chatMessages, aiMessage],
        loading: false
      });
    } catch (error) {
      console.error('AI问答失败:', error);

      // 添加错误回复
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: '抱歉，AI服务暂时不可用，请稍后再试。',
        time: this.getFormattedTime()
      };

      this.setData({
        chatMessages: [...this.data.chatMessages, errorMessage],
        loading: false
      });
    }
  },

  // 点击热门问题
  askQuestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({ userInput: question });
    this.sendQuestion();
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: 'AI互动问答',
      path: '/mingsu/mingsu/pages/ai-learning/qna',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20chat%20about%20Chinese%20folk%20culture%2C%20traditional%20style&image_size=square_hd'
    };
  }
});
