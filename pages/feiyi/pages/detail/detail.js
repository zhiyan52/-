// pages/feiyi/pages/detail/detail.js
const DataLoader = require('../../utils/data-loader');
const AudioManager = require('../../utils/audio-manager');
const { CacheManager } = require('../../utils/cache-manager');

Page({
  data: {
    heritageId: '',
    heritage: null,
    inheritor: null,
    images: [],
    categoryName: '',

    // 音频
    isPlaying: false,
    audioProgress: 0,
    audioPercent: 0,

    // 收藏
    isFavorite: false
  },

  onLoad(options) {
    const { id } = options;
    if (!id) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      wx.navigateBack();
      return;
    }

    this.setData({ heritageId: id });
    this._loadDetail(id);
    this._checkFavorite(id);
  },

  onShow() {
    // 同步音频状态
    const status = AudioManager.getStatus();
    if (status.heritageId === this.data.heritageId && status.isPlaying) {
      this.setData({ isPlaying: true });
    }
  },

  onUnload() {
    // 如果全局播放器没显示，停止音频
    const pages = getCurrentPages();
    const hasPlayer = pages.some(p => p.data && p.data.showAudioPlayer);
    if (!hasPlayer) {
      AudioManager.stop();
    }
  },

  // ============ 数据加载 ============
  async _loadDetail(id) {
    wx.showLoading({ title: '加载中' });

    try {
      // 清理缓存，确保获取最新数据
      const { CacheManager } = require('../../utils/cache-manager');
      CacheManager.remove(`heritage_detail_${id}`);

      const heritage = await DataLoader.getHeritageDetail(id, false);

      // 获取完整传承人信息
      let inheritor = null;
      if (heritage.inheritor && heritage.inheritor.id) {
        inheritor = await DataLoader.getInheritorDetail(heritage.inheritor.id);
      }

      // 处理图片数组
      let images = [];
      if (heritage.images && heritage.images.detail && heritage.images.detail.length > 0) {
        images = [heritage.images.cover, ...heritage.images.detail];
      } else {
        images = [(heritage.images && heritage.images.cover) || '/images/default-heritage.jpg'];
      }

      // 获取分类名
      const { CategoryMap } = require('../../data/index.js');

      // 处理等级类名
      if (heritage.meta.grade === '国家级') {
        heritage.meta.grade = 'national';
      } else if (heritage.meta.grade === '人类级') {
        heritage.meta.grade = 'human';
      }

      this.setData({
        heritage,
        inheritor,
        images,
        categoryName: CategoryMap.getName(heritage.categoryId)
      });

      // 设置页面标题
      wx.setNavigationBarTitle({ title: heritage.name });

      // 预加载音频
      if (heritage.audio && heritage.audio.hasAudio) {
        AudioManager.preload([id]);
      }

    } catch (err) {
      console.error('加载详情失败:', err);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  // ============ 音频控制 ============
  toggleAudio() {
    const { heritage, isPlaying } = this.data;

    if (!heritage.audio || !heritage.audio.hasAudio) {
      wx.showToast({ title: '暂无音频', icon: 'none' });
      return;
    }

    if (isPlaying) {
      AudioManager.pause();
      this.setData({ isPlaying: false });
    } else {
      // 监听进度
      AudioManager.on('onProgress', this._onAudioProgress);
      AudioManager.on('onEnded', this._onAudioEnded);

      AudioManager.play(heritage.id, heritage.audio.src);
      this.setData({ isPlaying: true });
    }
  },

  _onAudioProgress: function (data) {
    if (data.heritageId === this.data.heritageId) {
      const percent = (data.progress / data.duration) * 100;
      this.setData({
        audioProgress: data.progress.toFixed(1),
        audioPercent: percent
      });
    }
  }.bind(this),

  _onAudioEnded: function (data) {
    if (data.heritageId === this.data.heritageId) {
      this.setData({
        isPlaying: false,
        audioProgress: 0,
        audioPercent: 0
      });
      AudioManager.off('onProgress', this._onAudioProgress);
      AudioManager.off('onEnded', this._onAudioEnded);
    }
  }.bind(this),

  // ============ 交互 ============
  goBack() {
    wx.navigateBack();
  },

  goToInheritor() {
    if (this.data.inheritor) {
      // 建立非遗传承人与匠人故事中匠人的映射关系
      const inheritorNameMap = {
        '周淑英': 1, // 剪纸大师
        '姚建萍': 2, // 苏绣传人
        '辜柳希': 3, // 木雕艺术家
        '汪天稳': 4, // 皮影戏大师
        '郑益坤': 5, // 漆器艺术家
        '陈云华': 6  // 竹编艺术家
      };
      
      const inheritorName = this.data.inheritor.name;
      const craftsmanId = inheritorNameMap[inheritorName] || 1;
      
      wx.navigateTo({
        url: `/traditional/traditional/pages/fine-art/craftsman-detail/craftsman-detail?id=${craftsmanId}`
      });
    }
  },

  toggleFavorite() {
    const { heritageId, isFavorite } = this.data;
    const favorites = wx.getStorageSync('heritage_favorites') || [];

    if (isFavorite) {
      const idx = favorites.indexOf(heritageId);
      if (idx > -1) favorites.splice(idx, 1);
      wx.showToast({ title: '取消收藏', icon: 'none' });
    } else {
      favorites.push(heritageId);
      wx.showToast({ title: '收藏成功', icon: 'success' });
    }

    wx.setStorageSync('heritage_favorites', favorites);
    this.setData({ isFavorite: !isFavorite });
  },

  _checkFavorite(id) {
    const favorites = wx.getStorageSync('heritage_favorites') || [];
    this.setData({ isFavorite: favorites.includes(id) });
  },

  share() {
    // 触发系统分享菜单
  },

  onShareAppMessage() {
    const { heritage } = this.data;
    return {
      title: `${heritage.name} - 非遗匠心`,
      path: `/pages/feiyi/pages/detail/detail?id=${heritage.id}`,
      imageUrl: heritage.images && heritage.images.cover
    };
  },

  showMore() {
    const { heritage } = this.data;
    wx.switchTab({
      url: `/pages/feiyi/pages/index/index?category=${heritage.categoryId}`
    });
  }
});