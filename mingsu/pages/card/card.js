// mingsu/pages/card/card.js
Page({
  data: {
    templates: [
      {
        id: 'spring',
        name: '春节模板',
        preview: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/b80e6e778f86f666dc015dd6b0e8c172.jpg'
      },
      {
        id: 'mid-autumn',
        name: '中秋模板',
        preview: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/f5076cee18260215e1bae0f20cdd7d05.jpg'
      },
      {
        id: 'qingming',
        name: '清明模板',
        preview: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/652a4820d90e38b53aeabacdd41c2eaf.jpg'
      },
      {
        id: 'dragon-boat',
        name: '端午模板',
        preview: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/3c24d8c95f056a32dfabac0d8ae44b95.jpg'
      }
    ],
    themes: ['春节', '中秋', '清明', '端午', '重阳', '元宵'],
    selectedTemplate: null,
    themeIndex: 0,
    cardTitle: '',
    cardContent: '',
    cardPreview: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '卡片生成' });
  },

  // 选择模板
  selectTemplate(e) {
    const template = e.currentTarget.dataset.template;
    this.setData({ selectedTemplate: template });
  },

  // 绑定标题输入
  bindTitleInput(e) {
    this.setData({ cardTitle: e.detail.value });
  },

  // 绑定内容输入
  bindContentInput(e) {
    this.setData({ cardContent: e.detail.value });
  },

  // 绑定主题选择
  bindThemeChange(e) {
    this.setData({ themeIndex: e.detail.value });
  },

  // 生成卡片
  generateCard() {
    if (!this.data.selectedTemplate || !this.data.cardTitle || !this.data.cardContent) {
      wx.showToast({
        title: '请选择模板并填写内容',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({ title: '生成卡片中...' });

    // 模拟生成卡片的延迟
    setTimeout(() => {
      const { cardTitle, cardContent, themes, themeIndex } = this.data;
      const theme = themes[themeIndex];

      // 生成卡片预览图（模拟）
      const cardPreview = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`${theme} ${cardTitle} ${cardContent} Chinese traditional card design`)}&image_size=square_hd`;

      this.setData({ cardPreview });
      wx.hideLoading();
      wx.showToast({
        title: '卡片生成成功',
        icon: 'success'
      });
    }, 2000);
  },

  // 保存卡片到相册
  saveCard() {
    if (!this.data.cardPreview) {
      return;
    }

    wx.showLoading({ title: '保存中...' });

    // 下载图片
    wx.downloadFile({
      url: this.data.cardPreview,
      success: (res) => {
        if (res.statusCode === 200) {
          // 保存到相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.hideLoading();
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              wx.hideLoading();
              wx.showToast({
                title: '保存失败，请重试',
                icon: 'none'
              });
              console.error('保存卡片失败:', err);
            }
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '下载失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '下载失败，请重试',
          icon: 'none'
        });
        console.error('下载卡片失败:', err);
      }
    });
  },

  // 分享卡片
  shareCard() {
    if (!this.data.cardPreview) {
      return;
    }

    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  onShareAppMessage() {
    return {
      title: '卡片生成 - 生成可保存的民俗卡片',
      path: '/mingsu/pages/card/card'
    };
  }
});