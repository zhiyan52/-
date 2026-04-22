// shuhuayayun/pages/masters/masters.js
Page({
  data: {
    activeTab: 'calligraphy', // 默认显示书法名家
    calligraphyMasters: [
      {
        id: 1,
        name: '王羲之',
        dynasty: '东晋',
        introduction: '字逸少，东晋时期著名书法家，有"书圣"之称。',
        works: ['兰亭集序', '快雪时晴帖', '黄庭经'],
        style: '平和自然，笔势委婉含蓄，遒美健秀',
        influence: '其书法被历代推崇，对后世书法发展影响深远。'
      },
      {
        id: 2,
        name: '颜真卿',
        dynasty: '唐代',
        introduction: '字清臣，唐代中期杰出书法家，创立"颜体"楷书。',
        works: ['祭侄文稿', '多宝塔碑', '颜勤礼碑'],
        style: '结构方正茂密，笔画横轻竖重，笔力雄强圆厚',
        influence: '颜体楷书对后世影响巨大，成为书法史上的重要流派。'
      },
      {
        id: 3,
        name: '柳公权',
        dynasty: '唐代',
        introduction: '字诚悬，唐代书法家，与颜真卿并称"颜柳"。',
        works: ['玄秘塔碑', '神策军碑', '金刚经刻石'],
        style: '结体紧密，笔画锋棱明显，骨力遒劲',
        influence: '柳体楷书成为后世学习的典范，与颜体并称"颜筋柳骨"。'
      },
      {
        id: 4,
        name: '欧阳询',
        dynasty: '唐代',
        introduction: '字信本，唐代初期书法家，楷书四大家之一。',
        works: ['九成宫醴泉铭', '皇甫诞碑', '化度寺碑'],
        style: '结构严谨，笔力险峻，被称为"欧体"',
        influence: '欧体楷书为后世楷书典范，对书法发展影响深远。'
      },
      {
        id: 5,
        name: '赵孟頫',
        dynasty: '元代',
        introduction: '字子昂，元代著名书法家，楷书四大家之一。',
        works: ['胆巴碑', '玄妙观重修三门记', '洛神赋'],
        style: '圆润清秀，结构端正，笔法流畅',
        influence: '赵体书法对明清书法影响深远，被称为"赵体"。'
      },
      {
        id: 6,
        name: '苏轼',
        dynasty: '宋代',
        introduction: '字子瞻，号东坡居士，宋代文学家、书法家。',
        works: ['寒食帖', '赤壁赋', '祭黄几道文'],
        style: '笔意奔放，结体跌宕，天真烂漫',
        influence: '苏轼书法对宋代尚意书风影响巨大，为"宋四家"之首。'
      }
    ],
    paintingMasters: [
      {
        id: 1,
        name: '顾恺之',
        dynasty: '东晋',
        introduction: '字长康，东晋时期著名画家，有"才绝、画绝、痴绝"之称。',
        works: ['洛神赋图', '女史箴图', '列女仁智图'],
        style: '线条如春蚕吐丝，人物栩栩如生，注重传神',
        influence: '顾恺之的绘画理论和实践对后世中国画发展影响深远。'
      },
      {
        id: 2,
        name: '吴道子',
        dynasty: '唐代',
        introduction: '字道子，唐代著名画家，被尊称为"画圣"。',
        works: ['送子天王图', '八十七神仙卷', '地狱变相图'],
        style: '线条流畅，富有动感，人物衣纹飘举',
        influence: '吴道子的绘画风格被称为"吴带当风"，对后世绘画影响巨大。'
      },
      {
        id: 3,
        name: '王维',
        dynasty: '唐代',
        introduction: '字摩诘，唐代诗人、画家，被称为"诗中有画，画中有诗"。',
        works: ['辋川图', '雪溪图', '江山雪霁图'],
        style: '水墨渲染，意境深远，诗画结合',
        influence: '王维开创了水墨山水画派，对后世文人画影响深远。'
      },
      {
        id: 4,
        name: '徐渭',
        dynasty: '明代',
        introduction: '字文长，明代著名画家、文学家，号青藤居士。',
        works: ['墨葡萄图', '榴实图', '牡丹蕉石图'],
        style: '笔势狂放，水墨淋漓，不求形似求神似',
        influence: '徐渭的大写意花鸟画对后世八大山人、石涛等影响深远。'
      },
      {
        id: 5,
        name: '八大山人',
        dynasty: '清代',
        introduction: '朱耷，明末清初画家，明太祖朱元璋后裔。',
        works: ['荷花水鸟图', '孔雀图', '鹌鹑图'],
        style: '笔墨简练，造型夸张，意境冷寂',
        influence: '八大山人的绘画对近现代中国画影响巨大，被视为大写意花鸟画的高峰。'
      },
      {
        id: 6,
        name: '郑板桥',
        dynasty: '清代',
        introduction: '郑燮，字克柔，号板桥，清代书画家、文学家。',
        works: ['竹石图', '兰竹图', '墨竹图'],
        style: '书法入画，笔墨洒脱，构图新颖',
        influence: '郑板桥的兰竹画对后世文人画影响深远，被视为"扬州八怪"的代表。'
      }
    ]
  },
  
  onLoad: function() {
    console.log('书画名家图鉴页面加载');
  },
  
  switchTab: function(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },
  
  viewMasterDetail: function(e) {
    const master = e.currentTarget.dataset.master;
    wx.navigateTo({
      url: `../master-detail/master-detail?master=${JSON.stringify(master)}`
    });
  }
});