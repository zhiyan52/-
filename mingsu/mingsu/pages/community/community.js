// 民俗百味社区页面
Page({
  data: {
    userInfo: {},
    activeTab: 'hot',
    postList: [
      {
        id: 1,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%201&image_size=square',
        username: '民俗爱好者',
        time: '2小时前',
        content: '今天参加了家乡的庙会，看到了很多传统的民俗表演，舞龙舞狮、踩高跷，太精彩了！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20temple%20fair%20celebration&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dragon%20dance%20chinese%20festival&image_size=landscape_16_9'
        ],
        tags: ['庙会', '民俗表演'],
        likeCount: 178,
        commentCount: 48,
        collectCount: 62,
        isLiked: false,
        isCollected: false
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%202&image_size=square',
        username: '传统美食家',
        time: '5小时前',
        content: '分享一道家乡的传统小吃——糖油粑粑，香甜软糯，是小时候最美好的记忆！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20sweet%20snack&image_size=landscape_16_9'
        ],
        tags: ['传统美食', '家乡味道'],
        likeCount: 298,
        commentCount: 67,
        collectCount: 134,
        isLiked: true,
        isCollected: true
      },
      {
        id: 3,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%203&image_size=square',
        username: '文化传承者',
        time: '昨天',
        content: '学习了传统的扎染工艺，用植物染料在布上创作出美丽的图案，感受到了古人的智慧！',
        images: [],
        tags: ['扎染', '传统工艺'],
        likeCount: 345,
        commentCount: 89,
        collectCount: 178,
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
        username: '民俗迷',
        content: '庙会真的很热闹，传统民俗要传承下去！',
        time: '1小时前'
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%205&image_size=square',
        username: '美食爱好者',
        content: '糖油粑粑看起来好好吃，想学！',
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
      url: '/mingsu/mingsu/pages/create-post/create-post'
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
          username: '传统节日研究者',
          time: '2天前',
          content: '春节的传统习俗：贴春联、放鞭炮、吃年夜饭、拜年。这些习俗承载着中国人对美好生活的向往！',
          images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20spring%20festival%20tradition&image_size=landscape_16_9'
          ],
          tags: ['春节', '传统习俗'],
          likeCount: 478,
          commentCount: 98,
          collectCount: 267,
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
      title: '民俗百味社区 - 分享你的民俗体验',
      path: '/mingsu/mingsu/pages/community/community',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20folk%20culture%20community&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '民俗百味社区 - 分享你的民俗体验',
      query: '',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20folk%20culture%20community&image_size=landscape_16_9'
    };
  }
});
