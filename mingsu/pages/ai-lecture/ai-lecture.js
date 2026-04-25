// mingsu/pages/ai-lecture/ai-lecture.js
Page({
  data: {
    themes: [
      {
        id: 'spring-festival',
        name: '春节',
        icon: '🎊'
      },
      {
        id: 'mid-autumn',
        name: '中秋节',
        icon: '🌕'
      },
      {
        id: 'qingming',
        name: '清明节',
        icon: '🌿'
      },
      {
        id: 'dragon-boat',
        name: '端午节',
        icon: '龙舟'
      },
      {
        id: 'double-ninth',
        name: '重阳节',
        icon: '🎋'
      },
      {
        id: 'lantern',
        name: '元宵节',
        icon: '🏮'
      }
    ],
    selectedTheme: null,
    content: null,
    loading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'AI民俗讲堂' });
  },

  // 选择主题
  selectTheme(e) {
    const { theme } = e.currentTarget.dataset;
    this.setData({ selectedTheme: theme, content: null });
    this.generateContent(theme);
  },

  // 生成讲解内容
  generateContent(theme) {
    this.setData({ loading: true });

    // 模拟AI生成内容的延迟
    setTimeout(() => {
      const content = this.getThemeContent(theme);
      this.setData({ content, loading: false });
    }, 1500);
  },

  // 获取主题内容（模拟AI生成）
  getThemeContent(theme) {
    const contentMap = {
      'spring-festival': {
        origin: '春节起源于殷商时期年头岁尾的祭神祭祖活动，是中国最隆重的传统节日。春节的历史可以追溯到4000多年前，最初是为了庆祝丰收和祈求新的一年风调雨顺。',
        customs: '春节的传统习俗包括：贴春联、放鞭炮、吃年夜饭、守岁、拜年、发压岁钱等。这些习俗都有着深厚的文化内涵，体现了中华民族对团圆、和谐、繁荣的向往。',
        poetry: '关于春节的诗词有很多，如王安石的《元日》："爆竹声中一岁除，春风送暖入屠苏。千门万户曈曈日，总把新桃换旧符。" 这首诗描绘了春节的热闹景象和人们辞旧迎新的喜悦心情。',
        meaning: '春节象征着团圆、和谐、繁荣，是中华民族凝聚力的重要体现。它不仅是一个家庭团聚的节日，也是传承和弘扬中华民族优秀传统文化的重要载体。'
      },
      'mid-autumn': {
        origin: '中秋节起源于古代对月的崇拜，是中国传统的团圆节日。中秋节的历史可以追溯到周朝，最初是为了庆祝丰收和祭祀月亮。',
        customs: '中秋节的传统习俗包括：赏月、吃月饼、燃灯、猜灯谜等。这些习俗都有着深厚的文化内涵，体现了中华民族对团圆、美满、和谐的向往。',
        poetry: '关于中秋节的诗词有很多，如苏轼的《水调歌头·明月几时有》："但愿人长久，千里共婵娟。" 这首词表达了人们对远方亲人的思念和对团圆的渴望。',
        meaning: '中秋节象征着团圆、美满、和谐，表达了人们对家人团聚的美好愿望。它不仅是一个家庭团聚的节日，也是传承和弘扬中华民族优秀传统文化的重要载体。'
      },
      'qingming': {
        origin: '清明节起源于古代的寒食节，是中国传统的祭祀节日。清明节的历史可以追溯到周朝，最初是为了纪念介子推。',
        customs: '清明节的传统习俗包括：扫墓祭祖、踏青、植树、放风筝等。这些习俗都有着深厚的文化内涵，体现了中华民族对祖先的敬意和对春天的热爱。',
        poetry: '关于清明节的诗词有很多，如杜牧的《清明》："清明时节雨纷纷，路上行人欲断魂。借问酒家何处有？牧童遥指杏花村。" 这首诗描绘了清明节的景象和人们的心情。',
        meaning: '清明节表达对祖先的敬意和思念，同时也是迎接春天的重要节日。它不仅是一个祭祀祖先的节日，也是传承和弘扬中华民族优秀传统文化的重要载体。'
      },
      'dragon-boat': {
        origin: '端午节起源于对屈原的纪念，是中国传统的节日。端午节的历史可以追溯到战国时期，最初是为了纪念投江自尽的屈原。',
        customs: '端午节的传统习俗包括：赛龙舟、吃粽子、挂艾草、佩香囊等。这些习俗都有着深厚的文化内涵，体现了中华民族对屈原的怀念和对健康的追求。',
        poetry: '关于端午节的诗词有很多，如屈原的《离骚》："路漫漫其修远兮，吾将上下而求索。" 这句诗表达了屈原对理想的追求和对国家的热爱。',
        meaning: '端午节表达对屈原的怀念，同时也是驱邪避灾的重要节日。它不仅是一个纪念屈原的节日，也是传承和弘扬中华民族优秀传统文化的重要载体。'
      },
      'double-ninth': {
        origin: '重阳节起源于古代的祭祀活动，是中国传统的节日。重阳节的历史可以追溯到战国时期，最初是为了祈求健康长寿。',
        customs: '重阳节的传统习俗包括：登高、赏菊、饮菊花酒、插茱萸等。这些习俗都有着深厚的文化内涵，体现了中华民族对健康长寿的向往。',
        poetry: '关于重阳节的诗词有很多，如王维的《九月九日忆山东兄弟》："独在异乡为异客，每逢佳节倍思亲。遥知兄弟登高处，遍插茱萸少一人。" 这首诗表达了诗人对家乡和亲人的思念之情。',
        meaning: '重阳节象征着健康长寿，表达了人们对老人的尊敬和对健康的追求。它不仅是一个传统节日，也是传承和弘扬中华民族优秀传统文化的重要载体。'
      },
      'lantern': {
        origin: '元宵节起源于古代的祭祀活动，是中国传统的节日。元宵节的历史可以追溯到汉朝，最初是为了庆祝新年的第一个满月。',
        customs: '元宵节的传统习俗包括：赏花灯、吃元宵、猜灯谜、舞龙舞狮等。这些习俗都有着深厚的文化内涵，体现了中华民族对团圆、美满、和谐的向往。',
        poetry: '关于元宵节的诗词有很多，如辛弃疾的《青玉案·元夕》："众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。" 这首词描绘了元宵节的热闹景象和人们的情感。',
        meaning: '元宵节象征着团圆、美满、和谐，是春节的延续和结束。它不仅是一个传统节日，也是传承和弘扬中华民族优秀传统文化的重要载体。'
      }
    };

    return contentMap[theme] || {
      origin: '暂无相关信息',
      customs: '暂无相关信息',
      poetry: '暂无相关信息',
      meaning: '暂无相关信息'
    };
  },

  // 刷新讲解内容
  refreshContent() {
    if (this.data.selectedTheme) {
      this.generateContent(this.data.selectedTheme);
    }
  },

  // 语音讲解
  playVoice() {
    if (this.data.content) {
      wx.showToast({
        title: '语音讲解功能开发中',
        icon: 'none'
      });
    }
  },

  onShareAppMessage() {
    return {
      title: 'AI民俗讲堂 - AI解读民俗文化内涵',
      path: '/mingsu/pages/ai-lecture/ai-lecture'
    };
  }
});