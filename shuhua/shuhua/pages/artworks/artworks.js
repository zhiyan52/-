// 传世书画赏析库页面逻辑
Page({
  data: {
    // 分类数据
    categories: [
      { id: 'all', name: '全部' },
      { id: 'calligraphy', name: '书法' },
      { id: 'painting', name: '国画' }
    ],
    // 当前选中的分类
    activeCategory: 'all',
    // 书画作品数据
    artworks: [
      // 书法作品
      {
        id: 1,
        name: '兰亭集序',
        author: '王羲之',
        period: '东晋',
        category: 'calligraphy',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/lanting.jpg',
        description: '被誉为"天下第一行书"，王羲之的代表作',
        background: '东晋永和九年（353年），王羲之与友人在兰亭聚会，即兴挥毫写下此序',
        features: '笔法精妙，行云流水，变化多端，自然天成',
        status: '中国书法艺术的巅峰之作，对后世书法发展产生深远影响'
      },
      {
        id: 2,
        name: '祭侄文稿',
        author: '颜真卿',
        period: '唐代',
        category: 'calligraphy',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/jizhi.jpg',
        description: '颜真卿为祭奠侄子颜季明而作，情感真挚',
        background: '唐肃宗乾元元年（758年），颜真卿为悼念在安史之乱中牺牲的侄子颜季明而作',
        features: '笔力雄健，气势磅礴，情感真挚，书法与情感完美结合',
        status: '被后世誉为"天下第二行书"，是颜体书法的代表作'
      },
      {
        id: 3,
        name: '九成宫醴泉铭',
        author: '欧阳询',
        period: '唐代',
        category: 'calligraphy',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/jiucheng.jpg',
        description: '欧阳询楷书代表作，法度严谨',
        background: '唐太宗贞观六年（632年），欧阳询为九成宫醴泉撰写的铭文',
        features: '结构严谨，笔力险峻，点画精到，被誉为楷书之极则',
        status: '是唐代楷书的典范，对后世楷书发展影响深远'
      },
      {
        id: 4,
        name: '寒食帖',
        author: '苏轼',
        period: '北宋',
        category: 'calligraphy',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/hanshi.jpg',
        description: '苏轼行书代表作，情感细腻',
        background: '宋神宗元丰五年（1082年），苏轼被贬黄州时所作',
        features: '笔意奔放，结体跌宕，情感真挚，自然天成',
        status: '被后世誉为"天下第三行书"，是宋代书法的代表作'
      },
      // 国画作品
      {
        id: 5,
        name: '千里江山图',
        author: '王希孟',
        period: '北宋',
        category: 'painting',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/qianli.jpg',
        description: '王希孟的传世名作，展现祖国大好河山',
        background: '北宋徽宗政和年间（1111-1118年），王希孟在宋徽宗指导下创作',
        features: '构图宏大，色彩艳丽，笔法精细，意境深远',
        status: '中国青绿山水画的巅峰之作，展现了北宋时期的绘画成就'
      },
      {
        id: 6,
        name: '清明上河图',
        author: '张择端',
        period: '北宋',
        category: 'painting',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/qingming.jpg',
        description: '描绘北宋都城汴京的繁华景象',
        background: '北宋徽宗时期，张择端创作的风俗画长卷',
        features: '构图严谨，人物众多，细节丰富，是研究北宋社会的重要史料',
        status: '中国古代风俗画的杰作，具有极高的历史和艺术价值'
      },
      {
        id: 7,
        name: '富春山居图',
        author: '黄公望',
        period: '元代',
        category: 'painting',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/fuchun.jpg',
        description: '黄公望晚年代表作，展现富春江山水之美',
        background: '元代至正年间（1341-1368年），黄公望为无用师所绘',
        features: '笔法简练，意境悠远，水墨淋漓，体现了文人画的最高境界',
        status: '元代山水画的代表作，对后世山水画发展影响深远'
      },
      {
        id: 8,
        name: '洛神赋图',
        author: '顾恺之',
        period: '东晋',
        category: 'painting',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/luoshen.jpg',
        description: '顾恺之根据曹植《洛神赋》创作的名画',
        background: '东晋时期，顾恺之根据曹植的《洛神赋》创作',
        features: '人物描绘细腻，线条流畅，意境优美，体现了魏晋时期的绘画风格',
        status: '中国古代人物画的杰作，对后世人物画发展产生深远影响'
      }
    ],
    filteredArtworks: []
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '传世书画赏析' });
    this.setData({
      filteredArtworks: this.data.artworks
    });
  },

  // 切换分类
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ activeCategory: categoryId });
    
    if (categoryId === 'all') {
      this.setData({ filteredArtworks: this.data.artworks });
    } else {
      const filtered = this.data.artworks.filter(artwork => artwork.category === categoryId);
      this.setData({ filteredArtworks: filtered });
    }
  },

  // 查看作品详情
  viewArtworkDetail(e) {
    const artworkId = e.currentTarget.dataset.id;
    const artwork = this.data.artworks.find(item => item.id === artworkId);
    
    if (artwork) {
      // 跳转到作品详情页
      wx.navigateTo({
        url: `/shuhua/shuhua/pages/artwork-detail/artwork-detail`,
        success: (res) => {
          // 通过eventChannel传递数据
          res.eventChannel.emit('artworkData', artwork);
        }
      });
    }
  }
});