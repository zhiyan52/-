// mingsu/mingsu/pages/detail/detail.js
Page({
  data: {
    foodDetail: null,
    isLoading: true,
    isFavorite: false,
    showSharePanel: false
  },

  onLoad(options) {
    const id = options.id;
    this.loadFoodDetail(id);
  },

  loadFoodDetail(id) {
    const foodData = {
      1: {
        id: 1,
        title: '清明青团',
        category: '时令食俗',
        region: '江南地区',
        season: '春季',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake%20traditional%20food&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=making%20qingming%20green%20rice%20cake%20process&image_size=landscape_16_9'
        ],
        description: '清明青团是清明节的传统食品，用糯米粉和艾草汁制成，象征着对祖先的缅怀和对春天的迎接。',
        history: '青团的历史可以追溯到唐代，最初是用来祭祀祖先的祭品，后来逐渐成为清明节的特色食品。',
        ingredients: ['糯米粉', '艾草', '豆沙', '芝麻', '白糖'],
        process: ['采摘新鲜艾草', '煮艾草取汁', '和糯米粉揉成团', '包入馅料', '上锅蒸熟'],
        culture: '清明节吃青团，不仅是一种美食习俗，更是对传统文化的传承，体现了中国人对祖先的尊敬和对自然的敬畏。',
        tags: ['清明', '传统', '江南', '季节性']
      },
      2: {
        id: 2,
        title: '北京烤鸭',
        category: '地域珍味',
        region: '北京',
        season: '四季皆宜',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20traditional%20chinese%20food&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20slicing%20process&image_size=landscape_16_9'
        ],
        description: '北京烤鸭是北京最著名的菜式，以色泽红艳，肉质肥而不腻，外脆里嫩著称。',
        history: '北京烤鸭的历史可以追溯到南北朝时期，经过数百年的发展，成为了北京的代表性美食。',
        ingredients: ['北京填鸭', '枣木', '荷叶饼', '甜面酱', '葱丝'],
        process: ['选鸭', '打气', '掏膛', '洗膛', '挂钩', '烫皮', '挂糖色', '晾干', '烤制'],
        culture: '北京烤鸭不仅是一种美食，更是中国饮食文化的象征，体现了中国烹饪技艺的精湛。',
        tags: ['北京', '传统', '国宴', '名吃']
      }
    };

    setTimeout(() => {
      this.setData({
        foodDetail: foodData[id] || foodData[1],
        isLoading: false
      });
    }, 1000);
  },

  toggleFavorite() {
    this.setData({ isFavorite: !this.data.isFavorite });
    wx.showToast({
      title: this.data.isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success'
    });
  },

  showShare() {
    this.setData({ showSharePanel: true });
  },

  closeSharePanel() {
    this.setData({ showSharePanel: false });
  },

  shareToFriend() {
    this.closeSharePanel();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage']
    });
  },

  shareToTimeline() {
    this.closeSharePanel();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareTimeline']
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    const foodDetail = this.data.foodDetail || {};
    return {
      title: `${foodDetail.title || ''} | 民俗百味`,
      path: `/mingsu/mingsu/pages/detail/detail?id=${foodDetail.id || ''}`,
      imageUrl: foodDetail.images && foodDetail.images[0] || ''
    };
  },

  onShareTimeline() {
    const foodDetail = this.data.foodDetail || {};
    return {
      title: `${foodDetail.title || ''} - 探索中华传统饮食文化`,
      query: `id=${foodDetail.id || ''}`,
      imageUrl: foodDetail.images && foodDetail.images[0] || ''
    };
  }
});
