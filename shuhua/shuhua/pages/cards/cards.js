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
    // 背景图片（云存储路径）
    backgrounds: [
      'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/13772bd1a1123fa20a8d1c0d634a37ef.jpg',
      'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/604559700bde2b88bb89071100cca5c0.jpg',
      'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/56d50d43ad4c0bfe9615f7d61bc1c12f.jpg'
    ],
    // 背景图片临时URL
    backgroundUrls: [],
    currentQuote: null,
    cardBackground: '',
    canvasWidth: 600,
    canvasHeight: 400
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '书画佳句卡片' });
    // 初始化云开发并加载图片
    this.initCloudAndLoadImages();
  },

  // 初始化云开发并加载图片
  initCloudAndLoadImages() {
    if (!wx.cloud) {
      console.error('云开发未初始化');
      // 如果云开发不可用，使用默认图片
      this.generateCard();
      return;
    }

    wx.cloud.init({
      env: 'cloud1-8glc9jqob91870fc',
      traceUser: true
    });

    // 获取背景图片临时URL
    wx.cloud.getTempFileURL({
      fileList: this.data.backgrounds,
      success: (res) => {
        const tempUrls = res.fileList.map(file => file.tempFileURL || '');
        this.setData({ backgroundUrls: tempUrls });
        this.generateCard();
      },
      fail: (err) => {
        console.error('获取背景图片失败:', err);
        // 如果获取失败，使用默认图片
        this.generateCard();
      }
    });
  },

  // 随机生成卡片
  generateCard() {
    const randomQuote = this.data.quotes[Math.floor(Math.random() * this.data.quotes.length)];
    
    // 使用临时URL，如果没有则使用原始路径
    const backgrounds = this.data.backgroundUrls.length > 0 ? this.data.backgroundUrls : this.data.backgrounds;
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    this.setData({
      currentQuote: randomQuote,
      cardBackground: randomBackground
    });
  },

  // 选择佳句
  selectQuote(e) {
    const index = e.currentTarget.dataset.index;
    const quote = this.data.quotes[index];
    
    // 使用临时URL，如果没有则使用原始路径
    const backgrounds = this.data.backgroundUrls.length > 0 ? this.data.backgroundUrls : this.data.backgrounds;
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

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