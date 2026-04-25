// mingsu/pages/ai-image/ai-image.js
Page({
  data: {
    theme: '',
    styles: ['水墨风格', '工笔风格', '写意风格', '青绿风格'],
    styleIndex: 0,
    colors: ['淡雅', '浓郁', '明亮', '古朴'],
    colorIndex: 0,
    imageUrl: '',
    loading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '意境生图' });
  },

  // 绑定主题输入
  bindThemeInput(e) {
    this.setData({ theme: e.detail.value });
  },

  // 绑定风格选择
  bindStyleChange(e) {
    this.setData({ styleIndex: e.detail.value });
  },

  // 绑定色调选择
  bindColorChange(e) {
    this.setData({ colorIndex: e.detail.value });
  },

  // 生成图片
  generateImage() {
    if (!this.data.theme) {
      wx.showToast({
        title: '请输入主题',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });

    // 模拟AI生成图片的延迟
    setTimeout(() => {
      const { theme, styles, styleIndex, colors, colorIndex } = this.data;
      const style = styles[styleIndex];
      const color = colors[colorIndex];

      // 生成图片URL（模拟）
      const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`${theme} ${style} ${color} style, traditional Chinese ink painting`)}&image_size=square_hd`;

      this.setData({ imageUrl, loading: false });
    }, 2000);
  },

  // 保存图片到相册
  saveImage() {
    if (!this.data.imageUrl) {
      return;
    }

    wx.showLoading({ title: '保存中...' });

    // 下载图片
    wx.downloadFile({
      url: this.data.imageUrl,
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
              console.error('保存图片失败:', err);
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
        console.error('下载图片失败:', err);
      }
    });
  },

  // 分享图片
  shareImage() {
    if (!this.data.imageUrl) {
      return;
    }

    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  onShareAppMessage() {
    return {
      title: '意境生图 - AI生成民俗主题水墨插画',
      path: '/mingsu/pages/ai-image/ai-image'
    };
  }
});