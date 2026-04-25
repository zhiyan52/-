// 临帖页面逻辑
Page({
  data: {
    // 选中的书体
    selectedFont: 'regular',
    // 选中的字帖
    selectedCopybook: '1',
    // 字帖数据
    copybooks: [
      {
        id: '1',
        name: '兰亭序',
        author: '王羲之',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/lintie/lantingxu.jpg'
      },
      {
        id: '2',
        name: '多宝塔碑',
        author: '颜真卿',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/lintie/duobaota.jpg'
      },
      {
        id: '3',
        name: '九成宫醴泉铭',
        author: '欧阳询',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/lintie/jiuchenggong.jpg'
      },
      {
        id: '4',
        name: '玄秘塔碑',
        author: '柳公权',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/lintie/xuanmita.jpg'
      }
    ],
    // 当前选中的字帖
    currentCopybook: null,
    // 生成的图片
    generatedImage: '',
    // 画布相关
    canvasContext: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0
  },

  onLoad() {
    // 初始化画布
    this.initCanvas();
    // 设置默认字帖
    this.setCurrentCopybook();
  },

  // 初始化画布
  initCanvas() {
    const ctx = wx.createCanvasContext('practiceCanvas', this);
    ctx.setLineWidth(4);
    ctx.setStrokeStyle('#000000');
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
    this.setData({ canvasContext: ctx });
  },

  // 设置当前字帖
  setCurrentCopybook() {
    const { selectedCopybook, copybooks } = this.data;
    const currentCopybook = copybooks.find(item => item.id === selectedCopybook);
    this.setData({ currentCopybook });
  },

  // 选择书体
  selectFont(e) {
    const font = e.currentTarget.dataset.font;
    this.setData({ selectedFont: font });
  },

  // 选择字帖
  selectCopybook(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ selectedCopybook: id });
    this.setCurrentCopybook();
  },

  // 开始绘制
  startDrawing(e) {
    const { canvasContext } = this.data;
    const x = e.touches[0].x;
    const y = e.touches[0].y;
    
    this.setData({
      isDrawing: true,
      lastX: x,
      lastY: y
    });
    
    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
  },

  // 绘制中
  draw(e) {
    const { isDrawing, lastX, lastY, canvasContext } = this.data;
    if (!isDrawing) return;
    
    const x = e.touches[0].x;
    const y = e.touches[0].y;
    
    canvasContext.lineTo(x, y);
    canvasContext.stroke();
    canvasContext.draw(true);
    
    this.setData({
      lastX: x,
      lastY: y
    });
  },

  // 结束绘制
  endDrawing() {
    this.setData({ isDrawing: false });
  },

  // 清空画布
  clearCanvas() {
    const { canvasContext } = this.data;
    canvasContext.clearRect(0, 0, 300, 300);
    canvasContext.draw(true);
  },

  // 生成图片
  async generateImage() {
    try {
      wx.showLoading({ title: '生成图片中...' });
      
      // 将画布转换为图片
      const tempFilePath = await this.canvasToImage();
      
      // 这里可以添加AI处理逻辑，比如风格迁移等
      // 暂时直接使用原始图片
      
      this.setData({ generatedImage: tempFilePath });
      wx.hideLoading();
      wx.showToast({ title: '图片生成成功' });
    } catch (error) {
      console.error('生成图片失败:', error);
      wx.hideLoading();
      wx.showToast({ title: '生成图片失败', icon: 'none' });
    }
  },

  // 画布转图片
  canvasToImage() {
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        canvasId: 'practiceCanvas',
        success: (res) => {
          resolve(res.tempFilePath);
        },
        fail: (error) => {
          reject(error);
        }
      }, this);
    });
  },

  // 保存图片
  saveImage() {
    const { generatedImage } = this.data;
    if (!generatedImage) {
      wx.showToast({ title: '请先生成图片', icon: 'none' });
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
  }
});