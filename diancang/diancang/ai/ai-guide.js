Page({
  data: {
    selectedBook: null,
    currentBook: null,
    loading: false,
    guideText: '',
    bookList: [
      {
        id: 1,
        name: '《论语》',
        author: '孔子及弟子',
        image: 'https://picsum.photos/120/160?random=501'
      },
      {
        id: 2,
        name: '《史记》',
        author: '司马迁',
        image: 'https://picsum.photos/120/160?random=502'
      },
      {
        id: 3,
        name: '《道德经》',
        author: '老子',
        image: 'https://picsum.photos/120/160?random=503'
      },
      {
        id: 4,
        name: '《红楼梦》',
        author: '曹雪芹',
        image: 'https://picsum.photos/120/160?random=504'
      }
    ],
    guideTexts: {
      1: '《论语》是儒家学派的经典著作之一，由孔子的弟子及其再传弟子编撰而成。它以语录体和对话文体为主，记录了孔子及其弟子言行，集中体现了孔子的政治主张、伦理思想、道德观念及教育原则等。',
      2: '《史记》是西汉史学家司马迁撰写的纪传体史书，是中国历史上第一部纪传体通史，记载了上至上古传说中的黄帝时代，下至汉武帝太初四年间共3000多年的历史。',
      3: '《道德经》又称《老子》，是中国古代先秦诸子分家前的一部著作，传说是春秋时期的老子李耳所撰写，是道家哲学思想的重要来源。',
      4: '《红楼梦》是中国古代章回体长篇小说，中国古典四大名著之首，一般认为是清代作家曹雪芹所著。小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，描绘了一批举止见识出于须眉之上的闺阁佳人的人生百态。'
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
      const guideText = this.data.guideTexts[id] || '这是一部中国古典文学经典著作，具有重要的历史和文化价值。';
      this.setData({
        guideText: guideText,
        loading: false
      });
    }, 1500);
  },

  playVoice: function () {
    wx.showToast({
      title: '语音播放功能开发中',
      icon: 'none'
    });
  },

  regenerate: function () {
    this.setData({
      loading: true,
      guideText: ''
    });
    setTimeout(() => {
      const guideText = this.data.guideTexts[this.data.selectedBook] || '这是一部中国古典文学经典著作，具有重要的历史和文化价值。';
      this.setData({
        guideText: guideText,
        loading: false
      });
    }, 1500);
  }
});