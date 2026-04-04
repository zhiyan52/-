// mingsu/mingsu/pages/categories/intangible.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intangibleFoods: [
      {
        id: 1,
        name: '苏式月饼制作技艺',
        level: '国家级',
        region: '江苏苏州',
        desc: '苏式月饼制作技艺历史悠久，以酥皮著称，工艺精细，口感酥松',
        master: '王师傅',
        masterDesc: '国家级非物质文化遗产传承人，从事苏式月饼制作40余年',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=su%20style%20moon%20cake%20making%20traditional%20chinese%20craftsmanship&image_size=square'
      },
      {
        id: 2,
        name: '广式月饼制作技艺',
        level: '国家级',
        region: '广东广州',
        desc: '广式月饼制作技艺以皮薄馅多，口感细腻著称，是中国月饼的重要流派',
        master: '李师傅',
        masterDesc: '国家级非物质文化遗产传承人，专注广式月饼制作30余年',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cantonese%20style%20moon%20cake%20making%20traditional%20chinese%20craftsmanship&image_size=square'
      },
      {
        id: 3,
        name: '北京烤鸭制作技艺',
        level: '国家级',
        region: '北京',
        desc: '北京烤鸭制作技艺历史悠久，以果木烤制，皮脆肉嫩著称',
        master: '张师傅',
        masterDesc: '国家级非物质文化遗产传承人，烤鸭技艺大师',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20making%20traditional%20chinese%20craftsmanship&image_size=square'
      },
      {
        id: 4,
        name: '山西面食制作技艺',
        level: '国家级',
        region: '山西',
        desc: '山西面食制作技艺种类繁多，工艺精湛，是中国面食文化的代表',
        master: '赵师傅',
        masterDesc: '国家级非物质文化遗产传承人，山西面食大师',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanxi%20noodle%20making%20traditional%20chinese%20craftsmanship&image_size=square'
      },
      {
        id: 5,
        name: '四川火锅制作技艺',
        level: '省级',
        region: '四川成都',
        desc: '四川火锅制作技艺以麻辣鲜香著称，是川菜的重要组成部分',
        master: '陈师傅',
        masterDesc: '省级非物质文化遗产传承人，火锅技艺大师',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20hot%20pot%20making%20traditional%20chinese%20craftsmanship&image_size=square'
      },
      {
        id: 6,
        name: '福建沙县小吃制作技艺',
        level: '省级',
        region: '福建沙县',
        desc: '福建沙县小吃制作技艺种类丰富，风味独特，是中国著名的小吃流派',
        master: '林师傅',
        masterDesc: '省级非物质文化遗产传承人，沙县小吃大师',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fujian%20shaxian%20snacks%20making%20traditional%20chinese%20craftsmanship&image_size=square'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '非遗食韵'
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