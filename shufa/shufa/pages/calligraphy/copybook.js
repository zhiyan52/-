// shufa/shufa/pages/calligraphy/copybook.js
Page({
  data: {
    copybookCategories: [
      { id: 'zhuan', name: '篆书', icon: '🔤' },
      { id: 'li', name: '隶书', icon: '📜' },
      { id: 'kai', name: '楷书', icon: '✍️' },
      { id: 'xing', name: '行书', icon: '💨' },
      { id: 'cao', name: '草书', icon: '🎨' }
    ],
    selectedCategory: 'kai',
    copybookList: [
      {
        id: 1,
        title: '兰亭序',
        author: '王羲之',
        style: '行书',
        dynasty: '东晋',
        image: '/images/blank.png',
        description: '天下第一行书'
      },
      {
        id: 2,
        title: '九成宫醴泉铭',
        author: '欧阳询',
        style: '楷书',
        dynasty: '唐代',
        image: '/images/blank.png',
        description: '欧体楷书代表作'
      },
      {
        id: 3,
        title: '多宝塔感应碑',
        author: '颜真卿',
        style: '楷书',
        dynasty: '唐代',
        image: '/images/blank.png',
        description: '颜体楷书代表作'
      },
      {
        id: 4,
        title: '玄秘塔碑',
        author: '柳公权',
        style: '楷书',
        dynasty: '唐代',
        image: '/images/blank.png',
        description: '柳体楷书代表作'
      }
    ],
    gridTypes: [
      { id: 'mizi', name: '米字格' },
      { id: 'tianzi', name: '田字格' },
      { id: 'jiugong', name: '九宫格' },
      { id: 'huigong', name: '回宫格' },
      { id: 'yuan', name: '圆格' },
      { id: 'fang', name: '方格' }
    ],
    selectedGrid: 'mizi'
  },

  onLoad() {
    this.loadCopybookList();
  },

  loadCopybookList() {
    console.log('加载碑帖列表');
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ selectedCategory: category });
    // 这里可以根据分类加载对应的碑帖
  },

  goToCharacterDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/shufa/shufa/pages/calligraphy/character?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  startARCopy() {
    wx.showToast({
      title: 'AR投影临摹功能开发中',
      icon: 'none'
    });
  },

  startEvaluation() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showToast({
          title: '智能评测功能开发中',
          icon: 'none'
        });
      }
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '临帖阁 | 古雅文轩',
      path: '/shufa/shufa/pages/calligraphy/copybook',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20copybook%20practice&image_size=landscape_16_9'
    };
  }
});
