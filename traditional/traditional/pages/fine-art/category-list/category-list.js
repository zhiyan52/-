Page({
  data: {
    category: '',
    categoryName: '',
    categoryDesc: '',
    worksList: []
  },

  onLoad(options) {
    const { category, name } = options;
    this.setData({
      category: category,
      categoryName: decodeURIComponent(name)
    });
    
    wx.setNavigationBarTitle({ title: name });
    this.loadCategoryInfo();
    this.loadWorksList();
  },

  // 加载分类信息
  loadCategoryInfo() {
    const categoryDescMap = {
      'paper-cut': '中国传统民间艺术，以剪刀或刻刀在纸上剪刻花纹，历史悠久，分布广泛',
      'embroidery': '用针将丝线或其他纤维在绣料上穿刺，以缝迹构成花纹，是中国传统工艺的重要组成部分',
      'shadow-play': '用兽皮或纸板做成的人物剪影表演故事的民间戏剧，具有独特的艺术魅力',
      'wood-carving': '在木材上进行雕刻的工艺，历史悠久，技法丰富，是中国传统工艺的瑰宝',
      'lacquerware': '用生漆涂在各种器物的表面所制成的日常器具及工艺品，具有独特的光泽和质感',
      'bamboo-weaving': '以竹子为原料，编织成各种实用品和工艺品的传统技艺，体现了劳动人民的智慧'
    };
    
    this.setData({
      categoryDesc: categoryDescMap[this.data.category] || '中国传统美术的重要组成部分'
    });
  },

  // 加载作品列表
  loadWorksList() {
    // 模拟数据，实际项目中可以从云数据库或API获取
    const worksData = {
      'paper-cut': [
        {
          id: 1,
          title: '蔚县剪纸',
          desc: '河北蔚县的传统民间艺术，以刀刻为主，色彩艳丽，构图饱满，题材广泛',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/paper-cut1.png',
          craftsman: '王老艺人',
          era: '现代'
        },
        {
          id: 2,
          title: '陕北剪纸',
          desc: '陕西北部地区的民间剪纸，风格粗犷豪放，题材多为生活场景和吉祥图案',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/paper-cut2.png',
          craftsman: '李奶奶',
          era: '现代'
        },
        {
          id: 3,
          title: '南方剪纸',
          desc: '江南地区的剪纸艺术，风格细腻精致，题材多为花鸟鱼虫和神话故事',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/paper-cut3.png',
          craftsman: '张师傅',
          era: '现代'
        }
      ],
      'embroidery': [
        {
          id: 4,
          title: '苏绣',
          desc: '苏州地区的传统刺绣工艺，以精细、雅洁著称，被誉为"东方明珠"',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/embroidery1.png',
          craftsman: '张大师',
          era: '现代'
        },
        {
          id: 5,
          title: '湘绣',
          desc: '湖南地区的传统刺绣工艺，以写实风格为主，擅长表现山水、人物等题材',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/embroidery2.png',
          craftsman: '刘师傅',
          era: '现代'
        }
      ],
      'shadow-play': [
        {
          id: 6,
          title: '华县皮影',
          desc: '陕西华县的传统皮影戏，历史悠久，表演精湛，是中国皮影戏的重要代表',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/shadow-play1.png',
          craftsman: '王师傅',
          era: '现代'
        }
      ],
      'wood-carving': [
        {
          id: 7,
          title: '潮州木雕',
          desc: '广东潮州的传统木雕工艺，以多层镂空雕刻为特色，刀法细腻，题材丰富',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/wood-carving1.png',
          craftsman: '李师傅',
          era: '现代'
        },
        {
          id: 8,
          title: '东阳木雕',
          desc: '浙江东阳的传统木雕工艺，以平面浮雕为主，刀法流畅，题材广泛',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/wood-carving2.png',
          craftsman: '张大师',
          era: '现代'
        }
      ],
      'lacquerware': [
        {
          id: 9,
          title: '福州脱胎漆器',
          desc: '福建福州的传统漆器工艺，以脱胎技法为特色，质地轻巧，色彩鲜艳',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/lacquerware1.png',
          craftsman: '陈师傅',
          era: '现代'
        }
      ],
      'bamboo-weaving': [
        {
          id: 10,
          title: '四川竹编',
          desc: '四川地区的传统竹编工艺，以精细编织为特色，产品种类繁多，实用性强',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/bamboo-weaving1.png',
          craftsman: '赵师傅',
          era: '现代'
        }
      ]
    };
    
    this.setData({
      worksList: worksData[this.data.category] || []
    });
  },

  // 导航到详情页
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/traditional/traditional/pages/fine-art/detail/detail?id=${id}&category=${this.data.category}`
    });
  },

  // 加载更多
  loadMore() {
    // 实际项目中可以实现分页加载
    wx.showToast({
      title: '已加载全部内容',
      icon: 'none'
    });
  }
});