// shuhuayayun/pages/works/works.js
Page({
  data: {
    activeTab: 'calligraphy', // 默认显示书法作品
    calligraphyWorks: [
      {
        id: 1,
        name: '兰亭集序',
        author: '王羲之',
        dynasty: '东晋',
        year: '公元353年',
        background: '王羲之与友人在兰亭雅集时所作，记录了聚会的盛况和对人生的感慨。',
        features: '笔法精妙，结构多变，章法自然，被称为"天下第一行书"。',
        status: '原作已佚，现存为唐代摹本，收藏于故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=兰亭集序 王羲之 书法作品 高清 水墨画风格&image_size=landscape_16_9'
      },
      {
        id: 2,
        name: '祭侄文稿',
        author: '颜真卿',
        dynasty: '唐代',
        year: '公元758年',
        background: '颜真卿为祭奠在安史之乱中牺牲的侄子颜季明而作。',
        features: '笔法雄浑，情感真挚，被称为"天下第二行书"。',
        status: '现收藏于台北故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=祭侄文稿 颜真卿 书法作品 高清 水墨画风格&image_size=landscape_16_9'
      },
      {
        id: 3,
        name: '九成宫醴泉铭',
        author: '欧阳询',
        dynasty: '唐代',
        year: '公元632年',
        background: '欧阳询为唐太宗李世民在九成宫发现醴泉而作。',
        features: '结构严谨，笔法险峻，被称为"天下第一楷书"。',
        status: '现存宋拓本，收藏于故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=九成宫醴泉铭 欧阳询 书法作品 高清 水墨画风格&image_size=landscape_16_9'
      },
      {
        id: 4,
        name: '寒食帖',
        author: '苏轼',
        dynasty: '宋代',
        year: '公元1082年',
        background: '苏轼被贬黄州时所作，表达了被贬后的凄凉心境。',
        features: '笔意奔放，结体跌宕，被称为"天下第三行书"。',
        status: '现收藏于台北故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=寒食帖 苏轼 书法作品 高清 水墨画风格&image_size=landscape_16_9'
      }
    ],
    paintingWorks: [
      {
        id: 1,
        name: '千里江山图',
        author: '王希孟',
        dynasty: '宋代',
        year: '公元1113年',
        background: '王希孟18岁时为宋徽宗所作，描绘了中国南方的锦绣河山。',
        features: '构图宏大，色彩绚丽，笔法精细，是宋代青绿山水画的代表作。',
        status: '现收藏于故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=千里江山图 王希孟 国画 高清 青绿山水&image_size=landscape_16_9'
      },
      {
        id: 2,
        name: '清明上河图',
        author: '张择端',
        dynasty: '宋代',
        year: '公元1101年',
        background: '描绘了北宋都城汴京（今开封）的繁华景象。',
        features: '构图严谨，人物众多，细节丰富，是宋代风俗画的代表作。',
        status: '现收藏于故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=清明上河图 张择端 国画 高清 宋代风俗画&image_size=landscape_16_9'
      },
      {
        id: 3,
        name: '富春山居图',
        author: '黄公望',
        dynasty: '元代',
        year: '公元1350年',
        background: '黄公望晚年所作，描绘了富春江两岸的山水景色。',
        features: '笔法简练，意境深远，是元代山水画的代表作。',
        status: '分为《剩山图》和《无用师卷》两部分，分别收藏于浙江省博物馆和台北故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=富春山居图 黄公望 国画 高清 元代山水画&image_size=landscape_16_9'
      },
      {
        id: 4,
        name: '洛神赋图',
        author: '顾恺之',
        dynasty: '东晋',
        year: '公元348年-409年',
        background: '根据曹植的《洛神赋》创作，描绘了曹植与洛神相遇的场景。',
        features: '线条流畅，人物栩栩如生，是中国早期人物画的代表作。',
        status: '原作已佚，现存为宋代摹本，收藏于故宫博物院。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=洛神赋图 顾恺之 国画 高清 人物画&image_size=landscape_16_9'
      }
    ]
  },
  
  onLoad: function() {
    console.log('传世书画赏析库页面加载');
  },
  
  switchTab: function(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },
  
  viewWorkDetail: function(e) {
    const work = e.currentTarget.dataset.work;
    wx.navigateTo({
      url: `../work-detail/work-detail?work=${JSON.stringify(work)}`
    });
  }
});