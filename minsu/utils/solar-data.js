 // minsu/utils/solar-data.js
// 二十四节气完整数据（24个节气）

const SOLAR_TERMS = [
  // ========== 春季 ==========
  {
    id: 'lichun',
    name: '立春',
    alias: '打春',
    order: 1,
    date: '2月3-5日',
    season: 'spring',
    
    pentads: [
      { 
        day: 1, 
        name: '东风解冻', 
        desc: '东风送暖，大地开始解冻',
        observe: '记录你看到的冰雪消融迹象',
        image: '/minsu/images/pentad/dongfeng.png'
      },
      { 
        day: 2, 
        name: '蛰虫始振', 
        desc: '地下冬眠的虫类慢慢苏醒',
        observe: '留意墙角、树根是否有虫迹',
        image: '/minsu/images/pentad/zhechong.png'
      },
      { 
        day: 3, 
        name: '鱼陟负冰', 
        desc: '鱼儿游到冰面下，似负碎冰',
        observe: '观察附近水面的冰层变化',
        image: '/minsu/images/pentad/yuzhi.png'
      }
    ],
    
    customs: [
      {
        id: 'yaochun',
        name: '咬春',
        category: '饮食',
        icon: '🌯',
        material: '春饼、萝卜、豆芽、韭菜',
        steps: [
          '薄饼烙熟，卷入豆芽、韭菜、肉丝',
          '生萝卜切片，取"啃春"之意',
          '佐以五辛：葱、蒜、椒、姜、芥'
        ],
        myRecord: null
      },
      {
        id: 'dachun',
        name: '打春牛',
        category: '仪式',
        icon: '🐂',
        material: '泥塑春牛（可用面团替代）',
        steps: [
          '用面团捏小牛形状',
          '以柳枝代彩鞭轻击',
          '碎土/面团散落，象征丰年'
        ],
        extinct: true,
        myRecord: null
      },
      {
        id: 'caitou',
        name: '戴春幡',
        category: '手工艺',
        icon: '🎋',
        material: '彩绸、竹枝、丝线',
        steps: [
          '彩绸剪成小旗形状',
          '系于竹枝或发簪',
          '插于鬓边或门楣'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['迎春花', '连翘', '望春玉兰'],
      animals: ['蜜蜂出巢', '燕子北归（南方）'],
      farming: '北方顶凌耙地，南方准备早稻育秧'
    },
    
    regions: [
      { name: '北京', feature: '吃春饼，卷合菜', recipe: '春饼+酱肉+韭菜豆芽' },
      { name: '江南', feature: '啖春卷，荠菜馅', recipe: '荠菜+猪肉+春卷皮' },
      { name: '潮汕', feature: '食春菜，配猪血', recipe: '春菜+猪血+潮汕鱼露' }
    ]
  },

  {
    id: 'yushui',
    name: '雨水',
    alias: '',
    order: 2,
    date: '2月18-20日',
    season: 'spring',
    
    pentads: [
      { 
        day: 1, 
        name: '獭祭鱼', 
        desc: '水獭开始捕鱼，将鱼摆岸边似祭祀',
        observe: '观察河边是否有水獭活动痕迹',
        image: '/minsu/images/pentad/taji.png'
      },
      { 
        day: 2, 
        name: '鸿雁来', 
        desc: '大雁从南方飞回北方',
        observe: '抬头看天空，记录候鸟北归',
        image: '/minsu/images/pentad/hongyan.png'
      },
      { 
        day: 3, 
        name: '草木萌动', 
        desc: '草木随地中阳气升腾开始抽出嫩芽',
        observe: '寻找最早发芽的草木',
        image: '/minsu/images/pentad/caomu.png'
      }
    ],
    
    customs: [
      {
        id: 'huigu',
        name: '回娘屋',
        category: '仪式',
        icon: '🏠',
        material: '罐罐肉、红棉绳',
        steps: [
          '出嫁女携夫带子回娘家',
          '备罐罐肉（猪脚炖黄豆）',
          '为父母系红棉绳，祝长寿'
        ],
        myRecord: null
      },
      {
        id: 'jieqiu',
        name: '接寿',
        category: '仪式',
        icon: '🎁',
        material: '红绳、藤椅',
        steps: [
          '女婿给岳父岳母送节',
          '礼品必有两条红棉绳',
          '一缠藤椅，一缠寿杖'
        ],
        myRecord: null
      },
      {
        id: 'zhaocai',
        name: '拉保保',
        category: '仪式',
        icon: '👶',
        material: '酒菜、红蛋',
        steps: [
          '父母带孩子路边等候',
          '遇第一个行人即拜为干爹',
          '摆酒菜，送红蛋，结亲家'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['杏花', '李花', '油菜花'],
      animals: ['鸿雁北归', '水獭捕鱼'],
      farming: '华北选种晒种，江南开始育秧'
    },
    
    regions: [
      { name: '川西', feature: '回娘屋，送罐罐肉', recipe: '猪脚+黄豆+海带，砂锅慢炖' },
      { name: '华南', feature: '占稻色，爆糯谷', recipe: '糯谷爆炒，以白为丰年之兆' },
      { name: '江南', feature: '食荠菜，采春笋', recipe: '荠菜馄饨+油焖春笋' }
    ]
  },

  {
    id: 'jingzhe',
    name: '惊蛰',
    alias: '启蛰',
    order: 3,
    date: '3月5-7日',
    season: 'spring',
    
    pentads: [
      { 
        day: 1, 
        name: '桃始华', 
        desc: '桃花开始绽放',
        observe: '寻找最早开放的桃花',
        image: '/minsu/images/pentad/taohua.png'
      },
      { 
        day: 2, 
        name: '仓庚鸣', 
        desc: '黄鹂鸟开始鸣叫',
        observe: '清晨听鸟鸣，辨别黄鹂声',
        image: '/minsu/images/pentad/canggeng.png'
      },
      { 
        day: 3, 
        name: '鹰化为鸠', 
        desc: '老鹰渐少，布谷鸟渐多',
        observe: '观察空中飞鸟种类变化',
        image: '/minsu/images/pentad/yingjiu.png'
      }
    ],
    
    customs: [
      {
        id: 'jingxiao',
        name: '祭白虎打小人',
        category: '仪式',
        icon: '🐯',
        material: '纸老虎、肥猪肉、香烛',
        steps: [
          '用纸绘白老虎，口角画獠牙',
          '以肥猪血喂之，使其吃饱不伤人',
          '以生猪肉抹纸虎嘴，令其不能张口'
        ],
        myRecord: null
      },
      {
        id: 'chongxiang',
        name: '熏虫香',
        category: '手工艺',
        icon: '🌿',
        material: '苍术、艾叶、白芷、雄黄',
        steps: [
          '诸药晒干研末',
          '以榆皮为糊作线香',
          '点燃熏屋角床下，驱虫避秽'
        ],
        myRecord: null
      },
      {
        id: 'chilei',
        name: '吃梨',
        category: '饮食',
        icon: '🍐',
        material: '雪梨、冰糖',
        steps: [
          '惊蛰日全家吃梨',
          '取"离"害虫之意',
          '可蒸梨加川贝，润肺防咳'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['桃花', '棣棠', '蔷薇'],
      animals: ['黄鹂鸣', '布谷叫', '蛇虫出洞'],
      farming: '春耕大忙开始，"过了惊蛰节，春耕不能歇"'
    },
    
    regions: [
      { name: '广东', feature: '祭白虎，打小人', recipe: '纸老虎+猪血，仪式为主' },
      { name: '山西', feature: '吃梨，炒虫', recipe: '梨生食，或蒸梨加川贝' },
      { name: '山东', feature: '烙煎饼，熏虫', recipe: '煎饼卷大葱，燃香熏屋' }
    ]
  },

  {
    id: 'chunfen',
    name: '春分',
    alias: '日夜分',
    order: 4,
    date: '3月20-22日',
    season: 'spring',
    
    pentads: [
      { 
        day: 1, 
        name: '玄鸟至', 
        desc: '燕子从南方归来',
        observe: '观察屋檐下是否有燕子筑巢',
        image: '/minsu/images/pentad/xuanniao.png'
      },
      { 
        day: 2, 
        name: '雷乃发声', 
        desc: '开始听到雷声',
        observe: '记录今年第一声春雷日期',
        image: '/minsu/images/pentad/lei.png'
      },
      { 
        day: 3, 
        name: '始电', 
        desc: '开始见到闪电',
        observe: '春雨中观察闪电形态',
        image: '/minsu/images/pentad/dian.png'
      }
    ],
    
    customs: [
      {
        id: 'shudan',
        name: '竖蛋',
        category: '游戏',
        icon: '🥚',
        material: '新鲜鸡蛋',
        steps: [
          '选光滑匀称的新鲜鸡蛋',
          '轻手轻脚在桌上竖立',
          '据说春分日地球平衡，最易竖蛋'
        ],
        myRecord: null
      },
      {
        id: 'chunjiu',
        name: '吃春菜',
        category: '饮食',
        icon: '🥬',
        material: '野苋菜（春碧蒿）',
        steps: [
          '田野采嫩绿野苋菜',
          '与鱼片滚汤，曰"春汤"',
          '谚云："春汤灌脏，洗涤肝肠"'
        ],
        myRecord: null
      },
      {
        id: 'fangfeng',
        name: '放纸鸢',
        category: '游戏',
        icon: '🪁',
        material: '竹篾、宣纸、丝线',
        steps: [
          '竹篾扎骨架，糊薄纸',
          '系长线，趁春风放起',
          '剪断风筝，寓意放走晦气'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['海棠', '梨花', '木兰'],
      animals: ['燕子归来', '杜鹃夜啼', '蜜蜂繁忙'],
      farming: '春分麦起身，一刻值千金'
    },
    
    regions: [
      { name: '岭南', feature: '吃春菜，饮春汤', recipe: '野苋菜+鱼片，清汤滚煮' },
      { name: '北京', feature: '吃驴打滚，太阳糕', recipe: '糯米卷豆沙，黄豆面裹' },
      { name: '江浙', feature: '酿春酒，祭蚕神', recipe: '糯米酿酒，供奉蚕花娘娘' }
    ]
  },

  // ========== 清明、谷雨 ==========
  {
    id: 'qingming',
    name: '清明',
    alias: '踏青节',
    order: 5,
    date: '4月4-6日',
    season: 'spring',
    
    pentads: [
      { 
        day: 1, 
        name: '桐始华', 
        desc: '白桐花开始开放',
        observe: '寻找开满紫色花朵的泡桐树',
        image: '/minsu/images/pentad/tonghua.png'
      },
      { 
        day: 2, 
        name: '田鼠化为鴽', 
        desc: '田鼠躲入地下，鹌鹑类小鸟增多',
        observe: '田间观察鼠洞与飞鸟',
        image: '/minsu/images/pentad/tianshu.png'
      },
      { 
        day: 3, 
        name: '虹始见', 
        desc: '雨后开始见到彩虹',
        observe: '清明雨后向东望天空',
        image: '/minsu/images/pentad/hong.png'
      }
    ],
    
    customs: [
      {
        id: 'saomu',
        name: '扫墓祭祖',
        category: '仪式',
        icon: '🙏',
        material: '香烛、纸钱、鲜花、青团',
        steps: [
          '清理墓地杂草，培土修坟',
          '焚香烧纸，跪拜先祖',
          '插柳枝于坟头，取"留"之意'
        ],
        myRecord: null
      },
      {
        id: 'qingtuan',
        name: '做青团',
        category: '饮食',
        icon: '🟢',
        material: '艾草汁、糯米粉、豆沙馅',
        steps: [
          '艾草焯水捣汁，和入糯米粉',
          '包入豆沙或枣泥馅',
          '垫粽叶蒸熟，色如碧玉'
        ],
        myRecord: null
      },
      {
        id: 'tachun',
        name: '踏青插柳',
        category: '仪式',
        icon: '🌿',
        material: '柳枝、野花',
        steps: [
          '清明日出门郊游，赏春色',
          '采柳枝编成柳圈戴头上',
          '插柳于门楣，辟邪祈福'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['泡桐花', '杜鹃花', '油菜花盛'],
      animals: ['燕子筑巢', '布谷催耕', '蛙声初起'],
      farming: '清明前后，种瓜点豆'
    },
    
    regions: [
      { name: '江南', feature: '青团艾粿，扫墓踏青', recipe: '艾草汁+糯米粉+豆沙馅' },
      { name: '山西', feature: '蒸子推燕，纪念介子推', recipe: '面粉捏燕子形，蒸熟点红' },
      { name: '闽南', feature: '吃润饼，扫墓压纸', recipe: '薄饼卷胡萝卜丝+海苔+花生糖' }
    ]
  },

  {
    id: 'guyu',
    name: '谷雨',
    alias: '',
    order: 6,
    date: '4月19-21日',
    season: 'spring',
    
    pentads: [
      { 
        day: 1, 
        name: '萍始生', 
        desc: '浮萍开始生长',
        observe: '观察池塘水面是否有绿萍',
        image: '/minsu/images/pentad/ping.png'
      },
      { 
        day: 2, 
        name: '鸣鸠拂其羽', 
        desc: '布谷鸟梳理羽毛，准备催耕',
        observe: '听布谷鸟叫声，辨"布谷布谷"',
        image: '/minsu/images/pentad/mingjiu.png'
      },
      { 
        day: 3, 
        name: '戴胜降于桑', 
        desc: '戴胜鸟落在桑树上',
        observe: '桑树林中寻找戴胜鸟',
        image: '/minsu/images/pentad/daisheng.png'
      }
    ],
    
    customs: [
      {
        id: 'chayu',
        name: '喝谷雨茶',
        category: '饮食',
        icon: '🍵',
        material: '雨前龙井、谷雨新茶',
        steps: [
          '谷雨日采摘的嫩茶炒制',
          '以泉水冲泡，色翠香幽',
          '谚云："谷雨谷雨，采茶对雨"'
        ],
        myRecord: null
      },
      {
        id: 'shangmu',
        name: '走谷雨',
        category: '仪式',
        icon: '🚶',
        material: '牡丹花、香椿芽',
        steps: [
          '青年妇女走村串亲',
          '或到野外走一圈，强身健体',
          '归来食香椿，曰"咬春"'
        ],
        myRecord: null
      },
      {
        id: 'tusha',
        name: '杀五毒',
        category: '仪式',
        icon: '🐍',
        material: '石灰、雄黄、艾草',
        steps: [
          '张贴谷雨贴，绘张天师除五毒',
          '墙角撒石灰，驱蛇虫',
          '以雄黄酒抹小儿额头'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['牡丹盛开', '荼蘼花事', '桑树成荫'],
      animals: ['布谷催耕', '戴胜栖桑', '蚕宝宝孵化'],
      farming: '谷雨下秧，大致无妨'
    },
    
    regions: [
      { name: '江南', feature: '采谷雨茶，食香椿', recipe: '雨前龙井+香椿炒鸡蛋' },
      { name: '山东', feature: '赏牡丹，祭仓颉', recipe: '牡丹花饼+仓颉庙会' },
      { name: '陕西', feature: '食香椿，贴谷雨贴', recipe: '香椿芽拌豆腐+面花' }
    ]
  },

  // ========== 夏季 ==========
  {
    id: 'lixia',
    name: '立夏',
    alias: '春尽日',
    order: 7,
    date: '5月5-7日',
    season: 'summer',
    
    pentads: [
      { 
        day: 1, 
        name: '蝼蝈鸣', 
        desc: '蝼蛄开始鸣叫',
        observe: '傍晚听田间蝼蛄叫声',
        image: '/minsu/images/pentad/louguo.png'
      },
      { 
        day: 2, 
        name: '蚯蚓出', 
        desc: '蚯蚓从土里钻出',
        observe: '雨后观察地面蚯蚓活动',
        image: '/minsu/images/pentad/qiuyin.png'
      },
      { 
        day: 3, 
        name: '王瓜生', 
        desc: '王瓜（药用瓜类）开始攀爬',
        observe: '寻找篱边攀爬的瓜藤',
        image: '/minsu/images/pentad/wanggua.png'
      }
    ],
    
    customs: [
      {
        id: 'chengren',
        name: '立夏称人',
        category: '仪式',
        icon: '⚖️',
        material: '大秤、箩筐',
        steps: [
          '悬大秤于梁，人坐箩筐中称重',
          '与去年体重比较，看胖瘦',
          '谓可祛暑防灾，夏日平安'
        ],
        myRecord: null
      },
      {
        id: 'chidan',
        name: '吃立夏蛋',
        category: '饮食',
        icon: '🥚',
        material: '鸡蛋、茶叶、八角',
        steps: [
          '鸡蛋煮熟，敲裂蛋壳',
          '以茶叶、八角、酱油再煮入味',
          '挂于孩童胸前，斗蛋游戏'
        ],
        myRecord: null
      },
      {
        id: 'fanxian',
        name: '吃五色饭',
        category: '饮食',
        icon: '🍚',
        material: '糯米、红豆、绿豆、黑豆、黄豆',
        steps: [
          '五种豆子浸泡染色',
          '与糯米同蒸，色如彩虹',
          '谓可补益五脏，夏日有力'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['芍药', '蔷薇', '樱桃红'],
      animals: ['蝼蛄鸣', '蚯蚓出', '蛙声一片'],
      farming: '立夏看夏，农事大忙'
    },
    
    regions: [
      { name: '江南', feature: '立夏饭，乌米饭', recipe: '糯米+豌豆+蚕豆+咸肉' },
      { name: '闽南', feature: '虾面，鼎边糊', recipe: '虾汤+油面+青菜' },
      { name: '云南', feature: '吃掺豆饭，迎夏', recipe: '糯米+红豆+绿豆+花生' }
    ]
  },

  {
    id: 'xiaoman',
    name: '小满',
    alias: '',
    order: 8,
    date: '5月20-22日',
    season: 'summer',
    
    pentads: [
      { 
        day: 1, 
        name: '苦菜秀', 
        desc: '苦菜（败酱草）开花',
        observe: '田间寻找开黄花的苦菜',
        image: '/minsu/images/pentad/kucai.png'
      },
      { 
        day: 2, 
        name: '靡草死', 
        desc: '喜阴的靡草枯死',
        observe: '观察树下阴湿处杂草变化',
        image: '/minsu/images/pentad/micao.png'
      },
      { 
        day: 3, 
        name: '麦秋至', 
        desc: '麦子开始成熟，虽夏如秋',
        observe: '观察麦田由绿转黄的渐变',
        image: '/minsu/images/pentad/maiqiu.png'
      }
    ],
    
    customs: [
      {
        id: 'shishen',
        name: '祭车神',
        category: '仪式',
        icon: '🚜',
        material: '鱼肉、香烛、白水',
        steps: [
          '水车基座设供品祭拜',
          '泼白水于田中，祝水源涌旺',
          '谚云："小满动三车"'
        ],
        myRecord: null
      },
      {
        id: 'chican',
        name: '祈蚕节',
        category: '仪式',
        icon: '🐛',
        material: '蚕茧、丝绸、供品',
        steps: [
          '蚕妇备供品祭拜蚕神嫘祖',
          '以茧丝绕臂，祝蚕茧丰收',
          '煮茧抽丝，试织新绸'
        ],
        myRecord: null
      },
      {
        id: 'chiku',
        name: '食苦菜',
        category: '饮食',
        icon: '🥬',
        material: '苦菜、蒜泥、醋',
        steps: [
          '采嫩苦菜，洗净焯水',
          '以蒜泥、醋、香油凉拌',
          '苦中带甘，清热解暑'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['苦菜花黄', '麦穗渐满', '枇杷黄'],
      animals: ['蚕宝宝作茧', '螳螂初生', '伯劳始鸣'],
      farming: '小满不满，芒种不管'
    },
    
    regions: [
      { name: '江浙', feature: '祭蚕神，吃枇杷', recipe: '枇杷鲜食+茧圆（糯米团）' },
      { name: '关中', feature: '卖新麦，吃凉皮', recipe: '新麦磨面+凉皮+油泼辣子' },
      { name: '广东', feature: '煲冬瓜，祛湿', recipe: '冬瓜+薏米+排骨，煲汤' }
    ]
  },

  {
    id: 'mangzhong',
    name: '芒种',
    alias: '忙种',
    order: 9,
    date: '6月5-7日',
    season: 'summer',
    
    pentads: [
      { 
        day: 1, 
        name: '螳螂生', 
        desc: '螳螂卵鞘孵化，小螳螂出世',
        observe: '草丛中寻找新生螳螂',
        image: '/minsu/images/pentad/tanglang.png'
      },
      { 
        day: 2, 
        name: '鵙始鸣', 
        desc: '伯劳鸟开始鸣叫',
        observe: '听枝头伯劳的尖锐叫声',
        image: '/minsu/images/pentad/ju.png'
      },
      { 
        day: 3, 
        name: '反舌无声', 
        desc: '反舌鸟（百舌）停止鸣叫',
        observe: '往日善鸣的鸟儿是否安静',
        image: '/minsu/images/pentad/fanshe.png'
      }
    ],
    
    customs: [
      {
        id: 'songhua',
        name: '送花神',
        category: '仪式',
        icon: '🌸',
        material: '彩线、彩带、花瓣',
        steps: [
          '芒种已近农历五月，花事凋零',
          '闺中女子制彩带系于花枝',
          '饯送花神归位，盼来年再会'
        ],
        extinct: true,
        myRecord: null
      },
      {
        id: 'anmiao',
        name: '安苗祭祀',
        category: '仪式',
        icon: '🌾',
        material: '新麦面、瓜果、香烛',
        steps: [
          '以新麦面捏成五谷六畜形状',
          '染五色，作为供品',
          '祭拜田祖，祈求秋收'
        ],
        myRecord: null
      },
      {
        id: 'zhugong',
        name: '煮青梅',
        category: '饮食',
        icon: '🟢',
        material: '青梅、冰糖、黄酒',
        steps: [
          '青梅洗净，去蒂晾干',
          '以冰糖、黄酒同煮',
          '酸甜可口，消暑开胃'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['栀子花白', '石榴花红', '梅子青'],
      animals: ['螳螂捕食', '伯劳始鸣', '蝉声初起'],
      farming: '芒种忙种，不可强种'
    },
    
    regions: [
      { name: '皖南', feature: '安苗祭，吃新麦', recipe: '新麦面捏供品+面饼' },
      { name: '江浙', feature: '送花神，煮青梅', recipe: '青梅+冰糖+黄酒煮制' },
      { name: '贵州', feature: '打泥巴仗，插秧', recipe: '糯米饭+酸汤鱼' }
    ]
  },

  {
    id: 'xiazhi',
    name: '夏至',
    alias: '日长至',
    order: 10,
    date: '6月21-22日',
    season: 'summer',
    
    pentads: [
      { 
        day: 1, 
        name: '鹿角解', 
        desc: '鹿角开始脱落',
        observe: '动物园或山林中寻找鹿角',
        image: '/minsu/images/pentad/lujiao.png'
      },
      { 
        day: 2, 
        name: '蝉始鸣', 
        desc: '知了开始鸣叫',
        observe: '听树梢蝉鸣，辨种类',
        image: '/minsu/images/pentad/chan.png'
      },
      { 
        day: 3, 
        name: '半夏生', 
        desc: '半夏药草开始生长',
        observe: '阴湿草地寻找半夏植物',
        image: '/minsu/images/pentad/banxia.png'
      }
    ],
    
    customs: [
      {
        id: 'jizhi',
        name: '祭神祀祖',
        category: '仪式',
        icon: '🙏',
        material: '新麦、瓜果、馄饨',
        steps: [
          '以新麦面供品祭拜祖先',
          '家人团聚，吃馄饨',
          '谚云："夏至馄饨冬至团"'
        ],
        myRecord: null
      },
      {
        id: 'xiaomian',
        name: '吃夏至面',
        category: '饮食',
        icon: '🍜',
        material: '新麦面、黄瓜、豆芽',
        steps: [
          '新麦磨面，擀薄切细',
          '以凉水过面，曰"入水面"',
          '配黄瓜丝、豆芽、芝麻酱'
        ],
        myRecord: null
      },
      {
        id: 'liangsan',
        name: '消夏避伏',
        category: '仪式',
        icon: '🌿',
        material: '扇子、脂粉、冰块',
        steps: [
          '妇女互赠折扇、脂粉',
          '扇风生凉，粉防生痱',
          '皇家以冰赐臣，民间藏冰'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['荷花初绽', '茉莉香浓', '凤仙花开'],
      animals: ['蝉鸣高树', '萤火虫现', '蜻蜓点水'],
      farming: '夏至不锄根边草，如同养下毒蛇咬'
    },
    
    regions: [
      { name: '北方', feature: '吃夏至面，馄饨', recipe: '凉面+黄瓜丝+芝麻酱' },
      { name: '无锡', feature: '吃麦粥，馄饨', recipe: '新麦粥+菜肉馄饨' },
      { name: '岭南', feature: '吃荔枝，喝凉茶', recipe: '鲜荔枝+廿四味凉茶' }
    ]
  },

  {
    id: 'xiaoshu',
    name: '小暑',
    alias: '',
    order: 11,
    date: '7月6-8日',
    season: 'summer',
    
    pentads: [
      { 
        day: 1, 
        name: '温风至', 
        desc: '热风开始吹来',
        observe: '感受风中是否带热浪',
        image: '/minsu/images/pentad/wenfeng.png'
      },
      { 
        day: 2, 
        name: '蟋蟀居壁', 
        desc: '蟋蟀躲入墙角避暑',
        observe: '墙角、砖缝寻找蟋蟀',
        image: '/minsu/images/pentad/xishuai.png'
      },
      { 
        day: 3, 
        name: '鹰始挚', 
        desc: '老鹰开始搏击长空',
        observe: '仰望天空，看鹰隼盘旋',
        image: '/minsu/images/pentad/yingzhi.png'
      }
    ],
    
    customs: [
      {
        id: 'shufu',
        name: '食新米',
        category: '饮食',
        icon: '🍚',
        material: '新稻、时蔬',
        steps: [
          '小暑后早稻成熟',
          '碾新米，煮白饭',
          '配时蔬，尝新祭祖'
        ],
        myRecord: null
      },
      {
        id: 'shaiqiu',
        name: '晒书画衣物',
        category: '仪式',
        icon: '☀️',
        material: '书画、被褥、皮货',
        steps: [
          '择晴日，曝书画于庭',
          '晒被褥、皮货，防霉防蛀',
          '文人晒书，曝腹诗书'
        ],
        myRecord: null
      },
      {
        id: 'chiqiu',
        name: '吃炒面炒豆',
        category: '饮食',
        icon: '🫘',
        material: '面粉、黄豆、芝麻',
        steps: [
          '面粉炒熟，曰"炒面"',
          '黄豆炒香，磨粉',
          '以沸水冲食，简便充饥'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['荷花盛开', '紫薇花红', '西瓜甜'],
      animals: ['蟋蟀鸣叫', '蝉声震耳', '蜻蜓成群'],
      farming: '小暑一声雷，倒转做黄梅'
    },
    
    regions: [
      { name: '江南', feature: '吃黄鳝，赛龙舟', recipe: '响油鳝糊+龙舟饭' },
      { name: '山东', feature: '吃炒面，祭谷神', recipe: '炒面粉+芝麻盐' },
      { name: '台湾', feature: '吃凤梨，祈福', recipe: '凤梨鲜食+凤梨酥' }
    ]
  },

  {
    id: 'dashu',
    name: '大暑',
    alias: '',
    order: 12,
    date: '7月22-24日',
    season: 'summer',
    
    pentads: [
      { 
        day: 1, 
        name: '腐草为萤', 
        desc: '腐草中萤火虫卵孵化',
        observe: '夜晚草丛寻找萤火虫',
        image: '/minsu/images/pentad/yinghuochong.png'
      },
      { 
        day: 2, 
        name: '土润溽暑', 
        desc: '土地潮湿，暑气蒸腾',
        observe: '感受地面返潮，空气闷热',
        image: '/minsu/images/pentad/turun.png'
      },
      { 
        day: 3, 
        name: '大雨时行', 
        desc: '大雨时常降下',
        observe: '记录午后雷阵雨',
        image: '/minsu/images/pentad/dayu.png'
      }
    ],
    
    customs: [
      {
        id: 'zhiyang',
        name: '喝羊汤',
        category: '饮食',
        icon: '🍲',
        material: '羊肉、生姜、香菜',
        steps: [
          '伏天吃羊肉，以热制热',
          '配生姜、香菜，发汗排毒',
          '山东单县羊汤最为著名'
        ],
        myRecord: null
      },
      {
        id: 'chixian',
        name: '吃仙草',
        category: '饮食',
        icon: '🍮',
        material: '凉粉草、糖、冰水',
        steps: [
          '凉粉草煎汁，冷凝成冻',
          '切块加糖、冰水',
          '消暑解渴，曰"烧仙草"'
        ],
        myRecord: null
      },
      {
        id: 'fanghe',
        name: '放荷灯',
        category: '仪式',
        icon: '🪷',
        material: '荷叶、蜡烛、丝线',
        steps: [
          '以荷叶托蜡烛',
          '点燃后放入河塘',
          '祈福消灾，夏夜风凉'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['荷花极盛', '茉莉花市', '晚稻插秧'],
      animals: ['萤火虫飞', '蝉鸣最烈', '蛙声如潮'],
      farming: '大暑不暑，五谷不鼓'
    },
    
    regions: [
      { name: '广东', feature: '吃仙草，饮凉茶', recipe: '烧仙草+廿四味+龟苓膏' },
      { name: '福建', feature: '吃荔枝，羊肉', recipe: '荔枝蘸酱油+温汤羊肉' },
      { name: '山东', feature: '喝羊汤，晒姜', recipe: '单县羊汤+伏姜+面饼' }
    ]
  },

  // ========== 秋季 ==========
  {
    id: 'liqiu',
    name: '立秋',
    alias: '',
    order: 13,
    date: '8月7-9日',
    season: 'autumn',
    
    pentads: [
      { 
        day: 1, 
        name: '凉风至', 
        desc: '凉风开始吹来',
        observe: '感受风中是否有凉意',
        image: '/minsu/images/pentad/liangfeng.png'
      },
      { 
        day: 2, 
        name: '白露降', 
        desc: '清晨出现白色露水',
        observe: '早起观察草叶露珠',
        image: '/minsu/images/pentad/bailu.png'
      },
      { 
        day: 3, 
        name: '寒蝉鸣', 
        desc: '寒蝉（秋蝉）开始鸣叫',
        observe: '听蝉声是否凄切',
        image: '/minsu/images/pentad/hanchan.png'
      }
    ],
    
    customs: [
      {
        id: 'yaoqiu',
        name: '咬秋',
        category: '饮食',
        icon: '🍉',
        material: '西瓜、秋桃、肉',
        steps: [
          '立秋日吃西瓜，曰"咬秋"',
          '或蒸茄脯，煎香薷饮',
          '谓可免冬季腹泻'
        ],
        myRecord: null
      },
      {
        id: 'chengqiu',
        name: '称水称人',
        category: '仪式',
        icon: '⚖️',
        material: '秤、水桶',
        steps: [
          '以秤称人，与立夏比',
          '若轻了，曰"苦夏"',
          '需"贴秋膘"，补回体重'
        ],
        myRecord: null
      },
      {
        id: 'tieqiu',
        name: '贴秋膘',
        category: '饮食',
        icon: '🥩',
        material: '肘子、白肉、饺子',
        steps: [
          '炖肘子、白切肉',
          '吃饺子、炖鸡',
          '以肉贴膘，补夏之虚'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['梧桐落叶', '葵花结籽', '葡萄紫'],
      animals: ['寒蝉凄切', '蟋蟀入室', '燕子南归'],
      farming: '立秋三场雨，秕稻变成米'
    },
    
    regions: [
      { name: '北京', feature: '贴秋膘，吃酱肘子', recipe: '天福号酱肘子+烙饼卷肉' },
      { name: '东北', feature: '吃饺子，抢秋膘', recipe: '猪肉白菜饺子+蒜泥' },
      { name: '杭州', feature: '食秋桃，啃西瓜', recipe: '秋桃鲜食+西瓜"咬秋"' }
    ]
  },

  {
    id: 'chushu',
    name: '处暑',
    alias: '出暑',
    order: 14,
    date: '8月22-24日',
    season: 'autumn',
    
    pentads: [
      { 
        day: 1, 
        name: '鹰乃祭鸟', 
        desc: '老鹰开始大量捕猎鸟类',
        observe: '观察天空鹰隼盘旋',
        image: '/minsu/images/pentad/yingji.png'
      },
      { 
        day: 2, 
        name: '天地始肃', 
        desc: '天地间肃杀之气渐起',
        observe: '感受草木渐黄，天地清明',
        image: '/minsu/images/pentad/tiandi.png'
      },
      { 
        day: 3, 
        name: '禾乃登', 
        desc: '五谷开始成熟登场',
        observe: '观察稻田金黄一片',
        image: '/minsu/images/pentad/heideng.png'
      }
    ],
    
    customs: [
      {
        id: 'fanghe',
        name: '放河灯',
        category: '仪式',
        icon: '🏮',
        material: '荷叶、蜡烛、纸船',
        steps: [
          '处暑前后中元节',
          '制荷灯，放河中',
          '祭奠先人，祈福平安'
        ],
        myRecord: null
      },
      {
        id: 'kaiyuy',
        name: '开渔节',
        category: '仪式',
        icon: '🐟',
        material: '渔船、祭品、鞭炮',
        steps: [
          '东海渔民择日开海',
          '祭海神，放鞭炮',
          '百舸争流，海鲜上市'
        ],
        myRecord: null
      },
      {
        id: 'chiyuan',
        name: '吃龙眼',
        category: '饮食',
        icon: '🟤',
        material: '龙眼、银耳、冰糖',
        steps: [
          '处暑后龙眼成熟',
          '鲜食或炖银耳',
          '滋补安神，秋补佳品'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['桂花初香', '稻穗金黄', '棉花吐絮'],
      animals: ['老鹰捕猎', '蟋蟀鸣叫', '燕子南飞'],
      farming: '处暑满地黄，家家修廪仓'
    },
    
    regions: [
      { name: '宁波', feature: '开渔节，吃海鲜', recipe: '清蒸梭子蟹+红烧带鱼' },
      { name: '福建', feature: '吃龙眼，放河灯', recipe: '鲜龙眼+银耳羹' },
      { name: '北京', feature: '吃烤鸭，贴秋膘', recipe: '北京烤鸭+荷叶饼+甜面酱' }
    ]
  },

  {
    id: 'bailu',
    name: '白露',
    alias: '',
    order: 15,
    date: '9月7-9日',
    season: 'autumn',
    
    pentads: [
      { 
        day: 1, 
        name: '鸿雁来', 
        desc: '大雁从北方飞来',
        observe: '观察天空雁阵南归',
        image: '/minsu/images/pentad/hongyanlai.png'
      },
      { 
        day: 2, 
        name: '玄鸟归', 
        desc: '燕子南归离去',
        observe: '观察屋檐下燕子是否减少',
        image: '/minsu/images/pentad/xuanniaogui.png'
      },
      { 
        day: 3, 
        name: '群鸟养羞', 
        desc: '百鸟开始储存食物过冬',
        observe: '观察鸟儿衔果藏食',
        image: '/minsu/images/pentad/qunniao.png'
      }
    ],
    
    customs: [
      {
        id: 'cibailu',
        name: '饮白露茶',
        category: '饮食',
        icon: '🍵',
        material: '白露前采摘的秋茶',
        steps: [
          '白露前后采摘的茶叶',
          '经夏日酝酿，味醇厚',
          '泡之甘香，胜过春茶'
        ],
        myRecord: null
      },
      {
        id: 'cibailu',
        name: '吃龙眼',
        category: '饮食',
        icon: '🟤',
        material: '大颗龙眼',
        steps: [
          '白露日吃龙眼',
          '一颗龙眼顶一只鸡',
          '滋补身体，准备过冬'
        ],
        myRecord: null
      },
      {
        id: 'shibailu',
        name: '收清露',
        category: '仪式',
        icon: '💧',
        material: '盘、碗',
        steps: [
          '清晨以盘承接荷叶露珠',
          '煎茶或洗眼',
          '谓可明目治病'
        ],
        extinct: true,
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['桂花盛开', '菊花初绽', '芦苇白'],
      animals: ['大雁南归', '燕子离去', '蟋蟀鸣叫'],
      farming: '白露白茫茫，谷子满田黄'
    },
    
    regions: [
      { name: '福州', feature: '吃龙眼，一颗顶鸡', recipe: '鲜龙眼+龙眼干炖鸡' },
      { name: '太湖', feature: '祭禹王，吃菱角', recipe: '水红菱+莼菜汤' },
      { name: '湖南', feature: '酿白露米酒', recipe: '糯米+酒曲，白露日酿制' }
    ]
  },

  {
    id: 'qiufen',
    name: '秋分',
    alias: '日夜分',
    order: 16,
    date: '9月22-24日',
    season: 'autumn',
    
    pentads: [
      { 
        day: 1, 
        name: '雷始收声', 
        desc: '雷声渐少',
        observe: '记录今年最后一声雷',
        image: '/minsu/images/pentad/leishou.png'
      },
      { 
        day: 2, 
        name: '蛰虫坯户', 
        desc: '虫子开始封洞准备冬眠',
        observe: '观察墙洞、树洞是否有封土',
        image: '/minsu/images/pentad/zhechongpi.png'
      },
      { 
        day: 3, 
        name: '水始涸', 
        desc: '河湖水量减少',
        observe: '观察池塘水位下降',
        image: '/minsu/images/pentad/shuihe.png'
      }
    ],
    
    customs: [
      {
        id: 'qiuniu',
        name: '送秋牛',
        category: '仪式',
        icon: '🐂',
        material: '红纸、黄纸、农事图',
        steps: [
          '以红纸黄纸印农事图',
          '送于农家，曰"秋牛图"',
          '说秋人即兴唱诵，劝农耕作'
        ],
        extinct: true,
        myRecord: null
      },
      {
        id: 'dangqiu',
        name: '竖蛋庆秋',
        category: '游戏',
        icon: '🥚',
        material: '新鲜鸡蛋',
        steps: [
          '秋分日竖蛋，与春分同',
          '或吃汤圆，粘雀嘴',
          '防雀害，祝丰收'
        ],
        myRecord: null
      },
      {
        id: 'baiyue',
        name: '拜月祭月',
        category: '仪式',
        icon: '🌙',
        material: '月饼、瓜果、香烛',
        steps: [
          '秋分前后中秋',
          '设香案，供月饼瓜果',
          '拜月祈福，团圆赏月'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['菊花黄', '桂花落', '柿子红'],
      animals: ['大雁南飞', '蟋蟀入室', '蝉声绝'],
      farming: '秋分种麦正当时'
    },
    
    regions: [
      { name: '江南', feature: '吃汤圆，粘雀嘴', recipe: '无馅汤圆+竹签插田' },
      { name: '客家', feature: '吃秋菜，野苋菜', recipe: '野苋菜+鱼片滚汤' },
      { name: '北京', feature: '吃月饼，拜月', recipe: '自来红月饼+瓜果供月' }
    ]
  },

  {
    id: 'hanlu',
    name: '寒露',
    alias: '',
    order: 17,
    date: '10月8-9日',
    season: 'autumn',
    
    pentads: [
      { 
        day: 1, 
        name: '鸿雁来宾', 
        desc: '最后一批大雁飞来',
        observe: '观察雁阵是否减少',
        image: '/minsu/images/pentad/hongyanbin.png'
      },
      { 
        day: 2, 
        name: '雀入大水为蛤', 
        desc: '雀鸟少见，海边蛤蜊增多',
        observe: '海边拾贝，联想古人想象',
        image: '/minsu/images/pentad/quege.png'
      },
      { 
        day: 3, 
        name: '菊有黄华', 
        desc: '菊花开始盛开',
        observe: '赏菊，记录菊之品种',
        image: '/minsu/images/pentad/juhua.png'
      }
    ],
    
    customs: [
      {
        id: 'denggao',
        name: '登高望远',
        category: '仪式',
        icon: '⛰️',
        material: '茱萸、菊花酒、糕点',
        steps: [
          '寒露前后重阳节',
          '登高山，佩茱萸',
          '饮菊花酒，吃重阳糕'
        ],
        myRecord: null
      },
      {
        id: 'chiju',
        name: '饮菊花酒',
        category: '饮食',
        icon: '🍶',
        material: '菊花、糯米、酒曲',
        steps: [
          '采菊花，与糯米同酿',
          '一年后开封',
          '饮之明目，延年益寿'
        ],
        myRecord: null
      },
      {
        id: 'chixie',
        name: '吃母蟹',
        category: '饮食',
        icon: '🦀',
        material: '雌蟹、姜醋、黄酒',
        steps: [
          '寒露前后雌蟹膏满',
          '清蒸，配姜醋',
          '饮黄酒，驱寒暖胃'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['菊花盛放', '芙蓉花开', '枫叶初红'],
      animals: ['大雁南尽', '蟋蟀渐少', '蝉声绝'],
      farming: '寒露种麦正当时'
    },
    
    regions: [
      { name: '江南', feature: '吃蟹，赏菊', recipe: '清蒸大闸蟹+菊花酒' },
      { name: '北京', feature: '吃花糕，登高', recipe: '重阳糕+栗子糕+茱萸囊' },
      { name: '潮汕', feature: '吃芝麻，绿豆糕', recipe: '芝麻糊+绿豆糕+杏仁茶' }
    ]
  },

  {
    id: 'shuangjiang',
    name: '霜降',
    alias: '',
    order: 18,
    date: '10月23-24日',
    season: 'autumn',
    
    pentads: [
      { 
        day: 1, 
        name: '豺乃祭兽', 
        desc: '豺狼开始捕猎，摆猎物似祭',
        observe: '了解豺狼习性，动物园观察',
        image: '/minsu/images/pentad/chaiji.png'
      },
      { 
        day: 2, 
        name: '草木黄落', 
        desc: '草木枯黄落叶',
        observe: '收集落叶，制作标本',
        image: '/minsu/images/pentad/caomuhuang.png'
      },
      { 
        day: 3, 
        name: '蛰虫咸俯', 
        desc: '虫子全部蛰伏入土',
        observe: '观察最后一批昆虫动向',
        image: '/minsu/images/pentad/zhechongfu.png'
      }
    ],
    
    customs: [
      {
        id: 'chishi',
        name: '吃柿子',
        category: '饮食',
        icon: '🟠',
        material: '红柿、白酒',
        steps: [
          '霜降柿子红如火',
          '鲜食或制柿饼',
          '谚云："霜降吃丁柿，不会流鼻涕"'
        ],
        myRecord: null
      },
      {
        id: 'dengyang',
        name: '送芋鬼',
        category: '仪式',
        icon: '👻',
        material: '瓦片、干草、芋头',
        steps: [
          '以瓦片堆砌河内，烧干草',
          '将芋头放于瓦片中煨熟',
          '最后将瓦片丢至村外，驱邪'
        ],
        extinct: true,
        myRecord: null
      },
      {
        id: 'buyang',
        name: '补冬不如补霜降',
        category: '饮食',
        icon: '🍖',
        material: '羊肉、牛肉、萝卜',
        steps: [
          '霜降进补，胜过冬补',
          '炖羊肉、牛肉',
          '配萝卜，防燥不腻'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['柿子红', '枫叶丹', '菊花残'],
      animals: ['豺狼捕猎', '蟋蟀绝鸣', '候鸟尽去'],
      farming: '霜降无雨，清明无雨'
    },
    
    regions: [
      { name: '广西', feature: '吃柿子，吃牛肉', recipe: '牛肉炒粉+柿子饼' },
      { name: '闽南', feature: '吃鸭子，贴秋膘', recipe: '姜母鸭+四物汤' },
      { name: '山东', feature: '吃萝卜，吃羊肉', recipe: '羊肉汤+潍县萝卜' }
    ]
  },

  // ========== 冬季 ==========
  {
    id: 'lidong',
    name: '立冬',
    alias: '',
    order: 19,
    date: '11月7-8日',
    season: 'winter',
    
    pentads: [
      { 
        day: 1, 
        name: '水始冰', 
        desc: '水面开始结冰',
        observe: '观察水盆、池塘薄冰',
        image: '/minsu/images/pentad/shuibing.png'
      },
      { 
        day: 2, 
        name: '地始冻', 
        desc: '土地开始冻结',
        observe: '踩踏土地，感受硬度变化',
        image: '/minsu/images/pentad/didong.png'
      },
      { 
        day: 3, 
        name: '雉入大水为蜃', 
        desc: '野鸡少见，海边大蛤增多',
        observe: '海边拾贝，联想古人想象',
        image: '/minsu/images/pentad/zhishen.png'
      }
    ],
    
    customs: [
      {
        id: 'yingdong',
        name: '迎冬贺冬',
        category: '仪式',
        icon: '🎉',
        material: '新衣、羊肉、饺子',
        steps: [
          '天子率百官迎冬于北郊',
          '民间备新衣，互相拜贺',
          '曰"拜冬"，如年节'
        ],
        extinct: true,
        myRecord: null
      },
      {
        id: 'chijiao',
        name: '吃饺子',
        category: '饮食',
        icon: '🥟',
        material: '面粉、羊肉、白菜',
        steps: [
          '立冬不端饺子碗',
          '冻掉耳朵没人管',
          '包羊肉白菜馅，蘸醋蒜'
        ],
        myRecord: null
      },
      {
        id: 'buchu',
        name: '补冬',
        category: '饮食',
        icon: '🍲',
        material: '羊肉、狗肉、人参',
        steps: [
          '立冬补冬，补嘴空',
          '炖羊肉汤，加人参',
          '或吃狗肉，驱寒暖身'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['芦苇白', '松柏青', '白菜甜'],
      animals: ['水始冰', '雉鸡藏', '昆虫绝'],
      farming: '立冬种麦，种一瓢，收一斗'
    },
    
    regions: [
      { name: '北方', feature: '吃饺子，补冬', recipe: '羊肉白菜饺子+饺子汤' },
      { name: '江南', feature: '吃团子，酿黄酒', recipe: '糯米团子+冬酿酒' },
      { name: '潮汕', feature: '吃甘蔗，炒香饭', recipe: '甘蔗+花生+香菇炒饭' }
    ]
  },

  {
    id: 'xiaoxue',
    name: '小雪',
    alias: '',
    order: 20,
    date: '11月22-23日',
    season: 'winter',
    
    pentads: [
      { 
        day: 1, 
        name: '虹藏不见', 
        desc: '彩虹不再出现',
        observe: '观察雨后是否无彩虹',
        image: '/minsu/images/pentad/hongcang.png'
      },
      { 
        day: 2, 
        name: '天气上升地气下降', 
        desc: '天地之气不交，闭塞成冬',
        observe: '感受空气干燥，天地清冷',
        image: '/minsu/images/pentad/tiandiqi.png'
      },
      { 
        day: 3, 
        name: '闭塞而成冬', 
        desc: '万物闭塞，正式进入冬季',
        observe: '观察草木完全凋零',
        image: '/minsu/images/pentad/bisai.png'
      }
    ],
    
    customs: [
      {
        id: 'laoba',
        name: '腌腊肉',
        category: '饮食',
        icon: '🥓',
        material: '猪肉、盐、花椒、白酒',
        steps: [
          '选五花肉，抹盐花椒',
          '喷白酒，压石块腌制',
          '七日后晾晒，至春节食用'
        ],
        myRecord: null
      },
      {
        id: 'chixue',
        name: '吃糍粑',
        category: '饮食',
        icon: '🍡',
        material: '糯米、红糖、黄豆粉',
        steps: [
          '糯米蒸熟，捣烂成粑',
          '搓圆压扁，油煎或烤',
          '蘸红糖黄豆粉，软糯香甜'
        ],
        myRecord: null
      },
      {
        id: 'shaojiu',
        name: '酿小雪酒',
        category: '饮食',
        icon: '🍶',
        material: '糯米、酒曲、泉水',
        steps: [
          '小雪日取水，谓极清冽',
          '以糯米、酒曲酿制',
          '至春节饮用，曰"年酒"'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['芦苇枯', '松柏翠', '白菜窖藏'],
      animals: ['昆虫蛰伏', '麻雀觅食', '喜鹊筑巢'],
      farming: '小雪地封严，大雪河封严'
    },
    
    regions: [
      { name: '湘西', feature: '杀年猪，吃刨汤', recipe: '新鲜猪血+内脏+火锅' },
      { name: '客家', feature: '吃糍粑，酿米酒', recipe: '糯米糍粑+客家娘酒' },
      { name: '山东', feature: '腌白菜，晒鱼干', recipe: '大白菜+海盐腌制' }
    ]
  },

  {
    id: 'daxue',
    name: '大雪',
    alias: '',
    order: 21,
    date: '12月6-8日',
    season: 'winter',
    
    pentads: [
      { 
        day: 1, 
        name: '鹖鴠不鸣', 
        desc: '寒号鸟（鹖鴠）不再鸣叫',
        observe: '山林中是否寂静无声',
        image: '/minsu/images/pentad/hedan.png'
      },
      { 
        day: 2, 
        name: '虎始交', 
        desc: '老虎开始交配',
        observe: '了解老虎冬季习性',
        image: '/minsu/images/pentad/hujiao.png'
      },
      { 
        day: 3, 
        name: '荔挺出', 
        desc: '荔草（马兰草）抽出新芽',
        observe: '雪地中寻找绿色草芽',
        image: '/minsu/images/pentad/liting.png'
      }
    ],
    
    customs: [
      {
        id: 'chiyang',
        name: '吃羊肉',
        category: '饮食',
        icon: '🍖',
        material: '羊肉、萝卜、枸杞',
        steps: [
          '大雪进补，羊肉为佳',
          '炖萝卜枸杞，去膻滋补',
          '全家围炉，热气腾腾'
        ],
        myRecord: null
      },
      {
        id: 'guanxue',
        name: '赏雪玩雪',
        category: '游戏',
        icon: '❄️',
        material: '雪球、雪人道具',
        steps: [
          '大雪纷飞，出门赏雪',
          '堆雪人，打雪仗',
          '或踏雪寻梅，诗意盎然'
        ],
        myRecord: null
      },
      {
        id: 'zhoutou',
        name: '腌肉煮粥',
        category: '饮食',
        icon: '🥣',
        material: '腌肉、大米、杂粮',
        steps: [
          '以小雪腌制的腊肉',
          '切丁与大米杂粮同煮',
          '香气四溢，冬日暖胃'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['腊梅初绽', '松柏傲雪', '冬麦覆雪'],
      animals: ['寒号鸟噤', '老虎交配', '麻雀雪中求食'],
      farming: '大雪兆丰年，无雪要遭殃'
    },
    
    regions: [
      { name: '东北', feature: '杀猪菜，炖酸菜', recipe: '酸菜白肉+血肠+粉条' },
      { name: '北京', feature: '涮羊肉，糖葫芦', recipe: '铜锅涮肉+芝麻酱+冻豆腐' },
      { name: '南京', feature: '吃年糕，腌腊肉', recipe: '桂花年糕+板鸭' }
    ]
  },

  {
    id: 'dongzhi',
    name: '冬至',
    alias: '亚岁',
    order: 22,
    date: '12月21-23日',
    season: 'winter',
    
    pentads: [
      { 
        day: 1, 
        name: '蚯蚓结', 
        desc: '蚯蚓蜷曲成团',
        observe: '翻土观察蚯蚓形态',
        image: '/minsu/images/pentad/qiuyinjie.png'
      },
      { 
        day: 2, 
        name: '麋角解', 
        desc: '麋鹿的角开始脱落',
        observe: '动物园观察麋鹿换角',
        image: '/minsu/images/pentad/mijiao.png'
      },
      { 
        day: 3, 
        name: '水泉动', 
        desc: '地下泉水开始流动',
        observe: '观察井水温热，泉水涌动',
        image: '/minsu/images/pentad/shuiquan.png'
      }
    ],
    
    customs: [
      {
        id: 'jiaozi',
        name: '吃饺子',
        category: '饮食',
        icon: '🥟',
        material: '面粉、羊肉、韭菜',
        steps: [
          '冬至不端饺子碗',
          '冻掉耳朵没人管',
          '包羊肉韭菜馅，蘸醋蒜'
        ],
        myRecord: null
      },
      {
        id: 'tangyuan',
        name: '吃汤圆',
        category: '饮食',
        icon: '⚪',
        material: '糯米粉、芝麻、花生',
        steps: [
          '南方冬至吃汤圆',
          '包芝麻花生馅',
          '谓"团团圆圆"，添岁'
        ],
        myRecord: null
      },
      {
        id: 'xiaotu',
        name: '画九九消寒图',
        category: '手工艺',
        icon: '📜',
        material: '宣纸、墨、朱笔',
        steps: [
          '画梅花一枝，八十一瓣',
          '日染一瓣，瓣尽而春回',
          '或写九个字，每日填一笔'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['腊梅盛开', '水仙养盆', '冬青红果'],
      animals: ['蚯蚓蜷曲', '麋鹿换角', '井水微温'],
      farming: '冬至一阳生，春耕早打算'
    },
    
    regions: [
      { name: '北方', feature: '吃饺子，宰羊', recipe: '羊肉饺子+羊杂汤' },
      { name: '江南', feature: '吃汤圆，长线面', recipe: '芝麻汤圆+猪脚面' },
      { name: '宁夏', feature: '喝头脑，吃羊肉', recipe: '羊肉+山药+藕粉糊' }
    ]
  },

  {
    id: 'xiaohan',
    name: '小寒',
    alias: '',
    order: 23,
    date: '1月5-7日',
    season: 'winter',
    
    pentads: [
      { 
        day: 1, 
        name: '雁北乡', 
        desc: '大雁开始北归',
        observe: '观察天空是否有北飞雁阵',
        image: '/minsu/images/pentad/yanbeixiang.png'
      },
      { 
        day: 2, 
        name: '鹊始巢', 
        desc: '喜鹊开始筑巢',
        observe: '观察树梢喜鹊筑巢',
        image: '/minsu/images/pentad/queschao.png'
      },
      { 
        day: 3, 
        name: '雉始鸲', 
        desc: '野鸡开始鸣叫',
        observe: '山林中听野鸡叫声',
        image: '/minsu/images/pentad/zhigou.png'
      }
    ],
    
    customs: [
      {
        id: 'chila',
        name: '吃腊八粥',
        category: '饮食',
        icon: '🥣',
        material: '糯米、红豆、花生、枣、栗',
        steps: [
          '八样杂粮浸泡一夜',
          '小火慢熬至粘稠',
          '腊月初八食用，祈福'
        ],
        myRecord: null
      },
      {
        id: 'tianxiao',
        name: '填九九消寒图',
        category: '手工艺',
        icon: '✏️',
        material: '消寒图、朱笔',
        steps: [
          '每日以朱笔填一瓣梅花',
          '或写"庭前垂柳珍重待春风"',
          '九字九笔，每日填一笔'
        ],
        myRecord: null
      },
      {
        id: 'chiyang',
        name: '吃羊肉暖胃',
        category: '饮食',
        icon: '🍲',
        material: '羊肉、当归、生姜',
        steps: [
          '小寒大寒，冷成冰团',
          '炖当归生姜羊肉汤',
          '驱寒补血，冬日最佳'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['腊梅盛放', '水仙开花', '松竹常青'],
      animals: ['大雁北归', '喜鹊筑巢', '野鸡晨鸣'],
      farming: '小寒胜大寒，常见不稀罕'
    },
    
    regions: [
      { name: '北京', feature: '吃腊八粥，滑冰', recipe: '杂粮腊八粥+腊八蒜' },
      { name: '南京', feature: '吃菜饭，煮糯米饭', recipe: '矮脚黄青菜+咸肉饭' },
      { name: '广东', feature: '吃糯米饭，腊味', recipe: '糯米+腊肠+腊肉饭' }
    ]
  },

  {
    id: 'dahan',
    name: '大寒',
    alias: '',
    order: 24,
    date: '1月20-21日',
    season: 'winter',
    
    pentads: [
      { 
        day: 1, 
        name: '鸡乳', 
        desc: '母鸡开始孵小鸡',
        observe: '农家观察母鸡抱窝',
        image: '/minsu/images/pentad/jiru.png'
      },
      { 
        day: 2, 
        name: '征鸟厉疾', 
        desc: '鹰隼捕食迅猛',
        observe: '观察猛禽盘旋捕食',
        image: '/minsu/images/pentad/zhengniao.png'
      },
      { 
        day: 3, 
        name: '水泽腹坚', 
        desc: '河湖冰层坚实',
        observe: '试探冰层厚度，注意安全',
        image: '/minsu/images/pentad/shuize.png'
      }
    ],
    
    customs: [
      {
        id: 'chinian',
        name: '吃年夜饭',
        category: '饮食',
        icon: '🍽️',
        material: '鸡、鱼、肉、年糕',
        steps: [
          '大寒近春节，备年货',
          '杀年猪，蒸年糕',
          '全家团圆，辞旧迎新'
        ],
        myRecord: null
      },
      {
        id: 'tianxiao',
        name: '完成消寒图',
        category: '手工艺',
        icon: '🌸',
        material: '九九消寒图',
        steps: [
          '填完最后一瓣梅花',
          '八十一瓣尽染，春已至',
          '裱起收藏，岁岁年年'
        ],
        myRecord: null
      },
      {
        id: 'yasui',
        name: '备年货，辞旧岁',
        category: '仪式',
        icon: '🧧',
        material: '新衣、鞭炮、春联',
        steps: [
          '扫尘除旧，干干净净过年',
          '贴春联、福字、窗花',
          '守岁迎春，万象更新'
        ],
        myRecord: null
      }
    ],
    
    phenology: {
      plants: ['瑞香吐芳', '兰花幽香', '山矾洁白'],
      animals: ['母鸡孵雏', '鹰隼盘旋', '冰下鱼动'],
      farming: '大寒不寒，人马不安'
    },
    
    regions: [
      { name: '北方', feature: '吃消寒糕，炖肉', recipe: '糯米年糕+红烧肉+冻豆腐' },
      { name: '安徽', feature: '炸圆子，做豆腐', recipe: '糯米圆子+炸豆腐+鸡汤' },
      { name: '广东', feature: '吃糯米饭，煲汤', recipe: '糯米饭+人参鸡汤+盆菜' }
    ]
  }
];

module.exports = { SOLAR_TERMS };
