const questionBank = [
  { question: "斗拱是中国古建筑中哪个部分的构件？", options: [{ tag: "A", text: "屋顶与柱之间" }, { tag: "B", text: "墙体" }, { tag: "C", text: "台基" }, { tag: "D", text: "门窗" }], answer: "A" },
  { question: "下列哪个不属于中国四大名楼？", options: [{ tag: "A", text: "黄鹤楼" }, { tag: "B", text: "岳阳楼" }, { tag: "C", text: "滕王阁" }, { tag: "D", text: "雷峰塔" }], answer: "D" },
  { question: "故宫始建于哪个朝代？", options: [{ tag: "A", text: "唐朝" }, { tag: "B", text: "宋朝" }, { tag: "C", text: "明朝" }, { tag: "D", text: "清朝" }], answer: "C" },
  { question: "长城的主要建筑材料不包括？", options: [{ tag: "A", text: "青砖" }, { tag: "B", text: "石材" }, { tag: "C", text: "玻璃" }, { tag: "D", text: "夯土" }], answer: "C" },
  { question: "四合院是哪个地区的典型民居？", options: [{ tag: "A", text: "北京" }, { tag: "B", text: "江南" }, { tag: "C", text: "福建" }, { tag: "D", text: "陕西" }], answer: "A" },
  { question: "拙政园位于哪里？", options: [{ tag: "A", text: "苏州" }, { tag: "B", text: "杭州" }, { tag: "C", text: "扬州" }, { tag: "D", text: "无锡" }], answer: "A" },
  { question: "应县木塔属于哪种结构？", options: [{ tag: "A", text: "全木构" }, { tag: "B", text: "砖木结构" }, { tag: "C", text: "石结构" }, { tag: "D", text: "钢结构" }], answer: "A" },
  { question: "飞檐的主要作用是？", options: [{ tag: "A", text: "排水与美观" }, { tag: "B", text: "承重" }, { tag: "C", text: "防火" }, { tag: "D", text: "加固" }], answer: "A" },
  { question: "孔庙大成殿屋顶样式是？", options: [{ tag: "A", text: "重檐歇山顶" }, { tag: "B", text: "硬山顶" }, { tag: "C", text: "悬山顶" }, { tag: "D", text: "攒尖顶" }], answer: "A" },
  { question: "窑洞主要分布在？", options: [{ tag: "A", text: "黄土高原" }, { tag: "B", text: "云贵高原" }, { tag: "C", text: "内蒙古" }, { tag: "D", text: "东北" }], answer: "A" },
  { question: "佛光寺大殿建于哪个朝代？", options: [{ tag: "A", text: "唐代" }, { tag: "B", text: "宋代" }, { tag: "C", text: "元代" }, { tag: "D", text: "明代" }], answer: "A" },
  { question: "下列哪个是园林建筑？", options: [{ tag: "A", text: "亭台楼阁" }, { tag: "B", text: "城墙" }, { tag: "C", text: "烽火台" }, { tag: "D", text: "陵墓" }], answer: "A" },
  { question: "瓦当最初的作用是？", options: [{ tag: "A", text: "保护屋檐" }, { tag: "B", text: "装饰" }, { tag: "C", text: "祈福" }, { tag: "D", text: "标识" }], answer: "A" },
  { question: "中国古代建筑以什么为主材？", options: [{ tag: "A", text: "木材" }, { tag: "B", text: "石材" }, { tag: "C", text: "砖" }, { tag: "D", text: "混凝土" }], answer: "A" },
  { question: "太和殿是干什么用的？", options: [{ tag: "A", text: "举行大典" }, { tag: "B", text: "皇帝居住" }, { tag: "C", text: "藏书" }, { tag: "D", text: "祭祀" }], answer: "A" },
  { question: "马头墙是哪里的建筑特色？", options: [{ tag: "A", text: "江南民居" }, { tag: "B", text: "北方民居" }, { tag: "C", text: "岭南民居" }, { tag: "D", text: "西南民居" }], answer: "A" },
  { question: "布达拉宫始建于？", options: [{ tag: "A", text: "唐代" }, { tag: "B", text: "宋代" }, { tag: "C", text: "元代" }, { tag: "D", text: "明代" }], answer: "A" },
  { question: "下列哪个是塔的功能？", options: [{ tag: "A", text: "藏经或供奉" }, { tag: "B", text: "居住" }, { tag: "C", text: "议政" }, { tag: "D", text: "练兵" }], answer: "A" },
  { question: "台基的作用不包括？", options: [{ tag: "A", text: "采光" }, { tag: "B", text: "防潮" }, { tag: "C", text: "承重" }, { tag: "D", text: "彰显等级" }], answer: "A" },
  { question: "藻井一般出现在？", options: [{ tag: "A", text: "殿堂天花板" }, { tag: "B", text: "外墙" }, { tag: "C", text: "门窗" }, { tag: "D", text: "台阶" }], answer: "A" },
  { question: "苏州园林属于哪种风格？", options: [{ tag: "A", text: "江南写意" }, { tag: "B", text: "皇家气派" }, { tag: "C", text: "西北粗犷" }, { tag: "D", text: "岭南精巧" }], answer: "A" },
  { question: "硬山顶的特点是？", options: [{ tag: "A", text: "两侧山墙齐平" }, { tag: "B", text: "屋檐出山墙" }, { tag: "C", text: "多层屋檐" }, { tag: "D", text: "圆形屋顶" }], answer: "A" },
  { question: "下列哪个是皇家园林？", options: [{ tag: "A", text: "颐和园" }, { tag: "B", text: "留园" }, { tag: "C", text: "狮子林" }, { tag: "D", text: "豫园" }], answer: "A" },
  { question: "榫卯的优势是？", options: [{ tag: "A", text: "抗震强" }, { tag: "B", text: "速度快" }, { tag: "C", text: "成本低" }, { tag: "D", text: "防火" }], answer: "A" },
  { question: "华表的作用是？", options: [{ tag: "A", text: "标识与礼仪" }, { tag: "B", text: "防御" }, { tag: "C", text: "排水" }, { tag: "D", text: "支撑" }], answer: "A" },
  { question: "土楼主要分布在？", options: [{ tag: "A", text: "福建" }, { tag: "B", text: "安徽" }, { tag: "C", text: "山西" }, { tag: "D", text: "四川" }], answer: "A" },
  { question: "赵州桥是什么结构？", options: [{ tag: "A", text: "石拱桥" }, { tag: "B", text: "梁桥" }, { tag: "C", text: "吊桥" }, { tag: "D", text: "浮桥" }], answer: "A" },
  { question: "歇山顶有几条屋脊？", options: [{ tag: "A", text: "9条" }, { tag: "B", text: "5条" }, { tag: "C", text: "7条" }, { tag: "D", text: "11条" }], answer: "A" },
  { question: "古代建筑色彩等级最高的是？", options: [{ tag: "A", text: "黄色" }, { tag: "B", text: "红色" }, { tag: "C", text: "绿色" }, { tag: "D", text: "蓝色" }], answer: "A" },
  { question: "影壁的作用是？", options: [{ tag: "A", text: "遮挡视线" }, { tag: "B", text: "承重" }, { tag: "C", text: "通风" }, { tag: "D", text: "防火" }], answer: "A" },
  { question: "祈年殿屋顶是？", options: [{ tag: "A", text: "圆形攒尖顶" }, { tag: "B", text: "庑殿顶" }, { tag: "C", text: "歇山顶" }, { tag: "D", text: "卷棚顶" }], answer: "A" },
  { question: "下列哪个不属于宫殿建筑？", options: [{ tag: "A", text: "藏经阁" }, { tag: "B", text: "太和殿" }, { tag: "C", text: "乾清宫" }, { tag: "D", text: "坤宁宫" }], answer: "A" },
  { question: "江南民居白墙黛瓦，黛瓦是？", options: [{ tag: "A", text: "青黑色瓦" }, { tag: "B", text: "蓝色瓦" }, { tag: "C", text: "灰色瓦" }, { tag: "D", text: "绿色瓦" }], answer: "A" },
  { question: "古代建筑中“间”是指？", options: [{ tag: "A", text: "四柱围合空间" }, { tag: "B", text: "一个房间" }, { tag: "C", text: "一层楼" }, { tag: "D", text: "一面墙" }], answer: "A" },
  { question: "下列哪个是防御建筑？", options: [{ tag: "A", text: "关隘" }, { tag: "B", text: "轩榭" }, { tag: "C", text: "佛塔" }, { tag: "D", text: "亭台" }], answer: "A" },
  { question: "晋派建筑主要在？", options: [{ tag: "A", text: "山西" }, { tag: "B", text: "山东" }, { tag: "C", text: "湖南" }, { tag: "D", text: "江西" }], answer: "A" },
  { question: "庑殿顶是哪个等级？", options: [{ tag: "A", text: "最高" }, { tag: "B", text: "中等" }, { tag: "C", text: "较低" }, { tag: "D", text: "最低" }], answer: "A" },
  { question: "园林中“借景”是指？", options: [{ tag: "A", text: "引外景入园" }, { tag: "B", text: "种植花草" }, { tag: "C", text: "堆砌假山" }, { tag: "D", text: "开挖水池" }], answer: "A" },
  { question: "牌坊的作用是？", options: [{ tag: "A", text: "表彰纪念" }, { tag: "B", text: "居住" }, { tag: "C", text: "防御" }, { tag: "D", text: "储物" }], answer: "A" },
  { question: "大明宫在哪个城市？", options: [{ tag: "A", text: "西安" }, { tag: "B", text: "洛阳" }, { tag: "C", text: "开封" }, { tag: "D", text: "南京" }], answer: "A" },
  { question: "下列哪个是桥梁建筑？", options: [{ tag: "A", text: "卢沟桥" }, { tag: "B", text: "岳阳楼" }, { tag: "C", text: "蓬莱阁" }, { tag: "D", text: "天一阁" }], answer: "A" },
  { question: "卷棚顶的特点是？", options: [{ tag: "A", text: "无正脊，弧线柔和" }, { tag: "B", text: "重檐高大" }, { tag: "C", text: "山墙尖锐" }, { tag: "D", text: "圆形攒尖" }], answer: "A" },
  { question: "古代建筑中“柱”主要作用？", options: [{ tag: "A", text: "承重" }, { tag: "B", text: "装饰" }, { tag: "C", text: "分隔" }, { tag: "D", text: "防火" }], answer: "A" },
  { question: "徽派建筑特色是？", options: [{ tag: "A", text: "白墙黛瓦马头墙" }, { tag: "B", text: "红砖红瓦" }, { tag: "C", text: "土坯墙" }, { tag: "D", text: "石砌墙" }], answer: "A" },
  { question: "天坛用于？", options: [{ tag: "A", text: "祭天" }, { tag: "B", text: "祭祖" }, { tag: "C", text: "阅兵" }, { tag: "D", text: "讲学" }], answer: "A" },
  { question: "下列哪个是民居？", options: [{ tag: "A", text: "四合院" }, { tag: "B", text: "舍利塔" }, { tag: "C", text: "钟楼" }, { tag: "D", text: "鼓楼" }], answer: "A" },
  { question: "斗拱数量越多代表？", options: [{ tag: "A", text: "等级越高" }, { tag: "B", text: "年代越晚" }, { tag: "C", text: "造价越低" }, { tag: "D", text: "结构越简单" }], answer: "A" },
  { question: "石窟属于哪种建筑？", options: [{ tag: "A", text: "宗教建筑" }, { tag: "B", text: "民居建筑" }, { tag: "C", text: "官式建筑" }, { tag: "D", text: "园林建筑" }], answer: "A" },
  { question: "“勾心斗角”形容哪种建筑结构？", options: [{ tag: "A", text: "屋檐交错" }, { tag: "B", text: "梁柱交错" }, { tag: "C", text: "台基交错" }, { tag: "D", text: "门窗交错" }], answer: "A" },
  { question: "下列哪个是宋代建筑著作？", options: [{ tag: "A", text: "《营造法式》" }, { tag: "B", text: "《天工开物》" }, { tag: "C", text: "《梦溪笔谈》" }, { tag: "D", text: "《齐民要术》" }], answer: "A" },
  { question: "台基最高等级是？", options: [{ tag: "A", text: "须弥座" }, { tag: "B", text: "普通台基" }, { tag: "C", text: "砖台基" }, { tag: "D", text: "石台基" }], answer: "A" },
  { question: "园林中“舫”是？", options: [{ tag: "A", text: "石船建筑" }, { tag: "B", text: "真船" }, { tag: "C", text: "亭子" }, { tag: "D", text: "走廊" }], answer: "A" },
  { question: "明十三陵位于？", options: [{ tag: "A", text: "北京" }, { tag: "B", text: "西安" }, { tag: "C", text: "南京" }, { tag: "D", text: "洛阳" }], answer: "A" },
  { question: "悬山顶特点是？", options: [{ tag: "A", text: "屋檐伸出山墙" }, { tag: "B", text: "山墙封檐" }, { tag: "C", text: "多层屋檐" }, { tag: "D", text: "圆形顶" }], answer: "A" },
  { question: "古代城门上的楼是？", options: [{ tag: "A", text: "城楼" }, { tag: "B", text: "钟楼" }, { tag: "C", text: "阁" }, { tag: "D", text: "亭" }], answer: "A" },
  { question: "下列哪个是江南三大名楼？", options: [{ tag: "A", text: "岳阳楼" }, { tag: "B", text: "天一阁" }, { tag: "C", text: "华严阁" }, { tag: "D", text: "烟雨楼" }], answer: "A" },
  { question: "建筑色彩中绿色多用于？", options: [{ tag: "A", text: "王府官署" }, { tag: "B", text: "皇宫" }, { tag: "C", text: "民居" }, { tag: "D", text: "陵墓" }], answer: "A" },
  { question: "“廊”在园林中作用是？", options: [{ tag: "A", text: "连接建筑与遮阳避雨" }, { tag: "B", text: "居住" }, { tag: "C", text: "储物" }, { tag: "D", text: "防御" }], answer: "A" },
  { question: "大雁塔位于？", options: [{ tag: "A", text: "西安" }, { tag: "B", text: "开封" }, { tag: "C", text: "杭州" }, { tag: "D", text: "大理" }], answer: "A" },
  { question: "民居不能用哪种屋顶？", options: [{ tag: "A", text: "重檐庑殿顶" }, { tag: "B", text: "硬山顶" }, { tag: "C", text: "悬山顶" }, { tag: "D", text: "卷棚顶" }], answer: "A" },
  { question: "下列哪个是祭祀建筑？", options: [{ tag: "A", text: "太庙" }, { tag: "B", text: "文华殿" }, { tag: "C", text: "武英殿" }, { tag: "D", text: "养心殿" }], answer: "A" },
  { question: "“金砖”是指？", options: [{ tag: "A", text: "细泥方砖" }, { tag: "B", text: "金子做的砖" }, { tag: "C", text: "黄色砖" }, { tag: "D", text: "琉璃砖" }], answer: "A" },
  { question: "园林假山材料常用？", options: [{ tag: "A", text: "太湖石" }, { tag: "B", text: "花岗岩" }, { tag: "C", text: "大理石" }, { tag: "D", text: "砂岩" }], answer: "A" },
  { question: "“勾连搭”是指？", options: [{ tag: "A", text: "屋顶相连" }, { tag: "B", text: "柱子相连" }, { tag: "C", text: "墙体相连" }, { tag: "D", text: "台基相连" }], answer: "A" },
  { question: "开平碉楼主要功能？", options: [{ tag: "A", text: "防御防盗" }, { tag: "B", text: "观赏" }, { tag: "C", text: "居住为主" }, { tag: "D", text: "祭祀" }], answer: "A" },
  { question: "古代建筑中“门”的等级看？", options: [{ tag: "A", text: "门钉数量" }, { tag: "B", text: "门的大小" }, { tag: "C", text: "门的颜色" }, { tag: "D", text: "门的材质" }], answer: "A" },
  { question: "下列哪个是楼阁式塔？", options: [{ tag: "A", text: "应县木塔" }, { tag: "B", text: "云冈石窟塔" }, { tag: "C", text: "喇嘛塔" }, { tag: "D", text: "密檐塔" }], answer: "A" },
  { question: "“轩”是园林中？", options: [{ tag: "A", text: "高敞的观景建筑" }, { tag: "B", text: "小桥" }, { tag: "C", text: "围墙" }, { tag: "D", text: "水池" }], answer: "A" },
  { question: "故宫太和殿有多少间？", options: [{ tag: "A", text: "11间" }, { tag: "B", text: "9间" }, { tag: "C", text: "7间" }, { tag: "D", text: "5间" }], answer: "A" },
  { question: "“密檐式塔”特点是？", options: [{ tag: "A", text: "底层高，上层密檐" }, { tag: "B", text: "每层都很高" }, { tag: "C", text: "全木结构" }, { tag: "D", text: "有回廊" }], answer: "A" },
  { question: "“覆钵式塔”又称？", options: [{ tag: "A", text: "喇嘛塔" }, { tag: "B", text: "楼阁塔" }, { tag: "C", text: "密檐塔" }, { tag: "D", text: "金刚宝座塔" }], answer: "A" },
  { question: "“阁”与“楼”区别是？", options: [{ tag: "A", text: "阁四面开窗，有回廊" }, { tag: "B", text: "阁更高" }, { tag: "C", text: "楼更轻巧" }, { tag: "D", text: "无区别" }], answer: "A" },
  { question: "“门海”是指？", options: [{ tag: "A", text: "庭院大缸（防火）" }, { tag: "B", text: "海水景观" }, { tag: "C", text: "大门" }, { tag: "D", text: "水池" }], answer: "A" },
  { question: "“金砖墁地”用于哪里？", options: [{ tag: "A", text: "皇宫大殿" }, { tag: "B", text: "普通民居" }, { tag: "C", text: "园林" }, { tag: "D", text: "寺庙偏殿" }], answer: "A" },
  { question: "“垂花门”是哪种建筑的门？", options: [{ tag: "A", text: "四合院" }, { tag: "B", text: "宫殿" }, { tag: "C", text: "寺庙" }, { tag: "D", text: "祠堂" }], answer: "A" },
  { question: "“棂星门”常用于？", options: [{ tag: "A", text: "孔庙、陵墓" }, { tag: "B", text: "民居" }, { tag: "C", text: "商铺" }, { tag: "D", text: "关隘" }], answer: "A" },
  { question: "“望柱”用在？", options: [{ tag: "A", text: "栏杆、桥、华表" }, { tag: "B", text: "屋顶" }, { tag: "C", text: "门窗" }, { tag: "D", text: "梁柱" }], answer: "A" },
  { question: "“雀替”作用是？", options: [{ tag: "A", text: "加固梁柱交接" }, { tag: "B", text: "装饰屋檐" }, { tag: "C", text: "支撑台基" }, { tag: "D", text: "固定门窗" }], answer: "A" },
  { question: "“须弥座”源自？", options: [{ tag: "A", text: "佛教文化" }, { tag: "B", text: "道教文化" }, { tag: "C", text: "儒家礼制" }, { tag: "D", text: "民间习俗" }], answer: "A" },
  { question: "“筒瓦”和“板瓦”用于？", options: [{ tag: "A", text: "屋顶覆盖" }, { tag: "B", text: "墙面" }, { tag: "C", text: "台基" }, { tag: "D", text: "地面" }], answer: "A" }
];
 
Page({
  data: {
    questionBank: questionBank,
    currentQuestion: null,
    index: 0,
    selected: -1,
    score: 0,
    streak: 0,           // 连续正确数
    timer: 30,           // 倒计时
    isSubmitted: false,  // 是否已提交
    isCorrect: false,    // 答案是否正确
    showKnowledge: false,  // 显示知识点
    animationData: {}    // 动画数据
  },

  timerInterval: null,

  onLoad() {
    this.setData({ currentQuestion: questionBank[0] });
    this.startTimer();
  },

  onUnload() {
    this.stopTimer();
  },

  // 倒计时
  startTimer() {
    this.stopTimer();
    this.setData({ timer: 30 });
    this.timerInterval = setInterval(() => {
      const newTimer = this.data.timer - 1;
      if (newTimer <= 0) {
        this.stopTimer();
        this.autoSubmit();
        return;
      }
      this.setData({ timer: newTimer });
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  // 选择选项
  selectOption(e) {
    if (this.data.isSubmitted) return;
    const index = e.currentTarget.dataset.index;
    this.setData({ selected: index });
    wx.vibrateShort({ type: 'light' });
  },

  // 自动提交（超时）
  autoSubmit() {
    if (this.data.selected === -1) {
      this.setData({ selected: 0 }); // 默认选A
    }
    this.submitAnswer();
  },

  // 提交答案
  submitAnswer() {
    const { selected, currentQuestion, index, score, streak } = this.data;
    if (selected === -1) {
      wx.showToast({ title: "请选择答案", icon: "none" });
      return;
    }

    this.stopTimer();
    const isCorrect = currentQuestion.options[selected].tag === currentQuestion.answer;
    const newScore = isCorrect ? score + 1 : score;
    const newStreak = isCorrect ? streak + 1 : 0;

    // 震动反馈
    wx.vibrateShort({ type: isCorrect ? 'light' : 'heavy' });

    // 播放动画
    if (isCorrect) {
      this.playCorrectAnimation();
    } else {
      this.playWrongAnimation();
    }

    this.setData({
      isSubmitted: true,
      isCorrect: isCorrect,
      score: newScore,
      streak: newStreak
    });

    // 延迟显示知识点
    setTimeout(() => {
      this.setData({ showKnowledge: true });
    }, 600);
  },

  // 正确动画
  playCorrectAnimation() {
    const animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease'
    });
    animation.scale(1.05).step();
    animation.scale(1).step();
    this.setData({ animationData: animation.export() });
  },

  // 错误动画
  playWrongAnimation() {
    const animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    });
    animation.translateX(-10).step();
    animation.translateX(10).step();
    animation.translateX(-10).step();
    animation.translateX(10).step();
    animation.translateX(0).step();
    this.setData({ animationData: animation.export() });
  },

  // 下一题
  nextQuestion() {
    const next = this.data.index + 1;
    if (next >= this.data.questionBank.length) {
      wx.redirectTo({
        url: `/gujianSub/wenda2/wenda2?score=${this.data.score}&total=80&maxStreak=${this.data.streak}`
      });
      return;
    }

    this.setData({
      index: next,
      currentQuestion: this.data.questionBank[next],
      selected: -1,
      isSubmitted: false,
      isCorrect: false,
      showKnowledge: false,
      animationData: {}
    });

    this.startTimer();
  },

  // 查看相关建筑
  viewBuilding(e) {
    const name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: `/gujianSub/building/building?name=${name}`
    });
  },

  // 收藏题目
  favoriteQuestion() {
    const favorites = wx.getStorageSync('favoriteQuestions') || [];
    const current = this.data.currentQuestion;
    if (!favorites.find(q => q.question === current.question)) {
      favorites.push(current);
      wx.setStorageSync('favoriteQuestions', favorites);
      wx.showToast({ title: '已收藏', icon: 'success' });
    }
  },
  // 在 Page 配置中添加
getCorrectIndex() {
  const { currentQuestion } = this.data;
  if (!currentQuestion) return -1;
  return currentQuestion.options.findIndex(opt => opt.tag === currentQuestion.answer);
},

goBack() {
  wx.navigateBack();
},

closeKnowledge() {
  // 点击遮罩不关闭，必须通过按钮继续
}

});
