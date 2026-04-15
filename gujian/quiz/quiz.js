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
    const score = wx.getStorageSync('gujian_quiz_score') || 0;
    const streak = wx.getStorageSync('gujian_quiz_streak') || 0;
    this.setData({
      totalScore: score,
      streak: streak
    });
  },

  loadQuestions: function () {
    const allQuestions = [
      {
        question: '故宫始建于哪个朝代？',
        options: ['唐朝', '宋朝', '明朝', '清朝'],
        correctIndex: 2,
        explain: '故宫始建于明朝永乐四年（1406年），永乐十八年（1420年）建成，是明清两代的皇家宫殿。'
      },
      {
        question: '中国古代建筑中的"斗拱"主要作用是什么？',
        options: ['装饰作用', '承重和装饰', '排水', '通风'],
        correctIndex: 1,
        explain: '斗拱是中国古代建筑中特有的构件，既有承重作用，又有装饰作用，是中国古建筑的重要特征。'
      },
      {
        question: '苏州园林中最著名的是哪一座？',
        options: ['颐和园', '拙政园', '圆明园', '避暑山庄'],
        correctIndex: 1,
        explain: '拙政园是苏州最大的古典园林，也是中国四大名园之一，被誉为"中国园林之母"。'
      },
      {
        question: '中国古代建筑中，"歇山顶"是指什么？',
        options: ['一种屋顶形式', '一种建筑材料', '一种建筑工具', '一种装饰'],
        correctIndex: 0,
        explain: '歇山顶是中国古代建筑屋顶形式之一，由一条正脊、四条垂脊和四条戗脊组成，共九脊。'
      },
      {
        question: '中国古代建筑中常用的"榫卯结构"有什么特点？',
        options: ['使用钉子连接', '使用胶水粘合', '不用钉子和胶水', '使用焊接'],
        correctIndex: 2,
        explain: '榫卯结构是中国传统建筑中一种独特的连接方式，不用钉子和胶水，通过榫头和卯眼的精密配合来连接木材。'
      },
      {
        question: '天坛的主要用途是什么？',
        options: ['皇帝居住', '祭祀天地', '处理政务', '接待外宾'],
        correctIndex: 1,
        explain: '天坛是明清两代皇帝祭天、祈求五谷丰登的场所，体现了中国古代"天人合一"的哲学思想。'
      },
      {
        question: '中国古代建筑中，"藻井"通常位于建筑的哪个位置？',
        options: ['地面', '墙壁', '天花板', '屋顶'],
        correctIndex: 2,
        explain: '藻井是中国古代建筑中室内顶棚的独特装饰，多用于宫殿、寺庙等重要建筑的宝座或神像上方。'
      },
      {
        question: '中国古代建筑中，"影壁"的主要作用是什么？',
        options: ['装饰', '遮挡视线', '挡风', '以上都是'],
        correctIndex: 3,
        explain: '影壁既有装饰作用，又能遮挡视线，保护隐私，还能挡风，是中国传统建筑的重要组成部分。'
      },
      {
        question: '中国古代建筑中，"须弥座"通常用于什么建筑？',
        options: ['民居', '宫殿和寺庙', '园林', '桥梁'],
        correctIndex: 1,
        explain: '须弥座是一种高级的台基，通常用于宫殿、寺庙等重要建筑，象征着尊贵和神圣。'
      },
      {
        question: '中国古代建筑中，"雀替"的主要作用是什么？',
        options: ['装饰', '承托梁枋', '固定柱子', '以上都是'],
        correctIndex: 3,
        explain: '雀替是中国古建筑的特色构件之一，既有装饰作用，又能承托梁枋，还能固定柱子，功能多样。'
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

    wx.setStorageSync('gujian_quiz_score', newTotalScore);

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
      title: `我在古建知识竞赛中答对了${this.data.correctCount}题，快来挑战我吧！`,
      path: '/gujian/quiz/quiz',
      imageUrl: '/images/share-quiz.png'
    };
  }
});