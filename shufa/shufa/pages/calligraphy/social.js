// shufa/shufa/pages/calligraphy/social.js
Page({
  data: {
    dailyTopic: {
      id: 1,
      title: '今日主题：兰亭序临帖',
      description: '临写兰亭序中的经典段落，感受王羲之的书法魅力',
      image: '/images/blank.png',
      participants: 156,
      deadline: '2026-04-10'
    },
    socialPosts: [
      {
        id: 1,
        user: '书法爱好者',
        avatar: '/images/blank.png',
        content: '今日临写兰亭序，感觉进步了一些',
        image: '/images/blank.png',
        likes: 23,
        comments: 5,
        time: '2小时前',
        liked: false
      },
      {
        id: 2,
        user: '墨香书斋',
        avatar: '/images/blank.png',
        content: '集字创作：春日偶成',
        image: '/images/blank.png',
        likes: 45,
        comments: 12,
        time: '4小时前',
        liked: true
      },
      {
        id: 3,
        user: '书法初学者',
        avatar: '/images/blank.png',
        content: '第一次临写九成宫，请大家指教',
        image: '/images/blank.png',
        likes: 18,
        comments: 8,
        time: '6小时前',
        liked: false
      }
    ],
    comments: [
      {
        id: 1,
        user: '书法大师',
        content: '结构不错，笔画可以更流畅',
        time: '1小时前'
      },
      {
        id: 2,
        user: '初学者',
        content: '写得真好，向你学习',
        time: '30分钟前'
      }
    ],
    showComments: false,
    selectedPostId: null,
    commentInput: ''
  },

  onLoad() {
    this.loadDailyTopic();
    this.loadSocialPosts();
  },

  loadDailyTopic() {
    console.log('加载每日一题');
  },

  loadSocialPosts() {
    console.log('加载雅集动态');
  },

  joinDailyTopic() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/calligraphy/copybook',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  toggleLike(e) {
    const postId = e.currentTarget.dataset.id;
    const posts = this.data.socialPosts;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    this.setData({ socialPosts: updatedPosts });
  },

  showComments(e) {
    const postId = e.currentTarget.dataset.id;
    this.setData({ showComments: true, selectedPostId: postId });
  },

  closeComments() {
    this.setData({ showComments: false, selectedPostId: null });
  },

  handleCommentInput(e) {
    this.setData({ commentInput: e.detail.value });
  },

  submitComment() {
    if (!this.data.commentInput.trim()) {
      wx.showToast({ title: '请输入评论内容', icon: 'error' });
      return;
    }

    wx.showToast({ title: '评论已提交', icon: 'success' });
    this.setData({ commentInput: '' });
  },

  goToUserProfile(e) {
    const userId = e.currentTarget.dataset.userId;
    wx.showToast({
      title: '用户详情页开发中',
      icon: 'none'
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '雅集社 | 古雅文轩',
      path: '/shufa/shufa/pages/calligraphy/social',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20social%20community&image_size=landscape_16_9'
    };
  }
});
