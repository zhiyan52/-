// shufa/shufa/pages/calligraphy/collection.js
Page({
  data: {
    learningStats: {
      totalDays: 156,
      continuousDays: 32,
      totalCopybooks: 48,
      totalCreations: 23
    },
    progressChart: [
      { month: '1月', days: 28 },
      { month: '2月', days: 29 },
      { month: '3月', days: 31 },
      { month: '4月', days: 5 }
    ],
    myCopybooks: [
      {
        id: 1,
        title: '兰亭序',
        author: '王羲之',
        image: '/images/blank.png',
        lastPractice: '2026-04-04'
      },
      {
        id: 2,
        title: '九成宫醴泉铭',
        author: '欧阳询',
        image: '/images/blank.png',
        lastPractice: '2026-04-03'
      },
      {
        id: 3,
        title: '多宝塔感应碑',
        author: '颜真卿',
        image: '/images/blank.png',
        lastPractice: '2026-04-02'
      }
    ],
    myCreations: [
      {
        id: 1,
        title: '春日偶成',
        style: '行书',
        image: '/images/blank.png',
        createTime: '2026-04-04'
      },
      {
        id: 2,
        title: '静夜思',
        style: '楷书',
        image: '/images/blank.png',
        createTime: '2026-04-01'
      }
    ],
    settings: {
      dailyGoal: 30,
      reminderTime: '20:00',
      notificationEnabled: true
    }
  },

  onLoad() {
    this.loadLearningStats();
    this.loadMyCopybooks();
    this.loadMyCreations();
  },

  loadLearningStats() {
    console.log('加载学习统计');
  },

  loadMyCopybooks() {
    console.log('加载我的碑帖');
  },

  loadMyCreations() {
    console.log('加载我的创作');
  },

  goToCopybookDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/shufa/shufa/pages/calligraphy/character?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToCreationDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '创作详情页开发中',
      icon: 'none'
    });
  },

  editSettings() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none'
    });
  },

  exportData() {
    wx.showToast({
      title: '数据导出功能开发中',
      icon: 'none'
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '墨宝阁 | 古雅文轩',
      path: '/shufa/shufa/pages/calligraphy/collection',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20collection%20treasure&image_size=landscape_16_9'
    };
  }
});
