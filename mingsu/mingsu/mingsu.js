 Page({
  /**
   * 页面的初始数据
   * 已内置无水印适配图片、完整业务状态，直接可用
   */
  data: {
    // 顶部轮播图 - 民俗主题banner 已替换无水印横版适配图
    bannerList: [
      { 
        id: 1, 
        imageUrl: "https://images.pexels.com/photos/16468791/pexels-photo-16468791.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop", 
        title: "春节民俗特辑", 
        link: "" 
      },
      { 
        id: 2, 
        imageUrl: "https://images.pexels.com/photos/17569591/pexels-photo-17569591.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop", 
        title: "二十四节气民俗", 
        link: "" 
      },
      { 
        id: 3, 
        imageUrl: "https://images.pexels.com/photos/6747856/pexels-photo-6747856.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop", 
        title: "非遗民俗传承", 
        link: "" 
      }
    ],
    // 民俗分类列表 - 可扩展、可联动筛选
    categoryList: [
      { id: 0, name: "全部", type: "all" },
      { id: 1, name: "节日民俗", type: "festival" },
      { id: 2, name: "节气民俗", type: "solar" },
      { id: 3, name: "民间习俗", type: "folk" },
      { id: 4, name: "非遗民俗", type: "intangible" }
    ],
    // 民俗内容核心列表
    folkList: [],
    // 当前选中的分类
    currentCategory: 0,
    // 每日打卡成长体系
    isSigned: false, // 今日是否已打卡
    signDays: 0, // 累计打卡天数
    // 收藏功能相关
    collectList: [], // 用户收藏的民俗id列表
    // 分页加载相关 - 性能优化
    page: 1, // 当前页码
    pageSize: 10, // 每页条数
    hasMore: true, // 是否还有更多数据
    loading: false, // 加载状态锁，防止重复请求
    // 每日民俗小知识 - 和首页联动模块
    dailyFolk: {}
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面打开时一次性初始化核心数据
   */
  onLoad(options) {
    this.initPageData();
  },

  /**
   * 生命周期函数--监听页面显示
   * 每次回到页面刷新状态（比如从详情页返回更新收藏状态）
   */
  onShow() {
    this.refreshUserStatus();
  },

  /**
   * 页面核心初始化方法
   * 并行请求提升加载速度
   */
  async initPageData() {
    wx.showLoading({ title: "加载中..." });
    // 并行执行多个初始化请求
    await Promise.all([
      this.getFolkList(),
      this.getDailyFolk(),
      this.getUserLocalData()
    ]);
    wx.hideLoading();
  },

  /**
   * 获取民俗列表数据 - 支持分类筛选、分页
   * 已内置无水印封面图，替换云开发数据库请求即可上线
   */
  async getFolkList(isRefresh = false) {
    const { page, pageSize, currentCategory, categoryList, folkList } = this.data;
    // 防止重复加载
    if (this.data.loading || (!this.data.hasMore && !isRefresh)) return;

    this.setData({ loading: true });

    try {
      // ========== 上线时替换为你的云开发数据库请求 ==========
      // 示例：const res = await wx.cloud.database().collection('folk_list')
      //   .where(currentCategory !== 0 ? { type: categoryList[currentCategory].type } : {})
      //   .skip((page - 1) * pageSize)
      //   .limit(pageSize)
      //   .get();

      // 本地模拟数据 - 已替换无水印正方形适配图，直接运行即可
      const mockData = [
        {
          id: 1,
          title: "春节贴春联的由来",
          cover: "https://images.pexels.com/photos/13672584/pexels-photo-13672584.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
          desc: "春联，起源于桃符，已有两千多年历史...",
          type: "festival",
          viewCount: 1286,
          collectCount: 326
        },
        {
          id: 2,
          title: "清明扫墓的民俗渊源",
          cover: "https://images.pexels.com/photos/4498300/pexels-photo-4498300.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
          desc: "清明扫墓，源自古代的春祭习俗，是慎终追远的传统...",
          type: "festival",
          viewCount: 956,
          collectCount: 218
        },
        {
          id: 3,
          title: "冬至吃饺子的民俗讲究",
          cover: "https://images.pexels.com/photos/6555045/pexels-photo-6555045.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
          desc: "冬至不端饺子碗，冻掉耳朵没人管，源自医圣张仲景的典故...",
          type: "solar",
          viewCount: 1890,
          collectCount: 452
        },
        {
          id: 4,
          title: "剪纸：指尖上的非遗民俗",
          cover: "https://images.pexels.com/photos/7749091/pexels-photo-7749091.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
          desc: "中国剪纸，2009年入选人类非物质文化遗产代表作名录...",
          type: "intangible",
          viewCount: 2105,
          collectCount: 568
        }
      ];

      // 分页逻辑处理
      const newList = isRefresh ? mockData : [...folkList, ...mockData];
      // 模拟是否还有更多数据，上线时根据接口返回判断
      const hasMore = mockData.length === pageSize;

      this.setData({
        folkList: newList,
        hasMore,
        page: isRefresh ? 2 : page + 1,
        loading: false
      });
    } catch (error) {
      this.setData({ loading: false });
      wx.showToast({ title: "加载失败", icon: "error" });
      console.error("民俗列表加载错误：", error);
    }
  },

  /**
   * 分类切换事件 - 带动画联动，重置列表
   */
  onCategoryChange(e) {
    const index = e.currentTarget.dataset.index;
    // 重复点击当前分类不执行操作
    if (index === this.data.currentCategory) return;

    this.setData({
      currentCategory: index,
      page: 1,
      folkList: [],
      hasMore: true
    });
    // 切换分类后重新加载对应数据
    this.getFolkList(true);
  },

  /**
   * 跳转民俗详情页
   */
  goToDetail(e) {
    const item = e.currentTarget.dataset.item;
    // 跳转时携带id，详情页通过id获取对应数据
    wx.navigateTo({
      url: `/mingsu/detail/detail?id=${item.id}&title=${item.title}`
    });
  },

  /**
   * 收藏/取消收藏功能 - 本地存储同步，状态实时更新
   */
  onCollectTap(e) {
    // 阻止冒泡，不触发详情页跳转
    e.stopPropagation();
    const item = e.currentTarget.dataset.item;
    let { collectList } = this.data;
    const isCollected = collectList.includes(item.id);

    if (isCollected) {
      // 取消收藏
      collectList = collectList.filter(id => id !== item.id);
      wx.showToast({ title: "已取消收藏", icon: "none" });
    } else {
      // 新增收藏
      collectList.push(item.id);
      wx.showToast({ title: "收藏成功", icon: "success" });
    }

    // 更新本地存储和页面状态
    wx.setStorageSync("folk_collect_list", collectList);
    this.setData({ collectList });
  },

  /**
   * 每日打卡功能 - 成长体系，和首页文化打卡联动
   */
  onSignTap() {
    if (this.data.isSigned) {
      wx.showToast({ title: "今日已打卡", icon: "none" });
      return;
    }

    const today = new Date().toLocaleDateString();
    const signDays = this.data.signDays + 1;

    // 存储打卡信息到本地
    wx.setStorageSync("folk_sign_info", {
      lastSignDate: today,
      signDays: signDays
    });

    this.setData({
      isSigned: true,
      signDays: signDays
    });

    wx.showToast({
      title: `打卡成功！累计打卡${signDays}天`,
      icon: "success",
      duration: 2000
    });
  },

  /**
   * 获取每日随机民俗小知识 - 和首页每日文化知识联动
   */
  getDailyFolk() {
    const folkKnowledge = [
      { title: "腊月二十四扫尘", desc: "民谚称“腊月二十四，掸尘扫房子”，扫尘有“除陈布新”的含义，寓意着把一切穷运、晦气统统扫出门。" },
      { title: "端午挂艾草", desc: "端午时节挂艾草、菖蒲，是因为它们有驱虫杀菌的作用，民间也认为能辟邪祈福，守护家宅平安。" },
      { title: "中秋赏月", desc: "中秋赏月的习俗源自唐代，盛行于宋代，民间认为中秋月圆象征团圆，赏月寄托了对远方亲人的思念。" }
    ];
    // 随机取一条作为当日推荐
    const randomIndex = Math.floor(Math.random() * folkKnowledge.length);
    this.setData({ dailyFolk: folkKnowledge[randomIndex] });
  },

  /**
   * 读取用户本地存储数据 - 打卡、收藏状态同步
   */
  getUserLocalData() {
    try {
      // 读取收藏列表
      const collectList = wx.getStorageSync("folk_collect_list") || [];
      // 读取打卡信息
      const signInfo = wx.getStorageSync("folk_sign_info") || {};
      const today = new Date().toLocaleDateString();
      const isSigned = signInfo.lastSignDate === today;

      this.setData({
        collectList,
        isSigned,
        signDays: signInfo.signDays || 0
      });
    } catch (error) {
      console.error("本地数据读取错误：", error);
    }
  },

  /**
   * 刷新用户状态 - 页面显示时调用
   */
  refreshUserStatus() {
    this.getUserLocalData();
  },

  /**
   * 图片加载失败处理 - 自动替换缺省图，避免页面空白
   */
  onImageError(e) {
    const { default: defaultImg, key, index } = e.currentTarget.dataset;
    // 缺省图地址，可替换为你自己的默认图
    const fallbackImg = "https://images.pexels.com/photos/17569591/pexels-photo-17569591.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop";
    
    if (key === 'banner') {
      let bannerList = this.data.bannerList;
      bannerList[index].imageUrl = defaultImg || fallbackImg;
      this.setData({ bannerList });
    } else if (key === 'folk') {
      let folkList = this.data.folkList;
      folkList[index].cover = defaultImg || fallbackImg;
      this.setData({ folkList });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({
      page: 1,
      folkList: [],
      hasMore: true
    });
    // 下拉刷新全量数据
    await Promise.all([
      this.getFolkList(true),
      this.getDailyFolk(),
      this.getUserLocalData()
    ]);
    // 停止下拉刷新动画
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getFolkList();
  },

  /**
   * 用户点击右上角分享 - 自定义分享内容
   */
  onShareAppMessage() {
    return {
      title: "民俗百味，探寻中国传统民俗文化",
      path: "/mingsu/mingsu/mingsu",
      imageUrl: "https://images.pexels.com/photos/6747856/pexels-photo-6747856.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop"
    };
  },

  /**
   * 分享到朋友圈 - 适配微信小程序分享能力
   */
  onShareTimeline() {
    return {
      title: "民俗百味 | 探寻中国传统民俗文化的魅力",
      imageUrl: "https://images.pexels.com/photos/6747856/pexels-photo-6747856.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop"
    };
  }
});