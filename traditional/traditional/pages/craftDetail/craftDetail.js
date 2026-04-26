// traditional/traditional/pages/craftDetail/craftDetail.js
// pages/craftDetail/craftDetail.js
Page({
  data: {
    craft: null,
    phases: [],
    completedSteps: 0,
    progressPercent: 0
  },

  onLoad(options) {
    const { craftId } = options;
    this.loadCraftDetail(craftId);
  },

  async loadCraftDetail(craftId) {
    const { result } = await wx.cloud.callFunction({
      name: 'getCraftDetail',
      data: { craftId }
    });

    // 处理阶段数据，添加解锁状态
    const phases = result.phases.map((p, index) => ({
      ...p,
      // 第一阶段默认解锁，后续需前一阶段完成
      unlocked: index === 0 || (result.userProgress && result.userProgress.unlockedPhases && result.userProgress.unlockedPhases.includes(p.id)),
      completed: result.userProgress && result.userProgress.phaseProgress && result.userProgress.phaseProgress[p.id] ? result.userProgress.phaseProgress[p.id] : 0
    }));

    const completedSteps = result.userProgress && result.userProgress.completedSteps ? result.userProgress.completedSteps.length : 0;

    this.setData({
      craft: result,
      phases,
      completedSteps,
      progressPercent: (completedSteps / result.totalSteps * 100).toFixed(1)
    });

    // 绘制环形图
    this.drawRing(phases);
  },

  drawRing(phases) {
    const ctx = wx.createCanvasContext('phaseRing');
    const centerX = 100;
    const centerY = 100;
    const radius = 80;

    phases.forEach((phase, index) => {
      const startAngle = (index * 72 - 90) * Math.PI / 180;
      const endAngle = ((index + 1) * 72 - 90) * Math.PI / 180;
      const progress = phase.completed / phase.stepCount;

      // 背景弧
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#eee';
      ctx.lineWidth = 12;
      ctx.stroke();

      // 进度弧
      const progressEnd = startAngle + (endAngle - startAngle) * progress;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, progressEnd);
      ctx.strokeStyle = phase.color;
      ctx.lineWidth = 12;
      ctx.stroke();
    });

    ctx.draw();
  },

  onPhaseTap(e) {
    const { id } = e.currentTarget.dataset;
    const phase = this.data.phases.find(p => p.id === id);

    if (!phase.unlocked) {
      wx.showToast({ title: '请先完成上一阶段', icon: 'none' });
      return;
    }

    wx.navigateTo({
      url: `/traditional/traditional/pages/phaseDetail/phaseDetail?craftId=${this.data.craft._id}&phaseId=${id}`
    });
  }
});