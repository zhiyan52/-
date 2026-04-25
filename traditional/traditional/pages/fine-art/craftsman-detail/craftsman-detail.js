Page({
  data: {
    craftsman: {}
  },

  onLoad(options) {
    const { id } = options;
    this.loadCraftsmanDetail(id);
  },

  // 加载匠人详情
  loadCraftsmanDetail(id) {
    // 模拟数据，实际项目中可以从云数据库或API获取
    const craftsmanData = {
      1: {
        id: 1,
        name: '王老艺人',
        title: '剪纸大师',
        age: 78,
        experience: 60,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/craftsman1.png',
        info: '王老艺人，河北蔚县人，国家级非物质文化遗产项目蔚县剪纸代表性传承人。12岁开始学习剪纸，师从当地名师，经过60余年的不断实践和创新，形成了自己独特的艺术风格。他的作品色彩艳丽，构图饱满，题材广泛，深受人们喜爱。',
        works: [
          {
            title: '百福图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work1.png'
          },
          {
            title: '连年有余',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work2.png'
          },
          {
            title: '花开富贵',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work3.png'
          },
          {
            title: '龙凤呈祥',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work4.png'
          }
        ],
        story: '王老艺人出生在一个剪纸世家，从小就受到家庭的熏陶，对剪纸艺术产生了浓厚的兴趣。12岁时，他正式拜当地剪纸名师为师，开始系统学习剪纸技艺。在学习过程中，他刻苦钻研，不断实践，很快就掌握了剪纸的基本技法。\n\n经过多年的努力，王老艺人的剪纸技艺日益精湛，形成了自己独特的艺术风格。他的作品不仅继承了传统剪纸的精髓，还融入了现代元素，使其更具时代特色。他的剪纸作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目蔚县剪纸的代表性传承人，王老艺人非常重视剪纸艺术的传承和发展。他收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，他还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍剪纸艺术，让这门传统工艺得以发扬光大。\n\n如今，虽然年事已高，但王老艺人仍然坚持创作，他说："剪纸是我一生的事业，我要一直剪下去，直到拿不动剪刀为止。"他的这种对艺术的执着和热爱，值得我们每一个人学习。'
      },
      2: {
        id: 2,
        name: '张大师',
        title: '苏绣传人',
        age: 65,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/craftsman2.png',
        info: '张大师，苏州人，国家级非物质文化遗产项目苏绣代表性传承人。25岁开始学习苏绣，师从苏绣大师，经过40余年的不懈努力，成为苏绣领域的佼佼者。她的作品精细雅洁，技艺精湛，多次被作为国礼赠送外宾。',
        works: [
          {
            title: '牡丹图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work5.png'
          },
          {
            title: '山水图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work6.png'
          },
          {
            title: '人物肖像',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work7.png'
          },
          {
            title: '花鸟图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work8.png'
          }
        ],
        story: '张大师出生在苏州一个普通家庭，从小就对刺绣艺术产生了兴趣。25岁时，她正式拜苏绣大师为师，开始系统学习苏绣技艺。在学习过程中，她勤奋刻苦，精益求精，很快就掌握了苏绣的各种技法。\n\n经过多年的努力，张大师的苏绣技艺日益精湛，形成了自己独特的艺术风格。她的作品不仅继承了传统苏绣的精细雅洁，还融入了现代元素，使其更具时代特色。她的苏绣作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目苏绣的代表性传承人，张大师非常重视苏绣艺术的传承和发展。她收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，她还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍苏绣艺术，让这门传统工艺得以发扬光大。\n\n如今，虽然年事已高，但张大师仍然坚持创作，她希望通过自己的努力，让苏绣这门传统工艺在新时代焕发出新的活力。'
      },
      3: {
        id: 3,
        name: '李师傅',
        title: '木雕艺术家',
        age: 55,
        experience: 30,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/craftsman3.png',
        info: '李师傅，广东潮州人，国家级非物质文化遗产项目潮州木雕代表性传承人。25岁开始学习木雕，师从潮州木雕名师，经过30余年的不断实践和创新，成为潮州木雕领域的代表性人物。他的作品刀法细腻，题材丰富，深受收藏家和艺术爱好者的青睐。',
        works: [
          {
            title: '龙凤呈祥',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work9.png'
          },
          {
            title: '花鸟图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work10.png'
          },
          {
            title: '人物故事',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work11.png'
          },
          {
            title: '山水图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work12.png'
          }
        ],
        story: '李师傅出生在广东潮州一个木雕世家，从小就受到家庭的熏陶，对木雕艺术产生了浓厚的兴趣。25岁时，他正式拜潮州木雕名师为师，开始系统学习木雕技艺。在学习过程中，他刻苦钻研，不断实践，很快就掌握了木雕的各种技法。\n\n经过多年的努力，李师傅的木雕技艺日益精湛，形成了自己独特的艺术风格。他的作品不仅继承了传统潮州木雕的多层镂空雕刻特色，还融入了现代元素，使其更具时代特色。他的木雕作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目潮州木雕的代表性传承人，李师傅非常重视木雕艺术的传承和发展。他收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，他还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍木雕艺术，让这门传统工艺得以发扬光大。\n\n如今，李师傅仍然坚持创作，他希望通过自己的努力，让潮州木雕这门传统工艺在新时代焕发出新的活力。'
      }
    };
    
    const craftsman = craftsmanData[id] || {
      id: id,
      name: '匠人',
      title: '非遗传承人',
      age: 60,
      experience: 30,
      avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/craftsman-default.png',
      info: '这位匠人是国家级非物质文化遗产项目的代表性传承人，从事传统工艺多年，技艺精湛，作品深受人们喜爱。',
      works: [
        {
          title: '代表作品1',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work-default.png'
        },
        {
          title: '代表作品2',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work-default.png'
        },
        {
          title: '代表作品3',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work-default.png'
        },
        {
          title: '代表作品4',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/work-default.png'
        }
      ],
      story: '这位匠人从小就对传统工艺产生了浓厚的兴趣，经过多年的刻苦学习和实践，终于成为了这门工艺的代表性传承人。他的作品不仅继承了传统工艺的精髓，还融入了现代元素，使其更具时代特色。作为非物质文化遗产的传承人，他非常重视工艺的传承和发展，希望通过自己的努力，让这门传统工艺在新时代焕发出新的活力。'
    };
    
    this.setData({
      craftsman: craftsman
    });
    
    wx.setNavigationBarTitle({ title: craftsman.name });
  }
});