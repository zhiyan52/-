Page({
  data: {
    userQuestion: '',
    aiAnswer: '',
    loading: false,
    showResponse: false,
    faqList: [
      '京剧的起源是什么？',
      '苏绣有什么特点？',
      '什么是非物质文化遗产？',
      '太极拳有哪些流派？',
      '青花瓷是怎么制作的？'
    ],
    answerDB: {
      '京剧的起源是什么？': '京剧形成于清代乾隆年间，距今已有200多年历史。乾隆五十五年（1790年），四大徽班陆续进京，他们与来自湖北的汉调艺人合作，同时接受了昆曲、秦腔的部分剧目、曲调和表演方法，通过不断的交流、融合，最终形成了京剧。',
      '苏绣有什么特点？': '苏绣是中国四大名绣之一，具有以下特点：1. 针法精细，有平针、套针、打籽针等几十种针法；2. 色彩典雅，配色和谐自然；3. 题材广泛，包括山水、花鸟、人物等；4. 绣工细致，有"平、齐、细、密、匀、顺、和"八大特点。',
      '什么是非物质文化遗产？': '非物质文化遗产是指各种以非物质形态存在的与群众生活密切相关、世代相承的传统文化表现形式，包括：1. 口头传统和表现形式；2. 传统表演艺术；3. 民俗活动、礼仪、节庆；4. 有关自然界和宇宙的知识和实践；5. 传统手工艺技能。',
      '太极拳有哪些流派？': '太极拳主要流派有：1. 陈式太极拳：最早的太极拳流派，动作刚柔相济；2. 杨式太极拳：动作舒展大方，流传最广；3. 武式太极拳：动作紧凑，注重内功；4. 吴式太极拳：动作轻柔圆活；5. 孙式太极拳：融合形意、八卦特点。',
      '青花瓷是怎么制作的？': '青花瓷的制作工艺包括：1. 练泥：将瓷石和瓷土混合炼制；2. 拉坯：制成各种器型；3. 施釉：在坯体上施釉；4. 绘画：用钴料在坯体上绘制图案；5. 烧制：在1300度左右的高温中一次烧成。青花瓷属于釉下彩瓷，色彩经久不退。'
    }
  },

  onLoad: function (options) {

  },

  inputChange: function (e) {
    this.setData({
      userQuestion: e.detail.value
    });
  },

  selectFAQ: function (e) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      userQuestion: question
    });
    this.sendQuestion();
  },

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
      showResponse: true,
      aiAnswer: ''
    });

    setTimeout(() => {
      const answer = this.data.answerDB[question] || '非物质文化遗产是中华民族宝贵的文化财富，承载着深厚的历史记忆和文化内涵。每一项非遗都凝聚着历代传承人的智慧和心血。';
      this.setData({
        aiAnswer: answer,
        loading: false
      });
    }, 1500);
  }
});