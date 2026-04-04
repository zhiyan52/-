// mingsu/mingsu/pages/categories/regions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentRegion: 'north',
    regions: [
      {
        id: 'north',
        name: '华北地区',
        provinces: ['北京', '天津', '河北', '山西', '内蒙古'],
        foods: [
          {
            id: 1,
            name: '北京烤鸭',
            province: '北京',
            desc: '北京烤鸭是北京最著名的菜式，以色泽红艳，肉质肥而不腻，外脆里嫩著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20traditional%20chinese%20food&image_size=square'
          },
          {
            id: 2,
            name: '山西刀削面',
            province: '山西',
            desc: '山西刀削面是山西四大面食之一，以刀工精湛，面叶宽厚，口感筋道著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanxi%20knife%20cut%20noodles%20traditional%20chinese%20food&image_size=square'
          }
        ]
      },
      {
        id: 'east',
        name: '华东地区',
        provinces: ['上海', '江苏', '浙江', '安徽', '福建', '江西', '山东'],
        foods: [
          {
            id: 3,
            name: '上海小笼包',
            province: '上海',
            desc: '上海小笼包是上海著名的传统小吃，以皮薄馅多，汤汁丰富著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20xiaolongbao%20steamed%20dumplings%20traditional%20chinese%20food&image_size=square'
          },
          {
            id: 4,
            name: '杭州西湖醋鱼',
            province: '浙江',
            desc: '杭州西湖醋鱼是杭州传统名菜，以鱼肉鲜嫩，酸甜可口著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hangzhou%20west%20lake%20vinegar%20fish%20traditional%20chinese%20food&image_size=square'
          }
        ]
      },
      {
        id: 'south',
        name: '华南地区',
        provinces: ['广东', '广西', '海南'],
        foods: [
          {
            id: 5,
            name: '广式早茶',
            province: '广东',
            desc: '广式早茶是广东传统饮食文化，包括各种点心和茶饮',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20morning%20tea%20traditional%20chinese%20food&image_size=square'
          },
          {
            id: 6,
            name: '广西螺蛳粉',
            province: '广西',
            desc: '广西螺蛳粉是广西特色小吃，以酸辣可口，风味独特著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangxi%20luosifen%20spicy%20noodles%20traditional%20chinese%20food&image_size=square'
          }
        ]
      },
      {
        id: 'central',
        name: '华中地区',
        provinces: ['河南', '湖北', '湖南'],
        foods: [
          {
            id: 7,
            name: '河南烩面',
            province: '河南',
            desc: '河南烩面是河南传统面食，以汤鲜面滑，配料丰富著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=henan%20braised%20noodles%20traditional%20chinese%20food&image_size=square'
          },
          {
            id: 8,
            name: '湖南臭豆腐',
            province: '湖南',
            desc: '湖南臭豆腐是湖南特色小吃，以闻起来臭，吃起来香著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hunan%20stinky%20tofu%20traditional%20chinese%20food&image_size=square'
          }
        ]
      },
      {
        id: 'southwest',
        name: '西南地区',
        provinces: ['四川', '贵州', '云南', '重庆', '西藏'],
        foods: [
          {
            id: 9,
            name: '四川火锅',
            province: '四川',
            desc: '四川火锅是四川特色美食，以麻辣鲜香，味道醇厚著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20hot%20pot%20traditional%20chinese%20food&image_size=square'
          },
          {
            id: 10,
            name: '云南过桥米线',
            province: '云南',
            desc: '云南过桥米线是云南传统小吃，以汤鲜米线滑，配料丰富著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=yunnan%20cross%20bridge%20rice%20noodles%20traditional%20chinese%20food&image_size=square'
          }
        ]
      },
      {
        id: 'northwest',
        name: '西北地区',
        provinces: ['陕西', '甘肃', '青海', '宁夏', '新疆'],
        foods: [
          {
            id: 11,
            name: '陕西肉夹馍',
            province: '陕西',
            desc: '陕西肉夹馍是陕西传统小吃，以馍香肉嫩，味道醇厚著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shaanxi%20roujiamo%20meat%20sandwich%20traditional%20chinese%20food&image_size=square'
          },
          {
            id: 12,
            name: '新疆烤羊肉串',
            province: '新疆',
            desc: '新疆烤羊肉串是新疆特色美食，以肉质鲜嫩，味道香辣著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=xinjiang%20grilled%20lamb%20skewers%20traditional%20chinese%20food&image_size=square'
          }
        ]
      },
      {
        id: 'northeast',
        name: '东北地区',
        provinces: ['辽宁', '吉林', '黑龙江'],
        foods: [
          {
            id: 13,
            name: '东北酸菜炖粉条',
            province: '东北',
            desc: '东北酸菜炖粉条是东北传统名菜，以酸味纯正，口感丰富著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=northeast%20chinese%20sauerkraut%20stew%20with%20noodles%20traditional%20food&image_size=square'
          },
          {
            id: 14,
            name: '沈阳老边饺子',
            province: '辽宁',
            desc: '沈阳老边饺子是沈阳传统小吃，以皮薄馅大，味道鲜美著称',
            imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shenyang%20laobian%20dumplings%20traditional%20chinese%20food&image_size=square'
          }
        ]
      }
    ],
    currentProvinces: [],
    currentFoods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '地域珍味'
    });
    // 初始化当前地区的省份和美食
    this.updateCurrentRegionData();
  },

  /**
   * 更新当前地区的数据
   */
  updateCurrentRegionData() {
    const { currentRegion, regions } = this.data;
    
    // 获取当前地区的数据
    const currentRegionData = regions.find(r => r.id === currentRegion);
    
    if (currentRegionData) {
      this.setData({
        currentProvinces: currentRegionData.provinces,
        currentFoods: currentRegionData.foods
      });
    }
  },

  /**
   * 切换地区
   */
  changeRegion(e) {
    const regionId = e.currentTarget.dataset.id;
    this.setData({ currentRegion: regionId }, () => {
      // 更新当前地区的数据
      this.updateCurrentRegionData();
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