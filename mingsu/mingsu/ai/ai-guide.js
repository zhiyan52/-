Page({
  data: {
    selectedCustom: null,
    aiResponse: '',
    loading: false,
    customs: {
      'spring-festival': {
        name: '春节',
        desc: '中国最隆重的传统节日，象征着团圆与新生，已有4000多年历史。'
      },
      'mid-autumn': {
        name: '中秋节',
        desc: '中国传统节日，象征团圆与丰收，有赏月、吃月饼的习俗。'
      },
      'dragon-boat': {
        name: '端午节',
        desc: '纪念屈原的传统节日，有赛龙舟、吃粽子的习俗。'
      },
      'double-ninth': {
        name: '重阳节',
        desc: '中国传统节日，有登高、赏菊、插茱萸的习俗，寓意健康长寿。'
      }
    }
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  // 选择民俗
  selectCustom: function (e) {
    const customId = e.currentTarget.dataset.custom;
    const custom = this.data.customs[customId];

    this.setData({
      selectedCustom: custom,
      aiResponse: '',
      loading: true
    });

    // 模拟AI生成讲解
    setTimeout(() => {
      this.generateAIResponse(custom);
    }, 1000);
  },

  // 生成AI讲解
  generateAIResponse: function (custom) {
    // 模拟AI响应内容
    const responses = {
      '春节': '春节，是中国最重要的传统节日，象征着团圆与新生，已有4000多年历史。春节的主要习俗有贴春联、贴福字、放鞭炮、吃年夜饭、拜年、收压岁钱等。在春节期间，人们会进行各种庆祝活动，祈求新的一年平安、幸福、吉祥。',
      '中秋节': '中秋节，是中国传统节日，象征团圆与丰收，有赏月、吃月饼、赏桂花、饮桂花酒等习俗。中秋节的历史可以追溯到古代的祭月习俗，后来逐渐发展成为一个富有诗意和浪漫色彩的节日。',
      '端午节': '端午节，是纪念屈原的传统节日，有赛龙舟、吃粽子的习俗。端午节的历史悠久，相传是为了纪念爱国诗人屈原。在端午节期间，人们会进行龙舟竞渡、挂艾草、佩戴香囊等活动，祈求平安健康。',
      '重阳节': '重阳节，是中国传统节日，有登高望远、赏菊、插茱萸、饮菊花酒、吃重阳糕的习俗，寓意健康长寿。重阳节的历史悠久，是中国民间的传统节日，人们通过各种活动表达对健康长寿的美好祝愿。'
    };

    this.setData({
      aiResponse: responses[custom.name] || 'AI正在学习更多关于这个民俗的知识...',
      loading: false
    });
  },

  // 开始导览
  startGuide: function () {
    if (!this.data.selectedCustom) {
      wx.showToast({
        title: '请先选择民俗',
        icon: 'none'
      });
      return;
    }

    wx.showToast({
      title: '开始导览',
      icon: 'success'
    });

    // 这里可以添加语音播放逻辑
    console.log('开始导览:', this.data.selectedCustom.name);
  },

  // 停止导览
  stopGuide: function () {
    wx.showToast({
      title: '停止导览',
      icon: 'success'
    });

    // 这里可以添加停止语音播放逻辑
    console.log('停止导览');
  }
});
