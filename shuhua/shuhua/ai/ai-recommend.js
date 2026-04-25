Page({
  data: {
    loading: false,
    recommendations: null,
    error: null
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '个性化推荐' });
    this.generateRecommendations();
  },

  generateRecommendations: function () {
    this.setData({ loading: true, error: null });

    // 模拟个性化推荐生成
    setTimeout(() => {
      const recommendations = {
        title: '为您推荐',
        items: [
          {
            id: 1,
            type: '书法',
            title: '王羲之《兰亭集序》',
            description: '天下第一行书，笔法精妙，章法自然，被誉为书法艺术的巅峰之作。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/a36cf1e13b99529317da1fd145ed6e9c.jpg'
          },
          {
            id: 2,
            type: '国画',
            title: '王希孟《千里江山图》',
            description: '北宋青绿山水代表作，画面气势磅礴，色彩绚丽，展现了祖国大好河山。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/d7827934cc3206ee4198aac41ea76210.jpg'
          },
          {
            id: 3,
            type: '书法',
            title: '颜真卿《祭侄文稿》',
            description: '颜体楷书代表作，笔法雄浑，结构严谨，情感真挚，被称为天下第二行书。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/4a098e160e5ab5333cd7157c547e3026.jpg'
          },
          {
            id: 4,
            type: '国画',
            title: '张择端《清明上河图》',
            description: '北宋风俗画代表作，描绘了汴京清明时节的繁华景象，具有极高的历史价值。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/shuhua/02c50c9ea27b43171c5bc926a5a42b7d.jpg'
          }
        ]
      };

      this.setData({
        recommendations: recommendations,
        loading: false
      });
    }, 1500);
  },

  refreshRecommendations: function () {
    this.generateRecommendations();
  }
});