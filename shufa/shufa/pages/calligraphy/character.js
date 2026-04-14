// shufa/shufa/pages/calligraphy/character.js
Page({
  data: {
    character: {
      id: 1,
      char: '蘭',
      strokeOrder: [
        { x1: 50, y1: 10, x2: 150, y2: 10 },   // 1 横
        { x1: 60, y1: 10, x2: 70, y2: 60 },    // 2 撇
        { x1: 140, y1: 10, x2: 130, y2: 60 },  // 3 撇
        { x1: 50, y1: 50, x2: 150, y2: 50 },   // 4 横
        { x1: 60, y1: 50, x2: 60, y2: 80 },    // 5 竖
        { x1: 140, y1: 50, x2: 140, y2: 80 },  // 6 竖
        { x1: 50, y1: 80, x2: 150, y2: 80 },   // 7 横
        { x1: 40, y1: 100, x2: 160, y2: 100 }, // 8 横
        { x1: 50, y1: 120, x2: 150, y2: 120 }, // 9 横
        { x1: 60, y1: 80, x2: 60, y2: 150 },   // 10 竖
        { x1: 140, y1: 80, x2: 140, y2: 150 }, // 11 竖
        { x1: 50, y1: 150, x2: 90, y2: 150 },  // 12 横折钩-横
        { x1: 90, y1: 150, x2: 90, y2: 175 },  // 12 折
        { x1: 90, y1: 175, x2: 75, y2: 165 },  // 12 钩
        { x1: 40, y1: 175, x2: 160, y2: 175 }, // 13 横
        { x1: 40, y1: 200, x2: 160, y2: 200 }, // 14 横
        { x1: 40, y1: 225, x2: 160, y2: 225 }, // 15 横
        { x1: 100, y1: 175, x2: 100, y2: 250 },// 16 竖
        { x1: 50, y1: 250, x2: 90, y2: 250 },  // 17 横折-横
        { x1: 90, y1: 250, x2: 90, y2: 275 },  // 17 折
        { x1: 150, y1: 240, x2: 165, y2: 255 },// 18 点
        { x1: 50, y1: 275, x2: 80, y2: 305 },  // 19 撇
        { x1: 60, y1: 295, x2: 140, y2: 295 }, // 20 横
        { x1: 100, y1: 275, x2: 100, y2: 310 },// 21 竖
        { x1: 155, y1: 275, x2: 125, y2: 305 },// 22 撇
        { x1: 135, y1: 295, x2: 155, y2: 310 },// 23 点
        { x1: 100, y1: 100, x2: 100, y2: 150 } // 24 中竖
      ],
      fontStyle: '行书',
      author: '王羲之',
      copybook: '兰亭序',
      pronunciation: 'lán',
      meaning: '兰花，一种香草',
      image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7065908c8ee948baf94da92d8a23159b.jpg?sign=fae9cc6170a0966ad9e67cb9104a82d6&t=1776081395'
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
    this.calculateStrokeInfo();
  },

  calculateStrokeInfo() {
    const strokes = this.data.character.strokeOrder.map(stroke => {
      const dx = stroke.x2 - stroke.x1;
      const dy = stroke.y2 - stroke.y1;
      return {
        ...stroke,
        length: Math.sqrt(dx * dx + dy * dy) * 1.5,
        rotation: Math.atan2(dy, dx) * 180 / Math.PI
      };
    });
    this.setData({
      strokeOrder: strokes
    });
  },

  startStrokeOrder() {
    wx.showToast({ title: '开始演示笔顺', icon: 'none' });
    this.setData({ currentStroke: 0 });
    setTimeout(() => {
      this.animateStroke(0);
    }, 100);
  },

  animateStroke(index) {
    if (index >= this.data.character.strokeOrder.length) {
      return;
    }
    this.setData({ currentStroke: index + 1 });
    setTimeout(() => {
      this.animateStroke(index + 1);
    }, 800);
  },

  resetStroke() {
    this.setData({ currentStroke: 0 });
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
    };
  }
});
