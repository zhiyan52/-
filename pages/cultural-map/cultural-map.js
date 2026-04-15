// pages/cultural-map/cultural-map.js
Page({
  data: {
    studyData: {
      visitedProvinces: 5,
      totalSites: 23,
      completedCourses: 15,
      studyDays: 45,
      achievements: 8,
      level: 3
    },
    selectedLandmark: null,
    showLandmarkModal: false,
    currentDate: '',
    landmarkDetails: {
      shanxi: {
        name: '山西',
        type: '古建筑',
        progress: 85,
        learned: '五台山、平遥古城、云冈石窟',
        achievement: '古建探索者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanxi%20ancient%20architecture%20wutai%20mountain%20pingyao%20ancient%20city&image_size=landscape_16_9'
      },
      jiangsu: {
        name: '江苏',
        type: '非物质文化遗产',
        progress: 70,
        learned: '苏绣、昆曲、南京云锦',
        achievement: '非遗传承者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jiangsu%20suzhou%20embroidery%20kunqu%20opera%20cultural%20heritage&image_size=landscape_16_9'
      },
      sichuan: {
        name: '四川',
        type: '民俗文化',
        progress: 60,
        learned: '川菜、变脸、大熊猫文化',
        achievement: '民俗探索者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20food%20face%20changing%20panda%20folk%20culture&image_size=landscape_16_9'
      },
      shaanxi: {
        name: '陕西',
        type: '历史文化',
        progress: 90,
        learned: '兵马俑、西安古城墙、黄帝陵',
        achievement: '历史文化学者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shaanxi%20terracotta%20warriors%20xian%20ancient%20city%20wall&image_size=landscape_16_9'
      },
      beijing: {
        name: '北京',
        type: '皇家文化',
        progress: 95,
        learned: '故宫、长城、颐和园',
        achievement: '皇家文化专家',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20forbidden%20city%20great%20wall%20summer%20palace&image_size=landscape_16_9'
      },
      zhejiang: {
        name: '浙江',
        type: '江南文化',
        progress: 40,
        learned: '西湖、乌镇、龙井茶',
        achievement: '江南文化爱好者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=zhejiang%20west%20lake%20wuzhen%20longjing%20tea%20jiangnan%20culture&image_size=landscape_16_9'
      },
      henan: {
        name: '河南',
        type: '中原文化',
        progress: 30,
        learned: '龙门石窟、少林寺',
        achievement: '中原文化初学者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=henan%20longmen%20grottoes%20shaolin%20temple%20central%20plain%20culture&image_size=landscape_16_9'
      },
      fujian: {
        name: '福建',
        type: '海洋文化',
        progress: 20,
        learned: '土楼、妈祖文化',
        achievement: '海洋文化探索者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fujian%20tulou%20mazu%20culture%20ocean%20culture&image_size=landscape_16_9'
      },
      hunan: {
        name: '湖南',
        type: '湖湘文化',
        progress: 15,
        learned: '岳阳楼、张家界',
        achievement: '湖湘文化初学者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20yueyang%20tower%20zhangjiajie%20huxiang%20culture&image_size=landscape_16_9'
      },
      guangdong: {
        name: '广东',
        type: '岭南文化',
        progress: 10,
        learned: '粤菜、醒狮',
        achievement: '岭南文化初学者',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangdong%20cantonese%20food%20lion%20dance%20lingnan%20culture&image_size=landscape_16_9'
      }
    }
  },

  onLoad() {
    this.setCurrentDate();
  },

  setCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({
      currentDate: `${year}年${month}月${day}日`
    });
  },

  showLandmarkDetail(e) {
    const landmark = e.currentTarget.dataset.landmark;
    this.setData({
      selectedLandmark: landmark,
      showLandmarkModal: true
    });
  },

  hideLandmarkModal() {
    this.setData({
      showLandmarkModal: false
    });
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  goToLandmarkContent(e) {
    const landmark = e.currentTarget.dataset.landmark;
    // 根据地标跳转到相应的文化内容页面
    wx.showToast({
      title: `跳转到${this.data.landmarkDetails[landmark].name}文化内容`,
      icon: 'none'
    });
  },

  shareReport() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '我的文化研学足迹报告',
      path: '/pages/cultural-map/cultural-map',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20cultural%20study%20map%20travel%20footprint%20report&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '我的文化研学足迹报告',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20cultural%20study%20map%20travel%20footprint%20report&image_size=landscape_16_9'
    };
  }
});
