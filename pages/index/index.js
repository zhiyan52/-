// index.js
Page({
  data: {
    modules: [
      {
        id: 1,
        title: "古建雅韵",
        image: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shouye/gujian (1)(1).png",
        url: "/gujian/gujian/gujian"
      },
      {
        id: 2,
        title: "非遗匠心",
        image: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shouye/feiyi(1)(1).png",
        url: "/pages/feiyi/pages/index/index"
      },
      {
        id: 3,
        title: "典藏拾珠",
        image: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shouye/shuji(1).png",
        url: "/diancang/diancang/diancang"
      },
      {
        id: 4,
        title: "民俗百味",
        image: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shouye/mingsu(1)(1).png",
        url: "/mingsu/mingsu/mingsu"
      },
      {
        id: 5,
        title: "书画雅集",
        image: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shouye/shuhua(1).png",
        url: "/shufa/shufa/shufa"
      }
    ],
    knowledgeContent: "今日小知识：中国古建筑中的斗拱，不仅是承重结构，更是等级与美学的象征。"
  },
  onLoad() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-8glc9jqob91870fc', // 替换为你的云环境ID
        traceUser: true
      });
    }

    // 先加载云图片链接
    this.loadCloudImages().then(() => {
      // 图片链接加载完成后，再加载知识内容
      this.loadDailyKnowledge();
    });
  },

  // 新增：加载云存储图片的临时链接
  loadCloudImages() {
    const { modules } = this.data;
    // 提取所有云文件ID
    const fileIDs = modules.map(item => item.image);

    return new Promise((resolve, reject) => {
      wx.cloud.getTempFileURL({
        fileList: fileIDs,
        success: (res) => {
          // 将返回的临时链接更新到modules数组中
          const updatedModules = modules.map((item, index) => ({
            ...item,
            image: res.fileList[index].tempFileURL
          }));
          this.setData({
            modules: updatedModules
          });
          resolve();
        },
        fail: (err) => {
          console.error("获取云文件链接失败：", err);
          reject(err);
        }
      });
    });
  },
  // 从云数据库加载每日文化小知识
  loadDailyKnowledge() {
    const db = wx.cloud.database();
    db.collection('daily_knowledge').orderBy('date', 'desc').limit(1).get()
      .then(res => {
        if (res.data.length > 0) {
          this.setData({
            knowledgeContent: res.data[0].content
          });
        }
      })
      .catch(err => {
        console.error('加载知识失败', err);
      });
  },

  // 点击模块跳转
  navigateToModule(e) {
    const url = e.currentTarget.dataset.url;
    console.log('点击跳转:', url);

    // 使用 wx.navigateTo 跳转到分包页面
    wx.navigateTo({
      url: url,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '页面加载中，请稍候',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 文化打卡功能
  handleCheckin() {
    const db = wx.cloud.database();
    const _ = db.command;
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
          wx.showToast({ title: '打卡成功' });
          // 更新用户连续打卡天数
          this.updateCheckinStreak();
        }).catch(err => {
          wx.showToast({ title: '打卡失败', icon: 'none' });
        });
      }
    });
  },

  // 更新连续打卡天数
  updateCheckinStreak() {
    // 这里可以实现更复杂的连续打卡逻辑
    console.log('更新打卡天数');
  },

  // 底部导航切换
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === 'modules') {
      wx.switchTab({ url: '/moudeles/modules/modules' });
    } else if (tab === 'profile') {
      wx.switchTab({ url: '/profile/profile/profile' });
    } else if (tab === 'index') {
      wx.switchTab({ url: '/pages/index/index' });
    }
  }
});