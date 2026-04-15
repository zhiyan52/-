// components/heritage-card/heritage-card.js
const AudioManager = require('../../utils/audio-manager');

Component({
  options: {
    styleIsolation: 'shared',
    multipleSlots: true
  },

  properties: {
    // 非遗数据对象
    heritage: {
      type: Object,
      value: {},
      observer(newVal) {
        if (newVal && newVal.id) {
          this._processData(newVal);
        }
      }
    },
    // 是否显示进度条
    showProgress: {
      type: Boolean,
      value: true
    },
    // 当前播放中的ID（外部传入，用于同步状态）
    playingId: {
      type: String,
      value: '',
      observer(newVal) {
        this._syncPlayState(newVal);
      }
    }
  },

  data: {
    // 处理后的展示数据
    id: '',
    name: '',
    brief: '',
    imageUrl: '',
    categoryName: '',
    categoryColor: '#8B4513',
    isHot: false,
    hasAudio: false,

    // 传承人信息
    inheritorId: '',
    inheritorName: '',
    inheritorAvatar: '',
    inheritorLevel: '',

    // 音频状态
    isPlaying: false,
    progressPercent: 0,
    playingText: '0s'
  },

  lifetimes: {
    attached() {
      // 监听音频事件
      AudioManager.on('onProgress', this._onAudioProgress);
      AudioManager.on('onEnded', this._onAudioEnded);
    },

    detached() {
      // 取消监听
      AudioManager.off('onProgress', this._onAudioProgress);
      AudioManager.off('onEnded', this._onAudioEnded);
    }
  },

  methods: {
    // 处理传入的数据
    _processData(heritage) {
      const { CategoryMap } = require('../../data/index.js');

      this.setData({
        id: heritage.id,
        name: heritage.name,
        brief: heritage.introduction || heritage.brief || '',
        imageUrl: (heritage.images && heritage.images.cover) || heritage.image || '/images/default-heritage.jpg',
        categoryName: CategoryMap.getName(heritage.categoryId) || '其他',
        categoryColor: this._getCategoryColor(heritage.categoryId),
        isHot: (heritage.display && heritage.display.isHot) || false,
        hasAudio: (heritage.audio && heritage.audio.hasAudio) || false,

        // 传承人信息
        inheritorId: (heritage.inheritor && heritage.inheritor.id) || '',
        inheritorName: (heritage.inheritor && heritage.inheritor.name) || '未知',
        inheritorAvatar: (heritage.inheritor && heritage.inheritor.avatar) || '/images/default-avatar.jpg',
        inheritorLevel: (heritage.inheritor && heritage.inheritor.level === '国家级') ? '国级' : ((heritage.inheritor && heritage.inheritor.level) || '')
      });
    },

    // 同步播放状态
    _syncPlayState(currentPlayingId) {
      const isPlaying = currentPlayingId === this.data.id;
      if (isPlaying !== this.data.isPlaying) {
        this.setData({ isPlaying });
      }
    },

    // 获取分类颜色
    _getCategoryColor(categoryId) {
      const colors = {
        craft: '#A0522D',
        art: '#CD853F',
        opera: '#D2691E',
        custom: '#BC8F8F',
        music: '#F4A460',
        all: '#8B4513'
      };
      return colors[categoryId] || '#8B4513';
    },

    // 卡片点击
    onCardTap() {
      this.triggerEvent('tap', {
        id: this.data.id,
        heritage: this.properties.heritage
      });
    },

    // 传承人点击
    onInheritorTap(e) {
      e.stopPropagation();
      if (this.data.inheritorId) {
        this.triggerEvent('tapInheritor', {
          id: this.data.inheritorId
        });
      }
    },

    // 音频按钮点击
    onAudioTap(e) {
      e.stopPropagation();

      if (!this.data.hasAudio) return;

      const heritage = this.properties.heritage;

      if (this.data.isPlaying) {
        // 暂停
        AudioManager.pause();
        this.setData({ isPlaying: false });
        this.triggerEvent('audioPause', { id: this.data.id });
      } else {
        // 播放
        AudioManager.play(this.data.id, heritage.audio.src);
        this.setData({ isPlaying: true });
        this.triggerEvent('audioPlay', { id: this.data.id });
      }
    },

    // 音频进度回调
    _onAudioProgress: function (data) {
      if (data.heritageId === this.data.id) {
        const percent = (data.progress / data.duration) * 100;
        this.setData({
          progressPercent: percent,
          playingText: `${Math.floor(data.progress)}s`
        });
      }
    }.bind(this),

    // 音频结束回调
    _onAudioEnded: function (data) {
      if (data.heritageId === this.data.id) {
        this.setData({
          isPlaying: false,
          progressPercent: 0,
          playingText: '0s'
        });
        this.triggerEvent('audioEnd', { id: this.data.id });
      }
    }.bind(this),

    // 图片加载失败
    onImageError() {
      this.setData({
        imageUrl: '/images/default-heritage.jpg'
      });
    }
  }
});