// shufa/shufa/pages/calligraphy/copybook.js
Page({
  data: {
    copybookCategories: [
      { id: 'zhuan', name: '篆书', icon: '🔤', desc: '古朴典雅' },
      { id: 'li', name: '隶书', icon: '📜', desc: '端庄稳重' },
      { id: 'kai', name: '楷书', icon: '✍️', desc: '方正规范' },
      { id: 'xing', name: '行书', icon: '💨', desc: '流畅自然' },
      { id: 'cao', name: '草书', icon: '🎨', desc: '奔放洒脱' }
    ],
    selectedCategory: 'kai',
    // 按书体分类的碑帖数据
    copybookByCategory: {
      zhuan: [
        {
          id: 101,
          title: '石鼓文',
          author: '先秦石刻',
          style: '篆书',
          dynasty: '先秦',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/e5055c36c1a3141ee0c2d222eb6faad4.jpg?sign=4accc5841afef8297665a55c20060dcc&t=1776167144',
          description: '中国现存最早的石刻文字',
          difficulty: '高'
        },
        {
          id: 102,
          title: '泰山刻石',
          author: '李斯',
          style: '篆书',
          dynasty: '秦代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/e27c0913b4e784255b3ae85d027975e0.jpg?sign=b672f69ab6f8211e2bc66e2f63ba9904&t=1776167431',
          description: '秦代篆书代表作',
          difficulty: '高'
        },
        {
          id: 103,
          title: '峄山碑',
          author: '李斯',
          style: '篆书',
          dynasty: '秦代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/144368a4f3ba48b5daa5f62a6b708f86.jpg?sign=28c658ead32fbec23206c99e6b07afc0&t=1776167548',
          description: '小篆典范之作',
          difficulty: '高'
        }
      ],
      li: [
        {
          id: 201,
          title: '曹全碑',
          author: '佚名',
          style: '隶书',
          dynasty: '汉代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/52df02984c86870a22506123b74db11b.jpg?sign=850246e85d0403f923bd3e427cfb961e&t=1776167744',
          description: '汉隶秀美风格代表',
          difficulty: '中'
        },
        {
          id: 202,
          title: '乙瑛碑',
          author: '佚名',
          style: '隶书',
          dynasty: '汉代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/bd5b9b785b087df8617d55f204450d50.jpg?sign=792c637a1456fde427ba1c3c2dd4b8e6&t=1776167828',
          description: '汉隶端庄风格代表',
          difficulty: '中'
        },
        {
          id: 203,
          title: '张迁碑',
          author: '佚名',
          style: '隶书',
          dynasty: '汉代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8e2e72b9f9e26397fd280ad8122e470a.jpg?sign=a72e9f14899b4125b165c21a8a9a7dca&t=1776168022',
          description: '汉隶古朴风格代表',
          difficulty: '中'
        }
      ],
      kai: [
        {
          id: 301,
          title: '九成宫醴泉铭',
          author: '欧阳询',
          style: '楷书',
          dynasty: '唐代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8073854ce4abb2a62478f7eca5623b3c.jpg?sign=ff1248215f5b66b157953e125583b5c5&t=1776168196',
          description: '欧体楷书代表作',
          difficulty: '中'
        },
        {
          id: 302,
          title: '多宝塔感应碑',
          author: '颜真卿',
          style: '楷书',
          dynasty: '唐代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0abbae0ad05c709849293bd13c4c0894.jpg?sign=caa248035a87ad04c5ef86ac936c82e2&t=1776168343',
          description: '颜体楷书代表作',
          difficulty: '中'
        },
        {
          id: 303,
          title: '玄秘塔碑',
          author: '柳公权',
          style: '楷书',
          dynasty: '唐代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/6f79304a26c5b2e4e33e90281921e1e7.jpg?sign=fea322aed2c854383286bb002d17aac1&t=1776168394',
          description: '柳体楷书代表作',
          difficulty: '中'
        },
        {
          id: 304,
          title: '赵孟頫胆巴碑',
          author: '赵孟頫',
          style: '楷书',
          dynasty: '元代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/51a69a716a40a2d9d572b1f1f5cbd0b6.jpg?sign=5009f4fb81c62ae6fcd8e003cb2722bb&t=1776168545',
          description: '赵体楷书代表作',
          difficulty: '中'
        }
      ],
      xing: [
        {
          id: 401,
          title: '兰亭序',
          author: '王羲之',
          style: '行书',
          dynasty: '东晋',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/419d1ef8e81eb7f73406fc4878209967.jpg?sign=88f5317d2cf73df2faa993b33d983c65&t=1776168940',
          description: '天下第一行书',
          difficulty: '高'
        },
        {
          id: 402,
          title: '祭侄文稿',
          author: '颜真卿',
          style: '行书',
          dynasty: '唐代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/44efb1941137eb6890b074a878c21f80.jpg?sign=18eab703b17557c28afcc38cc09acd5e&t=1776169002',
          description: '天下第二行书',
          difficulty: '高'
        },
        {
          id: 403,
          title: '黄州寒食帖',
          author: '苏轼',
          style: '行书',
          dynasty: '宋代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/69f455c9d71326a1856ee88eabf5cc89.jpg?sign=ec23ae5423bd7f2c465d64271ea6daa8&t=1776169122',
          description: '天下第三行书',
          difficulty: '高'
        }
      ],
      cao: [
        {
          id: 501,
          title: '古诗四帖',
          author: '张旭',
          style: '草书',
          dynasty: '唐代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/deee0242d77c05a52b8a1786f1e3c428.jpg?sign=80ca5e0214c2abdb1bd9b487630259d4&t=1776169208',
          description: '草圣张旭代表作',
          difficulty: '极高'
        },
        {
          id: 502,
          title: '自叙帖',
          author: '怀素',
          style: '草书',
          dynasty: '唐代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/83914b86ff707afd22802671610f0a32.jpg?sign=7980e67f32d161f931c91294bfe1d691&t=1776169325',
          description: '狂草巅峰之作',
          difficulty: '极高'
        },
        {
          id: 503,
          title: '书谱',
          author: '孙过庭',
          style: '草书',
          dynasty: '唐代',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/f893a6e1aeca21f260f1f24ca06a453f.jpg?sign=35930b38ae19adf48b8b4a5b8a19b725&t=1776169647',
          description: '书法理论与艺术完美结合',
          difficulty: '高'
        }
      ]
    },
    currentCopybookList: [],
    gridTypes: [
      { id: 'mizi', name: '米字格' },
      { id: 'tianzi', name: '田字格' },
      { id: 'jiugong', name: '九宫格' },
      { id: 'huigong', name: '回宫格' },
      { id: 'yuan', name: '圆格' },
      { id: 'fang', name: '方格' }
    ],
    selectedGrid: 'mizi',
    selectedCategoryName: '楷书',
    selectedGridName: '米字格'
  },

  onLoad() {
    this.loadCopybookList('kai');
  },

  loadCopybookList(category) {
    const list = this.data.copybookByCategory[category] || [];
    const categoryName = this.getCategoryName(category);
    this.setData({ 
      currentCopybookList: list,
      selectedCategory: category,
      selectedCategoryName: categoryName
    });
  },

  getCategoryName(categoryId) {
    const category = this.data.copybookCategories.find(item => item.id === categoryId);
    return category ? category.name : '楷书';
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.loadCopybookList(category);
  },

  selectGrid(e) {
    const grid = e.currentTarget.dataset.grid;
    const gridName = this.getGridName(grid);
    this.setData({ 
      selectedGrid: grid,
      selectedGridName: gridName
    });
    wx.showToast({
      title: `已选择${gridName}`,
      icon: 'none'
    });
  },

  getGridName(gridId) {
    const grid = this.data.gridTypes.find(g => g.id === gridId);
    return grid ? grid.name : '';
  },

  goToCharacterDetail(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.currentCopybookList.find(c => c.id === id);
    if (item) {
      wx.navigateTo({
        url: `/shufa/shufa/pages/calligraphy/character?id=${id}&style=${this.data.selectedCategory}&grid=${this.data.selectedGrid}`,
        fail: (err) => {
          console.error('跳转失败:', err);
          wx.showToast({ title: '页面加载失败', icon: 'error' });
        }
      });
    }
  },

  startARCopy() {
    wx.showToast({
      title: 'AR投影临摹功能开发中',
      icon: 'none'
    });
  },

  startEvaluation() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showToast({
          title: '智能评测功能开发中',
          icon: 'none'
        });
      }
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '临帖阁 | 古雅文轩',
      path: '/shufa/shufa/pages/calligraphy/copybook',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20copybook%20practice%20traditional%20style&image_size=landscape_16_9'
    };
  }
});
