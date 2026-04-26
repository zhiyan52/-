// mingsu/pages/ai-image/ai-image.js
Page({
  data: {
    theme: '',
    styles: ['水墨风格', '工笔风格', '写意风格', '青绿风格'],
    styleIndex: 0,
    colors: ['淡雅', '浓郁', '明亮', '古朴'],
    colorIndex: 0,
    imageUrl: '',
    loading: false,
    
    // 主题图片映射 - 云存储路径
    themeImages: {
      '春节': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/cee5695f868e1956e82db81adcc3d904.jpg',
      '中秋节': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/a5490a3fb124dd1e215da7b726342292.jpg',
      '清明节': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/a10ab82af33a1004a5bec07fb618897e.jpg',
      '端午节': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/01672d84ba0db0681a805a6115ca3146.jpg',
      '重阳节': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/61ee46eff4670ddf2a8bc778c47a7a3b.jpg',
      '元宵节': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/6e3cee75b7be5f0de3c5738eb0f65fd0.jpg'
    }
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

    // 优先从本地映射获取图片
    const { theme, themeImages, styles, styleIndex, colors, colorIndex } = this.data;
    let imageUrl = themeImages[theme];
    
    if (imageUrl) {
      // 成功从本地映射获取图片
      setTimeout(() => {
        this.setData({ imageUrl, loading: false });
        wx.showToast({ title: "生成成功！", icon: "success" });
      }, 500);
    } else {
      // 如果本地映射没有，调用AI生成
      const style = styles[styleIndex];
      const color = colors[colorIndex];
      
      // 生成图片URL（模拟）
      imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`${theme} ${style} ${color} style, traditional Chinese ink painting`)}&image_size=square_hd`;
      
      // 模拟AI生成图片的延迟
      setTimeout(() => {
        this.setData({ imageUrl, loading: false });
        wx.showToast({ title: "生成成功！", icon: "success" });
      }, 2000);
    }
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