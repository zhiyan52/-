// pages/stepDetail/stepDetail.js
Page({
  data: {
    step: null,
    craft: null,
    selectedOption: null,
    showResult: false,
    isCorrect: false,
    feedbackText: '',
    judgmentCompleted: false,
    showDesc: false,
    selectedQuestion: null,
    showPreAnswer: false,
    preAnswerText: '',
    customQuestion: '',
    aiAnswer: null,
    preAnswerCount: 0
  },

  onLoad(options) {
    const { craftId, stepId } = options;
    this.loadStepDetail(craftId, stepId);
  },

  async loadStepDetail(craftId, stepId) {
    const { result } = await wx.cloud.callFunction({
      name: 'getStepDetail',
      data: { craftId, stepId }
    });

    this.setData({
      step: result.step,
      craft: result.craft,
      judgmentCompleted: result.userProgress && result.userProgress.completedSteps && result.userProgress.completedSteps.includes(stepId),
      preAnswerCount: result.step.aiExtension && result.step.aiExtension.preAnswers ? Object.keys(result.step.aiExtension.preAnswers).length : 0
    });
  },

  // 选择判断选项
  selectOption(e) {
    if (this.data.showResult) return;
    this.setData({ selectedOption: e.currentTarget.dataset.id });
  },

  // 提交判断
  submitJudgment() {
    const { step, selectedOption } = this.data;
    const option = step.judgment.options.find(o => o.id === selectedOption);

    this.setData({
      showResult: true,
      isCorrect: option.correct,
      feedbackText: option.feedback
    });

    // 记录进度
    if (option.correct) {
      this.recordProgress(step.id, true);
    }
  },

  // 记录完成
  async recordProgress(stepId, correct) {
    await wx.cloud.callFunction({
      name: 'recordStepProgress',
      data: {
        craftId: this.data.craft._id,
        stepId,
        correct,
        timestamp: new Date().toISOString()
      }
    });
  },

  // 解锁下一工序
  unlockNext() {
    const { step, craft } = this.data;
    const currentPhase = craft.phases.find(p => p.id === step.phaseId);
    const currentIndex = currentPhase.steps.indexOf(step.name);
    const nextStepName = currentPhase.steps[currentIndex + 1];

    if (nextStepName) {
      const nextStepId = craft.stepDetails[nextStepName].id;
      wx.redirectTo({
        url: `/traditional/traditional/pages/stepDetail/stepDetail?craftId=${craft._id}&stepId=${nextStepId}`
      });
    } else {
      // 阶段完成
      wx.showModal({
        title: '🎉 阶段完成！',
        content: `你已完成"${currentPhase.name}"，解锁下一阶段。`,
        success: () => {
          wx.navigateBack();
        }
      });
    }
  },

  // 选择预存问题
  selectQuestion(e) {
    const q = e.currentTarget.dataset.q;
    const preAnswers = this.data.step.aiExtension.preAnswers;

    // 匹配预存答案
    const matchedKey = Object.keys(preAnswers).find(k => q.includes(k) || k.includes(q));

    if (matchedKey) {
      this.setData({
        selectedQuestion: q,
        showPreAnswer: true,
        preAnswerText: preAnswers[matchedKey],
        aiAnswer: null
      });
    } else {
      // 无预存，准备自定义提问
      this.setData({
        selectedQuestion: q,
        customQuestion: q,
        showPreAnswer: false
      });
    }
  },

  // 【AI】自定义提问（唯一触发点）
  async askAI() {
    const { customQuestion, step, craft } = this.data;

    wx.showLoading({ title: 'AI思考中...' });

    const { result } = await wx.cloud.callFunction({
      name: 'askAIPartner',
      data: {
        question: customQuestion,
        context: {
          craftName: craft.name,
          stepName: step.name,
          stepPurpose: step.basics.purpose,
          masterQuote: step.masterQuote
        },
        // 强制使用缓存
        cacheKey: `${craft._id}_${step.id}_${customQuestion.slice(0, 20)}`
      }
    });

    wx.hideLoading();

    this.setData({
      aiAnswer: result.answer,
      showPreAnswer: false
    });
  }
});