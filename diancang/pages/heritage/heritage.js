// diancang/pages/heritage/heritage.js
Page({
  data: {
    // 典藏馆信息
    galleryName: '吴雅文轩典藏馆',
    galleryMapUrl: '/images/gallery_floor_plan.jpg',

    // 文物数据
    exhibits: [],
    filteredExhibits: [],
    selectedExhibit: null,
    activeExhibitId: '',

    // 分区导航
    activeZone: 'all',
    zones: [
      { id: 'all', name: '全部区域' },
      { id: 'treasures', name: '典藏精品区' },
      { id: 'ancient', name: '古建构件典藏' },
      { id: 'intangible', name: '非遗文物典藏' }
    ],

    // 游览路线
    selectedRoute: 'recommended',
    routes: {
      recommended: ['ex1', 'ex3', 'ex5', 'ex7', 'ex9', 'ex11'],
      quick: ['ex1', 'ex5', 'ex9', 'ex13'],
      deep: ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6', 'ex7', 'ex8'],
      family: ['ex1', 'ex3', 'ex5', 'ex7', 'ex9']
    },
    showRoute: false,
    routeLoading: false,
    routeInfo: {
      type: '推荐路线',
      duration: '45分钟',
      exhibitCount: 6
    },

    // 地图状态
    mapScale: 1,
    mapCenter: { x: 375, y: 500 },
    showLabels: true,

    // 详情面板
    showDetail: false,

    // AI讲解
    showAiModal: false,
    aiExplanation: '',
    aiLoading: false,

    // 热区编辑
    editMode: false,
    isDragging: false,
    currentDragExhibit: null
  },

  onLoad(options) {
    this.loadGalleryData();
  },

  // 加载典藏馆数据
  async loadGalleryData() {
    wx.showLoading({ title: '加载数据中...' });
    try {
      const db = wx.cloud.database();
      const res = await db.collection('gallery_exhibits')
        .get()
        .catch(() => null);

      if (res && res.data && res.data.length > 0) {
        this.setData({
          exhibits: res.data,
          filteredExhibits: res.data
        });
        wx.showToast({ title: '数据加载成功', icon: 'success' });
      } else {
        // 加载模拟数据
        this.loadMockData();
        wx.showToast({ title: '使用模拟数据', icon: 'info' });
      }
    } catch (error) {
      console.error('Error loading gallery data:', error);
      this.loadMockData();
      wx.showToast({ title: '加载失败，使用模拟数据', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  // 加载模拟数据
  loadMockData() {
    const mockExhibits = [
      {
        id: 'ex1',
        number: '001',
        name: '富春山居图·剩山图',
        zone: 'treasures',
        zoneName: '典藏精品区',
        era: '元代',
        position: { x: 100, y: 150, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '黄公望晚年代表作，描绘富春江两岸山水风光，笔法精妙，意境深远。',
        value: '此卷为《富春山居图》前段，与台北故宫博物院藏《无用师卷》合为全璧，是中国山水画的巅峰之作。'
      },
      {
        id: 'ex2',
        number: '002',
        name: '清明上河图局部',
        zone: 'treasures',
        zoneName: '典藏精品区',
        era: '宋代',
        position: { x: 200, y: 150, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '张择端所绘，描绘北宋都城汴京的繁华景象。',
        value: '生动记录了北宋时期的社会生活，具有极高的历史和艺术价值。'
      },
      {
        id: 'ex3',
        number: '003',
        name: '明清官式建筑斗拱',
        zone: 'ancient',
        zoneName: '古建构件典藏',
        era: '清代',
        position: { x: 100, y: 250, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '官式建筑木构构件，用于支撑屋檐，兼具结构和装饰功能。',
        value: '体现了中国古代木构建筑的精湛技艺，是传统建筑文化的重要载体。'
      },
      {
        id: 'ex4',
        number: '004',
        name: '徽州木雕窗棂',
        zone: 'ancient',
        zoneName: '古建构件典藏',
        era: '明代',
        position: { x: 200, y: 250, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '徽州民居建筑装饰构件，雕刻精美，题材丰富。',
        value: '反映了徽州地区的工艺水平和文化特色，是传统建筑装饰的典范。'
      },
      {
        id: 'ex5',
        number: '005',
        name: '苏州刺绣精品',
        zone: 'intangible',
        zoneName: '非遗文物典藏',
        era: '现代',
        position: { x: 100, y: 350, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '苏州刺绣代表作，针法细腻，色彩丰富，形象逼真。',
        value: '体现了苏州刺绣的精湛技艺，是国家级非物质文化遗产的重要代表。'
      },
      {
        id: 'ex6',
        number: '006',
        name: '景德镇青花瓷',
        zone: 'intangible',
        zoneName: '非遗文物典藏',
        era: '清代',
        position: { x: 200, y: 350, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '景德镇窑口出品的青花瓷，胎质细腻，釉面光亮，纹饰精美。',
        value: '展现了中国传统制瓷工艺的高超水平，是陶瓷艺术的珍品。'
      }
    ];

    this.setData({
      exhibits: mockExhibits,
      filteredExhibits: mockExhibits
    });
  },

  // 切换分区
  switchZone(e) {
    const zone = e.currentTarget.dataset.zone;
    this.setData({ activeZone: zone });

    // 筛选文物
    let filtered = this.data.exhibits;
    if (zone !== 'all') {
      filtered = this.data.exhibits.filter(exhibit => exhibit.zone === zone);
    }
    this.setData({ filteredExhibits: filtered });
  },

  // 选择游览路线
  async selectRoute(e) {
    const route = e.currentTarget.dataset.route;
    this.setData({ selectedRoute: route, showRoute: true, routeLoading: true });

    // 更新路线信息
    const routeInfoMap = {
      recommended: { type: '推荐路线', duration: '45分钟', exhibitCount: 6 },
      quick: { type: '快速打卡', duration: '20分钟', exhibitCount: 4 },
      deep: { type: '深度研学', duration: '90分钟', exhibitCount: 8 },
      family: { type: '亲子路线', duration: '60分钟', exhibitCount: 5 }
    };
    this.setData({ routeInfo: routeInfoMap[route] || routeInfoMap.recommended });

    // 调用AI生成个性化路线
    await this.generateAiRoute(route);

    this.drawRoute();
    this.setData({ routeLoading: false });
  },

  // 生成AI路线
  async generateAiRoute(routeType) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'heritageAI',
        data: {
          type: 'route',
          routeType: routeType,
          exhibits: this.data.exhibits
        }
      });

      if (result && result.route) {
        this.setData({
          routes: {
            ...this.data.routes,
            [routeType]: result.route
          }
        });
      } else {
        wx.showToast({
          title: 'AI路线生成失败，使用预设路线',
          icon: 'none',
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Error generating AI route:', error);
      wx.showToast({
        title: '网络错误，使用预设路线',
        icon: 'none',
        duration: 2000
      });
      // 降级方案：使用预设路线
    }
  },

  // 绘制路线
  drawRoute() {
    const ctx = wx.createCanvasContext('routeCanvas');
    const route = this.data.routes[this.data.selectedRoute];
    const exhibits = this.data.exhibits;

    if (!route || route.length < 2) return;

    // 绘制路线
    ctx.setStrokeStyle('#ff6b35');
    ctx.setLineWidth(4);
    ctx.setLineCap('round');
    ctx.setLineJoin('round');

    for (let i = 0; i < route.length - 1; i++) {
      const fromExhibit = exhibits.find(e => e.id === route[i]);
      const toExhibit = exhibits.find(e => e.id === route[i + 1]);

      if (fromExhibit && toExhibit) {
        const fromX = fromExhibit.position.x + fromExhibit.position.width / 2;
        const fromY = fromExhibit.position.y + fromExhibit.position.height / 2;
        const toX = toExhibit.position.x + toExhibit.position.width / 2;
        const toY = toExhibit.position.y + toExhibit.position.height / 2;

        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
        }
        ctx.lineTo(toX, toY);
      }
    }

    ctx.stroke();
    ctx.draw();
  },

  // 选择文物
  selectExhibit(e) {
    const id = e.currentTarget.dataset.id;
    const exhibit = this.data.exhibits.find(e => e.id === id);

    if (exhibit) {
      this.setData({
        selectedExhibit: exhibit,
        activeExhibitId: id,
        showDetail: true
      });
    }
  },

  // 关闭详情面板
  closeDetail() {
    this.setData({
      showDetail: false,
      activeExhibitId: ''
    });
  },

  // 显示AI讲解
  async showAiExplanation() {
    if (!this.data.selectedExhibit) return;

    this.setData({ showAiModal: true, aiLoading: true, aiExplanation: '' });

    try {
      const { id, name, description } = this.data.selectedExhibit;

      const { result } = await wx.cloud.callFunction({
        name: 'heritageAI',
        data: {
          type: 'explanation',
          exhibitId: id,
          params: {
            name: name,
            description: description
          }
        }
      });

      if (result && result.result) {
        this.setData({
          aiExplanation: result.result,
          aiLoading: false
        });
      } else {
        this.setData({
          aiExplanation: `这是${this.data.selectedExhibit.name}的智能讲解。该文物年代为${this.data.selectedExhibit.era}，属于${this.data.selectedExhibit.zoneName}。${this.data.selectedExhibit.description}`,
          aiLoading: false
        });
        wx.showToast({
          title: 'AI讲解生成失败，使用默认讲解',
          icon: 'none',
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Error calling AI explanation:', error);
      // 降级方案
      this.setData({
        aiExplanation: `这是${this.data.selectedExhibit.name}的智能讲解。该文物年代为${this.data.selectedExhibit.era}，属于${this.data.selectedExhibit.zoneName}。${this.data.selectedExhibit.description}`,
        aiLoading: false
      });
      wx.showToast({
        title: '网络错误，使用默认讲解',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 隐藏AI讲解
  hideAiModal() {
    this.setData({ showAiModal: false });
  },

  // 重置地图
  resetMap() {
    this.setData({
      mapScale: 1,
      mapCenter: { x: 375, y: 500 }
    });
  },

  // 切换标签显示
  toggleLabels() {
    this.setData({
      showLabels: !this.data.showLabels
    });
  },

  // 切换路线显示
  toggleRoute() {
    this.setData({
      showRoute: !this.data.showRoute
    });
  },

  // 全屏地图
  showFullMap() {
    wx.navigateTo({
      url: '/diancang/pages/full-map/full-map'
    });
  },

  // 上传平面图
  uploadMap() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        const fileName = `gallery_map_${Date.now()}.jpg`;

        wx.showLoading({ title: '上传中...' });

        wx.cloud.uploadFile({
          cloudPath: `gallery_maps/${fileName}`,
          filePath: tempFilePaths[0],
          success: (uploadRes) => {
            const fileID = uploadRes.fileID;

            // 更新地图URL
            this.setData({ galleryMapUrl: fileID });

            // 保存到数据库
            wx.cloud.database().collection('gallery_settings').doc('map_config').set({
              data: {
                mapUrl: fileID,
                updatedAt: new Date()
              }
            }).catch(err => {
              console.error('保存地图配置失败:', err);
            });

            wx.showToast({ title: '上传成功', icon: 'success' });
          },
          fail: (err) => {
            console.error('上传失败:', err);
            wx.showToast({ title: '上传失败', icon: 'none' });
          },
          complete: () => {
            wx.hideLoading();
          }
        });
      }
    });
  },

  // 切换编辑模式
  toggleEditMode() {
    this.setData({ editMode: !this.data.editMode });
    wx.showToast({
      title: this.data.editMode ? '进入编辑模式' : '退出编辑模式',
      icon: 'success'
    });
  },

  // 地图点击事件
  handleMapTap(e) {
    if (!this.data.editMode) return;

    const { x, y } = e.detail;

    // 显示添加热区的对话框
    wx.showModal({
      title: '添加热区',
      content: '请输入展品信息',
      editable: true,
      placeholderText: '展品名称',
      success: (res) => {
        if (res.confirm && res.content) {
          const exhibitName = res.content;
          const newExhibit = {
            id: `ex${Date.now()}`,
            number: `${this.data.exhibits.length + 1}`,
            name: exhibitName,
            zone: 'treasures',
            zoneName: '典藏精品区',
            era: '未知',
            position: {
              x: x - 30,
              y: y - 30,
              width: 60,
              height: 60
            },
            image: '',
            description: '',
            value: ''
          };

          const updatedExhibits = [...this.data.exhibits, newExhibit];
          this.setData({ exhibits: updatedExhibits, filteredExhibits: updatedExhibits });

          // 保存到数据库
          this.saveExhibits();

          wx.showToast({ title: '热区添加成功', icon: 'success' });
        }
      }
    });
  },

  // 开始拖拽热区
  startDrag(e) {
    if (!this.data.editMode) return;

    const id = e.currentTarget.dataset.id;
    this.setData({ isDragging: true, currentDragExhibit: id });
  },

  // 拖拽热区
  dragHotspot(e) {
    if (!this.data.isDragging || !this.data.currentDragExhibit) return;

    const { x, y } = e.detail;
    const updatedExhibits = this.data.exhibits.map(exhibit => {
      if (exhibit.id === this.data.currentDragExhibit) {
        return {
          ...exhibit,
          position: {
            ...exhibit.position,
            x: x - exhibit.position.width / 2,
            y: y - exhibit.position.height / 2
          }
        };
      }
      return exhibit;
    });

    this.setData({ exhibits: updatedExhibits, filteredExhibits: updatedExhibits });
  },

  // 结束拖拽
  endDrag() {
    if (this.data.isDragging) {
      this.setData({ isDragging: false, currentDragExhibit: null });
      // 保存到数据库
      this.saveExhibits();
    }
  },

  // 保存展品数据
  saveExhibits() {
    wx.cloud.database().collection('gallery_exhibits').remove({})
      .then(() => {
        const batch = wx.cloud.database().command.batch();
        this.data.exhibits.forEach(exhibit => {
          batch.add({ data: exhibit });
        });
        return batch.commit();
      })
      .catch(err => {
        console.error('保存展品失败:', err);
      });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `${this.data.galleryName}典藏导览`,
      path: '/diancang/pages/heritage/heritage',
      imageUrl: this.data.galleryMapUrl
    };
  }
});
