// 临帖页面逻辑
Page({
  data: {
    // 自定义文字
    customText: '',
    // 选中的字体
    selectedFont: 'regular',
    // 每行字数
    selectedLayout: '2',
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

  // 选择布局
  selectLayout(e) {
    const layout = e.currentTarget.dataset.layout;
    this.setData({ selectedLayout: layout });
    // 更新预览
    this.updatePreview();
  },

  // 更新预览
  updatePreview() {
    const { customText, selectedFont, selectedLayout, previewContext } = this.data;
    if (!previewContext) return;

    // 先填充白色背景
    previewContext.setFillStyle('#ffffff');
    previewContext.fillRect(0, 0, 300, 400);

    if (!customText) {
      // 没有文字时直接绘制空白背景
      previewContext.draw();
      return;
    }

    // 每行字数
    const charsPerRow = parseInt(selectedLayout);

    // 计算总字数和行数
    const totalChars = customText.length;
    const totalRows = Math.ceil(totalChars / charsPerRow);

    // 画布尺寸
    const canvasWidth = 300;
    const canvasHeight = 400;

    // 计算每个田字格的尺寸
    const padding = 20; // 边距
    const gap = 10; // 田字格之间的间距
    const availableWidth = canvasWidth - 2 * padding;
    const cellSize = Math.floor((availableWidth - (charsPerRow - 1) * gap) / charsPerRow);

    // 计算总宽度和起始X位置（居中）
    const totalWidth = charsPerRow * cellSize + (charsPerRow - 1) * gap;
    const startX = (canvasWidth - totalWidth) / 2;

    // 计算最大行数（确保田字格均匀分布）
    const maxRows = Math.min(totalRows, 8); // 限制最大行数

    // 计算总高度和起始Y位置（居中）
    const totalHeight = maxRows * cellSize + (maxRows - 1) * gap;
    const startY = (canvasHeight - totalHeight) / 2;

    // 绘制田字格和文字
    let index = 0;
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < charsPerRow; col++) {
        const x = startX + col * (cellSize + gap);
        const y = startY + row * (cellSize + gap);

        // 绘制田字格
        this.drawTianZiGe(previewContext, x, y, cellSize);

        // 绘制文字（如果有）
        if (index < totalChars) {
          this.drawCharacter(previewContext, customText[index], x, y, cellSize, selectedFont);
          index++;
        }
      }
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
    ctx.setFontSize(size * 0.6);
    ctx.setFillStyle('#000');
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(char, x + size / 2, y + size / 2);
  },

  // 清空文字
  clearCanvas() {
    this.setData({ customText: '' });
    this.updatePreview();
  },

  // 生成字帖
  generateImage() {
    const { customText, selectedLayout, selectedFont } = this.data;
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

    // 每行字数
    const charsPerRow = parseInt(selectedLayout);

    // 计算总字数和行数
    const totalChars = customText.length;
    const totalRows = Math.ceil(totalChars / charsPerRow);

    // 画布尺寸
    const canvasWidth = 750;
    const canvasHeight = 1000;

    // 计算每个田字格的尺寸
    const padding = 50; // 边距
    const gap = 20; // 田字格之间的间距
    const availableWidth = canvasWidth - 2 * padding;
    const cellSize = Math.floor((availableWidth - (charsPerRow - 1) * gap) / charsPerRow);

    // 计算总宽度和起始X位置（居中）
    const totalWidth = charsPerRow * cellSize + (charsPerRow - 1) * gap;
    const startX = (canvasWidth - totalWidth) / 2;

    // 计算最大行数（确保田字格均匀分布）
    const maxRows = Math.min(totalRows, 8); // 限制最大行数

    // 计算总高度和起始Y位置（居中）
    const totalHeight = maxRows * cellSize + (maxRows - 1) * gap;
    const startY = (canvasHeight - totalHeight) / 2;

    // 绘制田字格和文字
    let index = 0;
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < charsPerRow; col++) {
        const x = startX + col * (cellSize + gap);
        const y = startY + row * (cellSize + gap);

        // 绘制田字格
        this.drawTianZiGe(ctx, x, y, cellSize);

        // 绘制文字（如果有）
        if (index < totalChars) {
          this.drawCharacter(ctx, customText[index], x, y, cellSize, selectedFont);
          index++;
        }
      }
    }

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