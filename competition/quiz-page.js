Page({
  data: {
    type: 'daily',
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    selectedOption: null,
    showAnswer: false,
    progressPercent: 0,
    showTimer: true,
    timeLeft: 30,
    timer: null,
    correctCount: 0,
    player1: {
      name: '我',
      avatar: 'https://picsum.photos/80/80?random=101',
      score: 0
    },
    player2: {
      name: '对手',
      avatar: 'https://picsum.photos/80/80?random=102',
      score: 0
    }
  },

  onLoad: function (options) {
    const type = options.type || 'daily';
    this.setData({ type });

    this.loadQuestions();
  },

  onUnload: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
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
        question: '以下哪个不是世界文化遗产？',
        options: ['长城', '颐和园', '拙政园', '阿房宫'],
        correctIndex: 3,
        explain: '阿房宫是秦朝的宫殿，早已被焚毁，现在仅存遗址，未被列入世界文化遗产名录。'
      },
      {
        question: '中国古代建筑中，最高等级的屋顶形式是？',
        options: ['歇山顶', '硬山顶', '庑殿顶', '攒尖顶'],
        correctIndex: 2,
        explain: '庑殿顶是中国古代建筑中等级最高的屋顶形式，多用于皇宫、庙宇等重要建筑。'
      },
      {
        question: '布达拉宫位于哪个城市？',
        options: ['西宁', '拉萨', '成都', '昆明'],
        correctIndex: 1,
        explain: '布达拉宫位于西藏拉萨，是世界上海拔最高的宫殿，也是藏传佛教的重要圣地。'
      },
      {
        question: '中国古代建筑用的主要材料是什么？',
        options: ['石头', '木头', '砖块', '钢铁'],
        correctIndex: 1,
        explain: '中国古代建筑以木结构为主，这与西方建筑以石结构为主形成了鲜明对比。'
      },
      {
        question: '岳阳楼位于哪个省？',
        options: ['江西', '湖南', '湖北', '浙江'],
        correctIndex: 1,
        explain: '岳阳楼位于湖南省岳阳市，是中国四大名楼之一，因范仲淹的《岳阳楼记》而闻名。'
      },
      {
        question: '中国第一座佛教寺庙是？',
        options: ['少林寺', '白马寺', '灵隐寺', '法门寺'],
        correctIndex: 1,
        explain: '白马寺位于河南洛阳，始建于东汉永平十一年（68年），是中国第一座官办佛教寺院。'
      },
      {
        question: '以下哪个建筑是皇家园林？',
        options: ['拙政园', '留园', '颐和园', '网师园'],
        correctIndex: 2,
        explain: '颐和园是中国清朝时期的皇家园林，前身为清漪园，坐落在北京西郊。'
      },
      {
        question: '故宫的正门是？',
        options: ['东华门', '西华门', '午门', '神武门'],
        correctIndex: 2,
        explain: '午门是故宫的正门，位于紫禁城南北轴线，是皇帝举行大典的地方。'
      },
      {
        question: '中国现存最大的古代宫殿建筑群是？',
        options: ['布达拉宫', '故宫', '避暑山庄', '大明宫遗址'],
        correctIndex: 1,
        explain: '故宫是中国现存最大、最完整的古代宫殿建筑群，有大小宫殿七十多座，房屋九千余间。'
      }
    ];

    const shuffled = this.shuffleArray(allQuestions).slice(0, 10);
    this.setData({
      questions: shuffled,
      currentQuestion: shuffled[0],
      progressPercent: 0,
      timeLeft: type === 'daily' ? 30 : 15
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
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }

    const timer = setInterval(() => {
      const timeLeft = this.data.timeLeft - 1;
      this.setData({ timeLeft });

      if (timeLeft <= 0) {
        clearInterval(timer);
        this.timeoutHandler();
      }
    }, 1000);

    this.setData({ timer });
  },

  timeoutHandler: function () {
    this.setData({ showAnswer: true });
  },

  selectOption: function (e) {
    if (this.data.showAnswer) return;

    const index = e.currentTarget.dataset.index;
    const isCorrect = index === this.data.currentQuestion.correctIndex;

    if (this.data.timer) {
      clearInterval(this.data.timer);
    }

    if (isCorrect) {
      const correctCount = this.data.correctCount + 1;
      this.setData({ correctCount });

      if (this.data.type === 'battle') {
        const player1 = { ...this.data.player1 };
        player1.score += 10;
        this.setData({ player1 });
      }
    }

    this.setData({
      selectedOption: index,
      showAnswer: true
    });
  },

  nextQuestion: function () {
    const nextIndex = this.data.currentIndex + 1;
    const progressPercent = ((nextIndex) / this.data.questions.length) * 100;

    this.setData({
      currentIndex: nextIndex,
      currentQuestion: this.data.questions[nextIndex],
      selectedOption: null,
      showAnswer: false,
      progressPercent: progressPercent,
      timeLeft: this.data.type === 'daily' ? 30 : 15
    });

    this.startTimer();
  },

  showResult: function () {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }

    const resultData = {
      type: this.data.type,
      total: this.data.questions.length,
      correct: this.data.correctCount,
      score: this.calculateScore()
    };

    if (this.data.type === 'daily') {
      this.saveDailyResult(resultData);
    }

    wx.navigateTo({
      url: `/competition/result-page?data=${encodeURIComponent(JSON.stringify(resultData))}`
    });
  },

  calculateScore: function () {
    let score = this.data.correctCount * 5;
    if (this.data.correctCount === this.data.questions.length) {
      score += 50;
    }
    return score;
  },

  saveDailyResult: function (resultData) {
    const today = new Date().toDateString();
    wx.setStorageSync('last_daily_date', today);

    const userInfo = wx.getStorageSync('user_competition_info') || {
      name: '用户',
      avatar: '',
      totalScore: 0,
      winCount: 0,
      dailyStreak: 0
    };

    userInfo.totalScore += resultData.score;
    userInfo.dailyStreak += 1;

    wx.setStorageSync('user_competition_info', userInfo);
  }
});