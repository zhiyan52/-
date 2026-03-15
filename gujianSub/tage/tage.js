Page({
  data: {
    searchKey: "",
    swiperList: [
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/swiper1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/swiper2.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/swiper3.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/swiper4.jpg"
    ],
    towerList: [
      {
        name: "大雁塔",
        intro: "陕西西安·唐代佛塔，玄奘藏经之地，西安地标。",
        detail: "大雁塔始建于唐永徽三年（652年），由玄奘法师主持修建，用于保存经卷佛像。塔高64.5米，七层楼阁式砖塔，是唐代佛教建筑艺术的杰出代表，也是丝绸之路的重要象征，1961年列为全国重点文物保护单位。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/dayan.jpg",
        location: "陕西省西安市雁塔区慈恩寺内",
        latitude: 34.2185,
        longitude: 108.9631,
        age: "唐永徽三年（652年）",
        dynasty: "唐代",
        level: "世界文化遗产",
        tags: ["西安地标", "玄奘藏经", "唐代佛塔"],
        feature: "楼阁式砖塔，方形锥体，层层收分，气势雄伟，塔内有木梯可登顶俯瞰西安城。",
        open_time: "08:30-18:00",
        ticket: "40元",
        duration: "1.5小时"
      },
      {
        name: "应县木塔",
        intro: "山西朔州·世界最高木塔，纯木结构无钉铆。",
        detail: "应县木塔全称佛宫寺释迦塔，始建于辽清宁二年（1056年），全塔纯木结构，无一根铁钉，通高67.31米，是世界现存最高最古老的木构塔式建筑，与比萨斜塔、埃菲尔铁塔并称世界三大奇塔。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/yingxian.jpg",
        location: "山西省朔州市应县佛宫寺内",
        latitude: 39.4352,
        longitude: 113.1769,
        age: "辽清宁二年（1056年）",
        dynasty: "辽代",
        level: "全国重点文物保护单位",
        tags: ["天下第一木塔", "纯木结构", "无钉建筑"],
        feature: "五层六檐，斗拱结构复杂精密，全靠榫卯衔接，历经千年地震与战火依然屹立。",
        open_time: "08:30-18:00",
        ticket: "50元",
        duration: "1.5小时"
      },
      {
        name: "黄鹤楼",
        intro: "湖北武汉·江南三大名楼，天下绝景。",
        detail: "黄鹤楼始建于三国吴黄武二年（223年），自古享有“天下绝景”之称，与岳阳楼、滕王阁并称江南三大名楼。历代文人墨客在此留下千古名篇，登楼可俯瞰武汉三镇与长江全景。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/huanghelou.jpg",
        location: "湖北省武汉市武昌区蛇山之巅",
        latitude: 30.5491,
        longitude: 114.3603,
        age: "三国吴黄武二年（223年）",
        dynasty: "三国始建，历代重建",
        level: "国家AAAAA级景区",
        tags: ["江南名楼", "武汉地标", "诗词圣地"],
        feature: "五层攒尖顶，层层飞檐，金色琉璃瓦，气势恢宏，楼内有大量壁画与文物陈列。",
        open_time: "08:30-17:00",
        ticket: "70元",
        duration: "2小时"
      },
      {
        name: "岳阳楼",
        intro: "湖南岳阳·江南三大名楼，先天下之忧而忧。",
        detail: "岳阳楼始建于东汉建安年间（215年），因范仲淹《岳阳楼记》名扬天下，是江南三大名楼中唯一保持原貌的古建筑。楼体三层，纯木结构，俯瞰洞庭湖，气势壮阔。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/yueyang.jpg",
        location: "湖南省岳阳市岳阳楼区洞庭北路",
        latitude: 29.3857,
        longitude: 113.1328,
        age: "东汉建安二十年（215年）",
        dynasty: "东汉始建，清代重建",
        level: "全国重点文物保护单位",
        tags: ["江南名楼", "范仲淹", "洞庭胜景"],
        feature: "三层纯木结构，盔顶造型，无一根铁钉，全榫卯结构，建筑艺术价值极高。",
        open_time: "07:00-18:30",
        ticket: "70元",
        duration: "1.5小时"
      },
      {
        name: "滕王阁",
        intro: "江西南昌·江南三大名楼，滕王阁序发源地。",
        detail: "滕王阁始建于唐永徽四年（653年），因王勃《滕王阁序》闻名天下，“落霞与孤鹜齐飞，秋水共长天一色”写尽此处风光。楼阁高大宏伟，依山傍水，为江南古建筑典范。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/tengwang.jpg",
        location: "江西省南昌市东湖区沿江路",
        latitude: 28.6899,
        longitude: 115.8857,
        age: "唐永徽四年（653年）",
        dynasty: "唐代始建，历代重建",
        level: "国家AAAAA级景区",
        tags: ["江南名楼", "王勃序文", "南昌地标"],
        feature: "五层楼阁，歇山式屋顶，雕梁画栋，内部陈列大量文物与名家书法。",
        open_time: "08:00-17:30",
        ticket: "50元",
        duration: "2小时"
      },
      {
        name: "雷峰塔",
        intro: "浙江杭州·西湖十景，吴越国建筑遗迹。",
        detail: "雷峰塔始建于北宋开宝五年（972年），为吴越王钱俶所建，因《白蛇传》传说闻名天下。原塔倒塌后于2002年重建，新塔保留唐宋风格，是俯瞰西湖全景的绝佳之处。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/leifeng.jpg",
        location: "浙江省杭州市西湖区南山路",
        latitude: 30.2299,
        longitude: 120.1483,
        age: "北宋开宝五年（972年）",
        dynasty: "北宋",
        level: "西湖十景",
        tags: ["西湖地标", "白蛇传说", "吴越佛塔"],
        feature: "楼阁式塔，八角飞檐，金色塔刹，内部有电梯与楼梯，登塔可览西湖全景。",
        open_time: "08:00-17:30",
        ticket: "40元",
        duration: "1小时"
      },
      {
        name: "开封铁塔",
        intro: "河南开封·宋代琉璃砖塔，天下第一塔。",
        detail: "开封铁塔始建于北宋皇祐元年（1049年），因塔身以褐色琉璃砖砌筑，远望如铁铸而得名。塔高55.88米，八角十三层，历经千年地震、水患、战争完好如初，被誉为“天下第一塔”。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/kaifeng.jpg",
        location: "河南省开封市顺河区铁塔公园",
        latitude: 34.8161,
        longitude: 114.3611,
        age: "北宋皇祐元年（1049年）",
        dynasty: "北宋",
        level: "全国重点文物保护单位",
        tags: ["琉璃砖塔", "宋代古塔", "开封地标"],
        feature: "琉璃砖仿木结构，砖雕精美，塔身挺拔秀丽，防水防火耐腐蚀，千年不腐。",
        open_time: "07:30-18:00",
        ticket: "40元",
        duration: "1小时"
      },
      {
        name: "六和塔",
        intro: "浙江杭州·钱塘江畔古塔，镇潮护江。",
        detail: "六和塔始建于北宋开宝三年（970年），为镇压钱塘江潮而建，塔高59.89米，八角十三层，楼阁式砖塔，登塔可远眺钱塘江大桥与六和潮景，是杭州重要古建筑。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/liuhe.jpg",
        location: "浙江省杭州市西湖区钱塘江畔",
        latitude: 30.2101,
        longitude: 120.1253,
        age: "北宋开宝三年（970年）",
        dynasty: "北宋",
        level: "全国重点文物保护单位",
        tags: ["钱塘江地标", "镇潮古塔", "北宋建筑"],
        feature: "内部七层，外部十三层，楼梯盘旋而上，塔内雕刻精美，登高可观钱江大潮。",
        open_time: "08:00-17:30",
        ticket: "30元",
        duration: "1小时"
      },
      {
        name: "小雁塔",
        intro: "陕西西安·唐代密檐式佛塔，秀挺古朴。",
        detail: "小雁塔始建于唐景龙年间（707年），为唐代长安著名佛塔，通高43.4米，15层密檐式结构，造型秀丽挺拔，历经千年风雨与多次地震仍屹立不倒，体现了唐代高超的建筑抗震技术。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/xiaoyan.jpg",
        location: "陕西省西安市碑林区荐福寺内",
        latitude: 34.2511,
        longitude: 108.9515,
        age: "唐景龙年间（707年）",
        dynasty: "唐代",
        level: "全国重点文物保护单位",
        tags: ["唐代密檐塔", "西安古建", "雁塔晨钟"],
        feature: "密檐式砖塔，塔身逐层内收，线条柔和优美，无基座直接建于平地，结构独特。",
        open_time: "09:00-17:00",
        ticket: "免费",
        duration: "1小时"
      },
      {
        name: "报恩寺塔",
        intro: "江苏苏州·中国最高古塔，九层琉璃宝塔。",
        detail: "报恩寺塔又称北寺塔，始建于三国吴赤乌年间，现存为南宋绍兴二十三年（1153年）建筑，高76米，九层八面，是苏州现存最高古建筑，登上塔顶可俯瞰苏州全城。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/tower/baoen.jpg",
        location: "江苏省苏州市姑苏区人民路",
        latitude: 31.3267,
        longitude: 120.6283,
        age: "南宋绍兴二十三年（1153年）",
        dynasty: "南宋",
        level: "江苏省文物保护单位",
        tags: ["苏州最高古建", "江南楼阁塔", "姑苏地标"],
        feature: "楼阁式砖木结构，飞檐翘角，造型雄伟，是苏州古城的天际线标志。",
        open_time: "08:30-17:00",
        ticket: "免费",
        duration: "1小时"
      }
    ]
  },
  onLoad() {
    // 初始化筛选列表为塔阁列表
    this.setData({
      filteredList: this.data.towerList
    });
  },

  onSearchInput(e) {
    const key = e.detail.value;
    this.setData({ searchKey: key });
    this.filterList(key);
  },

  filterList(key) {
    if (!key) {
      this.setData({ filteredList: this.data.towerList });
      return;
    }
    const filtered = this.data.towerList.filter(item =>
      item.name.includes(key) || item.location.includes(key)
    );
    this.setData({ filteredList: filtered });
  },

  goDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/gujianSub/tage/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  },
  goTowerMap() {
    wx.navigateTo({
      url: '/gujianSub/tage/placemap'
    })
  }
})