// shufa/shufa/pages/calligraphy/creation.js
Page({
  data: {
    inputText: '',
    selectedStyle: 'regular',
    styleOptions: [
      { id: 'regular', name: '楷书', icon: '✍️' },
      { id: 'running', name: '行书', icon: '💨' },
      { id: 'cursive', name: '草书', icon: '🎨' },
      { id: 'official', name: '隶书', icon: '📜' },
      { id: 'seal', name: '篆书', icon: '🔤' }
    ],
    templateOptions: [
      { id: 'scroll', name: '条幅', image: '/images/blank.png' },
      { id: 'banner', name: '横幅', image: '/images/blank.png' },
      { id: 'fan', name: '折扇', image: '/images/blank.png' },
      { id: 'round', name: '团扇', image: '/images/blank.png' },
      { id: 'couple', name: '对联', image: '/images/blank.png' },
      { id: 'square', name: '斗方', image: '/images/blank.png' }
    ],
    selectedTemplate: 'scroll',
    sealOptions: [
      { id: 'yin1', name: '引首章', image: '/images/blank.png' },
      { id: 'yin2', name: '姓名章', image: '/images/blank.png' },
      { id: 'yin3', name: '闲章', image: '/images/blank.png' }
    ],
    selectedSeal: 'yin1',
    previewImage: '',
    showPreview: false
  },

  onLoad() {
    this.initCreation();
  },

  initCreation() {
    console.log('初始化集字创作');
  },

  handleInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  selectStyle(e) {
    const style = e.currentTarget.dataset.style;
    this.setData({ selectedStyle: style });
  },

  selectTemplate(e) {
    const template = e.currentTarget.dataset.template;
    this.setData({ selectedTemplate: template });
  },

  selectSeal(e) {
    const seal = e.currentTarget.dataset.id;
    this.setData({ selectedSeal: seal });
  },

  generateCalligraphy() {
    if (!this.data.inputText.trim()) {
      wx.showToast({ title: '请输入文字内容', icon: 'error' });
      return;
    }

    // 模拟生成书法作品
    const previewImage = '/images/blank.png';
    this.setData({ previewImage, showPreview: true });
  },

  saveCreation() {
    if (!this.data.previewImage) {
      wx.showToast({ title: '请先生成作品', icon: 'error' });
      return;
    }

    wx.showToast({ title: '作品已保存', icon: 'success' });
  },

  shareCreation() {
    if (!this.data.previewImage) {
      wx.showToast({ title: '请先生成作品', icon: 'error' });
      return;
    }

    wx.showToast({ title: '分享功能开发中', icon: 'none' });
  },

  closePreview() {
    this.setData({ showPreview: false });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '集字坊 | 古雅文轩',
      path: '/shufa/shufa/pages/calligraphy/creation',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20creation%20art&image_size=landscape_16_9'
    };
  }
});
