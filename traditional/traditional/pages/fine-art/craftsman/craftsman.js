Page({
  data: {
    craftsmen: []
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '匠人故事' });
    this.loadCraftsmen();
  },

  // 加载匠人数据
  loadCraftsmen() {
    // 模拟数据，实际项目中可以从云数据库或API获取
    const craftsmenData = [
      {
        id: 1,
        name: '王老艺人',
        title: '剪纸大师',
        age: 78,
        experience: 60,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/craftsman1.png',
        desc: '王老艺人是河北蔚县的剪纸传承人，从事剪纸艺术60余年，作品多次在国内外展览中获奖。他的剪纸作品色彩艳丽，构图饱满，题材广泛，深受人们喜爱。'
      },
      {
        id: 2,
        name: '张大师',
        title: '苏绣传人',
        age: 65,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/craftsman2.png',
        desc: '张大师是苏州苏绣的代表性传承人，从事刺绣艺术40余年，作品精细雅洁，技艺精湛。她的刺绣作品多次被作为国礼赠送外宾，为弘扬中国传统工艺做出了重要贡献。'
      },
      {
        id: 3,
        name: '李师傅',
        title: '木雕艺术家',
        age: 55,
        experience: 30,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/craftsman3.png',
        desc: '李师傅是广东潮州木雕的传承人，从事木雕艺术30余年，作品刀法细腻，题材丰富。他的木雕作品不仅具有实用价值，更是精美的艺术品，深受收藏家和艺术爱好者的青睐。'
      }
    ];
    
    this.setData({
      craftsmen: craftsmenData
    });
  },

  // 导航到匠人详情页
  navigateToCraftsmanDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/traditional/traditional/pages/fine-art/craftsman-detail/craftsman-detail?id=${id}`
    });
  }
});