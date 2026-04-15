Page({
  data: {
    userQuestion: '',
    aiAnswer: '',
    loading: false,
    showResponse: false
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  // 输入框内容变化
  inputChange: function (e) {
    this.setData({
      userQuestion: e.detail.value
    });
  },

  // 选择常见问题
  selectFAQ: function (e) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      userQuestion: question
    });
    this.sendQuestion();
  },

  // 发送问题
  sendQuestion: function () {
    const question = this.data.userQuestion.trim();

    if (!question) {
      wx.showToast({
        title: '请输入问题',
        icon: 'none'
      });
      return;
    }

    this.setData({
      loading: true,
      showResponse: true
    });

    // 模拟AI生成回答
    setTimeout(() => {
      this.generateAIAnswer(question);
    }, 1500);
  },

  // 生成AI回答
  generateAIAnswer: function (question) {
    // 模拟AI回答内容
    const answers = {
      '故宫有多少年历史？': '故宫始建于明永乐四年（1406年），永乐十八年（1420年）建成，至今已有600多年的历史。它是中国明清两代的皇家宫殿，是世界上现存规模最大、保存最为完整的木质结构古建筑之一。',
      '苏州园林有什么特点？': '苏州园林的特点包括：1. 小巧精致，善于利用有限空间创造无限意境；2. 因地制宜，巧妙借用自然景观；3. 建筑与自然和谐统一；4. 布局精巧，层次分明；5. 文化内涵丰富，体现了中国传统哲学思想。',
      '古建筑的榫卯结构是什么？': '榫卯结构是中国传统建筑中一种独特的连接方式，不用钉子和胶水，而是通过榫头和卯眼的精密配合来连接木材。这种结构不仅牢固耐用，而且具有一定的弹性，能够承受地震等自然灾害，体现了中国古代工匠的智慧。',
      '天坛的建筑意义是什么？': '天坛是明清两代皇帝祭天、祈求五谷丰登的场所，其建筑意义包括：1. 体现了中国古代"天人合一"的哲学思想；2. 展示了中国古代高超的建筑技艺；3. 反映了中国古代对自然的敬畏和崇拜；4. 是中国古代礼制文化的重要载体。'
    };

    // 通用回答
    const defaultAnswer = '中国古建筑是中华民族宝贵的文化遗产，承载着丰富的历史和文化内涵。它们不仅是建筑艺术的杰作，也是中国传统文化的重要组成部分。';

    this.setData({
      aiAnswer: answers[question] || defaultAnswer,
      loading: false
    });
  }
});