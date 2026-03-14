Page({
  data: {
    searchKey: "",
    swiperList: [
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/minju1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/minju2.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/minju3.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/minju4.jpg"
    ],
    minjuList: [
      {
        name: "北京四合院",
        intro: "北京·北方传统民居代表，合院式建筑典范。",
        detail: "北京四合院又称四合房，是中国北方的传统民居，格局为一个院子四面建有房屋，从四面将庭院合围在中间，故名四合院。其历史悠久，自元代正式建都北京起，四合院就成为北京民居的主要形式，体现了中国传统的家庭伦理和居住文化。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/beijing.jpg",
        location: "北京市东城区、西城区老胡同内",
        latitude: 39.9289,
        longitude: 116.3883,
        age: "元代（1271年）开始盛行",
        dynasty: "元代至今",
        level: "国家级非物质文化遗产",
        tags: ["北方民居之首", "合院建筑", "胡同文化"],
        feature: "坐北朝南，中轴对称，分为外院和内院，四面临街，私密性强，讲究风水布局，体现“尊卑有序”的传统礼制。",
        open_time: "部分四合院可参观（如郭沫若故居）09:00-16:30",
        ticket: "部分故居门票20-50元不等",
        duration: "1-2小时"
      },
      {
        name: "福建土楼",
        intro: "福建龙岩·客家特色民居，世界文化遗产。",
        detail: "福建土楼主要分布在闽西南的龙岩、漳州等地，是客家先民的智慧结晶，以生土为主要建筑材料，经分层夯筑而成，兼具防御和居住功能。土楼造型多样，有圆形、方形、五凤楼等，2008年被列入世界文化遗产名录，是中国民居建筑的瑰宝。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/tulou.jpg",
        location: "福建省龙岩市永定区、漳州市南靖县",
        latitude: 24.7569,
        longitude: 117.0169,
        age: "宋元时期始建，明清鼎盛",
        dynasty: "宋元始建，明清发展",
        level: "世界文化遗产",
        tags: ["客家民居", "防御性建筑", "圆形土楼"],
        feature: "单体建筑规模宏大，最大的土楼可住数百人，外墙厚实坚固，内部有完善的生活设施，体现了客家人的集体精神。",
        open_time: "08:00-17:00",
        ticket: "90元（永定土楼联票）",
        duration: "3-4小时"
      },
      {
        name: "山西平遥古城民居",
        intro: "山西平遥·晋商大院式民居，明清建筑精华。",
        detail: "平遥古城的民居以四合院为基础，结合晋商文化特色，布局严谨，装饰精美，多为二进或三进院落，砖雕、木雕、石雕工艺精湛，是明清时期晋商财富和文化的集中体现，1997年平遥古城列入世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/pingyao.jpg",
        location: "山西省晋中市平遥县古城区内",
        latitude: 37.2075,
        longitude: 112.1818,
        age: "明洪武三年（1370年）古城扩建后定型",
        dynasty: "明清时期",
        level: "世界文化遗产",
        tags: ["晋商民居", "四合院变体", "三雕艺术"],
        feature: "房屋多为砖木结构，青砖灰瓦，高墙深院，院门多设在东南角，院内正房为长辈居住，厢房为晚辈居住，体现了传统的家族制度。",
        open_time: "08:00-18:00（古城全天开放）",
        ticket: "125元（古城通票）",
        duration: "2-3小时"
      },
      {
        name: "云南丽江古城民居",
        intro: "云南丽江·纳西族特色民居，依山傍水而建。",
        detail: "丽江古城的民居融合了纳西族、白族、藏族等多民族建筑风格，以木质结构为主，多为两层楼，三坊一照壁、四合五天井是典型布局，房屋依山傍水，与自然环境融为一体，1997年列入世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/lijiang.jpg",
        location: "云南省丽江市古城区大研街道",
        latitude: 26.8679,
        longitude: 100.2373,
        age: "宋末元初（13世纪）始建",
        dynasty: "宋元始建，明清发展",
        level: "世界文化遗产",
        tags: ["纳西族民居", "水系民居", "木构建筑"],
        feature: "房屋多采用穿斗式木结构，墙体用鹅卵石堆砌，屋顶铺青瓦，院内种植花木，家家有院，户户通水，体现了“天人合一”的居住理念。",
        open_time: "全天开放（部分景点08:30-17:30）",
        ticket: "古城维护费80元",
        duration: "3-4小时"
      },
      {
        name: "安徽宏村民居",
        intro: "安徽黄山·徽派民居代表，水墨乡村典范。",
        detail: "宏村民居属于徽派建筑，以马头墙、小青瓦为特色，房屋多为砖木结构，布局遵循“枕山、环水、面屏”的原则，村内水系纵横，民居与水景相映成趣，2000年宏村被列入世界文化遗产名录。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/hongcun.jpg",
        location: "安徽省黄山市黟县宏村镇",
        latitude: 30.1089,
        longitude: 117.9278,
        age: "南宋绍兴元年（1131年）始建",
        dynasty: "南宋始建，明清鼎盛",
        level: "世界文化遗产",
        tags: ["徽派民居", "水墨乡村", "牛形水系"],
        feature: "以“牛”为形规划村落，水系为“牛肠”，月沼为“牛胃”，南湖为“牛肚”，民居白墙黛瓦，雕梁画栋，与山水融为一体，被誉为“中国画里的乡村”。",
        open_time: "07:30-17:30",
        ticket: "104元（含景区内讲解）",
        duration: "2-3小时"
      },
      {
        name: "广东开平碉楼",
        intro: "广东江门·侨乡特色民居，中西合璧建筑。",
        detail: "开平碉楼是侨乡人民为防御匪患和洪涝而建，融合了中国传统民居与西方建筑风格，集居住和防御功能于一体，2007年被列入世界文化遗产名录，是中国近代建筑史上的独特景观。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/diaolou.jpg",
        location: "广东省江门市开平市境内",
        latitude: 22.3569,
        longitude: 112.6389,
        age: "明末清初始建，民国鼎盛",
        dynasty: "明末清初至民国",
        level: "世界文化遗产",
        tags: ["侨乡村落", "中西合璧", "防御碉楼"],
        feature: "碉楼多为钢筋混凝土或砖石结构，层数3-5层，外墙设有瞭望口、射击孔，内部装饰兼具中式木雕和西式浮雕，体现了侨乡文化的包容性。",
        open_time: "08:30-17:30",
        ticket: "180元（联票）",
        duration: "3-4小时"
      },
      {
        name: "陕西窑洞",
        intro: "陕西延安·黄土高原特色民居，穴居式建筑。",
        detail: "陕西窑洞是黄土高原地区的传统民居，利用黄土的直立性挖掘而成，分为靠崖式、地坑式、砖石窑等类型，冬暖夏凉，适应黄土高原的气候和地理条件，是北方民居的重要形式。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/yaodong.jpg",
        location: "陕西省延安市、榆林市等黄土高原地区",
        latitude: 36.6069,
        longitude: 109.4722,
        age: "新石器时代开始出现，沿用至今",
        dynasty: "远古至今",
        level: "国家级非物质文化遗产",
        tags: ["黄土民居", "穴居建筑", "冬暖夏凉"],
        feature: "因地制宜，就地取材，无需大量建筑材料，内部空间宽敞，窑洞上方可种植作物，体现了人与自然和谐共生的理念。",
        open_time: "全天（民俗村08:00-18:00）",
        ticket: "部分民俗村门票30-50元",
        duration: "1-2小时"
      },
      {
        name: "江南水乡民居",
        intro: "江苏周庄·水乡特色民居，临水而建的典范。",
        detail: "江南水乡民居主要分布在苏州、嘉兴、湖州等地，以临水而建为特色，房屋多为砖木结构，粉墙黛瓦，前街后河，水网纵横，形成了独特的水乡居住文化，周庄、乌镇、同里是典型代表。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/zhouzhuang.jpg",
        location: "江苏省苏州市昆山市周庄镇",
        latitude: 31.0822,
        longitude: 120.8967,
        age: "北宋元祐元年（1086年）始建",
        dynasty: "宋代始建，明清发展",
        level: "国家AAAAA级景区",
        tags: ["水乡民居", "临水建筑", "江南风情"],
        feature: "房屋多为两层，底层临水面街，设有河埠头，上层为居室，屋顶采用硬山式，墙体为白灰粉刷，与水乡环境相得益彰。",
        open_time: "07:30-21:00（旺季）",
        ticket: "100元",
        duration: "3-4小时"
      },
      {
        name: "四川吊脚楼",
        intro: "四川重庆·巴渝特色民居，依山就势而建。",
        detail: "四川吊脚楼主要分布在重庆、湘西、鄂西等地，是巴渝文化的重要载体，房屋依山而建，部分悬空，以木柱支撑，适应西南地区多山、多雨的地理环境，具有独特的建筑美学。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/diaojiaolou.jpg",
        location: "重庆市渝中区洪崖洞、酉阳龚滩古镇",
        latitude: 29.5658,
        longitude: 106.5872,
        age: "唐代开始出现，明清盛行",
        dynasty: "唐代至今",
        level: "市级非物质文化遗产",
        tags: ["巴渝民居", "悬空建筑", "山地民居"],
        feature: "采用穿斗式木结构，房屋一半落地一半悬空，底层可作储物、饲养牲畜，上层为居住空间，开窗即可见山水，兼具实用性和观赏性。",
        open_time: "全天（洪崖洞夜景18:00-23:00）",
        ticket: "免费（部分景点收费）",
        duration: "1-2小时"
      },
      {
        name: "蒙古包",
        intro: "内蒙古·蒙古族特色民居，移动式游牧建筑。",
        detail: "蒙古包是蒙古族的传统民居，以木架和毛毡为主要材料，搭建和拆卸方便，适应蒙古族游牧的生活方式，具有防风、保暖、通风的特点，是草原文化的重要象征。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/minju/menggubao.jpg",
        location: "内蒙古自治区锡林郭勒、呼伦贝尔草原",
        latitude: 43.9389,
        longitude: 116.0478,
        age: "匈奴时期开始出现，沿用至今",
        dynasty: "远古至今",
        level: "国家级非物质文化遗产",
        tags: ["游牧民居", "移动式建筑", "草原文化"],
        feature: "呈圆形，由哈那（木架）、陶脑（天窗）、乌尼（椽子）组成，毛毡覆盖，内部布局简洁，中央设火塘，体现了蒙古族的游牧生活智慧。",
        open_time: "全天（草原景区08:00-18:00）",
        ticket: "部分草原景区门票50-100元",
        duration: "2-3小时"
      }
    ]
  },
  onLoad() {
    // 初始化筛选列表为民居列表
    this.setData({
      filteredList: this.data.minjuList
    });
  },

  onSearchInput(e) {
    const key = e.detail.value;
    this.setData({ searchKey: key });
    this.filterList(key);
  },

  filterList(key) {
    if (!key) {
      this.setData({ filteredList: this.data.minjuList });
      return;
    }
    const filtered = this.data.minjuList.filter(item =>
      item.name.includes(key) || item.location.includes(key)
    );
    this.setData({ filteredList: filtered });
  },

  goDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/gujianSub/minju/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  },
  goMinjuMap() {
    wx.navigateTo({
      url: '/gujianSub/minju/placemap'
    })
  }
})