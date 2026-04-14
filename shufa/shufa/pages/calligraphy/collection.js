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
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7065908c8ee948baf94da92d8a23159b.jpg?sign=fae9cc6170a0966ad9e67cb9104a82d6&t=1776081395',
        lastPractice: '2026-04-04'
      },
      {
        id: 2,
        title: '九成宫醴泉铭',
        author: '欧阳询',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8073854ce4abb2a62478f7eca5623b3c.jpg?sign=c46abe46bd3e26f21eb1cd2ac92bde48&t=1776083335',
        lastPractice: '2026-04-03'
      },
      {
        id: 3,
        title: '多宝塔感应碑',
        author: '颜真卿',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0abbae0ad05c709849293bd13c4c0894.jpg?sign=40977ddc11fb10ff500443f914620668&t=1776083386',
        lastPractice: '2026-04-02'
      }
    ],
    myCreations: [
      {
        id: 1,
        title: '春日偶成',
        style: '行书',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/126b1da9afddfe563a07eb03c7563236.jpg?sign=bffef9d23d0c2c6189de6cba6fb0e552&t=1776084279',
        createTime: '2026-04-04'
      },
      {
        id: 2,
        title: '静夜思',
        style: '楷书',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/35752300ca0960d14a485a25aaf02ce2.jpg?sign=0c13e666d9cb3a5ea74b6c4ef42b7c8b&t=1776084358',
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
