// pages/checkin/checkin.js
Page({
  data: {
    checkinData: {
      totalDays: 0,
      streakDays: 0,
      totalPoints: 0
    },
    hasCheckedInToday: false,
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    calendarDays: [],
    tasks: [
      {
        id: 1,
        title: '学习1篇古建知识',
        reward: 10,
        completed: false
      },
      {
        id: 2,
        title: '分享1次文化内容',
        reward: 15,
        completed: false
      },
      {
        id: 3,
        title: '完成1次问答',
        reward: 20,
        completed: false
      },
      {
        id: 4,
        title: '浏览3个文化模块',
        reward: 25,
        completed: false
      }
    ],
    rewards: [
      {
        id: 1,
        title: '初露锋芒',
        desc: '连续打卡7天',
        icon: '🏅',
        achieved: false
      },
      {
        id: 2,
        title: '文化达人',
        desc: '连续打卡30天',
        icon: '🎖️',
        achieved: false
      },
      {
        id: 3,
        title: '传承使者',
        desc: '连续打卡60天',
        icon: '🌟',
        achieved: false
      },
      {
        id: 4,
        title: '文化守护者',
        desc: '连续打卡100天',
        icon: '👑',
        achieved: false
      }
    ],
    showSuccessModal: false,
    rewardPoints: 0
  },

  onLoad() {
    this.initCheckinData();
    this.generateCalendar();
  },

  onShow() {
    this.checkTodayStatus();
  },

  initCheckinData() {
    // 模拟数据
    this.setData({
      checkinData: {
        totalDays: 45,
        streakDays: 7,
        totalPoints: 1250
      },
      rewards: [
        {
          id: 1,
          title: '初露锋芒',
          desc: '连续打卡7天',
          icon: '🏅',
          achieved: true
        },
        {
          id: 2,
          title: '文化达人',
          desc: '连续打卡30天',
          icon: '🎖️',
          achieved: false
        },
        {
          id: 3,
          title: '传承使者',
          desc: '连续打卡60天',
          icon: '🌟',
          achieved: false
        },
        {
          id: 4,
          title: '文化守护者',
          desc: '连续打卡100天',
          icon: '👑',
          achieved: false
        }
      ]
    });
  },

  checkTodayStatus() {
    const today = new Date().toDateString();
    // 模拟检查今日是否已打卡
    this.setData({ hasCheckedInToday: false });
  },

  generateCalendar() {
    const year = this.data.currentYear;
    const month = this.data.currentMonth;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const calendarDays = [];

    // 添加上个月的日期
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = new Date(year, month - 1, -i).getDate();
      calendarDays.push({
        day: day,
        month: month - 1,
        year: year,
        status: 'other-month'
      });
    }

    // 添加当月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      // 模拟打卡状态
      const status = Math.random() > 0.6 ? 'checked' : 'unchecked';
      calendarDays.push({
        day: i,
        month: month,
        year: year,
        status: status
      });
    }

    // 添加下个月的日期
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        month: month + 1,
        year: year,
        status: 'other-month'
      });
    }

    this.setData({ calendarDays: calendarDays });
  },

  prevMonth() {
    if (this.data.currentMonth === 1) {
      this.setData({
        currentYear: this.data.currentYear - 1,
        currentMonth: 12
      });
    } else {
      this.setData({
        currentMonth: this.data.currentMonth - 1
      });
    }
    this.generateCalendar();
  },

  nextMonth() {
    if (this.data.currentMonth === 12) {
      this.setData({
        currentYear: this.data.currentYear + 1,
        currentMonth: 1
      });
    } else {
      this.setData({
        currentMonth: this.data.currentMonth + 1
      });
    }
    this.generateCalendar();
  },

  handleDailyCheckin() {
    const db = wx.cloud.database();
    const today = new Date().toDateString();

    // 检查今日是否已打卡
    db.collection('user_checkin').where({
      openid: getApp().globalData.openid,
      date: today
    }).get().then(res => {
      if (res.data.length > 0) {
        wx.showToast({ title: '今日已打卡', icon: 'none' });
      } else {
        // 新增打卡记录
        db.collection('user_checkin').add({
          data: {
            openid: getApp().globalData.openid,
            date: today,
            createTime: db.serverDate()
          }
        }).then(() => {
          this.setData({
            hasCheckedInToday: true,
            rewardPoints: 10,
            showSuccessModal: true,
            checkinData: {
              ...this.data.checkinData,
              totalDays: this.data.checkinData.totalDays + 1,
              streakDays: this.data.checkinData.streakDays + 1,
              totalPoints: this.data.checkinData.totalPoints + 10
            }
          });
          // 更新连续打卡天数
          this.updateCheckinStreak();
        }).catch(err => {
          wx.showToast({ title: '打卡失败', icon: 'none' });
        });
      }
    });
  },

  updateCheckinStreak() {
    // 实现连续打卡逻辑
    console.log('更新连续打卡天数');
  },

  completeTask(e) {
    const taskId = e.currentTarget.dataset.id;
    const tasks = this.data.tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });

    this.setData({
      tasks: tasks,
      rewardPoints: 15,
      showSuccessModal: true,
      checkinData: {
        ...this.data.checkinData,
        totalPoints: this.data.checkinData.totalPoints + 15
      }
    });
  },

  checkDayDetail(e) {
    const { day, month, year } = e.currentTarget.dataset;
    wx.showToast({
      title: `${year}年${month}月${day}日`,
      icon: 'none'
    });
  },

  goBack() {
    wx.navigateBack();
  },

  goToCertificate() {
    wx.navigateTo({
      url: '/pages/certificate/certificate',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToProfile() {
    wx.navigateTo({
      url: '/profile/profile/profile'
    });
  },

  hideSuccessModal() {
    this.setData({ showSuccessModal: false });
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  onShareAppMessage() {
    return {
      title: '文化打卡 - 每日文化学习',
      path: '/pages/checkin/checkin',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20cultural%20checkin%20calendar%20rewards&image_size=landscape_16_9'
    };
  }
});
