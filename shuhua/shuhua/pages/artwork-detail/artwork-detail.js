// 作品详情页逻辑
Page({
  data: {
    artwork: {},
    aiExplanation: null,
    isLoading: false
  },

  onLoad(options) {
    wx.setNavigationBarTitle({ title: '作品详情' });

    // 接收从列表页传递的作品ID
    if (options && options.id) {
      this.loadArtworkDetail(options.id);
    } else {
      // 尝试通过eventChannel接收数据
      const eventChannel = this.getOpenerEventChannel();
      if (eventChannel) {
        eventChannel.on('artworkData', (data) => {
          this.setData({ artwork: data });
        });
      }
    }
  },

  // 根据ID加载作品详情
  loadArtworkDetail(id) {
    // 模拟作品数据
    const artworks = [
      {
        id: 1,
        name: '富春山居图',
        author: '黄公望 · 元代',
        type: '国画',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/8ed7f2d71f9023183b8ecca26a6e2e6b.png',
        background: '元代至正年间（1341-1368年），黄公望为无用师所绘',
        features: '笔法简练，意境悠远，水墨淋漓，体现了文人画的最高境界',
        status: '元代山水画的代表作，对后世山水画发展影响深远'
      },
      {
        id: 2,
        name: '千里江山图',
        author: '王希孟 · 北宋',
        type: '国画',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/d7827934cc3206ee4198aac41ea76210.jpg',
        background: '北宋政和三年（1113年），年仅18岁的王希孟为宋徽宗绘制',
        features: '青绿山水画的巅峰之作，色彩艳丽而不失典雅',
        status: '中国十大传世名画之一，被誉为"中国古代绘画史上最杰出的作品"'
      }
    ];

    const artwork = artworks.find(item => item.id == id);
    if (artwork) {
      this.setData({ artwork });
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
