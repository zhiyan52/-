// 书画盲盒·每日一赏页面逻辑
Page({
  data: {
    showContent: false,
    blindBoxContent: {},
    // 盲盒数据
    artworks: [
      { name: '兰亭集序', author: '王羲之', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/lanting.jpg' },
      { name: '祭侄文稿', author: '颜真卿', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/jizhi.jpg' },
      { name: '千里江山图', author: '王希孟', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/qianli.jpg' },
      { name: '富春山居图', author: '黄公望', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/fuchun.jpg' },
      { name: '清明上河图', author: '张择端', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/qingming.jpg' }
    ],
    quotes: [
      '书为心画，画为心声',
      '意在笔先，神在笔后',
      '书画同源，心手相应',
      '画贵神似，不贵形似',
      '胸有成竹，下笔如有神',
      '笔落惊风雨，诗成泣鬼神',
      '远看山有色，近听水无声',
      '书到用时方恨少，事非经过不知难',
      '画中有诗，诗中有画',
      '书法者，心法也'
    ],
    facts: [
      '王羲之的《兰亭集序》被誉为"天下第一行书"，但原作已失传，现在看到的都是摹本。',
      '颜真卿的《祭侄文稿》是在极度悲痛的情况下写成的，被誉为"天下第二行书"。',
      '王希孟创作《千里江山图》时只有18岁，这幅画是他唯一的传世作品。',
      '《富春山居图》在清代被火烧成两段，现在分别收藏在浙江省博物馆和台北故宫博物院。',
      '张择端的《清明上河图》描绘了北宋都城汴京的繁华景象，是研究北宋社会的重要史料。',
      '吴道子被后人尊为"画圣"，他的绘画风格被称为"吴带当风"。',
      '赵孟頫是元代书法的代表人物，与欧阳询、颜真卿、柳公权并称"楷书四大家"。',
      '徐渭是明代著名的书画家，他的大写意花鸟画对后世影响很大。',
      '八大山人是明末清初的画家，他的作品风格简约含蓄，意境深远。',
      '董其昌是明代著名的书画家和书画理论家，他提出了"南北宗"论。'
    ],
    techniques: [
      '中锋行笔：笔锋在笔画中间运行，写出的线条圆润饱满，是书法的基本笔法。',
      '侧锋行笔：笔锋在笔画一侧运行，写出的线条险峻有力，常用于行书和草书。',
      '提按：通过笔锋的提起和按下，控制线条的粗细变化，增强书法的表现力。',
      '转折：笔画转折处的处理，有方折和圆转之分，体现不同的书法风格。',
      '藏锋：笔锋藏而不露，写出的线条含蓄内敛，常用于篆书和楷书。',
      '露锋：笔锋外露，写出的线条锋芒毕露，常用于草书和行书。',
      '墨分五色：指墨的浓、淡、干、湿、焦五种变化，丰富画面的层次感。',
      '皴法：山水画中表现山石纹理的技法，有斧劈皴、披麻皴等多种类型。',
      '留白：画面中留出空白，营造意境，增强作品的艺术感染力。',
      '构图：画面元素的安排和布局，是绘画的重要组成部分。'
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '书画盲盒' });
  },

  // 打开盲盒
  openBlindBox() {
    // 随机生成盲盒内容
    const randomArtwork = this.data.artworks[Math.floor(Math.random() * this.data.artworks.length)];
    const randomQuote = this.data.quotes[Math.floor(Math.random() * this.data.quotes.length)];
    const randomFact = this.data.facts[Math.floor(Math.random() * this.data.facts.length)];
    const randomTechnique = this.data.techniques[Math.floor(Math.random() * this.data.techniques.length)];

    const blindBoxContent = {
      artwork: randomArtwork,
      quote: randomQuote,
      fact: randomFact,
      technique: randomTechnique
    };

    this.setData({
      blindBoxContent,
      showContent: true
    });
  }
});