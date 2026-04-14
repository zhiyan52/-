// shufa/shufa/pages/calligraphy/welcome.js
Page({
  data: {
    categories: [
      {
        id: 1,
        name: '书法',
        desc: '篆隶楷行草，临帖创作',
        img: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/8eea8030d597d75ca17091f7ace26f5d.jpg?sign=b12162b9e3deb072134516573f116905&t=1776175850'
      },
      {
        id: 2,
        name: '国画',
        desc: '山水花鸟人物，名家名作',
        img: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg?sign=e74ddbadb70750b501ac085fe694804b&t=1776176161'
      }
    ]
  },

  goToCategory(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    let url = '';
    
    if (id === 1) {
      url = '/shufa/shufa/shufa';
    } else if (id === 2) {
      url = '/shufa/shufa/pages/calligraphy/painting';
    }
    
    if (url) {
      wx.navigateTo({
        url: url,
        fail: (err) => {
          console.error('跳转失败:', err);
          wx.showToast({ title: '页面加载失败', icon: 'error' });
        }
      });
    }
  },

  onShareAppMessage() {
    return {
      title: '书画雅集',
      path: '/shufa/shufa/pages/calligraphy/welcome'
    };
  }
});