// 作品详情页逻辑
Page({
  data: {
    artwork: {},
    aiExplanation: null,
    isLoading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '作品详情' });
    
    // 接收从列表页传递的作品数据
    const eventChannel = this.getOpenerEventChannel();
    if (eventChannel) {
      eventChannel.on('artworkData', (data) => {
        this.setData({ artwork: data });
      });
    }
  },

  // 获取AI讲解
  getAIExplanation() {
    if (!this.data.artwork.name) return;
    
    this.setData({ isLoading: true });
    
    (async () => {
      try {
        const artworkName = this.data.artwork.name;
        const author = this.data.artwork.author;
        
        // 创建模型实例
        const model = wx.cloud.extend.AI.createModel("hunyuan-exp");

        // 发送请求
        const res = await model.generateText({
          model: "hunyuan-turbos-latest",
          messages: [
            {
              role: "system",
              content: "你是一位中国书画艺术专家，精通书法和国画。请详细解析书画作品，包括作品背景、作者介绍、笔墨技法、章法布局、艺术风格、文化内涵以及后世影响与地位。回答要专业、详细，语言优雅，符合古风风格。"
            },
            {
              role: "user",
              content: `请详细解析${artworkName}（作者：${author}），包括：1. 作品背景与作者介绍 2. 笔墨技法与章法布局 3. 艺术风格与文化内涵 4. 后世影响与地位`
            }
          ]
        });

        const explanation = res.choices[0].message.content;
        this.setData({ aiExplanation: explanation });
        
        // 显示AI讲解
        wx.showModal({
          title: 'AI智能讲解',
          content: explanation,
          showCancel: false,
          confirmText: '关闭'
        });

      } catch (err) {
        console.error("AI调用失败：", err);
        wx.showToast({ title: "AI调用失败，请重试", icon: "none" });
      } finally {
        this.setData({ isLoading: false });
      }
    })();
  }
});