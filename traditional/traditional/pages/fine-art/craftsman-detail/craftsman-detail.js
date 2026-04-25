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
        name: '周淑英',
        title: '剪纸大师',
        age: 68,
        experience: 50,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ff15baa4f2003e661554ac2535f803d0.jpg',
        info: '周淑英，河北蔚县人，国家级非物质文化遗产项目蔚县剪纸代表性传承人。18岁开始学习剪纸，师从当地名师，经过50余年的不断实践和创新，形成了自己独特的艺术风格。她的作品色彩艳丽，构图饱满，题材广泛，深受人们喜爱。',
        works: [
          {
            title: '百福图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c8e62c6d57e72828aa872deb459e9e79.jpg'
          },
          {
            title: '连年有余',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/8e640e8dc2d479b0d171c6544c2f376e.jpg'
          },
          {
            title: '花开富贵',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d08aa0a028f05f5ecdc82b6df1063950.jpg'
          },
          {
            title: '龙凤呈祥',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/b069e939b110994ea748895bf0cb830b.jpg'
          }
        ],
        story: '周淑英出生在河北蔚县一个剪纸世家，从小就受到家庭的熏陶，对剪纸艺术产生了浓厚的兴趣。18岁时，她正式拜当地剪纸名师为师，开始系统学习剪纸技艺。在学习过程中，她刻苦钻研，不断实践，很快就掌握了剪纸的基本技法。\n\n经过多年的努力，周淑英的剪纸技艺日益精湛，形成了自己独特的艺术风格。她的作品不仅继承了传统剪纸的精髓，还融入了现代元素，使其更具时代特色。她的剪纸作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目蔚县剪纸的代表性传承人，周淑英非常重视剪纸艺术的传承和发展。她收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，她还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍剪纸艺术，让这门传统工艺得以发扬光大。\n\n如今，虽然年事已高，但周淑英仍然坚持创作，她说："剪纸是我一生的事业，我要一直剪下去，直到拿不动剪刀为止。"她的这种对艺术的执着和热爱，值得我们每一个人学习。'
      },
      2: {
        id: 2,
        name: '姚建萍',
        title: '苏绣传人',
        age: 60,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/96d6af1cc7113c757d4e84a8890c8562.jpg',
        info: '姚建萍，江苏苏州人，国家级非物质文化遗产项目苏绣代表性传承人。20岁开始学习苏绣，师从苏绣大师，经过40余年的不懈努力，成为苏绣领域的佼佼者。她的作品精细雅洁，技艺精湛，多次被作为国礼赠送外宾。',
        works: [
          {
            title: '牡丹图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/982f2497eb4fd6f0772562bee742e8fd.jpg'
          },
          {
            title: '山水图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/8b677354db3c2900f5b804cfa83224cc.jpg'
          },
          {
            title: '人物肖像',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/a69f713f8548e80f79e1d37b39eb0ffb.jpg'
          },
          {
            title: '花鸟图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c0610409032aae68ec846001f5efb15e.jpg'
          }
        ],
        story: '姚建萍出生在苏州一个普通家庭，从小就对刺绣艺术产生了兴趣。20岁时，她正式拜苏绣大师为师，开始系统学习苏绣技艺。在学习过程中，她勤奋刻苦，精益求精，很快就掌握了苏绣的各种技法。\n\n经过多年的努力，姚建萍的苏绣技艺日益精湛，形成了自己独特的艺术风格。她的作品不仅继承了传统苏绣的精细雅洁，还融入了现代元素，使其更具时代特色。她的苏绣作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目苏绣的代表性传承人，姚建萍非常重视苏绣艺术的传承和发展。她收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，她还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍苏绣艺术，让这门传统工艺得以发扬光大。\n\n如今，姚建萍仍然坚持创作，她希望通过自己的努力，让苏绣这门传统工艺在新时代焕发出新的活力。'
      },
      3: {
        id: 3,
        name: '辜柳希',
        title: '木雕艺术家',
        age: 65,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/31da46ea0836eab40ccab5119092e3f8.jpg',
        info: '辜柳希，广东潮州人，国家级非物质文化遗产项目潮州木雕代表性传承人。25岁开始学习木雕，师从潮州木雕名师，经过40余年的不断实践和创新，成为潮州木雕领域的代表性人物。他的作品刀法细腻，题材丰富，深受收藏家和艺术爱好者的青睐。',
        works: [
          {
            title: '龙凤呈祥',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/5ba03b44b95ab6b6a4640fa9ac884c74.jpg'
          },
          {
            title: '花鸟图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d58f521abd62afe654fa91fb8cb2be9e.jpg'
          },
          {
            title: '人物故事',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/9f3d01e183a6d8d42137ddf424662969.jpg'
          },
          {
            title: '山水图',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/7fe11fc3ff9ede88cecd7f3e6a30d540.jpg'
          }
        ],
        story: '辜柳希出生在广东潮州一个木雕世家，从小就受到家庭的熏陶，对木雕艺术产生了浓厚的兴趣。25岁时，他正式拜潮州木雕名师为师，开始系统学习木雕技艺。在学习过程中，他刻苦钻研，不断实践，很快就掌握了木雕的各种技法。\n\n经过多年的努力，辜柳希的木雕技艺日益精湛，形成了自己独特的艺术风格。他的作品不仅继承了传统潮州木雕的多层镂空雕刻特色，还融入了现代元素，使其更具时代特色。他的木雕作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目潮州木雕的代表性传承人，辜柳希非常重视木雕艺术的传承和发展。他收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，他还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍木雕艺术，让这门传统工艺得以发扬光大。\n\n如今，辜柳希仍然坚持创作，他希望通过自己的努力，让潮州木雕这门传统工艺在新时代焕发出新的活力。'
      },
      4: {
        id: 4,
        name: '汪天稳',
        title: '皮影戏大师',
        age: 70,
        experience: 50,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/6b253560f18a45777f1ded5480fff4a7.jpg',
        info: '汪天稳，陕西华县人，国家级非物质文化遗产项目华县皮影代表性传承人。20岁开始学习皮影，师从华县皮影名师，经过50余年的不断实践和创新，成为皮影领域的佼佼者。他的作品雕刻精细，表演精湛，深受人们喜爱。',
        works: [
          {
            title: '大闹天宫',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/eb49b5229fa8a78e95985ede3c6b3d1d.jpg'
          },
          {
            title: '白蛇传',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/055f4cf0c7dd70062228c40319d9d720.jpg'
          },
          {
            title: '三国演义',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/0759d9d15a64ab591c619f21529be675.jpg'
          },
          {
            title: '水浒传',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/577a5eaee4578990edad6998f2dcd933.jpg'
          }
        ],
        story: '汪天稳出生在陕西华县一个皮影世家，从小就受到家庭的熏陶，对皮影艺术产生了浓厚的兴趣。20岁时，他正式拜华县皮影名师为师，开始系统学习皮影技艺。在学习过程中，他刻苦钻研，不断实践，很快就掌握了皮影的各种技法。\n\n经过多年的努力，汪天稳的皮影技艺日益精湛，形成了自己独特的艺术风格。他的作品不仅继承了传统皮影的精髓，还融入了现代元素，使其更具时代特色。他的皮影作品和表演多次在国内外展览和演出中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目华县皮影的代表性传承人，汪天稳非常重视皮影艺术的传承和发展。他收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，他还积极参与各种文化活动，通过展览、演出等形式，向更多的人介绍皮影艺术，让这门传统工艺得以发扬光大。\n\n如今，汪天稳仍然坚持创作和表演，他希望通过自己的努力，让华县皮影这门传统艺术在新时代焕发出新的活力。'
      },
      5: {
        id: 5,
        name: '郑益坤',
        title: '漆器艺术家',
        age: 75,
        experience: 55,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/571ead95b2749be3d609f6a2a29f3204.jpg',
        info: '郑益坤，福建福州人，国家级非物质文化遗产项目福州脱胎漆器代表性传承人。20岁开始学习漆器，师从福州脱胎漆器名师，经过55余年的不断实践和创新，成为漆器领域的佼佼者。他的作品质地轻巧，色彩鲜艳，深受收藏家和艺术爱好者的青睐。',
        works: [
          {
            title: '牡丹瓶',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/34d279e98f1a0844bb2cae524b739645.jpg'
          },
          {
            title: '山水盒',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ed85c7b6b215925d9446b73ef6704d95.jpg'
          },
          {
            title: '人物盘',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/6d7e85826c264e7ddf1d3256b1c559af.jpg'
          },
          {
            title: '花鸟盏',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/2dcead9b3ca8e39581e23eab806cb275.jpg'
          }
        ],
        story: '郑益坤出生在福建福州一个漆器世家，从小就受到家庭的熏陶，对漆器艺术产生了浓厚的兴趣。20岁时，他正式拜福州脱胎漆器名师为师，开始系统学习漆器技艺。在学习过程中，他刻苦钻研，不断实践，很快就掌握了漆器的各种技法。\n\n经过多年的努力，郑益坤的漆器技艺日益精湛，形成了自己独特的艺术风格。他的作品不仅继承了传统漆器的精髓，还融入了现代元素，使其更具时代特色。他的漆器作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目福州脱胎漆器的代表性传承人，郑益坤非常重视漆器艺术的传承和发展。他收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，他还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍漆器艺术，让这门传统工艺得以发扬光大。\n\n如今，虽然年事已高，但郑益坤仍然坚持创作，他希望通过自己的努力，让福州脱胎漆器这门传统工艺在新时代焕发出新的活力。'
      },
      6: {
        id: 6,
        name: '陈云华',
        title: '竹编艺术家',
        age: 62,
        experience: 40,
        avatar: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/89bbc2f0852b19608eb496e67f752875.jpg',
        info: '陈云华，四川人，国家级非物质文化遗产项目四川竹编代表性传承人。22岁开始学习竹编，师从四川竹编名师，经过40余年的不断实践和创新，成为竹编领域的佼佼者。他的作品精细编织，种类繁多，深受人们喜爱。',
        works: [
          {
            title: '竹编花瓶',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/9c16329f7e77ceb6ddf2fdabf56b9295.jpg'
          },
          {
            title: '竹编篮子',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/16e6a330b502c4306b83253857e89c29.jpg'
          },
          {
            title: '竹编灯罩',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ce87a3c2bf96d474ea9829f8ea226f87.jpg'
          },
          {
            title: '竹编画',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/a4321e088357981566531084f6d8f5f7.jpg'
          }
        ],
        story: '陈云华出生在四川一个竹编世家，从小就受到家庭的熏陶，对竹编艺术产生了浓厚的兴趣。22岁时，他正式拜四川竹编名师为师，开始系统学习竹编技艺。在学习过程中，他刻苦钻研，不断实践，很快就掌握了竹编的各种技法。\n\n经过多年的努力，陈云华的竹编技艺日益精湛，形成了自己独特的艺术风格。他的作品不仅继承了传统竹编的精髓，还融入了现代元素，使其更具时代特色。他的竹编作品多次在国内外展览中获奖，受到了广泛的认可和赞赏。\n\n作为国家级非物质文化遗产项目四川竹编的代表性传承人，陈云华非常重视竹编艺术的传承和发展。他收了许多徒弟，毫无保留地将自己的技艺传授给他们。同时，他还积极参与各种文化活动，通过展览、讲座等形式，向更多的人介绍竹编艺术，让这门传统工艺得以发扬光大。\n\n如今，陈云华仍然坚持创作，他希望通过自己的努力，让四川竹编这门传统工艺在新时代焕发出新的活力。'
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