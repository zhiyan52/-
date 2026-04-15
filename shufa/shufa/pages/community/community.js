// 书画雅集社区页面
Page({
  data: {
    userInfo: {},
    activeTab: 'hot',
    postList: [
      {
        id: 1,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%201&image_size=square',
        username: '书法爱好者',
        time: '2小时前',
        content: '今天临摹了王羲之的《兰亭序》，感受到了行书的飘逸与洒脱，每一笔都蕴含着无穷的韵味！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20lantingxu&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20brush%20calligraphy&image_size=landscape_16_9'
        ],
        tags: ['书法', '兰亭序'],
        likeCount: 198,
        commentCount: 52,
        collectCount: 78,
        isLiked: false,
        isCollected: false
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%202&image_size=square',
        username: '国画学习者',
        time: '5小时前',
        content: '分享一幅今天创作的山水画，学习了三个月的成果，请大家多多指教！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20landscape%20painting&image_size=landscape_16_9'
        ],
        tags: ['国画', '山水画'],
        likeCount: 324,
        commentCount: 89,
        collectCount: 156,
        isLiked: true,
        isCollected: true
      },
      {
        id: 3,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%203&image_size=square',
        username: '艺术鉴赏家',
        time: '昨天',
        content: '参观了一场书画展，看到了很多大师的真迹，感受到了中国传统艺术的博大精深！',
        images: [],
        tags: ['书画展', '艺术鉴赏'],
        likeCount: 389,
        commentCount: 98,
        collectCount: 189,
        isLiked: false,
        isCollected: false
      }
    ],
    hasMore: true,
    showCommentModal: false,
    showFeedbackModal: false,
    currentPost: {},
    commentList: [
      {
        id: 1,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%204&image_size=square',
        username: '书法学习者',
        content: '兰亭序确实是行书的巅峰之作！',
        time: '1小时前'
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%205&image_size=square',
        username: '国画爱好者',
        content: '山水画很有意境，继续加油！',
        time: '30分钟前'
      }
    ],
    commentInput: '',
    feedbackType: 'suggest',
    feedbackContent: '',
    feedbackContact: ''
  },

  onLoad() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({ userInfo: userInfo });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.loadPosts(tab);
  },

  loadPosts(tab) {
    wx.showLoading({ title: '加载中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '加载完成', icon: 'success' });
    }, 500);
  },

  createPost() {
    wx.navigateTo({
      url: '/shufa/shufa/pages/create-post/create-post'
    });
  },

  toggleLike(e) {
    const postId = e.currentTarget.dataset.id;
    const postList = this.data.postList;
    const post = postList.find(p => p.id === postId);

    if (post) {
      post.isLiked = !post.isLiked;
      post.likeCount += post.isLiked ? 1 : -1;
      this.setData({ postList: postList });

      wx.showToast({
        title: post.isLiked ? '点赞成功' : '取消点赞',
        icon: 'success'
      });
    }
  },

  toggleCollect(e) {
    const postId = e.currentTarget.dataset.id;
    const postList = this.data.postList;
    const post = postList.find(p => p.id === postId);

    if (post) {
      post.isCollected = !post.isCollected;
      post.collectCount += post.isCollected ? 1 : -1;
      this.setData({ postList: postList });

      wx.showToast({
        title: post.isCollected ? '收藏成功' : '取消收藏',
        icon: 'success'
      });
    }
  },

  showComments(e) {
    const postId = e.currentTarget.dataset.id;
    const post = this.data.postList.find(p => p.id === postId);

    if (post) {
      this.setData({
        showCommentModal: true,
        currentPost: post
      });
    }
  },

  hideComments() {
    this.setData({ showCommentModal: false });
  },

  stopPropagation() { },

  onCommentInput(e) {
    this.setData({ commentInput: e.detail.value });
  },

  submitComment() {
    const content = this.data.commentInput.trim();

    if (!content) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }

    const newComment = {
      id: Date.now(),
      avatarUrl: this.data.userInfo.avatarUrl || '/components/yonghu.png',
      username: this.data.userInfo.nickName || '匿名用户',
      content: content,
      time: '刚刚'
    };

    const commentList = this.data.commentList;
    commentList.unshift(newComment);

    const postList = this.data.postList;
    const post = postList.find(p => p.id === this.data.currentPost.id);
    if (post) {
      post.commentCount += 1;
    }

    this.setData({
      commentList: commentList,
      postList: postList,
      commentInput: ''
    });

    wx.showToast({ title: '评论成功', icon: 'success' });
  },

  replyComment(e) {
    const commentId = e.currentTarget.dataset.id;
    const comment = this.data.commentList.find(c => c.id === commentId);

    if (comment) {
      this.setData({
        commentInput: `@${comment.username} `
      });
    }
  },

  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    const urls = e.currentTarget.dataset.urls;

    wx.previewImage({
      current: url,
      urls: urls
    });
  },

  sharePost(e) {
    const postId = e.currentTarget.dataset.id;
    const post = this.data.postList.find(p => p.id === postId);

    if (post) {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
  },

  showPostOptions(e) {
    const postId = e.currentTarget.dataset.id;

    wx.showActionSheet({
      itemList: ['举报', '不感兴趣'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.showToast({ title: '举报成功', icon: 'success' });
        } else if (res.tapIndex === 1) {
          wx.showToast({ title: '已屏蔽', icon: 'success' });
        }
      }
    });
  },

  showFeedback() {
    this.setData({ showFeedbackModal: true });
  },

  hideFeedback() {
    this.setData({ showFeedbackModal: false });
  },

  selectFeedbackType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ feedbackType: type });
  },

  onFeedbackInput(e) {
    this.setData({ feedbackContent: e.detail.value });
  },

  onContactInput(e) {
    this.setData({ feedbackContact: e.detail.value });
  },

  submitFeedback() {
    const { feedbackType, feedbackContent, feedbackContact } = this.data;

    if (!feedbackContent.trim()) {
      wx.showToast({ title: '请输入反馈内容', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '提交成功', icon: 'success' });

      this.setData({
        showFeedbackModal: false,
        feedbackContent: '',
        feedbackContact: '',
        feedbackType: 'suggest'
      });
    }, 1000);
  },

  loadMore() {
    wx.showLoading({ title: '加载中...' });

    setTimeout(() => {
      const newPosts = [
        {
          id: Date.now(),
          avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%206&image_size=square',
          username: '篆刻爱好者',
          time: '2天前',
          content: '完成了一方印章的篆刻，从设计到刻制，每一步都需要极大的耐心。分享给大家！',
          images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20seal%20carving&image_size=landscape_16_9'
          ],
          tags: ['篆刻', '印章'],
          likeCount: 512,
          commentCount: 112,
          collectCount: 289,
          isLiked: false,
          isCollected: false
        }
      ];

      const postList = this.data.postList.concat(newPosts);

      this.setData({
        postList: postList,
        hasMore: false
      });

      wx.hideLoading();
      wx.showToast({ title: '加载完成', icon: 'success' });
    }, 1000);
  },

  onShareAppMessage() {
    return {
      title: '书画雅集社区 - 分享你的书画作品',
      path: '/shufa/shufa/pages/community/community',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20painting%20community&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '书画雅集社区 - 分享你的书画作品',
      query: '',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20painting%20community&image_size=landscape_16_9'
    };
  }
});
