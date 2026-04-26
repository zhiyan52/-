// AI书画意境生图页面逻辑 - 使用云存储图片
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
    // 云存储图片映射
    keywordImages: {
      '兰亭集序意境': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/83acab37b22ac792ff8830f6b7951a05.jpg',
      '水墨竹石图': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/8f3f5c187ec767aa67a08e18ae925b47.png',
      '工笔牡丹': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/067e8eece99e515766115f186f6a3f0b.jpg',
      '千里江山图风格': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/0ad903ae993c401d3d69c1338dbbd00b.jpg',
      '书法卷轴': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/9cc60758dca4ba722e869c43d0467119.jpg',
      '山水画意境': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/efbebe26c2222ab9b30d4653ea797abc.jpg',
      '花鸟画': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/dbe6b17e44fb63811b4becc9fed13dbf.jpg',
      '人物画': 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/aishengtu/1a32c72a5e4836ec6de04ed3b1c9db52.jpg'
    },
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

  // 生成图片 - 使用本地图片
  generateImage() {
    if (!this.data.keyword) {
      wx.showToast({ title: '请输入或选择关键词', icon: 'none' });
      return;
    }

    this.setData({ isGenerating: true, generatedImage: null, imageSource: '' });

    // 模拟生成延迟
    setTimeout(() => {
      const { keyword, keywordImages } = this.data;
      let imageUrl = keywordImages[keyword];
      
      // 如果没有匹配的关键词，使用默认图片
      if (!imageUrl) {
        imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(keyword + ' 中国传统书画风格')}&image_size=landscape_4_3`;
      }

      this.setData({
        generatedImage: imageUrl,
        imageSource: 'cloud',
        isGenerating: false
      });
    }, 1000);
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
