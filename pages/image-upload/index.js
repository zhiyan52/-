// pages/image-upload/index.js
const cloudStorage = require('../../services/cloud-storage');

Page({
  data: {
    imageList: [],
    uploading: false
  },
  
  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.uploadImages(tempFilePaths);
      }
    });
  },
  
  // 上传图片
  async uploadImages(tempFilePaths) {
    this.setData({ uploading: true });
    
    try {
      const fileIDs = await cloudStorage.uploadImages(tempFilePaths);
      this.setData({
        imageList: [...this.data.imageList, ...fileIDs],
        uploading: false
      });
      
      wx.showToast({
        title: '上传成功',
        icon: 'success'
      });
    } catch (error) {
      this.setData({ uploading: false });
      wx.showToast({
        title: '上传失败',
        icon: 'none'
      });
    }
  },
  
  // 预览图片
  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    });
  },
  
  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const imageList = this.data.imageList;
    imageList.splice(index, 1);
    this.setData({ imageList });
  }
});