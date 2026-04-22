// diancang/diancang/ai/ai-voice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recording: false,
    recognizedText: '',
    aiResponse: '',
    loading: false,
    showResponse: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 开始录音
  startRecording() {
    this.setData({
      recording: true,
      recognizedText: '',
      aiResponse: '',
      showResponse: false
    });
    
    wx.showToast({
      title: '文心先生正在倾听...',
      icon: 'none'
    });
    
    // 模拟语音识别
    setTimeout(() => {
      this.setData({
        recording: false,
        recognizedText: '请解释一下《论语》中的仁',
        loading: true
      });
      
      // 模拟AI回复
      setTimeout(() => {
        this.setData({
          aiResponse: '《论语》中，"仁"为核心思想。孔子曰："仁者爱人。" 又曰："克己复礼为仁。" 仁之内涵，包括爱人、忠恕、孝悌等德目。仁者，当推己及人，以仁爱之心对待他人，以礼仪规范约束自己。此乃儒家道德之最高标准，也是为人处世之根本。',
          loading: false,
          showResponse: true
        });
      }, 1500);
    }, 2000);
  },

  // 停止录音
  stopRecording() {
    this.setData({
      recording: false
    });
    wx.showToast({
      title: '录音已停止',
      icon: 'none'
    });
  },

  // 播放AI回复
  playResponse() {
    wx.showToast({
      title: '文心先生正在诵读...',
      icon: 'none'
    });
    
    // 模拟语音播放
    setTimeout(() => {
      wx.showToast({
        title: '播放完成',
        icon: 'none'
      });
    }, 3000);
  },

  // 重新开始
  restart() {
    this.setData({
      recognizedText: '',
      aiResponse: '',
      showResponse: false
    });
  }
})