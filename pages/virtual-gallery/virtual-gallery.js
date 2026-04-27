Page({
  data: {
    // 360°序列图
    panoList: [
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/2.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/3.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/4.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/1.jpg",
      "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/360/gugong/1.jpg",
    ],
    current: 0,
    startX: 0,

    showModal: false,
    currentItem: {},

    // 5大热点知识
    infoList: [
      {
        name: "斗拱",
        desc: "斗拱是中国古建筑核心构件，用于立柱与横梁之间，兼具承重、抗震、装饰与等级象征，是中式木构精髓。"
      },
      {
        name: "飞檐",
        desc: "飞檐以向上翘起的曲线为特征，既利于排水，又形成轻盈灵动的美学效果，体现‘如鸟斯革，如翚斯飞’的营造意境。"
      },
      {
        name: "榫卯",
        desc: "榫卯为凹凸咬合结构，不用一钉即可实现构件稳固连接，是中国古代工匠智慧的极致体现，结构稳定且极具艺术价值。"
      },
      {
        name: "柱础",
        desc: "柱础是柱脚下方的石制构件，起防潮、承重、稳定作用，同时纹样精美，象征建筑等级与主人身份。"
      },
      {
        name: "藻井",
        desc: "藻井为室内天花高级装饰，通常呈伞盖状，多用于殿堂、庙宇，象征尊贵与神圣，兼具美学与祈福文化内涵。"
      }
    ]
  },

  onTouchStart(e) {
    this.setData({
      startX: e.touches[0].clientX
    });
  },

  onTouchMove(e) {
    const { startX, panoList } = this.data;
    const nowX = e.touches[0].clientX;
    const dx = nowX - startX;

    // 计算滑动距离对应的图片索引变化
    const threshold = 50; // 滑动阈值
    if (Math.abs(dx) < threshold) return;

    const total = panoList.length;
    let next = this.data.current;

    // 根据滑动方向切换图片
    if (dx > 0) {
      // 向右滑动，显示上一张
      next = (next - 1 + total) % total;
    } else {
      // 向左滑动，显示下一张
      next = (next + 1) % total;
    }

    this.setData({
      current: next,
      startX: nowX
    });
  },

  onTouchEnd() {
    // 重置起始位置，确保下次滑动的准确性
    this.setData({ startX: 0 });
  },

  // 上一张图片
  prevImage() {
    const { panoList, current } = this.data;
    const total = panoList.length;
    const next = (current - 1 + total) % total;
    this.setData({ current: next });
  },

  // 下一张图片
  nextImage() {
    const { panoList, current } = this.data;
    const total = panoList.length;
    const next = (current + 1) % total;
    this.setData({ current: next });
  },

  // 打开构件讲解
  openInfo(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      showModal: true,
      currentItem: this.data.infoList[index]
    });
  },

  closeModal() {
    this.setData({ showModal: false });
  },

  // AI生成营造结构图（调用云开发混元生图）
  generateStruct() {
    const { name } = this.data.currentItem;
    wx.showLoading({ title: '生成中...' });

    (async () => {
      try {
        const model = wx.cloud.extend.AI.createModel("hunyuan-image");
        const res = await model.generateImage({
          prompt: `${name}，中国古建筑营造技艺，结构解析图，工笔画，清晰，无水印，古风`,
          size: "1024x1024",
          num: 1
        });
        wx.previewImage({ urls: [res.images[0].url] });
      } catch (err) {
        wx.showToast({ title: "生成失败", icon: "none" });
      } finally {
        wx.hideLoading();
      }
    })();
  }
})