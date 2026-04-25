// 示例数据：富春山居图
const MOCK_DATA = {
  _id: 'fuchun',
  meta: {
    name: '富春山居图',
    author: '黄公望',
    era: '元代',
    creationYear: 1350
  },
  heritage: {
    milestones: [
      {
        id: 'm1',
        year: 1350,
        era: '元代',
        title: '黄公望作完富春山居图',
        event: '黄公望于至正十年（1350年）完成《富春山居图》，时年七十九岁。',
        location: {
          name: '富春山',
          region: '浙江富阳',
          x: 119.95,
          y: 29.95
        },
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9b8d237c51e3b922d16dc3eae5723004.jpg',
        detail: {
          text: '黄公望，字子久，号大痴道人，元代著名画家。《富春山居图》是其晚年代表作，耗时数年完成。画作描绘了富春江两岸的山水风光，笔法精妙，意境深远。',
          artifacts: ['黄公望《富春山居图》卷', '《富春山居图》题跋']
        }
      },
      {
        id: 'm2',
        year: 1350,
        era: '元代',
        title: '无用师收藏',
        event: '黄公望将此图题款赠给无用师。',
        location: {
          name: '无用师庵',
          region: '浙江杭州',
          x: 120.15,
          y: 30.28
        },
        detail: {
          text: '无用师，元代僧人，与黄公望交往密切。黄公望在画作完成后，特意题款赠给无用师，可见二人交情深厚。'
        }
      },
      {
        id: 'm3',
        year: 1652,
        era: '清代',
        title: '吴洪裕临终焚画',
        event: '收藏家吴洪裕临终前欲焚此画殉葬，被侄子吴静庵从火中抢出，已烧成两段。',
        location: {
          name: '吴家',
          region: '江苏苏州',
          x: 120.58,
          y: 31.29
        },
        splitEvent: true,
        detail: {
          text: '吴洪裕是明末清初的收藏家，对《富春山居图》爱不释手，临终前竟想将其焚烧殉葬。幸得侄子吴静庵及时抢救，但画作已被烧成两段。'
        }
      },
      {
        id: 'm4',
        year: 1652,
        era: '清代',
        title: '剩山图诞生',
        event: '前段较短，称《剩山图》，后为浙江博物馆收藏。',
        location: {
          name: '浙江博物馆',
          region: '浙江杭州',
          x: 120.15,
          y: 30.28
        },
        branch: 'front',
        detail: {
          text: '被烧毁的前段较短，仅存起首部分，后人称之为《剩山图》。此段后来辗转收藏，最终为浙江博物馆所得。'
        }
      },
      {
        id: 'm5',
        year: 1652,
        era: '清代',
        title: '无用师卷诞生',
        event: '后段较长，称《无用师卷》，历经多人收藏。',
        location: {
          name: '吴家',
          region: '江苏苏州',
          x: 120.58,
          y: 31.29
        },
        branch: 'back',
        detail: {
          text: '被烧毁的后段较长，保留了主体部分，后人称之为《无用师卷》。此段历经多人收藏，后入清宫。'
        }
      },
      {
        id: 'm6',
        year: 1745,
        era: '清代',
        title: '乾隆题跋',
        event: '乾隆皇帝得到《无用师卷》，误以为是赝品，却将真迹题满跋文。',
        location: {
          name: '紫禁城',
          region: '北京',
          x: 116.40,
          y: 39.90
        },
        branch: 'back',
        detail: {
          text: '乾隆皇帝得到《无用师卷》后，却将其误认为赝品，反而将此前得到的摹本《子明卷》视为真迹。他在《无用师卷》上题满了跋文，多达55处，几乎覆盖了画面。'
        }
      },
      {
        id: 'm7',
        year: 1948,
        era: '民国',
        title: '无用师卷赴台',
        event: '国民党政府将《无用师卷》等文物运往台湾，现藏于台北故宫博物院。',
        location: {
          name: '台北故宫博物院',
          region: '台湾台北',
          x: 121.53,
          y: 25.03
        },
        branch: 'back',
        detail: {
          text: '1948年，国民党政府在撤退台湾时，将大量故宫文物运往台湾，其中包括《无用师卷》。此后，《无用师卷》一直收藏于台北故宫博物院。'
        }
      },
      {
        id: 'm8',
        year: 2011,
        era: '现代',
        title: '虚拟合璧',
        event: '两岸故宫博物院合作，在台北举办《富春山居图》特展，实现虚拟合璧。',
        location: {
          name: '台北故宫博物院',
          region: '台湾台北',
          x: 121.53,
          y: 25.03
        },
        virtualReunion: true,
        detail: {
          text: '2011年，在两岸文化交流的背景下，浙江博物馆将《剩山图》送往台北，与台北故宫博物院的《无用师卷》共同展出，实现了《富春山居图》的虚拟合璧，引起了广泛关注。'
        }
      }
    ],
    routes: [
      {
        from: 'm1',
        to: 'm2',
        style: 'main'
      },
      {
        from: 'm2',
        to: 'm3',
        style: 'main'
      },
      {
        from: 'm3',
        to: 'm4',
        style: 'branch-front'
      },
      {
        from: 'm3',
        to: 'm5',
        style: 'branch-back'
      },
      {
        from: 'm5',
        to: 'm6',
        style: 'branch-back'
      },
      {
        from: 'm6',
        to: 'm7',
        style: 'branch-back'
      },
      {
        from: 'm4',
        to: 'm8',
        style: 'branch-front'
      },
      {
        from: 'm7',
        to: 'm8',
        style: 'branch-back'
      }
    ]
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MOCK_DATA;
}
