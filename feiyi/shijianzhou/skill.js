Page({
  data: {
    // 当前选中非遗项目索引
    currentSkill: 0,
    // 当前选中工序步骤
    currentStep: 0,
    // 放大镜弹窗显示状态
    showMagnifier: false,
    // 步骤切换动画
    stepAnimation: {},
    // 非遗项目列表（剪纸/刺绣/漆器/竹编，匹配需求3-5个）
    skillList: [
      {
        id: 1,
        name: "剪纸",
        steps: [
          {
            id: 101,
            stepName: "画稿设计",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/cf420fe5b33cb0acc15d944d9a667b93.jpg",
            desc: "以宣纸为底，勾勒剪纸纹样轮廓，确定线条疏密与对称关系，是剪纸的基础环节。",
            isKeyStep: false
          },
          {
            id: 102,
            stepName: "起刀定位",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ebf4ae521d7adfab45befadb34e2257b.jpg",
            detailImgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/20f2d2bc8c5a61a585fdb5d19d947b9c.jpg",
            desc: "选择纹样边缘或内部入刀，确定初始裁剪点，避免线条断裂。",
            detailDesc: "起刀时刀刃需与纸面呈45°角，入刀深度控制在纸张厚度的2/3，确保切口平滑无毛刺，这是剪纸“不破线”的关键。",
            isKeyStep: true
          },
          {
            id: 103,
            stepName: "镂空裁剪",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d54d53d414a55d191364ff3dee1a8bb4.jpg",
            desc: "从内到外依次裁剪细小镂空部分，先难后易，保证纹样完整性。",
            isKeyStep: false
          },
          {
            id: 104,
            stepName: "轮廓收尾",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/56b5dfc1f31f2a4801f9c331bbf36956.jpg",
            desc: "最后裁剪外轮廓，保留关键连接点，避免纹样散落。",
            isKeyStep: false
          }
          // 可继续扩展至10-20步
        ]
      },
      {
        id: 2,
        name: "苏绣",
        steps: [
          {
            id: 201,
            stepName: "选线劈丝",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c94f668ed5f9200851cf2f3677507646.jpg",
            detailImgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/32d3be002a03fdc5c54211b7e3496312.jpg",
            desc: "选取桑蚕丝线，按纹样需求劈成细缕，最细可至1/48根线。",
            detailDesc: "劈丝时需顺着丝线纹理，用指腹轻捻分离，力度均匀才能保证丝线不打结、不起毛，劈丝越细，绣面越细腻。",
            isKeyStep: true
          },
          {
            id: 202,
            stepName: "绷框固定",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/46c9a7b852e9078067c18a73c34461db.jpg",
            desc: "将底料固定在绣框上，保持布料平整无褶皱。",
            isKeyStep: false
          }
          // 可继续扩展至10-20步
        ]
      },
      {
        id: 3,
        name: "漆器",
        steps: [
          {
            id: 301,
            stepName: "木胎打磨",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c24c96d1a70b674a9d33255cbf4924b1.jpg",
            desc: "选用樟木/楠木制作胎体，反复打磨至表面如镜。",
            isKeyStep: false
          },
          {
            id: 302,
            stepName: "髹漆上底",
            imgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/2312da0bc295198fc0a2e73a640f1c65.jpg",
            detailImgUrl: "cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/6b00d89e6bdebf0ace673f90813d9f95.jpg",
            desc: "均匀涂抹生漆，每遍漆需阴干72小时，反复髹涂至厚度达标。",
            detailDesc: "髹漆时需用牛尾刷顺纹理涂刷，漆层厚度控制在0.1mm以内，过厚易开裂，过薄易露胎，是漆器质感的核心工序。",
            isKeyStep: true
          }
          // 可继续扩展至10-20步
        ]
      }
    ],
    // 当前选中非遗的工序数据
    currentSkillData: {}
  },

  onLoad(options) {
    // 初始化默认显示第一个非遗项目
    this.setData({
      currentSkillData: this.data.skillList[0]
    });
    // 初始化步骤切换动画
    this.initAnimation();
  },

  // 初始化步骤切换动画（古风慢动作）
  initAnimation() {
    const animation = wx.createAnimation({
      duration: 800, // 慢动作，匹配古风节奏
      timingFunction: "ease-out"
    });
    this.animation = animation;
  },

  // 切换非遗项目
  switchSkill(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentSkill: index,
      currentStep: 0,
      currentSkillData: this.data.skillList[index]
    });
    // 切换项目时触发动画
    this.animation.opacity(0).translateY(20).step();
    this.setData({ stepAnimation: this.animation.export() });
    setTimeout(() => {
      this.animation.opacity(1).translateY(0).step();
      this.setData({ stepAnimation: this.animation.export() });
    }, 400);
  },

  // 时间轴滑动监听（可选：自动匹配当前步骤）
  onTimelineScroll(e) {
    // 如需滑动时间轴自动切换步骤，可根据scrollLeft计算，示例暂保留点击切换
  },

  // 点击时间轴步骤切换
  selectStep(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentStep: index });
    // 步骤切换动画（淡入淡出+轻微位移）
    this.animation.opacity(0).translateY(20).step();
    this.setData({ stepAnimation: this.animation.export() });
    setTimeout(() => {
      this.animation.opacity(1).translateY(0).step();
      this.setData({ stepAnimation: this.animation.export() });
    }, 400);
  },

  // 打开放大镜弹窗
  openMagnifier() {
    this.setData({ showMagnifier: true });
  },

  // 关闭放大镜弹窗
  closeMagnifier() {
    this.setData({ showMagnifier: false });
  },

  // 阻止弹窗点击穿透
  stopPropagation() {}
});