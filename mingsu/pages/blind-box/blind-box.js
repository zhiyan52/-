// mingsu/pages/blind-box/blind-box.js
Page({
  data: {
    hasOpenedToday: false,
    selectedItem: null,
    historyList: [],
    folkloreItems: [
      {
        id: 1,
        title: '春节贴春联',
        description: '春联，又称“春贴”、“门对”、“对联”，是中国特有的文学形式，也是华人们过春节的重要标志。',
        meaning: '春联以对仗工整、简洁精巧的文字描绘美好形象，抒发美好愿望，是中国特有的文学形式，是华人们过年的重要习俗。当人们在自己的家门口贴上春联和福字的时候，意味着过春节正式拉开序幕。'
      },
      {
        id: 2,
        title: '中秋赏月',
        description: '中秋节，又称祭月节、月光诞、月夕、秋节、仲秋节、拜月节、月娘节、月亮节、团圆节等，是中国民间的传统节日。',
        meaning: '中秋节以月之圆兆人之团圆，为寄托思念故乡，思念亲人之情，祈盼丰收、幸福，成为丰富多彩、弥足珍贵的文化遗产。'
      },
      {
        id: 3,
        title: '清明扫墓',
        description: '清明节，又称踏青节、行清节、三月节、祭祖节等，节期在仲春与暮春之交。',
        meaning: '清明节是中华民族古老的节日，既是一个扫墓祭祖的肃穆节日，也是人们亲近自然、踏青游玩、享受春天乐趣的欢乐节日。'
      },
      {
        id: 4,
        title: '端午赛龙舟',
        description: '端午节，又称端阳节、龙舟节、重午节、重五节、天中节等，日期在每年农历五月初五，是集拜神祭祖、祈福辟邪、欢庆娱乐和饮食为一体的民俗大节。',
        meaning: '赛龙舟是端午节的重要习俗之一，传说是为了纪念投江自尽的屈原，人们通过赛龙舟来驱赶江中的鱼，保护屈原的遗体。'
      },
      {
        id: 5,
        title: '重阳登高',
        description: '重阳节，是中国民间传统节日，日期在每年农历九月初九。',
        meaning: '重阳节在历史发展演变中杂糅多种民俗为一体，承载了丰富的文化内涵。在民俗观念中“九”在数字中是最大数，有长久长寿的含意，寄托着人们对老人健康长寿的祝福。'
      },
      {
        id: 6,
        title: '元宵赏花灯',
        description: '元宵节，又称上元节、小正月、元夕或灯节，时间为每年农历正月十五。',
        meaning: '元宵节是中国的传统节日之一，主要有赏花灯、吃汤圆、猜灯谜、放烟花等一系列传统民俗活动。'
      },
      {
        id: 7,
        title: '腊八节喝腊八粥',
        description: '腊八节，即每年农历十二月初八，又称为“法宝节”“佛成道节”“成道会”等。',
        meaning: '腊八节是佛教盛大的节日之一，这天是佛祖释迦牟尼成道之日，又称为“法宝节”“佛成道节”“成道会”等。在这一天，人们会喝腊八粥，以庆祝丰收和祈求吉祥。'
      },
      {
        id: 8,
        title: '小年祭灶',
        description: '小年，通常指扫尘、祭灶的日子，被视为“忙年”的开始。',
        meaning: '祭灶是小年的重要习俗，传说灶王爷在这一天要上天向玉帝禀报人间善恶，所以人们在这一天要祭灶，希望灶王爷能在玉帝面前多说好话。'
      },
      {
        id: 9,
        title: '立春吃春饼',
        description: '立春，是二十四节气中的第一个节气，标志着春天的开始。',
        meaning: '立春吃春饼是中国民间的传统习俗，春饼象征着春天的到来，人们通过吃春饼来迎接春天的到来，祈求一年的丰收和吉祥。'
      },
      {
        id: 10,
        title: '冬至吃饺子',
        description: '冬至，是二十四节气中的第二十二个节气，也是中国民间的传统节日。',
        meaning: '冬至吃饺子是中国民间的传统习俗，传说饺子是由张仲景发明的，最初是为了治疗冻伤的耳朵，后来逐渐演变成冬至的传统美食。'
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '风物盲盒' });
    this.checkIfOpenedToday();
    this.loadHistoryList();
  },

  // 检查今日是否已打开盲盒
  checkIfOpenedToday() {
    const today = new Date().toDateString();
    const lastOpenedDate = wx.getStorageSync('lastOpenedDate');
    this.setData({ hasOpenedToday: lastOpenedDate === today });
  },

  // 加载历史记录
  loadHistoryList() {
    const historyList = wx.getStorageSync('blindBoxHistory') || [];
    this.setData({ historyList });
  },

  // 打开盲盒
  openBlindBox() {
    if (this.data.hasOpenedToday) {
      return;
    }

    // 随机选择一个民俗知识
    const randomIndex = Math.floor(Math.random() * this.data.folkloreItems.length);
    const selectedItem = this.data.folkloreItems[randomIndex];

    // 添加收藏状态
    selectedItem.collected = false;

    // 记录今日已打开
    const today = new Date().toDateString();
    wx.setStorageSync('lastOpenedDate', today);
    this.setData({ hasOpenedToday: true });

    // 添加到历史记录
    const historyItem = {
      id: Date.now(),
      title: selectedItem.title,
      date: today,
      collected: false
    };
    const historyList = [historyItem, ...this.data.historyList];
    wx.setStorageSync('blindBoxHistory', historyList);
    this.setData({ historyList });

    // 显示详情
    this.setData({ selectedItem });

    // 显示打开动画
    wx.showToast({
      title: '盲盒打开成功！',
      icon: 'success'
    });
  },

  // 选择历史记录项
  selectHistoryItem(e) {
    const item = e.currentTarget.dataset.item;
    // 查找对应的民俗知识详情
    const selectedItem = this.data.folkloreItems.find(f => f.title === item.title) || item;
    selectedItem.collected = item.collected;
    this.setData({ selectedItem });
  },

  // 收藏项目
  collectItem() {
    if (!this.data.selectedItem) {
      return;
    }

    // 切换收藏状态
    const selectedItem = { ...this.data.selectedItem };
    selectedItem.collected = !selectedItem.collected;
    this.setData({ selectedItem });

    // 更新历史记录中的收藏状态
    const historyList = this.data.historyList.map(item => {
      if (item.title === selectedItem.title) {
        return { ...item, collected: selectedItem.collected };
      }
      return item;
    });
    wx.setStorageSync('blindBoxHistory', historyList);
    this.setData({ historyList });

    wx.showToast({
      title: selectedItem.collected ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
  },

  // 分享项目
  shareItem() {
    if (!this.data.selectedItem) {
      return;
    }

    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  onShareAppMessage() {
    return {
      title: '风物盲盒 - 每日随机获得民俗知识',
      path: '/mingsu/pages/blind-box/blind-box'
    };
  }
});