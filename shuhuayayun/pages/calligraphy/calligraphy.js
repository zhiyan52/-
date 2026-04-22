// shuhuayayun/pages/calligraphy/calligraphy.js
Page({
  data: {
    scripts: [
      {
        id: 1,
        name: '篆书',
        origin: '起源于商代甲骨文，成熟于西周金文',
        development: '经历了甲骨文、金文、大篆、小篆等阶段，是中国最早的成熟文字系统。',
        features: '笔画匀圆，结构整齐，线条流畅，具有古朴典雅的艺术风格。',
        representatives: [
          { name: '李斯', works: ['峄山碑', '泰山刻石'] },
          { name: '李阳冰', works: ['三坟记', '城隍庙碑'] }
        ],
        recognition: '字形呈长方形，笔画粗细一致，多为曲线，没有明显的顿笔和提按。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=篆书 书法 李斯 峄山碑 高清&image_size=landscape_16_9'
      },
      {
        id: 2,
        name: '隶书',
        origin: '起源于战国时期，成熟于汉代',
        development: '由篆书简化演变而来，是汉字发展史上的重要转折点，奠定了现代汉字的基础。',
        features: '笔画方折，结构扁平，蚕头燕尾，一波三折，具有质朴率真的艺术风格。',
        representatives: [
          { name: '蔡邕', works: ['熹平石经'] },
          { name: '曹全', works: ['曹全碑'] },
          { name: '张迁', works: ['张迁碑'] }
        ],
        recognition: '字形呈扁方形，横画长而竖画短，起笔蚕头，收笔燕尾，具有明显的波磔。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=隶书 书法 曹全碑 高清&image_size=landscape_16_9'
      },
      {
        id: 3,
        name: '楷书',
        origin: '起源于汉末，成熟于唐代',
        development: '由隶书演变而来，是现代汉字的标准字体，也是学习书法的基础。',
        features: '笔画规范，结构方正，横平竖直，撇捺舒展，具有端庄典雅的艺术风格。',
        representatives: [
          { name: '欧阳询', works: ['九成宫醴泉铭'] },
          { name: '颜真卿', works: ['颜勤礼碑'] },
          { name: '柳公权', works: ['玄秘塔碑'] },
          { name: '赵孟頫', works: ['胆巴碑'] }
        ],
        recognition: '字形呈正方形，笔画清晰，结构严谨，每个笔画都有明确的起止。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=楷书 书法 欧阳询 九成宫 高清&image_size=landscape_16_9'
      },
      {
        id: 4,
        name: '行书',
        origin: '起源于汉末，成熟于晋代',
        development: '介于楷书和草书之间，是最常用的手写字体，具有实用性和艺术性。',
        features: '笔画流畅，结构灵活，牵丝连带，行云流水，具有自然洒脱的艺术风格。',
        representatives: [
          { name: '王羲之', works: ['兰亭集序'] },
          { name: '颜真卿', works: ['祭侄文稿'] },
          { name: '苏轼', works: ['寒食帖'] }
        ],
        recognition: '字形介于楷书和草书之间，笔画连贯，有牵丝，但仍保持字形的可识别性。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=行书 书法 王羲之 兰亭集序 高清&image_size=landscape_16_9'
      },
      {
        id: 5,
        name: '草书',
        origin: '起源于汉代，成熟于唐代',
        development: '由隶书简化演变而来，是书法艺术的最高表现形式，追求笔画的飞动和气势。',
        features: '笔画连绵，结构简省，笔势奔放，一气呵成，具有豪放洒脱的艺术风格。',
        representatives: [
          { name: '张旭', works: ['肚痛帖', '古诗四帖'] },
          { name: '怀素', works: ['自叙帖', '食鱼帖'] },
          { name: '王铎', works: ['草书诗卷'] }
        ],
        recognition: '字形简化，笔画连绵不断，有时难以辨认，注重整体的气势和韵律。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=草书 书法 张旭 古诗四帖 高清&image_size=landscape_16_9'
      }
    ],
    activeScript: null
  },
  
  onLoad: function() {
    console.log('书法字体科普页面加载');
    // 默认显示第一个书体
    this.setData({
      activeScript: this.data.scripts[0]
    });
  },
  
  selectScript: function(e) {
    const script = e.currentTarget.dataset.script;
    this.setData({
      activeScript: script
    });
  }
});