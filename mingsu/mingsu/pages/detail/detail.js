// mingsu/mingsu/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodDetail: {
      id: 1,
      name: '北京烤鸭',
      category: '地域珍味',
      region: '北京',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20traditional%20chinese%20food&image_size=landscape_16_9',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20slicing%20traditional%20chinese%20food&image_size=landscape_16_9',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20with%20pancakes%20traditional%20chinese%20food&image_size=landscape_16_9'
      ],
      desc: '北京烤鸭是北京最著名的菜式，以色泽红艳，肉质肥而不腻，外脆里嫩著称',
      origin: '北京烤鸭起源于南北朝时期，当时称为"炙鸭"。到了明朝，烤鸭技术得到了进一步发展，成为宫廷菜肴。清朝时期，烤鸭传入民间，成为北京的特色美食。',
      story: '相传，明朝永乐皇帝迁都北京后，将南京的烤鸭技术带到了北京。经过数百年的发展，北京烤鸭形成了独特的制作工艺，成为了中国美食的代表之一。',
      meaning: '北京烤鸭象征着富贵吉祥，是中国传统饮食文化的重要组成部分，也是中外文化交流的重要载体。',
      process: '北京烤鸭的制作工艺非常复杂，包括选鸭、宰杀、打气、烫皮、挂糖、晾干、烤制等多个步骤。烤制时使用果木，使鸭肉带有特殊的香气。',
      master: '张师傅',
      masterDesc: '国家级非物质文化遗产传承人，烤鸭技艺大师，从事烤鸭制作40余年。',
      related: [
        { id: 2, name: '天津狗不理包子', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tianjin%20goubuli%20steamed%20buns%20traditional%20chinese%20food&image_size=square' },
        { id: 3, name: '山西刀削面', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanxi%20knife%20cut%20noodles%20traditional%20chinese%20food&image_size=square' },
        { id: 4, name: '上海小笼包', imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanghai%20xiaolongbao%20steamed%20dumplings%20traditional%20chinese%20food&image_size=square' }
      ]
    },
    currentImageIndex: 0,
    isCollected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id || 1;
    // 模拟根据ID获取数据
    this.loadFoodDetail(id);
  },

  /**
   * 加载美食详情数据
   */
  loadFoodDetail(id) {
    // 这里可以根据ID从服务器或云数据库获取数据
    // 目前使用模拟数据
    wx.setNavigationBarTitle({
      title: this.data.foodDetail.name
    });
  },

  /**
   * 切换图片
   */
  changeImage(e) {
    const index = e.detail.current;
    this.setData({ currentImageIndex: index });
  },

  /**
   * 预览图片
   */
  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.foodDetail.images
    });
  },

  /**
   * 收藏/取消收藏
   */
  toggleCollect() {
    this.setData({
      isCollected: !this.data.isCollected
    });
    wx.showToast({
      title: this.data.isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
  },

  /**
   * 分享
   */
  share() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  /**
   * 跳转到3D模型展示页
   */
  goTo3DModel() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/3d-model/3d-model'
    });
  },

  /**
   * 跳转到相关美食详情页
   */
  goToRelatedDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/detail/detail?id=${id}`
    });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: this.data.foodDetail.name,
      path: `/mingsu/mingsu/pages/detail/detail?id=${this.data.foodDetail.id}`,
      imageUrl: this.data.foodDetail.images[0]
    };
  },

  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: this.data.foodDetail.name,
      imageUrl: this.data.foodDetail.images[0]
    };
  }
})