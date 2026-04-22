// shufa/shufa/ai/ai-qa.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    showResponse: false,
    loading: false,
    userQuestion: '',
    aiAnswer: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 输入框绑定事件
   */
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  /**
   * 发送消息
   */
  sendMessage() {
    if (!this.data.inputValue.trim()) return;

    const question = this.data.inputValue;
    this.setData({
      userQuestion: question,
      showResponse: true,
      loading: true,
      inputValue: ''
    });

    // 模拟AI回复
    setTimeout(() => {
      let answer = '';
      if (question.includes('王羲之')) {
        answer = '王羲之是东晋时期著名的书法家，被誉为"书圣"。他的书法风格平和自然，笔势委婉含蓄，遒美健秀。代表作《兰亭序》被称为"天下第一行书"，其书法特点包括：1. 笔法精妙，行笔流畅；2. 结构多变，错落有致；3. 气息连贯，韵味无穷；4. 中锋行笔，线条饱满。';
      } else if (question.includes('国画') && question.includes('技法')) {
        answer = '国画的基本技法主要包括：1. 勾：用线条勾勒轮廓；2. 皴：用笔墨表现物体的纹理和质感；3. 点：用点状物表现细节；4. 染：用墨色或颜色渲染；5. 擦：用干笔擦出质感；6. 烘：用淡墨烘托气氛；7. 破：用不同墨色打破单调。这些技法相互配合，形成了国画独特的艺术表现力。';
      } else if (question.includes('清明上河图')) {
        answer = '《清明上河图》的作者是北宋时期的画家张择端。这幅画描绘了北宋都城汴京（今河南开封）在清明时节的繁华景象，包括城市风貌、社会生活、商业活动等。画作采用长卷形式，内容丰富，人物众多，是中国古代绘画的杰作，也是研究北宋社会历史的重要资料。';
      } else if (question.includes('书体')) {
        answer = '书法的五种书体是：1. 篆书：包括大篆和小篆，笔画粗细均匀，结构整齐；2. 隶书：由篆书演变而来，笔画有波磔，结构扁平；3. 楷书：笔画规整，结构严谨，是现代汉字的标准字体；4. 行书：介于楷书和草书之间，笔画流畅，结构灵活；5. 草书：笔画简化，结构奔放，具有强烈的艺术表现力。';
      } else {
        answer = '这是一个关于"' + question + '"的回答。在实际应用中，这里会调用AI模型生成真实的回答。';
      }
      this.setData({
        aiAnswer: answer,
        loading: false
      });
    }, 1500);
  },

  /**
   * 选择常见问题
   */
  selectFaq(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({
      inputValue: question
    });
    this.sendMessage();
  }
})