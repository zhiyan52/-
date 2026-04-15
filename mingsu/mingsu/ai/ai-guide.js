Page({
  data: {
    selectedFolk: null,
    currentFolk: null,
    loading: false,
    guideText: '',
    folkList: [
      {
        id: 1,
        name: '春节',
        category: '传统节日',
        image: 'https://picsum.photos/120/120?random=601'
      },
      {
        id: 2,
        name: '端午节',
        category: '传统节日',
        image: 'https://picsum.photos/120/120?random=602'
      },
      {
        id: 3,
        name: '中秋节',
        category: '传统节日',
        image: 'https://picsum.photos/120/120?random=603'
      },
      {
        id: 4,
        name: '剪纸',
        category: '传统工艺',
        image: 'https://picsum.photos/120/120?random=604'
      }
    ],
    guideTexts: {
      1: '春节是中国最重要的传统节日，也叫"过年"。它起源于殷商时期年头岁尾的祭神祭祖活动，是中华民族最隆重的传统佳节。春节期间，人们会进行贴春联、放鞭炮、吃年夜饭、拜年等传统活动。',
      2: '端午节是中国传统节日之一，每年农历五月初五庆祝。端午节起源于对屈原的纪念，主要活动有赛龙舟、吃粽子、挂艾草等。端午节是中国首个入选世界非遗的节日。',
      3: '中秋节是中国传统节日之一，每年农历八月十五庆祝。中秋节自古便有祭月、赏月、吃月饼、玩花灯、赏桂花等民俗。中秋节以月之圆兆人之团圆，为寄托思念故乡，思念亲人之情。',
      4: '剪纸是中国最古老的民间艺术之一，是一种用剪刀或刻刀在纸上剪刻花纹，用于装点生活或配合其他民俗活动的民间艺术。剪纸载体可以是纸张、金银箔、树皮、树叶、布、皮、革等片状材料。'
    }
  },

  onLoad: function (options) {

  },

  selectFolk: function (e) {
    const id = e.currentTarget.dataset.id;
    const folk = this.data.folkList.find(item => item.id === id);
    this.setData({
      selectedFolk: id,
      currentFolk: folk,
      loading: true,
      guideText: ''
    });

    setTimeout(() => {
      const guideText = this.data.guideTexts[id] || '这是中国传统民俗文化的重要组成部分，承载着深厚的历史文化内涵。';
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
      const guideText = this.data.guideTexts[this.data.selectedFolk] || '这是中国传统民俗文化的重要组成部分，承载着深厚的历史文化内涵。';
      this.setData({
        guideText: guideText,
        loading: false
      });
    }, 1500);
  }
});