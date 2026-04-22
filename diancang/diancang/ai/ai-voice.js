// diancang/diancang/ai/ai-voice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentList: [
      { id: 1, title: '《论语》核心思想', description: '深入解析《论语》中的核心思想和文化价值' },
      { id: 2, title: '《诗经》的艺术特色', description: '探讨《诗经》的艺术特色和文学价值' },
      { id: 3, title: '中国书法发展史', description: '梳理中国书法的发展历程和主要流派' },
      { id: 4, title: '传统节日的文化内涵', description: '解读传统节日背后的文化内涵和意义' },
      { id: 5, title: '中国古代科技成就', description: '介绍中国古代的重要科技发明和成就' }
    ],
    selectedContent: 0,
    currentContent: {},
    isPlaying: false,
    currentTime: '00:00',
    duration: '05:00',
    progress: 0,
    volume: 80,
    aiExplanation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 选择讲解内容
  selectContent(e) {
    const contentId = e.currentTarget.dataset.id;
    const selectedContent = this.data.contentList.find(item => item.id === contentId);

    this.setData({
      selectedContent: contentId,
      currentContent: selectedContent,
      isPlaying: false,
      currentTime: '00:00',
      progress: 0
    });

    // 生成AI讲解内容
    this.generateAIExplanation(selectedContent);
  },

  // 生成AI讲解内容
  generateAIExplanation(content) {
    // 模拟AI生成讲解内容
    setTimeout(() => {
      let explanation = '';

      switch (content.id) {
        case 1:
          explanation = '《论语》是儒家学派的经典著作之一，由孔子的弟子及其再传弟子编撰而成。其核心思想是"仁"，强调人与人之间的关爱和尊重。孔子认为，"仁"是道德的最高标准，是做人的根本。《论语》还强调"礼"的重要性，认为通过礼仪规范可以维护社会秩序。此外，《论语》中还包含了许多关于学习、修身、治国等方面的智慧，对中国传统文化产生了深远的影响。';
          break;
        case 2:
          explanation = '《诗经》是中国第一部诗歌总集，收录了西周至春秋时期的诗歌305篇。其艺术特色主要体现在以下几个方面：首先，《诗经》运用了赋、比、兴的表现手法，使诗歌更加生动形象；其次，《诗经》的语言简洁明快，富有音乐性，适合吟唱；再次，《诗经》的内容丰富多样，反映了当时的社会生活、劳动场景和人们的情感世界；最后，《诗经》对后世文学产生了深远的影响，成为中国文学的源头之一。';
          break;
        case 3:
          explanation = '中国书法的发展历程可以追溯到甲骨文时期，经过金文、篆书、隶书、楷书、行书、草书等阶段的演变。每个阶段都有其独特的艺术特色和代表人物。例如，篆书的代表人物有李斯，隶书的代表人物有蔡邕，楷书的代表人物有颜真卿、柳公权等，行书的代表人物有王羲之、苏轼等，草书的代表人物有张旭、怀素等。中国书法不仅是一种文字书写艺术，更是一种文化传承和精神表达。';
          break;
        case 4:
          explanation = '传统节日是中华民族文化的重要组成部分，每个节日都有其独特的文化内涵和意义。例如，春节是中国最重要的传统节日，象征着团圆和新的开始；元宵节象征着家庭团聚和幸福美满；清明节是祭祖和缅怀先人的节日，体现了中国人的孝道观念；端午节是为了纪念屈原，弘扬爱国主义精神；中秋节象征着团圆和丰收，表达了人们对美好生活的向往。';
          break;
        case 5:
          explanation = '中国古代在科技方面取得了许多重要成就，对世界文明的发展做出了巨大贡献。例如，造纸术、印刷术、火药和指南针被称为中国古代的"四大发明"，对人类文明的进步产生了深远的影响。此外，中国古代在天文历法、数学、医学、农学等领域也取得了显著成就。例如，张衡发明的地动仪，祖冲之计算的圆周率，李时珍的《本草纲目》等，都是中国古代科技成就的杰出代表。';
          break;
      }

      this.setData({
        aiExplanation: explanation
      });
    }, 1000);
  },

  // 切换播放/暂停
  togglePlay() {
    if (this.data.isPlaying) {
      // 暂停播放
      clearInterval(this.data.playbackInterval);
      this.setData({
        isPlaying: false
      });
    } else {
      // 开始播放
      this.setData({
        isPlaying: true
      });

      // 模拟播放进度
      let currentTime = 0;
      const totalTime = 300; // 5分钟

      this.data.playbackInterval = setInterval(() => {
        currentTime += 1;
        const progress = (currentTime / totalTime) * 100;
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        const currentTimeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        this.setData({
          progress: progress,
          currentTime: currentTimeStr
        });

        if (currentTime >= totalTime) {
          clearInterval(this.data.playbackInterval);
          this.setData({
            isPlaying: false,
            currentTime: '00:00',
            progress: 0
          });
        }
      }, 1000);
    }
  },

  // 返回
  goBack() {
    wx.navigateBack();
  }
})
