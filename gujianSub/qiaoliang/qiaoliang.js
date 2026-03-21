Page({
  data: {
    searchKey: "",
    swiperList: [
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/swiper1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/swiper2.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/swiper3.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/swiper4.jpg"
    ],
    bridgeList: [
      {
        name: "赵州桥",
        intro: "河北石家庄·世界现存最早敞肩石拱桥，隋代建筑瑰宝。",
        detail: "赵州桥始建于隋开皇十五年至大业初年，由工匠李春设计建造，是世界上现存年代最久远、跨度最大、保存最完整的单孔敞肩石拱桥。全长50.82米，跨径37.02米，其敞肩拱设计比欧洲早1200多年，1961年被列为全国重点文物保护单位。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/zhaozhouqiao.jpg",
        location: "河北省石家庄市赵县赵州镇",
        latitude: 37.7462,
        longitude: 114.7431,
        age: "隋开皇十五年（595年）",
        dynasty: "隋代",
        level: "全国重点文物保护单位",
        tags: ["天下第一桥", "敞肩石拱", "隋代古桥"],
        feature: "单孔圆弧石拱，桥身两侧各设两个小拱，既减轻桥身重量，又利于泄洪，结构科学，造型优美，历经1400多年风雨依然屹立。",
        open_time: "08:00-17:30",
        ticket: "40元",
        duration: "1小时"
      },
      {
        name: "卢沟桥",
        intro: "北京·华北最长古代石拱桥，石狮雕刻艺术宝库。",
        detail: "卢沟桥始建于金大定二十九年，全长266.5米，是北京现存最古老的石拱桥。桥身两侧石雕护栏有望柱140根，柱头上雕有大小石狮501尊，形态各异，栩栩如生。1937年卢沟桥事变在此爆发，是中国抗日战争的起点。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/lugouqiao.jpg",
        location: "北京市丰台区永定河上",
        latitude: 39.8291,
        longitude: 116.2133,
        age: "金大定二十九年（1189年）",
        dynasty: "金代",
        level: "全国重点文物保护单位",
        tags: ["燕京八景", "石狮博物馆", "抗战纪念地"],
        feature: "十一孔联拱桥，桥身中央微微隆起，桥面平缓，石狮雕刻精美，形态无一雷同，有“卢沟桥的狮子数不清”之说。",
        open_time: "08:00-17:00",
        ticket: "20元",
        duration: "1.5小时"
      },
      {
        name: "洛阳桥",
        intro: "福建泉州·中国最早跨海梁式石桥，古代桥梁建筑奇迹。",
        detail: "洛阳桥原名万安桥，始建于北宋皇祐五年，由蔡襄主持建造，是中国现存最早的跨海梁式大石桥。桥长834米，宽7米，首创“筏型基础”和“种蛎固基”技术，是世界桥梁史上的创举，与赵州桥、广济桥、卢沟桥并称中国四大古桥。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/luoyangqiao.jpg",
        location: "福建省泉州市洛江区万安镇",
        latitude: 24.9111,
        longitude: 118.6064,
        age: "北宋皇祐五年（1053年）",
        dynasty: "北宋",
        level: "全国重点文物保护单位",
        tags: ["跨海第一桥", "筏型基础", "种蛎固基"],
        feature: "跨海石桥，桥墩呈船形，两端尖分流防撞，利用牡蛎胶固石块，是古代桥梁建筑与海洋工程结合的典范。",
        open_time: "全天开放",
        ticket: "免费",
        duration: "1小时"
      },
      {
        name: "广济桥",
        intro: "广东潮州·世界上最早启闭式桥梁，集梁桥、拱桥、浮桥于一体。",
        detail: "广济桥始建于南宋乾道七年，全长518米，集梁桥、拱桥、浮桥于一体，是世界上最早的启闭式桥梁。中间18艘梭船连成浮桥，可开可合，便于通航和泄洪，与赵州桥、洛阳桥、卢沟桥并称中国四大古桥。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/guangjiqiao.jpg",
        location: "广东省潮州市湘桥区韩江",
        latitude: 23.6598,
        longitude: 116.6447,
        age: "南宋乾道七年（1171年）",
        dynasty: "南宋",
        level: "全国重点文物保护单位",
        tags: ["四大古桥", "启闭式桥梁", "浮舟为桥"],
        feature: "东西两段石梁桥，中间浮桥可开启，桥上楼阁林立，造型独特，“湘桥春涨”为潮州八景之一。",
        open_time: "09:00-21:00",
        ticket: "20元",
        duration: "1.5小时"
      },
      {
        name: "安平桥",
        intro: "福建泉州·中国现存古代最长石桥，天下无桥长此桥。",
        detail: "安平桥始建于南宋绍兴八年，全长2255米，是中国现存古代最长的梁式石桥，有“天下无桥长此桥”之誉。桥墩以花岗岩砌筑，共361墩，横跨晋江安海与南安水头，是宋元时期泉州海洋贸易的重要交通枢纽。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/anpingqiao.jpg",
        location: "福建省泉州市晋江市安海镇",
        latitude: 24.6908,
        longitude: 118.4611,
        age: "南宋绍兴八年（1138年）",
        dynasty: "南宋",
        level: "全国重点文物保护单位",
        tags: ["最长古石桥", "海上丝绸之路", "石梁桥"],
        feature: "跨海长桥，船形桥墩，桥面由巨大石板铺成，工程浩大，体现宋代泉州强大的建筑实力与经济实力。",
        open_time: "全天开放",
        ticket: "免费",
        duration: "2小时"
      },
      {
        name: "五亭桥",
        intro: "江苏扬州·瘦西湖标志性桥梁，中国最美古桥之一。",
        detail: "五亭桥始建于清乾隆二十二年，是瘦西湖的象征。桥基为拱券结构，桥上建五座亭子，中间一亭高耸，四亭对称，造型典雅，兼具南方之秀与北方之雄，被誉为“中国古代桥梁建筑的明珠”。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/wutingqiao.jpg",
        location: "江苏省扬州市邗江区瘦西湖景区",
        latitude: 32.4056,
        longitude: 119.4303,
        age: "清乾隆二十二年（1757年）",
        dynasty: "清代",
        level: "全国重点文物保护单位",
        tags: ["扬州地标", "亭桥结合", "瘦西湖胜景"],
        feature: "十五个桥洞，满月之夜各洞各衔一月，众月争辉，蔚为奇观，桥亭合一，建筑艺术价值极高。",
        open_time: "07:30-17:30",
        ticket: "含瘦西湖门票内",
        duration: "1小时"
      },
      {
        name: "风雨桥",
        intro: "广西三江·侗族特色木构廊桥，不用一钉一铆。",
        detail: "程阳永济桥是侗族风雨桥的代表，始建于1912年，全长64.4米，全桥以杉木凿榫衔接，不用一钉一铆，结构精密。桥廊、亭、塔融为一体，既是交通设施，也是侗族人民休憩、社交的场所，是侗族建筑艺术的巅峰。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/fengyuqiao.jpg",
        location: "广西柳州市三江侗族自治县",
        latitude: 25.8097,
        longitude: 109.6225,
        age: "民国元年（1912年）",
        dynasty: "民国",
        level: "全国重点文物保护单位",
        tags: ["侗族建筑", "木构廊桥", "无钉建筑"],
        feature: "榫卯木构，廊屋盖顶，避雨遮阳，桥楼雕刻精美，彩绘绚丽，体现侗族高超的木工技艺。",
        open_time: "08:00-18:00",
        ticket: "60元",
        duration: "1.5小时"
      },
      {
        name: "玉带桥",
        intro: "北京颐和园·清代皇家园林石拱桥，西堤最美景观。",
        detail: "玉带桥始建于清乾隆年间，是颐和园西堤六桥中最著名的一座。桥身由汉白玉和青白石砌成，拱高而薄，形若玉带，曲线优美，是清代皇家园林桥梁的经典之作，也是昆明湖水上交通要道。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/yudaiqiao.jpg",
        location: "北京市海淀区颐和园西堤",
        latitude: 39.9931,
        longitude: 116.2694,
        age: "清乾隆年间",
        dynasty: "清代",
        level: "世界文化遗产",
        tags: ["皇家园林桥", "汉白玉石拱", "玉带凌波"],
        feature: "单孔高拱，桥身洁白，线条流畅，登高远眺，湖光山色尽收眼底，极具艺术美感。",
        open_time: "06:30-18:00",
        ticket: "含颐和园门票内",
        duration: "0.5小时"
      },
      {
        name: "泸定桥",
        intro: "四川甘孜·铁索悬桥，红军飞夺泸定桥纪念地。",
        detail: "泸定桥始建于清康熙四十四年，全长103.67米，由13根铁链固定两岸组成，是大渡河上最早的铁索桥。1935年红军飞夺泸定桥，使其成为中国革命历史的重要地标，是古代西南交通的咽喉要道。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/luqingqiao.jpg",
        location: "四川省甘孜州泸定县大渡河",
        latitude: 29.9139,
        longitude: 102.2508,
        age: "清康熙四十四年（1705年）",
        dynasty: "清代",
        level: "全国重点文物保护单位",
        tags: ["铁索悬桥", "红色纪念地", "川藏要道"],
        feature: "铁链悬桥，无桥墩，横跨大渡河，地势险要，气势雄伟，是古代西南桥梁工程的奇迹。",
        open_time: "08:00-17:30",
        ticket: "10元",
        duration: "1小时"
      },
      {
        name: "十字桥",
        intro: "山西太原·晋祠十字形桥梁，北宋古建筑珍品。",
        detail: "十字桥又名鱼沼飞梁，始建于北宋时期，位于晋祠圣母殿前，是中国现存唯一的十字形桥梁。桥架在鱼池之上，四面通连，如大鹏展翅，结构精巧，是宋代桥梁建筑的孤例，具有极高的建筑与历史价值。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/bridge/shiziqiao.jpg",
        location: "山西省太原市晋源区晋祠景区",
        latitude: 37.7797,
        longitude: 112.4333,
        age: "北宋太平兴国年间",
        dynasty: "北宋",
        level: "全国重点文物保护单位",
        tags: ["十字飞梁", "北宋孤品", "晋祠三绝"],
        feature: "十字形木构石桥，桥下石柱支撑，造型独特，如飞鸟展翅，全国仅此一例，堪称建筑奇观。",
        open_time: "08:00-18:00",
        ticket: "含晋祠门票内",
        duration: "0.5小时"
      }
    ]
  },
  onLoad() {
    this.setData({
      filteredList: this.data.bridgeList
    });
  },

  onSearchInput(e) {
    const key = e.detail.value;
    this.setData({ searchKey: key });
    this.filterList(key);
  },

  filterList(key) {
    if (!key) {
      this.setData({ filteredList: this.data.bridgeList });
      return;
    }
    const filtered = this.data.bridgeList.filter(item =>
      item.name.includes(key) || item.location.includes(key)
    );
    this.setData({ filteredList: filtered });
  },

  goDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/gujianSub/qiaoliang/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  },
  goBridgeMap() {
    wx.navigateTo({
      url: '/gujianSub/qiaoliang/placemap'
    })
  }
})