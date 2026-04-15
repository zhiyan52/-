Page({
  data: {
    selectedHeritage: null,
    currentHeritage: null,
    loading: false,
    guideText: '',
    heritageList: [
      {
        id: 1,
        name: '京剧',
        category: '传统戏曲',
        image: 'https://picsum.photos/200/200?random=101'
      },
      {
        id: 2,
        name: '苏绣',
        category: '传统技艺',
        image: 'https://picsum.photos/200/200?random=102'
      },
      {
        id: 3,
        name: '皮影戏',
        category: '传统戏剧',
        image: 'https://picsum.photos/200/200?random=103'
      },
      {
        id: 4,
        name: '太极拳',
        category: '传统体育',
        image: 'https://picsum.photos/200/200?random=104'
      },
      {
        id: 5,
        name: '青花瓷',
        category: '传统工艺',
        image: 'https://picsum.photos/200/200?random=105'
      }
    ],
    guideTexts: {
      1: '京剧是中国影响最大的戏曲剧种，被誉为"国粹"。它形成于清代乾隆年间，融合了徽剧、汉剧等多种地方戏曲的特点。京剧的表演形式包括唱、念、做、打，角色行当分为生、旦、净、丑。经典剧目有《霸王别姬》《贵妃醉酒》《空城计》等。',
      2: '苏绣是中国四大名绣之一，发源于苏州地区，历史悠久。苏绣以针法精细、色彩雅致著称，被誉为"东方艺术明珠"。其代表作有《清明上河图》《百鸟朝凤》等，常用于制作服饰、屏风、挂屏等。',
      3: '皮影戏是中国民间古老的传统艺术，又称"影子戏"或"灯影戏"。它用兽皮或纸板剪制人物剪影，借助灯光照射在白色幕布上进行表演。皮影戏历史悠久，最早可追溯到西汉时期，是中国民间艺术的瑰宝。',
      4: '太极拳是国家级非物质文化遗产，是以中国传统儒、道哲学中的太极、阴阳辩证理念为核心思想，集颐养性情、强身健体、技击对抗等多种功能为一体的传统武术。太极拳流派众多，有陈式、杨式、武式、吴式、孙式等。',
      5: '青花瓷是中国陶瓷烧制工艺的珍品，属釉下彩瓷。原始青花瓷于唐宋已见端倪，成熟的青花瓷则出现在元代景德镇的湖田窑。青花瓷以其洁白细腻的胎体、晶莹透亮的釉色、青翠欲滴的青花图案而闻名于世，被誉为"瓷器之冠"。'
    }
  },

  onLoad: function (options) {

  },

  selectHeritage: function (e) {
    const id = e.currentTarget.dataset.id;
    const heritage = this.data.heritageList.find(item => item.id === id);
    this.setData({
      selectedHeritage: id,
      currentHeritage: heritage,
      loading: true,
      guideText: ''
    });

    setTimeout(() => {
      const guideText = this.data.guideTexts[id] || '这是一项非常珍贵的非物质文化遗产，承载着深厚的历史文化内涵。';
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
      const guideText = this.data.guideTexts[this.data.selectedHeritage] || '这是一项非常珍贵的非物质文化遗产，承载着深厚的历史文化内涵。';
      this.setData({
        guideText: guideText,
        loading: false
      });
    }, 1500);
  }
});