// mingsu/mingsu/pages/ai-learning/stories.js
Page({
  data: {
    // 故事分类
    categories: [
      { id: 'festival', name: '节日故事' },
      { id: 'legend', name: '民间传说' },
      { id: 'custom', name: '习俗故事' },
      { id: 'myth', name: '神话故事' }
    ],
    // 当前分类
    activeCategory: 'festival',
    // 故事列表
    stories: [
      {
        id: 1,
        title: '年兽的传说',
        desc: '春节的起源与年兽的故事',
        icon: '🧧',
        length: 5,
        age: '全年龄段'
      },
      {
        id: 2,
        title: '嫦娥奔月',
        desc: '中秋节的美丽传说',
        icon: '🌕',
        length: 4,
        age: '全年龄段'
      },
      {
        id: 3,
        title: '屈原投江',
        desc: '端午节的由来',
        icon: '龙舟',
        length: 6,
        age: '7岁+'
      },
      {
        id: 4,
        title: '牛郎织女',
        desc: '七夕节的爱情传说',
        icon: '鹊桥',
        length: 5,
        age: '7岁+'
      }
    ],
    // 故事主题
    storyTopic: '',
    // 生成状态
    generating: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '民俗故事汇' });
  },

  // 切换分类
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ activeCategory: categoryId });
    // 这里可以根据分类加载不同的故事
  },

  // 查看故事
  viewStory(e) {
    const storyId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/ai-learning/story-detail?id=${storyId}`
    });
  },

  // 故事主题输入变化
  onStoryTopicChange(e) {
    this.setData({ storyTopic: e.detail.value });
  },

  // 生成故事
  async generateStory() {
    const topic = this.data.storyTopic.trim();
    if (!topic || this.data.generating) return;

    this.setData({ generating: true });

    try {
      const { result } = await wx.cloud.callFunction({
        name: 'folkAiGuide',
        data: {
          type: 'story',
          params: {
            name: topic,
            description: `关于${topic}的民俗故事`,
            theme: '民间传说'
          }
        }
      });

      if (result && result.story) {
        wx.navigateTo({
          url: `/mingsu/mingsu/pages/ai-learning/story-detail?content=${encodeURIComponent(result.story)}&title=${encodeURIComponent(topic)}`
        });
      }
    } catch (error) {
      console.error('故事生成失败:', error);
      wx.showToast({ title: '生成失败，请重试', icon: 'none' });
    } finally {
      this.setData({ generating: false });
    }
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: '民俗故事汇',
      path: '/mingsu/mingsu/pages/ai-learning/stories',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20folk%20stories%20book%2C%20traditional%20style&image_size=square_hd'
    };
  }
});
