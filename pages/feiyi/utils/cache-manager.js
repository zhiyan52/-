/**
 * 缓存管理器
 * 管理数据缓存、图片缓存、音频缓存
 */

const CACHE_KEYS = {
  HERITAGE_LIST: 'heritage_list_cache',
  HERITAGE_DETAIL: 'heritage_detail_',
  CATEGORY_DATA: 'category_data_cache',
  INHERITOR_DATA: 'inheritor_data_',
  AUDIO_CACHE: 'audio_',
  IMAGE_CACHE: 'image_'
};

const CACHE_CONFIG = {
  // 缓存有效期（毫秒）
  expireTime: {
    list: 30 * 60 * 1000,      // 列表30分钟
    detail: 60 * 60 * 1000,    // 详情1小时
    category: 24 * 60 * 60 * 1000, // 分类24小时
    inheritor: 2 * 60 * 60 * 1000  // 传承人2小时
  },
  // 最大缓存数量
  maxCount: {
    heritageDetail: 50,
    image: 100,
    audio: 20
  }
};

class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this._initCleanup();
  }

  static getInstance() {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  // 设置缓存
  set(key, data, type = 'default') {
    const cacheData = {
      data,
      timestamp: Date.now(),
      type,
      size: JSON.stringify(data).length
    };

    // 内存缓存
    this.memoryCache.set(key, cacheData);

    // 本地存储（小数据）
    if (cacheData.size < 1024 * 1024) { // 小于1MB
      try {
        wx.setStorageSync(key, cacheData);
      } catch (e) {
        console.warn('[CacheManager] 本地存储失败，可能超出容量限制');
        this._cleanupStorage();
      }
    }
  }

  // 获取缓存
  get(key, maxAge = null) {
    // 优先从内存获取
    let cache = this.memoryCache.get(key);
    
    // 内存未命中，从本地获取
    if (!cache) {
      try {
        cache = wx.getStorageSync(key);
        if (cache) {
          this.memoryCache.set(key, cache);
        }
      } catch (e) {
        return null;
      }
    }

    if (!cache) return null;

    // 检查过期
    const expire = maxAge || this._getExpireTime(cache.type);
    if (Date.now() - cache.timestamp > expire) {
      this.remove(key);
      return null;
    }

    return cache.data;
  }

  // 移除缓存
  remove(key) {
    this.memoryCache.delete(key);
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      console.error('[CacheManager] 移除缓存失败:', e);
    }
  }

  // 清理所有缓存
  clear() {
    this.memoryCache.clear();
    
    const keys = wx.getStorageInfoSync().keys;
    keys.forEach(key => {
      if (Object.values(CACHE_KEYS).some(k => key.startsWith(k))) {
        wx.removeStorageSync(key);
      }
    });
  }

  // 获取缓存统计
  getStats() {
    const storageInfo = wx.getStorageInfoSync();
    return {
      memoryCacheSize: this.memoryCache.size,
      storageCacheSize: storageInfo.keys.filter(k => 
        Object.values(CACHE_KEYS).some(ck => k.startsWith(ck))
      ).length,
      storageLimit: storageInfo.limitSize,
      storageCurrent: storageInfo.currentSize
    };
  }

  // ============ 业务方法 ============

  // 缓存非遗列表
  cacheHeritageList(list, category = 'all') {
    const key = `${CACHE_KEYS.HERITAGE_LIST}_${category}`;
    this.set(key, list, 'list');
  }

  // 获取缓存的非遗列表
  getHeritageList(category = 'all') {
    const key = `${CACHE_KEYS.HERITAGE_LIST}_${category}`;
    return this.get(key, CACHE_CONFIG.expireTime.list);
  }

  // 缓存非遗详情
  cacheHeritageDetail(id, detail) {
    const key = `${CACHE_KEYS.HERITAGE_DETAIL}${id}`;
    this.set(key, detail, 'detail');
    
    // 控制缓存数量
    this._limitCacheSize('detail', CACHE_CONFIG.maxCount.heritageDetail);
  }

  // 获取缓存的非遗详情
  getHeritageDetail(id) {
    const key = `${CACHE_KEYS.HERITAGE_DETAIL}${id}`;
    return this.get(key, CACHE_CONFIG.expireTime.detail);
  }

  // 缓存分类数据
  cacheCategories(categories) {
    this.set(CACHE_KEYS.CATEGORY_DATA, categories, 'category');
  }

  // 获取缓存的分类
  getCategories() {
    return this.get(CACHE_KEYS.CATEGORY_DATA, CACHE_CONFIG.expireTime.category);
  }

  // ============ 私有方法 ============

  _getExpireTime(type) {
    return CACHE_CONFIG.expireTime[type] || CACHE_CONFIG.expireTime.list;
  }

  _cleanupStorage() {
    // 清理过期缓存
    const keys = wx.getStorageInfoSync().keys;
    let cleaned = 0;
    
    keys.forEach(key => {
      try {
        const data = wx.getStorageSync(key);
        if (data && data.timestamp) {
          const expire = this._getExpireTime(data.type);
          if (Date.now() - data.timestamp > expire * 2) { // 清理双倍过期时间的数据
            wx.removeStorageSync(key);
            cleaned++;
          }
        }
      } catch (e) {
        wx.removeStorageSync(key);
        cleaned++;
      }
    });
    
    console.log(`[CacheManager] 清理了 ${cleaned} 个过期缓存`);
  }

  _limitCacheSize(type, maxCount) {
    // 获取该类型的所有缓存
    const allKeys = Array.from(this.memoryCache.keys())
      .filter(k => this.memoryCache.get(k).type === type);
    
    if (allKeys.length > maxCount) {
      // 按时间排序，删除最旧的
      const sorted = allKeys.sort((a, b) => {
        return this.memoryCache.get(a).timestamp - this.memoryCache.get(b).timestamp;
      });
      
      const toRemove = sorted.slice(0, allKeys.length - maxCount);
      toRemove.forEach(key => this.remove(key));
    }
  }

  _initCleanup() {
    // 启动时清理一次
    setTimeout(() => this._cleanupStorage(), 5000);
    
    // 每30分钟清理一次
    setInterval(() => this._cleanupStorage(), 30 * 60 * 1000);
  }
}

module.exports = {
  CacheManager: CacheManager.getInstance(),
  CACHE_KEYS
};