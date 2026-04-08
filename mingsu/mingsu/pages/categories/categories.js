// mingsu/mingsu/pages/categories/categories.js
Page({
  data: {
    categories: [
      {
        id: 'seasons',
        title: '时令食俗',
        desc: '二十四节气传统饮食',
        icon: '🌱',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20solar%20terms%20seasonal%20food%20culture&image_size=square'
      },
      {
        id: 'regions',
        title: '地域珍味',
        desc: '各地特色美食文化',
        icon: '🗺️',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20regional%20food%20map%20culture&image_size=square'
      },
      {
        id: 'intangible',
        title: '非遗食韵',
        desc: '非物质文化遗产美食',
        icon: '🏆',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20food&image_size=square'
      },
      {
        id: 'cakes',
        title: '传统糕饼',
        desc: '经典糕点制作技艺',
        icon: '🎂',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20pastries%20cakes&image_size=square'
      },
      {
        id: 'festivals',
        title: '节日美食',
        desc: '传统节日特色饮食',
        icon: '🎉',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20festival%20food%20culture&image_size=square'
      },
      {
        id: 'crafts',
        title: '制作技艺',
        desc: '传统美食制作工艺',
        icon: '👨‍🍳',
        imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20traditional%20food%20craftsmanship&image_size=square'
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
