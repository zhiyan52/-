// mingsu/pages/quiz/quiz.js
Page({
  data: {
    questions: [
      {
        id: 1,
        question: '端午节是为了纪念谁？',
        options: ['屈原', '孔子', '老子', '孟子'],
        correctAnswer: 0
      },
      {
        id: 2,
        question: '月饼最初与哪个节日有关？',
        options: ['春节', '元宵节', '中秋节', '重阳节'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: '寒食节是为了纪念谁？',
        options: ['介子推', '伍子胥', '范蠡', '廉颇'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: '除夕守岁的寓意是什么？',
        options: ['驱赶邪灵', '祈求平安', '辞旧迎新', '庆祝丰收'],
        correctAnswer: 2
      },
      {
        id: 5,
        question: '重阳节人们通常会做什么？',
        options: ['赏月', '登高', '赛龙舟', '贴春联'],
        correctAnswer: 1
      },
      {
        id: 6,
        question: '清明节的主要活动是什么？',
        options: ['扫墓祭祖', '吃月饼', '放鞭炮', '挂灯笼'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '立春时人们会做什么？',
        options: ['赏菊', '鞭春牛', '吃粽子', '猜灯谜'],
        correctAnswer: 1
      },
      {
        id: 8,
        question: '中秋节的传统食品是什么？',
        options: ['粽子', '月饼', '汤圆', '饺子'],
        correctAnswer: 1
      }
    ],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    showResult: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '民俗知识小答题' });
  },

  selectAnswer(e) {
    if (this.data.isAnswered) return;
    this.setData({ selectedAnswer: e.currentTarget.dataset.index });
  },

  submitAnswer() {
    if (this.data.selectedAnswer === null) {
      wx.showToast({ title: '请选择一个答案', icon: 'none' });
      return;
    }

    const currentQuestion = this.data.questions[this.data.currentQuestionIndex];
    const isCorrect = this.data.selectedAnswer === currentQuestion.correctAnswer;
    let newScore = this.data.score;
    if (isCorrect) newScore++;

    this.setData({ isAnswered: true, score: newScore });

    // 显示结果
    wx.showToast({
      title: isCorrect ? '回答正确！' : '回答错误',
      icon: isCorrect ? 'success' : 'none',
      duration: 1500
    });
  },

  nextQuestion() {
    const nextIndex = this.data.currentQuestionIndex + 1;
    if (nextIndex < this.data.questions.length) {
      this.setData({ currentQuestionIndex: nextIndex, selectedAnswer: null, isAnswered: false });
    } else {
      // 答题结束
      this.setData({ showResult: true });
    }
  },

  restartQuiz() {
    this.setData({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      showResult: false
    });
  },

  getScoreDescription() {
    const score = this.data.score;
    const total = this.data.questions.length;
    const percentage = (score / total) * 100;

    if (percentage >= 90) {
      return '太棒了！你对民俗文化了如指掌！';
    } else if (percentage >= 70) {
      return '不错！你对民俗文化有很好的了解。';
    } else if (percentage >= 50) {
      return '加油！继续学习民俗文化知识。';
    } else {
      return '建议多了解一些民俗文化知识哦！';
    }
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · 民俗知识小答题',
      path: '/mingsu/pages/quiz/quiz'
    };
  }
});