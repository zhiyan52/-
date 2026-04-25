// traditional/traditional/stepDetail/stepDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedRegion: 'all',
    selectedHeritage: null,
    heritageList: [],
    loading: false,
    // 本地非遗数据
    heritages: [
      {
        id: "jingdezhen_ceramic",
        name: "景德镇手工制瓷技艺",
        level: "国家级",
        category: "传统技艺",
        desc: "景德镇是中国著名的瓷都，以生产高质量的瓷器而闻名于世。其制瓷技艺历史悠久，工艺精湛。",
        // 地理关联
        geoContext: {
          whyHere: "高岭土产地，'瓷土之母'",
          water: "昌江水，运瓷出山的通道",
          fire: "松柴丰富，烧窑燃料充足",
          history: "宋真宗年号'景德'赐名"
        },
        // 当代状态
        currentStatus: "作为文化遗产得到保护和传承，现代景德镇瓷器仍在国际市场上享有盛誉"
      },
      {
        id: "su_embroidery",
        name: "苏绣",
        level: "国家级",
        category: "传统美术",
        desc: "苏绣是中国四大名绣之一，以针法精细、色彩典雅著称，产于江苏苏州一带。",
        geoContext: {
          whyHere: "江南水乡文化氛围浓厚",
          water: "太湖流域，水源充足",
          history: "始于三国时期，明清时期达到鼎盛"
        },
        currentStatus: "被列入国家级非物质文化遗产名录，现代苏绣在保持传统的同时融入现代元素"
      },
      {
        id: "shadow_puppet",
        name: "皮影戏",
        level: "国家级",
        category: "传统戏剧",
        desc: "皮影戏是一种以兽皮或纸板做成的人物剪影来表演故事的民间戏剧，流行于中国北方地区。",
        geoContext: {
          whyHere: "北方冬季漫长，适合室内表演",
          history: "始于西汉，盛于清代"
        },
        currentStatus: "面临传承困境，但在政府和民间的努力下逐渐恢复活力"
      },
      {
        id: "wood_carving",
        name: "木雕",
        level: "国家级",
        category: "传统技艺",
        desc: "木雕是中国传统工艺之一，以各种木材为原料，雕刻出各种图案和形象。",
        geoContext: {
          whyHere: "北方森林资源丰富",
          history: "始于新石器时代，明清时期达到高峰"
        },
        currentStatus: "在现代家居装饰中仍有广泛应用，同时作为艺术品受到收藏界的青睐"
      },
      {
        id: "lacquerware",
        name: "漆器",
        level: "国家级",
        category: "传统技艺",
        desc: "漆器是中国传统工艺品之一，以天然生漆为主要原料，经过多道工序制作而成。",
        geoContext: {
          whyHere: "南方漆树资源丰富",
          water: "气候湿润，适合生漆干燥",
          history: "始于新石器时代，汉代达到成熟"
        },
        currentStatus: "作为高端工艺品受到收藏家和艺术爱好者的喜爱，同时在现代设计中得到创新应用"
      },
      {
        id: "bamboo_weaving",
        name: "竹编",
        level: "国家级",
        category: "传统技艺",
        desc: "竹编是中国传统工艺之一，以竹子为原料，编织出各种实用品和艺术品。",
        geoContext: {
          whyHere: "南方竹林资源丰富",
          history: "始于新石器时代，明清时期达到鼎盛"
        },
        currentStatus: "在现代生活中仍有广泛应用，同时作为文化遗产得到保护和传承"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      heritageList: this.data.heritages
    });
  },

  /**
   * 选择区域
   */
  selectRegion(e) {
    const region = e.currentTarget.dataset.region;
    this.setData({
      selectedRegion: region
    });

    // 根据区域筛选非遗项目
    let filteredList = this.data.heritages;
    if (region === 'north') {
      filteredList = this.data.heritages.filter(item =>
        item.id === 'shadow_puppet' || item.id === 'wood_carving'
      );
    } else if (region === 'south') {
      filteredList = this.data.heritages.filter(item =>
        item.id !== 'shadow_puppet' && item.id !== 'wood_carving'
      );
    }

    this.setData({
      heritageList: filteredList
    });
  },

  /**
   * 选择非遗项目
   */
  selectHeritage(e) {
    const id = e.currentTarget.dataset.id;
    const heritage = this.data.heritages.find(item => item.id === id);
    this.setData({
      selectedHeritage: heritage
    });
  },

  /**
   * 显示筛选面板
   */
  showFilter() {
    wx.showActionSheet({
      itemList: ['全部类别', '传统技艺', '传统美术', '传统戏剧'],
      success: (res) => {
        let filteredList = this.data.heritages;
        if (res.tapIndex === 1) {
          filteredList = this.data.heritages.filter(item => item.category === '传统技艺');
        } else if (res.tapIndex === 2) {
          filteredList = this.data.heritages.filter(item => item.category === '传统美术');
        } else if (res.tapIndex === 3) {
          filteredList = this.data.heritages.filter(item => item.category === '传统戏剧');
        }

        this.setData({
          heritageList: filteredList
        });
      }
    });
  },

  /**
   * 获取 AI 深度解读
   */
  getAIInsight(e) {
    const heritageId = e.currentTarget.dataset.id;
    if (!heritageId) {
      wx.showToast({
        title: '请先选择一个非遗项目',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });

    // 调用 DeepSeek API 获取深度解读
    this.callDeepSeekAI(heritageId).then(insight => {
      this.setData({ loading: false });

      wx.showModal({
        title: 'AI 深度解读',
        content: insight,
        showCancel: false,
        confirmText: '确定'
      });
    }).catch(error => {
      this.setData({ loading: false });
      wx.showToast({
        title: '获取解读失败，请重试',
        icon: 'none'
      });
      console.error('AI 调用失败:', error);
    });
  },

  /**
   * 调用 DeepSeek AI
   */
  callDeepSeekAI(heritageId) {
    return new Promise((resolve, reject) => {
      // 模拟 DeepSeek API 调用
      // 实际项目中，这里应该调用真实的 DeepSeek API
      setTimeout(() => {
        const heritage = this.data.heritages.find(item => item.id === heritageId);
        if (heritage) {
          const insight = `关于${heritage.name}的深度解读：\n\n${heritage.name}是中国${heritage.level}非物质文化遗产，属于${heritage.category}类别。\n\n地理背景：${heritage.geoContext.whyHere}，${heritage.geoContext.water || ''}，${heritage.geoContext.fire || ''}。\n\n历史意义：${heritage.geoContext.history || '历史悠久，文化底蕴深厚'}。\n\n当代价值：${heritage.currentStatus}。\n\n这种传统技艺体现了中国劳动人民的智慧和创造力，是中华民族文化遗产的重要组成部分。`;
          resolve(insight);
        } else {
          reject(new Error('未找到该非遗项目'));
        }
      }, 1000);
    });
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
    wx.stopPullDownRefresh();
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
    return {
      title: '非遗地图 - 地理文化学习',
      path: '/traditional/traditional/stepDetail/stepDetail'
    };
  }
})
