const { engine } = require('./cut-engine.js');
const { PATTERN_LIBRARY } = require('../../utils/paper-cut-data.js');

Page({
  data: {
    pattern: null,
    foldType: '',
    foldName: '',
    complexity: 1,
    canvasWidth: 300,
    canvasHeight: 300,
    currentCutIndex: 1,
    totalCuts: 1,
    status: 'ready', // ready, cutting, checking
    showGuide: true,
    tipText: '按照引导线开始切割',
    tipShow: true,
    currentAccuracy: null,
    userPath: [],
    pathHistory: [],
    soundEnabled: true
  },

  canvas: null,
  ctx: null,
  animationFrame: null,

  onLoad(options) {
    const { pattern, foldType, complexity } = options;

    this.setData({
      pattern: PATTERN_LIBRARY[pattern] || PATTERN_LIBRARY['flower'],
      foldType: foldType,
      complexity: parseInt(complexity),
      foldName: this.getFoldName(foldType)
    });

    this.initCanvas();
  },

  onReady() {
    this.drawInitial();
  },

  onUnload() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  },

  getFoldName(foldType) {
    const names = {
      'none': '不折叠', 'half': '对边折', 'quarter': '四折',
      'diagonal': '对角折', 'triangle': '三角折', 'pentagon': '五角折'
    };
    return names[foldType] || '不折叠';
  },

  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#cutCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return;

        this.canvas = res[0].node;
        this.ctx = this.canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;

        this.canvas.width = 300 * dpr;
        this.canvas.height = 300 * dpr;
        this.ctx.scale(dpr, dpr);

        this.drawInitial();
      });
  },

  drawInitial() {
    if (!this.ctx) return;

    const { pattern, foldType } = this.data;
    const adaptedPattern = engine.applyFold(pattern, foldType);

    // 清除画布
    this.ctx.clearRect(0, 0, 300, 300);

    // 绘制扇形区域
    this.drawSector(adaptedPattern.sectorPath);

    // 绘制引导线
    if (this.data.showGuide) {
      this.drawGuideLines(adaptedPattern.adaptedPattern);
    }
  },

  drawSector(path) {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      this.ctx.lineTo(path[i].x, path[i].y);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(245, 240, 232, 0.9)';
    this.ctx.fill();
    this.ctx.strokeStyle = '#d4a76a';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.restore();
  },

  drawGuideLines(pattern) {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(231, 76, 60, 0.5)';
    this.ctx.setLineDash([5, 3]);
    this.ctx.lineWidth = 2;

    pattern.forEach(path => {
      if (path.points.length < 2) return;

      this.ctx.beginPath();
      this.ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        this.ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      this.ctx.stroke();
    });

    this.ctx.restore();
  },

  onTouchStart(e) {
    if (this.data.status !== 'ready') return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // 记录路径历史
    this.setData({
      status: 'cutting',
      userPath: [{ x, y }],
      tipShow: false,
      pathHistory: [...this.data.pathHistory, JSON.parse(JSON.stringify(this.data.userPath))]
    });

    // 播放切割开始音效
    if (this.data.soundEnabled) {
      this.playSound('start');
    }
  },

  onTouchMove(e) {
    if (this.data.status !== 'cutting') return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const userPath = [...this.data.userPath, { x, y }];
    this.setData({ userPath });
    this.drawUserPath(userPath);
  },

  onTouchEnd(e) {
    if (this.data.status !== 'cutting') return;

    this.setData({ status: 'checking' });
    this.checkCutAccuracy();
  },

  drawUserPath(path) {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.strokeStyle = '#e74c3c';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      this.ctx.lineTo(path[i].x, path[i].y);
    }
    this.ctx.stroke();
    this.ctx.restore();
  },

  checkCutAccuracy() {
    const { userPath, pattern, foldType } = this.data;
    const adaptedPattern = engine.applyFold(pattern, foldType);

    // 简化：只检查第一条路径
    const targetPath = adaptedPattern.adaptedPattern[0] && adaptedPattern.adaptedPattern[0].points ? adaptedPattern.adaptedPattern[0].points : [];
    const result = engine.checkCutAccuracy(userPath, targetPath);

    setTimeout(() => {
      this.setData({
        status: 'ready',
        currentAccuracy: result.score
      });

      if (result.score >= 70) {
        this.goToResult(result.score);
      } else {
        this.showTip('切割不够准确，再试一次吧！');
        this.drawInitial();
      }
    }, 1000);
  },

  goToResult(score) {
    const { pattern, foldType, userPath } = this.data;
    const adaptedPattern = engine.applyFold(pattern, foldType);
    const unfoldData = engine.calculateUnfold([userPath], foldType, adaptedPattern.symmetryCount);

    wx.navigateTo({
      url: `/mingsu/jianzhi/paper-cut/result?pattern=${encodeURIComponent(JSON.stringify(pattern))}&score=${score}&stars=${Math.ceil(score / 33)}&unfold=${encodeURIComponent(JSON.stringify(unfoldData))}&foldType=${foldType}`
    });
  },

  showTip(text) {
    this.setData({ tipText: text, tipShow: true });
  },

  onTipHide() {
    this.setData({ tipShow: false });
  },

  toggleGuide() {
    this.setData({ showGuide: !this.data.showGuide });
    this.drawInitial();
  },

  retryCurrent() {
    this.setData({ userPath: [], pathHistory: [] });
    this.drawInitial();
  },

  undo() {
    if (this.data.pathHistory.length > 0) {
      const pathHistory = [...this.data.pathHistory];
      pathHistory.pop();
      const lastPath = pathHistory.length > 0 ? pathHistory[pathHistory.length - 1] : [];

      this.setData({
        userPath: lastPath,
        pathHistory
      });
      this.drawInitial();
      this.drawUserPath(lastPath);
    }
  },

  reset() {
    this.setData({
      userPath: [],
      pathHistory: [],
      status: 'ready',
      tipShow: true
    });
    this.drawInitial();
  },

  playSound(type) {
    try {
      const innerAudioContext = wx.createInnerAudioContext();
      innerAudioContext.volume = 0.3;

      switch (type) {
        case 'start':
          innerAudioContext.src = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_speech?text=开始切割&voice_type=zh-CN';
          break;
        case 'success':
          innerAudioContext.src = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_speech?text=切割成功&voice_type=zh-CN';
          break;
        case 'error':
          innerAudioContext.src = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_speech?text=切割失败&voice_type=zh-CN';
          break;
      }

      innerAudioContext.play();
      innerAudioContext.onEnded(() => {
        innerAudioContext.destroy();
      });
    } catch (err) {
      console.error('播放音效失败:', err);
    }
  },

  toggleSound() {
    this.setData({ soundEnabled: !this.data.soundEnabled });
  }
});