// mingsu/mingsu.js
Page({
  data: {
    modules: [
      {
        id: 'calendar',
        name: '节气图鉴',
        icon: '📅',
        desc: '了解二十四节气与传统节日',
        color: '#8B4513'
      },
      {
        id: 'ai-lecture',
        name: 'AI民俗讲堂',
        icon: '🎓',
        desc: 'AI解读民俗文化内涵',
        color: '#2E8B57'
      },
      {
        id: 'ai-image',
        name: '意境生图',
        icon: '🖼️',
        desc: 'AI生成民俗主题水墨插画',
        color: '#4169E1'
      },
      {
        id: 'quiz',
        name: '知识答题',
        icon: '❓',
        desc: '民俗知识小测试',
        color: '#DAA520'
      },
      {
        id: 'card',
        name: '卡片生成',
        icon: '🎴',
        desc: '生成可保存的民俗卡片',
        color: '#CD5C5C'
      },
      {
        id: 'blind-box',
        name: '风物盲盒',
        icon: '🎁',
        desc: '每日随机获得民俗知识',
        color: '#9370DB'
      }
    ],
    featuredItems: [
      {
        id: 'spring-festival',
        name: '春节',
        desc: '团圆喜庆，辞旧迎新',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20Spring%20Festival%20traditional%20scene%20with%20red%20lanterns%20and%20firecrackers%2C%20ink%20painting%20style&image_size=square_hd'
      },
      {
        id: 'mid-autumn',
        name: '中秋',
        desc: '赏月吃饼，团圆美满',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Mid-Autumn%20Festival%20moon%20viewing%20scene%20with%20mooncakes%2C%20ink%20painting%20style&image_size=square_hd'
      },
      {
        id: 'qingming',
        name: '清明',
        desc: '扫墓祭祖，踏青赏春',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Qingming%20Festival%20spring%20outing%20scene%2C%20ink%20painting%20style&image_size=square_hd'
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '岁时节令 · 民俗风物' });
  },

  navigateToModule(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/mingsu/pages/${id}/${id}`
    });
  },

  viewFeatured(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/mingsu/pages/calendar/calendar?featured=${id}`
    });
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · 岁时节令民俗风物',
      path: '/mingsu/mingsu'
    };
  }
});