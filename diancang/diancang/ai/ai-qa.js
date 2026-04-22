// diancang/diancang/ai/ai-qa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userQuestion: '',
    aiAnswer: '',
    loading: false,
    showResponse: false,
    faqList: [
      '帮我赏析李白的《将进酒》',
      '秦始皇真的焚书坑儒吗？',
      '《论语》的核心思想是什么？',
      '飞花令',
      '今日一签',
      '以图证史',
      '穿越对话',
      '方言读诗'
    ],
    chatHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化页面
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时的处理
  },

  // 输入框内容变化
  inputChange(e) {
    this.setData({
      userQuestion: e.detail.value
    });
  },

  // 选择常见问题
  selectFAQ(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      userQuestion: question
    });
    this.sendQuestion();
  },

  // 发送问题
  sendQuestion() {
    const question = this.data.userQuestion.trim();
    if (!question) {
      wx.showToast({
        title: '请输入您的问题',
        icon: 'none'
      });
      return;
    }

    this.setData({
      loading: true,
      showResponse: true
    });

    // 调用云函数获取AI回答
    wx.cloud.callFunction({
      name: 'ai-assistant',
      data: {
        question: question,
        history: this.data.chatHistory,
        persona: '文心先生',
        style: '文言白话交融，引经据典而不晦涩，雅俗共赏'
      }
    }).then(res => {
      console.log('AI回答:', res.result);
      this.setData({
        aiAnswer: res.result.answer,
        loading: false
      });

      // 更新聊天历史
      this.data.chatHistory.push({
        role: 'user',
        content: question
      });
      this.data.chatHistory.push({
        role: 'assistant',
        content: res.result.answer
      });

    }).catch(err => {
      console.error('调用AI助手失败:', err);
      wx.showToast({
        title: 'AI调用失败，请重试',
        icon: 'none'
      });
      this.setData({
        loading: false
      });

      // 使用本地回答作为后备
      this.useLocalAnswer(question);
    });
  },

  // 使用本地回答作为后备
  useLocalAnswer(question) {
    let answer = '';
    
    if (question.includes('将进酒')) {
      answer = '【起】天宝年间，李白被赐金放还，离开长安，心中虽有愤懑，却依然保持豪放不羁的性格。\n【承】"黄河之水天上来，奔流到海不复回"喻时光易逝，人生短暂；"天生我材必有用，千金散尽还复来"展现自信与洒脱。\n【转】李白一生漫游山水，饮酒作诗，与盛唐气象相呼应，体现了那个时代文人的自由精神。\n【合】"天生我材必有用"的自信精神，至今仍激励着无数人。\n【互动】君最爱诗中哪一句？';
    } else if (question.includes('焚书坑儒')) {
      answer = '【正本清源】"焚书"与"坑儒"是两件事，时间、对象、规模各不相同。\n【史料依据】据《史记·秦始皇本纪》《史记·儒林列传》记载，焚书发生于公元前213年，坑儒发生于公元前212年。\n【学术视角】近年研究认为，"坑儒"或为方士，人数存疑。\n【辩证评价】置于大一统历史语境中分析，秦始皇的举措旨在统一思想，巩固中央集权。\n【延伸推荐】可观看相关纪录片了解更多。';
    } else if (question.includes('论语')) {
      answer = '《论语》的核心思想是"仁"，孔子认为"仁"是道德的最高标准。此外，还包括"礼"、"义"、"智"、"信"等价值观，强调个人修养与社会责任的统一，对中国传统文化影响深远。';
    } else if (question.includes('飞花令')) {
      answer = '飞花令游戏开始！今日令字为"春"，请您以"春"字开头或含"春"字的诗句回应。';
    } else if (question.includes('今日一签')) {
      answer = '今日签文："天行健，君子以自强不息。"出自《周易》，愿君今日勤勉向上，收获满满。';
    } else if (question.includes('以图证史')) {
      answer = '以图证史是一种重要的历史研究方法，通过文物、绘画等图像资料与文献记载相互印证，还原历史真相。';
    } else if (question.includes('穿越对话')) {
      answer = '穿越对话模式已启动，您想与哪位古人对话？请告诉我他的名字。';
    } else if (question.includes('方言读诗')) {
      answer = '方言读诗功能已启动，您想听哪种方言的吟诵？可选粤语、闽南语、吴语等。';
    } else {
      answer = '学海无涯，此题吾亦存疑。然"知之为知之，不知为不知"，吾当与君共探。';
    }

    this.setData({
      aiAnswer: answer
    });

    // 更新聊天历史
    this.data.chatHistory.push({
      role: 'user',
      content: question
    });
    this.data.chatHistory.push({
      role: 'assistant',
      content: answer
    });
  }
})