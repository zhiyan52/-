// mingsu/mingsu/pages/categories/categories.js
Page({
  data: {
    categories: [
      {
        id: 'seasons',
        title: '时令食俗',
        desc: '二十四节气传统饮食',
        icon: '🌱',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/c1.jpg'
      },
      {
        id: 'regions',
        title: '地域珍味',
        desc: '各地特色美食文化',
        icon: '🗺️',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/c2.jpg'
      },
      {
        id: 'intangible',
        title: '非遗食韵',
        desc: '非物质文化遗产美食',
        icon: '🏆',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/c3.jpg'
      },
      {
        id: 'cakes',
        title: '传统糕饼',
        desc: '经典糕点制作技艺',
        icon: '🎂',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/c4.jpg'
      },
      {
        id: 'festivals',
        title: '节日美食',
        desc: '传统节日特色饮食',
        icon: '🎉',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/c5.jpg'
      },
      {
        id: 'crafts',
        title: '制作技艺',
        desc: '传统美食制作工艺',
        icon: '👨‍🍳',
        imageUrl: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/mingsu/c6.jpg'
      }
    ]
  },

  onLoad() {
    this.loadCategories();
  },

  loadCategories() {
    console.log('加载分类数据');
  },

  goToCategory(e) {
    const id = e.currentTarget.dataset.id;
    let url = '';

    switch (id) {
      case 'seasons':
        url = '/mingsu/mingsu/pages/categories/seasons';
        break;
      case 'regions':
        url = '/mingsu/mingsu/pages/categories/regions';
        break;
      case 'intangible':
        url = '/mingsu/mingsu/pages/categories/intangible';
        break;
      case 'cakes':
        url = '/mingsu/mingsu/pages/categories/cakes';
        break;
      default:
        wx.showToast({
          title: '该分类暂未开放',
          icon: 'error'
        });
        return;
    }

    wx.navigateTo({
      url: url,
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '页面加载失败',
          icon: 'error'
        });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '民俗百味分类 | 探索中华传统饮食文化',
      path: '/mingsu/mingsu/pages/categories/categories',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20food%20categories%20culture&image_size=landscape_16_9'
    };
  }
});
