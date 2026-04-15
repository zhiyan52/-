Page({
  data: {
    selectedArt: null,
    currentArt: null,
    loading: false,
    guideText: '',
    artList: [
      {
        id: 1,
        name: '《兰亭集序》',
        artist: '王羲之',
        image: 'https://picsum.photos/140/100?random=701'
      },
      {
        id: 2,
        name: '《清明上河图》',
        artist: '张择端',
        image: 'https://picsum.photos/140/100?random=702'
      },
      {
        id: 3,
        name: '《多宝塔碑》',
        artist: '颜真卿',
        image: 'https://picsum.photos/140/100?random=703'
      },
      {
        id: 4,
        name: '《富春山居图》',
        artist: '黄公望',
        image: 'https://picsum.photos/140/100?random=704'
      }
    ],
    guideTexts: {
      1: '《兰亭集序》是东晋书法家王羲之的代表作，被誉为"天下第一行书"。通篇遒媚飘逸，字字精妙，点画犹如舞蹈，有如神人相助而成，被历代书界奉为极品。',
      2: '《清明上河图》是北宋画家张择端的传世名作，描绘了北宋都城汴京的城市面貌和社会各阶层人民的生活状况，是北宋时期都城汴京当年繁荣的见证。',
      3: '《多宝塔碑》是唐代书法家颜真卿的楷书代表作，碑文结构严谨，笔画饱满，是学习楷书的经典范本。',
      4: '《富春山居图》是元代画家黄公望的山水画代表作，以浙江富春江为背景，画面用墨淡雅，山和水的布置疏密得当，墨色浓淡干湿并用，极富于变化。'
    }
  },

  onLoad: function (options) {

  },

  selectArt: function (e) {
    const id = e.currentTarget.dataset.id;
    const art = this.data.artList.find(item => item.id === id);
    this.setData({
      selectedArt: id,
      currentArt: art,
      loading: true,
      guideText: ''
    });

    setTimeout(() => {
      const guideText = this.data.guideTexts[id] || '这是中国书画艺术的经典之作，具有重要的艺术价值。';
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
      const guideText = this.data.guideTexts[this.data.selectedArt] || '这是中国书画艺术的经典之作，具有重要的艺术价值。';
      this.setData({
        guideText: guideText,
        loading: false
      });
    }, 1500);
  }
});