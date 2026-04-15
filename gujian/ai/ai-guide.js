Page({
  data: {
    selectedBuilding: null,
    aiResponse: '',
    loading: false,
    buildings: {
      'forbidden-city': {
        name: '故宫',
        desc: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。'
      },
      'summer-palace': {
        name: '颐和园',
        desc: '中国古典园林，是保存最完整的一座皇家行宫御苑，被誉为皇家园林博物馆。'
      },
      'temple-of-heaven': {
        name: '天坛',
        desc: '明清两代皇帝祭天、祈求五谷丰登的场所，是中国现存最大的古代祭祀性建筑群。'
      },
      'suzhou-garden': {
        name: '苏州园林',
        desc: '中国古典园林的杰出代表，以精巧的设计和独特的艺术风格闻名于世。'
      }
    }
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  // 选择古建筑
  selectBuilding: function (e) {
    const buildingId = e.currentTarget.dataset.building;
    const building = this.data.buildings[buildingId];

    this.setData({
      selectedBuilding: building,
      aiResponse: '',
      loading: true
    });

    // 模拟AI生成讲解
    setTimeout(() => {
      this.generateAIResponse(building);
    }, 1000);
  },

  // 生成AI讲解
  generateAIResponse: function (building) {
    // 模拟AI响应内容
    const responses = {
      '故宫': '故宫，又名紫禁城，是中国明清两代的皇家宫殿，位于北京中轴线的中心。它始建于明永乐四年（1406年），是世界上现存规模最大、保存最为完整的木质结构古建筑之一。故宫的建筑布局呈南北对称轴线，占地面积约72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。',
      '颐和园': '颐和园，原名清漪园，是中国清朝时期皇家园林，坐落在北京西郊。它始建于1750年，是以昆明湖、万寿山为基址，以杭州西湖为蓝本，汲取江南园林的设计手法而建成的一座大型山水园林。颐和园是保存最完整的一座皇家行宫御苑，被誉为皇家园林博物馆。',
      '天坛': '天坛，是明清两代皇帝祭天、祈求五谷丰登的场所，位于北京市东城区。它始建于明永乐十八年（1420年），是中国现存最大的古代祭祀性建筑群。天坛的主要建筑包括圜丘、祈年殿、皇穹宇等，以其独特的建筑风格和深刻的文化内涵闻名于世。',
      '苏州园林': '苏州园林，是中国古典园林的杰出代表，位于江苏省苏州市。苏州园林以精巧的设计和独特的艺术风格闻名于世，素有"园林之城"的美誉。其中，拙政园、留园、网师园、环秀山庄等园林已被联合国教科文组织列为世界文化遗产。'
    };

    this.setData({
      aiResponse: responses[building.name] || 'AI正在学习更多关于这座古建筑的知识...',
      loading: false
    });
  },

  // 开始导览
  startGuide: function () {
    if (!this.data.selectedBuilding) {
      wx.showToast({
        title: '请先选择古建筑',
        icon: 'none'
      });
      return;
    }

    wx.showToast({
      title: '开始导览',
      icon: 'success'
    });

    // 这里可以添加语音播放逻辑
    console.log('开始导览:', this.data.selectedBuilding.name);
  },

  // 停止导览
  stopGuide: function () {
    wx.showToast({
      title: '停止导览',
      icon: 'success'
    });

    // 这里可以添加停止语音播放逻辑
    console.log('停止导览');
  }
});