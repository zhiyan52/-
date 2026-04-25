// mingsu/mingsu/ai-guide/ai-guide.js
Page({
  data: {
    // 民俗场馆信息
    venueName: '中国民俗文化村',
    venueMapUrl: '/images/folklore_floor_plan.jpg',

    // 民俗点位数据
    spots: [],
    filteredSpots: [],
    selectedSpot: null,
    activeSpotId: '',

    // 分区导航
    activeZone: 'all',
    zones: [
      { id: 'all', name: '全部区域' },
      { id: 'festival', name: '节庆习俗' },
      { id: 'wedding', name: '婚嫁礼仪' },
      { id: 'market', name: '非遗市集' },
      { id: 'architecture', name: '传统建筑' }
    ],

    // 游览路线
    selectedRoute: 'recommended',
    routes: {
      recommended: ['sp1', 'sp3', 'sp5', 'sp7', 'sp9'],
      family: ['sp1', 'sp3', 'sp5', 'sp7'],
      intangible: ['sp2', 'sp4', 'sp6', 'sp8'],
      festival: ['sp1', 'sp5', 'sp9', 'sp11']
    },
    showRoute: false,
    routeLoading: false,
    routeInfo: {
      type: '推荐路线',
      duration: '45分钟',
      spotCount: 5
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
    currentDragSpot: null
  },

  onLoad(options) {
    this.loadVenueData();
  },

  // 加载民俗场馆数据
  async loadVenueData() {
    wx.showLoading({ title: '加载数据中...' });
    try {
      const db = wx.cloud.database();
      const res = await db.collection('folklore_spots')
        .get()
        .catch(() => null);

      if (res && res.data && res.data.length > 0) {
        this.setData({
          spots: res.data,
          filteredSpots: res.data
        });
        wx.showToast({ title: '数据加载成功', icon: 'success' });
      } else {
        // 加载模拟数据
        this.loadMockData();
        wx.showToast({ title: '使用模拟数据', icon: 'info' });
      }
    } catch (error) {
      console.error('Error loading venue data:', error);
      this.loadMockData();
      wx.showToast({ title: '加载失败，使用模拟数据', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  // 加载模拟数据
  loadMockData() {
    const mockSpots = [
      {
        id: 'sp1',
        number: '001',
        name: '春节习俗展示区',
        zone: 'festival',
        zoneName: '节庆习俗',
        type: '传统节日',
        position: { x: 100, y: 150, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '展示中国传统春节习俗，包括贴春联、放鞭炮、吃年夜饭等传统活动。',
        story: '春节是中国最重要的传统节日，起源于殷商时期年头岁尾的祭神祭祖活动，至今已有4000多年历史。'
      },
      {
        id: 'sp2',
        number: '002',
        name: '剪纸艺术工坊',
        zone: 'market',
        zoneName: '非遗市集',
        type: '传统工艺',
        position: { x: 200, y: 150, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '展示和体验中国传统剪纸艺术，游客可以亲手制作剪纸作品。',
        story: '剪纸是中国最古老的民间艺术之一，起源于西汉时期，最初用于宗教祭祀活动。'
      },
      {
        id: 'sp3',
        number: '003',
        name: '传统婚礼体验',
        zone: 'wedding',
        zoneName: '婚嫁礼仪',
        type: '传统礼仪',
        position: { x: 100, y: 250, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '体验中国传统婚嫁礼仪，包括花轿、拜堂、洞房等传统婚礼环节。',
        story: '中国传统婚礼仪式繁琐而隆重，融合了儒家礼仪和民间习俗，象征着对婚姻的重视和美好祝愿。'
      },
      {
        id: 'sp4',
        number: '004',
        name: '传统建筑展示',
        zone: 'architecture',
        zoneName: '传统建筑',
        type: '建筑艺术',
        position: { x: 200, y: 250, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '展示中国传统建筑风格，包括四合院、徽派建筑、客家土楼等。',
        story: '中国传统建筑以木结构为主，注重与自然的和谐统一，体现了中国传统文化的哲学思想。'
      },
      {
        id: 'sp5',
        number: '005',
        name: '中秋习俗展示',
        zone: 'festival',
        zoneName: '节庆习俗',
        type: '传统节日',
        position: { x: 100, y: 350, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '展示中秋节的传统习俗，包括赏月、吃月饼、猜灯谜等活动。',
        story: '中秋节起源于古代对月神的祭祀，后来逐渐演变为团圆的象征，成为中国重要的传统节日之一。'
      },
      {
        id: 'sp6',
        number: '006',
        name: '陶艺体验工坊',
        zone: 'market',
        zoneName: '非遗市集',
        type: '传统工艺',
        position: { x: 200, y: 350, width: 60, height: 60 },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        description: '体验中国传统陶艺制作，游客可以亲手制作陶瓷作品。',
        story: '中国陶艺历史悠久，早在新石器时代就已经出现了精美的陶器，是中国传统文化的重要组成部分。'
      }
    ];

    this.setData({
      spots: mockSpots,
      filteredSpots: mockSpots
    });
  },

  // 切换分区
  switchZone(e) {
    const zone = e.currentTarget.dataset.zone;
    this.setData({ activeZone: zone });

    // 筛选点位
    let filtered = this.data.spots;
    if (zone !== 'all') {
      filtered = this.data.spots.filter(spot => spot.zone === zone);
    }
    this.setData({ filteredSpots: filtered });
  },

  // 选择游览路线
  async selectRoute(e) {
    const route = e.currentTarget.dataset.route;
    this.setData({ selectedRoute: route, showRoute: true, routeLoading: true });

    // 更新路线信息
    const routeInfoMap = {
      recommended: { type: '推荐路线', duration: '45分钟', spotCount: 5 },
      family: { type: '亲子民俗路线', duration: '30分钟', spotCount: 4 },
      intangible: { type: '非遗体验路线', duration: '60分钟', spotCount: 4 },
      festival: { type: '节庆打卡路线', duration: '35分钟', spotCount: 4 }
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
          exhibits: this.data.spots
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
    const spots = this.data.spots;

    if (!route || route.length < 2) return;

    // 绘制路线
    ctx.setStrokeStyle('#a0522d');
    ctx.setLineWidth(4);
    ctx.setLineCap('round');
    ctx.setLineJoin('round');

    for (let i = 0; i < route.length - 1; i++) {
      const fromSpot = spots.find(s => s.id === route[i]);
      const toSpot = spots.find(s => s.id === route[i + 1]);

      if (fromSpot && toSpot) {
        const fromX = fromSpot.position.x + fromSpot.position.width / 2;
        const fromY = fromSpot.position.y + fromSpot.position.height / 2;
        const toX = toSpot.position.x + toSpot.position.width / 2;
        const toY = toSpot.position.y + toSpot.position.height / 2;

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

  // 选择点位
  selectSpot(e) {
    const id = e.currentTarget.dataset.id;
    const spot = this.data.spots.find(s => s.id === id);

    if (spot) {
      this.setData({
        selectedSpot: spot,
        activeSpotId: id,
        showDetail: true
      });
    }
  },

  // 关闭详情面板
  closeDetail() {
    this.setData({
      showDetail: false,
      activeSpotId: ''
    });
  },

  // 显示AI讲解
  async showAiExplanation() {
    if (!this.data.selectedSpot) return;

    this.setData({ showAiModal: true, aiLoading: true, aiExplanation: '' });

    try {
      const { id, name, description, story } = this.data.selectedSpot;

      const { result } = await wx.cloud.callFunction({
        name: 'heritageAI',
        data: {
          type: 'explanation',
          exhibitId: id,
          params: {
            name: name,
            description: description,
            story: story
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
          aiExplanation: `这是${this.data.selectedSpot.name}的智能讲解。该民俗类型为${this.data.selectedSpot.type}，属于${this.data.selectedSpot.zoneName}。${this.data.selectedSpot.description} ${this.data.selectedSpot.story || ''}`,
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
        aiExplanation: `这是${this.data.selectedSpot.name}的智能讲解。该民俗类型为${this.data.selectedSpot.type}，属于${this.data.selectedSpot.zoneName}。${this.data.selectedSpot.description} ${this.data.selectedSpot.story || ''}`,
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
      url: '/mingsu/mingsu/full-map/full-map'
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
        const fileName = `folklore_map_${Date.now()}.jpg`;

        wx.showLoading({ title: '上传中...' });

        wx.cloud.uploadFile({
          cloudPath: `folklore_maps/${fileName}`,
          filePath: tempFilePaths[0],
          success: (uploadRes) => {
            const fileID = uploadRes.fileID;
            
            // 更新地图URL
            this.setData({ venueMapUrl: fileID });

            // 保存到数据库
            wx.cloud.database().collection('folklore_settings').doc('map_config').set({
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
      content: '请输入民俗点位信息',
      editable: true,
      placeholderText: '点位名称',
      success: (res) => {
        if (res.confirm && res.content) {
          const spotName = res.content;
          const newSpot = {
            id: `sp${Date.now()}`,
            number: `${this.data.spots.length + 1}`,
            name: spotName,
            zone: 'festival',
            zoneName: '节庆习俗',
            type: '传统节日',
            position: {
              x: x - 30,
              y: y - 30,
              width: 60,
              height: 60
            },
            image: '',
            description: '',
            story: ''
          };

          const updatedSpots = [...this.data.spots, newSpot];
          this.setData({ spots: updatedSpots, filteredSpots: updatedSpots });
          
          // 保存到数据库
          this.saveSpots();
          
          wx.showToast({ title: '热区添加成功', icon: 'success' });
        }
      }
    });
  },

  // 开始拖拽热区
  startDrag(e) {
    if (!this.data.editMode) return;
    
    const id = e.currentTarget.dataset.id;
    this.setData({ isDragging: true, currentDragSpot: id });
  },

  // 拖拽热区
  dragHotspot(e) {
    if (!this.data.isDragging || !this.data.currentDragSpot) return;

    const { x, y } = e.detail;
    const updatedSpots = this.data.spots.map(spot => {
      if (spot.id === this.data.currentDragSpot) {
        return {
          ...spot,
          position: {
            ...spot.position,
            x: x - spot.position.width / 2,
            y: y - spot.position.height / 2
          }
        };
      }
      return spot;
    });

    this.setData({ spots: updatedSpots, filteredSpots: updatedSpots });
  },

  // 结束拖拽
  endDrag() {
    if (this.data.isDragging) {
      this.setData({ isDragging: false, currentDragSpot: null });
      // 保存到数据库
      this.saveSpots();
    }
  },

  // 保存点位数据
  saveSpots() {
    wx.cloud.database().collection('folklore_spots').remove({})
      .then(() => {
        const batch = wx.cloud.database().command.batch();
        this.data.spots.forEach(spot => {
          batch.add({ data: spot });
        });
        return batch.commit();
      })
      .catch(err => {
        console.error('保存点位失败:', err);
      });
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `${this.data.venueName}民俗导览`,
      path: '/mingsu/mingsu/ai-guide/ai-guide',
      imageUrl: this.data.venueMapUrl
    };
  }
});