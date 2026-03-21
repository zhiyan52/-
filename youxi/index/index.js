Page({
  data: {
    questionList: [], // 题库
    currentQ: 0, // 当前题目索引
    totalQ: 10, // 总题数
    score: 0, // 得分
    countdown: 15, // 每题倒计时
    timer: null, // 计时器
    selectDone: false, // 是否已选答案
    selectIndex: -1, // 选中的选项索引
    optionStatus: [], // 选项状态
    isOver: false // 答题是否结束
  },

  onLoad() {
    this.initQuestion();
    this.setData({
      optionStatus: new Array(this.data.questionList[0].options.length).fill('')
    });
    this.startCountdown();
  },

  // 初始化题库
  initQuestion() {
    const questions = [
      {
        title: "故宫（紫禁城）始建于哪个朝代的永乐年间？",
        options: ["唐朝", "宋朝", "明朝", "清朝"],
        answer: 2
      },
      {
        title: "布达拉宫是世界上海拔最高的古代宫殿群，位于哪里？",
        options: ["青海西宁", "西藏拉萨", "四川甘孜", "云南丽江"],
        answer: 1
      },
      {
        title: "中国现存最早的敞肩石拱桥赵州桥，始建于哪个朝代？",
        options: ["隋朝", "唐朝", "北宋", "金代"],
        answer: 0
      },
      {
        title: "应县木塔是世界最高木塔，其结构特点是？",
        options: ["纯木结构无钉铆", "砖石结构", "钢筋混凝土结构", "砖木混合"],
        answer: 0
      },
      {
        title: "拙政园是江南古典园林代表，位于哪个城市？",
        options: ["杭州", "南京", "苏州", "扬州"],
        answer: 2
      },
      {
        title: "福建土楼属于哪个民族的特色民居？",
        options: ["壮族", "客家", "纳西族", "侗族"],
        answer: 1
      },
      {
        title: "江南三大名楼不包括以下哪一个？",
        options: ["黄鹤楼", "岳阳楼", "滕王阁", "雷峰塔"],
        answer: 3
      },
      {
        title: "颐和园是清代皇家园林，其前身为？",
        options: ["清漪园", "畅春园", "圆明园", "静宜园"],
        answer: 0
      },
      {
        title: "世界上最早的启闭式桥梁是？",
        options: ["赵州桥", "广济桥", "洛阳桥", "卢沟桥"],
        answer: 1
      },
      {
        title: "未央宫是哪个朝代的皇宫，奠定了中轴线布局基础？",
        options: ["秦朝", "西汉", "东汉", "唐代"],
        answer: 1
      }
    ];
    this.setData({
      questionList: questions,
      totalQ: questions.length
    });
  },

  // 启动倒计时
  startCountdown() {
    clearInterval(this.data.timer);
    const timer = setInterval(() => {
      this.setData({
        countdown: this.data.countdown - 1
      });
      if (this.data.countdown <= 0) {
        clearInterval(timer);
        this.setData({ selectDone: true });
      }
    }, 1000);
    this.setData({ timer });
  },

  // 选择选项
  selectOption(e) {
    if (this.data.selectDone) return;
    const index = e.currentTarget.dataset.index;
    const { answer } = this.data.questionList[this.data.currentQ];
    const optionStatus = new Array(this.data.questionList[this.data.currentQ].options.length).fill('');
    optionStatus[index] = index === answer ? 'correct' : 'wrong';
    let score = this.data.score;
    if (index === answer) score += 10;
    clearInterval(this.data.timer);
    this.setData({
      selectIndex: index,
      optionStatus,
      selectDone: true,
      score
    });
  },

  // 下一题/查看结果
  nextQuestion() {
    const { currentQ, totalQ } = this.data;
    if (currentQ === totalQ - 1) {
      this.toResult();
      return;
    }
    this.setData({
      currentQ: currentQ + 1,
      countdown: 15,
      selectDone: false,
      selectIndex: -1,
      optionStatus: new Array(this.data.questionList[currentQ+1].options.length).fill('')
    });
    this.startCountdown();
  },

  // 跳转到结果页（修复为 redirectTo，避免页面栈溢出）
  toResult() {
    wx.redirectTo({
      url: `/pages/result/result?score=${this.data.score}&total=${this.data.totalQ*10}`,
    });
    clearInterval(this.data.timer);
  },

  onUnload() {
    clearInterval(this.data.timer);
  }
});