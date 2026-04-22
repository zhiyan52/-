// 书画佳句卡片生成页面逻辑
Page({
  data: {
    // 书画佳句数据
    quotes: [
      { text: '笔落惊风雨，诗成泣鬼神', author: '杜甫' },
      { text: '远看山有色，近听水无声', author: '王维' },
      { text: '书到用时方恨少，事非经过不知难', author: '陆游' },
      { text: '画中有诗，诗中有画', author: '苏轼' },
      { text: '胸有成竹，下笔如有神', author: '文同' },
      { text: '书法者，心法也', author: '王羲之' },
      { text: '画贵神似，不贵形似', author: '齐白石' },
      { text: '书为心画，画为心声', author: '扬雄' },
      { text: '意在笔先，神在笔后', author: '张彦远' },
      { text: '书画同源，心手相应', author: '赵孟頫' }
    ],
    // 背景图片
    backgrounds: [
      'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/bg1.jpg',
      'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/bg2.jpg',
      'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/bg3.jpg'
    ],
    currentQuote: null,
    cardBackground: '',
    canvasWidth: 600,
    canvasHeight: 400
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '书画佳句卡片' });
    this.generateCard();
  },

  // 随机生成卡片
  generateCard() {
    const randomQuote = this.data.quotes[Math.floor(Math.random() * this.data.quotes.length)];
    const randomBackground = this.data.backgrounds[Math.floor(Math.random() * this.data.backgrounds.length)];
    
    this.setData({
      currentQuote: randomQuote,
      cardBackground: randomBackground
    });
  },

  // 选择佳句
  selectQuote(e) {
    const index = e.currentTarget.dataset.index;
    const quote = this.data.quotes[index];
    const randomBackground = this.data.backgrounds[Math.floor(Math.random() * this.data.backgrounds.length)];
    
    this.setData({
      currentQuote: quote,
      cardBackground: randomBackground
    });
  },

  // 保存卡片
  saveCard() {
    wx.showLoading({ title: '保存中...' });
    
    // 创建画布
    const canvas = wx.createCanvasContext('cardCanvas');
    
    // 绘制背景
    const image = wx.createImage();
    image.src = this.data.cardBackground;
    
    image.onload = () => {
      // 绘制背景
      canvas.drawImage(image, 0, 0, this.data.canvasWidth, this.data.canvasHeight);
      
      // 添加半透明遮罩
      canvas.setFillStyle('rgba(0, 0, 0, 0.3)');
      canvas.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
      
      // 绘制文字
      canvas.setFillStyle('#ffffff');
      canvas.setFontSize(32);
      canvas.setTextAlign('center');
      canvas.setTextBaseline('middle');
      
      // 绘制佳句
      const lines = this.wrapText(this.data.currentQuote.text, 32, this.data.canvasWidth - 80);
      const startY = this.data.canvasHeight / 2 - (lines.length - 1) * 20;
      
      lines.forEach((line, i) => {
        canvas.fillText(line, this.data.canvasWidth / 2, startY + i * 40);
      });
      
      // 绘制作者
      canvas.setFontSize(24);
      canvas.fillText(this.data.currentQuote.author, this.data.canvasWidth / 2, startY + lines.length * 40 + 30);
      
      // 绘制完成
      canvas.draw(false, () => {
        // 保存图片
        wx.canvasToTempFilePath({
          canvasId: 'cardCanvas',
          success: (res) => {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                wx.showToast({ title: '保存成功', icon: 'success' });
              },
              fail: (err) => {
                console.error('保存图片失败：', err);
                wx.showToast({ title: '保存失败，请重试', icon: 'none' });
              }
            });
          },
          fail: (err) => {
            console.error('生成图片失败：', err);
            wx.showToast({ title: '生成失败，请重试', icon: 'none' });
          },
          complete: () => {
            wx.hideLoading();
          }
        });
      });
    };
  },

  // 文字换行
  wrapText(text, fontsize, maxWidth) {
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < text.length; i++) {
      currentLine += text[i];
      const width = this.measureText(currentLine, fontsize);
      
      if (width > maxWidth) {
        lines.push(currentLine.substring(0, currentLine.length - 1));
        currentLine = text[i];
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  },

  // 测量文字宽度
  measureText(text, fontsize) {
    const canvas = wx.createCanvasContext('tempCanvas');
    canvas.setFontSize(fontsize);
    return canvas.measureText(text).width;
  }
});