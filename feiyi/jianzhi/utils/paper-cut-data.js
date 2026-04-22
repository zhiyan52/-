const PATTERN_LIBRARY = {
  // 基础图案
  'flower': {
    name: '团花',
    category: '植物',
    difficulty: 1,
    meaning: '花开富贵，团圆美满',
    unlockLevel: 1
  },
  'fish': {
    name: '连年有余',
    category: '吉祥',
    difficulty: 1,
    meaning: '生活富足，年年有余',
    unlockLevel: 1
  },
  'double-happiness': {
    name: '双喜',
    category: '婚庆',
    difficulty: 2,
    meaning: '双喜临门，百年好合',
    unlockLevel: 2
  },
  'bat': {
    name: '五福捧寿',
    category: '祝寿',
    difficulty: 2,
    meaning: '福寿安康，五福临门',
    unlockLevel: 3
  },
  'lantern': {
    name: '元宵花灯',
    category: '节庆',
    difficulty: 2,
    meaning: '灯火辉煌，前程光明',
    unlockLevel: 3,
    seasonal: 'lantern-festival'
  },
  
  // 生肖系列
  'zodiac-rat': { name: '子鼠', category: '生肖', difficulty: 3, meaning: '机智灵敏，子孙满堂', unlockLevel: 4 },
  'zodiac-ox': { name: '丑牛', category: '生肖', difficulty: 2, meaning: '勤劳踏实，牛气冲天', unlockLevel: 4 },
  // ... 其他生肖
  
  // 高级图案
  'phoenix': {
    name: '百鸟朝凤',
    category: '神话',
    difficulty: 3,
    meaning: '吉祥如意，天下太平',
    unlockLevel: 5,
    requireStars: 15
  },
  'dragon': {
    name: '龙腾四海',
    category: '神话',
    difficulty: 3,
    meaning: '飞黄腾达，国泰民安',
    unlockLevel: 6,
    requireStars: 20
  }
};

// 折叠方式配置
const FOLD_CONFIGS = [
  { id: 'none', name: '不折叠', desc: '直接剪，适合对称图案', minLevel: 1 },
  { id: 'half', name: '对边折', desc: '折一次，2层对称', minLevel: 1 },
  { id: 'quarter', name: '四折', desc: '折两次，4层放射对称', minLevel: 2 },
  { id: 'diagonal', name: '对角折', desc: '对角折叠，适合菱形图案', minLevel: 3 },
  { id: 'triangle', name: '三角折', desc: '三折，6层雪花效果', minLevel: 4 },
  { id: 'pentagon', name: '五角折', desc: '五折，10层复杂对称', minLevel: 5 }
];

module.exports = { PATTERN_LIBRARY, FOLD_CONFIGS };