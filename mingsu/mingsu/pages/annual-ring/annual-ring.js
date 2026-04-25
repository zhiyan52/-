// mingsu/mingsu/pages/annual-ring/annual-ring.js
const app = getApp();
const seasonColors = ['#8B4513', '#228B22', '#DAA520', '#4682B4'];
const seasonNames = ['春', '夏', '秋', '冬'];

Page({
  data: {
    year: new Date().getFullYear(),
    canvasSize: 700,
    ringData: [],
    stats: {},
    summary: '',
    selectedTermId: null,
    showDetail: false
  },

  onLoad() {
    this.initRingData();
    this.loadYearData();
  },

  onReady() {
    this.initCanvas();
  },

  initRingData() {
    const solarTerms = [
      { id: 'lichun', name: '立春', season: 0, date: '2月3-5日' },
      { id: 'yushui', name: '雨水', season: 0, date: '2月18-20日' },
      { id: 'jingzhe', name: '惊蛰', season: 0, date: '3月5-7日' },
      { id: 'chunfen', name: '春分', season: 0, date: '3月20-22日' },
      { id: 'qingming', name: '清明', season: 0, date: '4月4-6日' },
      { id: 'guyu', name: '谷雨', season: 0, date: '4月19-21日' },
      { id: '立夏', name: '立夏', season: 1, date: '5月5-7日' },
      { id: 'xiaoman', name: '小满', season: 1, date: '5月20-22日' },
      { id: 'mangzhong', name: '芒种', season: 1, date: '6月5-7日' },
      { id: 'xiazhi', name: '夏至', season: 1, date: '6月21-22日' },
      { id: 'xiaoshu', name: '小暑', season: 1, date: '7月6-8日' },
      { id: 'dashu', name: '大暑', season: 1, date: '7月22-24日' },
      { id: 'liqiu', name: '立秋', season: 2, date: '8月7-9日' },
      { id: 'chushu', name: '处暑', season: 2, date: '8月22-24日' },
      { id: 'bailu', name: '白露', season: 2, date: '9月7-9日' },
      { id: 'qiufen', name: '秋分', season: 2, date: '9月22-24日' },
      { id: 'hanlu', name: '寒露', season: 2, date: '10月8-9日' },
      { id: 'shuangjiang', name: '霜降', season: 2, date: '10月23-24日' },
      { id: 'lidong', name: '立冬', season: 3, date: '11月7-8日' },
      { id: 'xiaoxue', name: '小雪', season: 3, date: '11月22-23日' },
      { id: 'daxue', name: '大雪', season: 3, date: '12月6-8日' },
      { id: 'dongzhi', name: '冬至', season: 3, date: '12月21-23日' },
      { id: 'xiaohan', name: '小寒', season: 3, date: '1月5-7日' },
      { id: 'dahan', name: '大寒', season: 3, date: '1月20-21日' }
    ];

    const ringData = solarTerms.map((term, index) => ({
      ...term,
      customs: this.getCustomsForTerm(term.id),
      customsDone: [],
      pentads: this.getPentadsForTerm(term.id),
      pentadsObserved: [],
      photos: [],
      intensity: 0
    }));

    this.setData({ ringData });
  },

  getCustomsForTerm(termId) {
    const customsMap = {
      lichun: ['贴春联', '吃春饼', '鞭春牛'],
      yushui: ['回娘家', '占稻色', '接寿'],
      jingzhe: ['吃梨', '祭白虎', '打小人'],
      chunfen: ['竖鸡蛋', '放风筝', '春祭'],
      qingming: ['扫墓', '踏青', '插柳'],
      guyu: ['喝谷雨茶', '赏牡丹', '祭海'],
      '立夏': ['吃立夏饭', '称体重', '斗蛋'],
      xiaoman: ['吃苦菜', '祭车神', '抢水'],
      mangzhong: ['送花神', '煮梅', '安苗'],
      xiazhi: ['吃面条', '祭祀土地', '消暑'],
      xiaoshu: ['吃暑羊', '晒伏', '晾经'],
      dashu: ['喝伏茶', '烧伏香', '吃凤梨'],
      liqiu: ['贴秋膘', '咬秋', '祭祀'],
      chushu: ['出游迎秋', '开渔节', '拜土地'],
      bailu: ['收清露', '祭禹王', '饮白露茶'],
      qiufen: ['竖鸡蛋', '吃秋菜', '送秋牛'],
      hanlu: ['赏红叶', '饮菊花酒', '吃芝麻'],
      shuangjiang: ['赏枫叶', '吃柿子', '进补'],
      lidong: ['吃饺子', '冬泳', '储存大白菜'],
      xiaoxue: ['腌腊肉', '吃糍粑', '晒鱼干'],
      daxue: ['观赏封河', '滑雪', '冰嬉'],
      dongzhi: ['吃饺子', '吃汤圆', '祭天'],
      xiaohan: ['喝腊八粥', '备年货', '写春联'],
      dahan: ['喝鸡汤', '探梅', '备年货']
    };
    return customsMap[termId] || [];
  },

  getPentadsForTerm(termId) {
    return ['初候', '二候', '三候'];
  },

  loadYearData() {
    const year = this.data.year;
    const key = `ringData_${year}`;

    try {
      const savedData = wx.getStorageSync(key);
      if (savedData) {
        this.setData({ ringData: savedData });
        this.calculateStats();
        this.drawRing();
      }
    } catch (e) {
      console.error('加载数据失败:', e);
    }
  },

  saveYearData() {
    const year = this.data.year;
    const key = `ringData_${year}`;

    try {
      wx.setStorageSync(key, this.data.ringData);
    } catch (e) {
      console.error('保存数据失败:', e);
    }
  },

  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#ring-canvas').fields({
      node: true,
      size: true
    }).exec((res) => {
      if (res[0]) {
        this.canvas = res[0].node;
        this.ctx = this.canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        const size = this.data.canvasSize;
        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.ctx.scale(dpr, dpr);
        this.drawRing();
      }
    });
  },

  drawRing() {
    if (!this.ctx) return;

    const ctx = this.ctx;
    const centerX = this.data.canvasSize / 2;
    const centerY = this.data.canvasSize / 2;
    const maxRadius = 280;
    const minRadius = 80;
    const termCount = 24;
    const ringWidth = (maxRadius - minRadius) / 4;

    ctx.clearRect(0, 0, this.data.canvasSize, this.data.canvasSize);

    for (let i = 0; i < termCount; i++) {
      const term = this.data.ringData[i];
      if (!term) continue;

      const angle = (i / termCount) * Math.PI * 2 - Math.PI / 2;
      const seasonIndex = term.season;
      const color = seasonColors[seasonIndex];
      const intensity = term.intensity || 0;

      const innerRadius = minRadius + seasonIndex * ringWidth;
      const outerRadius = innerRadius + ringWidth - 4;

      const startAngle = angle - Math.PI / termCount;
      const endAngle = angle + Math.PI / termCount;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();

      const alpha = 0.2 + intensity * 0.8;
      ctx.fillStyle = this.hexToRgba(color, alpha);
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (term.photos && term.photos.length > 0) {
        const dotRadius = innerRadius + ringWidth / 2;
        const dotX = centerX + Math.cos(angle) * dotRadius;
        const dotY = centerY + Math.sin(angle) * dotRadius;

        ctx.beginPath();
        ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B6B';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      const labelRadius = maxRadius + 40;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;

      ctx.font = '24rpx sans-serif';
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(term.name, labelX, labelY);
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, minRadius - 10, 0, Math.PI * 2);
    ctx.fillStyle = '#faf8f5';
    ctx.fill();
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = 'bold 48rpx serif';
    ctx.fillStyle = '#8B4513';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.data.year + '', centerX, centerY - 20);

    ctx.font = '24rpx sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText('年轮', centerX, centerY + 30);
  },

  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  onRingTap(e) {
    const { x, y } = e.detail;
    const centerX = this.data.canvasSize / 2;
    const centerY = this.data.canvasSize / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 80 || distance > 320) return;

    const angle = Math.atan2(dy, dx);
    let termIndex = Math.floor(((angle + Math.PI / 2) / (Math.PI * 2)) * 24);
    if (termIndex < 0) termIndex += 24;

    const term = this.data.ringData[termIndex];
    if (term) {
      this.setData({ selectedTermId: term.id });
      wx.navigateTo({
        url: `/mingsu/mingsu/pages/solar-detail/solar-detail?termId=${term.id}&year=${this.data.year}`
      });
    }
  },

  changeYear(e) {
    const delta = parseInt(e.currentTarget.dataset.delta);
    const newYear = this.data.year + delta;
    this.setData({ year: newYear });
    this.loadYearData();
    this.drawRing();
  },

  goToDetail(e) {
    const termId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/mingsu/mingsu/pages/solar-detail/solar-detail?termId=${termId}&year=${this.data.year}`
    });
  },

  calculateStats() {
    const ringData = this.data.ringData;
    let totalTerms = 0;
    let totalCustoms = 0;
    let totalObservations = 0;
    let totalPhotos = 0;
    let totalIntensity = 0;
    let maxIntensity = 0;
    let favoriteTerm = '';

    ringData.forEach(term => {
      if (term.intensity > 0) totalTerms++;
      totalCustoms += term.customsDone ? term.customsDone.length : 0;
      totalObservations += term.pentadsObserved ? term.pentadsObserved.length : 0;
      totalPhotos += term.photos ? term.photos.length : 0;
      totalIntensity += term.intensity;

      if (term.intensity > maxIntensity) {
        maxIntensity = term.intensity;
        favoriteTerm = term.name;
      }
    });

    const avgIntensity = totalTerms > 0 ? totalIntensity / 24 : 0;

    this.setData({
      stats: {
        totalTerms,
        totalCustoms,
        totalObservations,
        totalPhotos,
        avgIntensity,
        favoriteTerm
      }
    });

    this.generateSummary();
  },

  async generateSummary() {
    const { stats, year } = this.data;

    if (stats.totalTerms === 0) {
      this.setData({ summary: '新的一年，开始记录你的节气生活吧！' });
      return;
    }

    try {
      const { result } = await wx.cloud.callFunction({
        name: 'folkAiGuide',
        data: {
          type: 'summary',
          year: year,
          stats: stats
        }
      });

      if (result && result.summary) {
        this.setData({ summary: result.summary });
      }
    } catch (error) {
      console.error('AI总结生成失败:', error);
      this.setData({ summary: this.getDefaultSummary(stats) });
    }
  },

  getDefaultSummary(stats) {
    if (stats.totalTerms >= 20) {
      return `这一年，你与二十四节气相伴，${stats.totalCustoms}个习俗、${stats.totalObservations}次物候观察，${stats.favoriteTerm}是你最热衷的节气。愿来年继续与传统文化同行。`;
    } else if (stats.totalTerms >= 10) {
      return `这一年，你开始关注传统节气，参与了${stats.totalTerms}个节气的活动。${stats.favoriteTerm}给你留下了深刻印象。继续探索，你会发现更多传统之美。`;
    } else {
      return `这一年，你踏上了了解二十四节气的旅程。虽然参与还不多，但每一次都是美好的开始。新的一年，一起发现更多传统文化的魅力吧！`;
    }
  },

  exportRingImage() {
    wx.showLoading({ title: '正在生成图片...' });

    const query = wx.createSelectorQuery();
    query.select('#poster-canvas').fields({
      node: true,
      size: true
    }).exec((res) => {
      if (res[0]) {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;

        canvas.width = 600 * dpr;
        canvas.height = 900 * dpr;
        ctx.scale(dpr, dpr);

        ctx.fillStyle = '#faf8f5';
        ctx.fillRect(0, 0, 600, 900);

        ctx.font = 'bold 48rpx serif';
        ctx.fillStyle = '#8B4513';
        ctx.textAlign = 'center';
        ctx.fillText(this.data.year + '年轮', 300, 80);

        ctx.drawImage(this.canvas, 50, 120, 500, 500);

        if (this.data.summary) {
          ctx.font = '28rpx sans-serif';
          ctx.fillStyle = '#666';
          ctx.textAlign = 'center';
          const lines = this.wrapText(ctx, this.data.summary, 520);
          lines.forEach((line, index) => {
            ctx.fillText(line, 300, 680 + index * 40);
          });
        }

        ctx.font = '22rpx sans-serif';
        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.fillText('— 岁时记 · 年轮', 300, 850);

        wx.canvasToTempFilePath({
          canvas: canvas,
          success: (res) => {
            wx.hideLoading();
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                wx.showToast({ title: '保存成功', icon: 'success' });
              },
              fail: () => {
                wx.showToast({ title: '保存失败', icon: 'none' });
              }
            });
          },
          fail: (err) => {
            wx.hideLoading();
            console.error('导出失败:', err);
            wx.showToast({ title: '导出失败', icon: 'none' });
          }
        });
      }
    });
  },

  wrapText(ctx, text, maxWidth) {
    const words = text.split('');
    const lines = [];
    let currentLine = '';

    words.forEach(char => {
      const testLine = currentLine + char;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.slice(0, 4);
  },

  onUnload() {
    this.saveYearData();
  },

  onShareAppMessage() {
    return {
      title: '我的年轮 - 岁时记',
      path: `/mingsu/mingsu/pages/annual-ring/annual-ring?year=${this.data.year}`,
      imageUrl: 'https://example.com/annual-ring-share.jpg'
    };
  }
});
