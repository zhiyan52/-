// mingsu/mingsu/pages/categories/cakes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cakes: [
      {
        id: 1,
        name: '月饼',
        type: '节庆糕饼',
        desc: '月饼是中秋节的传统食品，象征团圆，口味多样',
        meaning: '团圆、美满',
        history: '月饼起源于唐朝，盛行于宋朝，是中国传统节庆食品的代表',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20moon%20cake%20traditional%20pastry&image_size=square'
      },
      {
        id: 2,
        name: '年糕',
        type: '节庆糕饼',
        desc: '年糕是春节的传统食品，象征年年高升',
        meaning: '年年高升、吉祥如意',
        history: '年糕起源于春秋战国时期，是中国传统节庆食品之一',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20new%20year%20cake%20traditional%20pastry&image_size=square'
      },
      {
        id: 3,
        name: '粽子',
        type: '节庆糕饼',
        desc: '粽子是端午节的传统食品，纪念屈原',
        meaning: '纪念先贤、驱邪避灾',
        history: '粽子起源于战国时期，是为了纪念爱国诗人屈原',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20zongzi%20rice%20dumpling%20traditional%20food&image_size=square'
      },
      {
        id: 4,
        name: '桃酥',
        type: '传统糕点',
        desc: '桃酥是中国传统糕点，以酥脆香甜著称',
        meaning: '长寿、健康',
        history: '桃酥起源于唐朝，是中国传统糕点的代表之一',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20peach%20cake%20traditional%20pastry&image_size=square'
      },
      {
        id: 5,
        name: '桂花糕',
        type: '传统糕点',
        desc: '桂花糕是中国传统糕点，以桂花香气浓郁著称',
        meaning: '富贵吉祥、幸福美满',
        history: '桂花糕起源于明朝，是中国传统糕点的代表之一',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20osmanthus%20cake%20traditional%20pastry&image_size=square'
      },
      {
        id: 6,
        name: '绿豆糕',
        type: '传统糕点',
        desc: '绿豆糕是中国传统糕点，以清凉爽口著称',
        meaning: '清热解毒、健康长寿',
        history: '绿豆糕起源于宋朝，是中国传统糕点的代表之一',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20mung%20bean%20cake%20traditional%20pastry&image_size=square'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '传统糕饼'
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