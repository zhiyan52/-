// mingsu/pages/calendar/calendar.js
Page({
  data: {
    activeTab: 'festival', // festival or solar
    festivals: [
      {
        id: 'spring-festival',
        name: '春节',
        date: '农历正月初一',
        origin: '春节起源于殷商时期年头岁尾的祭神祭祖活动，是中国最隆重的传统节日。',
        activities: ['贴春联', '放鞭炮', '吃年夜饭', '拜年', '发压岁钱'],
        meaning: '团圆、辞旧迎新、祈福纳祥',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/2.jpg'
      },
      {
        id: 'lantern-festival',
        name: '元宵节',
        date: '农历正月十五',
        origin: '元宵节起源于汉代，是春节之后的第一个重要节日。',
        activities: ['赏花灯', '吃元宵', '猜灯谜', '舞龙舞狮'],
        meaning: '团圆、光明、希望',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/微3.jpg'
      },
      {
        id: 'dragon-boat-festival',
        name: '端午节',
        date: '农历五月初五',
        origin: '端午节是为了纪念战国时期楚国诗人屈原。',
        activities: ['赛龙舟', '吃粽子', '挂艾草', '饮雄黄酒'],
        meaning: '爱国、驱邪避毒',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/4.jpg'
      },
      {
        id: 'mid-autumn',
        name: '中秋节',
        date: '农历八月十五',
        origin: '中秋节起源于古代帝王的祭月活动，后来逐渐成为民间的团圆节日。',
        activities: ['赏月', '吃月饼', '赏桂花', '燃灯'],
        meaning: '团圆、美满、思念',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/5.jpg'
      },
      {
        id: 'double-ninth',
        name: '重阳节',
        date: '农历九月初九',
        origin: '重阳节起源于汉代，是为了避邪祈福。',
        activities: ['登高', '插茱萸', '赏菊花', '饮菊花酒'],
        meaning: '敬老、祈福、健康',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/new/6.jpg'
      }
    ],
    solarTerms: [
      {
        id: 'spring-begins',
        name: '立春',
        date: '2月3-5日',
        origin: '立春是二十四节气之首，表示春季开始。',
        activities: ['迎春', '鞭春牛', '咬春'],
        meaning: '万物复苏、生机盎然',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beginning%20of%20Spring%20traditional%20scene%2C%20ink%20painting%20style&image_size=square_hd'
      },
      {
        id: 'qingming',
        name: '清明',
        date: '4月4-6日',
        origin: '清明是节气与节日合一的日子，既是自然节气，也是传统节日。',
        activities: ['扫墓祭祖', '踏青', '插柳', '放风筝'],
        meaning: '缅怀先人、亲近自然',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Qingming%20Festival%20spring%20outing%20scene%2C%20ink%20painting%20style&image_size=square_hd'
      },
      {
        id: 'summer-begins',
        name: '立夏',
        date: '5月5-7日',
        origin: '立夏表示夏季开始，万物进入生长旺季。',
        activities: ['尝新', '秤人', '吃立夏蛋'],
        meaning: '万物生长、繁荣昌盛',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beginning%20of%20Summer%20traditional%20scene%2C%20ink%20painting%20style&image_size=square_hd'
      },
      {
        id: 'autumn-begins',
        name: '立秋',
        date: '8月7-9日',
        origin: '立秋表示秋季开始，万物开始收敛。',
        activities: ['贴秋膘', '啃秋', '晒秋'],
        meaning: '丰收、收敛、感恩',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beginning%20of%20Autumn%20harvest%20scene%2C%20ink%20painting%20style&image_size=square_hd'
      },
      {
        id: 'winter-begins',
        name: '立冬',
        date: '11月7-8日',
        origin: '立冬表示冬季开始，万物开始收藏。',
        activities: ['补冬', '吃饺子', '酿黄酒'],
        meaning: '收藏、保暖、养生',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beginning%20of%20Winter%20traditional%20scene%2C%20ink%20painting%20style&image_size=square_hd'
      }
    ],
    selectedItem: null
  },

  onLoad(options) {
    wx.setNavigationBarTitle({ title: '节气图鉴' });
    
    // 如果从首页精选跳转，直接显示对应内容
    if (options.featured) {
      this.setData({ activeTab: 'festival' });
      const selectedItem = this.data.festivals.find(f => f.id === options.featured);
      if (selectedItem) {
        this.setData({ selectedItem });
      }
    }
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab, selectedItem: null });
  },

  selectItem(e) {
    const { item } = e.currentTarget.dataset;
    this.setData({ selectedItem: item });
  },

  closeDetail() {
    this.setData({ selectedItem: null });
  },

  onShareAppMessage() {
    return {
      title: '吴雅文轩 · 节气图鉴',
      path: '/mingsu/pages/calendar/calendar'
    };
  }
});