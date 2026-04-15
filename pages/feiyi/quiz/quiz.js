Page({
  data: {
    totalScore: 0,
    streak: 3,
    currentIndex: 0,
    currentQuestion: null,
    questions: [],
    selectedOption: null,
    showAnswer: false,
    showResult: false,
    correctCount: 0,
    timeLeft: 30,
    usedTime: 0,
    startTime: 0,
    timer: null
  },

  onLoad: function (options) {
    this.loadQuestions();
    this.loadUserScore();
  },

  onUnload: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  loadUserScore: function () {
    const score = wx.getStorageSync('feiyi_quiz_score') || 0;
    const streak = wx.getStorageSync('feiyi_quiz_streak') || 0;
    this.setData({
      totalScore: score,
      streak: streak
    });
  },

  loadQuestions: function () {
    const allQuestions = [
      {
        question: '京剧是中国影响最大的戏曲剧种，它形成于哪个朝代？',
        options: ['明朝', '清朝', '民国', '新中国'],
        correctIndex: 1,
        explain: '京剧形成于清代乾隆年间，距今已有200多年历史，被誉为"国粹"。'
      },
      {
        question: '中国四大名绣不包括以下哪一项？',
        options: ['苏绣', '湘绣', '蜀绣', '京绣'],
        correctIndex: 3,
        explain: '中国四大名绣是苏绣、湘绣、蜀绣、粤绣，京绣不在其中。'
      },
      {
        question: '皮影戏最早起源于哪个朝代？',
        options: ['秦朝', '汉朝', '唐朝', '宋朝'],
        correctIndex: 1,
        explain: '皮影戏最早可追溯到西汉时期，是中国民间古老的传统艺术。'
      },
      {
        question: '太极拳是国家级非物质文化遗产，以下哪个不是太极拳的主要流派？',
        options: ['陈式', '杨式', '武式', '李式'],
        correctIndex: 3,
        explain: '太极拳主要流派有陈式、杨式、武式、吴式、孙式，没有李式。'
      },
      {
        question: '青花瓷属于什么类型的瓷器？',
        options: ['釉上彩', '釉下彩', '釉中彩', '颜色釉'],
        correctIndex: 1,
        explain: '青花瓷属釉下彩瓷，以其洁白细腻的胎体、晶莹透亮的釉色闻名于世。'
      },
      {
        question: '以下哪项不是中国非物质文化遗产？',
        options: ['昆曲', '古琴艺术', '京剧', '故宫'],
        correctIndex: 3,
        explain: '故宫是世界文化遗产，不是非物质文化遗产。前三项都是非遗项目。'
      },
      {
        question: '中国剪纸艺术最早可以追溯到哪个时期？',
        options: ['春秋战国', '汉代', '唐代', '宋代'],
        correctIndex: 1,
        explain: '剪纸艺术最早可追溯到汉代，是中国最古老的民间艺术之一。'
      },
      {
        question: '以下哪项是中国首个入选世界非遗的节日？',
        options: ['春节', '端午节', '中秋节', '清明节'],
        correctIndex: 1,
        explain: '端午节是中国首个入选世界非物质文化遗产的节日。'
      },
      {
        question: '中国书法中的"文房四宝"不包括以下哪一项？',
        options: ['笔', '墨', '纸', '印'],
        correctIndex: 3,
        explain: '文房四宝是指笔、墨、纸、砚，不包括印。'
      },
      {
        question: '以下哪项不是中国传统戏曲的行当？',
        options: ['生', '旦', '净', '武'],
        correctIndex: 3,
        explain: '中国传统戏曲行当分为生、旦、净、丑，没有"武"这个行当。'
      }
    ];

    const shuffled = this.shuffleArray(allQuestions).slice(0, 5);

    this.setData({
      questions: shuffled,
      currentQuestion: shuffled[0]
    });

    this.startTimer();
  },

  shuffleArray: function (array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  startTimer: function () {
    this.setData({
      startTime: Date.now(),
      timeLeft: 30
    });

    const timer = setInterval(() => {
      const timeLeft = this.data.timeLeft - 1;
      this.setData({
        timeLeft: timeLeft
      });

      if (timeLeft <= 0) {
        clearInterval(timer);
        this.timeUp();
      }
    }, 1000);

    this.setData({
      timer: timer
    });
  },

  timeUp: function () {
    if (!this.data.showAnswer) {
      this.setData({
        showAnswer: true,
        selectedOption: -1
      });
    }
  },

  selectOption: function (e) {
    if (this.data.showAnswer) return;

    const index = e.currentTarget.dataset.index;
    const isCorrect = index === this.data.currentQuestion.correctIndex;

    if (isCorrect) {
      this.setData({
        correctCount: this.data.correctCount + 1
      });
    }

    this.setData({
      selectedOption: index,
      showAnswer: true
    });

    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  nextQuestion: function () {
    const nextIndex = this.data.currentIndex + 1;

    if (nextIndex < this.data.questions.length) {
      this.setData({
        currentIndex: nextIndex,
        currentQuestion: this.data.questions[nextIndex],
        selectedOption: null,
        showAnswer: false,
        timeLeft: 30
      });
      this.startTimer();
    } else {
      this.showResult();
    }
  },

  showResult: function () {
    const usedTime = Math.floor((Date.now() - this.data.startTime) / 1000);
    const earnedScore = this.data.correctCount * 10;
    const newTotalScore = this.data.totalScore + earnedScore;

    wx.setStorageSync('feiyi_quiz_score', newTotalScore);

    this.setData({
      showResult: true,
      usedTime: usedTime,
      totalScore: newTotalScore
    });

    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  restartQuiz: function () {
    this.setData({
      currentIndex: 0,
      selectedOption: null,
      showAnswer: false,
      showResult: false,
      correctCount: 0,
      usedTime: 0
    });
    this.loadQuestions();
  },

  shareResult: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  goToLeaderboard: function () {
    wx.showToast({
      title: '排行榜功能开发中',
      icon: 'none'
    });
  },

  onShareAppMessage: function () {
    return {
      title: `我在非遗知识竞赛中答对了${this.data.correctCount}题，快来挑战我吧！`,
      path: '/pages/feiyi/quiz/quiz',
      imageUrl: '/images/share-quiz.png'
    };
  }
});