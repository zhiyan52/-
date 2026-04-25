 // minsu/minsu/pages/sound-map/sound-map.js

Page({
  data: {
    // 预存谚语（标准版+方言版）
    proverbs: [
      {
        id: 'lichun_1',
        text: '立春一年端，种地早盘算',
        region: '北方',
        recordings: []  // 用户录音文件路径数组
      },
      {
        id: 'yushui_1',
        text: '雨水有雨庄稼好，大春小春一片宝',
        region: '西南',
        recordings: []
      }
      // ...
    ],
    
    recording: false,
    playing: false
  },

  // 开始录音
  startRecord() {
    const recorder = wx.getRecorderManager();
    
    recorder.onStart(() => {
      this.setData({ recording: true });
    });
    
    recorder.onStop((res) => {
      this.setData({ recording: false });
      this.saveRecording(res.tempFilePath);
    });
    
    recorder.start({
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 96000,
      format: 'mp3'
    });
  },

  saveRecording(tempPath) {
    const { currentProverb } = this.data;
    
    // 保存到本地文件
    const fs = wx.getFileSystemManager();
    const savePath = `${wx.env.USER_DATA_PATH}/record_${currentProverb.id}_${Date.now()}.mp3`;
    
    fs.saveFile({
      tempFilePath: tempPath,
      filePath: savePath,
      success: () => {
        // 更新记录
        const proverbs = this.data.proverbs.map(p => {
          if (p.id === currentProverb.id) {
            return { ...p, recordings: [...p.recordings, savePath] };
          }
          return p;
        });
        
        this.setData({ proverbs });
        wx.setStorageSync('sound_recordings', proverbs);
        
        wx.showToast({ title: '录制成功', icon: 'success' });
      }
    });
  },

  // 播放录音
  playRecording(e) {
    const { path } = e.currentTarget.dataset;
    
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = path;
    innerAudioContext.play();
    
    this.setData({ playing: true });
    
    innerAudioContext.onEnded(() => {
      this.setData({ playing: false });
    });
  },

  // 生成个人声音地图（可视化）
  renderMap() {
    const recordings = this.data.proverbs.filter(p => p.recordings.length > 0);
    
    // 按地域聚合
    const byRegion = {};
    recordings.forEach(p => {
      if (!byRegion[p.region]) byRegion[p.region] = [];
      byRegion[p.region].push(p);
    });
    
    this.setData({ 
      myMap: Object.entries(byRegion).map(([region, items]) => ({
        region,
        count: items.length,
        items
      }))
    });
  }
});