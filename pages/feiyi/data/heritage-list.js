/**
 * 非遗项目数据
 * 每个项目包含：1张轻量图 + 200字核心介绍 + 传承人极简介绍
 */

const HERITAGE_LIST = [
  {
    id: 'hj-001',
    categoryId: 'art',
    subType: '剪纸',
    name: '蔚县剪纸',
    briefName: '剪纸',
    // 轻量图片配置（建议尺寸：750x400，压缩至50KB以内）
    images: {
      cover: 'cloud://cultural-heritage/heritage/paper-cut/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/paper-cut/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/paper-cut/detail-1.jpg',
        'cloud://cultural-heritage/heritage/paper-cut/detail-2.jpg'
      ]
    },
    // 核心介绍（严格控制在200字以内）
    introduction: '蔚县剪纸源于明代，是一种以阴刻为主的点彩剪纸。其工艺独特，以薄薄的宣纸为原料，用小巧锐利的雕刀手工刻制，再点染明快绚丽的色彩而成。构图饱满充实，造型生动优美，色彩对比强烈，富有乡土气息。',
    wordCount: 98,
    // 传承人极简介绍
    inheritor: {
      id: 'inh-001',
      name: '周淑英',
      level: '国家级',
      title: '国家级非物质文化遗产代表性传承人',
      brief: '从事剪纸艺术40余年，创新"染色"技法，作品《奥运福娃》被国际奥委会收藏。',
      avatar: 'cloud://cultural-heritage/inheritor/zhou.jpg'
    },
    // 音频配置（10秒轻量音频）
    audio: {
      hasAudio: true,
      // 云存储路径（低码率64kbps，文件大小<100KB）
      src: 'cloud://cultural-heritage/audio/paper-cut-10s.mp3',
      duration: 10,
      format: 'mp3',
      bitrate: '64kbps',
      // 音频文案（旁白文字）
      script: '蔚县剪纸，刀锋游走间，千年民俗跃然纸上。'
    },
    // 元数据
    meta: {
      region: '河北省蔚县',
      grade: '国家级',
      batch: '第一批',
      year: 2006,
      UNESCO: false
    },
    // 扩展信息（详情页使用）
    detail: {
      history: '蔚县剪纸相传已有两百年历史。清代末年，剪纸工具由剪刀改为刻刀，技法由剪转变为刻，由此产生了蔚县剪纸独特的艺术风格。',
      technique: '以阴刻为主，阳刻为辅，重彩点染。刀工精细，色彩浓艳而调和。',
      value: '2006年入选第一批国家级非物质文化遗产名录，是研究中国北方民俗文化的活化石。'
    },
    // 展示配置
    display: {
      sortOrder: 1,
      isHot: true,
      isRecommend: true,
      tags: ['世界级', '指尖艺术', '民间美术']
    }
  },

  {
    id: 'hj-002',
    categoryId: 'craft',
    subType: '刺绣',
    name: '苏绣',
    briefName: '苏绣',
    images: {
      cover: 'cloud://cultural-heritage/heritage/su-embroidery/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/su-embroidery/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/su-embroidery/detail-1.jpg'
      ]
    },
    introduction: '苏绣是苏州地区刺绣产品的总称，为江苏省苏州市民间传统美术。苏绣起源于苏州，是四大名绣之一，国家级非物质文化遗产之一。苏绣具有图案秀丽、构思巧妙、绣工细致、针法活泼、色彩清雅的独特风格。',
    wordCount: 118,
    inheritor: {
      id: 'inh-002',
      name: '姚建萍',
      level: '国家级',
      title: '国家级非物质文化遗产代表性传承人',
      brief: '当代苏绣领军人物，首创"融针绣"技法，作品被中南海、人民大会堂等收藏。',
      avatar: 'cloud://cultural-heritage/inheritor/yao.jpg'
    },
    audio: {
      hasAudio: true,
      src: 'cloud://cultural-heritage/audio/su-embroidery-10s.mp3',
      duration: 10,
      format: 'mp3',
      bitrate: '64kbps',
      script: '苏绣，以针为笔，以丝为墨，绣出江南万千风情。'
    },
    meta: {
      region: '江苏省苏州市',
      grade: '国家级',
      batch: '第一批',
      year: 2006,
      UNESCO: false
    },
    detail: {
      history: '苏绣源于春秋，兴于唐宋，盛于明清。清代是苏绣的全盛时期，流派繁衍，名手竞秀。',
      technique: '苏绣针法丰富，有齐针、散套、施针、乱针等四十余种。双面绣是苏绣的绝技。',
      value: '2006年列入第一批国家级非物质文化遗产名录，具有极高的艺术价值和收藏价值。'
    },
    display: {
      sortOrder: 2,
      isHot: true,
      isRecommend: true,
      tags: ['四大名绣', '江南工艺', '丝织艺术']
    }
  },

  {
    id: 'hj-003',
    categoryId: 'opera',
    subType: '京剧',
    name: '京剧',
    briefName: '京剧',
    images: {
      cover: 'cloud://cultural-heritage/heritage/peking-opera/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/peking-opera/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/peking-opera/detail-1.jpg',
        'cloud://cultural-heritage/heritage/peking-opera/detail-2.jpg'
      ]
    },
    introduction: '京剧，又称平剧、京戏等，中国国粹之一，是中国影响最大的戏曲剧种，分布地以北京为中心，遍及全国各地。京剧在文学、表演、音乐、舞台美术等各个方面都有一套规范化的艺术表现形式。',
    wordCount: 116,
    inheritor: {
      id: 'inh-003',
      name: '梅葆玖',
      level: '国家级',
      title: '国家级非物质文化遗产代表性传承人',
      brief: '梅兰芳之子，梅派艺术传人，致力于京剧艺术的传承与推广。',
      avatar: 'cloud://cultural-heritage/inheritor/mei.jpg'
    },
    audio: {
      hasAudio: true,
      src: 'cloud://cultural-heritage/audio/peking-opera-10s.mp3',
      duration: 10,
      format: 'mp3',
      bitrate: '64kbps',
      script: '京剧，唱念做打，生旦净丑，演绎千年华夏风骨。'
    },
    meta: {
      region: '北京市',
      grade: '国家级',
      batch: '第一批',
      year: 2006,
      UNESCO: true,
      UNESCOYear: 2010
    },
    detail: {
      history: '京剧形成于清代乾隆五十五年，四大徽班进京后与昆曲、汉剧等融合，逐渐发展成为国粹。',
      technique: '京剧表演讲究唱、念、做、打四功，手、眼、身、法、步五法。脸谱艺术独具特色。',
      value: '2010年入选联合国教科文组织人类非物质文化遗产代表作名录，是中国戏曲艺术的最高代表。'
    },
    display: {
      sortOrder: 3,
      isHot: true,
      isRecommend: true,
      tags: ['国粹', '人类非遗', '戏曲之王']
    }
  },

  {
    id: 'hj-004',
    categoryId: 'art',
    subType: '皮影',
    name: '华县皮影戏',
    briefName: '皮影戏',
    images: {
      cover: 'cloud://cultural-heritage/heritage/shadow-puppet/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/shadow-puppet/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/shadow-puppet/detail-1.jpg'
      ]
    },
    introduction: '皮影戏，又称"影子戏"或"灯影戏"，是一种以兽皮或纸板做成的人物剪影以表演故事的民间戏剧。表演时，艺人们在白色幕布后面，一边操纵影人，一边用当地流行的曲调讲述故事。',
    wordCount: 118,
    inheritor: {
      id: 'inh-004',
      name: '魏宗富',
      level: '国家级',
      title: '国家级非物质文化遗产代表性传承人',
      brief: '华县皮影戏第四代传人，被誉为"中国皮影第一刀"，雕刻技艺精湛。',
      avatar: 'cloud://cultural-heritage/inheritor/wei.jpg'
    },
    audio: {
      hasAudio: true,
      src: 'cloud://cultural-heritage/audio/shadow-puppet-10s.mp3',
      duration: 10,
      format: 'mp3',
      bitrate: '64kbps',
      script: '皮影戏，一盏灯，一块布，唱尽人间悲欢离合。'
    },
    meta: {
      region: '陕西省华县',
      grade: '国家级',
      batch: '第一批',
      year: 2006,
      UNESCO: true,
      UNESCOYear: 2011
    },
    detail: {
      history: '华县皮影戏起源于汉代，兴盛于唐宋，是中国皮影戏的重要发源地之一。',
      technique: '华县皮影以牛皮为原料，经过刮、磨、洗、刻、染等二十四道工序，共雕凿4800余刀。',
      value: '2011年入选联合国教科文组织人类非物质文化遗产代表作名录，被誉为"电影始祖"。'
    },
    display: {
      sortOrder: 4,
      isHot: false,
      isRecommend: true,
      tags: ['电影始祖', '人类非遗', '光影艺术']
    }
  },

  {
    id: 'hj-005',
    categoryId: 'opera',
    subType: '昆曲',
    name: '昆曲',
    briefName: '昆曲',
    images: {
      cover: 'cloud://cultural-heritage/heritage/kunqu/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/kunqu/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/kunqu/detail-1.jpg'
      ]
    },
    introduction: '昆曲，原名"昆山腔"或简称"昆腔"，是中国古老的戏曲声腔、剧种，现又被称为"昆剧"。昆曲是汉族传统戏曲中最古老的剧种之一，也是中国汉族传统文化艺术，特别是戏曲艺术中的珍品。',
    wordCount: 122,
    inheritor: {
      id: 'inh-005',
      name: '蔡正仁',
      level: '国家级',
      title: '国家级非物质文化遗产代表性传承人',
      brief: '昆曲表演艺术家，工小生，被誉为"昆曲第一小生"。',
      avatar: 'cloud://cultural-heritage/inheritor/cai.jpg'
    },
    audio: {
      hasAudio: true,
      src: 'cloud://cultural-heritage/audio/kunqu-10s.mp3',
      duration: 10,
      format: 'mp3',
      bitrate: '64kbps',
      script: '昆曲，水磨调婉转，六百年雅韵流芳。'
    },
    meta: {
      region: '江苏省昆山市',
      grade: '人类级',
      batch: '第一批',
      year: 2001,
      UNESCO: true,
      UNESCOYear: 2001
    },
    detail: {
      history: '昆曲发源于14世纪苏州昆山，经魏良辅改良后风行全国，被誉为"百戏之祖"。',
      technique: '昆曲表演注重"手、眼、身、法、步"，唱腔婉转细腻，有"水磨调"之称。',
      value: '2001年入选联合国教科文组织首批人类口头和非物质遗产代表作，是中国戏曲艺术的活化石。'
    },
    display: {
      sortOrder: 5,
      isHot: true,
      isRecommend: true,
      tags: ['百戏之祖', '人类非遗', '雅部正音']
    }
  },

  {
    id: 'hj-006',
    categoryId: 'craft',
    subType: '陶瓷',
    name: '景德镇手工制瓷',
    briefName: '景德镇瓷',
    images: {
      cover: 'cloud://cultural-heritage/heritage/jdz-porcelain/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/jdz-porcelain/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/jdz-porcelain/detail-1.jpg'
      ]
    },
    introduction: '景德镇手工制瓷技艺是以高岭土等为原料，经制料、成型、装饰、烧成等工序制作瓷器的传统手工技艺。景德镇瓷器以"白如玉、明如镜、薄如纸、声如磬"的独特风格蜚声海内外。',
    wordCount: 108,
    inheritor: {
      id: 'inh-006',
      name: '王锡良',
      level: '国家级',
      title: '中国工艺美术大师',
      brief: '景德镇陶瓷艺术大师，从事陶瓷美术创作70余年，是景德镇瓷坛的泰斗级人物。',
      avatar: 'cloud://cultural-heritage/inheritor/wang.jpg'
    },
    audio: {
      hasAudio: false, // 此项目暂无音频
      reason: '制瓷工艺以视觉为主，音频表现力有限'
    },
    meta: {
      region: '江西省景德镇市',
      grade: '国家级',
      batch: '第一批',
      year: 2006,
      UNESCO: false
    },
    detail: {
      history: '景德镇制瓷始于汉代，兴于唐宋，盛于明清。宋代真宗皇帝以年号赐名"景德镇"。',
      technique: '传统制瓷包括拉坯、利坯、画坯、施釉、烧窑等72道工序，分工极细。',
      value: '2006年列入第一批国家级非物质文化遗产名录，代表了中国制瓷工艺的最高水平。'
    },
    display: {
      sortOrder: 6,
      isHot: true,
      isRecommend: false,
      tags: ['瓷都', '工匠精神', '火的艺术']
    }
  },

  {
    id: 'hj-007',
    categoryId: 'music',
    subType: '古琴',
    name: '古琴艺术',
    briefName: '古琴',
    images: {
      cover: 'cloud://cultural-heritage/heritage/guqin/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/guqin/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/guqin/detail-1.jpg'
      ]
    },
    introduction: '古琴又称"琴"、"七弦琴"，是中国最古老的弹拨乐器之一。古琴艺术是中国传统音乐文化的重要组成部分，包含琴曲、琴谱、琴歌、琴论、琴史等内容，具有深厚的文化内涵。',
    wordCount: 112,
    inheritor: {
      id: 'inh-007',
      name: '龚一',
      level: '国家级',
      title: '国家级非物质文化遗产代表性传承人',
      brief: '当代著名古琴演奏家，从事古琴演奏、教学60余年，录制多张古琴专辑。',
      avatar: 'cloud://cultural-heritage/inheritor/gong.jpg'
    },
    audio: {
      hasAudio: true,
      src: 'cloud://cultural-heritage/audio/guqin-10s.mp3',
      duration: 10,
      format: 'mp3',
      bitrate: '64kbps',
      script: '古琴，七弦十三徽，高山流水觅知音。'
    },
    meta: {
      region: '全国',
      grade: '人类级',
      batch: '第二批',
      year: 2003,
      UNESCO: true,
      UNESCOYear: 2003
    },
    detail: {
      history: '古琴历史可追溯至三千年前，是孔子时代就已盛行的乐器，位列"琴棋书画"四艺之首。',
      technique: '古琴音色深沉，余音悠远，演奏技法丰富，有散音、泛音、按音三种音色。',
      value: '2003年入选联合国教科文组织人类非物质文化遗产代表作名录，是中国音乐文化的象征。'
    },
    display: {
      sortOrder: 7,
      isHot: false,
      isRecommend: true,
      tags: ['四艺之首', '人类非遗', '文人音乐']
    }
  },

  {
    id: 'hj-008',
    categoryId: 'custom',
    subType: '节庆',
    name: '端午节',
    briefName: '端午',
    images: {
      cover: 'cloud://cultural-heritage/heritage/dragon-boat/cover.jpg',
      thumbnail: 'cloud://cultural-heritage/heritage/dragon-boat/thumb.jpg',
      detail: [
        'cloud://cultural-heritage/heritage/dragon-boat/detail-1.jpg'
      ]
    },
    introduction: '端午节，又称端阳节、龙舟节等，是中国四大传统节日之一。端午节起源于上古先民择"飞龙在天"吉日拜祭龙祖、祈福辟邪，后因战国时期的楚国诗人屈原在该日抱石跳汨罗江自尽，统治者为树立忠君爱国标签将端午作为纪念屈原的节日。',
    wordCount: 138,
    inheritor: {
      id: 'inh-008',
      name: '罗晓云',
      level: '省级',
      title: '湖南省非物质文化遗产代表性传承人',
      brief: '汨罗江畔粽子制作技艺传承人，致力于端午文化的保护与传播。',
      avatar: 'cloud://cultural-heritage/inheritor/luo.jpg'
    },
    audio: {
      hasAudio: true,
      src: 'cloud://cultural-heritage/audio/dragon-boat-10s.mp3',
      duration: 10,
      format: 'mp3',
      bitrate: '64kbps',
      script: '端午，龙舟竞渡，粽叶飘香，纪念屈原，传承千年。'
    },
    meta: {
      region: '全国各地',
      grade: '人类级',
      batch: '第一批',
      year: 2006,
      UNESCO: true,
      UNESCOYear: 2009
    },
    detail: {
      history: '端午节形成于汉代，唐宋时期习俗丰富，明清时期成为与春节齐名的大节。',
      technique: '主要习俗有赛龙舟、吃粽子、挂艾草、佩香囊、饮雄黄酒等。',
      value: '2009年入选联合国教科文组织人类非物质文化遗产代表作名录，是中国首个入选世界非遗的节日。'
    },
    display: {
      sortOrder: 8,
      isHot: true,
      isRecommend: false,
      tags: ['四大节日', '人类非遗', '龙舟精神']
    }
  }
];

// 数据查询工具
const HeritageDataUtils = {
  // 根据ID获取项目
  getById: (id) => HERITAGE_LIST.find(h => h.id === id),
  
  // 根据分类获取列表
  getByCategory: (categoryId) => {
    if (categoryId === 'all') return HERITAGE_LIST;
    return HERITAGE_LIST.filter(h => h.categoryId === categoryId);
  },
  
  // 获取热门推荐
  getHot: () => HERITAGE_LIST.filter(h => h.display.isHot),
  
  // 获取推荐列表
  getRecommend: () => HERITAGE_LIST.filter(h => h.display.isRecommend),
  
  // 搜索功能
  search: (keyword) => {
    const lowerKey = keyword.toLowerCase();
    return HERITAGE_LIST.filter(h => 
      h.name.includes(keyword) || 
      h.introduction.includes(keyword) ||
      h.inheritor.name.includes(keyword)
    );
  },
  
  // 分页获取
  getByPage: (page = 1, pageSize = 10, categoryId = 'all') => {
    const list = categoryId === 'all' 
      ? HERITAGE_LIST 
      : HERITAGE_LIST.filter(h => h.categoryId === categoryId);
    const start = (page - 1) * pageSize;
    return {
      list: list.slice(start, start + pageSize),
      total: list.length,
      hasMore: start + pageSize < list.length
    };
  },
  
  // 获取所有音频项目
  getWithAudio: () => HERITAGE_LIST.filter(h => h.audio.hasAudio),
  
  // 获取统计数据
  getStats: () => ({
    total: HERITAGE_LIST.length,
    withAudio: HERITAGE_LIST.filter(h => h.audio.hasAudio).length,
    byCategory: {
      craft: HERITAGE_LIST.filter(h => h.categoryId === 'craft').length,
      art: HERITAGE_LIST.filter(h => h.categoryId === 'art').length,
      opera: HERITAGE_LIST.filter(h => h.categoryId === 'opera').length,
      custom: HERITAGE_LIST.filter(h => h.categoryId === 'custom').length,
      music: HERITAGE_LIST.filter(h => h.categoryId === 'music').length
    }
  })
};

module.exports = {
  HERITAGE_LIST,
  HeritageDataUtils
};