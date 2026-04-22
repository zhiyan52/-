Page({
  data: {
    selectedTags: [],
    loading: false,
    imgLoading: false,
    tagList: [
      { id: 1, name: '剪纸' },
      { id: 2, name: '刺绣' },
      { id: 3, name: '年画' },
      { id: 4, name: '传统戏曲' },
      { id: 5, name: '传统音乐' },
      { id: 6, name: '传统舞蹈' },
      { id: 7, name: '传统体育' },
      { id: 8, name: '传统工艺' }
    ],
    heritageData: [
      {
        id: 1,
        name: '剪纸',
        category: '民间美术',
        image: 'https://picsum.photos/400/300?random=201',
        description: '中国传统民间艺术，用剪刀或刻刀在纸上剪刻出各种图案，用于装饰或表达吉祥寓意。',
        views: '15.8万'
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
        name: '年画',
        category: '民间美术',
        image: 'https://picsum.photos/400/300?random=203',
        description: '中国传统民间艺术，用于新年装饰，内容多为吉祥喜庆的图案。',
        views: '12.4万'
      },
      {
        id: 4,
        name: '京剧',
        category: '传统戏曲',
        image: 'https://picsum.photos/400/300?random=204',
        description: '中国影响最大的戏曲剧种，被誉为"国粹"，融合了唱、念、做、打等表演形式。',
        views: '12.5万'
      },
      {
        id: 5,
        name: '太极拳',
        category: '传统体育',
        image: 'https://picsum.photos/400/300?random=205',
        description: '国家级非物质文化遗产，集颐养性情、强身健体、技击对抗等多种功能为一体。',
        views: '15.2万'
      },
      {
        id: 6,
        name: '青花瓷',
        category: '传统工艺',
        image: 'https://picsum.photos/400/300?random=206',
        description: '中国陶瓷烧制工艺的珍品，以其洁白细腻的胎体、晶莹透亮的釉色闻名于世。',
        views: '9.8万'
      },
      {
        id: 7,
        name: '皮影戏',
        category: '传统戏剧',
        image: 'https://picsum.photos/400/300?random=207',
        description: '中国民间古老的传统艺术，用兽皮或纸板剪制人物剪影进行表演。',
        views: '6.7万'
      },
      {
        id: 8,
        name: '云锦',
        category: '传统工艺',
        image: 'https://picsum.photos/400/300?random=208',
        description: '中国传统丝织工艺珍品，以其色彩艳丽、图案精美著称。',
        views: '7.9万'
      }
    ],
    recommendList: [],
    visualReferences: [],
    historyList: [
      {
        id: 1,
        name: '剪纸',
        image: 'https://picsum.photos/100/100?random=301',
        time: '2小时前'
      },
      {
        id: 2,
        name: '苏绣',
        image: 'https://picsum.photos/100/100?random=302',
        time: '昨天'
      }
    ],
    // DeepSeek API密钥
    deepSeekKey: 'sk-db4358439d684158895f40d0a4612c4a'
  },

  onLoad: function (options) {
    this.initRecommend();
  },

  initRecommend: function () {
    this.setData({
      loading: true
    });
    // 模拟AI推荐过程
    setTimeout(() => {
      this.setData({
        recommendList: this.data.heritageData.slice(0, 4),
        loading: false
      });
      // 生成视觉参考图
      this.generateVisualReferences();
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

    // 获取用户选择的兴趣标签
    const selectedTagNames = this.data.selectedTags.map(tagId => {
      const tag = this.data.tagList.find(t => t.id === tagId);
      return tag ? tag.name : '';
    }).filter(Boolean);

    // 调用DeepSeek API获取个性化推荐
    this.getDeepSeekRecommendations(selectedTagNames).then(recommendations => {
      this.setData({
        recommendList: recommendations,
        loading: false
      });
      // 生成视觉参考图
      this.generateVisualReferences();
    }).catch(err => {
      console.error('获取推荐失败:', err);
      // 降级处理：使用本地数据
      const shuffled = [...this.data.heritageData].sort(() => Math.random() - 0.5);
      this.setData({
        recommendList: shuffled.slice(0, 4),
        loading: false
      });
      // 生成视觉参考图
      this.generateVisualReferences();
    });
  },

  // 调用DeepSeek API获取个性化推荐
  getDeepSeekRecommendations: function (interests) {
    return new Promise((resolve, reject) => {
      // 模拟API调用
      setTimeout(() => {
        // 根据兴趣过滤推荐内容
        let filteredData = this.data.heritageData;
        if (interests.length > 0) {
          filteredData = this.data.heritageData.filter(item => {
            return interests.some(interest =>
              item.name.includes(interest) || item.category.includes(interest)
            );
          });
        }

        // 如果过滤后数据不足，补充其他数据
        if (filteredData.length < 4) {
          const remainingData = this.data.heritageData.filter(item =>
            !filteredData.includes(item)
          );
          filteredData = [...filteredData, ...remainingData].slice(0, 4);
        }

        resolve(filteredData);
      }, 1000);
    });
  },

  // 生成视觉参考图
  generateVisualReferences: function () {
    this.setData({
      imgLoading: true
    });

    // 模拟混元图像生成API调用
    setTimeout(() => {
      const visualReferences = this.data.recommendList.slice(0, 3).map(item => {
        return {
          image: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`,
          description: `${item.name}创作参考图`
        };
      });

      this.setData({
        visualReferences: visualReferences,
        imgLoading: false
      });
    }, 1500);
  },

  goToDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '正在跳转到详情页...',
      icon: 'none'
    });
  }
});