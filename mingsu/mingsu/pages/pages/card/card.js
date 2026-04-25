// mingsu/pages/card/card.js
Page({
  data: {
    cardTemplates: [
      {
        id: 1,
        background: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20paper%20card%20background%2C%20ink%20painting%20style%2C%20red%20and%20gold%20colors&image_size=square_hd',
        textColor: '#8B4513'
      },
      {
        id: 2,
        background: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20card%20background%2C%20ink%20painting%20style%2C%20blue%20and%20white%20colors&image_size=square_hd',
        textColor: '#2E8B57'
      },
      {
        id: 3,
        background: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20card%20background%2C%20ink%20painting%20style%2C%20purple%20and%20gold%20colors&image_size=square_hd',
        textColor: '#4169E1'
      }
    ],
    cardQuotes: [
      '清明时节雨纷纷，路上行人欲断魂',
      '爆竹声中一岁除，春风送暖入屠苏',
      '但愿人长久，千里共婵娟',
      '独在异乡为异客，每逢佳节倍思亲',
      '节分端午自谁言，万古传闻为屈原',
      '去年元夜时，花市灯如昼',
      '遥知兄弟登高处，遍插茱萸少一人',
      '律回岁晚冰霜少，春到人间草木知'
    ],
    currentCard: {
      background: '',
      quote: '',
      textColor: ''
    },
    isGenerating: false,
    generatedImage: null
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '民俗节气卡片' });
    this.generateCard();
  },

  generateCard() {
    this.setData({ isGenerating: true });

    // 随机选择模板和诗句
    const randomTemplate = this.data.cardTemplates[Math.floor(Math.random() * this.data.cardTemplates.length)];
    const randomQuote = this.data.cardQuotes[Math.floor(Math.random() * this.data.cardQuotes.length)];

    this.setData({
      currentCard: {
        background: randomTemplate.background,
        quote: randomQuote,
        textColor: randomTemplate.textColor
      },
      generatedImage: null,
      isGenerating: false
    });
  },

  async saveCard() {
    wx.showLoading({ title: '保存中...' });

    try {
      // 获取卡片区域的宽高
      const query = wx.createSelectorQuery();
      query.select('.card-container').boundingClientRect();
      query.exec(async (res) => {
        if (res[0]) {
          const { width, height } = res[0];

          // 使用canvas生成图片
          const canvas = wx.createCanvasContext('cardCanvas');

          // 绘制背景
          canvas.drawImage(this.data.currentCard.background, 0, 0, width, height);

          // 绘制诗句
          canvas.setFontSize(28);
          canvas.setFillStyle(this.data.currentCard.textColor);
          canvas.setTextAlign('center');
          canvas.setTextBaseline('middle');

          // 处理换行
          const lines = this.wrapText(this.data.currentCard.quote, 28, width - 80);
          const lineHeight = 40;
          const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

          lines.forEach((line, index) => {
            canvas.fillText(line, width / 2, startY + index * lineHeight);
          });

          // 绘制完成
          canvas.draw(false, async () => {
            // 导出图片
            wx.canvasToTempFilePath({
              canvasId: 'cardCanvas',
              success: (res) => {
                // 保存到相册
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: () => {
                    wx.hideLoading();
                    wx.showToast({ title: '保存成功', icon: 'success' });
                  },
                  fail: (err) => {
                    wx.hideLoading();
                    wx.showToast({ title: '保存失败，请重试', icon: 'none' });
                    console.error('保存图片失败:', err);
                  }
                });
              },
              fail: (err) => {
                wx.hideLoading();
                wx.showToast({ title: '生成图片失败', icon: 'none' });
                console.error('生成图片失败:', err);
              }
            });
          });
        } else {
          wx.hideLoading();
          wx.showToast({ title: '获取卡片信息失败', icon: 'none' });
        }
      });
    } catch (error) {
      wx.hideLoading();
      wx.showToast({ title: '保存失败，请重试', icon: 'none' });
      console.error('保存卡片失败:', error);
    }
  },

  // 文本换行处理
  wrapText(text, fontsize, maxWidth) {
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < text.length; i++) {
      currentLine += text[i];
      if (currentLine.length > 7) { // 简单的换行判断
        lines.push(currentLine);
        currentLine = '';
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · 民俗节气卡片',
      path: '/mingsu/pages/card/card'
    };
  }
});