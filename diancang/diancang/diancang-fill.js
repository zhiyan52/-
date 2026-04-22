Page({
  data: {
    questions: [
      {
        id: 1,
        source: '《论语》',
        content: [
          { type: 'text', text: '子曰：' },
          { type: 'blank', index: 0, correct: '学而时习之' },
          { type: 'text', text: '，不亦' },
          { type: 'blank', index: 1, correct: '说乎' },
          { type: 'text', text: '？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？' }
        ],
        options: ['学而时习之', '温故而知新', '学而不思则罔', '说乎', '君子乎', '乐乎'],
        explanation: '这句话出自《论语·学而》，意思是：孔子说："学习并且按时温习，不是很愉快吗？有志同道合的人从远方来，不是很快乐吗？人家不了解我，我却不恼怒，不是有才德的人吗？"' 
      },
      {
        id: 2,
        source: '《道德经》',
        content: [
          { type: 'text', text: '道可道，' },
          { type: 'blank', index: 0, correct: '非常道' },
          { type: 'text', text: '；名可名，' },
          { type: 'blank', index: 1, correct: '非常名' },
          { type: 'text', text: '。' }
        ],
        options: ['非常道', '非常名', '无名天地之始', '有名万物之母'],
        explanation: '这句话出自《道德经》第一章，意思是：可以用言语表达的道，不是永恒的道；可以用名称命名的名，不是永恒的名。' 
      },
      {
        id: 3,
        source: '《诗经》',
        content: [
          { type: 'text', text: '关关雎鸠，' },
          { type: 'blank', index: 0, correct: '在河之洲' },
          { type: 'text', text: '。窈窕淑女，' },
          { type: 'blank', index: 1, correct: '君子好逑' },
          { type: 'text', text: '。' }
        ],
        options: ['在河之洲', '君子好逑', '辗转反侧', '寤寐求之'],
        explanation: '这句话出自《诗经·关雎》，意思是：关关和鸣的雎鸠，栖息在河中的小洲。贤良美好的女子，是君子的佳偶。' 
      },
      {
        id: 4,
        source: '《大学》',
        content: [
          { type: 'text', text: '大学之道，在明明德，在亲民，' },
          { type: 'blank', index: 0, correct: '在止于至善' },
          { type: 'text', text: '。' }
        ],
        options: ['在止于至善', '在明明德', '在亲民', '在修身齐家'],
        explanation: '这句话出自《大学》开篇，意思是：大学的宗旨在于弘扬光明正大的品德，在于使人弃旧图新，在于使人达到最完善的境界。' 
      },
      {
        id: 5,
        source: '《中庸》',
        content: [
          { type: 'text', text: '天命之谓性，率性之谓道，' },
          { type: 'blank', index: 0, correct: '修道之谓教' },
          { type: 'text', text: '。' }
        ],
        options: ['修道之谓教', '率性之谓道', '天命之谓性', '道也者不可须臾离也'],
        explanation: '这句话出自《中庸》开篇，意思是：上天所赋予人的本性叫做性，遵循本性叫做道，修养道叫做教。' 
      }
    ],
    currentQuestionIndex: 0,
    selectedOptions: [],
    showAnswer: false,
    isCorrect: false
  },

  onLoad: function (options) {
    this.initQuestion();
  },

  initQuestion: function () {
    const currentQuestion = this.data.questions[this.data.currentQuestionIndex];
    const selectedOptions = new Array(currentQuestion.content.filter(item => item.type === 'blank').length).fill('');
    this.setData({
      selectedOptions: selectedOptions,
      showAnswer: false,
      isCorrect: false
    });
  },

  selectOption: function (e) {
    if (this.data.showAnswer) return;
    
    const optionIndex = e.currentTarget.dataset.index;
    const currentQuestion = this.data.questions[this.data.currentQuestionIndex];
    const blankIndex = this.data.selectedOptions.findIndex(option => option === '');
    
    if (blankIndex !== -1) {
      const selectedOptions = [...this.data.selectedOptions];
      selectedOptions[blankIndex] = currentQuestion.options[optionIndex];
      this.setData({ selectedOptions: selectedOptions });
    }
  },

  submitAnswer: function () {
    const currentQuestion = this.data.questions[this.data.currentQuestionIndex];
    const blanks = currentQuestion.content.filter(item => item.type === 'blank');
    let isCorrect = true;
    
    for (let i = 0; i < blanks.length; i++) {
      if (this.data.selectedOptions[i] !== blanks[i].correct) {
        isCorrect = false;
        break;
      }
    }
    
    this.setData({
      showAnswer: true,
      isCorrect: isCorrect
    });
  },

  nextQuestion: function () {
    if (this.data.currentQuestionIndex < this.data.questions.length - 1) {
      this.setData({
        currentQuestionIndex: this.data.currentQuestionIndex + 1
      });
      this.initQuestion();
    } else {
      wx.showToast({
        title: '练习完成！',
        icon: 'success'
      });
      setTimeout(() => {
        this.goBack();
      }, 1500);
    }
  },

  goBack: function () {
    wx.navigateBack();
  }
});