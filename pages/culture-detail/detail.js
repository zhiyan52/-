// 文化详情页面
Page({
  data: {
    exhibit: {
      id: '',
      name: '',
      category: '',
      era: '',
      location: '',
      description: '',
      history: '',
      value: '',
      image: '',
      gallery: []
    }
  },

  onLoad(options) {
    const id = options.id || '101';
    const name = options.name || '太和殿';
    this.loadExhibitData(id, name);
  },

  // 加载展品数据
  loadExhibitData(id, name) {
    // 模拟数据，实际项目中可从云数据库获取
    const exhibits = {
      '101': {
        id: '101',
        name: '太和殿',
        category: '古建筑',
        era: '明代',
        location: '北京故宫',
        description: '太和殿是紫禁城内的正殿，是明清两代皇帝举行大典的地方。它是中国古代宫殿建筑的精华，体现了中国古代建筑的高超技艺。',
        history: '太和殿始建于明永乐十八年（1420年），初名奉天殿。明嘉靖四十一年（1562年）重建，改名皇极殿。清顺治二年（1645年）改名太和殿。',
        value: '太和殿是中国古代宫殿建筑的代表作，它的建筑形制、装饰艺术都体现了中国古代的等级制度和文化传统，具有极高的历史、艺术和科学价值。',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/taihedian.jpg',
        gallery: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/taihedian.jpg',
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/suzhouuanlin.jpg',
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/taihedian.jpg'
        ]
      },
      '102': {
        id: '102',
        name: '九龙壁',
        category: '古建筑',
        era: '清代',
        location: '北京故宫',
        description: '九龙壁是故宫内的一座琉璃照壁，由270块琉璃瓦组成，是中国三大九龙壁之一。',
        history: '九龙壁建于清乾隆三十七年（1772年），位于皇极殿东侧，是为了装饰皇极殿而建。',
        value: '九龙壁是中国古代琉璃工艺的杰作，它的造型精美，色彩鲜艳，体现了中国古代工匠的高超技艺。',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/suzhouuanlin.jpg',
        gallery: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/suzhouuanlin.jpg',
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/taihedian.jpg'
        ]
      },
      '103': {
        id: '103',
        name: '御花园',
        category: '园林',
        era: '明代',
        location: '北京故宫',
        description: '御花园是紫禁城内的皇家园林，供皇帝和后妃游乐。',
        history: '御花园始建于明永乐十八年（1420年），是紫禁城内最早的园林。',
        value: '御花园是中国古代皇家园林的代表作，它的布局精巧，景色优美，体现了中国古代园林艺术的精髓。',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/taihedian.jpg',
        gallery: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/taihedian.jpg',
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/suzhouuanlin.jpg'
        ]
      },
      '201': {
        id: '201',
        name: '拙政园',
        category: '园林',
        era: '明代',
        location: '江苏苏州',
        description: '拙政园是苏州园林的代表作品，始建于明代，是中国四大名园之一。',
        history: '拙政园始建于明正德年间（1506-1521年），由御史王献臣所建。',
        value: '拙政园是中国古代园林艺术的杰作，它的布局自然，景色优美，体现了中国古代园林"虽由人作，宛自天开"的理念。',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/suzhouuanlin.jpg',
        gallery: [
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/suzhouuanlin.jpg',
          'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/gujian/home/taihedian.jpg'
        ]
      }
    };

    const exhibit = exhibits[id] || exhibits['101'];
    this.setData({ exhibit });
  },

  // 返回
  goBack() {
    wx.navigateBack();
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.exhibit.gallery[index],
      urls: this.data.exhibit.gallery
    });
  },

  // 分享
  shareExhibit() {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  // 收藏
  addCollection() {
    const exhibit = this.data.exhibit;

    // 检查是否已收藏
    const collections = wx.getStorageSync('collectedList') || [];
    const isCollected = collections.some(item => item.id === exhibit.id);

    if (isCollected) {
      wx.showToast({
        title: '已经收藏过了',
        icon: 'none'
      });
      return;
    }

    // 添加到收藏
    const newCollection = {
      id: exhibit.id,
      name: exhibit.name,
      category: exhibit.category,
      image: exhibit.image,
      time: new Date().toLocaleDateString()
    };

    collections.push(newCollection);
    wx.setStorageSync('collectedList', collections);

    wx.showToast({
      title: '收藏成功',
      icon: 'success'
    });
  },

  // 查看地图
  viewMap() {
    wx.openLocation({
      latitude: 39.916345,
      longitude: 116.397155,
      name: this.data.exhibit.name,
      address: this.data.exhibit.location
    });
  }
});