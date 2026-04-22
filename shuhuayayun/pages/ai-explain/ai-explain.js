// shuhuayayun/pages/ai-explain/ai-explain.js
Page({
  data: {
    works: [
      {
        id: 1,
        name: '兰亭集序',
        author: '王羲之',
        type: 'calligraphy'
      },
      {
        id: 2,
        name: '祭侄文稿',
        author: '颜真卿',
        type: 'calligraphy'
      },
      {
        id: 3,
        name: '九成宫醴泉铭',
        author: '欧阳询',
        type: 'calligraphy'
      },
      {
        id: 4,
        name: '寒食帖',
        author: '苏轼',
        type: 'calligraphy'
      },
      {
        id: 5,
        name: '千里江山图',
        author: '王希孟',
        type: 'painting'
      },
      {
        id: 6,
        name: '清明上河图',
        author: '张择端',
        type: 'painting'
      },
      {
        id: 7,
        name: '富春山居图',
        author: '黄公望',
        type: 'painting'
      },
      {
        id: 8,
        name: '洛神赋图',
        author: '顾恺之',
        type: 'painting'
      }
    ],
    selectedWork: null,
    explanation: null,
    loading: false,
    error: null
  },
  
  onLoad: function() {
    console.log('AI书画智能讲解页面加载');
  },
  
  selectWork: function(e) {
    const work = e.currentTarget.dataset.work;
    this.setData({
      selectedWork: work,
      explanation: null,
      error: null
    });
  },
  
  generateExplanation: function() {
    if (!this.data.selectedWork) {
      wx.showToast({
        title: '请先选择一幅作品',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      loading: true,
      error: null
    });
    
    // 模拟AI调用，实际项目中应调用云函数
    setTimeout(() => {
      const explanation = this.generateMockExplanation(this.data.selectedWork);
      this.setData({
        explanation: explanation,
        loading: false
      });
    }, 1500);
  },
  
  generateMockExplanation: function(work) {
    const explanations = {
      '兰亭集序': {
        background: '《兰亭集序》是东晋书法家王羲之在永和九年（公元353年）三月初三，与友人在会稽山阴的兰亭雅集时所作。当时王羲之与谢安、孙绰等41人在此饮酒赋诗，汇诗成集，王羲之即兴挥毫为诗集作序。',
        author: '王羲之（303-361年），字逸少，东晋时期著名书法家，有"书圣"之称。他的书法兼善隶、草、楷、行各体，精研体势，心摹手追，广采众长，备精诸体，冶于一炉，摆脱了汉魏笔风，自成一家，影响深远。',
        techniques: '《兰亭集序》笔法精妙，点画清圆，线条流畅，结构多变，章法自然。王羲之运用中锋行笔，笔势委婉含蓄，遒美健秀，每一字都有其独特的姿态，被誉为"天下第一行书"。',
        style: '作品风格平和自然，风神盖代，体现了王羲之"以形写神"的书法理念。字体大小错落有致，行距疏密得当，整体布局和谐统一，展现了晋人崇尚自然、追求自由的精神境界。',
        influence: '《兰亭集序》对后世书法发展影响深远，被历代书法家视为行书的典范。唐太宗李世民对其推崇备至，曾命人临摹多本，使这一作品得以广泛传播。它不仅是书法艺术的瑰宝，也是中国文化史上的重要文献。'
      },
      '千里江山图': {
        background: '《千里江山图》是北宋画家王希孟在政和三年（公元1113年）所作，当时他年仅18岁。这幅画是王希孟献给宋徽宗赵佶的作品，描绘了中国南方的锦绣河山。',
        author: '王希孟（1096-1119年），北宋画家，宋徽宗赵佶的学生。他在短暂的一生中只留下了《千里江山图》这一传世杰作，展现了非凡的艺术天赋。',
        techniques: '《千里江山图》采用青绿山水画技法，构图宏大，层次分明。画家运用矿物颜料石青、石绿，画面绚丽多彩，笔法精细，山石、树木、人物、建筑等细节描绘入微。',
        style: '作品风格雄浑壮阔，气象万千，体现了北宋时期山水画的高度成就。画面中峰峦叠嶂，江河浩渺，村落棋布，舟楫往来，展现了祖国山河的壮丽景色。',
        influence: '《千里江山图》是中国山水画史上的重要作品，对后世青绿山水画的发展产生了深远影响。它不仅是艺术珍品，也是研究北宋时期社会、经济、文化的重要资料。'
      }
    };
    
    return explanations[work.name] || {
      background: `这是${work.name}的创作背景。`,
      author: `这是${work.author}的介绍。`,
      techniques: `这是${work.name}的笔墨技法解析。`,
      style: `这是${work.name}的艺术风格分析。`,
      influence: `这是${work.name}的后世影响。`
    };
  }
});