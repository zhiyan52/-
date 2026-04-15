Page({
  data: {
    currentCategory: 'all',
    todayDate: '',

    // 轮播推荐数据 - 使用在线图片
    featuredList: [
      {
        id: 1,
        image: 'https://picsum.photos/400/200?random=1',
        tag: '镇馆之宝',
        title: '《永乐大典》',
        description: '中国古代最大的百科全书，被誉为"世界有史以来最大的百科全书"'
      },
      {
        id: 2,
        image: 'https://picsum.photos/400/200?random=2',
        tag: '稀世珍本',
        title: '《四库全书》',
        description: '清代乾隆时期编修的大型丛书，分经史子集四部'
      },
      {
        id: 3,
        image: 'https://picsum.photos/400/200?random=3',
        tag: '国宝级',
        title: '《清明上河图》',
        description: '北宋张择端绘制的风俗画，中国十大传世名画之一'
      }
    ],

    // 今日典籍
    dailyBook: {
      id: 101,
      cover: 'https://picsum.photos/240/320?random=4',
      name: '《论语》',
      dynasty: '春秋',
      author: '孔子弟子及再传弟子',
      summary: '儒家经典著作之一，主要记录孔子及其弟子的言行，集中体现了孔子的政治主张、伦理思想、道德观念及教育原则等。',
      views: 12580,
      favorites: 3421
    },

    // 典藏列表
    collectionList: [
      {
        id: 201,
        image: 'https://picsum.photos/200/280?random=5',
        category: '经部',
        name: '《周易》',
        era: '西周',
        size: 'large'
      },
      {
        id: 202,
        image: 'https://picsum.photos/200/280?random=6',
        category: '史部',
        name: '《史记》',
        era: '西汉'
      },
      {
        id: 203,
        image: 'https://picsum.photos/200/280?random=7',
        category: '子部',
        name: '《道德经》',
        era: '春秋'
      },
      {
        id: 204,
        image: 'https://picsum.photos/200/280?random=8',
        category: '集部',
        name: '《楚辞》',
        era: '战国'
      },
      {
        id: 205,
        image: 'https://picsum.photos/400/300?random=9',
        category: '金石',
        name: '毛公鼎',
        era: '西周晚期',
        size: 'large'
      }
    ],

    // 书法列表
    calligraphyList: [
      {
        id: 301,
        image: 'https://picsum.photos/200/350?random=10',
        calligrapher: '王羲之',
        scriptType: '行书',
        title: '《兰亭集序》'
      },
      {
        id: 302,
        image: 'https://picsum.photos/200/350?random=11',
        calligrapher: '颜真卿',
        scriptType: '楷书',
        title: '《多宝塔碑》'
      },
      {
        id: 303,
        image: 'https://picsum.photos/200/350?random=12',
        calligrapher: '苏轼',
        scriptType: '行书',
        title: '《寒食帖》'
      },
      {
        id: 304,
        image: 'https://picsum.photos/200/350?random=13',
        calligrapher: '张旭',
        scriptType: '草书',
        title: '《古诗四帖》'
      }
    ],

    // 知识内容
    knowledgeContent: '古籍装帧形式历经演变，先后出现过卷轴装、经折装、旋风装、蝴蝶装、包背装、线装等多种形态。其中线装书因其牢固耐用、翻阅方便，自明代中期起成为最主流的书籍装帧形式，沿用至今。',
    knowledgeSource: '《中国古籍装订技术史》'
  },

  onLoad: function (options) {
    this.setTodayDate();
  },

  setTodayDate: function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const todayDate = `${year}年${month}月${day}日`;

    this.setData({
      todayDate: todayDate
    });
  },

  switchCategory: function (e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });

    console.log('切换到分类:', category);
  },

  goToDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/diancang/diancang-detail?id=' + id
    });
  },

  viewMore: function () {
    wx.navigateTo({
      url: '/diancang/diancang-list'
    });
  },

  openAR: function () {
    wx.showToast({
      title: 'AR识典功能开发中',
      icon: 'none'
    });
  },

  startQuiz: function () {
    wx.navigateTo({
      url: '/diancang/diancang-quiz'
    });
  },

  viewMap: function () {
    wx.navigateTo({
      url: '/diancang/diancang-map'
    });
  },

  // 互动活动相关函数
  startKnowledgeQuiz: function () {
    wx.navigateTo({
      url: '/diancang/diancang-quiz'
    });
  },

  startTreasureHunt: function () {
    wx.showToast({
      title: '典藏寻宝功能开发中',
      icon: 'none'
    });
  },

  startArtifactRepair: function () {
    wx.showToast({
      title: '文物修复功能开发中',
      icon: 'none'
    });
  },

  startPuzzleGame: function () {
    wx.showToast({
      title: '典籍拼图功能开发中',
      icon: 'none'
    });
  }
});