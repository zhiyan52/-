// gujianSub/discover/discover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'recommend',
    posts: [
      {
        id: 1,
        type: 'user',
        user: {
          name: '营造师·小李',
          avatar: '/images/blank.png'
        },
        content: '探访了晋祠圣母殿',
        description: '宋代彩塑的巅峰之作，侍女像神态各异',
        images: [
          '/images/blank.png',
          '/images/blank.png',
          '/images/blank.png'
        ],
        likes: 128,
        comments: 32,
        time: '2小时前',
        location: '山西太原',
        liked: false
      },
      {
        id: 2,
        type: 'official',
        user: {
          name: '古建雅韵',
          avatar: '/images/blank.png',
          isOfficial: true
        },
        content: '今日营造：独乐寺观音阁',
        description: '现存最古老的木构楼阁，看斗拱如何承重',
        video: '/images/blank.png',
        likes: 356,
        comments: 89,
        time: '5小时前',
        location: '官方推荐',
        liked: false
      },
      {
        id: 3,
        type: 'topic',
        topic: '营造学堂作业',
        content: '用户完成的斗拱模型作品',
        images: [
          '/images/blank.png',
          '/images/blank.png'
        ],
        likes: 89,
        comments: 23,
        time: '1天前',
        location: '线上',
        liked: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 切换Tab
   */
  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab });
  },

  /**
   * 跳转到搜索页面
   */
  goToSearch() {
    wx.navigateTo({
      url: '/gujianSub/search/search',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 跳转到消息页面
   */
  goToMessage() {
    wx.navigateTo({
      url: '/gujianSub/message/message',
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  },

  /**
   * 点赞
   */
  likePost(e) {
    const id = e.currentTarget.dataset.id;
    const posts = this.data.posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });
    this.setData({ posts });
  },

  /**
   * 评论
   */
  commentPost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '评论功能开发中', icon: 'none' });
  },

  /**
   * 分享
   */
  sharePost(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '分享功能开发中', icon: 'none' });
  },

  /**
   * 跳转到详情页面
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/gujianSub/gongdian/detail?id=${id}`,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({ title: '页面加载失败', icon: 'error' });
      }
    });
  }
})
