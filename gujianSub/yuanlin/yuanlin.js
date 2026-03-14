Page({
  data: {
    searchKey: "",
    swiperList: [
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/lungbo1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/lungbo2.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/_lungbo3.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/lungbo4.jpg"
    ],
    gardenList: [
      {
        name: "颐和园",
        intro: "北京·清代皇家园林，中国保存最完整的皇家行宫御苑。",
        detail: "颐和园前身为清漪园，始建于清乾隆十五年，占地290公顷，以昆明湖、万寿山为基址，仿杭州西湖布局，融汇江南园林手法，是中国皇家园林的巅峰之作，1998年列入世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/yinheyuan.jpg",
        location: "北京市海淀区新建宫门路19号",
        latitude: 39.9928,
        longitude: 116.2752,
        age: "清乾隆十五年（1750年）",
        dynasty: "清代",
        level: "世界文化遗产",
        tags: ["皇家园林之首", "AAAAA级景区", "北方山水园林代表"],
        feature: "以万寿山、昆明湖为核心，佛香阁为中心制高点，集宫殿、寺庙、山水、花木于一体，中西合璧又不失中式园林精髓。",
        open_time: "06:30-18:00（旺季）",
        ticket: "30元（旺季门票）",
        duration: "3-4小时"
      },
      {
        name: "拙政园",
        intro: "江苏苏州·江南古典园林代表，中国四大名园之首。",
        detail: "拙政园始建于明正德初年，占地78亩，由明代王献臣所建，以水为中心，山水萦绕，厅榭精美，花木繁茂，尽显江南水乡的灵动与雅致，1997年列入世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/zhuozhengyuan.jpg",
        location: "江苏省苏州市姑苏区东北街178号",
        latitude: 31.3176,
        longitude: 120.6336,
        age: "明正德初年（1506年）",
        dynasty: "明代",
        level: "世界文化遗产",
        tags: ["江南园林典范", "四大名园之首", "水景园林"],
        feature: "分东、中、西三部分，中部为核心景区，水面占比超1/3，亭台楼阁临水而建，移步换景，尽显“咫尺山林，多方胜景”。",
        open_time: "07:30-17:00（旺季）",
        ticket: "80元（旺季）",
        duration: "2-3小时"
      },
      {
        name: "留园",
        intro: "江苏苏州·清代园林精品，以建筑艺术精湛著称。",
        detail: "留园始建于明万历二十一年，占地23300平方米，集住宅、祠堂、家庵、园林于一体，建筑空间处理巧妙，厅堂宏敞华丽，与拙政园并称“苏州双璧”，1997年列入世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/liuyuan.jpg",
        location: "江苏省苏州市姑苏区留园路338号",
        latitude: 31.3190,
        longitude: 120.6469,
        age: "明万历二十一年（1593年）",
        dynasty: "明始建，清扩建",
        level: "世界文化遗产",
        tags: ["建筑艺术巅峰", "四大名园", "太湖石冠云峰"],
        feature: "以“留园三绝”（冠云峰、楠木殿、鱼化石）闻名，全园分四部分，廊长700余米，廊壁嵌有历代书法石刻300余方。",
        open_time: "07:30-17:00（旺季）",
        ticket: "45元（旺季）",
        duration: "1.5-2小时"
      },
      {
        name: "承德避暑山庄",
        intro: "河北承德·清代皇家园林，中国现存最大皇家园林。",
        detail: "避暑山庄始建于清康熙四十二年，占地564万平方米，是清代皇帝夏季避暑和处理政务的场所，融合江南水乡和北方草原风貌，1994年列入世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/chengdebishushanzhuang.jpg",
        location: "河北省承德市双桥区丽正门路20号",
        latitude: 40.9722,
        longitude: 117.9400,
        age: "清康熙四十二年（1703年）",
        dynasty: "清代",
        level: "世界文化遗产",
        tags: ["最大皇家园林", "AAAAA级景区", "南北园林融合"],
        feature: "分宫殿区、湖泊区、平原区、山峦区四部分，以朴素淡雅的山村野趣为格调，不取雕梁画栋之华，尽显自然之美。",
        open_time: "07:30-17:30（旺季）",
        ticket: "130元（联票）",
        duration: "4-5小时"
      },
      {
        name: "沧浪亭",
        intro: "江苏苏州·苏州最古老园林，以清幽古朴见长。",
        detail: "沧浪亭始建于北宋庆历年间，是苏州现存最古老的园林，原为文人苏舜钦的私家花园，以“崇阜广水”为特色，1982年列入全国重点文物保护单位。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/yuanlin5.jpg",
        location: "江苏省苏州市姑苏区沧浪亭街3号",
        latitude: 31.3090,
        longitude: 120.6297,
        age: "北宋庆历年间（1041年）",
        dynasty: "北宋始建，历代修缮",
        level: "全国重点文物保护单位",
        tags: ["苏州最古园林", "文人园林", "水绕园外"],
        feature: "未进园门先见水，园外清流绕园，园内以山石为主景，沧浪亭踞于山巅，亭联“清风明月本无价，近水远山皆有情”为千古绝唱。",
        open_time: "07:30-17:00",
        ticket: "20元（旺季）",
        duration: "1小时"
      },
      {
        name: "狮子林",
        intro: "江苏苏州·元代园林，以假山堆叠精巧闻名。",
        detail: "狮子林始建于元至正二年，因园内石峰林立、状如狮子而得名，是中国四大名园之一，1997年列入世界文化遗产，乾隆皇帝曾六次游览并题字。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/shizilin.jpg",
        location: "江苏省苏州市姑苏区园林路23号",
        latitude: 31.3215,
        longitude: 120.6450,
        age: "元至正二年（1342年）",
        dynasty: "元代",
        level: "世界文化遗产",
        tags: ["四大名园", "假山王国", "禅意园林"],
        feature: "园内假山群占地约1.7亩，分上、中、下三层，9条路径，21个洞口，迂回曲折，如入迷宫，是江南园林假山的典范。",
        open_time: "07:30-17:00（旺季）",
        ticket: "40元（旺季）",
        duration: "1.5小时"
      },
      {
        name: "环秀山庄",
        intro: "江苏苏州·清代园林，假山造景的巅峰之作。",
        detail: "环秀山庄原为唐代金谷园故址，清乾隆年间扩建，全园占地仅1000平方米，以假山为核心，是清代造园大师戈裕良的代表作，1997年列入世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/huanxiushanzhuang.jpg",
        location: "江苏省苏州市姑苏区景德路272号",
        latitude: 31.3185,
        longitude: 120.6395,
        age: "清乾隆年间（1736年）",
        dynasty: "清代",
        level: "世界文化遗产",
        tags: ["假山第一园", "微型园林", "造园典范"],
        feature: "假山虽小却尽显山壑溪流之态，模拟自然山水，有“尺幅千里”之效，被园林专家誉为“中国假山之最”。",
        open_time: "08:00-17:00",
        ticket: "15元",
        duration: "1小时"
      },
      {
        name: "寄畅园",
        intro: "江苏无锡·明代园林，江南山麓别墅园林代表。",
        detail: "寄畅园始建于明正德十五年，原为明代秦氏私家园林，以自然山水取胜，融合江南园林的精巧与北方山水的雄浑，1988年列入全国重点文物保护单位。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/jichangyuan.jpg",
        location: "江苏省无锡市梁溪区惠山古镇景区内",
        latitude: 31.5865,
        longitude: 120.2997,
        age: "明正德十五年（1520年）",
        dynasty: "明代",
        level: "全国重点文物保护单位",
        tags: ["山麓园林", "江南名园", "借景惠山"],
        feature: "引惠山泉水入园，构“八音涧”水景，借惠山、锡山为背景，园景与山景融为一体，乾隆皇帝仿其形制在颐和园建“谐趣园”。",
        open_time: "08:00-17:30",
        ticket: "15元",
        duration: "1小时"
      },
      {
        name: "个园",
        intro: "江苏扬州·清代园林，以四季假山闻名天下。",
        detail: "个园始建于清嘉庆二十三年，因园内遍植青竹、竹叶形如“个”字而得名，是清代扬州盐商私家园林的典范，2005年被评为“国家重点公园”。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/yuanlin9.jpg",
        location: "江苏省扬州市广陵区盐阜东路10号",
        latitude: 32.3932,
        longitude: 119.4210,
        age: "清嘉庆二十三年（1818年）",
        dynasty: "清代",
        level: "全国重点文物保护单位",
        tags: ["四季假山", "竹石园林", "扬州第一园"],
        feature: "以“春、夏、秋、冬”四季假山为核心，用不同石材模拟四季山水：春山用笋石、夏山用太湖石、秋山用黄石、冬山用宣石，堪称园林一绝。",
        open_time: "07:15-17:15（旺季）",
        ticket: "45元（旺季）",
        duration: "1.5小时"
      },
      {
        name: "豫园",
        intro: "上海·明代园林，江南古典园林的璀璨明珠。",
        detail: "豫园始建于明嘉靖、隆庆年间，原为潘允端为其父修建的私家园林，占地30余亩，是上海现存最古老、最完整的江南古典园林，1982年列入全国重点文物保护单位。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/yuyuan.jpg",
        location: "上海市黄浦区豫园老街279号",
        latitude: 31.2272,
        longitude: 121.4808,
        age: "明嘉靖年间（1559年）",
        dynasty: "明代",
        level: "全国重点文物保护单位",
        tags: ["上海唯一古园林", "江南名园", "玉玲珑"],
        feature: "园内有江南三大名石之一的“玉玲珑”，园景小巧精致，亭台楼阁、假山水榭一应俱全，与城隍庙融为一体，尽显江南市井园林特色。",
        open_time: "08:30-17:00",
        ticket: "40元（旺季）",
        duration: "1.5小时"
      }
    ]
  },
  onLoad() {
    // 关键修改：将 filteredList 赋值为 gardenList（原是 palaceList）
    this.setData({
      filteredList: this.data.gardenList
    });
  },

  onSearchInput(e) {
    const key = e.detail.value;
    this.setData({ searchKey: key });
    this.filterList(key);
  },

  filterList(key) {
    if (!key) {
      this.setData({ filteredList: this.data.gardenList });
      return;
    }
    const filtered = this.data.gardenList.filter(item =>
      item.name.includes(key) || item.location.includes(key)
    );
    this.setData({ filteredList: filtered });
  },

  goDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/gujianSub/yuanlin/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  },
  goGardenMap() {
    wx.navigateTo({
      url: '/gujianSub/yuanlin/placemap'
    })
  }
})

  