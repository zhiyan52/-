Page({
  data: {
    selectedFilter: 'all',
    collections: [],
    page: 1,
    loading: false,
    showPinyin: false,
    favorites: []
  },

  onLoad: function (options) {
    this.loadFavorites();
    this.loadCollections();
  },

  // 加载收藏数据
  loadFavorites: function () {
    const favorites = wx.getStorageSync('diancang_favorites') || [];
    this.setData({ favorites: favorites });
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
        pinyin: 'Yǒng Lè Dà Diǎn',
        desc: '中国古代最大的百科全书，被誉为"世界有史以来最大的百科全书"',
        category: '经史子集',
        era: '明代',
        views: 12580
      },
      {
        id: 2,
        image: 'https://picsum.photos/200/280?random=2',
        title: '《四库全书》',
        pinyin: 'Sì Kù Quán Shū',
        desc: '清代乾隆时期编修的大型丛书，分经史子集四部',
        category: '经史子集',
        era: '清代',
        views: 9876
      },
      {
        id: 3,
        image: 'https://picsum.photos/200/280?random=3',
        title: '《清明上河图》',
        pinyin: 'Qīng Míng Shàng Hé Tú',
        desc: '北宋张择端绘制的风俗画，中国十大传世名画之一',
        category: '传世名画',
        era: '北宋',
        views: 15678
      },
      {
        id: 4,
        image: 'https://picsum.photos/200/280?random=4',
        title: '《论语》',
        pinyin: 'Lún Yǔ',
        desc: '儒家经典著作之一，主要记录孔子及其弟子的言行',
        category: '经部',
        era: '春秋',
        views: 25800
      },
      {
        id: 5,
        image: 'https://picsum.photos/200/280?random=5',
        title: '《周易》',
        pinyin: 'Zhōu Yì',
        desc: '中国传统思想文化中自然哲学与人文实践的理论根源',
        category: '经部',
        era: '西周',
        views: 18900
      },
      {
        id: 6,
        image: 'https://picsum.photos/200/280?random=6',
        title: '《史记》',
        pinyin: 'Shǐ Jì',
        desc: '西汉司马迁撰写的纪传体通史，是中国第一部纪传体通史',
        category: '史部',
        era: '西汉',
        views: 14567
      },
      {
        id: 7,
        image: 'https://picsum.photos/200/280?random=7',
        title: '《道德经》',
        pinyin: 'Dào Dé Jīng',
        desc: '道家经典著作，老子所著，包含丰富的哲学思想',
        category: '子部',
        era: '春秋',
        views: 16789
      },
      {
        id: 8,
        image: 'https://picsum.photos/200/280?random=8',
        title: '《楚辞》',
        pinyin: 'Chǔ Cí',
        desc: '战国时期屈原等人的作品集，是中国文学史上的重要作品',
        category: '集部',
        era: '战国',
        views: 12345
      },
      {
        id: 9,
        image: 'https://picsum.photos/200/280?random=9',
        title: '《大学》',
        pinyin: 'Dà Xué',
        desc: '儒家经典著作之一，是《礼记》中的一篇',
        category: '经部',
        era: '战国',
        views: 19800
      },
      {
        id: 10,
        image: 'https://picsum.photos/200/280?random=10',
        title: '《中庸》',
        pinyin: 'Zhōng Yōng',
        desc: '儒家经典著作之一，是《礼记》中的一篇',
        category: '经部',
        era: '战国',
        views: 17654
      },
      {
        id: 11,
        image: 'https://picsum.photos/200/280?random=11',
        title: '《诗经》',
        pinyin: 'Shī Jīng',
        desc: '中国第一部诗歌总集，收集了西周至春秋时期的诗歌',
        category: '经部',
        era: '西周至春秋',
        views: 23456
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

  // 切换拼音标注
  togglePinyin: function () {
    this.setData({
      showPinyin: !this.data.showPinyin
    });
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

  // 切换收藏状态
  toggleFavorite: function (e) {
    const id = e.currentTarget.dataset.id;
    let favorites = [...this.data.favorites];
    const index = favorites.indexOf(id);

    if (index > -1) {
      // 取消收藏
      favorites.splice(index, 1);
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      });
    } else {
      // 添加收藏
      favorites.push(id);
      wx.showToast({
        title: '已添加到收藏',
        icon: 'success'
      });
    }

    this.setData({ favorites: favorites });
    wx.setStorageSync('diancang_favorites', favorites);
  },

  // 加载更多
  loadMore: function () {
    if (this.data.loading) return;

    this.setData({ loading: true });

    // 模拟加载更多数据
    setTimeout(() => {
      const moreCollections = [
        {
          id: 12,
          image: 'https://picsum.photos/200/280?random=12',
          title: '《孟子》',
          pinyin: 'Mèng Zǐ',
          desc: '儒家经典著作之一，记录孟子的思想和言行',
          category: '经部',
          era: '战国',
          views: 15678
        },
        {
          id: 13,
          image: 'https://picsum.photos/200/280?random=13',
          title: '《庄子》',
          pinyin: 'Zhuāng Zǐ',
          desc: '道家经典著作之一，记录庄子的思想和寓言',
          category: '子部',
          era: '战国',
          views: 14321
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