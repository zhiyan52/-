// shufa/shufa/shufa.js
Page({
  data: {
    bannerList: [
      {
        id: 1,
        title: '每日一题：兰亭序临帖',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20calligraphy%20art%20Lanting%20Xu%20elegant%20traditional%20ink%20painting&image_size=landscape_16_9',
        url: '/shufa/shufa/pages/calligraphy/copybook'
      },
      {
        id: 2,
        title: '名家推荐：颜真卿多宝塔',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0abbae0ad05c709849293bd13c4c0894.jpg?sign=caa248035a87ad04c5ef86ac936c82e2&t=1776168343',
        url: '/shufa/shufa/pages/calligraphy/copybook'
      },
      {
        id: 3,
        title: '集字创作：春日诗词',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/13772bd1a1123fa20a8d1c0d634a37ef.jpg',
        url: '/shufa/shufa/pages/calligraphy/creation'
      },
      {
        id: 4,
        title: '国画欣赏：富春山居图',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/fuchun.jpg?sign=xxx&t=xxx',
        url: '/shufa/shufa/shufa'
      }
    ],
    recentCopybooks: [
      {
        id: 1,
        title: '兰亭序',
        author: '王羲之',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7065908c8ee948baf94da92d8a23159b.jpg?sign=fae9cc6170a0966ad9e67cb9104a82d6&t=1776081395&v=recent1'
      },
      {
        id: 2,
        title: '九成宫醴泉铭',
        author: '欧阳询',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8073854ce4abb2a62478f7eca5623b3c.jpg?sign=882c3ea5cbaf96c33bb0480f52e221e6&t=1776081358&v=recent2'
      },
      {
        id: 3,
        title: '多宝塔感应碑',
        author: '颜真卿',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0abbae0ad05c709849293bd13c4c0894.jpg?sign=ad85d3aedee90f30305dcde9b705276b&t=1776081326&v=recent3'
      }
    ],
    recommendedCopybooks: [
      {
        id: 1,
        title: '兰亭序',
        author: '王羲之',
        style: '行书',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/419d1ef8e81eb7f73406fc4878209967.jpg?sign=88f5317d2cf73df2faa993b33d983c65&t=1776168940'
      },
      {
        id: 2,
        title: '九成宫醴泉铭',
        author: '欧阳询',
        style: '楷书',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8073854ce4abb2a62478f7eca5623b3c.jpg?sign=882c3ea5cbaf96c33bb0480f52e221e6&t=1776081358&v=rec2'
      },
      {
        id: 3,
        title: '多宝塔感应碑',
        author: '颜真卿',
        style: '楷书',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0abbae0ad05c709849293bd13c4c0894.jpg?sign=ad85d3aedee90f30305dcde9b705276b&t=1776081326&v=rec3'
      }
    ],
    paintings: [
      {
        id: 1,
        title: '富春山居图',
        author: '黄公望 · 元代',
        category: '山水画',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/fuchun.jpg?sign=xxx&t=xxx'
      },
      {
        id: 2,
        title: '千里江山图',
        author: '王希孟 · 北宋',
        category: '山水画',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/qianli.jpg?sign=xxx&t=xxx'
      },
      {
        id: 3,
        title: '清明上河图',
        author: '张择端 · 北宋',
        category: '人物画',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg?sign=e74ddbadb70750b501ac085fe694804b&t=1776176161'
      },
      {
        id: 4,
        title: '花鸟画',
        author: '齐白石 · 现代',
        category: '花鸟画',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg?sign=e74ddbadb70750b501ac085fe694804b&t=1776176161'
      }
    ],
    socialPosts: [
      {
        id: 1,
        user: '书法爱好者',
        avatar: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7065908c8ee948baf94da92d8a23159b.jpg?sign=fae9cc6170a0966ad9e67cb9104a82d6&t=1776081395&v=avatar1',
        content: '今日临写兰亭序，感觉进步了一些',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8073854ce4abb2a62478f7eca5623b3c.jpg?sign=882c3ea5cbaf96c33bb0480f52e221e6&t=1776081358&v=social1',
        likes: 23,
        comments: 5
      },
      {
        id: 2,
        user: '墨香书斋',
        avatar: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8073854ce4abb2a62478f7eca5623b3c.jpg?sign=882c3ea5cbaf96c33bb0480f52e221e6&t=1776081358&v=avatar2',
        content: '集字创作：春日偶成',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0abbae0ad05c709849293bd13c4c0894.jpg?sign=ad85d3aedee90f30305dcde9b705276b&t=1776081326&v=social2',
        likes: 45,
        comments: 12
      }
    ]
  },

  onLoad() {
    this.loadBannerData();
    this.loadRecentCopybooks();
    this.loadRecommendedCopybooks();
    this.loadPaintings();
    this.loadSocialPosts();
  },

  loadBannerData() {
    console.log('加载轮播数据');
  },

  loadRecentCopybooks() {
    console.log('加载最近临帖');
  },

  loadRecommendedCopybooks() {
    console.log('加载推荐碑帖');
  },

  loadSocialPosts() {
    console.log('加载雅集动态');
  },

  loadPaintings() {
    console.log('加载国画作品');
  },

  goToPaintingDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/shufa/shufa/pages/calligraphy/painting?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToPaintingCategory(e) {
    const category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: `/shufa/shufa/pages/calligraphy/painting?category=${category}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToCopybookPage() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/copybook',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToCreationPage() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/creation',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToSocialPage() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/social',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToCollectionPage() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/collection',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/shufa/shufa/pages/calligraphy/copybook?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToMessage() {
    wx.showToast({
      title: '消息功能开发中',
      icon: 'none'
    });
  },

  goToMyPage() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/collection',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  goToCommunity() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/community/community',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '古雅文轩·书法雅集',
      path: '/shufa/shufa/shufa',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20art%20collection&image_size=landscape_16_9'
    };
  }
});
