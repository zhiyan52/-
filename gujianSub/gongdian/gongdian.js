Page({
  data: {
    searchKey: "",
    swiperList: [
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/lungbo1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/lungbo2.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/_lungbo3.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/lungbo4.jpg"
    ],
    palaceList: [
      {
        name: "故宫（紫禁城）",
        intro: "北京·明清皇家宫殿，世界现存最大、最完整木质古建筑群。",
        detail: "故宫建于明代永乐年间，占地72万平方米，殿宇千余间，是中国古代宫廷建筑的巅峰。中轴线建筑严格对称，体现皇权至上，现列为世界文化遗产。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/gongdian1.jpg",
        location: "北京市东城区景山前街4号",
        latitude: 39.9163,
        longitude: 116.3972,
        age: "明朝永乐十八年（1420年）",
        dynasty: "明清",
        level: "世界文化遗产",
        tags: ["中国最大宫殿", "AAAAA级景区", "皇家建筑巅峰"],
        feature: "中轴对称布局，前三殿后三宫，红墙黄瓦，木结构为主，是中国皇家建筑最高规制。",
        open_time: "08:30-17:00（周一闭馆）",
        ticket: "60元（旺季）",
        duration: "3-4小时"
      },
      {
        name: "布达拉宫",
        intro: "西藏拉萨·世界屋脊上的神圣宫殿，气势雄伟，庄严神圣。",
        detail: "布达拉宫始建于公元7世纪，依山而建，通体红白，气势恢宏。集宫殿、城堡、寺院于一体，是藏传佛教圣地，也是世界上海拔最高的古代宫殿群。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/dongdian2.jpg",
        location: "西藏自治区拉萨市城关区北京中路35号",
        latitude: 29.6572,
        longitude: 91.1722,
        age: "公元7世纪吐蕃时期",
        dynasty: "吐蕃·历代扩建",
        level: "世界文化遗产",
        tags: ["海拔最高宫殿", "藏式建筑代表", "佛教圣地"],
        feature: "依山垒砌，石木结构，红白宫殿相间，藏汉结合风格，是藏族古建筑精华。",
        open_time: "09:00-15:00",
        ticket: "200元",
        duration: "2-3小时"
      },
      {
        name: "大明宫",
        intro: "陕西西安·唐代皇宫，盛唐时期世界最辉煌的宫殿群。",
        detail: "大明宫为唐代规模最大的皇宫群，有‘千宫之宫’美誉。含含元殿、麟德殿等主体建筑，是唐代政治中心，遗址公园现保存部分夯土基址。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/daminggong.jpg",
        location: "陕西省西安市新城区自强东路585号",
        latitude: 34.2891,
        longitude: 108.9562,
        age: "唐朝贞观八年（634年）",
        dynasty: "唐代",
        level: "全国重点文物保护单位",
        tags: ["千宫之宫", "盛唐皇宫", "世界最大宫殿遗址"],
        feature: "前朝后寝，左祖右社，规模宏大，殿堂楼阁气势磅礴，盛唐建筑典范。",
        open_time: "08:30-18:00",
        ticket: "60元",
        duration: "2小时"
      },
      {
        name: "未央宫",
        intro: "陕西西安·西汉帝国皇宫，使用朝代最多、存在时间最长。",
        detail: "未央宫是西汉使用朝代最多、存在时间最长的皇宫，为汉代大一统帝国的象征。建筑规模宏大，奠定中国皇宫中轴线布局基础。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/weiyanggong.jpg",
        location: "陕西省西安市未央区未央宫街道",
        latitude: 34.2681,
        longitude: 108.9432,
        age: "西汉高祖七年（前200年）",
        dynasty: "西汉",
        level: "世界文化遗产",
        tags: ["汉家宫阙", "使用最久皇宫", "帝国中枢"],
        feature: "高台宫殿，轴线对称，布局恢弘，是汉代皇家宫殿制度的源头。",
        open_time: "全天开放",
        ticket: "免费",
        duration: "1.5小时"
      },
      {
        name: "咸阳宫",
        intro: "陕西咸阳·秦代皇宫，秦始皇统一六国后的政治中心。",
        detail: "咸阳宫为秦代主要宫殿，是秦始皇统一六国后的统治中心。格局宏大、气势磅礴，史载规模超过阿房宫，现仅存遗址。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/xianyanggong.jpg",
        location: "陕西省咸阳市渭城区窑店镇",
        latitude: 34.3931,
        longitude: 108.8432,
        age: "战国至秦代",
        dynasty: "秦代",
        level: "全国重点文物保护单位",
        tags: ["秦代皇宫", "大一统象征", "帝国正殿"],
        feature: "跨渭水而建，群宫环绕，高台建筑，秦代皇家宫殿最高形制。",
        open_time: "遗址开放",
        ticket: "免费",
        duration: "1小时"
      },
      {
        name: "太极宫",
        intro: "陕西西安·隋唐皇宫，长安三大内之一，政治核心之地。",
        detail: "太极宫位于长安城北部，为隋初及唐初的政治中心。含承天门、太极殿、两仪殿等重要建筑，是隋唐盛世的政治象征。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/taijigong.jpg",
        location: "陕西省西安市莲湖区自强西路",
        latitude: 34.2711,
        longitude: 108.9462,
        age: "隋开皇二年（582年）",
        dynasty: "隋、唐初",
        level: "遗址保护",
        tags: ["长安三大内", "隋唐正殿", "盛世中枢"],
        feature: "南北中轴线，前朝后寝，规模严谨，是隋唐长安最早的皇宫。",
        open_time: "遗址参观",
        ticket: "免费",
        duration: "1小时"
      },
      {
        name: "兴庆宫",
        intro: "陕西西安·唐代宫殿，唐玄宗时期政治中心与园林胜地。",
        detail: "兴庆宫为唐代中期政治中心，以园林精美著称。唐玄宗与杨贵妃曾在此居住，是盛唐时代的标志性宫殿园林。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/xinqinggong.jpg",
        location: "陕西省西安市碑林区咸宁西路58号",
        latitude: 34.2591,
        longitude: 108.9632,
        age: "唐开元年间",
        dynasty: "唐代中期",
        level: "遗址公园",
        tags: ["盛唐园林", "玄宗皇宫", "贵妃故居"],
        feature: "园林式宫殿，湖光楼阁，花卉环绕，风格秀丽雅致。",
        open_time: "08:00-19:00",
        ticket: "免费",
        duration: "1.5小时"
      },
      {
        name: "雍和宫",
        intro: "北京·原为王府，后改为藏传佛教寺院，殿宇巍峨。",
        detail: "原为清代雍亲王府，雍正登基后改为喇嘛庙。建筑融合皇家与藏传佛教风格，殿宇宏伟，佛像精美，是北京地区重要的宗教与文化地标。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/yonghegong.jpg",
        location: "北京市东城区雍和宫大街12号",
        latitude: 39.9472,
        longitude: 116.4232,
        age: "清康熙三十三年（1694年）",
        dynasty: "清代",
        level: "全国重点文物保护单位",
        tags: ["王府改寺", "藏传佛教", "皇家寺院"],
        feature: "中路对称，黄瓦红墙，融合汉、满、蒙、藏建筑风格，法相庄严。",
        open_time: "09:00-16:30",
        ticket: "25元",
        duration: "1.5小时"
      },
      {
        name: "沈阳故宫",
        intro: "辽宁沈阳·清初皇宫，中国现存第二大皇宫建筑群。",
        detail: "沈阳故宫为后金及清初的宫殿建筑，融合满族、汉族与蒙古族建筑特色，布局独特，是清代入关前的政治中心。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/shenyanggugong.jpg",
        location: "辽宁省沈阳市沈河区沈阳路171号",
        latitude: 41.7962,
        longitude: 123.4562,
        age: "后金天命十年（1625年）",
        dynasty: "清初",
        level: "世界文化遗产",
        tags: ["关外皇宫", "满族风格", "清文化发源地"],
        feature: "东路十王亭，中路大殿，满族特色浓郁，小巧紧凑而庄严。",
        open_time: "08:30-17:00",
        ticket: "50元",
        duration: "2小时"
      },
      {
        name: "南京故宫",
        intro: "江苏南京·明代初期皇宫，北京故宫的建筑蓝本。",
        detail: "南京故宫是明朝开国皇宫，规模宏大，奠定北京故宫的中轴线与建筑格局。现仅存遗址，为全国重点文物保护单位。",
        img: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/nanjinggugong.jpg",
        location: "江苏省南京市秦淮区御道街",
        latitude: 32.0412,
        longitude: 118.8032,
        age: "元至正二十六年（1366年）",
        dynasty: "明代初期",
        level: "全国重点文物保护单位",
        tags: ["明故宫蓝本", "开国皇宫", "中轴线鼻祖"],
        feature: "中轴对称，前朝后寝，规制严谨，是北京故宫的直接范本。",
        open_time: "遗址公园",
        ticket: "免费",
        duration: "1小时"
      }
    ]
  },

  onLoad() {
    this.setData({
      filteredList: this.data.palaceList
    });
  },

  onSearchInput(e) {
    const key = e.detail.value;
    this.setData({ searchKey: key });
    this.filterList(key);
  },

  filterList(key) {
    if (!key) {
      this.setData({ filteredList: this.data.palaceList });
      return;
    }
    const filtered = this.data.palaceList.filter(item =>
      item.name.includes(key) || item.location.includes(key)
    );
    this.setData({ filteredList: filtered });
  },

  goDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/gujianSub/gongdian/detail?item=${encodeURIComponent(JSON.stringify(item))}`
    });
  },

  // 跳转到地图页
  goPalaceMap() {
    wx.navigateTo({
      url: '/gujianSub/gongdian/placemap'
    })
  }
})