Page({
  data: {
    selectedTags: [],
    loading: false,
    tagList: [
      { id: 1, name: '传统戏曲' },
      { id: 2, name: '传统技艺' },
      { id: 3, name: '民间美术' },
      { id: 4, name: '传统音乐' },
      { id: 5, name: '传统舞蹈' },
      { id: 6, name: '传统体育' }
    ],
    heritageData: [
      {
        id: 1,
        name: '京剧',
        category: '传统戏曲',
        image: 'https://picsum.photos/400/300?random=201',
        description: '中国影响最大的戏曲剧种，被誉为"国粹"，融合了唱、念、做、打等表演形式。',
        views: '12.5万'
      },
      {
        id: 2,
        name: '苏绣',
        category: '传统技艺',
        image: 'https://picsum.photos/400/300?random=202',
        description: '中国四大名绣之一，以针法精细、色彩雅致著称，被誉为"东方艺术明珠"。',
        views: '8.3万'
      },
      {
        id: 3,
        name: '皮影戏',
        category: '传统戏剧',
        image: 'https://picsum.photos/400/300?random=203',
        description: '中国民间古老的传统艺术，用兽皮或纸板剪制人物剪影进行表演。',
        views: '6.7万'
      },
      {
        id: 4,
        name: '太极拳',
        category: '传统体育',
        image: 'https://picsum.photos/400/300?random=204',
        description: '国家级非物质文化遗产，集颐养性情、强身健体、技击对抗等多种功能为一体。',
        views: '15.2万'
      },
      {
        id: 5,
        name: '青花瓷',
        category: '传统工艺',
        image: 'https://picsum.photos/400/300?random=205',
        description: '中国陶瓷烧制工艺的珍品，以其洁白细腻的胎体、晶莹透亮的釉色闻名于世。',
        views: '9.8万'
      }
    ],
    recommendList: [],
    historyList: [
      {
        id: 1,
        name: '京剧',
        image: 'https://picsum.photos/100/100?random=301',
        time: '2小时前'
      },
      {
        id: 2,
        name: '苏绣',
        image: 'https://picsum.photos/100/100?random=302',
        time: '昨天'
      }
    ]
  },

  onLoad: function (options) {
    this.initRecommend();
  },

  initRecommend: function () {
    this.setData({
      loading: true
    });
    setTimeout(() => {
      this.setData({
        recommendList: this.data.heritageData.slice(0, 4),
        loading: false
      });
    }, 1000);
  },

  toggleTag: function (e) {
    const tagId = e.currentTarget.dataset.id;
    let selectedTags = [...this.data.selectedTags];
    const index = selectedTags.indexOf(tagId);

    if (index > -1) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tagId);
    }

    this.setData({
      selectedTags: selectedTags
    });

    this.refreshRecommend();
  },

  refreshRecommend: function () {
    this.setData({
      loading: true
    });
    setTimeout(() => {
      const shuffled = [...this.data.heritageData].sort(() => Math.random() - 0.5);
      this.setData({
        recommendList: shuffled.slice(0, 4),
        loading: false
      });
    }, 1000);
  },

  goToDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '正在跳转到详情页...',
      icon: 'none'
    });
  }
});