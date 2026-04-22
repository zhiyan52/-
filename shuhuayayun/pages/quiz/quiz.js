// shuhuayayun/pages/quiz/quiz.js
Page({
  data: {
    questions: [
      {
        id: 1,
        question: '"天下第一行书"是哪部作品？',
        options: ['兰亭集序', '祭侄文稿', '寒食帖', '九成宫醴泉铭'],
        answer: 0
      },
      {
        id: 2,
        question: '楷书四大家分别是谁？',
        options: ['王羲之、颜真卿、柳公权、赵孟頫', '欧阳询、颜真卿、柳公权、赵孟頫', '王羲之、欧阳询、颜真卿、柳公权', '欧阳询、颜真卿、柳公权、苏轼'],
        answer: 1
      },
      {
        id: 3,
        question: '《清明上河图》描绘的是哪个朝代？',
        options: ['唐代', '宋代', '元代', '明代'],
        answer: 1
      },
      {
        id: 4,
        question: '国画"四君子"指什么？',
        options: ['梅、兰、竹、菊', '松、竹、梅、兰', '梅、兰、菊、荷', '松、竹、菊、梅'],
        answer: 0
      },
      {
        id: 5,
        question: '下列哪位书法家被称为"书圣"？',
        options: ['颜真卿', '王羲之', '欧阳询', '柳公权'],
        answer: 1
      },
      {
        id: 6,
        question: '《千里江山图》的作者是谁？',
        options: ['王希孟', '张择端', '黄公望', '顾恺之'],
        answer: 0
      },
      {
        id: 7,
        question: '下列哪种书体是由隶书演变而来的？',
        options: ['篆书', '楷书', '行书', '草书'],
        answer: 1
      },
      {
        id: 8,
        question: '《富春山居图》的作者是谁？',
        options: ['王希孟', '张择端', '黄公望', '顾恺之'],
        answer: 2
      }
    ],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showResult: false,
    isCorrect: false,
    answeredCount: 0,
    correctCount: 0
  },
  
  onLoad: function() {
    console.log('书画知识答题页面加载');
  },
  
  selectAnswer: function(e) {
    const answerIndex = e.currentTarget.dataset.index;
    this.setData({
      selectedAnswer: answerIndex
    });
  },
  
  submitAnswer: function() {
    if (this.data.selectedAnswer === null) {
      wx.showToast({
        title: '请选择一个答案',
        icon: 'none'
      });
      return;
    }
    
    const currentQuestion = this.data.questions[this.data.currentQuestionIndex];
    const isCorrect = this.data.selectedAnswer === currentQuestion.answer;
    
    this.setData({
      showResult: true,
      isCorrect: isCorrect,
      answeredCount: this.data.answeredCount + 1,
      correctCount: isCorrect ? this.data.correctCount + 1 : this.data.correctCount
    });
  },
  
  nextQuestion: function() {
    if (this.data.currentQuestionIndex < this.data.questions.length - 1) {
      this.setData({
        currentQuestionIndex: this.data.currentQuestionIndex + 1,
        selectedAnswer: null,
        showResult: false
      });
    } else {
      // 所有题目答完，显示最终结果
      wx.showModal({
        title: '答题完成',
        content: `共${this.data.questions.length}题，答对${this.data.correctCount}题`,
        showCancel: false,
        success: () => {
          // 重置答题状态
          this.setData({
            currentQuestionIndex: 0,
            selectedAnswer: null,
            showResult: false,
            answeredCount: 0,
            correctCount: 0
          });
        }
      });
    }
  }
});