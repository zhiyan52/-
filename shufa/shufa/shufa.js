// shufa/shufa/shufa.js
Page({
  data: {
    bannerList: [
      {
        id: 1,
        title: '每日一题：兰亭序临帖',
        image: '/images/blank.png',
        url: '/shufa/shufa/pages/calligraphy/copybook'
      },
      {
        id: 2,
        title: '名家推荐：颜真卿多宝塔',
        image: '/images/blank.png',
        url: '/shufa/shufa/pages/calligraphy/copybook'
      },
      {
        id: 3,
        title: '集字创作：春日诗词',
        image: '/images/blank.png',
        url: '/shufa/shufa/pages/calligraphy/creation'
      }
    ],
    recentCopybooks: [
      {
        id: 1,
        title: '兰亭序',
        author: '王羲之',
        image: '/images/blank.png'
      },
      {
        id: 2,
        title: '九成宫醴泉铭',
        author: '欧阳询',
        image: '/images/blank.png'
      },
      {
        id: 3,
        title: '多宝塔感应碑',
        author: '颜真卿',
        image: '/images/blank.png'
      }
    ],
    recommendedCopybooks: [
      {
        id: 1,
        title: '兰亭序',
        author: '王羲之',
        style: '行书',
        image: '/images/blank.png'
      },
      {
        id: 2,
        title: '九成宫醴泉铭',
        author: '欧阳询',
        style: '楷书',
        image: '/images/blank.png'
      },
      {
        id: 3,
        title: '多宝塔感应碑',
        author: '颜真卿',
        style: '楷书',
        image: '/images/blank.png'
      }
    ],
    socialPosts: [
      {
        id: 1,
        user: '书法爱好者',
        avatar: '/images/blank.png',
        content: '今日临写兰亭序，感觉进步了一些',
        image: '/images/blank.png',
        likes: 23,
        comments: 5
      },
      {
        id: 2,
        user: '墨香书斋',
        avatar: '/images/blank.png',
        content: '集字创作：春日偶成',
        image: '/images/blank.png',
        likes: 45,
        comments: 12
      }
    ]
  },

  onLoad() {
    this.loadBannerData();
    this.loadRecentCopybooks();
    this.loadRecommendedCopybooks();
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

  onShareAppMessage() {
    return {
      title: '古雅文轩·书法雅集',
      path: '/shufa/shufa/shufa',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20art%20collection&image_size=landscape_16_9'
    };
  }
});
