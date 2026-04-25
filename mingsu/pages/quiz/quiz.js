// mingsu/pages/quiz/quiz.js
Page({
  data: {
    started: false,
    completed: false,
    currentQuestionIndex: 0,
    selectedOption: null,
    score: 0,
    questions: [
      {
        id: 1,
        question: '春节是中国最重要的传统节日，它起源于哪个时期？',
        options: ['殷商时期', '周朝', '秦朝', '汉朝'],
        correctIndex: 0,
        explanation: '春节起源于殷商时期年头岁尾的祭神祭祖活动，是中国最隆重的传统节日。',
        userAnswer: null
      },
      {
        id: 2,
        question: '中秋节的传统习俗不包括以下哪项？',
        options: ['赏月', '吃月饼', '赛龙舟', '燃灯'],
        correctIndex: 2,
        explanation: '赛龙舟是端午节的传统习俗，不是中秋节的。',
        userAnswer: null
      },
      {
        id: 3,
        question: '清明节的主要习俗是什么？',
        options: ['扫墓祭祖', '吃粽子', '放鞭炮', '贴春联'],
        correctIndex: 0,
        explanation: '清明节的主要习俗是扫墓祭祖，表达对祖先的敬意和思念。',
        userAnswer: null
      },
      {
        id: 4,
        question: '端午节是为了纪念哪位历史人物？',
        options: ['孔子', '屈原', '李白', '关羽'],
        correctIndex: 1,
        explanation: '端午节是为了纪念投江自尽的屈原。',
        userAnswer: null
      },
      {
        id: 5,
        question: '重阳节的传统习俗不包括以下哪项？',
        options: ['登高', '赏菊', '饮菊花酒', '吃汤圆'],
        correctIndex: 3,
        explanation: '吃汤圆是元宵节的传统习俗，不是重阳节的。',
        userAnswer: null
      },
      {
        id: 6,
        question: '元宵节的传统习俗是什么？',
        options: ['赏花灯', '扫墓', '赛龙舟', '吃月饼'],
        correctIndex: 0,
        explanation: '元宵节的传统习俗包括赏花灯、吃元宵、猜灯谜等。',
        userAnswer: null
      },
      {
        id: 7,
        question: '二十四节气中的第一个节气是什么？',
        options: ['立春', '雨水', '惊蛰', '春分'],
        correctIndex: 0,
        explanation: '立春是二十四节气中的第一个节气，标志着春天的开始。',
        userAnswer: null
      },
      {
        id: 8,
        question: '下列哪项不是中国传统节日？',
        options: ['春节', '中秋节', '圣诞节', '清明节'],
        correctIndex: 2,
        explanation: '圣诞节是西方节日，不是中国传统节日。',
        userAnswer: null
      },
      {
        id: 9,
        question: '泼水节是哪个民族的传统节日？',
        options: ['汉族', '傣族', '蒙古族', '藏族'],
        correctIndex: 1,
        explanation: '泼水节是傣族的传统节日，象征着洗去旧年的不顺，迎接新年的好运。',
        userAnswer: null
      },
      {
        id: 10,
        question: '下列哪项是中国传统婚礼的习俗？',
        options: ['穿白色婚纱', '交换戒指', '拜天地', '办西式婚礼'],
        correctIndex: 2,
        explanation: '拜天地是中国传统婚礼的重要习俗，象征着对天地的敬意和对婚姻的承诺。',
        userAnswer: null
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '知识答题' });
  },

  // 开始答题
  startQuiz() {
    this.setData({ started: true, completed: false, currentQuestionIndex: 0, selectedOption: null, score: 0 });
    // 重置用户答案
    const questions = this.data.questions.map(q => ({
      ...q,
      userAnswer: null
    }));
    this.setData({ questions });
  },

  // 选择选项
  selectOption(e) {
    const { index, option } = e.currentTarget.dataset;
    this.setData({ selectedOption: index });
  },

  // 下一题
  nextQuestion() {
    if (this.data.selectedOption === null) {
      return;
    }

    // 记录用户答案
    const questions = [...this.data.questions];
    questions[this.data.currentQuestionIndex].userAnswer = questions[this.data.currentQuestionIndex].options[this.data.selectedOption];

    // 计算得分
    let score = this.data.score;
    if (this.data.selectedOption === questions[this.data.currentQuestionIndex].correctIndex) {
      score += 10;
    }

    // 更新数据
    this.setData({ questions, score });

    // 检查是否完成答题
    if (this.data.currentQuestionIndex === this.data.questions.length - 1) {
      // 完成答题
      this.setData({ completed: true });
    } else {
      // 下一题
      this.setData({ currentQuestionIndex: this.data.currentQuestionIndex + 1, selectedOption: null });
    }
  },

  // 重新答题
  restartQuiz() {
    this.startQuiz();
  },

  // 返回首页
  backHome() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '知识答题 - 民俗知识小测试',
      path: '/mingsu/pages/quiz/quiz'
    };
  }
});