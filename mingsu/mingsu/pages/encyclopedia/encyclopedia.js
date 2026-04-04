// mingsu/mingsu/pages/encyclopedia/encyclopedia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'all',
    categoryTitle: '全部课程',
    hasMore: false,
    featuredCourse: {
      id: 1,
      title: '二十四节气食俗文化',
      desc: '深入了解中国传统二十四节气对应的食俗文化，不时不食，顺时而食。',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20solar%20terms%20food%20culture%20traditional%20banner&image_size=landscape_16_9',
      duration: '15分钟',
      viewCount: 2580
    },
    courses: [
      {
        id: 1,
        title: '二十四节气食俗文化',
        desc: '了解中国传统二十四节气对应的食俗文化，不时不食，顺时而食。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20solar%20terms%20food%20culture%20traditional&image_size=square',
        category: '节气',
        duration: '15分钟',
        viewCount: 2580,
        tab: 'seasons',
        content: [
          {
            type: 'text',
            content: '二十四节气是中国古代订立的一种用来指导农事的补充历法，是中华民族劳动人民长期经验的积累成果和智慧的结晶。'
          },
          {
            type: 'title',
            content: '春季节气食俗'
          },
          {
            type: 'text',
            content: '立春吃春饼，寓意咬春；清明吃青团，纪念先人；谷雨前后，香椿上市，有"雨前香椿嫩如丝"之说。'
          },
          {
            type: 'title',
            content: '夏季节气食俗'
          },
          {
            type: 'text',
            content: '立夏吃蛋，祈求夏日平安；夏至吃面，有"冬至饺子夏至面"的说法；小暑大暑，宜吃清热解暑的食物。'
          },
          {
            type: 'title',
            content: '秋季节气食俗'
          },
          {
            type: 'text',
            content: '立秋贴秋膘，补偿夏天的损失；中秋吃月饼，象征团圆；重阳吃重阳糕，步步高升。'
          },
          {
            type: 'title',
            content: '冬季节气食俗'
          },
          {
            type: 'text',
            content: '立冬补冬，吃饺子或羊肉；冬至吃饺子，防止耳朵冻伤；腊八喝腊八粥，祈求来年丰收。'
          }
        ]
      },
      {
        id: 2,
        title: '非遗美食制作技艺',
        desc: '探索中国传统非遗美食的制作工艺，感受匠心传承。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20food%20craftsmanship&image_size=square',
        category: '工艺',
        duration: '20分钟',
        viewCount: 1890,
        tab: 'craft',
        content: [
          {
            type: 'text',
            content: '中国传统美食制作技艺是中华文明的重要组成部分，许多技艺已被列入国家级非物质文化遗产名录。'
          },
          {
            type: 'title',
            content: '北京烤鸭制作技艺'
          },
          {
            type: 'text',
            content: '北京烤鸭选用优质填鸭，经过充气、掏膛、洗膛、挂钩、烫皮、打糖、晾皮、烤制等十余道工序，才能呈现出皮脆肉嫩、肥而不腻的完美口感。'
          },
          {
            type: 'title',
            content: '广式月饼制作技艺'
          },
          {
            type: 'text',
            content: '广式月饼以选料讲究、做工精细著称。饼皮采用糖浆皮，馅料丰富多样，包括莲蓉、豆沙、五仁、蛋黄等，象征团圆美满。'
          },
          {
            type: 'title',
            content: '四川泡菜制作技艺'
          },
          {
            type: 'text',
            content: '四川泡菜历史悠久，采用老坛盐水发酵，加入花椒、辣椒、生姜等调料，制作出的泡菜酸爽开胃，是川菜的重要配菜。'
          }
        ]
      },
      {
        id: 3,
        title: '中国八大菜系',
        desc: '了解中国八大菜系的特色与代表菜品，品味地域文化。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20eight%20great%20cuisines%20food%20culture&image_size=square',
        category: '地域',
        duration: '25分钟',
        viewCount: 3200,
        tab: 'regions',
        content: [
          {
            type: 'text',
            content: '中国八大菜系是鲁菜、川菜、粤菜、苏菜、闽菜、浙菜、湘菜、徽菜，各具特色，代表了中国烹饪艺术的最高成就。'
          },
          {
            type: 'title',
            content: '鲁菜 - 北方菜系的代表'
          },
          {
            type: 'text',
            content: '鲁菜讲究咸鲜纯正、火候精湛，擅长爆、炒、烧、炸。代表菜：糖醋鲤鱼、九转大肠、葱烧海参。'
          },
          {
            type: 'title',
            content: '川菜 - 麻辣鲜香的诱惑'
          },
          {
            type: 'text',
            content: '川菜以麻辣著称，有"一菜一格，百菜百味"之说。代表菜：麻婆豆腐、宫保鸡丁、水煮鱼、回锅肉。'
          },
          {
            type: 'title',
            content: '粤菜 - 清淡鲜美的典范'
          },
          {
            type: 'text',
            content: '粤菜选料广泛，口味清淡，讲究原汁原味。代表菜：白切鸡、烧鹅、清蒸石斑鱼、虾饺。'
          }
        ]
      },
      {
        id: 4,
        title: '传统节日美食',
        desc: '探索中国传统节日中的特色美食，感受节日氛围。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20festival%20food%20culture&image_size=square',
        category: '节气',
        duration: '18分钟',
        viewCount: 2150,
        tab: 'seasons',
        content: [
          {
            type: 'text',
            content: '中国传统节日美食承载着深厚的文化内涵，是节日庆典不可或缺的重要组成部分。'
          },
          {
            type: 'title',
            content: '春节 - 饺子与年糕'
          },
          {
            type: 'text',
            content: '春节吃饺子寓意招财进宝，吃年糕寓意年年高升。北方以饺子为主，南方则偏爱年糕和汤圆。'
          },
          {
            type: 'title',
            content: '元宵节 - 汤圆与元宵'
          },
          {
            type: 'text',
            content: '元宵节吃汤圆或元宵，象征团圆美满。汤圆是包出来的，元宵是滚出来的，制作工艺不同。'
          },
          {
            type: 'title',
            content: '端午节 - 粽子'
          },
          {
            type: 'text',
            content: '端午节吃粽子是为了纪念屈原。粽子有甜咸之分，北方多甜粽，南方多咸粽，馅料丰富多样。'
          }
        ]
      },
      {
        id: 5,
        title: '中华茶文化',
        desc: '了解中国茶文化的起源、发展与品茶艺术。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20tea%20culture%20traditional%20ceremony&image_size=square',
        category: '历史',
        duration: '22分钟',
        viewCount: 1680,
        tab: 'history',
        content: [
          {
            type: 'text',
            content: '中国是茶的故乡，茶文化源远流长，是中华文明的重要组成部分。'
          },
          {
            type: 'title',
            content: '茶的起源'
          },
          {
            type: 'text',
            content: '传说神农氏尝百草，日遇七十二毒，得茶而解之。茶树原产于中国西南地区，已有数千年的种植历史。'
          },
          {
            type: 'title',
            content: '六大茶类'
          },
          {
            type: 'text',
            content: '中国茶按发酵程度分为六大类：绿茶（不发酵）、白茶（微发酵）、黄茶（轻发酵）、青茶（半发酵）、红茶（全发酵）、黑茶（后发酵）。'
          },
          {
            type: 'title',
            content: '品茶艺术'
          },
          {
            type: 'text',
            content: '品茶讲究"色、香、味、形"，注重茶具、水质、火候。茶道精神：和、敬、清、寂。'
          }
        ]
      },
      {
        id: 6,
        title: '传统糕点制作',
        desc: '学习中国传统糕点的制作方法和文化寓意。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20pastries%20making%20culture&image_size=square',
        category: '工艺',
        duration: '16分钟',
        viewCount: 1420,
        tab: 'craft',
        content: [
          {
            type: 'text',
            content: '中国传统糕点历史悠久，制作精细，寓意吉祥，是节日庆典和日常生活中不可或缺的美食。'
          },
          {
            type: 'title',
            content: '京式糕点'
          },
          {
            type: 'text',
            content: '京式糕点以北京为代表，重糖重油，口感酥松。代表品种：京八件、萨其马、豌豆黄、驴打滚。'
          },
          {
            type: 'title',
            content: '苏式糕点'
          },
          {
            type: 'text',
            content: '苏式糕点以苏州为代表，选料考究，制作精细，口味清甜。代表品种：苏式月饼、松子糖、枣泥麻饼。'
          },
          {
            type: 'title',
            content: '广式糕点'
          },
          {
            type: 'text',
            content: '广式糕点以广州为代表，品种繁多，造型美观，口味多样。代表品种：广式月饼、马拉糕、萝卜糕。'
          }
        ]
      },
      {
        id: 7,
        title: '江南美食文化',
        desc: '探索江南地区的特色美食和饮食文化。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jiangnan%20chinese%20food%20culture%20traditional&image_size=square',
        category: '地域',
        duration: '19分钟',
        viewCount: 1950,
        tab: 'regions',
        content: [
          {
            type: 'text',
            content: '江南地区水网密布，物产丰富，饮食文化精致细腻，以"鲜、嫩、甜、糯"著称。'
          },
          {
            type: 'title',
            content: '苏州美食'
          },
          {
            type: 'text',
            content: '苏州菜讲究时令，口味清淡偏甜。代表菜：松鼠桂鱼、响油鳝糊、碧螺虾仁、苏式汤面。'
          },
          {
            type: 'title',
            content: '杭州美食'
          },
          {
            type: 'text',
            content: '杭州菜注重原汁原味，讲究刀工。代表菜：西湖醋鱼、东坡肉、龙井虾仁、叫化童鸡。'
          },
          {
            type: 'title',
            content: '上海美食'
          },
          {
            type: 'text',
            content: '上海菜浓油赤酱，咸淡适中。代表菜：红烧肉、白斩鸡、生煎包、小笼包。'
          }
        ]
      },
      {
        id: 8,
        title: '食器文化史',
        desc: '了解中国传统食器的发展历程和文化内涵。',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20food%20utensils%20history%20culture&image_size=square',
        category: '历史',
        duration: '14分钟',
        viewCount: 1280,
        tab: 'history',
        content: [
          {
            type: 'text',
            content: '中国传统食器不仅是饮食器具，更是艺术品，承载着深厚的文化内涵。'
          },
          {
            type: 'title',
            content: '青铜器时代'
          },
          {
            type: 'text',
            content: '商周时期，青铜器是主要食器。鼎是烹煮器具，也是权力象征；簋是盛食器具，有"天子九鼎八簋"之说。'
          },
          {
            type: 'title',
            content: '瓷器时代'
          },
          {
            type: 'text',
            content: '东汉发明瓷器后，瓷质食器逐渐普及。宋代五大名窑（汝、官、哥、钧、定）的瓷器精美绝伦。'
          },
          {
            type: 'title',
            content: '筷子文化'
          },
          {
            type: 'text',
            content: '筷子是中国独特的进食工具，体现了中国文化的智慧。筷子长七寸六分，代表七情六欲；一头圆一头方，象征天圆地方。'
          }
        ]
      }
    ],
    filteredCourses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '食文化小课堂'
    });
    // 初始化显示全部课程
    this.filterCourses('all');
  },

  /**
   * 切换标签
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    const categoryTitles = {
      'all': '全部课程',
      'seasons': '节气课程',
      'regions': '地域课程',
      'craft': '工艺课程',
      'history': '历史课程'
    };
    
    this.setData({ 
      currentTab: tab,
      categoryTitle: categoryTitles[tab]
    });
    
    // 筛选课程
    this.filterCourses(tab);
  },

  /**
   * 筛选课程
   */
  filterCourses(tab) {
    const { courses } = this.data;
    let filteredCourses = [];
    
    if (tab === 'all') {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter(course => course.tab === tab);
    }
    
    this.setData({
      filteredCourses: filteredCourses
    });
  },

  /**
   * 跳转到课程详情
   */
  goToCourseDetail(e) {
    const id = e.currentTarget.dataset.id;
    const course = this.data.courses.find(c => c.id === id);
    
    if (course) {
      // 跳转到课程学习页面
      wx.navigateTo({
        url: `/mingsu/mingsu/pages/encyclopedia/course-detail?id=${id}`,
        fail: (err) => {
          console.error('跳转失败:', err);
          // 如果页面不存在，显示弹窗
          this.showCourseModal(course);
        }
      });
    }
  },

  /**
   * 显示课程弹窗（备用方案）
   */
  showCourseModal(course) {
    wx.showModal({
      title: course.title,
      content: `${course.desc}\n\n时长：${course.duration}\n学习人数：${course.viewCount}人`,
      showCancel: true,
      cancelText: '关闭',
      confirmText: '开始学习',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '开始学习',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 加载更多
   */
  loadMore() {
    wx.showToast({
      title: '没有更多课程了',
      icon: 'none'
    });
    this.setData({
      hasMore: false
    });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.hasMore) {
      this.loadMore();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '民俗百味 | 食文化小课堂',
      path: '/mingsu/mingsu/pages/encyclopedia/encyclopedia',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20food%20culture%20classroom%20banner&image_size=landscape_16_9'
    };
  },

  /**
   * 分享到朋友圈
   */
  onShareTimeline() {
    return {
      title: '民俗百味 | 探索中华饮食文化',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20food%20culture%20classroom%20banner&image_size=landscape_16_9'
    };
  }
})