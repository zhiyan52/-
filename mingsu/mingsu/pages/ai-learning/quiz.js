// mingsu/mingsu/pages/ai-learning/quiz.js
Page({
  data: {
    // 测验题目
    quizzes: [
      {
        question: '春节的起源与下列哪项有关？',
        options: ['年兽的传说', '嫦娥奔月', '屈原投江', '牛郎织女'],
        correctAnswer: 0,
        explanation: '春节的起源与年兽的传说有关。传说中，年兽是一种凶猛的怪兽，每到除夕夜就会出来伤人。人们发现年兽害怕红色、火光和响声，于是就有了贴春联、放鞭炮的习俗。'
      },
      {
        question: '中秋节的传统食物是什么？',
        options: ['粽子', '月饼', '饺子', '汤圆'],
        correctAnswer: 1,
        explanation: '中秋节的传统食物是月饼。月饼象征着团圆，人们在中秋节这一天会赏月、吃月饼，表达对家人的思念之情。'
      },
      {
        question: '端午节是为了纪念谁？',
        options: ['孔子', '老子', '屈原', '孟子'],
        correctAnswer: 2,
        explanation: '端午节是为了纪念屈原。屈原是战国时期的爱国诗人，他在五月初五投江自尽，人们为了不让鱼虾吃掉他的身体，就往江里投粽子，后来逐渐形成了端午节的习俗。'
      },
      {
        question: '下列哪项不是中国传统婚礼的仪式？',
        options: ['拜天地', '交杯酒', '闹洞房', '圣诞树'],
        correctAnswer: 3,
        explanation: '圣诞树是西方圣诞节的习俗，不是中国传统婚礼的仪式。中国传统婚礼包括拜天地、交杯酒、闹洞房等仪式。'
      },
      {
        question: '清明节的主要习俗是什么？',
        options: ['赏月', '扫墓', '赛龙舟', '吃月饼'],
        correctAnswer: 1,
        explanation: '清明节的主要习俗是扫墓。人们在清明节这一天会去祖先的墓地扫墓，表达对先人的思念之情。'
      }
    ],
    // 当前题目索引
    currentQuestion: 0,
    // 总题目数
    totalQuestions: 5,
    // 当前题目
    currentQuiz: {},
    // 得分
    score: 0,
    // 已回答
    answered: false,
    // 选中的选项
    selectedOption: -1,
    // 测验结束
    quizEnd: false,
    // 时间剩余
    timeLeft: 60,
    // 计时器
    timer: null
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '民俗知识测验' });
    this.startQuiz();
  },

  // 开始测验
  startQuiz() {
    this.setData({
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedOption: -1,
      quizEnd: false,
      timeLeft: 60,
      currentQuiz: this.data.quizzes[0]
    });
    this.startTimer();
  },

  // 开始计时器
  startTimer() {
    this.data.timer = setInterval(() => {
      if (this.data.timeLeft > 0) {
        this.setData({ timeLeft: this.data.timeLeft - 1 });
      } else {
        clearInterval(this.data.timer);
        this.submitAnswer();
      }
    }, 1000);
  },

  // 选择选项
  selectOption(e) {
    if (this.data.answered) return;
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedOption: index });
  },

  // 提交答案
  submitAnswer() {
    if (this.data.answered) return;

    const { selectedOption, currentQuiz } = this.data;
    let newScore = this.data.score;

    if (selectedOption === currentQuiz.correctAnswer) {
      newScore += 10;
    }

    this.setData({
      answered: true,
      score: newScore
    });

    clearInterval(this.data.timer);
  },

  // 下一题
  nextQuestion() {
    const nextQuestion = this.data.currentQuestion + 1;

    if (nextQuestion < this.data.totalQuestions) {
      this.setData({
        currentQuestion: nextQuestion,
        currentQuiz: this.data.quizzes[nextQuestion],
        answered: false,
        selectedOption: -1,
        timeLeft: 60
      });
      this.startTimer();
    } else {
      this.endQuiz();
    }
  },

  // 结束测验
  endQuiz() {
    clearInterval(this.data.timer);
    this.setData({ quizEnd: true });
  },

  // 重新测验
  restartQuiz() {
    this.startQuiz();
  },

  // 查看解析
  reviewAnswers() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/ai-learning/quiz-review'
    });
  },

  // 获取等级
  getRank(score) {
    if (score === 50) return '民俗专家！';
    if (score >= 40) return '民俗达人';
    if (score >= 30) return '民俗爱好者';
    if (score >= 20) return '民俗新手';
    return '继续努力！';
  },

  // 生命周期函数--监听页面卸载
  onUnload() {
    clearInterval(this.data.timer);
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: '民俗知识测验',
      path: '/mingsu/mingsu/pages/ai-learning/quiz',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20folk%20knowledge%20quiz%2C%20traditional%20style&image_size=square_hd'
    };
  }
});
