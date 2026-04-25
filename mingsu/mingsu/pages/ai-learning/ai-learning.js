// mingsu/mingsu/pages/ai-learning/ai-learning.js
Page({
  data: {
    // 学习进度
    learningProgress: 30,
    // 推荐学习主题
    recommendedTopics: [
      {
        id: 'spring-festival',
        name: '春节习俗',
        desc: '了解春节的起源、传统习俗和文化意义',
        icon: '🧧'
      },
      {
        id: 'mid-autumn',
        name: '中秋传说',
        desc: '探索中秋节的传说故事和传统活动',
        icon: '🌕'
      },
      {
        id: 'dragon-boat',
        name: '端午节',
        desc: '学习端午节的历史背景和习俗',
        icon: '龙舟'
      },
      {
        id: 'traditional-wedding',
        name: '传统婚礼',
        desc: '了解中国传统婚礼的仪式和象征意义',
        icon: '💒'
      }
    ],
    // AI助手
    showAIModal: false,
    aiInput: '',
    aiChatMessages: [
      {
        id: 1,
        type: 'ai',
        content: '你好！我是民俗AI助手，有什么关于民俗文化的问题可以问我哦～'
      }
    ],
    aiLoading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: 'AI民俗深度学习' });
  },

  // 开始知识探索
  startExploration() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/ai-learning/exploration'
    });
  },

  // 开始互动问答
  startQnA() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/ai-learning/qna'
    });
  },

  // 开始故事汇
  startStories() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/ai-learning/stories'
    });
  },

  // 开始知识测验
  startQuiz() {
    wx.navigateTo({
      url: '/mingsu/mingsu/pages/ai-learning/quiz'
    });
  },

  // 学习特定主题
  learnTopic(e) {
    const topicId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/ai-learning/topic?topic=${topicId}`
    });
  },

  // 显示AI助手
  showAIAssistant() {
    this.setData({ showAIModal: true });
  },

  // 隐藏AI助手
  hideAIAssistant() {
    this.setData({ showAIModal: false });
  },

  // AI输入变化
  onAIInputChange(e) {
    this.setData({ aiInput: e.detail.value });
  },

  // 发送AI问题
  async sendAIQuestion() {
    const question = this.data.aiInput.trim();
    if (!question) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question
    };

    this.setData({
      aiChatMessages: [...this.data.aiChatMessages, userMessage],
      aiInput: '',
      aiLoading: true
    });

    try {
      // 调用AI云函数
      const { result } = await wx.cloud.callFunction({
        name: 'folkAiGuide',
        data: {
          type: 'chat',
          question: question
        }
      });

      // 添加AI回复
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: result?.answer || '抱歉，我暂时无法回答这个问题，请尝试其他问题。'
      };

      this.setData({
        aiChatMessages: [...this.data.aiChatMessages, aiMessage],
        aiLoading: false
      });
    } catch (error) {
      console.error('AI问答失败:', error);

      // 添加错误回复
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: '抱歉，AI服务暂时不可用，请稍后再试。'
      };

      this.setData({
        aiChatMessages: [...this.data.aiChatMessages, errorMessage],
        aiLoading: false
      });
    }
  },

  // 生命周期函数--监听页面显示
  onShow() {
    // 更新学习进度
    this.updateLearningProgress();
  },

  // 更新学习进度
  updateLearningProgress() {
    // 模拟学习进度更新
    const currentProgress = this.data.learningProgress;
    const newProgress = Math.min(currentProgress + 5, 100);
    this.setData({ learningProgress: newProgress });
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: 'AI民俗深度学习',
      path: '/mingsu/mingsu/pages/ai-learning/ai-learning',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20folk%20culture%20education%20with%20AI%20assistant%2C%20traditional%20style&image_size=square_hd'
    };
  }
});
