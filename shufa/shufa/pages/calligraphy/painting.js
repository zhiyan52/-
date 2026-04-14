// shufa/shufa/pages/calligraphy/painting.js
Page({
  data: {
    categories: [
      { id: 'landscape', name: '山水画', icon: '🏔️' },
      { id: 'flower', name: '花鸟画', icon: '🌸' },
      { id: 'figure', name: '人物画', icon: '👤' }
    ],
    activeCategory: 'landscape',
    paintings: {
      landscape: [
        {
          id: 1,
          title: '富春山居图',
          author: '黄公望',
          dynasty: '元代',
          description: '中国十大传世名画之一，以浙江富春江为背景，描绘了初秋时节的山水景色。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/4683f7863010df1610da5fb8f55c8586.jpg?sign=47907566e430dd438465b1ed89aa344e&t=1776177245'
        },
        {
          id: 2,
          title: '千里江山图',
          author: '王希孟',
          dynasty: '北宋',
          description: '青绿山水画的巅峰之作，以长卷形式展现了壮丽的山河景象。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/d7827934cc3206ee4198aac41ea76210.jpg?sign=b3e10fcd0a3e46a5ff93c87caa883ebb&t=1776177369'
        },
        {
          id: 3,
          title: '清明上河图',
          author: '张择端',
          dynasty: '北宋',
          description: '描绘了北宋都城汴京的繁华景象，是中国古代城市生活的百科全书。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/02c50c9ea27b43171c5bc926a5a42b7d.jpg?sign=8b6e39ee41a6dfb6a129068cb6cac879&t=1776177726'
        },
        {
          id: 4,
          title: '溪山行旅图',
          author: '范宽',
          dynasty: '北宋',
          description: '北宋山水画的代表作，以雄浑壮阔的风格著称。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7c1127ad248bc752235f40688be8b378.jpg?sign=b3b2682c5dee499be920b0b0e2608ecd&t=1776177669'
        },
        {
          id: 5,
          title: '庐山高图',
          author: '沈周',
          dynasty: '明代',
          description: '明代吴门画派的代表作，以庐山为题材，气势恢宏。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/1738fd40d17c0f6d43b2a663cb3ff86a.jpg?sign=4b669613e67ff6bad5103e367a0cff5e&t=1776177875'
        }
      ],
      flower: [
        {
          id: 6,
          title: '墨梅图',
          author: '王冕',
          dynasty: '元代',
          description: '以梅花为主题，笔墨简练，意境深远，表达了作者的高洁品格。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/975ec2efc6dce96e668dade73dbb45c3.jpg?sign=aac9c7e36d0410d0f6a5435cfeed3136&t=1776177980'
        },
        {
          id: 7,
          title: '芙蓉锦鸡图',
          author: '赵佶',
          dynasty: '北宋',
          description: '宋徽宗的代表作，工笔花鸟画的典范，色彩艳丽，生动传神。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/b3626940642b37ef0fa5df9c7b426d75.jpg?sign=78248168cfce1b77776b0ba0ec5d7c93&t=1776178064'
        },
        {
          id: 8,
          title: '竹石图',
          author: '郑板桥',
          dynasty: '清代',
          description: '郑板桥的代表作，以画竹闻名，笔墨洒脱，寓意深刻。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/67301c5c0c9c0925d50c4727b33bb521.jpg?sign=966d771276ba79d21f45538c0b93f87a&t=1776178127'
        },
        {
          id: 9,
          title: '牡丹图',
          author: '徐渭',
          dynasty: '明代',
          description: '明代写意花鸟画的代表，笔墨奔放，气势磅礴。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/c12d0e71075c2f6ceca3e77df8be27f9.jpg?sign=f384c746035fc1ccb2c1539764c1f0e9&t=1776178240'
        },
        {
          id: 10,
          title: '寒雀图',
          author: '崔白',
          dynasty: '北宋',
          description: '描绘了冬天的麻雀，生动活泼，富有情趣。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9d3344f7b47ad8adf776b085b12a9f0d.jpg?sign=546b93c5df3e9e01d576a3311b076a4f&t=1776178319'
        }
      ],
      figure: [
        {
          id: 11,
          title: '女史箴图',
          author: '顾恺之',
          dynasty: '东晋',
          description: '中国现存最早的绢本画之一，描绘了古代宫廷妇女的生活场景。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/4ec755bd3e4afa92373dd742d9d5b8f7.jpg?sign=bc4cd2d18c46f805ca5cff942f8ffb38&t=1776178473'
        },
        {
          id: 12,
          title: '步辇图',
          author: '阎立本',
          dynasty: '唐代',
          description: '描绘了唐太宗接见吐蕃使者的场景，是唐代人物画的代表作。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/4ec755bd3e4afa92373dd742d9d5b8f7.jpg?sign=bc4cd2d18c46f805ca5cff942f8ffb38&t=1776178473'
        },
        {
          id: 13,
          title: '簪花仕女图',
          author: '周昉',
          dynasty: '唐代',
          description: '描绘了唐代贵族妇女的生活场景，人物造型丰腴华丽。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9ba80c2749815262b8bde8d2ce88a9ad.jpg?sign=24259ed890558efe075a93279ab1cea7&t=1776179226'
        },
        {
          id: 14,
          title: '捣练图',
          author: '张萱',
          dynasty: '唐代',
          description: '描绘了唐代妇女捣练、织丝的劳动场景，生动传神。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9c54b324b6310b84c46b2f575e59689b.jpg?sign=9fd484775a82ff264f2aab6a79676664&t=1776179254'
        },
        {
          id: 15,
          title: '历代帝王图',
          author: '阎立本',
          dynasty: '唐代',
          description: '描绘了从汉到隋的十三位帝王形象，是研究古代帝王服饰的重要资料。',
          image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/74bf3aecb97b9d061602f156760d98cf.jpg?sign=b0ffd34792be53660fbdc9132913db64&t=1776179450'
        }
      ]
    },
    showDetail: false,
    currentPainting: null
  },

  onLoad() {
    this.setData({
      currentList: this.data.paintings[this.data.activeCategory]
    });
  },

  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      activeCategory: categoryId,
      currentList: this.data.paintings[categoryId]
    });
  },

  showPaintingDetail(e) {
    const painting = e.currentTarget.dataset.painting;
    this.setData({
      showDetail: true,
      currentPainting: painting
    });
  },

  closeDetail() {
    this.setData({
      showDetail: false,
      currentPainting: null
    });
  },

  onShareAppMessage() {
    return {
      title: '国画欣赏',
      path: '/shufa/shufa/pages/calligraphy/painting'
    };
  }
});
