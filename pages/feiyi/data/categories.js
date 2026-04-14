/**
 * 非遗分类数据
 * 模块化拆分非遗品类
 */

const CATEGORIES = [
  {
    id: 'all',
    name: '全部',
    icon: '🏛️',
    description: '展示所有非遗项目',
    color: '#8B4513',
    sortOrder: 0
  },
  {
    id: 'craft',
    code: 'traditional-craft',
    name: '传统技艺',
    icon: '🔨',
    description: '传统手工艺制作技术',
    color: '#A0522D',
    sortOrder: 1,
    subTypes: ['编织', '雕刻', '铸造', '印染', '酿造']
  },
  {
    id: 'art',
    code: 'traditional-art',
    name: '传统美术',
    icon: '🎨',
    description: '传统绘画、雕塑等艺术形式',
    color: '#CD853F',
    sortOrder: 2,
    subTypes: ['绘画', '雕塑', '剪纸', '刺绣', '年画']
  },
  {
    id: 'opera',
    code: 'traditional-opera',
    name: '传统戏曲',
    icon: '🎭',
    description: '传统戏剧表演艺术',
    color: '#D2691E',
    sortOrder: 3,
    subTypes: ['京剧', '昆曲', '越剧', '黄梅戏', '豫剧']
  },
  {
    id: 'custom',
    code: 'traditional-custom',
    name: '传统民俗',
    icon: '🏮',
    description: '民间传统节日与习俗',
    color: '#BC8F8F',
    sortOrder: 4,
    subTypes: ['节庆', '礼仪', '民间信仰', '传统医药']
  },
  {
    id: 'music',
    code: 'traditional-music',
    name: '传统音乐',
    icon: '🎵',
    description: '传统器乐与声乐艺术',
    color: '#F4A460',
    sortOrder: 5,
    subTypes: ['古琴', '古筝', '琵琶', '二胡', '笛子']
  }
];

// 分类映射工具
const CategoryMap = {
  // ID转Code
  idToCode: (id) => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.code : null;
  },
  // Code转ID
  codeToId: (code) => {
    const cat = CATEGORIES.find(c => c.code === code);
    return cat ? cat.id : null;
  },
  // 获取分类名称
  getName: (id) => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.name : '';
  },
  // 获取子类型
  getSubTypes: (id) => {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat ? cat.subTypes : [];
  }
};

module.exports = {
  CATEGORIES,
  CategoryMap,
  DEFAULT_CATEGORY: 'all'
};