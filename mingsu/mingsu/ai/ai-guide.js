// mingsu/mingsu/ai/ai-guide.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 平面图相关
    venueMapUrl: '',

    // 分区相关
    zones: [
      { id: 'festival', name: '节庆习俗' },
      { id: 'wedding', name: '婚嫁礼仪' },
      { id: 'heritage', name: '非遗市集' },
      { id: 'architecture', name: '传统建筑' }
    ],
    activeZone: 'festival',

    // 路线相关
    routeOptions: [
      { id: 'recommended', name: '推荐路线', desc: '经典游览路线' },
      { id: 'family', name: '亲子民俗', desc: '适合家庭游玩' },
      { id: 'experience', name: '非遗体验', desc: '深度体验非遗' },
      { id: 'festival', name: '节庆打卡', desc: '节日特色路线' }
    ],
    routeType: 'recommended',
    routeLoading: false,
    showRoute: false,

    // 点位相关
    points: [
      {
        id: 'point1',
        name: '春节习俗',
        description: '春节是中国最重要的传统节日，包含贴春联、吃年夜饭、放鞭炮等习俗。',
        position: { x: 100, y: 100 },
        number: 1,
        zone: 'festival',
        aiStory: ''
      },
      {
        id: 'point2',
        name: '中秋习俗',
        description: '中秋节是团圆的节日，人们会赏月、吃月饼、家人团聚。',
        position: { x: 300, y: 150 },
        number: 2,
        zone: 'festival',
        aiStory: ''
      },
      {
        id: 'point3',
        name: '传统婚礼',
        description: '中国传统婚礼包含三书六礼、拜堂、洞房等环节。',
        position: { x: 200, y: 300 },
        number: 3,
        zone: 'wedding',
        aiStory: ''
      },
      {
        id: 'point4',
        name: '剪纸艺术',
        description: '剪纸是中国传统民间艺术，用剪刀或刻刀在纸上剪刻花纹。',
        position: { x: 400, y: 250 },
        number: 4,
        zone: 'heritage',
        aiStory: ''
      },
      {
        id: 'point5',
        name: '传统建筑',
        description: '中国传统建筑以木结构为主，注重对称和风水。',
        position: { x: 300, y: 400 },
        number: 5,
        zone: 'architecture',
        aiStory: ''
      }
    ],
    filteredPoints: [],
    activePointId: '',
    selectedPoint: null,
    showDetail: false,

    // 热区编辑相关
    editMode: false,
    draggingPoint: null,

    // AI生成相关
    showAiModal: false,

    // 本地库
    localStories: {
      'point1': '春节是中国最重要的传统节日，起源于殷商时期。在这一天，人们会贴春联、挂灯笼、吃年夜饭、放鞭炮，象征着辞旧迎新、团圆幸福。春节期间，还有拜年、发压岁钱等传统习俗，充满了喜庆和欢乐的氛围。',
      'point2': '中秋节是中国传统的团圆节日，通常在农历八月十五。这一天，月亮最圆最亮，人们会赏月、吃月饼、品尝各种应季水果。中秋节的起源与古代的祭月习俗有关，后来逐渐演变成家人团聚的重要节日。',
      'point3': '中国传统婚礼有着悠久的历史和丰富的习俗。从纳采、问名、纳吉、纳征、请期到亲迎，形成了完整的六礼流程。婚礼当天，新人会拜天地、拜高堂、夫妻对拜，象征着对天地的敬畏和对父母的感恩。',
      'point4': '剪纸是中国传统民间艺术之一，有着悠久的历史。剪纸艺人用剪刀或刻刀在纸上剪刻出各种花纹和图案，常用于装饰窗户、墙壁等。剪纸作品题材广泛，包括花鸟、人物、吉祥图案等，体现了劳动人民的智慧和审美情趣。',
      'point5': '中国传统建筑以木结构为主，注重对称和风水。传统建筑的特点包括斗拱、飞檐、榫卯结构等，不仅美观实用，而且体现了中国传统文化的哲学思想。从宫殿、庙宇到民居，都展现了中国传统建筑的独特魅力。'
    },

    // 路线数据
    routes: {
      recommended: ['point1', 'point2', 'point4', 'point5'],
      family: ['point1', 'point3', 'point4'],
      experience: ['point4', 'point5', 'point3'],
      festival: ['point1', 'point2']
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化数据
    this.filterPointsByZone();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 上传地图
  uploadMap() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ venueMapUrl: res.tempFilePaths[0] });
      }
    });
  },

  // 切换分区
  switchZone(e) {
    const zoneId = e.currentTarget.dataset.id;
    this.setData({ activeZone: zoneId });
    this.filterPointsByZone();
  },

  // 根据分区筛选点位
  filterPointsByZone() {
    const { points, activeZone } = this.data;
    const filteredPoints = points.filter(point => point.zone === activeZone);
    this.setData({ filteredPoints });
  },

  // 选择路线
  selectRoute(e) {
    const routeId = e.currentTarget.dataset.id;
    this.setData({ routeType: routeId, routeLoading: true });

    // 模拟AI生成路线
    setTimeout(() => {
      this.setData({ routeLoading: false, showRoute: true });
      this.drawRoute();
    }, 1000);
  },

  // 绘制路线
  drawRoute() {
    const { routes, routeType, points } = this.data;
    const route = routes[routeType];

    if (!route || route.length < 2) return;

    const canvasCtx = wx.createCanvasContext('routeCanvas');
    canvasCtx.setStrokeStyle('#8B4513');
    canvasCtx.setLineWidth(4);

    // 绘制路线
    route.forEach((pointId, index) => {
      const point = points.find(p => p.id === pointId);
      if (point) {
        if (index === 0) {
          canvasCtx.moveTo(point.position.x, point.position.y);
        } else {
          canvasCtx.lineTo(point.position.x, point.position.y);
        }
      }
    });

    canvasCtx.stroke();
    canvasCtx.draw();
  },

  // 切换编辑模式
  toggleEditMode() {
    this.setData({ editMode: !this.data.editMode });
  },

  // 添加热区
  addHotspot() {
    const { points } = this.data;
    const newPoint = {
      id: `point${points.length + 1}`,
      name: `新点位${points.length + 1}`,
      description: '请编辑点位描述',
      position: { x: 200, y: 200 },
      number: points.length + 1,
      zone: this.data.activeZone,
      aiStory: ''
    };

    const updatedPoints = [...points, newPoint];
    this.setData({ points: updatedPoints });
    this.filterPointsByZone();
  },

  // 开始拖动热区
  startDrag(e) {
    const pointId = e.currentTarget.dataset.id;
    this.setData({ draggingPoint: pointId });
  },

  // 拖动热区
  dragHotspot(e) {
    if (!this.data.draggingPoint) return;

    const { x, y } = e.touches[0];
    const { points } = this.data;

    const updatedPoints = points.map(point => {
      if (point.id === this.data.draggingPoint) {
        return { ...point, position: { x: x - 50, y: y - 50 } };
      }
      return point;
    });

    this.setData({ points: updatedPoints });
    this.filterPointsByZone();
  },

  // 结束拖动
  endDrag() {
    this.setData({ draggingPoint: null });
  },

  // 选择点位
  selectPoint(e) {
    const pointId = e.currentTarget.dataset.id;
    const point = this.data.points.find(p => p.id === pointId);

    if (point) {
      this.setData({
        selectedPoint: point,
        activePointId: pointId,
        showDetail: true
      });
    }
  },

  // 关闭详情
  closeDetail() {
    this.setData({ showDetail: false, selectedPoint: null, activePointId: '' });
  },

  // 生成AI背景故事
  generateAIStory() {
    const { selectedPoint } = this.data;
    if (!selectedPoint) return;

    this.setData({ showAiModal: true });

    try {
      // 尝试使用本地库
      const localStory = this.data.localStories[selectedPoint.id];
      if (localStory) {
        // 使用本地故事
        setTimeout(() => {
          try {
            const updatedPoints = this.data.points.map(point => {
              if (point.id === selectedPoint.id) {
                return { ...point, aiStory: localStory };
              }
              return point;
            });

            this.setData({
              points: updatedPoints,
              selectedPoint: { ...selectedPoint, aiStory: localStory },
              showAiModal: false
            });
          } catch (error) {
            console.error('更新本地故事失败:', error);
            this.setData({ showAiModal: false });
          }
        }, 1000);
      } else {
        // 模拟AI生成
        setTimeout(() => {
          try {
            const aiStory = `这是关于${selectedPoint.name}的AI生成背景故事。${selectedPoint.description}通过AI技术，我们可以更深入地了解这个民俗文化的内涵和历史。`;

            const updatedPoints = this.data.points.map(point => {
              if (point.id === selectedPoint.id) {
                return { ...point, aiStory };
              }
              return point;
            });

            this.setData({
              points: updatedPoints,
              selectedPoint: { ...selectedPoint, aiStory },
              showAiModal: false
            });
          } catch (error) {
            console.error('更新AI故事失败:', error);
            this.setData({ showAiModal: false });
          }
        }, 2000);
      }
    } catch (error) {
      console.error('生成AI故事失败:', error);
      this.setData({ showAiModal: false });
    }
  },

  // 复位地图
  resetMap() {
    // 复位地图到初始状态
    this.setData({ showRoute: false });
  },

  // 切换标签
  toggleLabels() {
    // 切换标签显示
  },

  // 切换路线
  toggleRoute() {
    this.setData({ showRoute: !this.data.showRoute });
  },

  // 分享
  share() {
    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  // 开始导览
  startGuide() {
    wx.showToast({
      title: '开始导览',
      icon: 'success'
    });
  },

  // 处理地图点击
  handleMapTap() {
    if (this.data.editMode) return;
    // 点击地图空白区域关闭详情
    if (this.data.showDetail) {
      this.closeDetail();
    }
  }
})