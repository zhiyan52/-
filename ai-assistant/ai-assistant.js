Page({
  data: {
    userInput: "",
    answer: "",
    loading: false
  },

  onInput(e) {
    this.setData({
      userInput: e.detail.value
    });
  },

  sendQuestion() { // 去掉方法上的 async
    const { userInput } = this.data;
    if (!userInput.trim()) {
      wx.showToast({ title: "请输入问题", icon: "none" });
      return;
    }

    this.setData({ loading: true, answer: "" });

    // 把 async 移到这里，用自执行函数包裹
    (async () => {
      try {
        // 1. 创建模型实例
        const model = wx.cloud.extend.AI.createModel("hunyuan-exp");

        // 2. 发送请求
        const res = await model.generateText({
          model: "hunyuan-turbos-latest",
          messages: [
            { role: "system", content: "你是一位古建筑文化专家，回答要简洁易懂，语言贴合古风，内容围绕中国古建筑知识展开。" },
            { role: "user", content: userInput }
          ]
        });

        const answer = res.choices[0].message.content;
        this.setData({ answer });

      } catch (err) {
        console.error("AI调用失败：", err);
        wx.showToast({ title: "AI调用失败，请重试", icon: "none" });
      } finally {
        this.setData({ loading: false });
      }
    })(); // 这里要加 () 执行这个函数
  }
});