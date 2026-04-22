Page({
  data: {
    patternId: '',
    patternName: '',
    foldType: '',
    foldName: '',
    complexity: 1,
    currentStep: 0,
    totalSteps: 0,
    animating: false,
    canSkip: false
  },

  foldSteps: {
    'none': [{ desc: '无需折叠，直接在完整纸上剪', img: 'fold-none.png' }],
    'half': [
      { desc: '取正方形纸，对边重合', img: 'fold-1.png' },
      { desc: '压平折痕，形成长方形', img: 'fold-2.png' }
    ],
    'quarter': [
      { desc: '正方形纸，上下对边折', img: 'fold-1.png' },
      { desc: '再左右对边折', img: 'fold-2.png' },
      { desc: '压平，形成小正方形', img: 'fold-3.png' }
    ],
    'triangle': [
      { desc: '正方形纸对角折', img: 'fold-1.png' },
      { desc: '再对折成三角形', img: 'fold-2.png' },
      { desc: '三等分折叠', img: 'fold-3.png' }
    ],
    'pentagon': [
      { desc: '正方形纸对折', img: 'fold-1.png' },
      { desc: '按特定角度斜折', img: 'fold-2.png' },
      { desc: '再反向折叠', img: 'fold-3.png' },
      { desc: '最终五层重叠', img: 'fold-4.png' }
    ]
  },

  onLoad(options) {
    const { pattern, fold, complexity } = options;
    const steps = this.foldSteps[fold] || this.foldSteps['none'];

    this.setData({
      patternId: pattern,
      foldType: fold,
      complexity: parseInt(complexity),
      totalSteps: steps.length,
      canSkip: wx.getStorageSync(`foldSkip_${fold}`)
    });

    // 获取图案名称
    const { PATTERN_LIBRARY } = require('../../utils/paper-cut-data.js');
    this.setData({
      patternName: PATTERN_LIBRARY[pattern] && PATTERN_LIBRARY[pattern].name ? PATTERN_LIBRARY[pattern].name : '团花',
      foldName: this.getFoldName(fold)
    });

    this.loadStep(0);
  },

  getFoldName(fold) {
    const names = {
      'none': '不折叠', 'half': '对边折', 'quarter': '四折',
      'diagonal': '对角折', 'triangle': '三角折', 'pentagon': '五角折'
    };
    return names[fold] || '不折叠';
  },

  loadStep(index) {
    const steps = this.foldSteps[this.data.foldType];
    const step = steps[index];

    this.setData({
      currentStep: index,
      stepDesc: step.desc,
      stepImg: step.img,
      animating: true
    });

    setTimeout(() => this.setData({ animating: false }), 500);
  },

  nextStep() {
    if (this.data.currentStep < this.data.totalSteps - 1) {
      this.loadStep(this.data.currentStep + 1);
    } else {
      this.goToCut();
    }
  },

  prevStep() {
    if (this.data.currentStep > 0) {
      this.loadStep(this.data.currentStep - 1);
    }
  },

  skipTutorial() {
    wx.setStorageSync(`foldSkip_${this.data.foldType}`, true);
    this.goToCut();
  },

  goToCut() {
    wx.redirectTo({
      url: `/mingsu/jianzhi/paper-cut/cut?pattern=${this.data.patternId}&foldType=${this.data.foldType}&complexity=${this.data.complexity}`
    });
  }
});