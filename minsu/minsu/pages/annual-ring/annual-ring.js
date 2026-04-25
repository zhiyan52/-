const { SOLAR_TERMS } = require('../../utils/solar-data.js');

Page({
  data: {
    year: new Date().getFullYear(),
    ringData: [],
    stats: {},
    summary: '',
    canvasSize: 700,
    dpr: 1
  },

  onLoad() {
    const info = wx.getWindowInfo();
    this.setData({ dpr: info.pixelRatio });
    this.loadYearData();
  },

  loadYearData() {
    const ring = wx.getStorageSync('annual_ring') || [];
    const yearData = ring.filter(r => r.date.startsWith(this.data.year));

    const byTerm = {};
    SOLAR_TERMS.forEach(t => {
      const termRecords = yearData.filter(r => r.termId === t.id);
      const storage = wx.getStorageSync(`solar_${t.id}`) || {};

      byTerm[t.id] = {
        ...t,
        records: termRecords,
        customsDone: storage.doneCustoms || [],
        pentadsObserved: storage.observedPentads || [],
        hasPhoto: termRecords.some(r => r.photo),
        note: storage.note || ''
      };
    });

    const ringData = Object.values(byTerm).map(t => {
      const customScore = t.customsDone.length / Math.max(t.customs.length, 1);
      const pentadScore = t.pentadsObserved.length / 3;
      const photoBonus = t.hasPhoto ? 0.1 : 0;
      const intensity = Math.min(1, customScore * 0.5 + pentadScore * 0.3 + photoBonus);

      return {
        ...t,
        intensity,
        radius: 80 + t.order * 12,
        angle: (t.order - 1) * 15
      };
    });

    const stats = {
      totalTerms: ringData.filter(t => t.records.length > 0).length,
      totalCustoms: ringData.reduce((s, t) => s + (t.customsDone ? t.customsDone.length : 0), 0),
      totalObservations: ringData.reduce((s, t) => s + (t.pentadsObserved ? t.pentadsObserved.length : 0), 0),
      totalPhotos: ringData.filter(t => t.hasPhoto).length,
      avgIntensity: ringData.reduce((s, t) => s + t.intensity, 0) / 24,
      favoriteTerm: ringData.sort((a, b) => b.intensity - a.intensity)[0]?.name || '-'
    };

    this.setData({ ringData, stats });
    setTimeout(() => this.renderRingCanvas(), 100);
    this.getAnnualSummary(stats);
  },

  renderRingCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#ring-canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0]) return;
        
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const { canvasSize, dpr } = this.data;
        
        const size = canvasSize * dpr / 2;
        canvas.width = size * 2;
        canvas.height = size * 2;
        ctx.scale(dpr, dpr);
        
        const centerX = size;
        const centerY = size;
        
        ctx.fillStyle = '#faf8f5';
        ctx.fillRect(0, 0, size * 2, size * 2);
        
        this.data.ringData.forEach(term => {
          this.drawTermRing(ctx, term, centerX, centerY);
        });
        
        this.drawCenter(ctx, centerX, centerY, size * 0.25);
        
        this.data.ringData.filter(t => t.hasPhoto).forEach(term => {
          this.drawPhotoDot(ctx, term, centerX, centerY);
        });
      });
  },

  drawTermRing(ctx, term, cx, cy) {
    const { radius, intensity, order, name, season } = term;
    
    const startAngle = (term.angle - 7.5) * Math.PI / 180;
    const endAngle = (term.angle + 7.5) * Math.PI / 180;
    const ringWidth = 8 + intensity * 20;
    
    const seasonColors = {
      spring: '#8B4513',
      summer: '#228B22',
      autumn: '#DAA520',
      winter: '#4682B4'
    };
    const baseColor = seasonColors[season] || '#999';
    const alpha = 0.3 + intensity * 0.7;
    
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.arc(cx, cy, radius + ringWidth, endAngle, startAngle, true);
    ctx.closePath();
    
    ctx.fillStyle = this.hexToRgba(baseColor, alpha);
    ctx.fill();
    
    if (intensity > 0.7) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 2, startAngle + 0.05, endAngle - 0.05);
      ctx.strokeStyle = this.hexToRgba(baseColor, 0.8);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    if (intensity > 0.3) {
      const labelAngle = term.angle * Math.PI / 180;
      const labelRadius = radius + ringWidth + 15;
      const lx = cx + Math.cos(labelAngle) * labelRadius;
      const ly = cy + Math.sin(labelAngle) * labelRadius;
      
      ctx.font = `${10 + intensity * 4}px sans-serif`;
      ctx.fillStyle = baseColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name, lx, ly);
    }
  },

  drawCenter(ctx, cx, cy, radius) {
    for (let r = radius; r > 0; r -= 3) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 69, 19, ${0.1 + (radius - r) / radius * 0.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    ctx.font = 'bold 24px serif';
    ctx.fillStyle = '#2c1810';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.data.year}`, cx, cy - 10);
    
    ctx.font = '14px serif';
    ctx.fillStyle = '#8B4513';
    ctx.fillText('岁时', cx, cy + 15);
  },

  drawPhotoDot(ctx, term, cx, cy) {
    const angle = term.angle * Math.PI / 180;
    const r = term.radius + 15;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B6B';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 1;
    ctx.stroke();
  },

  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  async getAnnualSummary(stats) {
    const cacheKey = `annual_summary_${this.data.year}`;
    const cached = wx.getStorageSync(cacheKey);
    if (cached) {
      this.setData({ summary: cached });
      return;
    }
    
    try {
      const ai = wx.cloud.extend.AI;
      const res = await ai.createCompletion({
        model: 'deepseek-chat',
        messages: [{
          role: 'system',
          content: '你是一位熟悉节气文化的文人，为用户生成年度岁时总结。'
        }, {
          role: 'user',
          content: `生成${this.data.year}年节气生活总结：
参与${stats.totalTerms}个节气，完成习俗${stats.totalCustoms}次，观察物候${stats.totalObservations}次，记录照片${stats.totalPhotos}张，平均参与度${Math.round(stats.avgIntensity * 100)}%。
要求：一句古诗开头，中间描述四季流转，一句感悟结尾。80字内，清雅含蓄。`
        }],
        maxTokens: 200
      });
      
      const summary = res.choices[0].message.content.trim();
      this.setData({ summary });
      wx.setStorageSync(cacheKey, summary);
      
    } catch (err) {
      this.setData({ 
        summary: `四时行焉，百物生焉。${this.data.year}年，你与${stats.totalTerms}个节气相遇，在${stats.totalCustoms}次习俗中触摸时间的纹理，于寻常日子里，寻回中国人过日子的仪式感。` 
      });
    }
  },

  changeYear(e) {
    const delta = parseInt(e.currentTarget.dataset.delta);
    const newYear = this.data.year + delta;
    this.setData({ year: newYear });
    this.loadYearData();
  },

  onRingTap(e) {
    const { x, y } = e.detail;
    const { canvasSize } = this.data;
    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    
    const dx = x - cx;
    const dy = y - cy;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const normalizedAngle = angle < 0 ? angle + 360 : angle;
    
    const closest = this.data.ringData.reduce((best, term) => {
      const diff = Math.abs(term.angle - normalizedAngle);
      const bestDiff = Math.abs(best.angle - normalizedAngle);
      return diff < bestDiff ? term : best;
    });
    
    wx.navigateTo({
      url: `/minsu/minsu/pages/solar-detail/solar-detail?id=${closest.id}`
    });
  },

  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/minsu/minsu/pages/solar-detail/solar-detail?id=${id}`
    });
  },

  async exportRingImage() {
    wx.showLoading({ title: '生成中...' });
    
    const query = wx.createSelectorQuery().in(this);
    query.select('#ring-canvas')
      .fields({ node: true })
      .exec((res) => {
        if (!res || !res[0]) {
          wx.hideLoading();
          return;
        }
        
        const canvas = res[0].node;
        
        wx.canvasToTempFilePath({
          canvas: canvas,
          x: 0, y: 0,
          width: this.data.canvasSize * this.data.dpr / 2 * 2,
          height: this.data.canvasSize * this.data.dpr / 2 * 2,
          destWidth: 750,
          destHeight: 750,
          success: (res) => {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                wx.showToast({ title: '已保存', icon: 'success' });
              }
            });
          },
          complete: () => wx.hideLoading()
        });
      });
  }
});