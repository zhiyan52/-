// components/audio-player/audio-player.js
const AudioManager = require('../../utils/audio-manager');

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    isPlaying: false,
    heritageId: '',
    heritageName: '',
    heritageImage: '',
    categoryName: '',
    duration: 10,
    progressPercent: 0,
    playingText: '0',
    hasPrev: false,
    hasNext: false,
    playlist: []
  },

  lifetimes: {
    attached() {
      AudioManager.on('onPlay', this._onPlay);
      AudioManager.on('onPause', this._onPause);
      AudioManager.on('onEnded', this._onEnded);
      AudioManager.on('onProgress', this._onProgress);
    },

    detached() {
      AudioManager.off('onPlay', this._onPlay);
      AudioManager.off('onPause', this._onPause);
      AudioManager.off('onEnded', this._onEnded);
      AudioManager.off('onProgress', this._onProgress);
    }
  },

  methods: {
    _onPlay: function(data) {
      this._updateDisplay(data.heritageId);
      this.setData({ isPlaying: true });
    }.bind(this),

    _onPause: function() {
      this.setData({ isPlaying: false });
    }.bind(this),

    _onEnded: function() {
      this.setData({ isPlaying: false, progressPercent: 0 });
      // 自动播放下一首
      this._playNext();
    }.bind(this),

    _onProgress: function(data) {
      const percent = (data.progress / data.duration) * 100;
      this.setData({
        progressPercent: percent,
        playingText: Math.floor(data.progress).toString()
      });
    }.bind(this),

    _updateDisplay(heritageId) {
      const { HeritageDataUtils } = require('../../data/');
      const heritage = HeritageDataUtils.getById(heritageId);
      
      if (heritage) {
        this.setData({
          heritageId: heritage.id,
          heritageName: heritage.name,
          heritageImage: heritage.images?.cover || '/images/default-heritage.jpg',
          categoryName: heritage.categoryName || '非遗',
          duration: heritage.audio?.duration || 10
        });
        
        // 更新播放列表状态
        this._updatePlaylistStatus();
      }
    },

    _updatePlaylistStatus() {
      const currentIndex = this.data.playlist.findIndex(id => id === this.data.heritageId);
      this.setData({
        hasPrev: currentIndex > 0,
        hasNext: currentIndex < this.data.playlist.length - 1 && currentIndex !== -1
      });
    },

    setPlaylist(playlist) {
      this.setData({ playlist });
      this._updatePlaylistStatus();
    },

    onPlayPause() {
      if (this.data.isPlaying) {
        AudioManager.pause();
      } else {
        // 恢复播放
        const status = AudioManager.getStatus();
        if (status.heritageId) {
          AudioManager.play(status.heritageId, status.src);
        }
      }
    },

    onPrev() {
      const currentIndex = this.data.playlist.indexOf(this.data.heritageId);
      if (currentIndex > 0) {
        const prevId = this.data.playlist[currentIndex - 1];
        this._playById(prevId);
      }
    },

    onNext() {
      this._playNext();
    },

    _playNext() {
      const currentIndex = this.data.playlist.indexOf(this.data.heritageId);
      if (currentIndex < this.data.playlist.length - 1) {
        const nextId = this.data.playlist[currentIndex + 1];
        this._playById(nextId);
      }
    },

    _playById(id) {
      const { HeritageDataUtils } = require('../../data/');
      const heritage = HeritageDataUtils.getById(id);
      if (heritage && heritage.audio?.hasAudio) {
        AudioManager.play(id, heritage.audio.src);
        this.triggerEvent('change', { id });
      }
    },

    onClose() {
      AudioManager.stop();
      this.triggerEvent('close');
    }
  }
});