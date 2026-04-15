Page({
  data: {
    collection: {
      id: 0,
      title: '',
      cover: '',
      category: '',
      era: '',
      author: '',
      views: 0,
      favorites: 0,
      comments: 0,
      description: '',
      size: '',
      material: '',
      location: '',
      acquisitionDate: '',
      images: []
    },
    isFavorite: false
  },

  onLoad: function (options) {
    const id = options.id;
    this.loadCollectionData(id);
  },

  // 加载藏品数据
  loadCollectionData: function (id) {
    // 模拟藏品数据
    const collections = {
      1: {
        id: 1,
        title: '《永乐大典》',
        cover: 'https://picsum.photos/400/600?random=1',
        category: '经史子集',
        era: '明代',
        author: '解缙等',
        views: 12580,
        favorites: 3421,
        comments: 567,
        description: '《永乐大典》是明成祖朱棣命解缙、姚广孝等主持编纂的一部大型类书，全书正文22877卷，凡例和目录60卷，装成11095册，约3.7亿字，汇集了古今图书七八千种，是中国古代最大的百科全书，被誉为"世界有史以来最大的百科全书"。',
        size: '30 × 20 × 5 cm',
        material: '纸本',
        location: '中国国家图书馆',
        acquisitionDate: '1960年',
        images: [
          'https://picsum.photos/400/300?random=11',
          'https://picsum.photos/400/300?random=12',
          'https://picsum.photos/400/300?random=13'
        ]
      },
      101: {
        id: 101,
        title: '《论语》',
        cover: 'https://picsum.photos/400/600?random=4',
        category: '经部',
        era: '春秋',
        author: '孔子弟子及再传弟子',
        views: 25800,
        favorites: 8765,
        comments: 1234,
        description: '《论语》是儒家经典著作之一，主要记录孔子及其弟子的言行，集中体现了孔子的政治主张、伦理思想、道德观念及教育原则等。全书共20篇，492章，是研究孔子及儒家思想的重要资料。',
        size: '28 × 18 × 4 cm',
        material: '纸本',
        location: '曲阜孔庙',
        acquisitionDate: '清代',
        images: [
          'https://picsum.photos/400/300?random=14',
          'https://picsum.photos/400/300?random=15'
        ]
      },
      201: {
        id: 201,
        title: '《周易》',
        cover: 'https://picsum.photos/400/600?random=5',
        category: '经部',
        era: '西周',
        author: '周文王',
        views: 18900,
        favorites: 5432,
        comments: 890,
        description: '《周易》是中国传统思想文化中自然哲学与人文实践的理论根源，是古代汉民族思想、智慧的结晶，被誉为"大道之源"。内容极其丰富，对中国几千年来的政治、经济、文化等各个领域都产生了极其深刻的影响。',
        size: '32 × 22 × 6 cm',
        material: '竹简',
        location: '上海博物馆',
        acquisitionDate: '1994年',
        images: [
          'https://picsum.photos/400/300?random=16',
          'https://picsum.photos/400/300?random=17',
          'https://picsum.photos/400/300?random=18'
        ]
      }
    };

    // 获取对应ID的藏品数据
    const collection = collections[id] || collections[1];
    this.setData({
      collection: collection
    });
  },

  // 返回上一页
  goBack: function () {
    wx.navigateBack();
  },

  // 切换收藏状态
  toggleFavorite: function () {
    const isFavorite = !this.data.isFavorite;
    this.setData({
      isFavorite: isFavorite
    });

    wx.showToast({
      title: isFavorite ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
  },

  // 预览图片
  previewImage: function (e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.collection.images;

    wx.previewImage({
      current: images[index],
      urls: images
    });
  },

  // 添加评论
  addComment: function () {
    wx.showModal({
      title: '添加评论',
      content: '请输入您的评论',
      placeholderText: '写下您的想法...',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 分享藏品
  shareCollection: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 在线阅读
  readOnline: function () {
    wx.navigateTo({
      url: '/diancang/diancang-reader?id=' + this.data.collection.id
    });
  },

  // 分享到朋友圈
  onShareTimeline: function () {
    return {
      title: this.data.collection.title,
      imageUrl: this.data.collection.cover
    };
  },

  // 分享给朋友
  onShareAppMessage: function () {
    return {
      title: this.data.collection.title,
      path: '/diancang/diancang-detail?id=' + this.data.collection.id,
      imageUrl: this.data.collection.cover
    };
  }
});