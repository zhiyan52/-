Page({
  data: {
    userInfo: {
      name: '用户',
      avatar: '',
      totalScore: 0,
      winCount: 0,
      dailyStreak: 0
    },
    dailyChallenge: {
      completed: false,
      reward: 50
    },
    onlineCount: 128,
    leaderboard: [
      {
        name: '古建达人',
        avatar: 'https://picsum.photos/80/80?random=1',
        score: 5280
      },
      {
        name: '非遗守护者',
        avatar: 'https://picsum.photos/80/80?random=2',
        score: 4850
      },
      {
        name: '典藏专家',
        avatar: 'https://picsum.photos/80/80?random=3',
        score: 4320
      },
      {
        name: '民俗爱好者',
        avatar: 'https://picsum.photos/80/80?random=4',
        score: 3890
      },
      {
        name: '书法大师',
        avatar: 'https://picsum.photos/80/80?random=5',
        score: 3560
      }
    ],
    historyList: [
      {
        id: 1,
        type: 'daily',
        score: 45,
        status: 'completed',
        time: '今天 14:30'
      },
      {
        id: 2,
        type: 'battle',
        score: 80,
        status: 'win',
        time: '昨天 16:20'
      },
      {
        id: 3,
        type: 'daily',
        score: 50,
        status: 'completed',
        time: '前天 10:15'
      }
    ]
  },

  onLoad: function (options) {
    this.loadUserData();
    this.checkDailyChallenge();
  },

  onShow: function () {
    this.loadUserData();
  },

  loadUserData: function () {
    const userInfo = wx.getStorageSync('user_competition_info') || {
      name: '用户',
      avatar: '',
      totalScore: 0,
      winCount: 0,
      dailyStreak: 0
    };
    this.setData({
      userInfo: userInfo
    });
  },

  checkDailyChallenge: function () {
    const today = new Date().toDateString();
    const lastDate = wx.getStorageSync('last_daily_date');

    if (lastDate === today) {
      this.setData({
        'dailyChallenge.completed': true
      });
    }
  },

  goToDailyChallenge: function () {
    const today = new Date().toDateString();
    const lastDate = wx.getStorageSync('last_daily_date');

    if (lastDate === today) {
      wx.showToast({
        title: '今日挑战已完成',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: '/competition/daily-challenge'
    });
  },

  goToBattle: function () {
    wx.navigateTo({
      url: '/competition/friend-battle'
    });
  },

  viewMoreLeaderboard: function () {
    wx.showToast({
      title: '排行榜功能开发中',
      icon: 'none'
    });
  }
});