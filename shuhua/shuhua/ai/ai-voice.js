Page({
  data: {
    loading: false,
    voiceContent: null,
    error: null,
    isPlaying: false,
    currentSection: null,
    audioUrl: null,
    currentTime: '00:00',
    duration: '00:00',
    progress: 0
  },

  innerAudioContext: null,

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '语音讲解' });
    this.initAudio();
    this.generateVoiceContent();
  },

  onUnload: function () {
    if (this.innerAudioContext) {
      this.innerAudioContext.stop();
      this.innerAudioContext.destroy();
    }
  },

  initAudio: function () {
    this.innerAudioContext = wx.createInnerAudioContext();

    this.innerAudioContext.onPlay(() => {
      console.log('音频开始播放');
      this.setData({ isPlaying: true });
    });

    this.innerAudioContext.onPause(() => {
      console.log('音频暂停');
      this.setData({ isPlaying: false });
    });

    this.innerAudioContext.onStop(() => {
      console.log('音频停止');
      this.setData({ isPlaying: false, currentTime: '00:00', progress: 0 });
    });

    this.innerAudioContext.onEnded(() => {
      console.log('音频播放结束');
      this.setData({ isPlaying: false, currentTime: '00:00', progress: 0 });
    });

    this.innerAudioContext.onTimeUpdate(() => {
      const currentTime = this.innerAudioContext.currentTime;
      const duration = this.innerAudioContext.duration;
      const progress = (currentTime / duration) * 100;

      this.setData({
        currentTime: this.formatTime(currentTime),
        duration: this.formatTime(duration),
        progress: progress
      });
    });

    this.innerAudioContext.onError((err) => {
      console.error('音频播放错误:', err);
      wx.showToast({ title: '音频播放失败', icon: 'none' });
      this.setData({ isPlaying: false });
    });
  },

  formatTime: function (seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  generateVoiceContent: function () {
    this.setData({ loading: true, error: null });

    setTimeout(() => {
      const voiceContent = {
        title: '书画艺术语音讲解',
        sections: [
          {
            id: 1,
            title: '书法艺术概述',
            content: '书法是中国特有的传统艺术形式，它不仅是文字的书写方法，更是一种表达情感、展现个性的艺术。书法的发展经历了篆书、隶书、楷书、行书、草书等多个阶段，每个阶段都有其独特的艺术风格和代表作品。',
            audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270834321777250072202760265.mp3',
             
          },
          {
            id: 2,
            title: '国画艺术特点',
            content: '国画注重意境表达，强调笔墨情趣，追求形神兼备。与西方绘画不同，国画更注重主观感受的表达，通过简练的笔墨和巧妙的构图，传达出丰富的情感和深刻的哲理。',
            audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270836201777250180431176606.mp3',
            duration:  
          },
          {
            id: 3,
            title: '书画鉴赏方法',
            content: '鉴赏书画作品时，应从笔墨技法、构图布局、意境表达等方面入手。同时，了解作者的生平背景、时代特色以及艺术流派，有助于更全面地理解作品的艺术价值和历史意义。',
            audioUrl: 'https://freeopenapi.hihookeji.com/peiyin_api_voice_to_helper/mp3/user_tts/20260427/202604270845521777250752327928803.mp3',
            
          }
        ]
      };

      this.setData({
        voiceContent: voiceContent,
        loading: false
      });
    }, 1500);
  },

  refreshVoiceContent: function () {
    if (this.innerAudioContext) {
      this.innerAudioContext.stop();
    }
    this.generateVoiceContent();
  },

  playSection: function (e) {
    const sectionId = e.currentTarget.dataset.id;
    const section = this.data.voiceContent.sections.find(s => s.id === sectionId);

    if (!section) return;

    if (this.data.currentSection === sectionId && this.data.isPlaying) {
      this.pauseAudio();
    } else {
      this.setData({ currentSection: sectionId });
      this.playAudio(section.audioUrl);
    }
  },

  playAudio: function (url) {
    if (!url) {
      wx.showToast({ title: '音频地址无效', icon: 'none' });
      return;
    }

    if (this.innerAudioContext) {
      this.innerAudioContext.stop();
      this.innerAudioContext.src = url;
      this.innerAudioContext.play();
    }
  },

  pauseAudio: function () {
    if (this.innerAudioContext) {
      this.innerAudioContext.pause();
    }
  },

  resumeAudio: function () {
    if (this.innerAudioContext) {
      this.innerAudioContext.play();
    }
  },

  stopAudio: function () {
    if (this.innerAudioContext) {
      this.innerAudioContext.stop();
      this.setData({ currentSection: null, currentTime: '00:00', duration: '00:00', progress: 0 });
    }
  },

  togglePlay: function () {
    if (this.data.isPlaying) {
      this.pauseAudio();
    } else {
      if (this.data.currentSection) {
        this.resumeAudio();
      } else {
        const firstSection = this.data.voiceContent.sections[0];
        if (firstSection) {
          this.setData({ currentSection: firstSection.id });
          this.playAudio(firstSection.audioUrl);
        }
      }
    }
  }
});