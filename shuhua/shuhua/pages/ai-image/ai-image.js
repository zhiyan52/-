// AI书画意境生图页面逻辑 - 使用hunyuan-image云函数
Page({
  data: {
    // 推荐关键词
    recommendedKeywords: [
      '兰亭集序意境',
      '水墨竹石图',
      '工笔牡丹',
      '千里江山图风格',
      '书法卷轴',
      '山水画意境',
      '花鸟画',
      '人物画'
    ],
    keyword: '',
    generatedImage: null,
    isGenerating: false,
    imageSource: ''
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'AI书画意境生图' });
  },

  // 输入关键词
  inputKeyword(e) {
    this.setData({ keyword: e.detail.value });
  },

  // 选择推荐关键词
  selectKeyword(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({ keyword, imageSource: '' });
  },

  // 生成图片
  generateImage() {
    if (!this.data.keyword) {
      wx.showToast({ title: '请输入或选择关键词', icon: 'none' });
      return;
    }

    this.setData({ isGenerating: true, generatedImage: null, imageSource: '' });

    wx.cloud.callFunction({
      name: 'hunyuan-image',
      data: {
        keyword: this.data.keyword,
        prompt: `${this.data.keyword} 中国传统书画风格，水墨国画，古风，细腻典雅，文化底蕴深厚`
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

  // 保存图片
  saveImage() {
    if (!this.data.generatedImage) return;

    wx.showLoading({ title: '保存中...' });

    wx.downloadFile({
      url: this.data.generatedImage,
      success: (res) => {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.showToast({ title: '保存成功', icon: 'success' });
            },
            fail: (err) => {
              console.error("保存图片失败：", err);
              wx.showToast({ title: "保存失败，请重试", icon: "none" });
            }
          });
        }
      },
      fail: (err) => {
        console.error("下载图片失败：", err);
        wx.showToast({ title: "下载失败，请重试", icon: "none" });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  }
});
