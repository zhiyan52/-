// shufa/shufa/ai/ai-qa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [
      {
        content: '你好！我是书画文化AI助手，有什么关于书画艺术的问题可以问我。'
      }
    ],
    userMessages: [],
    inputValue: '',
    faqList: [
      { question: '什么是书法的基本笔画？' },
      { question: '国画的主要流派有哪些？' },
      { question: '如何欣赏一幅书法作品？' },
      { question: '中国古代有哪些著名的画家？' },
      { question: '书画作品如何保养？' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 输入框绑定事件
   */
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  /**
   * 发送消息
   */
  sendMessage() {
    if (!this.data.inputValue.trim()) return;

    // 添加用户消息
    const userMessage = {
      content: this.data.inputValue
    };
    const newUserMessages = [...this.data.userMessages, userMessage];

    // 清空输入框
    this.setData({
      userMessages: newUserMessages,
      inputValue: ''
    });

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        content: '这是一个关于"' + this.data.inputValue + '"的回答。在实际应用中，这里会调用AI模型生成真实的回答。'
      };
      const newMessages = [...this.data.messages, aiMessage];
      this.setData({
        messages: newMessages
      });
    }, 1000);
  },

  /**
   * 选择常见问题
   */
  selectFaq(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      inputValue: question
    });
    this.sendMessage();
  }
})