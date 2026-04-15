// ai-assistant/ai-assistant.js
Page({
  data: {
    messages: [],
    aiResponses: [],
    inputValue: '',
    loading: false,
    scrollToView: '',
    isVoiceInput: false,
    showQuickQuestions: true,
    showSettingsModal: false,
    settings: {
      voiceInput: true,
      smartRecommend: true,
      studyPlan: true
    },
    quickQuestions: [
      '什么是中国古建筑？',
      '非遗文化有哪些类别？',
      '如何制定文化学习计划？',
      '解读一下"天行健，君子以自强不息"'
    ],
    conversationId: 0
  },

  onLoad(options) {
    // 初始化AI助手
    this.initAIAssistant();
  },

  initAIAssistant() {
    // 模拟AI助手初始化
    console.log('AI文化助手初始化完成');
  },

  goBack() {
    wx.navigateBack();
  },

  showSettings() {
    this.setData({ showSettingsModal: true });
  },

  hideSettings() {
    this.setData({ showSettingsModal: false });
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  toggleSetting(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    this.setData({
      [`settings.${key}`]: value
    });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  clearInput() {
    this.setData({ inputValue: '' });
  },

  toggleVoiceInput() {
    this.setData({ isVoiceInput: !this.data.isVoiceInput });
    if (this.data.isVoiceInput) {
      this.startVoiceInput();
    }
  },

  startVoiceInput() {
    wx.showToast({ title: '请开始说话', icon: 'none' });
    // 模拟语音输入功能
    setTimeout(() => {
      wx.showToast({ title: '语音识别中...', icon: 'loading' });
      setTimeout(() => {
        this.setData({
          inputValue: '什么是非物质文化遗产？',
          isVoiceInput: false
        });
        wx.showToast({ title: '语音识别完成', icon: 'success' });
      }, 2000);
    }, 1000);
  },

  selectQuickQuestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({ inputValue: question });
    this.sendMessage();
  },

  sendMessage() {
    const message = this.data.inputValue.trim();
    if (!message) return;

    // 添加用户消息
    const userMessage = {
      id: this.data.conversationId++,
      content: message,
      avatar: '👤'
    };

    this.setData({
      messages: [...this.data.messages, userMessage],
      inputValue: '',
      loading: true,
      showQuickQuestions: false,
      scrollToView: `msg-${userMessage.id}`
    });

    // 模拟AI响应
    setTimeout(() => {
      this.generateAIResponse(message);
    }, 1000);
  },

  generateAIResponse(question) {
    let response = '';
    let actions = [];

    // 基于问题内容生成不同的响应
    if (question.includes('古建筑') || question.includes('古建')) {
      response = '中国古建筑是指中国古代的建筑体系，具有悠久的历史和独特的风格。主要特点包括：\n\n1. 木结构为主：以木材为主要建筑材料，采用榫卯结构\n2. 斗拱系统：独特的斗拱结构，既美观又实用\n3. 院落式布局：多采用四合院等院落式布局\n4. 等级制度：建筑规模和形式体现社会等级\n5. 装饰艺术：精美的木雕、砖雕、石雕等\n\n代表性建筑有故宫、天坛、颐和园等。';
      actions = [
        { text: '查看古建雅韵模块', action: 'navigate', url: '/gujian/home/home' },
        { text: '了解更多古建筑知识', action: 'ask', question: '中国古建筑的主要结构类型有哪些？' }
      ];
    } else if (question.includes('非遗') || question.includes('非物质文化遗产')) {
      response = '非物质文化遗产是指各族人民世代相传并视为其文化遗产组成部分的各种传统文化表现形式，以及与传统文化表现形式相关的实物和场所。\n\n主要类别包括：\n1. 传统口头文学以及作为其载体的语言\n2. 传统美术、书法、音乐、舞蹈、戏剧、曲艺和杂技\n3. 传统技艺、医药和历法\n4. 传统礼仪、节庆等民俗\n5. 传统体育和游艺\n\n中国拥有众多世界级非物质文化遗产，如昆曲、古琴艺术、京剧等。';
      actions = [
        { text: '查看非遗匠心模块', action: 'navigate', url: '/pages/feiyi/pages/index/index' },
        { text: '了解具体的非遗项目', action: 'ask', question: '中国有哪些著名的非物质文化遗产？' }
      ];
    } else if (question.includes('学习计划') || question.includes('计划')) {
      response = '为您生成一个文化学习计划：\n\n**一周学习计划**\n\n周一：古建筑基础知识\n- 了解中国古建筑的发展历史\n- 学习主要建筑类型和特点\n\n周二：非遗文化探索\n- 了解非遗的定义和分类\n- 学习1-2个代表性非遗项目\n\n周三：民俗文化研究\n- 了解传统节日的起源和习俗\n- 学习民间艺术形式\n\n周四：典藏文化鉴赏\n- 了解古籍文献的价值\n- 学习文物鉴赏基础知识\n\n周五：书画艺术欣赏\n- 了解中国书法的发展\n- 学习国画的基本技法\n\n周六：实践体验\n- 尝试简单的传统工艺\n- 参观文化场馆\n\n周日：总结反思\n- 整理本周学习内容\n- 制定下周学习计划';
      actions = [
        { text: '调整学习计划', action: 'ask', question: '如何根据我的兴趣调整学习计划？' },
        { text: '查看模块总览', action: 'navigate', url: '/moudules/modules/modules' }
      ];
    } else if (question.includes('解读') || question.includes('名句')) {
      response = '"天行健，君子以自强不息"出自《周易》乾卦的象传。这句话的意思是：\n\n天（即自然）的运动刚强劲健，相应地，君子处世，也应像天一样，自我力求进步，刚毅坚卓，发愤图强，永不停息。\n\n这句话强调了一种积极向上、不断进取的精神，鼓励人们在面对困难和挑战时，要像天道运行一样刚健有力，自强不息，永不放弃。\n\n这种精神是中华民族的传统美德，也是我们在现代社会中应该保持的重要品质。';
      actions = [
        { text: '解读更多名句', action: 'ask', question: '解读"地势坤，君子以厚德载物"' },
        { text: '查看书画雅集模块', action: 'navigate', url: '/shufa/shufa/shufa' }
      ];
    } else if (question.includes('民俗') || question.includes('传统节日')) {
      response = '中国民俗文化丰富多彩，包括传统节日、民间信仰、民间工艺、民间文学等多个方面。\n\n主要传统节日有：\n- 春节：农历正月初一，是中国最重要的传统节日\n- 元宵节：农历正月十五，赏灯、吃元宵\n- 清明节：公历4月4-6日，扫墓、踏青\n- 端午节：农历五月初五，吃粽子、赛龙舟\n- 中秋节：农历八月十五，赏月、吃月饼\n- 重阳节：农历九月初九，登高、赏菊\n\n民俗文化是中华民族的精神财富，体现了劳动人民的智慧和创造力。';
      actions = [
        { text: '查看民俗百味模块', action: 'navigate', url: '/mingsu/mingsu/mingsu' },
        { text: '了解具体节日习俗', action: 'ask', question: '春节有哪些传统习俗？' }
      ];
    } else if (question.includes('推荐') || question.includes('内容')) {
      response = '根据您的兴趣，我为您推荐以下文化内容：\n\n1. **古建筑**：故宫建筑艺术赏析、中国传统园林设计\n2. **非遗文化**：苏绣技艺传承、京剧艺术欣赏\n3. **民俗文化**：中国传统节日文化、民间故事传说\n4. **典藏文化**：《永乐大典》的历史价值、古代文物鉴赏\n5. **书画艺术**：王羲之书法解析、齐白石国画欣赏\n\n您可以在相应的模块中找到这些内容，也可以告诉我您具体感兴趣的方向，我会为您提供更详细的推荐。';
      actions = [
        { text: '查看模块总览', action: 'navigate', url: '/moudules/modules/modules' },
        { text: '推荐具体内容', action: 'ask', question: '推荐一些适合初学者的文化内容' }
      ];
    } else {
      response = '感谢您的问题！我是AI文化助手，专注于中国传统文化的知识解答。\n\n您可以向我询问关于古建筑、非物质文化遗产、民俗文化、典藏文化、书画艺术等方面的问题，我会尽力为您提供详细的解答。\n\n您也可以让我为您推荐感兴趣的文化内容，或者生成个性化的文化学习计划。\n\n请问您具体想了解哪方面的文化知识呢？';
      actions = [
        { text: '了解古建筑', action: 'ask', question: '什么是中国古建筑？' },
        { text: '了解非遗文化', action: 'ask', question: '什么是非物质文化遗产？' },
        { text: '制定学习计划', action: 'ask', question: '如何制定文化学习计划？' }
      ];
    }

    const aiResponse = {
      id: this.data.conversationId++,
      content: response,
      actions: actions
    };

    this.setData({
      aiResponses: [...this.data.aiResponses, aiResponse],
      loading: false,
      scrollToView: `msg-${aiResponse.id}`
    });
  },

  handleAction(e) {
    const action = e.currentTarget.dataset.action;
    if (action.action === 'navigate') {
      wx.navigateTo({
        url: action.url,
        fail: (err) => {
          console.error('跳转失败:', err);
          wx.showToast({ title: '页面加载失败', icon: 'error' });
        }
      });
    } else if (action.action === 'ask') {
      this.setData({ inputValue: action.question });
      this.sendMessage();
    }
  },

  onShareAppMessage() {
    return {
      title: 'AI文化助手 - 智能解答文化问题',
      path: '/ai-assistant/ai-assistant',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20cultural%20assistant%20robot%20chinese%20traditional%20culture&image_size=landscape_16_9'
    };
  }
});
