// mingsu/pages/ai-image/ai-image.js
Page({
  data: {
    keywords: [
      '清明踏青',
      '中秋赏月',
      '春节贴春联',
      '端午龙舟',
      '重阳登高',
      '立春迎春',
      '立夏尝新',
      '立秋贴秋膘',
      '立冬补冬'
    ],
    selectedKeyword: '',
    isGenerating: false,
    generatedImage: null,
    imageSource: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'AI民俗意境生图' });
  },

  selectKeyword(e) {
    const { keyword } = e.currentTarget.dataset;
    this.setData({
      selectedKeyword: keyword,
      generatedImage: null,
      imageSource: ''
    });
  },

  generateImage() {
    if (!this.data.selectedKeyword) {
      wx.showToast({ title: '请选择一个关键词', icon: 'none' });
      return;
    }

    this.setData({ isGenerating: true, generatedImage: null, imageSource: '' });

    wx.cloud.callFunction({
      name: 'hunyuan-image',
      data: {
        keyword: this.data.selectedKeyword,
        prompt: `${this.data.selectedKeyword} 中国传统民俗场景，水墨风格，古风，细腻典雅，文化底蕴深厚`
      },
      success: (res) => {
        if (res.result && res.result.success) {
          this.setData({
            generatedImage: res.result.imageUrl,
            imageSource: res.result.source || 'unknown'
          });

          if (res.result.source === 'local_backup') {
            wx.showToast({
              title: '已使用本地图片',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx.showToast({ title: '生成成功！', icon: 'success' });
          }
        } else {
          wx.showToast({ title: res.result.error || '生成失败', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('AI生图失败：', err);
        wx.showToast({ title: '生成失败，请重试', icon: 'none' });
      },
      complete: () => {
        this.setData({ isGenerating: false });
      }
    });
  },

  saveImage() {
    if (!this.data.generatedImage) {
      wx.showToast({ title: '请先生成图片', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });

    wx.downloadFile({
      url: this.data.generatedImage,
      success: (res) => {
        if (res.statusCode === 200) {
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
        } else {
          wx.hideLoading();
          wx.showToast({ title: '下载图片失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '下载图片失败', icon: 'none' });
        console.error('下载图片失败:', err);
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · AI民俗意境生图',
      path: '/mingsu/pages/ai-image/ai-image'
    };
  }
});
