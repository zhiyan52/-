// diancang/pages/heritage/heritage.js
Page({
  data: {
    // 可选典籍列表
    classics: [
      {
        id: 'lunyu',
        name: '论语',
        description: '孔子及其弟子的言行录',
        timePeriods: [
          { id: 'spring-autumn', name: '春秋', year: '公元前551-479年' },
          { id: 'han', name: '汉代', year: '公元前202-公元220年' },
          { id: 'song', name: '宋代', year: '公元960-1279年' },
          { id: 'ming', name: '明代', year: '公元1368-1644年' },
          { id: 'modern', name: '当代', year: '公元1912年至今' }
        ]
      },
      {
        id: 'tao-te-ching',
        name: '道德经',
        description: '老子的哲学著作',
        timePeriods: [
          { id: 'spring-autumn', name: '春秋', year: '公元前571-471年' },
          { id: 'han', name: '汉代', year: '公元前202-公元220年' },
          { id: 'tang', name: '唐代', year: '公元618-907年' },
          { id: 'song', name: '宋代', year: '公元960-1279年' },
          { id: 'modern', name: '当代', year: '公元1912年至今' }
        ]
      },
      {
        id: 'mengzi',
        name: '孟子',
        description: '孟子及其弟子的著作',
        timePeriods: [
          { id: 'warring-states', name: '战国', year: '公元前372-289年' },
          { id: 'han', name: '汉代', year: '公元前202-公元220年' },
          { id: 'song', name: '宋代', year: '公元960-1279年' },
          { id: 'ming', name: '明代', year: '公元1368-1644年' },
          { id: 'modern', name: '当代', year: '公元1912年至今' }
        ]
      }
    ],

    // 选中的典籍
    selectedClassic: null,

    // 时间轴状态
    timePeriods: [],
    selectedTimePeriod: null,

    // 场景状态
    currentScene: null,
    showScene: false,

    // 问题与答案
    currentQuestion: null,
    selectedAnswer: null,
    showFeedback: false,
    aiFeedback: '',

    // 真实对照
    originalText: '',
    translatedText: '',

    // 加载状态
    loading: false,
    aiLoading: false,

    // 剧情数据
    scenes: {
      lunyu: {
        'spring-autumn': {
          title: '孔子讲学',
          description: '你是孔子门下的一名弟子，正在曲阜的杏坛聆听夫子讲学。',
          questions: [
            {
              id: 1,
              question: '何为「仁」之本？',
              options: ['克己复礼', '兼爱非攻', '无为而治'],
              correctAnswer: 0,
              originalText: '克己复礼为仁。一日克己复礼，天下归仁焉。',
              translatedText: '克制自己，使言行符合礼的规范，这就是仁。一旦能够克制自己，使言行符合礼的规范，天下的人就会称许你是仁人了。',
              context: '《论语·颜渊》'
            },
            {
              id: 2,
              question: '如何做到「仁」？',
              options: ['己欲立而立人，己欲达而达人', '人不为己，天诛地灭', '杀鸡取卵，竭泽而渔'],
              correctAnswer: 0,
              originalText: '夫仁者，己欲立而立人，己欲达而达人。',
              translatedText: '所谓仁，就是自己想要站得住，也要帮助别人站得住；自己想要事事行得通，也要帮助别人事事行得通。',
              context: '《论语·雍也》'
            }
          ]
        },
        'han': {
          title: '汉代经学',
          description: '你是汉代的一位儒生，正在研读《论语》，并与同学讨论其中的义理。',
          questions: [
            {
              id: 1,
              question: '孔子认为学习的态度应该是？',
              options: ['三人行，必有我师焉', '骄傲自满，固步自封', '得过且过，敷衍了事'],
              correctAnswer: 0,
              originalText: '三人行，必有我师焉。择其善者而从之，其不善者而改之。',
              translatedText: '几个人一起走路，其中必定有可以做我老师的人。我选择他好的方面向他学习，看到他不好的方面就对照自己，改正自己的缺点。',
              context: '《论语·述而》'
            }
          ]
        }
      },
      'tao-te-ching': {
        'spring-autumn': {
          title: '老子出关',
          description: '你是函谷关的一名守关吏，遇到了准备西出函谷关的老子。',
          questions: [
            {
              id: 1,
              question: '老子认为万物的根源是什么？',
              options: ['道', '天', '地'],
              correctAnswer: 0,
              originalText: '道生一，一生二，二生三，三生万物。',
              translatedText: '道产生了一，一产生了二，二产生了三，三产生了万物。',
              context: '《道德经·第四十二章》'
            }
          ]
        }
      },
      mengzi: {
        'warring-states': {
          title: '孟子论政',
          description: '你是孟子的学生，正在听孟子讲述他的政治主张。',
          questions: [
            {
              id: 1,
              question: '孟子认为治理国家的根本是什么？',
              options: ['民为贵，社稷次之，君为轻', '君权神授，不可侵犯', '严刑峻法，以法治国'],
              correctAnswer: 0,
              originalText: '民为贵，社稷次之，君为轻。',
              translatedText: '人民是最重要的，国家其次，君主最轻。',
              context: '《孟子·尽心下》'
            }
          ]
        }
      }
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '典籍时光机' });
  },

  // 选择典籍
  selectClassic(e) {
    const classicId = e.currentTarget.dataset.id;
    const classic = this.data.classics.find(c => c.id === classicId);

    if (classic) {
      this.setData({
        selectedClassic: classic,
        timePeriods: classic.timePeriods,
        selectedTimePeriod: null,
        currentScene: null,
        showScene: false,
        currentQuestion: null,
        selectedAnswer: null,
        showFeedback: false,
        aiFeedback: ''
      });
    }
  },

  // 选择时间 period
  selectTimePeriod(e) {
    const periodId = e.currentTarget.dataset.id;
    const period = this.data.timePeriods.find(p => p.id === periodId);

    if (period && this.data.selectedClassic) {
      this.setData({
        selectedTimePeriod: period,
        currentScene: null,
        showScene: false,
        currentQuestion: null,
        selectedAnswer: null,
        showFeedback: false,
        aiFeedback: ''
      });

      // 加载场景
      this.loadScene();
    }
  },

  // 加载场景
  loadScene() {
    if (!this.data.selectedClassic || !this.data.selectedTimePeriod) return;

    const { id: classicId } = this.data.selectedClassic;
    const { id: periodId } = this.data.selectedTimePeriod;

    const scene = this.data.scenes[classicId] && this.data.scenes[classicId][periodId];

    if (scene) {
      this.setData({
        currentScene: scene,
        showScene: true,
        currentQuestion: scene.questions[0],
        selectedAnswer: null,
        showFeedback: false,
        aiFeedback: ''
      });
    }
  },

  // 选择答案
  selectAnswer(e) {
    const answerIndex = parseInt(e.currentTarget.dataset.index);
    this.setData({ selectedAnswer: answerIndex });
  },

  // 提交答案
  async submitAnswer() {
    if (this.data.selectedAnswer === null) {
      wx.showToast({ title: '请选择一个答案', icon: 'none' });
      return;
    }

    this.setData({ aiLoading: true });

    try {
      const { currentQuestion, selectedAnswer } = this.data;
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

      // 生成AI反馈
      const feedback = await this.generateAiFeedback(isCorrect, currentQuestion);

      this.setData({
        aiFeedback: feedback,
        originalText: currentQuestion.originalText,
        translatedText: currentQuestion.translatedText,
        showFeedback: true,
        aiLoading: false
      });
    } catch (error) {
      console.error('生成AI反馈失败:', error);

      // 降级方案
      const { currentQuestion, selectedAnswer } = this.data;
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

      let feedback = isCorrect
        ? '你答对了！'
        : '很遗憾，答案不正确。';

      this.setData({
        aiFeedback: feedback,
        originalText: currentQuestion.originalText,
        translatedText: currentQuestion.translatedText,
        showFeedback: true,
        aiLoading: false
      });
    }
  },

  // 生成AI反馈
  async generateAiFeedback(isCorrect, question) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'heritageAI',
        data: {
          type: 'classicFeedback',
          params: {
            classic: this.data.selectedClassic.name,
            timePeriod: this.data.selectedTimePeriod.name,
            question: question.question,
            isCorrect: isCorrect,
            correctAnswer: question.options[question.correctAnswer],
            context: question.context
          }
        }
      });

      return result && result.feedback ? result.feedback : (isCorrect ? '你答对了！' : '很遗憾，答案不正确。');
    } catch (error) {
      console.error('调用AI接口失败:', error);
      return isCorrect ? '你答对了！' : '很遗憾，答案不正确。';
    }
  },

  // 下一题
  nextQuestion() {
    const { currentScene, currentQuestion } = this.data;
    if (!currentScene || !currentQuestion) return;

    const currentIndex = currentScene.questions.findIndex(q => q.id === currentQuestion.id);
    const nextIndex = currentIndex + 1;

    if (nextIndex < currentScene.questions.length) {
      this.setData({
        currentQuestion: currentScene.questions[nextIndex],
        selectedAnswer: null,
        showFeedback: false,
        aiFeedback: ''
      });
    } else {
      // 场景结束
      wx.showToast({ title: '本场景学习完成！', icon: 'success' });
      this.setData({
        showScene: false,
        currentQuestion: null,
        selectedAnswer: null,
        showFeedback: false,
        aiFeedback: ''
      });
    }
  },

  // 重新开始
  restartScene() {
    this.loadScene();
  },

  // 切换典籍
  changeClassic() {
    this.setData({
      selectedClassic: null,
      timePeriods: [],
      selectedTimePeriod: null,
      currentScene: null,
      showScene: false,
      currentQuestion: null,
      selectedAnswer: null,
      showFeedback: false,
      aiFeedback: ''
    });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '典籍时光机 - 穿越式互动学习',
      path: '/diancang/pages/heritage/heritage',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20classics%20time%20machine%2C%20traditional%20style%2C%20scroll%20and%20books&image_size=square_hd'
    };
  }
});