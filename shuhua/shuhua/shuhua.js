// pages/shuhua/shuhua.js
Page({
  data: {
    // 轮播图数据 - 使用云存储
    bannerList: [
      {
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/lunbo1.jpg'
      },
      {
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/home/lunbo2.jpg'
      }
    ],
    // 功能模块数据
    modules: [
      { id: 'masters', name: '书画名家图鉴', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/0095abda144e4d70c82b0fbd33bd0160.jpg', desc: '了解历代书画名家' },
      { id: 'artworks', name: '传世书画赏析', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/32f1f49b961898f2093d78154be83528.jpg', desc: '欣赏经典传世作品' },
      { id: 'calligraphy', name: '书法字体科普', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/bfd2b8721affd67f4eccac7f70515c10.jpg', desc: '五大书体知识' },
      { id: 'lintie', name: 'AI临帖', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/327db69d2014124f069a1050dac69d8f.jpg', desc: '智能书法练习' },
      { id: 'quiz', name: '书画知识答题', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/719187bed0b32806e59e52ad009b3e64.jpg', desc: '测试书画知识' },
      { id: 'cards', name: '书画佳句卡片', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/569b659699fc0411e9850f402663f85d.jpg', desc: '生成可保存卡片' },
      { id: 'blind-box', name: '书画盲盒', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/f8d98a95c45daff61694504e41f2f1c8.jpg', desc: '每日一赏' },
      { id: 'ai-image', name: 'AI意境生图', icon: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/e1eb8e81b9df81ccca6d060dd0cf1e5c.jpg', desc: '生成书画风格作品' }
    ],
    // 精选书画数据
    featuredArtworks: [
      {
        id: 1,
        name: '富春山居图',
        author: '黄公望 · 元代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/8ed7f2d71f9023183b8ecca26a6e2e6b.png'
      },
      {
        id: 2,
        name: '千里江山图',
        author: '王希孟 · 北宋',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/d7827934cc3206ee4198aac41ea76210.jpg'
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '书画雅韵' });
    
    // 初始化云开发并加载图片
    this.initCloudAndLoadImages();
  },

  // 初始化云开发并加载图片
  initCloudAndLoadImages() {
    if (!wx.cloud) {
      console.error('云开发未初始化');
      return;
    }
    
    wx.cloud.init({
      env: 'cloud1-8glc9jqob91870fc',
      traceUser: true
    });
    
    this.loadCloudImages();
  },

  // 加载云存储图片临时链接
  loadCloudImages() {
    const { modules, featuredArtworks, bannerList } = this.data;
    const cloudFileIDs = [];
    
    // 收集模块图标
    modules.forEach(item => {
      if (item.icon && item.icon.startsWith('cloud://')) {
        cloudFileIDs.push(item.icon);
      }
    });
    
    // 收集精选书画图片
    featuredArtworks.forEach(item => {
      if (item.image && item.image.startsWith('cloud://')) {
        cloudFileIDs.push(item.image);
      }
    });
    
    // 收集轮播图
    bannerList.forEach(item => {
      if (item.image && item.image.startsWith('cloud://')) {
        cloudFileIDs.push(item.image);
      }
    });
    
    if (cloudFileIDs.length === 0) {
      // 即使没有云存储图片，也要设置模块分组
      this.setModuleRows();
      return;
    }
    
    wx.cloud.getTempFileURL({
      fileList: cloudFileIDs,
      success: (res) => {
        const tempUrlMap = {};
        res.fileList.forEach((file, index) => {
          if (file.tempFileURL) {
            tempUrlMap[cloudFileIDs[index]] = file.tempFileURL;
          }
        });
        
        // 更新模块图标
        const updatedModules = modules.map(item => ({
          ...item,
          icon: tempUrlMap[item.icon] || item.icon
        }));
        
        // 更新精选书画
        const updatedArtworks = featuredArtworks.map(item => ({
          ...item,
          image: tempUrlMap[item.image] || item.image
        }));
        
        // 更新轮播图
        const updatedBannerList = bannerList.map(item => ({
          ...item,
          image: tempUrlMap[item.image] || item.image
        }));
        
        this.setData({
          modules: updatedModules,
          featuredArtworks: updatedArtworks,
          bannerList: updatedBannerList
        });
        
        // 设置模块分组
        this.setModuleRows();
      },
      fail: (err) => {
        console.error('获取云存储图片失败:', err);
        // 即使获取失败，也要设置模块分组
        this.setModuleRows();
      }
    });
  },

  // 将模块分成每行2个的分组
  setModuleRows() {
    const { modules } = this.data;
    const rows = [];
    for (let i = 0; i < modules.length; i += 2) {
      rows.push(modules.slice(i, i + 2));
    }
    this.setData({
      moduleRows: rows
    });
  },

  // 导航到功能模块
  navigateToModule(e) {
    const { id } = e.currentTarget.dataset;

    // 模块路径映射
    const modulePathMap = {
      'masters': '/shuhua/shuhua/pages/masters/masters',
      'artworks': '/shuhua/shuhua/pages/artworks/artworks',
      'lintie': '/shuhua/shuhua/pages/lintie/lintie',
      'ai-image': '/shuhua/shuhua/pages/ai-image/ai-image',
      'calligraphy': '/shuhua/shuhua/pages/calligraphy/calligraphy',
      'quiz': '/shuhua/shuhua/pages/quiz/quiz',
      'cards': '/shuhua/shuhua/pages/cards/cards',
      'blind-box': '/shuhua/shuhua/pages/blind-box/blind-box'
    };

    const targetUrl = modulePathMap[id];
    if (targetUrl) {
      wx.navigateTo({
        url: targetUrl
      });
    } else {
      wx.showToast({
        title: '该功能暂未开放',
        icon: 'none'
      });
    }
  },

  // 图片加载失败处理
  onImageError(e) {
    console.error('图片加载失败:', e);
    const { id } = e.currentTarget.dataset;
    const { featuredArtworks } = this.data;
    const updatedArtworks = featuredArtworks.map(item => {
      if (item.id == id) {
        // 加载失败时使用备用图片
        return {
          ...item,
          image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20traditional%20painting%20${encodeURIComponent(item.name)}&image_size=landscape_4_3`
        };
      }
      return item;
    });
    this.setData({ featuredArtworks: updatedArtworks });
  },

  // 查看精选书画详情
  viewArtworkDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/shuhua/shuhua/pages/artwork-detail/artwork-detail?id=${id}`
    });
  },

  // 导航到智能导览
  navigateToAI() {
    wx.navigateTo({
      url: '/shuhua/shuhua/pages/lintie/lintie'
    });
  },

  // 导航到文化问答
  navigateToQA() {
    wx.navigateTo({
      url: '/shuhua/shuhua/ai/ai-qa'
    });
  },

  // 导航到个性化推荐
  navigateToRecommend() {
    wx.navigateTo({
      url: '/shuhua/shuhua/ai/ai-recommend'
    });
  },

  // 导航到语音讲解
  navigateToVoice() {
    wx.navigateTo({
      url: '/shuhua/shuhua/ai/ai-voice'
    });
  }
});