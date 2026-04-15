// shufa/shufa/ai/ai-recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeFilter: 'all',
    loading: true,
    recommendList: [
      {
        id: 1,
        title: '兰亭序',
        artist: '王羲之',
        description: '王羲之的代表作，被誉为"天下第一行书"，笔法精妙，结构优美。',
        image: 'https://example.com/lan ting xu.jpg',
        tags: ['行书', '晋代', '经典']
      },
      {
        id: 2,
        title: '清明上河图',
        artist: '张择端',
        description: '北宋风俗画，描绘了汴京的繁华景象，是中国绘画史上的杰作。',
        image: 'https://example.com/qing ming shang he tu.jpg',
        tags: ['风俗画', '北宋', '长卷']
      },
      {
        id: 3,
        title: '多宝塔碑',
        artist: '颜真卿',
        description: '颜真卿的楷书代表作，结构严谨，笔法刚劲有力。',
        image: 'https://example.com/duo bao ta bei.jpg',
        tags: ['楷书', '唐代', '碑刻']
      },
      {
        id: 4,
        title: '千里江山图',
        artist: '王希孟',
        description: '北宋青绿山水画，画面气势磅礴，色彩鲜艳。',
        image: 'https://example.com/qian li jiang shan tu.jpg',
        tags: ['山水画', '北宋', '青绿']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 模拟加载推荐内容
    setTimeout(() => {
      this.setData({
        loading: false
      });
    }, 1500);
  },

  /**
   * 设置筛选条件
   */
  setFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      activeFilter: filter
    });
    // 这里可以根据筛选条件重新加载推荐内容
  }
})