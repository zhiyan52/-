// AI书画智能讲解页面逻辑
Page({
  data: {
    // 作品数据
    works: [
      {
        id: 1,
        name: '兰亭集序',
        author: '王羲之',
        category: 'calligraphy',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/a36cf1e13b99529317da1fd145ed6e9c.jpg'
      },
      {
        id: 2,
        name: '祭侄文稿',
        author: '颜真卿',
        category: 'calligraphy',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/4a098e160e5ab5333cd7157c547e3026.jpg'
      },
      {
        id: 3,
        name: '千里江山图',
        author: '王希孟',
        category: 'painting',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/d7827934cc3206ee4198aac41ea76210.jpg'
      },
      {
        id: 4,
        name: '富春山居图',
        author: '黄公望',
        category: 'painting',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/8ed7f2d71f9023183b8ecca26a6e2e6b.png'
      }
    ],
    selectedWork: null,
    explanation: null,
    isLoading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'AI书画智能讲解' });
  },

  // 选择作品
  selectWork(e) {
    const workId = e.currentTarget.dataset.id;
    this.setData({
      selectedWork: workId,
      explanation: null
    });
  },

  // 获取AI讲解
  getExplanation() {
    if (!this.data.selectedWork) {
      wx.showToast({ title: '请选择一个作品', icon: 'none' });
      return;
    }

    this.setData({ isLoading: true, explanation: null });

    (async () => {
      try {
        const selectedWork = this.data.works.find(work => work.id === this.data.selectedWork);
        const { name, author } = selectedWork;

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
              content: `请详细解析${name}（作者：${author}），包括：1. 作品背景与作者介绍 2. 笔墨技法与章法布局 3. 艺术风格与文化内涵 4. 后世影响与地位`
            }
          ]
        });

        const explanation = res.choices[0].message.content;
        this.setData({ explanation });

      } catch (err) {
        console.error("AI调用失败：", err);
        wx.showToast({ title: "AI调用失败，请重试", icon: "none" });
      } finally {
        this.setData({ isLoading: false });
      }
    })();
  }
});