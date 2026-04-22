// 书画知识轻答题页面逻辑
Page({
  data: {
    // 题库数据
    questions: [
      {
        question: '"天下第一行书"是哪部作品？',
        options: ['《祭侄文稿》', '《兰亭集序》', '《九成宫醴泉铭》', '《寒食帖》'],
        correctIndex: 1,
        explanation: '《兰亭集序》是王羲之的代表作，被誉为"天下第一行书"。'
      },
      {
        question: '楷书四大家分别是谁？',
        options: ['王羲之、颜真卿、柳公权、赵孟頫', '欧阳询、颜真卿、柳公权、赵孟頫', '王羲之、欧阳询、颜真卿、柳公权', '欧阳询、颜真卿、柳公权、苏轼'],
        correctIndex: 1,
        explanation: '楷书四大家是指唐代的欧阳询、颜真卿、柳公权和元代的赵孟頫。'
      },
      {
        question: '《清明上河图》描绘的是哪个朝代？',
        options: ['唐代', '北宋', '南宋', '元代'],
        correctIndex: 1,
        explanation: '《清明上河图》是北宋画家张择端的代表作，描绘了北宋都城汴京的繁华景象。'
      },
      {
        question: '国画"四君子"指什么？',
        options: ['梅、兰、竹、菊', '梅、兰、竹、松', '梅、兰、菊、松', '兰、竹、菊、松'],
        correctIndex: 0,
        explanation: '国画"四君子"指的是梅、兰、竹、菊，象征着高洁、坚韧、正直等品质。'
      },
      {
        question: '下列哪位书法家被称为"书圣"？',
        options: ['颜真卿', '王羲之', '欧阳询', '赵孟頫'],
        correctIndex: 1,
        explanation: '王羲之被后人尊为"书圣"，他的书法艺术对后世产生了深远影响。'
      },
      {
        question: '《千里江山图》的作者是谁？',
        options: ['王希孟', '黄公望', '张择端', '顾恺之'],
        correctIndex: 0,
        explanation: '《千里江山图》是北宋画家王希孟的代表作，展现了祖国大好河山。'
      },
      {
        question: '下列哪种书体是介于楷书和草书之间的？',
        options: ['篆书', '隶书', '行书', '金文'],
        correctIndex: 2,
        explanation: '行书是介于楷书和草书之间的书体，既具有楷书的易读性，又具有草书的流畅性。'
      },
      {
        question: '《富春山居图》的作者是谁？',
        options: ['王希孟', '黄公望', '张择端', '顾恺之'],
        correctIndex: 1,
        explanation: '《富春山居图》是元代画家黄公望的代表作，展现了富春江山水之美。'
      }
    ],
    currentQuestion: 0,
    currentQuestionData: null,
    selectedOption: -1,
    answered: false,
    score: 0,
    showResult: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '书画知识答题' });
    this.setData({
      currentQuestionData: this.data.questions[0]
    });
  },

  // 选择选项
  selectOption(e) {
    if (this.data.answered) return;
    
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedOption: index, answered: true });
    
    // 判断是否正确
    const isCorrect = index === this.data.currentQuestionData.correctIndex;
    if (isCorrect) {
      this.setData({ score: this.data.score + 10 });
    }
    this.setData({ isCorrect });
  },

  // 下一题
  nextQuestion() {
    const nextQuestion = this.data.currentQuestion + 1;
    if (nextQuestion < this.data.questions.length) {
      this.setData({
        currentQuestion: nextQuestion,
        currentQuestionData: this.data.questions[nextQuestion],
        selectedOption: -1,
        answered: false,
        isCorrect: false
      });
    }
  },

  // 显示最终结果
  showFinalResult() {
    this.setData({ showResult: true });
  },

  // 重新答题
  restartQuiz() {
    this.setData({
      currentQuestion: 0,
      currentQuestionData: this.data.questions[0],
      selectedOption: -1,
      answered: false,
      score: 0,
      showResult: false,
      isCorrect: false
    });
  },

  // 获取结果文本
  getResultText() {
    const score = this.data.score;
    const total = this.data.questions.length * 10;
    const percentage = (score / total) * 100;
    
    if (percentage >= 90) {
      return '太棒了！你是书画知识专家！';
    } else if (percentage >= 70) {
      return '不错！你对书画知识有很好的了解。';
    } else if (percentage >= 50) {
      return '加油！你对书画知识有一定的了解。';
    } else {
      return '继续努力！多学习书画知识。';
    }
  }
});