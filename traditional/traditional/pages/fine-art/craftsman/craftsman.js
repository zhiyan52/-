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
        name: '周淑英',
        title: '剪纸大师',
        age: 68,
        experience: 50,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ff15baa4f2003e661554ac2535f803d0.jpg',
        desc: '周淑英是河北蔚县的剪纸传承人，国家级非物质文化遗产项目蔚县剪纸代表性传承人。从事剪纸艺术50余年，作品多次在国内外展览中获奖。她的剪纸作品色彩艳丽，构图饱满，题材广泛，深受人们喜爱。'
      },
      {
        id: 2,
        name: '姚建萍',
        title: '苏绣传人',
        age: 60,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/96d6af1cc7113c757d4e84a8890c8562.jpg',
        desc: '姚建萍是苏州苏绣的代表性传承人，国家级非物质文化遗产项目苏绣代表性传承人。从事刺绣艺术40余年，作品精细雅洁，技艺精湛。她的刺绣作品多次被作为国礼赠送外宾，为弘扬中国传统工艺做出了重要贡献。'
      },
      {
        id: 3,
        name: '辜柳希',
        title: '木雕艺术家',
        age: 65,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/31da46ea0836eab40ccab5119092e3f8.jpg',
        desc: '辜柳希是广东潮州木雕的传承人，国家级非物质文化遗产项目潮州木雕代表性传承人。从事木雕艺术40余年，作品刀法细腻，题材丰富。他的木雕作品不仅具有实用价值，更是精美的艺术品，深受收藏家和艺术爱好者的青睐。'
      },
      {
        id: 4,
        name: '汪天稳',
        title: '皮影戏大师',
        age: 70,
        experience: 50,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/6b253560f18a45777f1ded5480fff4a7.jpg',
        desc: '汪天稳是陕西华县皮影的传承人，国家级非物质文化遗产项目华县皮影代表性传承人。从事皮影艺术50余年，作品雕刻精细，表演精湛。他的皮影作品和表演深受人们喜爱，为弘扬中国传统皮影艺术做出了重要贡献。'
      },
      {
        id: 5,
        name: '郑益坤',
        title: '漆器艺术家',
        age: 75,
        experience: 55,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/571ead95b2749be3d609f6a2a29f3204.jpg',
        desc: '郑益坤是福建福州脱胎漆器的传承人，国家级非物质文化遗产项目福州脱胎漆器代表性传承人。从事漆器艺术55余年，作品质地轻巧，色彩鲜艳。他的漆器作品不仅具有实用价值，更是精美的艺术品，深受收藏家和艺术爱好者的青睐。'
      },
      {
        id: 6,
        name: '陈云华',
        title: '竹编艺术家',
        age: 62,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/89bbc2f0852b19608eb496e67f752875.jpg',
        desc: '陈云华是四川竹编的传承人，国家级非物质文化遗产项目四川竹编代表性传承人。从事竹编艺术40余年，作品精细编织，种类繁多。他的竹编作品不仅具有实用价值，更是精美的艺术品，深受人们喜爱。'
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