// shuhuayayun/shuhuayayun.js
Page({
  data: {
    functions: [
      {
        id: 'masters',
        title: '书画名家图鉴',
        desc: '了解历代书画名家',
        icon: '🎨'
      },
      {
        id: 'works',
        title: '传世书画赏析',
        desc: '欣赏经典传世作品',
        icon: '🖼️'
      },
      {
        id: 'ai-explain',
        title: 'AI智能讲解',
        desc: 'AI解析书画艺术',
        icon: '🤖'
      },
      {
        id: 'ai-generate',
        title: 'AI意境生图',
        desc: '生成书画风格作品',
        icon: '✨'
      },
      {
        id: 'calligraphy',
        title: '书法字体科普',
        desc: '五大书体知识',
        icon: '✍️'
      },
      {
        id: 'quiz',
        title: '书画知识答题',
        desc: '测试书画知识',
        icon: '❓'
      },
      {
        id: 'quotes',
        title: '书画佳句卡片',
        desc: '生成可读卡片',
        icon: '📝'
      },
      {
        id: 'blind-box',
        title: '书画盲盒',
        desc: '每日一赏',
        icon: '🎁'
      }
    ]
  },
  
  onLoad: function() {
    console.log('书画雅韵页面加载');
  },
  
  // 导航到书画名家图鉴
  navigateToMasters: function() {
    wx.navigateTo({
      url: 'pages/masters/masters',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  },
  
  // 导航到传世书画赏析
  navigateToWorks: function() {
    wx.navigateTo({
      url: 'pages/works/works',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  },
  
  // 导航到AI智能讲解
  navigateToAiExplain: function() {
    wx.navigateTo({
      url: 'pages/ai-explain/ai-explain',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  },
  
  // 导航到AI意境生图
  navigateToAiGenerate: function() {
    wx.navigateTo({
      url: 'pages/ai-generate/ai-generate',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  },
  
  // 导航到书法字体科普
  navigateToCalligraphy: function() {
    wx.navigateTo({
      url: 'pages/calligraphy/calligraphy',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  },
  
  // 导航到书画知识答题
  navigateToQuiz: function() {
    wx.navigateTo({
      url: 'pages/quiz/quiz',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  },
  
  // 导航到书画佳句卡片
  navigateToQuotes: function() {
    wx.navigateTo({
      url: 'pages/quotes/quotes',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  },
  
  // 导航到书画盲盒
  navigateToBlindBox: function() {
    wx.navigateTo({
      url: 'pages/blind-box/blind-box',
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.log('跳转失败', err);
      }
    });
  }
});