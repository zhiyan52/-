// mingsu/mingsu/pages/checkin/checkin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkinStatus: false, // 是否已打卡
    checkinDays: 5, // 连续打卡天数
    totalPoints: 120, // 总积分
    todayTask: {
      id: 1,
      title: '浏览3篇民俗美食文化文章',
      points: 20,
      completed: false
    },
    tasks: [
      {
        id: 1,
        title: '浏览3篇民俗美食文化文章',
        points: 20,
        completed: false
      },
      {
        id: 2,
        title: '收藏1篇文化科普内容',
        points: 10,
        completed: true
      },
      {
        id: 3,
        title: '分享1次文化内容',
        points: 15,
        completed: true
      },
      {
        id: 4,
        title: '查看1个3D食器模型',
        points: 25,
        completed: false
      }
    ],
    certificates: [
      {
        id: 1,
        name: '民俗文化初学者',
        desc: '连续打卡3天',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20culture%20certificate%20beginner%20level&image_size=square'
      },
      {
        id: 2,
        name: '民俗文化爱好者',
        desc: '连续打卡7天',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20culture%20certificate%20enthusiast%20level&image_size=square'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '文化打卡'
    });
    this.loadCheckinData();
  },

  /**
   * 加载打卡数据
   */
  loadCheckinData() {
    // 这里可以从本地存储或云数据库加载打卡数据
    // 目前使用模拟数据
  },

  /**
   * 执行打卡
   */
  doCheckin() {
    if (this.data.checkinStatus) {
      wx.showToast({
        title: '今日已打卡',
        icon: 'info'
      });
      return;
    }
    
    // 模拟打卡过程
    this.setData({
      checkinStatus: true,
      checkinDays: this.data.checkinDays + 1,
      totalPoints: this.data.totalPoints + 10
    });
    
    wx.showToast({
      title: '打卡成功！获得10积分',
      icon: 'success'
    });
  },

  /**
   * 完成任务
   */
  completeTask(e) {
    const taskId = e.currentTarget.dataset.id;
    const tasks = this.data.tasks.map(task => {
      if (task.id == taskId && !task.completed) {
        return {
          ...task,
          completed: true
        };
      }
      return task;
    });
    
    this.setData({ tasks });
    
    // 计算新增积分
    const completedTask = this.data.tasks.find(task => task.id == taskId);
    if (completedTask) {
      this.setData({
        totalPoints: this.data.totalPoints + completedTask.points
      });
      
      wx.showToast({
        title: `任务完成！获得${completedTask.points}积分`,
        icon: 'success'
      });
    }
  },

  /**
   * 生成证书
   */
  generateCertificate() {
    wx.showToast({
      title: '证书生成中...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      wx.showToast({
        title: '证书生成成功！',
        icon: 'success'
      });
      
      // 模拟生成证书
      const newCertificate = {
        id: this.data.certificates.length + 1,
        name: '民俗文化专家',
        desc: '连续打卡14天',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20culture%20certificate%20expert%20level&image_size=square'
      };
      
      this.setData({
        certificates: [...this.data.certificates, newCertificate]
      });
    }, 1000);
  },

  /**
   * 保存证书到本地
   */
  saveCertificate(e) {
    const certificateId = e.currentTarget.dataset.id;
    const certificate = this.data.certificates.find(c => c.id == certificateId);
    
    if (certificate) {
      wx.showToast({
        title: '证书保存中...',
        icon: 'loading'
      });
      
      setTimeout(() => {
        wx.showToast({
          title: '证书已保存到本地',
          icon: 'success'
        });
      }, 1000);
    }
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})