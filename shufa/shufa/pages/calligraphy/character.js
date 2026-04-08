// shufa/shufa/pages/calligraphy/character.js
Page({
  data: {
    character: {
      id: 1,
      char: '蘭',
      strokeOrder: [
        { x1: 50, y1: 20, x2: 150, y2: 20 },
        { x1: 100, y1: 20, x2: 100, y2: 180 },
        { x1: 50, y1: 60, x2: 150, y2: 60 },
        { x1: 50, y1: 100, x2: 150, y2: 100 },
        { x1: 50, y1: 140, x2: 150, y2: 140 },
        { x1: 50, y1: 180, x2: 150, y2: 180 }
      ],
      fontStyle: '行书',
      author: '王羲之',
      copybook: '兰亭序',
      pronunciation: 'lán',
      meaning: '兰花，一种香草',
      image: '/images/blank.png'
    },
    currentStroke: 0,
    showStrokeOrder: true,
    gridType: 'mizi', // 米字格
    scale: 1,
    isDrawing: false,
    drawingPath: [],
    showEvaluation: false,
    evaluationResult: {
      score: 85,
      suggestions: ['结构整体不错', '笔画可以更流畅', '注意起笔和收笔']
    }
  },

  onLoad(options) {
    const id = options.id || 1;
    this.loadCharacterData(id);
  },

  loadCharacterData(id) {
    console.log('加载单字数据:', id);
  },

  startStrokeOrder() {
    this.setData({ currentStroke: 0, showStrokeOrder: true });
    this.animateStroke();
  },

  animateStroke() {
    if (this.data.currentStroke < this.data.character.strokeOrder.length) {
      setTimeout(() => {
        this.setData({ currentStroke: this.data.currentStroke + 1 });
        this.animateStroke();
      }, 1000);
    }
  },

  toggleGrid(e) {
    const gridType = e.currentTarget.dataset.grid;
    this.setData({ gridType });
  },

  onTouchStart(e) {
    this.setData({ isDrawing: true, drawingPath: [e.touches[0]] });
  },

  onTouchMove(e) {
    if (this.data.isDrawing) {
      const newPath = [...this.data.drawingPath, e.touches[0]];
      this.setData({ drawingPath: newPath });
    }
  },

  onTouchEnd() {
    this.setData({ isDrawing: false });
  },

  clearDrawing() {
    this.setData({ drawingPath: [] });
  },

  startEvaluation() {
    // 模拟AI评测
    setTimeout(() => {
      this.setData({ showEvaluation: true });
    }, 1000);
  },

  closeEvaluation() {
    this.setData({ showEvaluation: false });
  },

  previousCharacter() {
    wx.showToast({ title: '上一字', icon: 'none' });
  },

  nextCharacter() {
    wx.showToast({ title: '下一字', icon: 'none' });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: `单字精临：${this.data.character.char}`,
      path: `/shufa/shufa/pages/calligraphy/character?id=${this.data.character.id}`,
      imageUrl: this.data.character.image
    };
  }
});
