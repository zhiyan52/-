// mingsu/mingsu/pages/checkin/checkin.js
Page({
  data: {
    checkinList: [
      {
        id: 1,
        date: '2026-04-01',
        food: '清明青团',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20qingming%20festival%20green%20rice%20cake&image_size=square',
        location: '江南地区',
        notes: '第一次尝试做青团，味道不错！'
      },
      {
        id: 2,
        date: '2026-03-28',
        food: '北京烤鸭',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20roast%20duck&image_size=square',
        location: '北京',
        notes: '正宗的北京烤鸭，皮脆肉嫩！'
      }
    ],
    streak: 3,
    totalCheckins: 12,
    showCheckinForm: false,
    newCheckin: {
      food: '',
      image: '',
      location: '',
      notes: ''
    }
  },

  onLoad() {
    this.loadCheckinData();
  },

  loadCheckinData() {
    console.log('加载打卡数据');
  },

  showCheckinForm() {
    this.setData({ showCheckinForm: true });
  },

  closeCheckinForm() {
    this.setData({ showCheckinForm: false });
  },

  handleInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [`newCheckin.${field}`]: e.detail.value });
  },

  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ 'newCheckin.image': res.tempFilePaths[0] });
      }
    });
  },

  submitCheckin() {
    const { food, location } = this.data.newCheckin;
    if (!food || !location) {
      wx.showToast({ title: '请填写完整信息', icon: 'error' });
      return;
    }

    const newCheckin = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...this.data.newCheckin
    };

    this.setData({
      checkinList: [newCheckin, ...this.data.checkinList],
      totalCheckins: this.data.totalCheckins + 1,
      streak: this.data.streak + 1,
      showCheckinForm: false,
      newCheckin: {
        food: '',
        image: '',
        location: '',
        notes: ''
      }
    });

    wx.showToast({ title: '打卡成功', icon: 'success' });
  },

  deleteCheckin(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条打卡记录吗？',
      success: (res) => {
        if (res.confirm) {
          const updatedList = this.data.checkinList.filter(item => item.id !== id);
          this.setData({
            checkinList: updatedList,
            totalCheckins: this.data.totalCheckins - 1
          });
          wx.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '民俗百味打卡 | 记录我的美食之旅',
      path: '/mingsu/mingsu/pages/checkin/checkin',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20food%20checkin%20culture&image_size=landscape_16_9'
    };
  }
});
