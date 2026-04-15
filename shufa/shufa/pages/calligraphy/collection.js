// 书画雅集个人中心页面
Page({
  data: {
    userInfo: {},
    userData: {
      level: 1,
      score: 220,
      checkinDays: 12,
      viewCount: 120,
      collectionCount: 30,
      commentCount: 20,
      achievementCount: 8
    },
    isCheckedIn: false,
    checkinReward: 10,
    rankingList: [
      {
        nickName: '王羲之',
        avatarUrl: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7065908c8ee948baf94da92d8a23159b.jpg?sign=fae9cc6170a0966ad9e67cb9104a82d6&t=1776081395',
        score: 1500
      },
      {
        nickName: '欧阳询',
        avatarUrl: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8073854ce4abb2a62478f7eca5623b3c.jpg?sign=c46abe46bd3e26f21eb1cd2ac92bde48&t=1776083335',
        score: 1200
      },
      {
        nickName: '颜真卿',
        avatarUrl: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0abbae0ad05c709849293bd13c4c0894.jpg?sign=40977ddc11fb10ff500443f914620668&t=1776083386',
        score: 1000
      },
      {
        nickName: '苏轼',
        avatarUrl: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/126b1da9afddfe563a07eb03c7563236.jpg?sign=bffef9d23d0c2c6189de6cba6fb0e552&t=1776084279',
        score: 800
      },
      {
        nickName: '米芾',
        avatarUrl: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/35752300ca0960d14a485a25aaf02ce2.jpg?sign=0c13e666d9cb3a5ea74b6c4ef42b7c8b&t=1776084358',
        score: 600
      }
    ],
    learningStats: {
      totalDays: 156,
      continuousDays: 32,
      totalCopybooks: 48,
      totalCreations: 23
    },
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
    quizCompleted: false,
    completedTasks: 0,
    totalTasks: 5,
    taskList: [
      {
        id: 1,
        icon: '✍️',
        title: '浏览书画作品',
        desc: '浏览3个书画作品详情页',
        current: 2,
        target: 3,
        reward: 10,
        completed: false
      },
      {
        id: 2,
        icon: '⭐',
        title: '收藏书画',
        desc: '收藏2个书画作品',
        current: 1,
        target: 2,
        reward: 15,
        completed: false
      },
      {
        id: 3,
        icon: '💬',
        title: '发表评论',
        desc: '发表1条评论',
        current: 1,
        target: 1,
        reward: 10,
        completed: true
      },
      {
        id: 4,
        icon: '🎯',
        title: '完成答题',
        desc: '完成每日答题',
        current: 0,
        target: 1,
        reward: 15,
        completed: false
      },
      {
        id: 5,
        icon: '📸',
        title: '分享书画',
        desc: '分享1个书画作品给好友',
        current: 0,
        target: 1,
        reward: 20,
        completed: false
      }
    ]
  },

  onLoad() {
    this.loadUserData();
    this.checkTodayCheckin();
    this.loadTaskProgress();
  },

  loadUserData() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    const userData = wx.getStorageSync('userDataShufa') || {
      level: 1,
      score: 220,
      checkinDays: 12,
      viewCount: 120,
      collectionCount: 30,
      commentCount: 20,
      achievementCount: 8
    };
    this.setData({
      userInfo: userInfo,
      userData: userData
    });
  },

  checkTodayCheckin() {
    const lastCheckin = wx.getStorageSync('lastCheckinShufa');
    const today = new Date().toDateString();
    this.setData({
      isCheckedIn: lastCheckin === today
    });
  },

  loadTaskProgress() {
    const completedTasks = this.data.taskList.filter(task => task.completed).length;
    this.setData({
      completedTasks: completedTasks
    });
  },

  checkin() {
    if (this.data.isCheckedIn) {
      wx.showToast({
        title: '今日已签到',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '签到中...'
    });
    setTimeout(() => {
      wx.setStorageSync('lastCheckinShufa', new Date().toDateString());
      const userData = this.data.userData;
      userData.checkinDays += 1;
      userData.score += this.data.checkinReward;
      wx.setStorageSync('userDataShufa', userData);
      this.setData({
        isCheckedIn: true,
        userData: userData
      });
      wx.hideLoading();
      wx.showToast({
        title: `签到成功，获得 ${this.data.checkinReward} 积分`,
        icon: 'success'
      });
    }, 1000);
  },

  refreshRanking() {
    wx.showLoading({
      title: '刷新中...'
    });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '排行榜已更新',
        icon: 'success'
      });
    }, 1000);
  },

  viewMoreData() {
    wx.showToast({
      title: '查看更多数据功能开发中',
      icon: 'none'
    });
  },

  startQuiz() {
    if (this.data.quizCompleted) {
      wx.showToast({ title: '今日答题已完成', icon: 'none' });
      return;
    }
    wx.showToast({ title: '答题功能开发中', icon: 'none' });
  },

  startChallenge() {
    wx.showToast({ title: '挑战赛功能开发中', icon: 'none' });
  },

  startGuess() {
    wx.showToast({ title: '看图识别功能开发中', icon: 'none' });
  },

  viewMoreGames() {
    wx.showToast({ title: '更多游戏功能开发中', icon: 'none' });
  },

  claimTaskReward(e) {
    const taskId = e.currentTarget.dataset.id;
    const taskList = this.data.taskList;
    const task = taskList.find(t => t.id === taskId);
    
    if (!task) {
      wx.showToast({ title: '任务不存在', icon: 'none' });
      return;
    }
    
    if (task.completed) {
      wx.showToast({ title: '奖励已领取', icon: 'none' });
      return;
    }
    
    if (task.current < task.target) {
      wx.showToast({ title: '任务未完成', icon: 'none' });
      return;
    }
    
    wx.showLoading({ title: '领取奖励...' });
    
    setTimeout(() => {
      const userData = this.data.userData;
      userData.score += task.reward;
      task.completed = true;
      
      const completedTasks = taskList.filter(t => t.completed).length;
      
      this.setData({
        taskList: taskList,
        userData: userData,
        completedTasks: completedTasks
      });
      
      wx.hideLoading();
      wx.showToast({ title: `获得 ${task.reward} 积分`, icon: 'success' });
    }, 500);
  },

  backToMainProfile() {
    wx.navigateTo({
      url: '/profile/profile/profile',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
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

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '书画雅集个人中心',
      path: '/shufa/shufa/pages/calligraphy/collection',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20collection%20treasure&image_size=landscape_16_9'
    };
  }
});
