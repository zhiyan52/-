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
    const db = wx.cloud.database();
    const openid = getApp().globalData.openid;

    if (!openid) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    // 读取用户打卡记录
    db.collection('user_checkin')
      .where({ openid: openid })
      .orderBy('date', 'desc')
      .get()
      .then(res => {
        const checkinRecords = res.data;
        const totalDays = checkinRecords.length;
        const streakDays = this.calculateStreakDays(checkinRecords);
        const totalPoints = totalDays * 10; // 假设每天打卡10积分

        // 更新奖励状态
        const rewards = [
          {
            id: 1,
            title: '初露锋芒',
            desc: '连续打卡7天',
            icon: '🏅',
            achieved: streakDays >= 7
          },
          {
            id: 2,
            title: '文化达人',
            desc: '连续打卡30天',
            icon: '🎖️',
            achieved: streakDays >= 30
          },
          {
            id: 3,
            title: '传承使者',
            desc: '连续打卡60天',
            icon: '🌟',
            achieved: streakDays >= 60
          },
          {
            id: 4,
            title: '文化守护者',
            desc: '连续打卡100天',
            icon: '👑',
            achieved: streakDays >= 100
          }
        ];

        this.setData({
          checkinData: {
            totalDays: totalDays,
            streakDays: streakDays,
            totalPoints: totalPoints
          },
          rewards: rewards
        });

        // 检查今日是否已打卡
        this.checkTodayStatus();
      })
      .catch(err => {
        console.error('读取打卡记录失败:', err);
        // 失败时使用默认数据
        this.setData({
          checkinData: {
            totalDays: 0,
            streakDays: 0,
            totalPoints: 0
          }
        });
      });
  },

  calculateStreakDays(checkinRecords) {
    if (checkinRecords.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < checkinRecords.length; i++) {
      const checkinDate = new Date(checkinRecords[i].date);
      checkinDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - streak);

      if (checkinDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  },

  checkTodayStatus() {
    const db = wx.cloud.database();
    const openid = getApp().globalData.openid;
    const today = new Date().toDateString();

    if (openid) {
      db.collection('user_checkin').where({
        openid: openid,
        date: today
      }).get().then(res => {
        this.setData({ hasCheckedInToday: res.data.length > 0 });
      }).catch(err => {
        console.error('检查今日打卡状态失败:', err);
        this.setData({ hasCheckedInToday: false });
      });
    } else {
      this.setData({ hasCheckedInToday: false });
    }
  },

  generateCalendar() {
    const year = this.data.currentYear;
    const month = this.data.currentMonth;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const calendarDays = [];

    // 获取用户打卡记录
    const db = wx.cloud.database();
    const openid = getApp().globalData.openid;
    let checkinDates = [];

    if (openid) {
      // 读取当月的打卡记录
      const startDate = new Date(year, month - 1, 1).toDateString();
      const endDate = new Date(year, month, 0).toDateString();

      db.collection('user_checkin')
        .where({
          openid: openid,
          date: db.command.gte(startDate),
          date: db.command.lte(endDate)
        })
        .get()
        .then(res => {
          checkinDates = res.data.map(item => item.date);
          this.generateCalendarWithData(year, month, daysInMonth, firstDayOfMonth, checkinDates);
        })
        .catch(err => {
          console.error('读取打卡记录失败:', err);
          this.generateCalendarWithData(year, month, daysInMonth, firstDayOfMonth, []);
        });
    } else {
      this.generateCalendarWithData(year, month, daysInMonth, firstDayOfMonth, []);
    }
  },

  generateCalendarWithData(year, month, daysInMonth, firstDayOfMonth, checkinDates) {
    const calendarDays = [];

    // 添加上个月的日期
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = new Date(year, month - 1, -i).getDate();
      const dateStr = new Date(year, month - 1, -i).toDateString();
      calendarDays.push({
        day: day,
        month: month - 1,
        year: year,
        status: 'other-month'
      });
    }

    // 添加当月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = new Date(year, month - 1, i).toDateString();
      const isChecked = checkinDates.includes(dateStr);
      const isToday = dateStr === new Date().toDateString();

      let status = 'unchecked';
      if (isChecked) {
        status = 'checked';
      } else if (isToday) {
        status = 'today';
      }

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
    const openid = getApp().globalData.openid;
    const today = new Date().toDateString();

    if (!openid) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }

    // 检查今日是否已打卡
    db.collection('user_checkin').where({
      openid: openid,
      date: today
    }).get().then(res => {
      if (res.data.length > 0) {
        wx.showToast({ title: '今日已打卡', icon: 'none' });
      } else {
        // 新增打卡记录
        db.collection('user_checkin').add({
          data: {
            openid: openid,
            date: today,
            createTime: db.serverDate()
          }
        }).then(() => {
          this.setData({
            hasCheckedInToday: true,
            rewardPoints: 10,
            showSuccessModal: true
          });
          // 更新连续打卡天数和其他数据
          this.updateCheckinStreak();
        }).catch(err => {
          console.error('打卡失败:', err);
          wx.showToast({ title: '打卡失败，请重试', icon: 'none' });
        });
      }
    }).catch(err => {
      console.error('检查打卡状态失败:', err);
      wx.showToast({ title: '操作失败，请重试', icon: 'none' });
    });
  },

  updateCheckinStreak() {
    const db = wx.cloud.database();
    const openid = getApp().globalData.openid;

    // 重新读取打卡记录并计算连续打卡天数
    db.collection('user_checkin')
      .where({ openid: openid })
      .orderBy('date', 'desc')
      .get()
      .then(res => {
        const checkinRecords = res.data;
        const totalDays = checkinRecords.length;
        const streakDays = this.calculateStreakDays(checkinRecords);
        const totalPoints = totalDays * 10;

        // 更新奖励状态
        const rewards = [
          {
            id: 1,
            title: '初露锋芒',
            desc: '连续打卡7天',
            icon: '🏅',
            achieved: streakDays >= 7
          },
          {
            id: 2,
            title: '文化达人',
            desc: '连续打卡30天',
            icon: '🎖️',
            achieved: streakDays >= 30
          },
          {
            id: 3,
            title: '传承使者',
            desc: '连续打卡60天',
            icon: '🌟',
            achieved: streakDays >= 60
          },
          {
            id: 4,
            title: '文化守护者',
            desc: '连续打卡100天',
            icon: '👑',
            achieved: streakDays >= 100
          }
        ];

        this.setData({
          checkinData: {
            totalDays: totalDays,
            streakDays: streakDays,
            totalPoints: totalPoints
          },
          rewards: rewards
        });

        // 重新生成日历
        this.generateCalendar();
      })
      .catch(err => {
        console.error('更新连续打卡天数失败:', err);
      });
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
