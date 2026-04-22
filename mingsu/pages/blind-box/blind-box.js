// mingsu/pages/blind-box/blind-box.js
Page({
  data: {
    blindBoxContents: [
      {
        type: 'poem',
        content: '清明时节雨纷纷，路上行人欲断魂',
        title: '节气古诗',
        description: '杜牧《清明》'
      },
      {
        type: 'knowledge',
        content: '压岁钱的由来：传说古时候有一个叫"祟"的小妖，每到除夕夜就出来摸小孩的头，小孩就会发高烧说胡话。后来人们发现用红纸包着铜钱放在小孩枕头底下，祟就不敢靠近了，这就是压岁钱的由来。',
        title: '民俗小知识',
        description: '压岁钱的传说'
      },
      {
        type: 'image',
        content: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20folk%20festival%20scene%2C%20ink%20painting%20style&image_size=square_hd',
        title: '古风节气小图',
        description: '传统节日场景'
      },
      {
        type: 'custom',
        content: '春节贴春联的习俗：春联起源于桃符，最初是用来驱邪避灾的。后来逐渐演变成表达美好愿望的对联，成为春节的重要习俗之一。',
        title: '传统习俗介绍',
        description: '贴春联的讲究'
      },
      {
        type: 'poem',
        content: '但愿人长久，千里共婵娟',
        title: '节气古诗',
        description: '苏轼《水调歌头》'
      },
      {
        type: 'knowledge',
        content: '中秋赏月的习俗：中秋节赏月的习俗起源于古代帝王的祭月活动，后来逐渐成为民间的传统习俗。人们通过赏月来寄托对亲人的思念和对美好生活的向往。',
        title: '民俗小知识',
        description: '中秋赏月的由来'
      },
      {
        type: 'image',
        content: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20Dragon%20Boat%20Festival%20scene%2C%20ink%20painting%20style&image_size=square_hd',
        title: '古风节气小图',
        description: '端午节龙舟竞渡'
      },
      {
        type: 'custom',
        content: '重阳节登高的习俗：重阳节登高的习俗起源于汉代，最初是为了避邪祈福。后来逐渐演变成一种健身活动，人们通过登高来锻炼身体，欣赏秋天的美景。',
        title: '传统习俗介绍',
        description: '重阳登高的意义'
      }
    ],
    openedBox: null,
    isOpening: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '民俗风物盲盒' });
  },

  async openBlindBox() {
    this.setData({ isOpening: true });

    // 模拟开盒动画
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 随机选择一个内容
    const randomIndex = Math.floor(Math.random() * this.data.blindBoxContents.length);
    const selectedContent = this.data.blindBoxContents[randomIndex];

    this.setData({ openedBox: selectedContent, isOpening: false });
  },

  closeResult() {
    this.setData({ openedBox: null });
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · 民俗风物盲盒',
      path: '/mingsu/pages/blind-box/blind-box'
    };
  }
});