// mingsu/mingsu/pages/3d-model/3d-model.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelName: '传统提梁食盒',
    isPlaying: false,
    modelStatus: '完整', // 完整、拆解中、已拆解
    annotations: [
      {
        id: 1,
        name: '提梁',
        desc: '用于提拿食盒，采用优质木材制作，造型优美',
        position: 'top'
      },
      {
        id: 2,
        name: '盒盖',
        desc: '保护食物，防止灰尘和异味进入',
        position: 'center'
      },
      {
        id: 3,
        name: '盒身',
        desc: '存放食物的主体部分，内部有多层隔板',
        position: 'bottom'
      }
    ],
    currentAnnotation: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '3D食器查看'
    });
    this.init3DModel();
  },

  /**
   * 初始化3D模型
   */
  init3DModel() {
    // 这里可以初始化Three.js场景
    // 由于是模拟环境，这里只做简单的状态管理
    console.log('初始化3D模型');
  },

  /**
   * 播放/暂停拆解动画
   */
  toggleAnimation() {
    const isPlaying = !this.data.isPlaying;
    this.setData({ isPlaying });
    
    if (isPlaying) {
      this.startAnimation();
    } else {
      this.pauseAnimation();
    }
  },

  /**
   * 开始动画
   */
  startAnimation() {
    console.log('开始拆解动画');
    // 模拟动画过程
    setTimeout(() => {
      this.setData({ modelStatus: '拆解中' });
    }, 1000);
    
    setTimeout(() => {
      this.setData({ modelStatus: '已拆解' });
      this.setData({ isPlaying: false });
    }, 5000);
  },

  /**
   * 暂停动画
   */
  pauseAnimation() {
    console.log('暂停拆解动画');
  },

  /**
   * 重置模型
   */
  resetModel() {
    console.log('重置模型');
    this.setData({ 
      modelStatus: '完整',
      isPlaying: false
    });
  },

  /**
   * 显示注解
   */
  showAnnotation(e) {
    const annotationId = e.currentTarget.dataset.id;
    const annotation = this.data.annotations.find(a => a.id == annotationId);
    this.setData({ currentAnnotation: annotation });
  },

  /**
   * 隐藏注解
   */
  hideAnnotation() {
    this.setData({ currentAnnotation: null });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 分享
   */
  share() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  }
})