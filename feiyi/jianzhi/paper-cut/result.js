Page({
  data: {
    pattern: null,
    score: 0,
    stars: 1,
    unfoldData: null,
    foldType: '',

    // 动画控制
    unfoldProgress: 0,
    showFinal: false,

    // 分享
    shareImagePath: ''
  },

  onLoad(options) {
    const { pattern, score, stars, unfold, foldType } = options;

    this.setData({
      pattern: JSON.parse(decodeURIComponent(pattern)),
      score: parseInt(score),
      stars: parseInt(stars),
      unfoldData: JSON.parse(decodeURIComponent(unfold)),
      foldType: foldType
    });

    // 延迟播放展开动画
    setTimeout(() => {
      this.playUnfoldAnimation();
    }, 500);
  },

  onReady() {
    this.drawResult();
  },

  /**
   * 绘制最终作品
   */
  drawResult() {
    const query = wx.createSelectorQuery();
    query.select('#resultCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return;

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;

        const size = 600;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);

        this.drawFinalArtwork(ctx, size);
      });
  },

  /**
   * 绘制完整剪纸作品
   */
  drawFinalArtwork(ctx, size) {
    const { pattern, unfoldData } = this.data;
    const center = size / 2;

    // 背景
    ctx.fillStyle = '#f5f0e8';
    ctx.fillRect(0, 0, size, size);

    // 绘制对称图案
    ctx.save();
    ctx.translate(center, center);

    // 根据折叠次数旋转绘制
    const { foldType } = this.data;
    const foldCount = {
      'none': 1, 'half': 2, 'quarter': 4,
      'triangle': 3, 'pentagon': 5
    }[foldType] || 4;

    for (let i = 0; i < foldCount; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 / foldCount) * i);

      // 绘制用户切割的路径（镂空）
      for (const path of unfoldData.paths) {
        this.drawHollowPath(ctx, path);
      }

      ctx.restore();
    }

    ctx.restore();

    // 保存分享图
    wx.canvasToTempFilePath({
      canvas: ctx.canvas,
      success: (res) => {
        this.setData({ shareImagePath: res.tempFilePath });
      }
    });
  },

  /**
   * 绘制镂空路径
   */
  drawHollowPath(ctx, path) {
    if (path.length < 2) return;

    // 镂空效果：先裁剪再清除
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.closePath();

    // 使用destination-out实现镂空
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#000';
    ctx.fill();

    // 边缘高光
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgba(231, 76, 60, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  },

  /**
   * 展开动画
   */
  playUnfoldAnimation() {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 缓动函数
      const eased = 1 - Math.pow(1 - progress, 3);

      this.setData({ unfoldProgress: eased });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.setData({ showFinal: true });
        this.celebrate();
      }
    };

    animate();
  },

  /**
   * 庆祝效果
   */
  celebrate() {
    // 震动
    wx.vibrateLong();

    // 如果是3星，额外效果
    if (this.data.stars === 3) {
      // 可接入粒子效果或 confetti
    }
  },

  /**
   * 保存作品
   */
  saveWork() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImagePath,
      success: () => {
        wx.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: () => {
        wx.showModal({
          title: '需要授权',
          content: '请允许保存图片到相册',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting();
            }
          }
        });
      }
    });
  },

  /**
   * 再玩一次
   */
  replay() {
    wx.navigateBack();
  },

  /**
   * 分享
   */
  onShareAppMessage() {
    const { pattern, score, stars } = this.data;
    return {
      title: `我剪了一幅${pattern.name}，得了${stars}星！`,
      path: `/mingsu/jianzhi/paper-cut/result?pattern=${encodeURIComponent(JSON.stringify(pattern))}&score=${score}&stars=${stars}`,
      imageUrl: this.data.shareImagePath
    };
  }
});