Page({
  data: {
    step: 'select',
    heritageList: [],
    currentHeritage: null,
    currentEra: '',
    currentScene: null,
    choiceHistory: [],
    result: null,
    unlockedEras: [],
    sourceText: {
      cache: '来自历史路径缓存',
      template: '来自非遗知识库',
      ai: 'AI实时生成'
    }
  },

  onLoad() {
    this.loadHeritageList();
  },

  // 加载非遗列表
  loadHeritageList() {
    // 使用本地数据作为后备
    const heritageList = [
      {
        _id: '1',
        name: '景德镇陶瓷',
        eras: ['唐代', '宋代', '元代', '明代', '清代']
      },
      {
        _id: '2',
        name: '苏绣',
        eras: ['唐代', '宋代', '元代', '明代', '清代']
      },
      {
        _id: '3',
        name: '剪纸',
        eras: ['唐代', '宋代', '元代', '明代', '清代']
      }
    ];
    this.setData({ heritageList: heritageList });
  },

  // 选择非遗
  onSelectHeritage(e) {
    const id = e.currentTarget.dataset.id;
    const heritage = this.data.heritageList.find(h => h._id === id);
    this.setData({
      currentHeritage: heritage,
      step: 'timeline',
      unlockedEras: [0] // 只解锁第一个时代
    });
  },

  // 选择时代
  onSelectEra(e) {
    const { era, index } = e.currentTarget.dataset;
    if (!this.data.unlockedEras.includes(index)) return;

    this.setData({ currentEra: era, step: 'loading' });

    // 加载该时代第一个场景
    this.loadScene(era, 0);
  },

  // 加载场景
  loadScene(era, decisionIndex) {
    // 使用本地数据作为后备
    const currentScene = {
      scene: `在${era}的${this.data.currentHeritage.name}工坊中`,
      role: '技艺传承者',
      options: [
        {
          id: '1',
          text: '坚持传统工艺',
          correct: true
        },
        {
          id: '2',
          text: '尝试创新技法',
          correct: false
        }
      ]
    };

    this.setData({
      currentScene: currentScene,
      step: 'scene'
    });
  },

  // 做出选择
  async onMakeChoice(e) {
    const choiceId = e.currentTarget.dataset.id;

    wx.showLoading({ title: '时光流转中...' });

    const { result } = await wx.cloud.callFunction({
      name: 'timeMachine',
      data: {
        heritageId: this.data.currentHeritage._id,
        era: this.data.currentEra,
        userChoice: choiceId,
        choiceHistory: this.data.choiceHistory
      }
    });

    wx.hideLoading();

    // 更新历史
    const newHistory = [...this.data.choiceHistory, choiceId];

    this.setData({
      result,
      choiceHistory: newHistory,
      step: 'result'
    });

    // 触发淡入动画
    this.playResultAnimation();
  },

  // 继续下一个场景或时代
  continueNext() {
    const currentIndex = this.data.currentHeritage.eras.indexOf(this.data.currentEra);
    const nextDecisionIndex = this.data.choiceHistory.length;

    // 检查是否还有更多决策点
    if (nextDecisionIndex < 3) { // 假设每个时代3个决策
      this.loadScene(this.data.currentEra, nextDecisionIndex);
    } else if (currentIndex < this.data.currentHeritage.eras.length - 1) {
      // 解锁下一个时代
      const newUnlocked = [...this.data.unlockedEras, currentIndex + 1];
      this.setData({
        unlockedEras: newUnlocked,
        choiceHistory: [],
        step: 'timeline'
      });
    } else {
      // 完成全部，到手账
      wx.navigateTo({ url: '/pages/handbook/handbook' });
    }
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `我在${this.data.currentHeritage.name}时光机中选择了"${this.data.result.base.optionText}"`,
      path: `/pages/timeMachine/timeMachine?heritage=${this.data.currentHeritage._id}`,
      imageUrl: this.generateShareImage()
    };
  }
});