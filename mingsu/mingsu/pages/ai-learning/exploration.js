// mingsu/mingsu/pages/ai-learning/exploration.js
Page({
  data: {
    // 探索主题
    themes: [
      {
        id: 'festival',
        name: '传统节日',
        desc: '探索春节、中秋等传统节日的起源和习俗',
        icon: '🎊'
      },
      {
        id: 'wedding',
        name: '婚嫁礼仪',
        desc: '了解中国传统婚礼的仪式和文化内涵',
        icon: '💒'
      },
      {
        id: 'food',
        name: '传统美食',
        desc: '探索各地传统美食的制作方法和文化意义',
        icon: '🍜'
      },
      {
        id: 'craft',
        name: '传统工艺',
        desc: '了解剪纸、刺绣等传统工艺的历史和技法',
        icon: '✂️'
      }
    ],
    // 学习步骤
    learningSteps: [
      {
        id: 1,
        title: '了解基本概念',
        desc: '学习民俗文化的基本定义和分类'
      },
      {
        id: 2,
        title: '探索历史背景',
        desc: '了解民俗文化的历史演变和社会背景'
      },
      {
        id: 3,
        title: '体验传统习俗',
        desc: '通过互动体验了解传统习俗的具体内容'
      },
      {
        id: 4,
        title: '思考文化意义',
        desc: '思考民俗文化在现代社会的价值和意义'
      }
    ],
    // 当前步骤
    currentStep: 1,
    // 探索进度
    explorationProgress: 25,
    // AI建议
    aiSuggestion: '建议你从传统节日开始探索，了解春节的起源和习俗。'
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '民俗知识探索' });
  },

  // 选择主题
  selectTheme(e) {
    const themeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/ai-learning/theme?theme=${themeId}`
    });
  },

  // 开始AI探索
  async startAIExploration() {
    wx.showLoading({ title: 'AI正在准备探索内容...' });

    try {
      const { result } = await wx.cloud.callFunction({
        name: 'folkAiGuide',
        data: {
          type: 'exploration',
          theme: 'festival',
          step: this.data.currentStep
        }
      });

      wx.hideLoading();

      if (result && result.content) {
        wx.navigateTo({
          url: `/mingsu/mingsu/pages/ai-learning/exploration-detail?content=${encodeURIComponent(result.content)}`
        });
      }
    } catch (error) {
      console.error('AI探索失败:', error);
      wx.hideLoading();
      wx.showToast({ title: '探索失败，请重试', icon: 'none' });
    }
  },

  // 生命周期函数--监听页面显示
  onShow() {
    // 更新探索进度
    this.updateProgress();
  },

  // 更新进度
  updateProgress() {
    const progress = this.data.currentStep * 25;
    this.setData({ explorationProgress: progress });
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: '民俗知识探索',
      path: '/mingsu/mingsu/pages/ai-learning/exploration',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20folk%20culture%20exploration%20with%20AI%20assistant%2C%20traditional%20style&image_size=square_hd'
    };
  }
});
