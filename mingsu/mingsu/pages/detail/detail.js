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
        name: '清明青团',
        category: '时令食俗',
        region: '江南地区',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qingtuan.jpg'
        ],
        desc: '清明青团是清明节的传统食品，用糯米粉和艾草汁制成，象征着对祖先的缅怀和对春天的迎接。',
        origin: '青团的历史可以追溯到唐代，最初是用来祭祀祖先的祭品，后来逐渐成为清明节的特色食品。',
        story: '传说青团起源于太平天国时期，当时李秀成被清兵追捕，村民用艾草汁和糯米粉做成团子，帮助他躲过了追捕。',
        meaning: '清明节吃青团，不仅是一种美食习俗，更是对传统文化的传承，体现了中国人对祖先的尊敬和对自然的敬畏。青团的绿色象征着春天的生机和希望。',
        process: '采摘新鲜艾草，煮艾草取汁，和糯米粉揉成团，包入馅料，上锅蒸熟。',
        related: [
          { id: 2, name: '立夏蛋', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/xiadand.jpg' },
          { id: 3, name: '中秋月饼', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/mooncake.jpg' }
        ]
      },
      2: {
        id: 2,
        name: '立夏蛋',
        category: '时令食俗',
        region: '全国各地',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/xiadand.jpg'
        ],
        desc: '立夏蛋是立夏时节的传统食品，人们会将鸡蛋煮熟后用彩色丝线编织的网袋挂在孩子的脖子上，祈求夏日平安健康。',
        origin: '立夏吃蛋的习俗起源于战国时期，当时人们认为立夏吃蛋可以避免暑热，保持身体健康。',
        story: '传说女娲娘娘在立夏这一天，为了保护孩子们不被夏天的疾病侵害，教人们用五彩丝线系住鸡蛋挂在脖子上。',
        meaning: '立夏吃蛋象征着对夏日健康的祈求，鸡蛋的圆形象征着团圆和完整，彩色丝线象征着吉祥和好运。',
        process: '选择新鲜鸡蛋，洗净后放入锅中煮熟，捞出后用冷水浸泡，然后用彩色丝线编织网袋，将鸡蛋放入网袋中。',
        related: [
          { id: 1, name: '清明青团', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qingtuan.jpg' },
          { id: 3, name: '中秋月饼', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/mooncake.jpg' }
        ]
      },
      3: {
        id: 3,
        name: '中秋月饼',
        category: '时令食俗',
        region: '全国各地',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/mooncake.jpg'
        ],
        desc: '中秋月饼是中秋节的传统食品，象征着团圆美满，是家人团聚时必不可少的美食。',
        origin: '月饼的历史可以追溯到唐代，最初是用来祭祀月神的祭品，后来逐渐成为中秋节的特色食品。',
        story: '传说月饼起源于元末明初，当时人们用月饼传递起义信息，推翻了元朝的统治。',
        meaning: '中秋节吃月饼象征着团圆美满，月饼的圆形象征着团圆，馅料的甜味象征着生活的甜蜜。',
        process: '制作月饼皮，准备馅料，包入馅料，压制成型，刷上蛋液，放入烤箱烤制。',
        related: [
          { id: 1, name: '清明青团', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qingtuan.jpg' },
          { id: 2, name: '立夏蛋', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/xiadand.jpg' }
        ]
      },
      4: {
        id: 4,
        name: '冬至饺子',
        category: '时令食俗',
        region: '北方地区',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/dumpling.jpg'
        ],
        desc: '冬至饺子是冬至时节的传统食品，北方人认为冬至吃饺子可以避免冻耳朵，寓意温暖过冬。',
        origin: '冬至吃饺子的习俗起源于汉代，当时张仲景用羊肉和草药包成饺子，为穷人治疗冻伤。',
        story: '传说张仲景在冬至这一天，看到穷人耳朵冻伤，就用羊肉、辣椒和草药包成饺子，煮熟后分给穷人吃，治好了他们的冻伤。',
        meaning: '冬至吃饺子象征着对冬日温暖的祈求，饺子的形状像耳朵，寓意着保护耳朵不被冻伤。',
        process: '准备饺子皮，制作馅料，包成饺子，放入锅中煮熟，捞出后蘸醋食用。',
        related: [
          { id: 1, name: '清明青团', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/qingtuan.jpg' },
          { id: 3, name: '中秋月饼', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/mooncake.jpg' }
        ]
      },
      6: {
        id: 6,
        name: '景德镇陶瓷茶具',
        category: '非遗食韵',
        region: '江西省景德镇市',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/6.jpg'
        ],
        desc: '景德镇陶瓷茶具是中国传统陶瓷工艺的代表，以其精湛的工艺和独特的艺术风格闻名于世。',
        origin: '景德镇陶瓷的历史可以追溯到汉代，经过数千年的发展，成为了中国陶瓷的代名词。',
        story: '景德镇原名昌南镇，宋代真宗皇帝因喜爱这里的瓷器，将年号景德赐给昌南镇，从此昌南镇改名为景德镇。',
        meaning: '景德镇陶瓷茶具不仅是一种实用器具，更是一种艺术品，体现了中国传统工艺的精湛和文化的深厚。',
        process: '选择优质瓷土，制坯成型，干燥，施釉，烧制，装饰。',
        related: [
          { id: 7, name: '苏绣茶席', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/7.jpg' },
          { id: 8, name: '茅台酒', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/8.jpg' }
        ]
      },
      7: {
        id: 7,
        name: '苏绣茶席',
        category: '非遗食韵',
        region: '江苏省苏州市',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/7.jpg'
        ],
        desc: '苏绣茶席是苏州刺绣技艺的代表作品，以其精细的针法和精美的图案闻名于世。',
        origin: '苏绣的历史可以追溯到春秋时期，经过数千年的发展，成为了中国四大名绣之一。',
        story: '苏绣起源于苏州，宋代时达到鼎盛，明清时期成为宫廷贡品，被誉为"东方艺术明珠"。',
        meaning: '苏绣茶席不仅是一种实用器具，更是一种艺术品，体现了中国传统刺绣工艺的精湛和文化的深厚。',
        process: '设计图案，选择丝线，刺绣，装裱。',
        related: [
          { id: 6, name: '景德镇陶瓷茶具', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/6.jpg' },
          { id: 8, name: '茅台酒', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/8.jpg' }
        ]
      },
      8: {
        id: 8,
        name: '茅台酒',
        category: '非遗食韵',
        region: '贵州省仁怀市',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/8.jpg'
        ],
        desc: '茅台酒是中国著名的白酒，以其独特的风味和悠久的历史闻名于世。',
        origin: '茅台酒的历史可以追溯到汉代，经过数千年的发展，成为了中国白酒的代表。',
        story: '茅台酒产于贵州省仁怀市茅台镇，因产地而得名，是中国国酒，被誉为"液体黄金"。',
        meaning: '茅台酒不仅是一种饮品，更是一种文化符号，体现了中国传统酿酒工艺的精湛和文化的深厚。',
        process: '选择优质高粱，制曲，发酵，蒸馏，储存，勾兑。',
        related: [
          { id: 6, name: '景德镇陶瓷茶具', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/6.jpg' },
          { id: 7, name: '苏绣茶席', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/7.jpg' }
        ]
      },
      9: {
        id: 9,
        name: '山西老陈醋',
        category: '非遗食韵',
        region: '山西省太原市',
        images: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/9.jpg'
        ],
        desc: '山西老陈醋是中国著名的食醋，以其浓郁的风味和悠久的历史闻名于世。',
        origin: '山西老陈醋的历史可以追溯到周代，经过数千年的发展，成为了中国食醋的代表。',
        story: '山西老陈醋产于山西省太原市，因产地而得名，是中国四大名醋之一，被誉为"天下第一醋"。',
        meaning: '山西老陈醋不仅是一种调味品，更是一种文化符号，体现了中国传统制醋工艺的精湛和文化的深厚。',
        process: '选择优质高粱，蒸煮，糖化，酒精发酵，醋酸发酵，陈酿。',
        related: [
          { id: 6, name: '景德镇陶瓷茶具', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/6.jpg' },
          { id: 8, name: '茅台酒', imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/8.jpg' }
        ]
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
