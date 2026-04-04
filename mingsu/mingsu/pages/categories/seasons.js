// mingsu/mingsu/pages/categories/seasons.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSeason: 'spring',
    seasons: [
      {
        id: 'spring',
        name: '春季',
        solarTerms: [
          { id: 1, name: '立春', desc: '万物复苏，吃春饼、春卷' },
          { id: 2, name: '雨水', desc: '乍暖还寒，宜吃祛湿食物' },
          { id: 3, name: '惊蛰', desc: '春雷惊醒，宜吃清淡食物' },
          { id: 4, name: '春分', desc: '昼夜平分，宜吃春菜' },
          { id: 5, name: '清明', desc: '扫墓祭祖，吃青团、清明果' },
          { id: 6, name: '谷雨', desc: '雨生百谷，宜吃健脾食物' }
        ]
      },
      {
        id: 'summer',
        name: '夏季',
        solarTerms: [
          { id: 7, name: '立夏', desc: '夏季开始，吃立夏蛋、五色饭' },
          { id: 8, name: '小满', desc: '麦粒饱满，宜吃清热食物' },
          { id: 9, name: '芒种', desc: '忙着种收，宜吃清淡食物' },
          { id: 10, name: '夏至', desc: '昼长夜短，吃夏至面' },
          { id: 11, name: '小暑', desc: '天气炎热，宜吃消暑食物' },
          { id: 12, name: '大暑', desc: '最热时期，宜吃清热祛湿食物' }
        ]
      },
      {
        id: 'autumn',
        name: '秋季',
        solarTerms: [
          { id: 13, name: '立秋', desc: '秋季开始，吃立秋贴秋膘' },
          { id: 14, name: '处暑', desc: '暑气结束，宜吃润燥食物' },
          { id: 15, name: '白露', desc: '天气转凉，宜吃温补食物' },
          { id: 16, name: '秋分', desc: '昼夜平分，宜吃养阴食物' },
          { id: 17, name: '寒露', desc: '露水寒凉，宜吃温养食物' },
          { id: 18, name: '霜降', desc: '开始降霜，宜吃进补食物' }
        ]
      },
      {
        id: 'winter',
        name: '冬季',
        solarTerms: [
          { id: 19, name: '立冬', desc: '冬季开始，吃立冬补冬' },
          { id: 20, name: '小雪', desc: '开始降雪，宜吃温热食物' },
          { id: 21, name: '大雪', desc: '雪量增多，宜吃温补食物' },
          { id: 22, name: '冬至', desc: '昼短夜长，吃冬至饺子、汤圆' },
          { id: 23, name: '小寒', desc: '天气寒冷，宜吃温热食物' },
          { id: 24, name: '大寒', desc: '最冷时期，宜吃进补食物' }
        ]
      }
    ],
    seasonalFoods: [
      {
        id: 1,
        name: '清明青团',
        season: 'spring',
        desc: '清明节传统食品，用艾草汁和糯米粉制成，象征着对祖先的缅怀',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake%20traditional%20food&image_size=square'
      },
      {
        id: 2,
        name: '立夏蛋',
        season: 'summer',
        desc: '立夏吃蛋，祈求夏日平安健康，避免疰夏',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20lixia%20solar%20term%20eggs%20traditional%20food&image_size=square'
      },
      {
        id: 3,
        name: '中秋月饼',
        season: 'autumn',
        desc: '中秋节传统食品，象征团圆，口味多样',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20mid%20autumn%20festival%20moon%20cakes%20traditional&image_size=square'
      },
      {
        id: 4,
        name: '冬至饺子',
        season: 'winter',
        desc: '冬至吃饺子，防止耳朵受冻，源自医圣张仲景的典故',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20dongzhi%20solar%20term%20dumplings%20traditional%20food&image_size=square'
      }
    ],
    currentSolarTerms: [],
    currentSeasonalFoods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '时令食俗'
    });
    // 初始化当前季节的节气和美食
    this.updateCurrentSeasonData();
  },

  /**
   * 更新当前季节的数据
   */
  updateCurrentSeasonData() {
    const { currentSeason, seasons, seasonalFoods } = this.data;
    
    // 获取当前季节的节气
    const currentSeasonData = seasons.find(s => s.id === currentSeason);
    const currentSolarTerms = currentSeasonData ? currentSeasonData.solarTerms : [];
    
    // 获取当前季节的美食
    const currentSeasonalFoods = seasonalFoods.filter(f => f.season === currentSeason);
    
    this.setData({
      currentSolarTerms,
      currentSeasonalFoods
    });
  },

  /**
   * 切换季节
   */
  changeSeason(e) {
    const seasonId = e.currentTarget.dataset.id;
    this.setData({ currentSeason: seasonId }, () => {
      // 更新当前季节的数据
      this.updateCurrentSeasonData();
    });
  },

  /**
   * 跳转到美食详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/detail/detail?id=${id}`
    });
  },

  /**
   * 返回分类列表页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})