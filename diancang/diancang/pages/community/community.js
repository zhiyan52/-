// 典藏拾珠社区页面
Page({
  data: {
    userInfo: {},
    activeTab: 'hot',
    postList: [
      {
        id: 1,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%201&image_size=square',
        username: '收藏家',
        time: '2小时前',
        content: '今天入手了一件清代青花瓷瓶，釉色温润，画工精美，真是难得的精品！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20blue%20and%20white%20porcelain%20vase&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=antique%20chinese%20ceramics&image_size=landscape_16_9'
        ],
        tags: ['青花瓷', '清代'],
        likeCount: 189,
        commentCount: 45,
        collectCount: 67,
        isLiked: false,
        isCollected: false
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%202&image_size=square',
        username: '古董鉴赏家',
        time: '5小时前',
        content: '分享一些鉴别古董的小技巧：看包浆、观纹饰、辨工艺、查款识。希望大家都能收藏到心仪的宝贝！',
        images: [],
        tags: ['鉴赏技巧', '收藏知识'],
        likeCount: 312,
        commentCount: 78,
        collectCount: 145,
        isLiked: true,
        isCollected: true
      },
      {
        id: 3,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%203&image_size=square',
        username: '文玩爱好者',
        time: '昨天',
        content: '这串老蜜蜡手串盘了三个月，终于有了漂亮的包浆！坚持就是胜利！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=amber%20beads%20bracelet%20chinese&image_size=landscape_16_9'
        ],
        tags: ['蜜蜡', '文玩'],
        likeCount: 267,
        commentCount: 56,
        collectCount: 89,
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
        username: '瓷器爱好者',
        content: '青花瓷真的很美，恭喜入手！',
        time: '1小时前'
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%205&image_size=square',
        username: '收藏新手',
        content: '学习了，感谢分享鉴别技巧！',
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
      url: '/diancang/diancang/pages/create-post/create-post'
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
          username: '玉器收藏者',
          time: '2天前',
          content: '这块和田玉籽料皮色漂亮，肉质细腻，是难得的精品。分享给大家欣赏！',
          images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hetian%20jade%20seed%20material&image_size=landscape_16_9'
          ],
          tags: ['和田玉', '籽料'],
          likeCount: 456,
          commentCount: 89,
          collectCount: 234,
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
      title: '典藏拾珠社区 - 分享你的典藏心得',
      path: '/diancang/diancang/pages/community/community',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20antique%20collection%20community&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '典藏拾珠社区 - 分享你的典藏心得',
      query: '',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20antique%20collection%20community&image_size=landscape_16_9'
    };
  }
});
