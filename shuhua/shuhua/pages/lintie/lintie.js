// 临帖页面逻辑
Page({
  data: {
    // 自定义文字
    customText: '',
    // 选中的字体
    selectedFont: 'regular',
    // 生成的图片
    generatedImage: '',
    // 画布相关
    previewContext: null
  },

  onLoad() {
    // 初始化预览画布
    this.initPreviewCanvas();
  },

  // 初始化预览画布
  initPreviewCanvas() {
    const ctx = wx.createCanvasContext('previewCanvas', this);

    // 设置白色背景
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 300, 400);
    ctx.draw();

    this.setData({ previewContext: ctx });
  },

  // 文字输入事件
  onTextInput(e) {
    this.setData({ customText: e.detail.value });
    // 更新预览
    this.updatePreview();
  },

  // 选择字体
  selectFont(e) {
    const font = e.currentTarget.dataset.font;
    this.setData({ selectedFont: font });
    // 更新预览
    this.updatePreview();
  },



  // 更新预览
  updatePreview() {
    const { customText, selectedFont, previewContext } = this.data;
    if (!previewContext) return;

    // 先填充白色背景
    previewContext.setFillStyle('#ffffff');
    previewContext.fillRect(0, 0, 300, 400);

    // 画布尺寸
    const canvasWidth = 300;
    const canvasHeight = 400;

    // 计算田字格尺寸
    const maxCellSize = 150; // 最大田字格尺寸
    const cellSize = Math.min(maxCellSize, Math.min(canvasWidth * 0.8, canvasHeight * 0.8));

    // 计算起始位置（居中）
    const startX = (canvasWidth - cellSize) / 2;
    const startY = (canvasHeight - cellSize) / 2;

    // 绘制田字格
    this.drawTianZiGe(previewContext, startX, startY, cellSize);

    // 绘制文字（如果有）
    if (customText) {
      this.drawCharacter(previewContext, customText[0], startX, startY, cellSize, selectedFont);
    }

    previewContext.draw();
  },

  // 绘制田字格
  drawTianZiGe(ctx, x, y, size) {
    // 外框
    ctx.setStrokeStyle('#000');
    ctx.setLineWidth(1);
    ctx.strokeRect(x, y, size, size);

    // 十字线
    ctx.setStrokeStyle('#999');
    ctx.setLineWidth(0.5);
    // 水平线
    ctx.beginPath();
    ctx.moveTo(x, y + size / 2);
    ctx.lineTo(x + size, y + size / 2);
    ctx.stroke();
    // 垂直线
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y);
    ctx.lineTo(x + size / 2, y + size);
    ctx.stroke();
  },

  // 绘制文字
  drawCharacter(ctx, char, x, y, size, font) {
    // 计算合适的字体大小，确保文字在田字格内
    const fontSize = size * 0.5;
    ctx.setFontSize(fontSize);
    ctx.setFillStyle('#000');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');

    // 绘制文字，确保在田字格中心
    ctx.fillText(char, x + size / 2, y + size / 2);
  },

  // 清空文字
  clearCanvas() {
    this.setData({ customText: '' });
    this.updatePreview();
  },

  // 生成字帖
  generateImage() {
    const { customText, selectedFont } = this.data;
    if (!customText) {
      wx.showToast({ title: '请输入文字', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '生成字帖中...' });

    // 创建生成用的画布
    const ctx = wx.createCanvasContext('practiceCanvas', this);

    // 设置背景为白色
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 750, 1000);

    // 画布尺寸
    const canvasWidth = 750;
    const canvasHeight = 1000;

    // 计算田字格尺寸
    const maxCellSize = 300; // 最大田字格尺寸
    const cellSize = Math.min(maxCellSize, Math.min(canvasWidth * 0.8, canvasHeight * 0.8));

    // 计算起始位置（居中）
    const startX = (canvasWidth - cellSize) / 2;
    const startY = (canvasHeight - cellSize) / 2;

    // 绘制田字格
    this.drawTianZiGe(ctx, startX, startY, cellSize);

    // 绘制文字
    this.drawCharacter(ctx, customText[0], startX, startY, cellSize, selectedFont);

    // 绘制完成
    ctx.draw();

    // 延迟等待绘制完成
    setTimeout(() => {
      // 将画布转换为图片
      wx.canvasToTempFilePath({
        canvasId: 'practiceCanvas',
        success: (res) => {
          this.setData({ generatedImage: res.tempFilePath });
          wx.hideLoading();
          wx.showToast({ title: '字帖生成成功' });
        },
        fail: (error) => {
          console.error('生成字帖失败:', error);
          wx.hideLoading();
          wx.showToast({ title: '生成字帖失败', icon: 'none' });
        }
      }, this);
    }, 500);
  },

  // 画布转图片
  canvasToImage(canvasId) {
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        canvasId: canvasId,
        success: (res) => {
          resolve(res.tempFilePath);
        },
        fail: (error) => {
          reject(error);
        }
      }, this);
    });
  },

  // 保存到相册
  saveToAlbum() {
    const { generatedImage } = this.data;
    if (!generatedImage) {
      wx.showToast({ title: '请先生成字帖', icon: 'none' });
      return;
    }

    wx.saveImageToPhotosAlbum({
      filePath: generatedImage,
      success: () => {
        wx.showToast({ title: '保存成功' });
      },
      fail: (error) => {
        console.error('保存图片失败:', error);
        wx.showToast({ title: '保存失败', icon: 'none' });
      }
    });
  },

  // 保存图片（兼容旧方法）
  saveImage() {
    this.saveToAlbum();
  }
});