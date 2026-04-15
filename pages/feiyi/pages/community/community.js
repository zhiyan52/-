// 非遗匠心社区页面
Page({
  data: {
    userInfo: {},
    activeTab: 'hot',
    postList: [
      {
        id: 1,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%201&image_size=square',
        username: '非遗传承人',
        time: '2小时前',
        content: '今天学习了剪纸艺术，感受到了传统文化的魅力。每一刀每一剪都蕴含着匠人的心血！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20paper%20cutting%20art&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20chinese%20craft&image_size=landscape_16_9'
        ],
        tags: ['剪纸', '传统工艺'],
        likeCount: 156,
        commentCount: 42,
        collectCount: 58,
        isLiked: false,
        isCollected: false
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%202&image_size=square',
        username: '手工艺爱好者',
        time: '5小时前',
        content: '景德镇陶瓷制作体验，从拉坯到上釉，每一步都需要极大的耐心和技巧。致敬传统工匠精神！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jingdezhen%20porcelain%20making&image_size=landscape_16_9'
        ],
        tags: ['陶瓷', '景德镇'],
        likeCount: 289,
        commentCount: 56,
        collectCount: 102,
        isLiked: true,
        isCollected: true
      },
      {
        id: 3,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%203&image_size=square',
        username: '文化守护者',
        time: '昨天',
        content: '参观了蜀锦织造工坊，被那些精美的图案和复杂的工艺深深震撼。希望这些传统技艺能够代代相传！',
        images: [],
        tags: ['蜀锦', '织造工艺'],
        likeCount: 345,
        commentCount: 78,
        collectCount: 167,
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
        username: '工艺爱好者',
        content: '剪纸真的很考验耐心和技巧！',
        time: '1小时前'
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%205&image_size=square',
        username: '传统文化迷',
        content: '希望更多人能了解和传承这些技艺',
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
      url: '/pages/feiyi/pages/create-post/create-post'
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
          username: '传统技艺研究者',
          time: '2天前',
          content: '皮影戏的表演艺术令人叹为观止，光影之间演绎千年故事。推荐大家去体验一下！',
          images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20shadow%20puppetry&image_size=landscape_16_9'
          ],
          tags: ['皮影戏', '传统戏剧'],
          likeCount: 512,
          commentCount: 98,
          collectCount: 256,
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
      title: '非遗匠心社区 - 分享你的非遗故事',
      path: '/pages/feiyi/pages/community/community',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20community&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '非遗匠心社区 - 分享你的非遗故事',
      query: '',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20community&image_size=landscape_16_9'
    };
  }
});
