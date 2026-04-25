// mingsu/mingsu.js
Page({
  data: {
    modules: [
      {
        id: 'calendar',
        name: '节气图鉴',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/1.jpg',
        desc: '了解二十四节气与传统节日',
        color: '#8B4513'
      },
      {
        id: 'ai-lecture',
        name: 'AI民俗讲堂',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/2.jpg',
        desc: 'AI解读民俗文化内涵',
        color: '#2E8B57'
      },
      {
        id: 'ai-image',
        name: '意境生图',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/3.jpg',
        desc: 'AI生成民俗主题水墨插画',
        color: '#4169E1'
      },
      {
        id: 'quiz',
        name: '知识答题',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/4.jpg',
        desc: '民俗知识小测试',
        color: '#DAA520'
      },
      {
        id: 'card',
        name: '卡片生成',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/3.jpg',
        desc: '生成可保存的民俗卡片',
        color: '#CD5C5C'
      },
      {
        id: 'blind-box',
        name: '风物盲盒',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/6.jpg',
        desc: '每日随机获得民俗知识',
        color: '#9370DB'
      }
    ],
    featuredItems: [
      {
        id: 'spring-festival',
        name: '春节',
        desc: '团圆喜庆，辞旧迎新',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/2.jpg'
      },
      {
        id: 'mid-autumn',
        name: '中秋',
        desc: '赏月吃饼，团圆美满',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/5.jpg'
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
    if (id === 'calendar') {
      wx.navigateTo({
        url: `/mingsu/mingsu/pages/calendar/calendar`
      });
    } else {
      wx.navigateTo({
        url: `/mingsu/pages/${id}/${id}`
      });
    }
  },

  viewFeatured(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/calendar/calendar?featured=${id}`
    });
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · 岁时节令民俗风物',
      path: '/mingsu/mingsu'
    };
  },

  // 导航到智能导览
  navigateToAI() {
    wx.navigateTo({
      url: '/mingsu/mingsu/ai/ai-guide'
    });
  },

  // 导航到文化问答
  navigateToQA() {
    wx.navigateTo({
      url: '/mingsu/mingsu/ai/ai-qa'
    });
  },

  // 导航到个性化推荐
  navigateToRecommend() {
    wx.navigateTo({
      url: '/mingsu/mingsu/ai/ai-recommend'
    });
  },

  // 导航到语音讲解
  navigateToVoice() {
    wx.navigateTo({
      url: '/mingsu/mingsu/ai/ai-voice'
    });
  }
});