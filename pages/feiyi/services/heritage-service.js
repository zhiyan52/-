/**
 * 非遗数据服务
 * 封装数据获取逻辑，处理缓存策略
 */

const { HeritageDataUtils, CategoryMap } = require('../data/');
const { CacheManager } = require('../utils/cache-manager');

class HeritageService {
  // 获取列表（带缓存）
  async getList(params = {}) {
    const { category = 'all', page = 1, pageSize = 10, keyword = '', sortBy = 'sortOrder' } = params;
    
    // 构建缓存key
    const cacheKey = `heritage_list_${category}_${page}_${keyword}_${sortBy}`;
    
    // 尝试从缓存获取
    if (page === 1) {
      const cached = CacheManager.get(cacheKey);
      if (cached) return cached;
    }
    
    // 从本地数据获取
    let list = [];
    if (keyword) {
      list = HeritageDataUtils.search(keyword);
      if (category !== 'all') {
        list = list.filter(h => h.categoryId === category);
      }
    } else {
      list = HeritageDataUtils.getByCategory(category);
    }
    
    // 排序
    list = this._sortList(list, sortBy);
    
    // 分页
    const total = list.length;
    const start = (page - 1) * pageSize;
    const pagedList = list.slice(start, start + pageSize);
    
    // 补充分类名称
    const result = {
      list: pagedList.map(h => ({
        ...h,
        categoryName: CategoryMap.getName(h.categoryId)
      })),
      page,
      pageSize,
      total,
      hasMore: start + pageSize < total
    };
    
    // 缓存第一页
    if (page === 1) {
      CacheManager.set(cacheKey, result, 'list');
    }
    
    return result;
  }

  // 获取详情（带缓存）
  async getDetail(id) {
    const cacheKey = `heritage_detail_${id}`;
    
    // 检查缓存
    const cached = CacheManager.get(cacheKey);
    if (cached) return cached;
    
    // 获取数据
    const detail = HeritageDataUtils.getById(id);
    if (!detail) {
      throw new Error('非遗项目不存在');
    }
    
    // 补充完整信息
    const fullDetail = {
      ...detail,
      categoryName: CategoryMap.getName(detail.categoryId),
      categoryColor: this._getCategoryColor(detail.categoryId)
    };
    
    // 缓存
    CacheManager.set(cacheKey, fullDetail, 'detail');
    
    return fullDetail;
  }

  // 获取推荐
  async getRecommendations(type = 'hot', limit = 5) {
    const cacheKey = `heritage_recommend_${type}_${limit}`;
    
    const cached = CacheManager.get(cacheKey);
    if (cached) return cached;
    
    let list = [];
    if (type === 'hot') {
      list = HeritageDataUtils.getHot();
    } else if (type === 'recommend') {
      list = HeritageDataUtils.getRecommend();
    } else if (type === 'audio') {
      list = HeritageDataUtils.getWithAudio();
    }
    
    const result = list.slice(0, limit).map(h => ({
      ...h,
      categoryName: CategoryMap.getName(h.categoryId)
    }));
    
    CacheManager.set(cacheKey, result, 'list');
    return result;
  }

  // 搜索
  async search(keyword, options = {}) {
    const { category = 'all', limit = 20 } = options;
    
    if (!keyword?.trim()) {
      return { list: [], total: 0, keyword: '' };
    }
    
    let list = HeritageDataUtils.search(keyword);
    
    if (category !== 'all') {
      list = list.filter(h => h.categoryId === category);
    }
    
    return {
      list: list.slice(0, limit).map(h => ({
        ...h,
        categoryName: CategoryMap.getName(h.categoryId)
      })),
      total: list.length,
      keyword
    };
  }

  // 获取统计
  async getStatistics() {
    const cacheKey = 'heritage_statistics';
    
    const cached = CacheManager.get(cacheKey);
    if (cached) return cached;
    
    const stats = HeritageDataUtils.getStats();
    CacheManager.set(cacheKey, stats, 'category');
    
    return stats;
  }

  // 获取分类
  async getCategories() {
    const { CATEGORIES } = require('../data/');
    return CATEGORIES;
  }

  // ============ 私有方法 ============
  _sortList(list, sortBy) {
    const sorters = {
      sortOrder: (a, b) => (a.display?.sortOrder || 0) - (b.display?.sortOrder || 0),
      name: (a, b) => a.name.localeCompare(b.name, 'zh-CN'),
      year: (a, b) => (b.meta?.year || 0) - (a.meta?.year || 0),
      grade: (a, b) => {
        const gradeOrder = { '人类级': 3, '国家级': 2, '省级': 1 };
        return (gradeOrder[b.meta?.grade] || 0) - (gradeOrder[a.meta?.grade] || 0);
      }
    };
    
    return [...list].sort(sorters[sortBy] || sorters.sortOrder);
  }

  _getCategoryColor(categoryId) {
    const colors = {
      craft: '#A0522D',
      art: '#CD853F',
      opera: '#D2691E',
      custom: '#BC8F8F',
      music: '#F4A460'
    };
    return colors[categoryId] || '#8B4513';
  }
}

module.exports = new HeritageService();