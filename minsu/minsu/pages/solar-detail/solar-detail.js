 // minsu/minsu/pages/solar-detail/solar-detail.js

const { SOLAR_TERMS } = require('../../utils/solar-data.js');

Page({
  data: {
    term: null,
    currentDay: 1,        // 当前在三候第几天
    activeTab: 'pentad',  // pentad/custom/pheno
    selectedRegion: 0,    // 地域选择索引
    
    // 用户记录
    observedPentads: [],
    doneCustoms: [],
    myNote: '',
    myPhoto: null
  },

  onLoad(options) {
    const { id } = options;
    const term = SOLAR_TERMS.find(t => t.id === id);
    
    // 加载用户历史
    const userData = wx.getStorageSync(`solar_${id}`) || {};
    
    this.setData({
      term,
      observedPentads: userData.observedPentads || [],
      doneCustoms: userData.doneCustoms || [],
      myNote: userData.note || '',
      myPhoto: userData.photo || null,
      currentDay: this.computeCurrentDay(term)
    });
  },

  // 计算当前在三候第几天（基于节气日期）
  computeCurrentDay(term) {
    const now = new Date();
    const termDate = this.getTermDate(term.id, now.getFullYear());
    const diff = Math.floor((now - termDate) / 86400000);
    return Math.min(3, Math.max(1, diff + 1));
  },

  // 标记三候观察
  observePentad(e) {
    const { day } = e.currentTarget.dataset;
    const { id } = this.data.term;
    
    const observed = [...this.data.observedPentads];
    if (!observed.includes(day)) {
      observed.push(day);
      observed.sort();
    }
    
    this.setData({ observedPentads: observed });
    this.saveUserData(id, { observedPentads: observed });
    
    // 轻微震动反馈
    wx.vibrateShort({ type: 'light' });
  },

  // 标记完成习俗
  toggleCustom(e) {
    const { customId } = e.currentTarget.dataset;
    const { id } = this.data.term;
    
    const done = [...this.data.doneCustoms];
    const idx = done.indexOf(customId);
    
    if (idx > -1) {
      done.splice(idx, 1);
    } else {
      done.push(customId);
      // 首次完成，提示记录
      this.promptRecord(customId);
    }
    
    this.setData({ doneCustoms: done });
    this.saveUserData(id, { doneCustoms: done });
  },

  // 提示拍照/笔记
  promptRecord(customId) {
    wx.showModal({
      title: '记录这一刻',
      content: '拍张照片或写句心得？',
      confirmText: '记录',
      cancelText: '稍后',
      success: (res) => {
        if (res.confirm) {
          wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            success: (media) => {
              this.setData({ myPhoto: media.tempFiles[0].tempFilePath });
              this.saveUserData(this.data.term.id, { photo: media.tempFiles[0].tempFilePath });
            }
          });
        }
      }
    });
  },

  // 选择地域查看食谱
  selectRegion(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({ selectedRegion: index });
  },

  // AI食谱改良（低频触发）
  async getModernRecipe() {
    const { term, selectedRegion } = this.data;
    const region = term.regions[selectedRegion];
    
    const cacheKey = `recipe_${term.id}_${region.name}`;
    const cached = wx.getStorageSync(cacheKey);
    if (cached) {
      this.setData({ modernRecipe: cached });
      return;
    }
    
    wx.showLoading({ title: '改良中...' });
    
    try {
      const ai = wx.cloud.extend.AI;
      const res = await ai.createCompletion({
        model: 'deepseek-chat',
        messages: [{
          role: 'user',
          content: `将传统食谱改良为现代家庭版，保留节气文化内涵：
食谱：${region.recipe}
要求：1.食材超市可买 2.步骤简化 3.注明文化寓意 4.150字内`
        }],
        maxTokens: 200
      });
      
      const recipe = res.choices[0].message.content.trim();
      this.setData({ modernRecipe: recipe });
      wx.setStorageSync(cacheKey, recipe);
      
    } catch (err) {
      this.setData({ 
        modernRecipe: `${region.recipe}。现代简化：用现成饺子皮替代春饼，馅料自选，核心是"咬春"的仪式感。` 
      });
    }
    
    wx.hideLoading();
  },

  saveUserData(termId, data) {
    const key = `solar_${termId}`;
    const existing = wx.getStorageSync(key) || {};
    wx.setStorageSync(key, { ...existing, ...data });
  },

  // 分享到"我的年轮"（非社交，是个人档案汇总）
  addToAnnualRing() {
    const { term, doneCustoms, observedPentads, myPhoto, myNote } = this.data;
    
    const ringData = wx.getStorageSync('annual_ring') || [];
    ringData.push({
      termId: term.id,
      termName: term.name,
      date: new Date().toISOString().slice(0, 10),
      customs: doneCustoms.length,
      pentads: observedPentads.length,
      photo: myPhoto,
      note: myNote
    });
    
    wx.setStorageSync('annual_ring', ringData);
    wx.showToast({ title: '已记入年轮', icon: 'success' });
  }
});