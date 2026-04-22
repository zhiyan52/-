// mingsu/pages/ai-lecture/ai-lecture.js
Page({
  data: {
    selectedTopic: null,
    topics: [
      { id: 'spring-festival', name: '春节' },
      { id: 'lantern-festival', name: '元宵节' },
      { id: 'dragon-boat-festival', name: '端午节' },
      { id: 'mid-autumn', name: '中秋节' },
      { id: 'double-ninth', name: '重阳节' },
      { id: 'qingming', name: '清明节' },
      { id: 'lichun', name: '立春' },
      { id: 'lixia', name: '立夏' },
      { id: 'liqiu', name: '立秋' },
      { id: 'lidong', name: '立冬' }
    ],
    isLoading: false,
    lectureContent: null
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'AI民俗讲堂' });
  },

  selectTopic(e) {
    const { topic } = e.currentTarget.dataset;
    this.setData({ selectedTopic: topic, lectureContent: null });
  },

  getLecture() {
    if (!this.data.selectedTopic) {
      wx.showToast({ title: '请选择一个民俗主题', icon: 'none' });
      return;
    }

    this.setData({ isLoading: true, lectureContent: null });

    (async () => {
      try {
        const topic = this.data.selectedTopic.name;

        // DeepSeek API配置
        const apiKey = "sk-db4358439d684158895f40d0a4612c4a";
        const apiUrl = "https://api.deepseek.com/v1/chat/completions";

        // 发送请求
        const res = await wx.request({
          url: apiUrl,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          data: {
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: "你是一位民俗文化专家，回答要简洁易懂，语言贴合古风，内容围绕中国传统节日和节气的文化内涵展开。请分别从来历与起源、传统习俗、相关古诗词、文化意义四个方面进行回答。"
              },
              {
                role: "user",
                content: `请详细介绍${topic}的文化内涵，包括：1. 来历与起源 2. 传统习俗 3. 相关古诗词 4. 文化意义`
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          },
          success: (res) => {
            console.log("DeepSeek API调用成功：", res);
          },
          fail: (err) => {
            console.error("DeepSeek API调用失败：", err);
          }
        });

        // 处理响应
        if (res.statusCode === 200 && res.data && res.data.choices && res.data.choices.length > 0) {
          const answer = res.data.choices[0].message.content;

          // 解析AI返回的内容，提取四个部分
          const content = this.parseLectureContent(answer, topic);

          this.setData({ lectureContent: content });
        } else {
          throw new Error('API返回格式错误');
        }

      } catch (err) {
        console.error("AI调用失败：", err);
        wx.showToast({ title: "AI调用失败，请重试", icon: "none" });

        // 失败时使用本地备份数据
        this.useLocalBackup(this.data.selectedTopic.name);
      } finally {
        this.setData({ isLoading: false });
      }
    })();
  },

  parseLectureContent(answer, topic) {
    // 尝试从AI回答中提取四个部分
    // 如果解析失败，使用默认格式
    return {
      origin: answer.includes('来历与起源') ? answer.split('来历与起源')[1].split('传统习俗')[0].trim() : `${topic}是中国传统节日之一，有着悠久的历史和丰富的文化内涵。`,
      customs: answer.includes('传统习俗') ? answer.split('传统习俗')[1].split('相关古诗词')[0].trim() : `在${topic}期间，人们会进行各种传统活动，如家庭团聚、吃传统美食、参与民俗活动等。`,
      poems: answer.includes('相关古诗词') ? answer.split('相关古诗词')[1].split('文化意义')[0].trim() : `关于${topic}的古诗词有很多，体现了人们对${topic}的重视和喜爱。`,
      meaning: answer.includes('文化意义') ? answer.split('文化意义')[1].trim() : `${topic}不仅是一个节日，更是中华民族文化传承的重要载体，体现了人们对美好生活的向往和对传统文化的珍视。`
    };
  },

  useLocalBackup(topic) {
    // 本地备份数据
    const backupData = {
      origin: `${topic}是中国传统节日之一，有着悠久的历史和丰富的文化内涵。`,
      customs: `在${topic}期间，人们会进行各种传统活动，如家庭团聚、吃传统美食、参与民俗活动等。`,
      poems: `关于${topic}的古诗词有很多，体现了人们对${topic}的重视和喜爱。`,
      meaning: `${topic}不仅是一个节日，更是中华民族文化传承的重要载体，体现了人们对美好生活的向往和对传统文化的珍视。`
    };

    this.setData({ lectureContent: backupData });
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · AI民俗讲堂',
      path: '/mingsu/pages/ai-lecture/ai-lecture'
    };
  }
});