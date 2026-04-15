Page({
  data: {
    selectedFilter: 'all',
    collections: [],
    page: 1,
    loading: false
  },

  onLoad: function (options) {
    this.loadCollections();
  },

  // 加载藏品数据
  loadCollections: function () {
    this.setData({ loading: true });

    // 模拟藏品数据
    const collections = [
      {
        id: 1,
        image: 'https://picsum.photos/200/280?random=1',
        title: '《永乐大典》',
        desc: '中国古代最大的百科全书，被誉为"世界有史以来最大的百科全书"',
        category: '经史子集',
        era: '明代',
        views: 12580
      },
      {
        id: 2,
        image: 'https://picsum.photos/200/280?random=2',
        title: '《四库全书》',
        desc: '清代乾隆时期编修的大型丛书，分经史子集四部',
        category: '经史子集',
        era: '清代',
        views: 9876
      },
      {
        id: 3,
        image: 'https://picsum.photos/200/280?random=3',
        title: '《清明上河图》',
        desc: '北宋张择端绘制的风俗画，中国十大传世名画之一',
        category: '传世名画',
        era: '北宋',
        views: 15678
      },
      {
        id: 4,
        image: 'https://picsum.photos/200/280?random=4',
        title: '《论语》',
        desc: '儒家经典著作之一，主要记录孔子及其弟子的言行',
        category: '经部',
        era: '春秋',
        views: 25800
      },
      {
        id: 5,
        image: 'https://picsum.photos/200/280?random=5',
        title: '《周易》',
        desc: '中国传统思想文化中自然哲学与人文实践的理论根源',
        category: '经部',
        era: '西周',
        views: 18900
      },
      {
        id: 6,
        image: 'https://picsum.photos/200/280?random=6',
        title: '《史记》',
        desc: '西汉司马迁撰写的纪传体通史，是中国第一部纪传体通史',
        category: '史部',
        era: '西汉',
        views: 14567
      }
    ];

    setTimeout(() => {
      this.setData({
        collections: collections,
        loading: false
      });
    }, 1000);
  },

  // 返回上一页
  goBack: function () {
    wx.navigateBack();
  },

  // 选择筛选条件
  selectFilter: function (e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      selectedFilter: filter,
      page: 1
    });

    // 这里可以添加根据筛选条件重新加载数据的逻辑
    console.log('选择筛选条件:', filter);
  },

  // 显示筛选器
  showFilter: function () {
    wx.showActionSheet({
      itemList: ['全部', '经史子集', '珍贵文物', '书法碑帖', '传世名画'],
      success: function (res) {
        console.log('选择了:', res.tapIndex);
      }
    });
  },

  // 跳转到详情页
  goToDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/diancang/diancang-detail?id=' + id
    });
  },

  // 加载更多
  loadMore: function () {
    if (this.data.loading) return;

    this.setData({ loading: true });

    // 模拟加载更多数据
    setTimeout(() => {
      const moreCollections = [
        {
          id: 7,
          image: 'https://picsum.photos/200/280?random=7',
          title: '《道德经》',
          desc: '道家经典著作，老子所著，包含丰富的哲学思想',
          category: '子部',
          era: '春秋',
          views: 16789
        },
        {
          id: 8,
          image: 'https://picsum.photos/200/280?random=8',
          title: '《楚辞》',
          desc: '战国时期屈原等人的作品集，是中国文学史上的重要作品',
          category: '集部',
          era: '战国',
          views: 12345
        }
      ];

      this.setData({
        collections: this.data.collections.concat(moreCollections),
        page: this.data.page + 1,
        loading: false
      });

      wx.showToast({
        title: '加载成功',
        icon: 'success'
      });
    }, 1500);
  }
});