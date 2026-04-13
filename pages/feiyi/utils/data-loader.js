/**
 * 数据加载器
 * 统一封装数据获取逻辑，处理缓存、分页、筛选
 */

const { HeritageDataUtils, InheritorUtils, CATEGORIES, CategoryMap } = require('../data/index.js');
const { CacheManager } = require('./cache-manager');

class DataLoader {
  constructor() {
    this.loadingQueue = new Map();
  }

  static getInstance() {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  // 获取分类列表
  async getCategories() {
    // 检查缓存
    const cached = CacheManager.getCategories();
    if (cached) return cached;

    // 直接使用本地数据
    const categories = CATEGORIES;
    CacheManager.cacheCategories(categories);
    return categories;
  }

  // 获取非遗列表（支持分页、筛选）
  async getHeritageList(options = {}) {
    const {
      category = 'all',
      page = 1,
      pageSize = 10,
      keyword = '',
      sortBy = 'sortOrder', // sortOrder / name / year
      useCache = true
    } = options;

    // 检查缓存（仅第一页）
    if (useCache && page === 1 && !keyword) {
      const cached = CacheManager.getHeritageList(category);
      if (cached) return cached;
    }

    // 构建缓存key
    const cacheKey = `list_${category}_${page}_${keyword}`;

    // 防止重复请求
    if (this.loadingQueue.has(cacheKey)) {
      return this.loadingQueue.get(cacheKey);
    }

    const promise = this._fetchHeritageList({
      category, page, pageSize, keyword, sortBy
    });

    this.loadingQueue.set(cacheKey, promise);

    try {
      const result = await promise;
      
      // 缓存第一页
      if (page === 1 && !keyword) {
        CacheManager.cacheHeritageList(result.list, category);
      }
      
      return result;
    } finally {
      this.loadingQueue.delete(cacheKey);
    }
  }

  // 获取非遗详情
  async getHeritageDetail(id, useCache = true) {
    // 检查缓存
    if (useCache) {
      const cached = CacheManager.getHeritageDetail(id);
      if (cached) return cached;
    }

    // 从本地数据获取
    const detail = HeritageDataUtils.getById(id);
    
    if (!detail) {
      throw new Error('非遗项目不存在');
    }

    // 补充传承人完整信息
    if (detail.inheritor && detail.inheritor.id) {
      detail.inheritorFull = InheritorUtils.getById(detail.inheritor.id);
    }

    // 缓存
    CacheManager.cacheHeritageDetail(id, detail);
    
    return detail;
  }

  // 获取传承人详情
  async getInheritorDetail(id) {
    const cached = CacheManager.get(`inheritor_${id}`);
    if (cached) return cached;

    const inheritor = InheritorUtils.getById(id);
    if (inheritor) {
      CacheManager.set(`inheritor_${id}`, inheritor, 'inheritor');
    }
    
    return inheritor;
  }

  // 搜索
  async search(keyword, options = {}) {
    const { category = 'all', limit = 20 } = options;
    
    if (!keyword || keyword.trim().length === 0) {
      return { list: [], total: 0 };
    }

    // 执行搜索
    let results = HeritageDataUtils.search(keyword);
    
    // 分类筛选
    if (category !== 'all') {
      results = results.filter(h => h.categoryId === category);
    }

    return {
      list: results.slice(0, limit),
      total: results.length,
      keyword
    };
  }

  // 获取推荐列表
  async getRecommendations(type = 'hot', limit = 5) {
    const cacheKey = `recommend_${type}`;
    const cached = CacheManager.get(cacheKey);
    if (cached) return cached;

    let list;
    if (type === 'hot') {
      list = HeritageDataUtils.getHot().slice(0, limit);
    } else if (type === 'recommend') {
      list = HeritageDataUtils.getRecommend().slice(0, limit);
    } else if (type === 'audio') {
      list = HeritageDataUtils.getWithAudio().slice(0, limit);
    } else {
      list = [];
    }

    CacheManager.set(cacheKey, list, 'list');
    return list;
  }

  // 获取统计数据
  async getStatistics() {
    const cached = CacheManager.get('statistics');
    if (cached) return cached;

    const stats = HeritageDataUtils.getStats();
    CacheManager.set('statistics', stats, 'category');
    
    return stats;
  }

  // ============ 私有方法 ============

  async _fetchHeritageList({ category, page, pageSize, keyword, sortBy }) {
    // 模拟异步延迟（实际项目中这里是网络请求）
    await new Promise(resolve => setTimeout(resolve, 100));

    let list;
    
    if (keyword) {
      // 搜索模式
      const searchResult = await this.search(keyword, { category, limit: 100 });
      list = searchResult.list;
    } else {
      // 正常分页
      const result = HeritageDataUtils.getByPage(page, pageSize, category);
      list = result.list;
    }

    // 排序
    list = this._sortList(list, sortBy);

    // 补充分类名称
    list = list.map(item => ({
      ...item,
      categoryName: this._getCategoryName(item.categoryId)
    }));

    return {
      list: list || [],
      page,
      pageSize,
      total: keyword ? list.length : HeritageDataUtils.getByCategory(category).length,
      hasMore: (list || []).length === pageSize
    };
  }

  _sortList(list, sortBy) {
    if (!list || !Array.isArray(list)) return [];
    
    const sorters = {
      sortOrder: (a, b) => (a.display?.sortOrder || 0) - (b.display?.sortOrder || 0),
      name: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
      year: (a, b) => (b.meta?.year || 0) - (a.meta?.year || 0)
    };

    return [...list].sort(sorters[sortBy] || sorters.sortOrder);
  }

  _getCategoryName(categoryId) {
    return CategoryMap.getName(categoryId) || '其他';
  }
}

module.exports = DataLoader.getInstance();
