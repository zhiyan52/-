/**
 * 非遗传承人数据库
 */

const INHERITORS = [
  {
    id: 'inh-001',
    name: '周淑英',
    gender: '女',
    birthYear: 1963,
    region: '河北省蔚县',
    category: 'art',
    level: '国家级',
    batch: '第三批',
    year: 2009,
    projectId: 'hj-001',
    projectName: '蔚县剪纸',
    avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/7dea98fd55222edfb610681365c2467a.jpg',
    brief: '从事剪纸艺术40余年，创新"染色"技法',
    fullIntro: '周淑英，国家级非物质文化遗产蔚县剪纸代表性传承人。自幼随父学艺，在继承传统的基础上大胆创新，将传统剪纸与现代审美相结合，形成了独特的艺术风格。代表作品《奥运福娃》被国际奥委会收藏。',
    honors: ['中国工艺美术大师', '河北省民间文艺家协会副主席'],
    works: ['奥运福娃', '十二生肖', '京剧脸谱'],
    contact: {
      studio: '周淑英剪纸艺术工作室',
      address: '河北省蔚县剪纸一条街'
    }
  },
  {
    id: 'inh-002',
    name: '姚建萍',
    gender: '女',
    birthYear: 1967,
    region: '江苏省苏州市',
    category: 'craft',
    level: '国家级',
    batch: '第四批',
    year: 2012,
    projectId: 'hj-002',
    projectName: '苏绣',
    avatar: 'cloud://cultural-heritage/inheritor/yao.jpg',
    brief: '当代苏绣领军人物，首创"融针绣"技法',
    fullIntro: '姚建萍，中国工艺美术大师，国家级非物质文化遗产苏绣代表性传承人。首创"融针绣"技法，将油画、摄影等艺术形式融入苏绣创作。作品多次作为国礼赠送外国元首。',
    honors: ['中国工艺美术大师', '全国劳动模范', '全国人大代表'],
    works: ['英国女王', '奥巴马总统全家福', '春早'],
    contact: {
      studio: '姚建萍刺绣艺术馆',
      address: '江苏省苏州市镇湖街道'
    }
  },
  {
    id: 'inh-003',
    name: '梅葆玖',
    gender: '男',
    birthYear: 1934,
    deathYear: 2016,
    region: '北京市',
    category: 'opera',
    level: '国家级',
    batch: '第二批',
    year: 2008,
    projectId: 'hj-003',
    projectName: '京剧',
    avatar: 'cloud://cultural-heritage/inheritor/mei.jpg',
    brief: '梅兰芳之子，梅派艺术传人',
    fullIntro: '梅葆玖，京剧表演艺术家，梅兰芳第九子，梅派艺术传人。国家一级演员，北京京剧院梅兰芳京剧团团长。一生致力于梅派艺术的传承与发展，培养了众多梅派传人。',
    honors: ['国家级非物质文化遗产代表性传承人', '梅兰芳京剧团团长'],
    works: ['霸王别姬', '贵妃醉酒', '穆桂英挂帅'],
    contact: {
      studio: '梅兰芳京剧团',
      address: '北京市西城区护国寺街'
    }
  },
  {
    id: 'inh-004',
    name: '魏宗富',
    gender: '男',
    birthYear: 1951,
    region: '陕西省华县',
    category: 'art',
    level: '国家级',
    batch: '第三批',
    year: 2009,
    projectId: 'hj-004',
    projectName: '华县皮影戏',
    avatar: 'cloud://cultural-heritage/inheritor/wei.jpg',
    brief: '华县皮影戏第四代传人，"中国皮影第一刀"',
    fullIntro: '魏宗富，国家级非物质文化遗产华县皮影戏代表性传承人。自幼学习皮影雕刻与表演，技艺精湛，被誉为"中国皮影第一刀"。其雕刻的皮影造型生动，线条流畅，色彩艳丽。',
    honors: ['中国皮影第一刀', '陕西省民间工艺美术大师'],
    works: ['封神榜全套', '西游记全套', '东游记'],
    contact: {
      studio: '魏宗富皮影艺术工作室',
      address: '陕西省渭南市华州区'
    }
  },
  {
    id: 'inh-005',
    name: '蔡正仁',
    gender: '男',
    birthYear: 1941,
    region: '上海市',
    category: 'opera',
    level: '国家级',
    batch: '第二批',
    year: 2008,
    projectId: 'hj-005',
    projectName: '昆曲',
    avatar: 'cloud://cultural-heritage/inheritor/cai.jpg',
    brief: '昆曲表演艺术家，被誉为"昆曲第一小生"',
    fullIntro: '蔡正仁，著名昆剧表演艺术家，工小生，被誉为"昆曲第一小生"。上海昆剧团团长，国家一级演员。师承俞振飞等名家，嗓音宽厚明亮，表演细腻传神，尤其擅演冠生戏。',
    honors: ['国家级非物质文化遗产代表性传承人', '上海昆剧团团长', '中国戏剧梅花奖'],
    works: ['长生殿', '牡丹亭', '连环记'],
    contact: {
      studio: '上海昆剧团',
      address: '上海市绍兴路'
    }
  },
  {
    id: 'inh-006',
    name: '王锡良',
    gender: '男',
    birthYear: 1922,
    region: '江西省景德镇市',
    category: 'craft',
    level: '国家级',
    batch: '第一批',
    year: 2007,
    projectId: 'hj-006',
    projectName: '景德镇手工制瓷',
    avatar: 'cloud://cultural-heritage/inheritor/wang.jpg',
    brief: '景德镇陶瓷艺术大师，从事陶瓷美术创作70余年',
    fullIntro: '王锡良，中国工艺美术大师，景德镇陶瓷艺术泰斗。12岁随叔父王大凡学艺，擅长粉彩人物。作品风格清新秀丽，笔法细腻，色彩和谐，被誉为"瓷坛泰斗"。',
    honors: ['中国工艺美术大师', '景德镇瓷坛泰斗', '全国陶瓷美术评比一等奖'],
    works: ['黄山四千仞', '井冈山', '瓷都景德镇'],
    contact: {
      studio: '王锡良陶瓷艺术馆',
      address: '江西省景德镇市陶瓷城'
    }
  },
  {
    id: 'inh-007',
    name: '龚一',
    gender: '男',
    birthYear: 1941,
    region: '上海市',
    category: 'music',
    level: '国家级',
    batch: '第二批',
    year: 2008,
    projectId: 'hj-007',
    projectName: '古琴艺术',
    avatar: 'cloud://cultural-heritage/inheritor/gong.jpg',
    brief: '当代著名古琴演奏家，从事古琴演奏、教学60余年',
    fullIntro: '龚一，著名古琴演奏家，国家级非物质文化遗产古琴艺术代表性传承人。师承十二位琴家，博采众长，形成独特的演奏风格。致力于古琴艺术的推广与普及，录制多张古琴专辑。',
    honors: ['国家级非物质文化遗产代表性传承人', '上海民族乐团团长', '中国音乐家协会理事'],
    works: ['流水', '广陵散', '潇湘水云'],
    contact: {
      studio: '龚一古琴工作室',
      address: '上海市音乐学院'
    }
  },
  {
    id: 'inh-008',
    name: '罗晓云',
    gender: '女',
    birthYear: 1968,
    region: '湖南省汨罗市',
    category: 'custom',
    level: '省级',
    batch: '第三批',
    year: 2016,
    projectId: 'hj-008',
    projectName: '端午节',
    avatar: 'cloud://cultural-heritage/inheritor/luo.jpg',
    brief: '汨罗江畔粽子制作技艺传承人',
    fullIntro: '罗晓云，湖南省非物质文化遗产代表性传承人，汨罗江畔粽子制作技艺传承人。家族五代传承粽子制作技艺，坚持传统工艺，选用优质原料，制作的粽子口感独特，深受好评。',
    honors: ['湖南省非物质文化遗产代表性传承人', '汨罗市粽子制作技艺传承人'],
    works: ['传统汨罗粽', '龙舟粽', '屈原粽'],
    contact: {
      studio: '罗家粽子作坊',
      address: '湖南省汨罗市屈子祠镇'
    }
  }
];

// 传承人数据工具
const InheritorUtils = {
  getById: (id) => INHERITORS.find(i => i.id === id),
  getByProject: (projectId) => INHERITORS.filter(i => i.projectId === projectId),
  getByCategory: (category) => INHERITORS.filter(i => i.category === category),
  getNationalLevel: () => INHERITORS.filter(i => i.level === '国家级'),
  getByRegion: (region) => INHERITORS.filter(i => i.region.includes(region))
};

module.exports = {
  INHERITORS,
  InheritorUtils
};