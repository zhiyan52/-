// diancang/diancang/ai/ai-qa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 问答模式数据
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
    chatHistory: [],

    // 答题模式数据
    questions: [
      {
        question: '《论语》的核心思想是什么？',
        options: ['仁', '礼', '义', '智'],
        correctAnswer: 0,
        explanation: '《论语》的核心思想是"仁"，孔子认为"仁"是道德的最高标准，是做人的根本。',
        aiAnalysis: '"仁"是孔子思想的核心，体现了对他人的关爱与尊重，是儒家伦理的基础。在《论语》中，孔子多次强调"仁"的重要性，认为"仁"是君子的必备品质。'
      },
      {
        question: '下列哪部作品是中国第一部纪传体通史？',
        options: ['《史记》', '《资治通鉴》', '《汉书》', '《战国策》'],
        correctAnswer: 0,
        explanation: '《史记》是西汉史学家司马迁撰写的中国第一部纪传体通史，记载了上至上古传说中的黄帝时代，下至汉武帝太初四年间共3000多年的历史。',
        aiAnalysis: '《史记》开创了纪传体史书的先河，以人物传记为中心，兼具史学价值和文学价值，被鲁迅誉为"史家之绝唱，无韵之离骚"。'
      },
      {
        question: '"天生我材必有用，千金散尽还复来"出自哪位诗人的作品？',
        options: ['李白', '杜甫', '白居易', '苏轼'],
        correctAnswer: 0,
        explanation: '这句诗出自李白的《将进酒》，表达了诗人对自己才华的自信和豁达的人生态度。',
        aiAnalysis: '李白的《将进酒》展现了盛唐文人的豪放不羁，这句诗体现了李白对个人价值的肯定和对物质财富的超然态度，成为中国文学史上的经典名句。'
      },
      {
        question: '中国古代四大发明不包括下列哪一项？',
        options: ['造纸术', '指南针', '火药', '瓷器'],
        correctAnswer: 3,
        explanation: '中国古代四大发明是指造纸术、印刷术、火药和指南针，瓷器不属于四大发明。',
        aiAnalysis: '四大发明是中国对世界文明的重要贡献，它们的传播和应用极大地推动了人类社会的发展。瓷器虽然也是中国的重要发明，但通常不被列入四大发明之列。'
      },
      {
        question: '《诗经》中"关关雎鸠，在河之洲"的下一句是什么？',
        options: ['窈窕淑女，君子好逑', '参差荇菜，左右流之', '悠哉悠哉，辗转反侧', '求之不得，寤寐思服'],
        correctAnswer: 0,
        explanation: '"关关雎鸠，在河之洲。窈窕淑女，君子好逑"是《诗经·关雎》的开头两句，描写了美好的爱情场景。',
        aiAnalysis: '《诗经》是中国第一部诗歌总集，《关雎》是其开篇之作，以雎鸠和鸣起兴，表达了对美好爱情的向往，体现了《诗经》"风以动之"的艺术特色。'
      }
    ],
    currentQuestionIndex: 0,
    currentQuestion: null,
    selectedOption: -1,
    showAnswer: false,
    isCorrect: false,
    score: 0,
    timer: 30,
    timerInterval: null,
    aiAnalysis: '',
    aiAnalysisLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initQuestion();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时的处理
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    if (this.data.timerInterval) {
      clearInterval(this.data.timerInterval);
    }
  },

  // 初始化题目
  initQuestion() {
    // 循环使用题目，实现无限答题
    const currentQuestionIndex = this.data.currentQuestionIndex % this.data.questions.length;
    const currentQuestion = this.data.questions[currentQuestionIndex];
    this.setData({
      currentQuestion: currentQuestion,
      selectedOption: -1,
      showAnswer: false,
      isCorrect: false,
      timer: 30,
      aiAnalysis: ''
    });

    // 启动计时器
    this.startTimer();
  },

  // 启动计时器
  startTimer() {
    if (this.data.timerInterval) {
      clearInterval(this.data.timerInterval);
    }

    const interval = setInterval(() => {
      this.setData({
        timer: this.data.timer - 1
      });

      if (this.data.timer <= 0) {
        clearInterval(interval);
        this.submitAnswer();
      }
    }, 1000);

    this.setData({
      timerInterval: interval
    });
  },

  // 选择选项
  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedOption: index
    });
  },

  // 提交答案
  submitAnswer() {
    if (this.data.timerInterval) {
      clearInterval(this.data.timerInterval);
    }

    const isCorrect = this.data.selectedOption === this.data.currentQuestion.correctAnswer;
    let newScore = this.data.score;
    if (isCorrect) {
      newScore += 20;
    }

    this.setData({
      showAnswer: true,
      isCorrect: isCorrect,
      score: newScore
    });

    // 获取AI解析
    this.getAIAnalysis();
  },

  // 获取AI解析
  getAIAnalysis() {
    const { currentQuestion, selectedOption, isCorrect } = this.data;

    this.setData({
      aiAnalysisLoading: true,
      aiAnalysis: ''
    });

    // 模拟AI解析，避免云函数调用失败
    setTimeout(() => {
      // 先使用预设的AI解析作为默认值
      let analysis = currentQuestion.aiAnalysis;

      // 可以根据问题类型添加不同的解析内容
      if (currentQuestion.question.includes('论语')) {
        analysis = '《论语》是孔子及其弟子的言行录，是儒家学派的经典著作。"仁"是孔子思想的核心，体现了对他人的关爱与尊重。在《论语》中，孔子多次强调"仁"的重要性，认为"仁"是君子的必备品质。孔子的思想对中国传统文化产生了深远的影响，至今仍被人们所重视。';
      } else if (currentQuestion.question.includes('史记')) {
        analysis = '《史记》是西汉史学家司马迁撰写的中国第一部纪传体通史，记载了上至上古传说中的黄帝时代，下至汉武帝太初四年间共3000多年的历史。《史记》开创了纪传体史书的先河，以人物传记为中心，兼具史学价值和文学价值，被鲁迅誉为"史家之绝唱，无韵之离骚"。';
      } else if (currentQuestion.question.includes('将进酒')) {
        analysis = '李白的《将进酒》展现了盛唐文人的豪放不羁，"天生我材必有用，千金散尽还复来"体现了李白对个人价值的肯定和对物质财富的超然态度。这首诗以黄河之水起兴，表达了对时光易逝的感慨和对人生的热爱，成为中国文学史上的经典名句。';
      }

      this.setData({
        aiAnalysis: analysis,
        aiAnalysisLoading: false
      });
    }, 1000);
  },

  // 下一题
  nextQuestion() {
    this.setData({
      currentQuestionIndex: this.data.currentQuestionIndex + 1
    });
    this.initQuestion();
  },

  // 返回
  goBack() {
    wx.navigateBack();
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