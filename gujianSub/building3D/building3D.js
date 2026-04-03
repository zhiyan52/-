 // gujianSub/building3d/building3d.js
Page({
  data: {
    building: {
      name: '太和殿',
      dynasty: '明永乐十八年（1420年）',
      location: '北京故宫',
      description: '中国现存最大的木结构大殿，建筑面积2377平方米，重檐庑殿顶，面阔11间，进深5间。'
    },
    
    // 3D控制参数
    scale: 1,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    
    // 拆解层级 0-4
    explosionLevel: 0,
    
    // 部件数据（从下到上）
    parts: [
      {
        id: 'platform',
        name: '台基',
        nameEn: 'PLATFORM',
        color: '#e8e0d5',
        width: 320,
        height: 60,
        baseY: 280,
        zIndex: 1,
        info: {
          title: '三层汉白玉台基',
          content: '高8.13米，雕有1142个龙纹排水口，象征皇权稳固。须弥座式造型，等级最高。',
          tech: '汉白玉雕刻 / 龙纹排水'
        }
      },
      {
        id: 'column',
        name: '立柱',
        nameEn: 'COLUMNS',
        color: '#8b4513',
        width: 280,
        height: 100,
        baseY: 180,
        zIndex: 2,
        info: {
          title: '72根金丝楠木柱',
          content: '直径1.06米，高12.7米。楠木产自四川、云贵，防腐防虫，香气浓郁。',
          tech: '金丝楠木 / 榫卯连接'
        }
      },
      {
        id: 'dougong',
        name: '斗拱',
        nameEn: 'DOUGONG',
        color: '#d4af37',
        width: 300,
        height: 70,
        baseY: 110,
        zIndex: 3,
        info: {
          title: '七踩重昂斗拱',
          content: '出跳七踩，承重与装饰结合。明清时期斗拱逐渐缩小，装饰性增强。',
          tech: '榫卯结构 / 抗震缓冲'
        }
      },
      {
        id: 'roof',
        name: '屋顶',
        nameEn: 'ROOF',
        color: '#c62828',
        width: 340,
        height: 120,
        baseY: -10,
        zIndex: 4,
        info: {
          title: '重檐庑殿顶',
          content: '等级最高的屋顶形式。九条屋脊，十只脊兽，全国唯一。',
          tech: '琉璃瓦 / 九脊顶'
        }
      }
    ],
    
    // 交互状态
    isGesturing: false,
    touchMode: 'none',
    startDistance: 0,
    startAngle: 0,
    lastScale: 1,
    lastRotation: 0,
    startX: 0,
    startY: 0,
    
    // 选中部件
    selectedPart: null,
    showInfo: false,
    
    // 动画
    isAnimating: false,
    isAutoRotating: false
  },

  onLoad() {
    this.initPartPositions();
  },

  onUnload() {
    // 清理自动旋转
    if (this.autoRotateTimer) {
      clearTimeout(this.autoRotateTimer);
    }
  },

  // 初始化部件位置
  initPartPositions() {
    const parts = this.data.parts.map(p => ({
      ...p,
      currentX: 0,
      currentY: p.baseY,
      currentScale: 1,
      currentRotation: 0,
      exploded: false,
      highlight: false
    }));
    
    this.setData({ parts });
  },

  goBack() {
    wx.navigateBack();
  },

  // 触摸开始
  onTouchStart(e) {
    const touches = e.touches;
    
    if (touches.length === 1) {
      // 单指拖动
      this.setData({
        touchMode: 'single',
        startX: touches[0].clientX - this.data.translateX,
        startY: touches[0].clientY - this.data.translateY,
        isGesturing: true
      });
    } else if (touches.length >= 2) {
      // 双指缩放旋转
      const x1 = touches[0].clientX;
      const y1 = touches[0].clientY;
      const x2 = touches[1].clientX;
      const y2 = touches[1].clientY;
      
      this.setData({
        touchMode: 'double',
        startDistance: this.getDistance(x1, y1, x2, y2),
        startAngle: this.getAngle(x1, y1, x2, y2),
        lastScale: this.data.scale,
        lastRotation: this.data.rotation,
        isGesturing: true
      });
    }
  },

  // 触摸移动
  onTouchMove(e) {
    if (!this.data.isGesturing) return;
    
    const touches = e.touches;
    
    if (this.data.touchMode === 'single' && touches.length === 1) {
      // 单指拖动
      const x = touches[0].clientX - this.data.startX;
      const y = touches[0].clientY - this.data.startY;
      
      this.setData({
        translateX: x,
        translateY: y
      });
    } else if (this.data.touchMode === 'double' && touches.length >= 2) {
      // 双指缩放旋转
      const x1 = touches[0].clientX;
      const y1 = touches[0].clientY;
      const x2 = touches[1].clientX;
      const y2 = touches[1].clientY;
      
      const distance = this.getDistance(x1, y1, x2, y2);
      const angle = this.getAngle(x1, y1, x2, y2);
      
      // 缩放限制 0.5-3倍
      let scale = this.data.lastScale * (distance / this.data.startDistance);
      scale = Math.max(0.5, Math.min(3, scale));
      
      const rotation = this.data.lastRotation + (angle - this.data.startAngle);
      
      this.setData({ scale, rotation });
    }
  },

  // 触摸结束
  onTouchEnd() {
    this.setData({
      isGesturing: false,
      touchMode: 'none'
    });
  },

  // 计算两点距离
  getDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // 计算角度
  getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  },

  // 拆解/还原控制
  toggleExplosion() {
    if (this.data.isAnimating) return;
    
    const newLevel = (this.data.explosionLevel + 1) % 5;
    
    this.setData({
      explosionLevel: newLevel,
      isAnimating: true
    });
    
    // 震动反馈
    wx.vibrateShort({ type: newLevel > 0 ? 'medium' : 'light' });
    
    // 计算每个部件的目标位置
    const parts = this.data.parts.map((p, index) => {
      const explodeGap = 50;
      const reverseIndex = this.data.parts.length - 1 - index;
      const offset = newLevel * explodeGap * (reverseIndex + 1) * 0.5;
      
      return {
        ...p,
        currentY: p.baseY - offset,
        exploded: newLevel > 0,
        zIndex: newLevel > 0 ? 10 - index : index + 1
      };
    });
    
    // 动画过渡
    setTimeout(() => {
      this.setData({ 
        parts: parts, 
        isAnimating: false 
      });
    }, 400);
    
    // 显示层级提示
    const tips = ['整体外观', '屋顶升起', '斗拱层', '立柱层', '台基基础', '完全拆解'];
    wx.showToast({
      title: tips[newLevel],
      icon: 'none',
      duration: 800
    });
  },

  // 点击部件
  onPartTap(e) {
    const partId = e.currentTarget.dataset.id;
    const part = this.data.parts.find(p => p.id === partId);
    
    if (!part) return;
    
    // 震动反馈
    wx.vibrateShort({ type: 'light' });
    
    // 更新选中状态
    const parts = this.data.parts.map(p => ({
      ...p,
      highlight: p.id === partId
    }));
    
    this.setData({
      parts: parts,
      selectedPart: part,
      showInfo: true
    });
  },

  // 关闭信息面板
  closeInfo() {
    const parts = this.data.parts.map(p => ({
      ...p,
      highlight: false
    }));
    
    this.setData({
      showInfo: false,
      selectedPart: null,
      parts: parts
    });
  },

  // 阻止冒泡
  stopPropagation() {
    // 空函数用于catchtap
  },

  // 重置视角
  resetView() {
    this.setData({
      scale: 1,
      rotation: 0,
      translateX: 0,
      translateY: 0
    });
    
    wx.showToast({
      title: '视角已重置',
      icon: 'none',
      duration: 1500
    });
  },

  // 自动旋转
  autoRotate() {
    if (this.data.isAutoRotating) {
      // 停止旋转
      this.setData({ isAutoRotating: false });
      if (this.autoRotateTimer) {
        clearTimeout(this.autoRotateTimer);
      }
      return;
    }
    
    this.setData({ isAutoRotating: true });
    
    let angle = this.data.rotation;
    const rotateStep = () => {
      if (!this.data.isAutoRotating) return;
      
      angle += 2;
      this.setData({ rotation: angle });
      
      this.autoRotateTimer = setTimeout(rotateStep, 50);
    };
    
    rotateStep();
    
    // 5秒后自动停止
    this.autoRotateTimer = setTimeout(() => {
      this.setData({ isAutoRotating: false });
    }, 5000);
  },

  // 分享
  onShareAppMessage() {
    return {
      title: `我在探索${this.data.building.name}的营造奥秘`,
      path: '/gujianSub/building3d/building3d'
    };
  }
});
