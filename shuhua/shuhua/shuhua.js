// pages/shuhua/shuhua.js
Page({
  data: {
    // 轮播图数据 - 使用云存储
    bannerList: [
      {
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/lunbo1.jpg'
      },
      {
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/home/lunbo2.jpg'
      }
    ],
    // 功能模块数据
    modules: [
      { id: 'masters', name: '书画名家图鉴', icon: '👨‍🎨', desc: '了解历代书画名家' },
      { id: 'artworks', name: '传世书画赏析', icon: '🖼️', desc: '欣赏经典传世作品' },
      { id: 'ai-lecture', name: 'AI智能讲解', icon: '🎓', desc: 'AI解析书画艺术' },
      { id: 'ai-image', name: 'AI意境生图', icon: '🎨', desc: '生成书画风格作品' },
      { id: 'calligraphy', name: '书法字体科普', icon: '✍️', desc: '五大书体知识' },
      { id: 'quiz', name: '书画知识答题', icon: '❓', desc: '测试书画知识' },
      { id: 'cards', name: '书画佳句卡片', icon: '🎴', desc: '生成可保存卡片' },
      { id: 'blind-box', name: '书画盲盒', icon: '🎁', desc: '每日一赏' }
    ],
    // 精选书画数据
    featuredArtworks: [
      {
        id: 1,
        name: '富春山居图',
        author: '黄公望 · 元代',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/fuchun.jpg'
      },
      {
        id: 2,
        name: '千里江山图',
        author: '王希孟 · 北宋',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/qianli.jpg'
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '书画雅韵' });
  },

  // 导航到功能模块
  navigateToModule(e) {
    const { id } = e.currentTarget.dataset;

    // 模块路径映射
    const modulePathMap = {
      'masters': '/shuhua/shuhua/pages/masters/masters',
      'artworks': '/shuhua/shuhua/pages/artworks/artworks',
      'ai-lecture': '/shuhua/shuhua/pages/ai-lecture/ai-lecture',
      'ai-image': '/shuhua/shuhua/pages/ai-image/ai-image',
      'calligraphy': '/shuhua/shuhua/pages/calligraphy/calligraphy',
      'quiz': '/shuhua/shuhua/pages/quiz/quiz',
      'cards': '/shuhua/shuhua/pages/cards/cards',
      'blind-box': '/shuhua/shuhua/pages/blind-box/blind-box'
    };

    const targetUrl = modulePathMap[id];
    if (targetUrl) {
      wx.navigateTo({
        url: targetUrl
      });
    } else {
      wx.showToast({
        title: '该功能暂未开放',
        icon: 'none'
      });
    }
  },

  // 查看精选书画详情
  viewArtworkDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/shuhua/shuhua/pages/artwork-detail/artwork-detail?id=${id}`
    });
  }
});