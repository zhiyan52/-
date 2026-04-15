/**
 * 数据加载器
 * 统一封装数据获取逻辑，处理缓存、分页、筛选
 */

const { HeritageDataUtils, InheritorUtils, CATEGORIES, CategoryMap, HERITAGE_LIST } = require('../data/index.js');
const { CacheManager } = require('./cache-manager');

// 打印数据加载情况
console.log('DataLoader初始化:', {
  heritageListLength: HERITAGE_LIST ? HERITAGE_LIST.length : 0,
  categoriesLength: CATEGORIES ? CATEGORIES.length : 0
});

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
    try {
      // 检查缓存
      const cached = CacheManager.getCategories();
      if (cached) return cached;

      // 直接使用本地数据
      const categories = CATEGORIES;
      if (categories && Array.isArray(categories) && categories.length > 0) {
        CacheManager.cacheCategories(categories);
        return categories;
      } else {
        console.warn('分类数据为空，使用默认分类');
        // 使用默认分类数据
        const defaultCategories = [
          { id: 'craft', name: '传统技艺', icon: '🔨', description: '传统手工艺制作技术', color: '#A0522D' },
          { id: 'art', name: '传统美术', icon: '🎨', description: '传统绘画、雕塑等艺术形式', color: '#CD853F' },
          { id: 'opera', name: '传统戏曲', icon: '🎭', description: '传统戏剧表演艺术', color: '#D2691E' },
          { id: 'music', name: '传统音乐', icon: '🎵', description: '传统音乐表演艺术', color: '#F4A460' }
        ];
        CacheManager.cacheCategories(defaultCategories);
        return defaultCategories;
      }
    } catch (err) {
      console.error('获取分类失败:', err);
      // 返回默认分类
      return [
        { id: 'all', name: '全部', icon: '🏛️', description: '展示所有非遗项目', color: '#8B4513' },
        { id: 'craft', name: '传统技艺', icon: '🔨', description: '传统手工艺制作技术', color: '#A0522D' },
        { id: 'art', name: '传统美术', icon: '🎨', description: '传统绘画、雕塑等艺术形式', color: '#CD853F' },
        { id: 'opera', name: '传统戏曲', icon: '🎭', description: '传统戏剧表演艺术', color: '#D2691E' },
        { id: 'custom', name: '传统民俗', icon: '🏮', description: '民间传统节日与习俗', color: '#BC8F8F' }
      ];
    }
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
      if (cached && Array.isArray(cached)) {
        // 缓存的是数组，需要包装成与_fetchHeritageList方法返回的结构相同的对象
        return {
          list: cached,
          page,
          pageSize,
          total: cached.length,
          hasMore: cached.length >= pageSize
        };
      }
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
    try {
      console.log('开始获取非遗列表:', { category, page, pageSize, keyword, sortBy });

      // 模拟异步延迟（实际项目中这里是网络请求）
      await new Promise(resolve => setTimeout(resolve, 100));

      let list;

      if (keyword) {
        // 搜索模式
        console.log('搜索模式:', keyword);
        const searchResult = await this.search(keyword, { category, limit: 100 });
        list = searchResult.list;
        console.log('搜索结果数量:', list.length);
      } else {
        // 正常分页
        console.log('正常分页模式:', category);
        const result = HeritageDataUtils.getByPage(page, pageSize, category);
        list = result.list;
        console.log('分页结果数量:', list.length);
        console.log('总数量:', result.total);
      }

      // 排序
      list = this._sortList(list, sortBy);
      console.log('排序后数量:', list.length);

      // 补充分类名称
      list = list.map(item => ({
        ...item,
        categoryName: this._getCategoryName(item.categoryId)
      }));

      const result = {
        list: list || [],
        page,
        pageSize,
        total: keyword ? list.length : HeritageDataUtils.getByCategory(category).length,
        hasMore: (list || []).length === pageSize
      };

      console.log('返回结果:', result);
      return result;
    } catch (err) {
      console.error('获取非遗列表失败:', err);
      // 返回空列表，避免页面显示错误
      return {
        list: [],
        page,
        pageSize,
        total: 0,
        hasMore: false
      };
    }
  }

  _sortList(list, sortBy) {
    if (!list || !Array.isArray(list)) return [];

    const sorters = {
      sortOrder: (a, b) => ((a.display && a.display.sortOrder) || 0) - ((b.display && b.display.sortOrder) || 0),
      name: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
      year: (a, b) => ((b.meta && b.meta.year) || 0) - ((a.meta && a.meta.year) || 0)
    };

    return [...list].sort(sorters[sortBy] || sorters.sortOrder);
  }

  _getCategoryName(categoryId) {
    const name = CategoryMap.getName(categoryId) || '其他';
    console.log('获取分类名称:', { categoryId, name });
    return name;
  }
}

module.exports = DataLoader.getInstance();