// shuhua/shuhua/pages/masters/masters.js
Page({
  data: {
    activeTab: 'calligraphy', // 默认显示书法名家
    calligraphyMasters: [
      {
        id: 1,
        name: '王羲之',
        dynasty: '东晋',
        desc: '书圣，擅长行书，代表作《兰亭集序》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/4a91aafeb3baca43da8a8295ad3baa3c.jpg',
        detail: '王羲之（303年—361年），字逸少，东晋时期书法家，有“书圣”之称。琅琊临沂（今山东临沂）人，后迁会稽山阴（今浙江绍兴）。其书法兼善隶、草、楷、行各体，精研体势，心摹手追，广采众长，备精诸体，冶于一炉，摆脱了汉魏笔风，自成一家，影响深远。代表作《兰亭集序》被誉为“天下第一行书”。'
      },
      {
        id: 2,
        name: '颜真卿',
        dynasty: '唐代',
        desc: '颜体创始人，擅长楷书，代表作《颜勤礼碑》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/bdd70adfa250a683221a109f7dd1b54d.png',
        detail: '颜真卿（709年—784年），字清臣，唐代名臣、书法家。京兆万年（今陕西西安）人。其书法精妙，擅长行、楷。初学褚遂良，后师从张旭，得其笔法。其正楷端庄雄伟，行书气势遒劲，创“颜体”楷书，对后世影响很大。代表作有《颜勤礼碑》《多宝塔碑》《祭侄文稿》等。'
      },
      {
        id: 3,
        name: '柳公权',
        dynasty: '唐代',
        desc: '柳体创始人，擅长楷书，代表作《玄秘塔碑》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/c969179520a7d83a8e3561c37b1c0a50.jpg',
        detail: '柳公权（778年—865年），字诚悬，唐代书法家、诗人。京兆华原（今陕西铜川市耀州区）人。其书法以楷书著称，与颜真卿齐名，人称“颜柳”，又与欧阳询、颜真卿、赵孟頫并称“楷书四大家”。柳公权的书法结体紧密，骨力遒劲，以瘦劲著称，所写楷书，体势劲媚，骨力道健，人称“柳体”。代表作有《玄秘塔碑》《神策军碑》等。'
      },
      {
        id: 4,
        name: '欧阳询',
        dynasty: '唐代',
        desc: '欧体创始人，擅长楷书，代表作《九成宫醴泉铭》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/e6a0d22bf0bf31cabc282456c7ee0062.jpg',
        detail: '欧阳询（557年—641年），字信本，唐代书法家。潭州临湘（今湖南长沙）人。其书法笔力险峻，结构独异，后人称为“欧体”。欧阳询与虞世南、褚遂良、薛稷三位并称初唐四大家。因其子欧阳通亦通善书法，故其又称“大欧”。代表作楷书有《九成宫醴泉铭》《皇甫诞碑》《化度寺碑》，行书有《仲尼梦奠帖》《行书千字文》。'
      },
      {
        id: 5,
        name: '赵孟頫',
        dynasty: '元代',
        desc: '赵体创始人，擅长楷书，代表作《胆巴碑》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/574cd1b73c87aabe344867cac1e13cc6.jpg',
        detail: '赵孟頫（1254年—1322年），字子昂，号松雪道人，元代著名书法家、画家、诗人。吴兴（今浙江湖州）人。赵孟頫博学多才，能诗善文，懂经济，工书法，精绘艺，擅金石，通律吕，解鉴赏。特别是书法和绘画成就最高，开创元代新画风，被称为“元人冠冕”。他善篆、隶、真、行、草书，尤以楷、行书著称于世。其书风遒媚、秀逸，结体严整、笔法圆熟，创“赵体”书，与欧阳询、颜真卿、柳公权并称“楷书四大家”。代表作有《胆巴碑》《玄妙观重修三门记》等。'
      }
    ],
    paintingMasters: [
      {
        id: 101,
        name: '顾恺之',
        dynasty: '东晋',
        desc: '画圣，擅长人物画，代表作《洛神赋图》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/90ab4bd1aab4a4a9bc24bc33e99cf6c9.jpg',
        detail: '顾恺之（348年—409年），字长康，东晋时期画家、诗人。晋陵无锡（今江苏无锡）人。顾恺之博学多才，擅诗赋、书法，尤善绘画。精于人像、佛像、禽兽、山水等，时人称之为三绝：画绝、文绝和痴绝。顾恺之作画，意在传神，其“迁想妙得”“以形写神”等论点，为中国传统绘画的发展奠定了基础。代表作有《洛神赋图》《女史箴图》等。'
      },
      {
        id: 102,
        name: '吴道子',
        dynasty: '唐代',
        desc: '画圣，擅长人物画，代表作《送子天王图》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/40f2038d647056bd11326a54da6007f4.jpg',
        detail: '吴道子（约680年—759年），又名道玄，唐代著名画家，画史尊称画圣。阳翟（今河南禹州）人。吴道子擅长佛道、神鬼、人物、山水、鸟兽、草木、楼阁等，尤精于佛道、人物，长于壁画创作。其绘画具有独特风格，所画人物衣褶飘举，线条遒劲，人称莼菜条描，具有天衣飞扬、满壁风动的效果，被誉为“吴带当风”。代表作有《送子天王图》《八十七神仙卷》等。'
      },
      {
        id: 103,
        name: '王维',
        dynasty: '唐代',
        desc: '诗中有画，画中有诗，代表作《辋川图》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/e48ee54db7cf62b1bf99768508cfa2cb.png',
        detail: '王维（701年—761年），字摩诘，号摩诘居士，唐代诗人、画家。河东蒲州（今山西运城）人。王维参禅悟理，学庄信道，精通诗、书、画、音乐等，以诗名盛于开元、天宝间，尤长五言，多咏山水田园，与孟浩然合称“王孟”，有“诗佛”之称。书画特臻其妙，后人推其为南宗山水画之祖。苏轼评价其：“味摩诘之诗，诗中有画；观摩诘之画，画中有诗。”代表作有《辋川图》《雪溪图》等。'
      },
      {
        id: 104,
        name: '徐渭',
        dynasty: '明代',
        desc: '大写意花鸟画创始人，代表作《墨葡萄图》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/cc2102f46d47c397253f64c42283a838.png',
        detail: '徐渭（1521年—1593年），字文长，号青藤老人、青藤道士等，明代著名文学家、书画家、戏曲家、军事家。山阴（今浙江绍兴）人。徐渭多才多艺，在诗文、戏剧、书画等各方面都独树一帜，与解缙、杨慎并称“明代三才子”。他是中国“泼墨大写意画派”创始人、“青藤画派”之鼻祖，其画能吸取前人精华而脱胎换骨，不求形似求神似，山水、人物、花鸟、竹石无所不工，以花卉最为出色，开创了一代画风，对后世画坛（如八大山人、石涛、扬州八怪等）影响极大。代表作有《墨葡萄图》《榴实图》等。'
      },
      {
        id: 105,
        name: '八大山人',
        dynasty: '清代',
        desc: '大写意花鸟画代表，代表作《荷花水鸟图》',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/mingjiatujian/350f24a515640a940b5f0046790bdc8b.png',
        detail: '八大山人（1626年—1705年），原名朱耷，明末清初画家，中国画一代宗师。南昌（今属江西）人。他是明太祖朱元璋第十七子朱权的九世孙，明亡后削发为僧，后改信道教，住南昌青云谱道院。擅书画，花鸟以水墨写意为主，形象夸张奇特，笔墨凝炼沉毅，风格雄奇隽永；山水师法董其昌，笔致简洁，有静穆之趣，得疏旷之韵。代表作有《荷花水鸟图》《孔雀竹石图》等。'
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '书画名家图鉴' });
    // 初始化显示书法名家
    this.setData({
      mastersList: this.data.calligraphyMasters
    });
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab,
      mastersList: tab === 'calligraphy' ? this.data.calligraphyMasters : this.data.paintingMasters
    });
  },

  // 查看名家详情
  viewMasterDetail(e) {
    const { id } = e.currentTarget.dataset;
    const master = [...this.data.calligraphyMasters, ...this.data.paintingMasters].find(m => m.id === id);
    if (master) {
      wx.navigateTo({
        url: `/shuhua/shuhua/pages/master-detail/master-detail?id=${id}&name=${encodeURIComponent(master.name)}`
      });
    }
  }
});