// mingsu/mingsu/pages/encyclopedia/encyclopedia.js
Page({
  data: {
    courses: [
      {
        id: 1,
        title: '中国饮食文化概述',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20food%20culture%20overview&image_size=landscape_16_9',
        duration: '20分钟',
        level: '入门',
        views: 12580
      },
      {
        id: 2,
        title: '二十四节气与饮食',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20solar%20terms%20food%20culture&image_size=landscape_16_9',
        duration: '25分钟',
        level: '中级',
        views: 9876
      },
      {
        id: 3,
        title: '中国传统节日美食',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20festival%20food%20culture&image_size=landscape_16_9',
        duration: '30分钟',
        level: '中级',
        views: 15432
      },
      {
        id: 4,
        title: '中国菜系的形成与发展',
        cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20cuisine%20history&image_size=landscape_16_9',
        duration: '40分钟',
        level: '高级',
        views: 8765
      }
    ],
    articles: [
      {
        id: 1,
        title: '筷子的文化意义',
        summary: '筷子不仅是进食工具，更是中国文化的重要象征',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20chopsticks%20culture&image_size=square',
        date: '2026-03-20'
      },
      {
        id: 2,
        title: '茶文化与中国社会',
        summary: '茶不仅是饮品，更是中国人的生活方式和社交媒介',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20tea%20culture&image_size=square',
        date: '2026-03-15'
      }
    ]
  },

  onLoad() {
    this.loadCourses();
  },

  loadCourses() {
    console.log('加载食文化小课堂数据');
  },

  goToCourseDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/encyclopedia/course-detail?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '文章详情页开发中',
      icon: 'none'
    });
  },

  onShareAppMessage() {
    return {
      title: '食文化小课堂 | 探索中华饮食文化',
      path: '/mingsu/mingsu/pages/encyclopedia/encyclopedia',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20food%20culture%20classroom&image_size=landscape_16_9'
    };
  }
});
