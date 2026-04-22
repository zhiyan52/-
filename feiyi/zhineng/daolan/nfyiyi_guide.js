 // pages/nfyiyi/guide/index.js
Page({
  data: {
    categories: ["剪纸", "刺绣", "皮影", "泥塑"],
    currentCategory: "剪纸",
    isLoading: false,
    guideData: null,
    imageUrl: ""
  },

  onCategoryChange(e) {
    const category = this.data.categories[e.detail.value]
    this.setData({ 
      currentCategory: category, 
      guideData: null,
      imageUrl: ""
    }, () => {
      this.generateGuide()
    })
  },

  generateGuide() {
    this.setData({ isLoading: true })
    wx.cloud.callFunction({
      name: 'nfyiyi_guide',
      data: {
        category: this.data.currentCategory
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          guideData: res.result.guide,
          imageUrl: res.result.imageUrl
        })
      } else {
        wx.showToast({ title: res.result.msg, icon: 'none' })
      }
    }).catch(err => {
      wx.showToast({ title: '网络异常', icon: 'none' })
      console.error(err)
    }).finally(() => {
      this.setData({ isLoading: false })
    })
  },

  onLoad() {
    this.generateGuide()
  }
})