// 古建雅韵社区页面
Page({
  data: {
    userInfo: {},
    activeTab: 'hot',
    postList: [
      {
        id: 1,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%201&image_size=square',
        username: '古建爱好者',
        time: '2小时前',
        content: '今天参观了故宫，被那些精美的古建筑深深震撼！每一处细节都体现了古人的智慧和匠心。',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forbidden%20city%20architecture&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20palace&image_size=landscape_16_9'
        ],
        tags: ['故宫', '古建筑'],
        likeCount: 128,
        commentCount: 32,
        collectCount: 45,
        isLiked: false,
        isCollected: false
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%202&image_size=square',
        username: '建筑学者',
        time: '5小时前',
        content: '分享一篇关于中国古代建筑斗拱结构的研究文章，斗拱是中国古建筑中特有的构件，具有承重和装饰双重功能。',
        images: [],
        tags: ['斗拱', '建筑结构'],
        likeCount: 256,
        commentCount: 48,
        collectCount: 89,
        isLiked: true,
        isCollected: true
      },
      {
        id: 3,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%203&image_size=square',
        username: '文化传承者',
        time: '昨天',
        content: '苏州园林的美，在于移步换景，每一处都是一幅画。推荐大家有机会一定要去看看！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20garden%20china&image_size=landscape_16_9'
        ],
        tags: ['苏州园林', '江南建筑'],
        likeCount: 312,
        commentCount: 67,
        collectCount: 156,
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
        username: '游客小明',
        content: '太美了！我也想去看看',
        time: '1小时前'
      },
      {
        id: 2,
        avatarUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=user%20avatar%205&image_size=square',
        username: '建筑迷',
        content: '故宫的建筑确实精美，每个角落都值得细细品味',
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
      url: '/gujian/home/pages/create-post/create-post'
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
          username: '历史迷',
          time: '2天前',
          content: '长城的雄伟壮观，只有亲眼看到才能体会。建议大家有机会一定要去爬一爬！',
          images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=great%20wall%20china&image_size=landscape_16_9'
          ],
          tags: ['长城', '世界遗产'],
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
      title: '古建雅韵社区 - 分享你的古建之旅',
      path: '/gujian/home/pages/community/community',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20architecture%20community&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '古建雅韵社区 - 分享你的古建之旅',
      query: '',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20architecture%20community&image_size=landscape_16_9'
    };
  }
});
