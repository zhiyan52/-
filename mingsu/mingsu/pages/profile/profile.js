// 民俗百味个人中心页面
Page({
  data: {
    userInfo: {},
    userData: {
      level: 1,
      score: 200,
      checkinDays: 10,
      viewCount: 90,
      collectionCount: 25,
      commentCount: 15,
      achievementCount: 6
    },
    isCheckedIn: false,
    checkinReward: 10,
    rankingList: [
      {
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2016&image_size=square',
        nickName: '好友1',
        score: 650
      },
      {
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2017&image_size=square',
        nickName: '好友2',
        score: 600
      },
      {
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2018&image_size=square',
        nickName: '好友3',
        score: 550
      },
      {
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2019&image_size=square',
        nickName: '好友4',
        score: 500
      },
      {
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%2020&image_size=square',
        nickName: '好友5',
        score: 450
      }
    ],
    quizCompleted: false,
    completedTasks: 0,
    totalTasks: 5,
    taskList: [
      {
        id: 1,
        icon: '🍲',
        title: '浏览民俗项目',
        desc: '浏览3个民俗项目详情页',
        current: 2,
        target: 3,
        reward: 10,
        completed: false
      },
      {
        id: 2,
        icon: '⭐',
        title: '收藏民俗',
        desc: '收藏2个民俗项目',
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
        title: '分享民俗',
        desc: '分享1个民俗项目给好友',
        current: 0,
        target: 1,
        reward: 20,
        completed: false
      }
    ]
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '民俗百味个人中心'
    });
    this.checkLoginStatus();
    this.checkCheckinStatus();
    this.loadTaskProgress();
  },

  onShow() {
    this.checkLoginStatus();
    this.loadTaskProgress();
  },

  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
  },

  checkCheckinStatus() {
    const today = new Date().toDateString();
    const lastCheckin = wx.getStorageSync('lastCheckinMingsu');
    if (lastCheckin === today) {
      this.setData({
        isCheckedIn: true
      });
    }
  },

  loadTaskProgress() {
    const completedTasks = this.data.taskList.filter(task => task.completed).length;
    this.setData({
      completedTasks: completedTasks
    });
  },

  checkin() {
    if (this.data.isCheckedIn) {
      wx.showToast({ title: '今日已签到', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '签到中...' });

    setTimeout(() => {
      const today = new Date().toDateString();
      wx.setStorageSync('lastCheckinMingsu', today);

      const userData = this.data.userData;
      userData.checkinDays += 1;
      userData.score += this.data.checkinReward;

      this.setData({
        isCheckedIn: true,
        userData: userData
      });

      wx.hideLoading();
      wx.showToast({ title: `签到成功，获得 ${this.data.checkinReward} 积分`, icon: 'success' });
    }, 1000);
  },

  viewMoreData() {
    wx.showToast({ title: '查看更多数据', icon: 'none' });
  },

  refreshRanking() {
    wx.showLoading({ title: '刷新排行榜...' });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '排行榜已更新', icon: 'success' });
    }, 1000);
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
      url: '/profile/profile/profile'
    });
  }
})