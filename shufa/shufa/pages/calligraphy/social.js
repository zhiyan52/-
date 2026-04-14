// shufa/shufa/pages/calligraphy/social.js
Page({
  data: {
    dailyTopic: {
      id: 1,
      title: '今日主题：兰亭序临帖',
      description: '临写兰亭序中的经典段落，感受王羲之的书法魅力',
      image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8b677a88fd9685aa966e94511f716347.jpg?sign=6e625c1570ca448f3cf23c2b7bf0b911&t=1776139483',
      participants: 156,
      deadline: '2026-04-10'
    },
    socialPosts: [
      {
        id: 1,
        user: '书法爱好者',
        avatar: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/89003eeb24629d9a5b896b6e33ee06d8.jpg?sign=324e157cfd7b64939094c91c4b6eaab5&t=1776139730',
        content: '今日临写兰亭序，感觉进步了一些',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/08ee6e2b856248a233bd76704fd62b4a.jpg?sign=90c4e4e9dc52710c2c2db73a0f273d58&t=1776139599',
        likes: 23,
        comments: 5,
        time: '2小时前',
        liked: false
      },
      {
        id: 2,
        user: '墨香书斋',
        avatar: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9d75375720a5aaec22ddfafc02e7e7f9.jpg?sign=dc9e5f9c0e97cca0c637c908e16976ad&t=1776140127',
        content: '集字创作：春日偶成',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/fee0bcd9e2a4df36b1500955169c66e0.jpg?sign=271f94212f5b2fb1819275e26b563865&t=1776139972',
        likes: 45,
        comments: 12,
        time: '4小时前',
        liked: true
      },
      {
        id: 3,
        user: '书法初学者',
        avatar: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/10ccd1f74ad4314415ad32a3e64f57f8.jpg?sign=350d36afaa8d53cc4265bf6d477b65b2&t=1776140320',
        content: '第一次临写九成宫，请大家指教',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/f6e90d7824e50a87beee1c390e34dcd4.jpg?sign=e5a87417a4c76c6f4c66bba073bef45b&t=1776140294',
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
