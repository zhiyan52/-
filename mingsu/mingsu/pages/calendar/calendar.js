// mingsu/mingsu/pages/calendar/calendar.js
Page({
  data: {
    activeTab: 'solar', // 默认选中二十四节气
    activeSeason: 'spring', // 默认选中春季
    showDetailModal: false,
    detailData: {},

    // 传统节日数据
    festivals: [
      {
        id: 'spring-festival',
        name: '春节',
        date: '农历正月初一',
        meaning: '团圆喜庆，辞旧迎新',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/c300a0e6b89f4f19abecb46f9fe3d5f8.jpg',
        origin: '春节起源于殷商时期年头岁尾的祭神祭祖活动，是中国最隆重的传统节日。',
        customs: '贴春联、放鞭炮、吃年夜饭、守岁、拜年、发压岁钱等。',
        activities: ['贴春联', '放鞭炮', '吃年夜饭', '守岁', '拜年', '发压岁钱'],
        tags: ['团圆', '喜庆', '传统']
      },
      {
        id: 'mid-autumn',
        name: '中秋节',
        date: '农历八月十五',
        meaning: '赏月吃饼，团圆美满',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/73b40137fa8936787cd5b77c41068ad7.jpg',
        origin: '中秋节起源于古代对月的崇拜，是中国传统的团圆节日。',
        customs: '赏月、吃月饼、燃灯、猜灯谜等。',
        activities: ['赏月', '吃月饼', '燃灯', '猜灯谜'],
        tags: ['团圆', '赏月', '传统']
      },
      {
        id: 'qingming',
        name: '清明节',
        date: '公历4月4-6日',
        meaning: '扫墓祭祖，踏青赏春',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/5c117ee37220fd8d275911d57f58331e.jpg',
        origin: '清明节起源于古代的寒食节，是中国传统的祭祀节日。',
        customs: '扫墓祭祖、踏青、植树、放风筝等。',
        activities: ['扫墓祭祖', '踏青', '植树', '放风筝'],
        tags: ['祭祀', '踏青', '传统']
      },
      {
        id: 'dragon-boat',
        name: '端午节',
        date: '农历五月初五',
        meaning: '赛龙舟，吃粽子',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/e36aa88582ac1622077a585903537a44.jpg',
        origin: '端午节起源于对屈原的纪念，是中国传统的节日。',
        customs: '赛龙舟、吃粽子、挂艾草、佩香囊等。',
        activities: ['赛龙舟', '吃粽子', '挂艾草', '佩香囊'],
        tags: ['纪念', '传统', '习俗']
      },
      {
        id: 'double-ninth',
        name: '重阳节',
        date: '农历九月初九',
        meaning: '登高望远，敬老爱老',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/c1cf3efb5258c91b020b1cf82387d19a.jpg',
        origin: '重阳节起源于古代的祭祀活动，是中国传统的敬老节日。',
        customs: '登高、赏菊、插茱萸、饮菊花酒等。',
        activities: ['登高', '赏菊', '插茱萸', '饮菊花酒'],
        tags: ['敬老', '传统', '习俗']
      }
    ],

    // 二十四节气数据
    solarTerms: [
      // 春季
      {
        id: 'spring-begins',
        name: '立春',
        date: '每年2月3-5日',
        season: 'spring',
        meaning: '万物复苏，春天开始',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/1b5632363f8ebc7fa7711973a92c1162.jpg',
        origin: '立春是二十四节气中的第一个节气，表示春季的开始。',
        climate: '气温开始回升，万物开始复苏，大地逐渐解冻。',
        customs: '迎春、鞭春牛、咬春、贴春字等。',
        poetry: '律回岁晚冰霜少，春到人间草木知。——张栻《立春偶成》'
      },
      {
        id: 'rain-water',
        name: '雨水',
        date: '每年2月18-20日',
        season: 'spring',
        meaning: '降雨增多，滋润大地',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/af3d206c4ec70c093a8bdffb2b818e90.jpg',
        origin: '雨水表示降雨开始，雨量逐渐增多。',
        climate: '降雨增多，气温继续回升，农作物开始生长。',
        customs: '回娘屋、拉干爹、占稻色等。',
        poetry: '好雨知时节，当春乃发生。随风潜入夜，润物细无声。——杜甫《春夜喜雨》'
      },
      {
        id: 'insects-wake',
        name: '惊蛰',
        date: '每年3月5-7日',
        season: 'spring',
        meaning: '春雷惊醒，蛰虫复苏',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/477fff0e9bef8035d2cc18b307349cb5.jpg',
        origin: '惊蛰表示春雷乍动，惊醒了蛰伏在土中冬眠的动物。',
        climate: '春雷乍动，蛰虫开始活动，气温进一步回升。',
        customs: '打小人、祭白虎、吃梨等。',
        poetry: '微雨众卉新，一雷惊蛰始。田家几日闲，耕种从此起。——韦应物《观田家》'
      },
      {
        id: 'spring-equinox',
        name: '春分',
        date: '每年3月20-22日',
        season: 'spring',
        meaning: '昼夜平分，春天过半',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/00fc937ed935ff22c333ae0cbd654994.jpg',
        origin: '春分表示昼夜平分，春天过半。',
        climate: '昼夜平分，气温适宜，百花盛开。',
        customs: '放风筝、吃春菜、竖蛋等。',
        poetry: '仲春初四日，春色正中分。绿野徘徊月，晴天断续云。——徐铉《春分日》'
      },
      {
        id: 'clear-and-bright',
        name: '清明',
        date: '每年4月4-6日',
        season: 'spring',
        meaning: '天气晴朗，草木繁茂',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/385c7e7ee96a89ddf33394fe022c48bb.jpg',
        origin: '清明表示天气晴朗，草木繁茂。',
        climate: '天气晴朗，气温升高，草木繁茂。',
        customs: '扫墓祭祖、踏青、植树、放风筝等。',
        poetry: '清明时节雨纷纷，路上行人欲断魂。借问酒家何处有？牧童遥指杏花村。——杜牧《清明》'
      },
      {
        id: 'grain-rain',
        name: '谷雨',
        date: '每年4月19-21日',
        season: 'spring',
        meaning: '雨生百谷，谷物生长',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/b278e2f71bc59a6faf1c6ec927511590.jpg',
        origin: '谷雨表示雨水充足，有利于谷物生长。',
        climate: '雨水充足，气温稳定，谷物生长旺盛。',
        customs: '祭仓颉、摘谷雨茶、吃香椿等。',
        poetry: '谷雨如丝复似尘，煮瓶浮蜡正尝新。牡丹破萼樱桃熟，未许飞花减却春。——范成大《四时田园杂兴》'
      },

      // 夏季
      {
        id: 'summer-begins',
        name: '立夏',
        date: '每年5月5-7日',
        season: 'summer',
        meaning: '夏季开始，万物生长',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/217a3462031249114b5897639199eb54.jpg',
        origin: '立夏表示夏季的开始。',
        climate: '气温明显升高，雷雨增多，农作物进入生长旺季。',
        customs: '吃立夏饭、称体重、斗蛋等。',
        poetry: '绿树阴浓夏日长，楼台倒影入池塘。水晶帘动微风起，满架蔷薇一院香。——高骈《山亭夏日》'
      },
      {
        id: 'little-full',
        name: '小满',
        date: '每年5月20-22日',
        season: 'summer',
        meaning: '麦粒渐满，尚未成熟',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/83eb479b4d1f57bfe83ae27185fdac9b.jpg',
        origin: '小满表示麦类等夏熟作物籽粒开始饱满，但尚未成熟。',
        climate: '气温进一步升高，降雨增多，农作物生长旺盛。',
        customs: '祭车神、食苦菜、抢水等。',
        poetry: '夜莺啼绿柳，皓月醒长空。最爱垄头麦，迎风笑落红。——欧阳修《小满》'
      },
      {
        id: 'grain-in-ear',
        name: '芒种',
        date: '每年6月5-7日',
        season: 'summer',
        meaning: '麦类成熟，开始收割',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/06492c34910c21a7c0ab1bee655f9cc0.jpg',
        origin: '芒种表示麦类等有芒作物成熟，开始收割。',
        climate: '气温高，湿度大，雷雨频繁，是一年中降水量最多的时期。',
        customs: '送花神、安苗、打泥巴仗等。',
        poetry: '时雨及芒种，四野皆插秧。家家麦饭美，处处菱歌长。——陆游《时雨》'
      },
      {
        id: 'summer-solstice',
        name: '夏至',
        date: '每年6月21-22日',
        season: 'summer',
        meaning: '白昼最长，阳气最盛',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/8e7e0f5c62148768292c8d3589dfe1b8.jpg',
        origin: '夏至表示夏季的中间点，白昼最长，阳气最盛。',
        climate: '气温最高，日照时间最长，农作物生长最快。',
        customs: '吃夏至面、祭神祀祖、消夏避伏等。',
        poetry: '昼晷已云极，宵漏自此长。未及施政教，所忧变炎凉。——韦应物《夏至避暑北池》'
      },
      {
        id: 'little-heat',
        name: '小暑',
        date: '每年7月6-8日',
        season: 'summer',
        meaning: '天气开始炎热',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/37e490bc3279a91be009b06739625047.jpg',
        origin: '小暑表示天气开始炎热，但还未达到最热。',
        climate: '气温升高，进入初伏，雷雨增多。',
        customs: '吃藕、晒书画、游伏等。',
        poetry: '万瓦鳞鳞若火龙，日车不动汗珠融。无因羽翮氛埃外，坐觉蒸炊釜甑中。——陆游《苦热》'
      },
      {
        id: 'great-heat',
        name: '大暑',
        date: '每年7月22-24日',
        season: 'summer',
        meaning: '天气最热，盛夏时节',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/b63bcb6260655e3acdf4f5a662a2cbab.jpg',
        origin: '大暑表示天气最热，是一年中最热的时期。',
        climate: '气温最高，湿度大，是一年中最热的时期。',
        customs: '喝伏茶、晒伏姜、烧伏香等。',
        poetry: '赫日当空暑气浮，炎风簸土几时休。云蒸雨骤江湖满，电闪雷轰天地浮。——郭印《大暑》'
      },

      // 秋季
      {
        id: 'autumn-begins',
        name: '立秋',
        date: '每年8月7-9日',
        season: 'autumn',
        meaning: '秋季开始，气温转凉',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/c5b3cd7bc297f2bc27f704d325ffbd5d.jpg',
        origin: '立秋表示秋季的开始。',
        climate: '气温开始转凉，早晚温差增大。',
        customs: '贴秋膘、咬秋、晒秋等。',
        poetry: '乳鸦啼散玉屏空，一枕新凉一扇风。睡起秋声无觅处，满阶梧叶月明中。——刘翰《立秋》'
      },
      {
        id: 'end-of-heat',
        name: '处暑',
        date: '每年8月22-24日',
        season: 'autumn',
        meaning: '暑气结束，天气转凉',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/3ef6041d4b92de478bae460f9149bf30.jpg',
        origin: '处暑表示暑气结束，天气转凉。',
        climate: '气温进一步下降，昼夜温差加大。',
        customs: '出游迎秋、放河灯、开渔节等。',
        poetry: '处暑无三日，新凉直万金。白头更世事，青草印禅心。——苏泂《处暑后风雨》'
      },
      {
        id: 'white-dew',
        name: '白露',
        date: '每年9月7-9日',
        season: 'autumn',
        meaning: '天气转凉，露水凝结',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/92abaee41fcdd3c305949bbc0b4930e0.jpg',
        origin: '白露表示天气转凉，早晨草木上开始出现露水。',
        climate: '气温明显下降，昼夜温差大，露水凝结。',
        customs: '收清露、饮白露茶、吃龙眼等。',
        poetry: '白露团甘子，清晨散马蹄。圃开连石树，船渡入江溪。——杜甫《白露》'
      },
      {
        id: 'autumn-equinox',
        name: '秋分',
        date: '每年9月22-24日',
        season: 'autumn',
        meaning: '昼夜平分，秋季过半',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/abc999267582b07eae799928edf9c34a.jpg',
        origin: '秋分表示昼夜平分，秋季过半。',
        climate: '昼夜平分，气温适宜，秋高气爽。',
        customs: '祭月、吃秋菜、送秋牛等。',
        poetry: '秋分客尚在，竹露夕微微。共赏重阳节，言寻戏马台。——杜甫《晚晴》'
      },
      {
        id: 'cold-dew',
        name: '寒露',
        date: '每年10月8-9日',
        season: 'autumn',
        meaning: '天气转寒，露水更凉',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/147a50cde0c03ab6526073fa762ce22c.jpg',
        origin: '寒露表示天气转寒，露水更凉。',
        climate: '气温继续下降，昼夜温差大，露水凝结成霜。',
        customs: '赏菊、饮菊花酒、吃螃蟹等。',
        poetry: '空庭得秋长漫漫，寒露入暮愁衣单。喧喧人语已成市，白日未到扶桑间。——王安石《八月十九日试院梦冲卿》'
      },
      {
        id: 'frost-descent',
        name: '霜降',
        date: '每年10月23-24日',
        season: 'autumn',
        meaning: '天气寒冷，开始降霜',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/68e996de3a8b529d8913c84127460af1.jpg',
        origin: '霜降表示天气寒冷，开始降霜。',
        climate: '气温骤降，开始出现霜冻，农作物收获完毕。',
        customs: '赏菊、吃柿子、登高远眺等。',
        poetry: '霜降三旬后，蓂馀一叶秋。玄阴迎落日，凉魄尽残钩。——元稹《霜降》'
      },

      // 冬季
      {
        id: 'winter-begins',
        name: '立冬',
        date: '每年11月7-8日',
        season: 'winter',
        meaning: '冬季开始，万物收藏',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/da4a56eabd94a156451ffc3dfc927e60.jpg',
        origin: '立冬表示冬季的开始。',
        climate: '气温下降，开始进入冬季，万物收藏。',
        customs: '补冬、吃饺子、酿黄酒等。',
        poetry: '秋风吹尽旧庭柯，黄叶丹枫客里过。一点禅灯半轮月，今宵寒较昨宵多。——王稚登《立冬》'
      },
      {
        id: 'little-snow',
        name: '小雪',
        date: '每年11月22-23日',
        season: 'winter',
        meaning: '开始降雪，雪量较小',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/a81d2bebbc8b9101495855065be296ca.jpg',
        origin: '小雪表示开始降雪，雪量较小。',
        climate: '气温继续下降，开始降雪，但雪量较小。',
        customs: '腌腊肉、吃糍粑、晒鱼干等。',
        poetry: '甲子徒推小雪天，刺梧犹绿槿花然。融和长养无时歇，却是炎洲雨露偏。——张登《小雪日戏题绝句》'
      },
      {
        id: 'great-snow',
        name: '大雪',
        date: '每年12月6-8日',
        season: 'winter',
        meaning: '降雪增多，雪量较大',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/a400a718e1ef4e53c8ee33c93c7f7f6b.jpg',
        origin: '大雪表示降雪增多，雪量较大。',
        climate: '气温骤降，降雪增多，雪量较大。',
        customs: '腌肉、打雪仗、赏雪景等。',
        poetry: '大雪江南见未曾，今年方始是严凝。巧穿帘罅如相觅，重压林梢欲不胜。——陆游《大雪》'
      },
      {
        id: 'winter-solstice',
        name: '冬至',
        date: '每年12月21-23日',
        season: 'winter',
        meaning: '白昼最短，阳气始生',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/dcfa4a84cc46fcc4b7a0da8487fca29d.jpg',
        origin: '冬至表示冬季的中间点，白昼最短，阳气始生。',
        climate: '气温最低，白昼最短，开始进入数九寒天。',
        customs: '吃饺子、喝羊肉汤、祭天祀祖等。',
        poetry: '邯郸驿里逢冬至，抱膝灯前影伴身。想得家中夜深坐，还应说着远行人。——白居易《邯郸冬至夜思家》'
      },
      {
        id: 'little-cold',
        name: '小寒',
        date: '每年1月5-7日',
        season: 'winter',
        meaning: '天气寒冷，尚未最冷',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/8020dbec33e91cdb0ec467c793231b42.jpg',
        origin: '小寒表示天气寒冷，但尚未达到最冷。',
        climate: '气温较低，进入一年中最冷的时期。',
        customs: '吃腊八粥、贴窗花、扫尘等。',
        poetry: '小寒连大吕，欢鹊垒新巢。拾食寻河曲，衔紫绕树梢。——元稹《小寒》'
      },
      {
        id: 'great-cold',
        name: '大寒',
        date: '每年1月20-21日',
        season: 'winter',
        meaning: '天气最冷，一年之末',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/5d20e6f12f194d2006396b713caa20ba.jpg',
        origin: '大寒表示天气最冷，是一年中最冷的时期。',
        climate: '气温最低，是一年中最冷的时期，接近立春。',
        customs: '尾牙祭、吃年糕、守岁等。',
        poetry: '大寒岂可无杯酒，欲致多多恨未能。楮币破悭捐一券，瓦壶绝少约三升。——方回《大寒》'
      }
    ],

    // 文化科普内容
    cultureContent: {
      'solar-culture': {
        title: '二十四节气的起源',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/35f1e8fbcec7475dde388ce6dcf156b3.jpg',
        content: '二十四节气起源于中国黄河流域，是中国古代劳动人民长期观察天文、气象、物候变化规律的智慧结晶。早在春秋战国时期，中国就已经有了日南至、日北至的概念。到秦汉时期，二十四节气已经完全确立，并被写入历法。\n\n二十四节气不仅是指导农业生产的重要工具，也是中国传统文化的重要组成部分。它反映了中国古代人民对自然规律的认识和尊重，体现了"天人合一"的哲学思想。\n\n2016年，二十四节气被列入联合国教科文组织人类非物质文化遗产代表作名录，成为全人类共同的文化财富。'
      },
      'solar-system': {
        title: '节气与农业生产',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/2fa1e18080ddbea771c3b2d8bbbc636f.jpg',
        content: '二十四节气是中国古代农业生产的重要指导工具，它根据太阳运行周期和气候变化规律，将一年分为二十四个节气，每个节气都有其特定的农业生产活动。\n\n例如，立春标志着春季的开始，农民开始准备春耕；谷雨表示雨水充足，有利于谷物生长；芒种表示麦类等有芒作物成熟，开始收割；秋分表示昼夜平分，是收获的季节。\n\n二十四节气不仅指导着农民的生产活动，也反映了中国古代农业文明的高度发达。它体现了中国古代人民对自然规律的深刻认识和利用，是中国传统农业文化的重要组成部分。'
      },
      'traditional-medicine': {
        title: '节气与中医养生',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/4dc36b7e59567dfacd4c7b289cc4729b.jpg',
        content: '二十四节气与中医养生有着密切的关系。中医认为，人体的生理活动与自然界的变化是同步的，因此养生活动也应该根据节气的变化而调整。\n\n例如，春季是肝气旺盛的时期，应该注意疏肝理气；夏季是心气旺盛的时期，应该注意清心降火；秋季是肺气旺盛的时期，应该注意养肺润燥；冬季是肾气旺盛的时期，应该注意补肾温阳。\n\n二十四节气养生强调"顺应自然"，根据不同节气的特点调整饮食、作息和运动，以达到阴阳平衡、健康长寿的目的。这种养生理念体现了中国传统医学"天人合一"的思想，是中国传统文化的重要组成部分。'
      },
      'traditional-philosophy': {
        title: '节气与传统文化',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/jieqi/a33fab4a3857cf9e4da1b9e741267fd7.jpg',
        content: '二十四节气不仅是指导农业生产的工具，也是中国传统文化的重要载体。它在诗词、绘画、音乐等文化领域都有广泛的体现。\n\n在诗词方面，许多古代诗人都以节气为主题创作了大量优秀的作品，如杜甫的《春夜喜雨》、杜牧的《清明》等。在绘画方面，许多画家以节气为题材创作了精美的画作，如《二十四节气图》等。\n\n二十四节气还与中国传统节日密切相关，如清明节、冬至等。这些节日不仅是庆祝活动，也是传承传统文化的重要方式。\n\n总之，二十四节气是中国传统文化的重要组成部分，它体现了中国古代人民对自然规律的认识和尊重，是中华民族智慧的结晶。'
      }
    }
  },

  onLoad(options) {
    // 初始化数据
    this.filterSolarTerms();

    // 检查是否有特色节日参数
    if (options.featured) {
      this.setData({ activeTab: 'festival' });
      this.showDetail({ currentTarget: { dataset: { type: 'festival', id: options.featured } } });
    }
  },

  // 切换标签
  switchTab(e) {
    const { tab } = e.currentTarget.dataset;
    this.setData({ activeTab: tab });

    // 如果切换到节气标签，初始化季节筛选
    if (tab === 'solar') {
      this.setData({ activeSeason: 'spring' });
      this.filterSolarTerms();
    }
  },

  // 切换季节
  switchSeason(e) {
    const { season } = e.currentTarget.dataset;
    this.setData({ activeSeason: season });
    this.filterSolarTerms();
  },

  // 根据季节筛选节气
  filterSolarTerms() {
    const { solarTerms, activeSeason } = this.data;
    const filteredSolarTerms = solarTerms.filter(term => term.season === activeSeason);
    this.setData({ filteredSolarTerms });
  },

  // 显示详情
  showDetail(e) {
    const { type, id } = e.currentTarget.dataset;
    let detailData = {};

    if (type === 'solar') {
      detailData = this.data.solarTerms.find(term => term.id === id);
    } else if (type === 'festival') {
      detailData = this.data.festivals.find(festival => festival.id === id);
    }

    if (detailData) {
      this.setData({ detailData, showDetailModal: true });
    }
  },

  // 显示文化科普详情
  showCultureDetail(e) {
    const { type } = e.currentTarget.dataset;
    const detailData = this.data.cultureContent[type];

    if (detailData) {
      this.setData({ detailData, showDetailModal: true });
    }
  },

  // 关闭详情
  closeDetail() {
    this.setData({ showDetailModal: false, detailData: {} });
  },

  onShareAppMessage() {
    return {
      title: '二十四节气与中华传统文化',
      path: '/mingsu/mingsu/pages/calendar/calendar'
    };
  }
});