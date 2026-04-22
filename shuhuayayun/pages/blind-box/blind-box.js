// shuhuayayun/pages/blind-box/blind-box.js
Page({
  data: {
    blindBox: null,
    opened: false,
    loading: false,
    
    // 作品数据
    works: [
      {
        name: '兰亭集序',
        author: '王羲之',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=兰亭集序 王羲之 书法 小图&image_size=square'
      },
      {
        name: '千里江山图',
        author: '王希孟',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=千里江山图 王希孟 国画 小图&image_size=square'
      },
      {
        name: '清明上河图',
        author: '张择端',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=清明上河图 张择端 国画 小图&image_size=square'
      },
      {
        name: '富春山居图',
        author: '黄公望',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=富春山居图 黄公望 国画 小图&image_size=square'
      }
    ],
    
    // 美学语录
    quotes: [
      "书画之妙，当以神会，难可以形器求也",
      "外师造化，中得心源",
      "意在笔先，画尽意在",
      "书画贵有古意，若无古意，虽工无益",
      "笔意贵淡不贵艳，贵畅不贵紧",
      "书之妙道，神采为上，形质次之",
      "画者，文之极也",
      "诗中有画，画中有诗"
    ],
    
    // 冷知识
    facts: [
      "王羲之的《兰亭集序》被誉为'天下第一行书'，但原作已佚，现存为唐代摹本",
      "《千里江山图》是王希孟18岁时的作品，也是他唯一的传世之作",
      "《清明上河图》长528.7厘米，宽24.8厘米，描绘了北宋都城汴京的繁华景象",
      "《富春山居图》分为《剩山图》和《无用师卷》两部分，分别收藏于浙江省博物馆和台北故宫博物院",
      "颜真卿的《祭侄文稿》因情感真挚被称为'天下第二行书'",
      "欧阳询的《九成宫醴泉铭》是楷书的典范之作，被誉为'天下第一楷书'"
    ],
    
    // 笔墨技法
    techniques: [
      "中锋行笔：笔锋始终保持在笔画的中央，写出的线条圆浑有力",
      "侧锋行笔：笔锋倾斜，接触纸面的侧面，写出的线条富有变化",
      "藏锋：起笔和收笔时将笔锋藏入笔画中，使笔画显得含蓄内敛",
      "露锋：起笔和收笔时笔锋外露，使笔画显得锋芒毕露",
      "提按：通过手腕的提按动作，控制笔画的粗细变化",
      "顿挫：在笔画的转折处停顿，使笔画显得有节奏感"
    ]
  },
  
  onLoad: function() {
    console.log('书画盲盒页面加载');
  },
  
  openBlindBox: function() {
    this.setData({
      loading: true,
      opened: false
    });
    
    // 模拟开盲盒过程
    setTimeout(() => {
      const randomWork = this.data.works[Math.floor(Math.random() * this.data.works.length)];
      const randomQuote = this.data.quotes[Math.floor(Math.random() * this.data.quotes.length)];
      const randomFact = this.data.facts[Math.floor(Math.random() * this.data.facts.length)];
      const randomTechnique = this.data.techniques[Math.floor(Math.random() * this.data.techniques.length)];
      
      this.setData({
        blindBox: {
          work: randomWork,
          quote: randomQuote,
          fact: randomFact,
          technique: randomTechnique
        },
        opened: true,
        loading: false
      });
    }, 2000);
  },
  
  openAgain: function() {
    this.setData({
      blindBox: null,
      opened: false
    });
  }
});