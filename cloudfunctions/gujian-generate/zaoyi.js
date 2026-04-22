Page({
  data: {
    // 预设选项
    components: ["斗拱", "飞檐", "榫卯", "瓦当", "藻井", "马头墙", "雀替", "柱础"],
    dynasties: ["宋代", "元代", "明代", "清代"],
    selectedComponent: "",
    selectedDynasty: "",
    detail: "",
    imageUrl: "",
    knowledgeText: "",
    loading: false,

    // 构件知识库（可扩展）
    knowledgeBase: {
      "斗拱": "斗拱是中国古建筑特有的构件，位于立柱与横梁之间，既能承重、抗震，又有极强的装饰性，也是建筑等级的象征。",
      "飞檐": "飞檐是中国古建筑屋顶的檐角向上翘起的部分，既利于排水，又造型优美，体现了古人‘如鸟斯革，如翚斯飞’的审美。",
      "榫卯": "榫卯是古代工匠不用钉子，通过构件凹凸咬合实现连接的技艺，兼具结构稳定性与艺术性，是中国木构建筑的精髓。",
      "瓦当": "瓦当是古代建筑屋檐筒瓦顶端的遮挡部分，有圆形和半圆形，常刻有文字、图案，兼具实用与装饰功能。"
    }
  },

  onComponentChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedComponent: this.data.components[index]
    });
  },

  onDynastyChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedDynasty: this.data.dynasties[index]
    });
  },

  onDetailInput(e) {
    this.setData({
      detail: e.detail.value
    });
  },

  generate() {
    const { selectedComponent, selectedDynasty, detail } = this.data;
    if (!selectedComponent || !selectedDynasty) {
      wx.showToast({ title: "请选择构件和朝代", icon: "none" });
      return;
    }

    this.setData({ loading: true, imageUrl: "", knowledgeText: "" });

    // 用自执行async函数，避免闪退
    (async () => {
      try {
        const model = wx.cloud.extend.AI.createModel("hunyuan-image");

        // 生成专业提示词
        const prompt = `中国古代建筑，${selectedDynasty}${selectedComponent}，正面特写，展示营造技艺细节，工笔画风格，高清线稿+上色，无多余元素` + (detail ? `，${detail}` : "");

        const res = await model.generateImage({
          prompt: prompt,
          size: "1024x1024",
          num: 1
        });

        const imageUrl = res.images[0].url;
        const knowledgeText = this.data.knowledgeBase[selectedComponent] || "暂无详细介绍";

        this.setData({
          imageUrl,
          knowledgeText
        });

      } catch (err) {
        console.error("生图失败：", JSON.stringify(err, null, 2));
        wx.showToast({ title: "生成失败，请重试", icon: "none" });
      } finally {
        this.setData({ loading: false });
      }
    })();
  },

  // 保存到本地（我的工坊）
  saveToWorkshop() {
    const { imageUrl, selectedComponent, selectedDynasty, knowledgeText } = this.data;
    if (!imageUrl) return;

    // 从本地存储读取已有数据
    let workshop = wx.getStorageSync("workshop") || [];
    workshop.push({
      id: Date.now(),
      imageUrl,
      title: `${selectedDynasty}${selectedComponent}`,
      knowledgeText
    });

    wx.setStorageSync("workshop", workshop);
    wx.showToast({ title: "已保存到我的工坊", icon: "success" });
  }
});