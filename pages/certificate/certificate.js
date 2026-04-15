// pages/certificate/certificate.js
Page({
  data: {
    currentTab: 'badge',
    badges: [
      {
        id: 1,
        title: '初露锋芒',
        desc: '连续打卡7天',
        icon: '🏅',
        achieved: true,
        progress: 100,
        requirement: '连续打卡7天'
      },
      {
        id: 2,
        title: '文化达人',
        desc: '连续打卡30天',
        icon: '🎖️',
        achieved: true,
        progress: 100,
        requirement: '连续打卡30天'
      },
      {
        id: 3,
        title: '传承使者',
        desc: '连续打卡60天',
        icon: '🌟',
        achieved: false,
        progress: 75,
        requirement: '连续打卡60天'
      },
      {
        id: 4,
        title: '文化守护者',
        desc: '连续打卡100天',
        icon: '👑',
        achieved: false,
        progress: 45,
        requirement: '连续打卡100天'
      },
      {
        id: 5,
        title: '古建探索者',
        desc: '学习10篇古建知识',
        icon: '🏯',
        achieved: true,
        progress: 100,
        requirement: '学习10篇古建知识'
      },
      {
        id: 6,
        title: '非遗传承者',
        desc: '学习10篇非遗知识',
        icon: '🎭',
        achieved: true,
        progress: 100,
        requirement: '学习10篇非遗知识'
      },
      {
        id: 7,
        title: '民俗达人',
        desc: '学习10篇民俗知识',
        icon: '🍲',
        achieved: false,
        progress: 60,
        requirement: '学习10篇民俗知识'
      },
      {
        id: 8,
        title: '书画爱好者',
        desc: '学习10篇书画知识',
        icon: '✍️',
        achieved: false,
        progress: 30,
        requirement: '学习10篇书画知识'
      }
    ],
    certificates: [
      {
        id: 1,
        userName: '文化探索者',
        content: '完成"初露锋芒"挑战，连续打卡7天，展现了对文化学习的热爱与坚持。',
        date: '2026年4月10日',
        number: 'WH202604100001'
      },
      {
        id: 2,
        userName: '文化探索者',
        content: '完成"古建探索者"任务，深入学习了10篇古建筑知识，对传统建筑有了更深入的了解。',
        date: '2026年4月12日',
        number: 'WH202604120002'
      },
      {
        id: 3,
        userName: '文化探索者',
        content: '完成"非遗传承者"任务，深入学习了10篇非物质文化遗产知识，为文化传承贡献了一份力量。',
        date: '2026年4月15日',
        number: 'WH202604150003'
      },
      {
        id: 4,
        userName: '文化探索者',
        content: '完成"文化达人"挑战，连续打卡30天，展现了对文化学习的持之以恒的精神。',
        date: '2026年4月16日',
        number: 'WH202604160004'
      }
    ],
    showBadgeModal: false,
    showCertificateModal: false,
    selectedBadge: null,
    selectedCertificate: null
  },

  onLoad(options) {
    this.loadData();
  },

  loadData() {
    wx.showLoading({ title: '加载中...' });
    setTimeout(() => {
      wx.hideLoading();
    }, 500);
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
  },

  viewBadgeDetail(e) {
    const id = e.currentTarget.dataset.id;
    const badge = this.data.badges.find(b => b.id === id);
    this.setData({
      selectedBadge: badge,
      showBadgeModal: true
    });
  },

  viewCertificateDetail(e) {
    const id = e.currentTarget.dataset.id;
    const certificate = this.data.certificates.find(c => c.id === id);
    this.setData({
      selectedCertificate: certificate,
      showCertificateModal: true
    });
  },

  hideBadgeModal() {
    this.setData({ showBadgeModal: false });
  },

  hideCertificateModal() {
    this.setData({ showCertificateModal: false });
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  saveCertificate(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '证书已保存到相册',
      icon: 'success',
      duration: 2000
    });
  },

  shareBadge() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    wx.showToast({
      title: '准备分享徽章',
      icon: 'none'
    });
  },

  shareCertificate(e) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    wx.showToast({
      title: '准备分享证书',
      icon: 'none'
    });
  },

  shareAll() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '我的数字证书 - 文化学习成就',
      path: '/pages/certificate/certificate',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20culture%20certificate%20badge%20achievement&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '我的数字证书 - 文化学习成就',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20culture%20certificate%20badge%20achievement&image_size=landscape_16_9'
    };
  }
});
