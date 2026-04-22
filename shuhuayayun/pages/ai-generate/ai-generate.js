// shuhuayayun/pages/ai-generate/ai-generate.js
Page({
  data: {
    prompt: '',
    generatedImage: null,
    loading: false,
    error: null,
    examples: [
      '兰亭集序意境',
      '水墨竹石图',
      '工笔牡丹',
      '千里江山图风格'
    ]
  },
  
  onLoad: function() {
    console.log('AI书画意境生图页面加载');
  },
  
  inputPrompt: function(e) {
    this.setData({
      prompt: e.detail.value
    });
  },
  
  selectExample: function(e) {
    const example = e.currentTarget.dataset.example;
    this.setData({
      prompt: example
    });
  },
  
  generateImage: function() {
    if (!this.data.prompt) {
      wx.showToast({
        title: '请输入描述或选择示例',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      loading: true,
      error: null
    });
    
    // 模拟AI生图，实际项目中应调用云函数
    setTimeout(() => {
      const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(this.data.prompt + ' 中国水墨画风格 传统艺术')}&image_size=portrait_4_3`;
      this.setData({
        generatedImage: imageUrl,
        loading: false
      });
    }, 2000);
  },
  
  saveImage: function() {
    if (!this.data.generatedImage) {
      wx.showToast({
        title: '请先生成图片',
        icon: 'none'
      });
      return;
    }
    
    wx.downloadFile({
      url: this.data.generatedImage,
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function() {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            });
          },
          fail: function() {
            wx.showToast({
              title: '保存失败，请检查权限',
              icon: 'none'
            });
          }
        });
      },
      fail: function() {
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        });
      }
    });
  }
});