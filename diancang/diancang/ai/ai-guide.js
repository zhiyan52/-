Page({
  data: {
    selectedBook: null,
    currentBook: null,
    loading: false,
    guideText: '',
    bookList: [
      {
        id: 1,
        name: '《诗经选注》',
        author: '孔子',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/zhinengdaolan/c28ba5942a4f35d62e6abd2e3946d09c.jpg'
      },
      {
        id: 2,
        name: '《史记》',
        author: '司马迁',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/zhinengdaolan/0852dc875be1e85ff844fe70f6a75e81.jpg'
      },
      {
        id: 3,
        name: '《兰亭集序》',
        author: '王羲之',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/a36cf1e13b99529317da1fd145ed6e9c.jpg'
      },
      {
        id: 4,
        name: '《牡丹亭》',
        author: '汤显祖',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/zhinengdaolan/6c42fdca51c14f99bcaa13d32d8631d3.jpg'
      },
      {
        id: 5,
        name: '《论语》',
        author: '孔子及其弟子',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/diancang/zhinengdaolan/3fc130e4e7e6b63bfa61ec9f9148ab31.jpg'
      }
    ],
    guideTexts: {
      1: '《诗经》者，中国第一部诗歌总集也。收录西周至春秋时期诗歌三百有五篇，分为风、雅、颂三部分。风者，民间歌谣；雅者，朝廷乐歌；颂者，宗庙祭祀之歌。孔子曾言："诗三百，一言以蔽之，曰：思无邪。"其语言凝练，意境深远，为后世诗歌之滥觞。',
      2: '太史公司马迁所著《史记》，中国第一部纪传体通史也。上起黄帝，下迄汉武帝，记载三千余年历史。其体例严谨，文笔生动，被鲁迅誉为"史家之绝唱，无韵之离骚"。司马迁忍辱负重，发愤著书，终成此千古巨著，为后世史学之典范。',
      3: '王羲之《兰亭集序》，被誉为"天下第一行书"。永和九年，王羲之与友人会于兰亭，修禊事也。群贤毕至，少长咸集，虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。其书法飘若浮云，矫若惊龙，笔法精妙，为后世书家所宗。',
      4: '汤显祖《牡丹亭》，明代传奇之巅峰也。讲述杜丽娘与柳梦梅之爱情故事，情节离奇，文辞华美。"良辰美景奈何天，赏心乐事谁家院"，此等佳句，脍炙人口。其主题突破封建礼教束缚，歌颂真挚爱情，影响深远。',
      5: '《论语》者，孔子及其弟子言行之语录也。由孔子弟子及再传弟子编撰而成，记录孔子之政治主张、伦理思想、道德观念及教育原则。"仁"为其核心思想，"己所不欲，勿施于人"为其重要准则。此书为儒家经典，对中国传统文化影响至深。'
    }
  },

  onLoad: function (options) {

  },

  selectBook: function (e) {
    const id = e.currentTarget.dataset.id;
    const book = this.data.bookList.find(item => item.id === id);
    this.setData({
      selectedBook: id,
      currentBook: book,
      loading: true,
      guideText: ''
    });

    setTimeout(() => {
      const guideText = this.data.guideTexts[id] || '此乃中国古典文学之经典，蕴含深厚历史文化底蕴。文心先生愿与君共赏其精妙之处。';
      this.setData({
        guideText: guideText,
        loading: false
      });
    }, 1500);
  },

  playVoice: function () {
    wx.showToast({
      title: '文心先生正在练习诵读，敬请期待',
      icon: 'none'
    });
  },

  regenerate: function () {
    this.setData({
      loading: true,
      guideText: ''
    });
    setTimeout(() => {
      const guideText = this.data.guideTexts[this.data.selectedBook] || '此乃中国古典文学之经典，蕴含深厚历史文化底蕴。文心先生愿与君共赏其精妙之处。';
      this.setData({
        guideText: guideText,
        loading: false
      });
    }, 1500);
  }
});