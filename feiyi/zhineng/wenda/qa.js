Page({
  data: {
    // 答题模块数据
    questionList: [
      {
        question: "剪纸技艺中，折叠刻纸的核心作用是？",
        options: ["简化裁剪步骤", "实现对称图案", "节省纸张", "方便上色"],
        answer: 1,
        explain: "折叠刻纸是剪纸核心技法，通过对折、多次折叠，可一次性剪出对称、轴对称的精美图案，是传统剪纸最常用的手法。"
      },
      {
        question: "下列属于榫卯结构核心特点的是？",
        options: ["使用铁钉固定", "凹凸咬合不用钉子", "胶水粘贴为主", "批量机械生产"],
        answer: 1,
        explain: "榫卯结构依靠榫头和榫眼凹凸咬合连接，无需铁钉、胶水，稳固耐用，是中国传统木作核心技艺。"
      },
      {
        question: "刺绣技艺里，用来勾勒图案边缘的针法是？",
        options: ["平针", "回针", "打籽针", "锁针"],
        answer: 1,
        explain: "回针也叫勾边针，线条紧实连贯，专门用于刺绣图案轮廓勾勒，让图案边缘更清晰立体。"
      }
    ],
    currentIndex: 0,
    currentQuestion: {},
    resultShow: false,
    isCorrect: false,
    answerIndex: -1,

    // AI模块数据
    userInput: '',
    aiResult: '',
    referenceImage: '',
    isLoading: false,
    imgLoading: false
  },

  onLoad() {
    // 初始化第一题
    this.setData({
      currentQuestion: this.data.questionList[0]
    })
  },

  // 答题模块：选择答案
  chooseAnswer(e) {
    const idx = e.currentTarget.dataset.index
    const current = this.data.currentQuestion
    const isCorrect = idx == current.answer

    this.setData({
      resultShow: true,
      isCorrect,
      answerIndex: idx
    })
  },

  // 答题模块：下一题
  nextQuestion() {
    let nextIdx = this.data.currentIndex + 1
    const total = this.data.questionList.length

    if (nextIdx >= total) {
      wx.showToast({ title: '答题完成！', icon: 'success' })
      return
    }

    this.setData({
      currentIndex: nextIdx,
      currentQuestion: this.data.questionList[nextIdx],
      resultShow: false,
      answerIndex: -1,
      aiResult: '',
      referenceImage: ''
    })
  },

  // 答题后：AI讲解本题
  getQuestionExplain() {
    const { currentQuestion } = this.data
    const prompt = `请详细讲解这道非遗题：${currentQuestion.question}，答案是${currentQuestion.options[currentQuestion.answer]}，拆解对应的非遗工序和技法细节`
    this.getAIData(prompt)
  },

  // 答题后：生成本题对应参考图
  getQuestionImage() {
    const { currentQuestion } = this.data
    const prompt = `${currentQuestion.options[currentQuestion.answer]}，非遗技艺示意图`
    this.getImageData(prompt)
  },

  // AI模块：监听用户输入
  handleInput(e) {
    this.setData({
      userInput: e.detail.value
    })
  },

  // AI模块：获取非遗解答/改进建议
  async getAIAdvice() {
    const { userInput } = this.data
    if (!userInput.trim()) {
      wx.showToast({ title: '请输入内容', icon: 'none' })
      return
    }
    this.getAIData(userInput)
  },

  // AI模块：生成参考示意图
  async getReferenceImage() {
    const { userInput } = this.data
    if (!userInput.trim()) {
      wx.showToast({ title: '请输入内容', icon: 'none' })
      return
    }
    this.getImageData(userInput)
  },

  // 通用：调用DeepSeek AI
  async getAIData(prompt) {
    this.setData({ isLoading: true })
    try {
      const res = await wx.cloud.callFunction({
        name: 'callIntangibleAI',
        data: {
          requestType: 'deepseek',
          userContent: prompt
        }
      })
      if (res.result.success) {
        this.setData({
          aiResult: res.result.data
        })
      } else {
        wx.showToast({ title: '请求失败', icon: 'none' })
      }
    } catch (err) {
      console.error('AI请求失败', err)
      wx.showToast({ title: '网络异常', icon: 'none' })
    } finally {
      this.setData({ isLoading: false })
    }
  },

  // 通用：调用混元生图
  async getImageData(prompt) {
    this.setData({ imgLoading: true })
    try {
      const res = await wx.cloud.callFunction({
        name: 'callIntangibleAI',
        data: {
          requestType: 'hunyuan',
          userContent: prompt
        }
      })
      if (res.result.success) {
        this.setData({
          referenceImage: res.result.imageUrl
        })
        wx.showToast({ title: '生成成功', icon: 'success' })
      } else {
        wx.showToast({ title: '生成失败', icon: 'none' })
      }
    } catch (err) {
      console.error('生图失败', err)
      wx.showToast({ title: '网络异常', icon: 'none' })
    } finally {
      this.setData({ imgLoading: false })
    }
  }
})