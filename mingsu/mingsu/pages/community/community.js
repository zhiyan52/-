// mingsu/mingsu/pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [
      {
        id: 1,
        user: {
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20style%20avatar%20portrait&image_size=square',
          name: '民俗爱好者'
        },
        content: '今天学习了北京烤鸭的制作工艺，真的很复杂，需要经过选鸭、宰杀、打气、烫皮、挂糖、晾干、烤制等多个步骤。传统文化真的很博大精深！',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck%20making%20process&image_size=square'
        ],
        time: '2小时前',
        likes: 42,
        comments: 8,
        liked: false
      },
      {
        id: 2,
        user: {
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20style%20avatar%20portrait%20female&image_size=square',
          name: '美食文化研究者'
        },
        content: '清明时节，家家户户都在做青团。青团不仅好吃，还有着深刻的文化寓意，象征着对祖先的缅怀。你们家乡有什么特别的清明食俗吗？',
        images: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake&image_size=square',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20qingming%20festival%20food&image_size=square'
        ],
        time: '5小时前',
        likes: 78,
        comments: 15,
        liked: true
      },
      {
        id: 3,
        user: {
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20style%20avatar%20portrait%20old%20man&image_size=square',
          name: '非遗传承人'
        },
        content: '作为苏式月饼的传承人，我认为传统工艺需要年轻一代的关注和传承。每一个步骤都蕴含着前人的智慧，我们要好好保护和发扬这些文化遗产。',
        images: [],
        time: '1天前',
        likes: 126,
        comments: 23,
        liked: false
      }
    ],
    newPostContent: '',
    showPostModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '话题社区'
    });
  },

  /**
   * 打开发布话题弹窗
   */
  openPostModal() {
    this.setData({ showPostModal: true });
  },

  /**
   * 关闭发布话题弹窗
   */
  closePostModal() {
    this.setData({ showPostModal: false });
  },

  /**
   * 输入话题内容
   */
  inputPostContent(e) {
    this.setData({ newPostContent: e.detail.value });
  },

  /**
   * 发布话题
   */
  publishPost() {
    if (!this.data.newPostContent.trim()) {
      wx.showToast({
        title: '请输入话题内容',
        icon: 'info'
      });
      return;
    }

    // 模拟发布过程
    const newPost = {
      id: this.data.posts.length + 1,
      user: {
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20style%20avatar%20portrait&image_size=square',
        name: '我'
      },
      content: this.data.newPostContent,
      images: [],
      time: '刚刚',
      likes: 0,
      comments: 0,
      liked: false
    };

    this.setData({
      posts: [newPost, ...this.data.posts],
      newPostContent: '',
      showPostModal: false
    });

    wx.showToast({
      title: '发布成功！',
      icon: 'success'
    });
  },

  /**
   * 点赞/取消点赞
   */
  toggleLike(e) {
    const postId = e.currentTarget.dataset.id;
    const posts = this.data.posts.map(post => {
      if (post.id == postId) {
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
   * 查看评论
   */
  viewComments(e) {
    const postId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看评论功能开发中...',
      icon: 'info'
    });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})