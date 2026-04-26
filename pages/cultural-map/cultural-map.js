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
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/云冈石窟.jpg'
      },
      jiangsu: {
        name: '江苏',
        type: '非物质文化遗产',
        progress: 70,
        learned: '苏绣、昆曲、南京云锦',
        achievement: '非遗传承者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/昆剧.jpg'
      },
      sichuan: {
        name: '四川',
        type: '民俗文化',
        progress: 60,
        learned: '川菜、变脸、大熊猫文化',
        achievement: '民俗探索者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/熊猫.jpg'
      },
      shaanxi: {
        name: '陕西',
        type: '历史文化',
        progress: 90,
        learned: '兵马俑、西安古城墙、黄帝陵',
        achievement: '历史文化学者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/兵马俑.jpg'
      },
      beijing: {
        name: '北京',
        type: '皇家文化',
        progress: 95,
        learned: '故宫、长城、颐和园',
        achievement: '皇家文化专家',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/故宫.jpg'
      },
      zhejiang: {
        name: '浙江',
        type: '江南文化',
        progress: 40,
        learned: '西湖、乌镇、龙井茶',
        achievement: '江南文化爱好者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/乌镇.jpg'
      },
      henan: {
        name: '河南',
        type: '中原文化',
        progress: 30,
        learned: '龙门石窟、少林寺',
        achievement: '中原文化初学者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/少林寺.jpg'
      },
      fujian: {
        name: '福建',
        type: '海洋文化',
        progress: 20,
        learned: '土楼、妈祖文化',
        achievement: '海洋文化探索者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/妈祖.jpg'
      },
      hunan: {
        name: '湖南',
        type: '湖湘文化',
        progress: 15,
        learned: '岳阳楼、张家界',
        achievement: '湖湘文化初学者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/张家界.jpg'
      },
      guangdong: {
        name: '广东',
        type: '岭南文化',
        progress: 10,
        learned: '粤菜、醒狮',
        achievement: '岭南文化初学者',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/舞狮.jpg'
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
