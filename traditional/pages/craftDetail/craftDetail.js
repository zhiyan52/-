// traditional/pages/craftDetail/craftDetail.js
Page({
  data: {
    selectedRegion: null,
    showRegionModal: false,
    currentDate: '',
    // 非遗项目数据
    intangibleHeritageData: {
      jiangxi: {
        name: '江西',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jiangxi%20jingdezhen%20porcelain%20making%20traditional%20craft&image_size=landscape_16_9',
        items: [
          {
            id: 'jingdezhen-porcelain',
            name: '景德镇手工制瓷技艺',
            description: '景德镇制瓷技艺是中国传统手工制瓷的代表，以其精湛的工艺和独特的艺术风格闻名于世。',
            geoBackground: {
              rawMaterials: '景德镇周边盛产优质高岭土，为制瓷提供了理想的原料。',
              waterSource: '昌江穿城而过，为制瓷提供了充足的水源。',
              fuel: '周边山区盛产松柴，为烧制瓷器提供了优质燃料。',
              history: '宋真宗景德年间（1004-1007年），因瓷器品质优良，皇帝赐名景德镇。'
            },
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jingdezhen%20porcelain%20making%20process%20traditional%20craftsman&image_size=landscape_16_9'
          }
        ]
      },
      jiangsu: {
        name: '江苏',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=jiangsu%20suzhou%20embroidery%20traditional%20craft&image_size=landscape_16_9',
        items: [
          {
            id: 'suzhou-embroidery',
            name: '苏绣',
            description: '苏绣是中国四大名绣之一，以其精细的针法和丰富的色彩著称。',
            geoBackground: {
              rawMaterials: '苏州地区丝绸产业发达，为苏绣提供了优质的丝线。',
              waterSource: '太湖流域水资源丰富，有利于丝绸生产。',
              fuel: '江南地区经济发达，为苏绣发展提供了良好的经济基础。',
              history: '苏绣历史悠久，可追溯到春秋时期，明清时期达到鼎盛。'
            },
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=suzhou%20embroidery%20traditional%20craftswoman%20working&image_size=landscape_16_9'
          }
        ]
      },
      sichuan: {
        name: '四川',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20face%20changing%20sichuan%20opera%20traditional%20art&image_size=landscape_16_9',
        items: [
          {
            id: 'sichuan-opera-face-changing',
            name: '川剧变脸',
            description: '川剧变脸是川剧表演中的独特技艺，以其快速变换脸谱的技巧著称。',
            geoBackground: {
              rawMaterials: '四川地区盛产各种颜料，为脸谱制作提供了材料。',
              waterSource: '四川水资源丰富，有利于颜料的调配。',
              fuel: '四川盆地气候湿润，有利于脸谱的保存。',
              history: '川剧变脸技艺形成于清代，是川剧艺术的重要组成部分。'
            },
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sichuan%20opera%20performer%20doing%20face%20changing&image_size=landscape_16_9'
          }
        ]
      },
      guangdong: {
        name: '广东',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangdong%20lion%20dance%20traditional%20performance&image_size=landscape_16_9',
        items: [
          {
            id: 'guangdong-lion-dance',
            name: '广东醒狮',
            description: '广东醒狮是岭南地区的传统民间舞蹈，象征吉祥如意。',
            geoBackground: {
              rawMaterials: '广东地区盛产竹、布等材料，为狮头制作提供了原料。',
              waterSource: '珠江三角洲水资源丰富，有利于农业生产，为醒狮活动提供了经济基础。',
              fuel: '广东经济发达，为醒狮活动提供了资金支持。',
              history: '广东醒狮起源于唐代，明清时期在岭南地区广泛流行。'
            },
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=guangdong%20lion%20dance%20performance%20traditional%20festival&image_size=landscape_16_9'
          }
        ]
      },
      shanxi: {
        name: '山西',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanxi%20paper%20cutting%20traditional%20craft&image_size=landscape_16_9',
        items: [
          {
            id: 'shanxi-paper-cutting',
            name: '山西剪纸',
            description: '山西剪纸是中国传统民间艺术，以其精细的刀工和丰富的题材著称。',
            geoBackground: {
              rawMaterials: '山西地区盛产优质纸张，为剪纸提供了理想的材料。',
              waterSource: '黄河流域水资源丰富，有利于造纸业的发展。',
              fuel: '山西煤炭资源丰富，为造纸和剪纸加工提供了能源。',
              history: '山西剪纸历史悠久，可追溯到汉代，明清时期达到鼎盛。'
            },
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shanxi%20paper%20cutting%20traditional%20craftswoman%20working&image_size=landscape_16_9'
          }
        ]
      }
    }
  },

  onLoad() {
    this.setCurrentDate();
  },

  setCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({
      currentDate: `${year}年${month}月${day}日`
    });
  },

  showRegionDetail(e) {
    const region = e.currentTarget.dataset.region;
    this.setData({
      selectedRegion: region,
      showRegionModal: true
    });
  },

  hideRegionModal() {
    this.setData({
      showRegionModal: false
    });
  },

  stopPropagation() {
    // 阻止事件冒泡
  },

  goToHeritageDetail(e) {
    const region = e.currentTarget.dataset.region;
    const heritageId = e.currentTarget.dataset.heritageId;
    // 跳转到非遗项目详情页面
    wx.showToast({
      title: `跳转到${this.data.intangibleHeritageData[region].name}的${this.getHeritageName(region, heritageId)}详情`,
      icon: 'none'
    });
  },

  getHeritageName(region, heritageId) {
    const heritage = this.data.intangibleHeritageData[region].items.find(item => item.id === heritageId);
    return heritage ? heritage.name : '';
  },

  shareReport() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '非遗地图 - 探索中国传统文化的地域分布',
      path: '/traditional/pages/craftDetail/craftDetail',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20map%20traditional%20crafts&image_size=landscape_16_9'
    };
  },

  onShareTimeline() {
    return {
      title: '非遗地图 - 探索中国传统文化的地域分布',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20intangible%20cultural%20heritage%20map%20traditional%20crafts&image_size=landscape_16_9'
    };
  }
});