 // minsu/minsu/pages/pantry/pantry.js

Page({
  data: {
    // 食材库（本地预存+用户添加）
    ingredients: [
      { id: 'chunbing', name: '春饼', solarTerms: ['lichun'], storage: '冷藏3天', myStock: 0 },
      { id: 'luobo', name: '萝卜', solarTerms: ['lichun', 'dongzhi'], storage: '阴凉通风', myStock: 2 },
      { id: 'jicai', name: '荠菜', solarTerms: ['lichun', 'yushui', 'jingzhe'], storage: '冷藏2天', myStock: 0 },
      // ...
    ],
    
    // 当前节气推荐
    currentTerm: 'lichun',
    recommended: [],
    
    // 库存预警
    alerts: []
  },

  onLoad() {
    this.loadStock();
    this.computeRecommend();
    this.checkAlerts();
  },

  loadStock() {
    const stock = wx.getStorageSync('pantry_stock') || {};
    const ingredients = this.data.ingredients.map(item => ({
      ...item,
      myStock: stock[item.id] || 0
    }));
    this.setData({ ingredients });
  },

  updateStock(e) {
    const { id, delta } = e.currentTarget.dataset;
    const item = this.data.ingredients.find(i => i.id === id);
    const newStock = Math.max(0, item.myStock + parseInt(delta));
    
    // 更新
    const ingredients = this.data.ingredients.map(i => 
      i.id === id ? { ...i, myStock: newStock } : i
    );
    this.setData({ ingredients });
    
    // 持久化
    const stock = wx.getStorageSync('pantry_stock') || {};
    stock[id] = newStock;
    wx.setStorageSync('pantry_stock', stock);
  },

  // 计算当前节气推荐食材
  computeRecommend() {
    const { currentTerm, ingredients } = this.data;
    const recommended = ingredients.filter(i => 
      i.solarTerms.includes(currentTerm) && i.myStock === 0
    );
    this.setData({ recommended });
  },

  // AI食谱推荐（基于库存）
  async getRecipe() {
    const available = this.data.ingredients.filter(i => i.myStock > 0);
    const solarMatch = available.filter(i => i.solarTerms.includes(this.data.currentTerm));
    
    const cacheKey = `recipe_pantry_${available.map(i=>i.id).join('_')}`;
    const cached = wx.getStorageSync(cacheKey);
    if (cached) {
      this.setData({ recipe: cached });
      return;
    }
    
    const prompt = `用以下食材设计一道${this.data.currentTerm}节气菜，步骤简化，100字内：
食材：${available.map(i=>i.name).join('、')}。
${solarMatch.length>0 ? '优先使用：'+solarMatch.map(i=>i.name).join('、') : ''}`;
    
    try {
      const ai = wx.cloud.extend.AI;
      const res = await ai.createCompletion({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        maxTokens: 200
      });
      
      const recipe = res.choices[0].message.content.trim();
      this.setData({ recipe });
      wx.setStorageSync(cacheKey, recipe);
      
    } catch (err) {
      this.setData({ 
        recipe: `【${this.data.currentTerm}乱炖】\n${available.map(i=>i.name).join('、')}同煮，盐调味，食之本味。` 
      });
    }
  }
});