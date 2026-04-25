Page({
  data: {
    artwork: {},
    aiExplanation: '点击下方按钮生成AI讲解...'
  },

  onLoad(options) {
    const { id, category } = options;
    this.loadArtworkDetail(id, category);
  },

  // 加载作品详情
  loadArtworkDetail(id, category) {
    // 模拟数据，实际项目中可以从云数据库或API获取
    const artworkData = {
      1: {
        id: 1,
        title: '蔚县剪纸',
        category: '剪纸',
        craftsman: '周淑英',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c525d9d61dd465b5323d35873167ad30.jpg',
        history: '蔚县剪纸是河北省蔚县的传统民间艺术，起源于明代，至今已有500多年历史。它以刀刻为主，色彩艳丽，构图饱满，题材广泛，包括花卉、鸟兽、人物、戏曲故事等。蔚县剪纸在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '起稿',
            desc: '根据题材内容，用铅笔在纸上画出图案轮廓，要求线条流畅，构图合理。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/cf420fe5b33cb0acc15d944d9a667b93.jpg'
          },
          {
            step: '剪刻',
            desc: '将画好的图案放在宣纸上，用刻刀或剪刀进行剪刻，要求刀法熟练，线条细腻。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ebf4ae521d7adfab45befadb34e2257b.jpg'
          },
          {
            step: '染色',
            desc: '将剪刻好的作品放在染色盘上，用毛笔蘸取颜料进行染色，要求色彩鲜艳，层次分明。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d6fbc80461a88a1ea56a5979d48c1373.jpg'
          },
          {
            step: '装裱',
            desc: '将染色完成的作品进行装裱，使其更加美观，便于保存和展示。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/56b5dfc1f31f2a4801f9c331bbf36956.jpg'
          }
        ],
        value: '蔚县剪纸具有重要的文化价值，它不仅是一种民间艺术形式，更是中华民族优秀传统文化的重要组成部分。它反映了劳动人民的生活情趣和审美观念，具有浓郁的地方特色和民族风格。目前，蔚县剪纸正面临着传承和发展的挑战，需要更多的人关注和保护。'
      },
      2: {
        id: 2,
        title: '陕北剪纸',
        category: '剪纸',
        craftsman: '高凤莲',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/29bf6c878134e1137232a919e04294af.jpg',
        history: '陕北剪纸是陕西北部地区的民间剪纸艺术，历史悠久，风格粗犷豪放，题材多为生活场景和吉祥图案。陕北剪纸在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '起稿',
            desc: '用铅笔在红纸上画出图案轮廓，陕北剪纸多为对称图案，因此常采用折叠剪纸的方法。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/cf420fe5b33cb0acc15d944d9a667b93.jpg'
          },
          {
            step: '折叠',
            desc: '将画好的纸按照对称轴线折叠，这样可以一次剪出多个相同的图案。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ebf4ae521d7adfab45befadb34e2257b.jpg'
          },
          {
            step: '剪刻',
            desc: '用剪刀沿着图案轮廓进行剪刻，陕北剪纸的特点是线条粗犷，富有动感。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d6fbc80461a88a1ea56a5979d48c1373.jpg'
          },
          {
            step: '展开',
            desc: '将剪刻好的作品小心展开，整理平整，一件陕北剪纸作品就完成了。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/56b5dfc1f31f2a4801f9c331bbf36956.jpg'
          }
        ],
        value: '陕北剪纸是陕北地区劳动人民智慧的结晶，它不仅是一种民间艺术形式，更是陕北文化的重要组成部分。它反映了陕北人民的生活状况和审美情趣，具有浓郁的地方特色和民族风格。'
      },
      3: {
        id: 3,
        title: '南方剪纸',
        category: '剪纸',
        craftsman: '林桃',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/0a186df0dd145e1330a65787444f31fb.jpg',
        history: '南方剪纸是江南地区的剪纸艺术，风格细腻精致，题材多为花鸟鱼虫和神话故事。南方剪纸历史悠久，在宋代就已经相当成熟，是中国剪纸的重要流派之一。',
        process: [
          {
            step: '设计',
            desc: '根据题材内容，设计精细的剪纸图案，南方剪纸注重细节，图案复杂多样。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/cf420fe5b33cb0acc15d944d9a667b93.jpg'
          },
          {
            step: '剪刻',
            desc: '用刻刀在宣纸上进行精细的剪刻，要求刀法熟练，线条流畅。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/ebf4ae521d7adfab45befadb34e2257b.jpg'
          },
          {
            step: '染色',
            desc: '根据需要，对剪刻好的作品进行染色，南方剪纸色彩丰富，层次分明。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d6fbc80461a88a1ea56a5979d48c1373.jpg'
          },
          {
            step: '装裱',
            desc: '将完成的作品进行装裱，使其更加美观，便于保存和展示。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/56b5dfc1f31f2a4801f9c331bbf36956.jpg'
          }
        ],
        value: '南方剪纸是江南文化的重要组成部分，它不仅是一种民间艺术形式，更是中华民族优秀传统文化的瑰宝。它反映了江南人民的生活情趣和审美观念，具有浓郁的地方特色和民族风格。'
      },
      4: {
        id: 4,
        title: '苏绣',
        category: '刺绣',
        craftsman: '姚建萍',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/a31b987887d2953e0863564c497cb142.jpg',
        history: '苏绣是苏州地区的传统刺绣工艺，起源于三国时期，至今已有1700多年历史。它以精细、雅洁著称，被誉为"东方明珠"。苏绣在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '设计',
            desc: '根据题材内容，设计刺绣图案，要求构图合理，色彩协调。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/0dbf2b6ea1c5ab0cbc72dee8fbf6cd59.jpg'
          },
          {
            step: '配线',
            desc: '根据设计图案，选择合适的丝线，要求色彩鲜艳，质地优良。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c94f668ed5f9200851cf2f3677507646.jpg'
          },
          {
            step: '刺绣',
            desc: '用针将丝线在绣料上穿刺，以缝迹构成花纹，要求针法熟练，线条细腻。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/46c9a7b852e9078067c18a73c34461db.jpg'
          },
          {
            step: '装裱',
            desc: '将刺绣完成的作品进行装裱，使其更加美观，便于保存和展示。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/a52da47077d2fa10d4d14d3c2db1d6fa.jpg'
          }
        ],
        value: '苏绣具有重要的文化价值，它不仅是一种传统工艺，更是中华民族优秀传统文化的重要组成部分。它反映了劳动人民的智慧和创造力，具有浓郁的地方特色和民族风格。目前，苏绣正面临着传承和发展的挑战，需要更多的人关注和保护。'
      },
      5: {
        id: 5,
        title: '湘绣',
        category: '刺绣',
        craftsman: '刘爱云',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/57394ba6453f6bcae0a4215c9964fd78.jpg',
        history: '湘绣是湖南地区的传统刺绣工艺，起源于汉代，至今已有2000多年历史。它以写实风格为主，擅长表现山水、人物等题材，被誉为"绣花能生香，绣鸟能听声，绣虎能奔跑，绣人能传神"。湘绣在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '设计',
            desc: '根据题材内容，设计刺绣图案，湘绣注重写实，图案生动逼真。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/0dbf2b6ea1c5ab0cbc72dee8fbf6cd59.jpg'
          },
          {
            step: '配线',
            desc: '根据设计图案，选择合适的丝线，湘绣色彩丰富，层次分明。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c94f668ed5f9200851cf2f3677507646.jpg'
          },
          {
            step: '刺绣',
            desc: '用针将丝线在绣料上穿刺，以缝迹构成花纹，湘绣针法多样，表现力强。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/46c9a7b852e9078067c18a73c34461db.jpg'
          },
          {
            step: '装裱',
            desc: '将刺绣完成的作品进行装裱，使其更加美观，便于保存和展示。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/a52da47077d2fa10d4d14d3c2db1d6fa.jpg'
          }
        ],
        value: '湘绣是湖南文化的重要组成部分，它不仅是一种传统工艺，更是中华民族优秀传统文化的瑰宝。它反映了湖南人民的智慧和创造力，具有浓郁的地方特色和民族风格。'
      },
      6: {
        id: 6,
        title: '华县皮影',
        category: '皮影戏',
        craftsman: '汪天稳',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/f8c5ae89bc9a3d66c1c36b9a078a2d78.jpg',
        history: '华县皮影是陕西华县的传统皮影戏，起源于汉代，至今已有2000多年历史。它以牛皮为原料，雕刻精细，表演精湛，是中国皮影戏的重要代表。华县皮影在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '选皮',
            desc: '选择优质牛皮，经过浸泡、刮削、晾晒等处理，使其变得透明、坚韧。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/6fe9e72290a5190180aa755ff5162931.jpg'
          },
          {
            step: '雕刻',
            desc: '用刻刀在处理好的牛皮上雕刻出人物、动物等形象，要求刀法熟练，线条流畅。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/fad6779dea1becb2f482dec435412fc7.jpg'
          },
          {
            step: '上色',
            desc: '用颜料为雕刻好的皮影上色，要求色彩鲜艳，层次分明。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/11adb2355d6b4b4a2ef13a536c2b1fec.jpg'
          },
          {
            step: '装订',
            desc: '将雕刻、上色完成的皮影进行装订，装上操纵杆，使其可以灵活操作。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/eb9d21ebd2506d5463fa740b2f032a17.jpg'
          }
        ],
        value: '华县皮影是中国皮影戏的重要代表，它不仅是一种传统艺术形式，更是中华民族优秀传统文化的瑰宝。它反映了劳动人民的智慧和创造力，具有浓郁的地方特色和民族风格。'
      },
      7: {
        id: 7,
        title: '潮州木雕',
        category: '木雕',
        craftsman: '辜柳希',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/2e2b96a1b27239c6d5b89d6d382ff5ba.jpg',
        history: '潮州木雕是广东潮州的传统木雕工艺，起源于唐代，至今已有1000多年历史。它以多层镂空雕刻为特色，刀法细腻，题材丰富，是中国木雕的重要流派之一。潮州木雕在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '选料',
            desc: '选择优质木材，如香樟木、酸枝木等，要求材质坚硬，纹理美观。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/14e3f43bc3314934f77e136393dea305.jpg'
          },
          {
            step: '设计',
            desc: '根据题材内容，设计木雕图案，潮州木雕注重多层镂空，立体感强。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/21ef1b31a275be8c5765f512c071163d.jpg'
          },
          {
            step: '雕刻',
            desc: '用雕刻工具在木材上进行雕刻，要求刀法熟练，线条流畅。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d0914850b14d6a9173b65440939d58f1.jpg'
          },
          {
            step: '打磨',
            desc: '将雕刻完成的作品进行打磨，使其表面光滑，然后上漆，使其更加美观。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d453fbf1e1325b19a022a7169547074b.jpg'
          }
        ],
        value: '潮州木雕是广东文化的重要组成部分，它不仅是一种传统工艺，更是中华民族优秀传统文化的瑰宝。它反映了潮州人民的智慧和创造力，具有浓郁的地方特色和民族风格。'
      },
      8: {
        id: 8,
        title: '东阳木雕',
        category: '木雕',
        craftsman: '冯文土',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/88da3c7f790e7824336a36093c728238.jpg',
        history: '东阳木雕是浙江东阳的传统木雕工艺，起源于唐代，至今已有1000多年历史。它以平面浮雕为主，刀法流畅，题材广泛，是中国木雕的重要流派之一。东阳木雕在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '选料',
            desc: '选择优质木材，如香樟木、酸枝木等，要求材质坚硬，纹理美观。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/14e3f43bc3314934f77e136393dea305.jpg'
          },
          {
            step: '设计',
            desc: '根据题材内容，设计木雕图案，潮州木雕注重多层镂空，立体感强。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/21ef1b31a275be8c5765f512c071163d.jpg'
          },
          {
            step: '雕刻',
            desc: '用雕刻工具在木材上进行雕刻，要求刀法熟练，线条流畅。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d0914850b14d6a9173b65440939d58f1.jpg'
          },
          {
            step: '打磨',
            desc: '将雕刻完成的作品进行打磨，使其表面光滑，然后上漆，使其更加美观。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/d453fbf1e1325b19a022a7169547074b.jpg'
          }
        ],
        value: '东阳木雕是浙江文化的重要组成部分，它不仅是一种传统工艺，更是中华民族优秀传统文化的瑰宝。它反映了东阳人民的智慧和创造力，具有浓郁的地方特色和民族风格。'
      },
      9: {
        id: 9,
        title: '福州脱胎漆器',
        category: '漆器',
        craftsman: '郑益坤',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c6ea64046e0c8369e6171a5f9c267e56.jpg',
        history: '福州脱胎漆器是福建福州的传统漆器工艺，起源于清代，至今已有300多年历史。它以脱胎技法为特色，质地轻巧，色彩鲜艳，是中国漆器的重要流派之一。福州脱胎漆器在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '制胎',
            desc: '用泥土、石膏等制作胎模，然后在胎模上糊上麻布，反复涂刷生漆，待干燥后脱去胎模，形成漆器的胎体。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/c24c96d1a70b674a9d33255cbf4924b1.jpg'
          },
          {
            step: '髹漆',
            desc: '在胎体上反复涂刷生漆，要求漆膜均匀，光滑平整。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/2312da0bc295198fc0a2e73a640f1c65.jpg'
          },
          {
            step: '装饰',
            desc: '在漆器表面进行装饰，如彩绘、镶嵌、雕填等，要求工艺精湛，图案美观。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/5f19e86ec6ccab394d4ddfa12f4729ff.jpg'
          },
          {
            step: '打磨',
            desc: '将装饰完成的漆器进行打磨，使其表面光滑，光泽度高。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/73094b1b80bfb94fdd0e5ba1d344a88c.jpg'
          }
        ],
        value: '福州脱胎漆器是福建文化的重要组成部分，它不仅是一种传统工艺，更是中华民族优秀传统文化的瑰宝。它反映了福州人民的智慧和创造力，具有浓郁的地方特色和民族风格。'
      },
      10: {
        id: 10,
        title: '四川竹编',
        category: '竹编',
        craftsman: '陈云华',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/65c7441a7d1882dfbd31176bcd222c93.jpg',
        history: '四川竹编是四川地区的传统竹编工艺，起源于汉代，至今已有2000多年历史。它以精细编织为特色，产品种类繁多，实用性强，是中国竹编的重要流派之一。四川竹编在2008年被列入第二批国家级非物质文化遗产名录。',
        process: [
          {
            step: '选竹',
            desc: '选择优质竹子，如慈竹、斑竹等，要求竹材坚韧，纤维细腻。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/968d6438659dc014f81618ebb38b698e.jpg'
          },
          {
            step: '破竹',
            desc: '将竹子破成竹条，然后进行刮削、晾晒等处理，使其变得柔软、坚韧。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/50fb99db1e5eeb7e9c7ba3616ddfa4a3.jpg'
          },
          {
            step: '编织',
            desc: '用处理好的竹条进行编织，根据不同的产品要求，采用不同的编织方法。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/2cf4d0664163186b03c78afdd7e2fac6.jpg'
          },
          {
            step: '整理',
            desc: '将编织完成的作品进行整理，使其更加美观，实用。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/feiyi/adf3da0f9120dd2fee23abec9ddf7ea6.jpg'
          }
        ],
        value: '四川竹编是四川文化的重要组成部分，它不仅是一种传统工艺，更是中华民族优秀传统文化的瑰宝。它反映了四川人民的智慧和创造力，具有浓郁的地方特色和民族风格。'
      }
    };
    
    const artwork = artworkData[id] || {
      id: id,
      title: '非遗作品',
      category: category,
      craftsman: '未知',
      era: '现代',
      image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/default.png',
      history: '该非遗作品历史悠久，是中华民族优秀传统文化的重要组成部分。',
      process: [
        {
          step: '准备材料',
          desc: '选择合适的材料，为制作做准备。',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process1.png'
        },
        {
          step: '制作过程',
          desc: '按照传统工艺进行制作，要求技艺精湛。',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process2.png'
        },
        {
          step: '完成作品',
          desc: '对制作完成的作品进行整理和修饰，使其更加完美。',
          image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process3.png'
        }
      ],
      value: '该非遗作品具有重要的文化价值，反映了劳动人民的智慧和创造力，具有浓郁的地方特色和民族风格。'
    };
    
    this.setData({
      artwork: artwork
    });
    
    wx.setNavigationBarTitle({ title: artwork.title });
  },

  // 生成AI讲解
  generateAIExplanation() {
    wx.showLoading({ title: 'AI生成中...' });
    
    // 模拟AI生成过程
    setTimeout(() => {
      const explanations = [
        '这是一件精美的传统工艺品，展现了中国传统工艺的独特魅力。它不仅是一件艺术品，更是中华民族优秀传统文化的重要载体。通过这件作品，我们可以感受到劳动人民的智慧和创造力，以及他们对美好生活的向往。',
        '这件非遗作品历史悠久，工艺精湛，体现了中国传统工艺的精髓。它不仅具有实用价值，更是一种文化符号，承载着丰富的历史文化信息。保护和传承这些传统工艺，对于弘扬中华民族优秀传统文化具有重要意义。',
        '这件作品展现了传统工艺的独特魅力，每一个细节都体现了匠人的匠心独运。它不仅是一件艺术品，更是中华民族文化自信的体现。通过欣赏这样的作品，我们可以更好地了解和传承中华民族优秀传统文化。'
      ];
      
      const randomExplanation = explanations[Math.floor(Math.random() * explanations.length)];
      
      this.setData({
        aiExplanation: randomExplanation
      });
      
      wx.hideLoading();
      wx.showToast({ title: 'AI讲解生成成功', icon: 'success' });
    }, 1500);
  },

  // 分享到微信好友
  shareToWechat() {
    wx.showToast({ title: '分享到微信好友', icon: 'success' });
    // 实际项目中可以使用wx.shareAppMessage
  },

  // 分享到朋友圈
  shareToMoments() {
    wx.showToast({ title: '分享到朋友圈', icon: 'success' });
    // 实际项目中可以使用wx.showShareMenu
  }
});