// traditional/traditional/pages/timeMachine/timeMachine.js
Page({
  data: {
    step: 'select',
    isLoading: false,
    loadingText: '',

    heritageList: [],
    currentHeritage: null,

    currentEra: '',
    currentEraIndex: 0,
    eras: [],
    unlockedEras: [0],

    currentScene: null,
    currentDecision: 0,
    totalDecisions: 3,
    selectedOptionId: null,

    result: null,
    hasMoreContent: true,

    isTimeTraveling: false,
    targetEra: '',

    sourceText: {
      cache: '来自历史路径缓存',
      local: '来自非遗知识库',
      ai: 'AI实时生成'
    },

    wenxinPanelOpen: false,
    wenxinInput: '',
    wenxinMessages: [],
    suggestionQuestions: [
      '什么是剪纸？',
      '剪纸的起源？',
      '如何传承非遗？',
      '非遗的价值？'
    ]
  },

  onLoad(options) {
    this.loadHeritageList();
  },

  loadHeritageList() {
    const heritageList = [
      {
        _id: '1',
        name: '剪纸',
        icon: '剪',
        color: '#D4A017',
        brief: '千年历史的镂空艺术',
        eras: [
          { name: '汉代', year: '公元前206年-公元220年', features: ['雏形时期', '纸张发明'] },
          { name: '唐代', year: '618年-907年', features: ['剪纸普及', '民间流行'] },
          { name: '宋代', year: '960年-1279年', features: ['技艺成熟', '商业化开始'] },
          { name: '明清', year: '1368年-1912年', features: ['鼎盛时期', '题材丰富'] }
        ]
      },
      {
        _id: '2',
        name: '景泰蓝',
        icon: '蓝',
        color: '#1A365D',
        brief: '皇室御用的金属工艺',
        eras: [
          { name: '元代', year: '1271年-1368年', features: ['传入中国', '初始发展'] },
          { name: '明代', year: '1368年-1644年', features: ['工艺成熟', '皇家青睐'] },
          { name: '清代', year: '1644年-1912年', features: ['巅峰时期', '造型精美'] },
          { name: '现代', year: '1949年至今', features: ['创新发展', '走向世界'] }
        ]
      },
      {
        _id: '3',
        name: '苏绣',
        icon: '绣',
        color: '#2C5282',
        brief: '针尖上的江南韵味',
        eras: [
          { name: '宋代', year: '960年-1279年', features: ['起源发展', '技艺初成'] },
          { name: '明代', year: '1368年-1644年', features: ['独领风骚', '图案精美'] },
          { name: '清代', year: '1644年-1912年', features: ['全盛时期', '名匠辈出'] },
          { name: '当代', year: '1949年至今', features: ['创新传承', '走向国际'] }
        ]
      }
    ];

    this.setData({ heritageList });
  },

  onSelectHeritage(e) {
    const id = e.currentTarget.dataset.id;
    const heritage = this.data.heritageList.find(h => h._id === id);

    if (heritage) {
      this.setData({
        currentHeritage: heritage,
        step: 'timeline',
        unlockedEras: [0],
        choiceHistory: []
      });
    }
  },

  onSelectEra(e) {
    const { era, index } = e.currentTarget.dataset;

    if (!this.data.unlockedEras.includes(index)) {
      wx.showToast({
        title: '请先解锁该时代',
        icon: 'none'
      });
      return;
    }

    this.setData({
      currentEra: era.name,
      currentEraIndex: index,
      targetEra: era.name,
      isTimeTraveling: true
    });

    setTimeout(() => {
      this.setData({ isTimeTraveling: false });
      this.loadScene(era.name, 0);
    }, 2000);
  },

  loadScene(eraName, decisionIndex) {
    const scenes = this.getLocalScene(this.data.currentHeritage.name, eraName, decisionIndex);

    this.setData({
      currentScene: scenes,
      currentDecision: decisionIndex,
      step: 'scene',
      selectedOptionId: null
    });
  },

  getLocalScene(heritageName, eraName, decisionIndex) {
    const sceneTemplates = {
      '剪纸': {
        '汉代': {
          role: '宫廷匠人',
          description: `你回到了${eraName}时期，这是一个纸张刚刚发明不久的时代。你在宫廷的织室里工作，看到匠人们正在用剪刀在纸上剪刻各种图案，用于装饰和祭祀。远处传来编钟的声音，宫女们正忙着准备祭祀用品。`,
          question: '面对这种新型装饰艺术，你会如何选择？',
          options: [
            {
              id: '1',
              icon: '📜',
              title: '坚持传统纹样',
              description: '继承古老的祭祀纹样，保持神圣性',
              narrative: '你选择了保留传统的祭祀纹样，每天在昏暗的油灯下，仔细临摹古老的青铜纹样，将它们转化为剪纸图案。你的作品在宫廷祭祀中发挥着重要作用，皇帝对其赞不绝口，为后世留下了珍贵的艺术范式。',
              consequence: '传统纹样得以保留，成为后世剪纸的重要源头，但由于过于庄重，在民间传播受限。',
              reference: '1959年新疆吐鲁番阿斯塔那古墓群出土的剪纸团花残片，证实了汉代剪纸主要用于祭祀场合。',
              insight: '传统与创新需要平衡，保护核心元素的同时也要考虑传播性。'
            },
            {
              id: '2',
              icon: '✂️',
              title: '创新图案设计',
              description: '结合民间故事，创造新题材',
              narrative: '你开始尝试将民间传说中的故事情节融入剪纸创作，将牛郎织女、嫦娥奔月等故事剪成一幅幅生动的画面。这些作品很快在宫廷中流传开来，甚至传到了民间，创造出了第一批叙事性剪纸作品。',
              consequence: '剪纸开始走向民间，题材更加丰富多样，但也引起了一些保守派的质疑。',
              reference: '宋代《东京梦华录》记载了民间剪纸的流行，说明在此之前剪纸已经从宫廷走向民间。',
              insight: '创新是文化发展的动力，但需要时间沉淀。'
            }
          ]
        },
        '唐代': {
          role: '民间艺人',
          description: `你来到了${eraName}，剪纸艺术已经普及到民间。春节期间，长安街头张灯结彩，家家户户都在贴窗花。你在西市摆了一个小摊子，专门卖剪纸作品。`,
          question: '随着剪纸的普及，你会如何发展这门手艺？',
          options: [
            {
              id: '1',
              icon: '🏠',
              title: '专注民俗需求',
              description: '为百姓制作节庆窗花',
              narrative: '你专注于满足民间的节庆需求，创作了大量喜庆吉祥的窗花图案，如福字、鱼跃龙门、喜鹊登枝等。每到年关，你的摊子前总是排满了人，孩子们围着你的摊子看你剪纸，老人们对你的技艺赞不绝口。',
              consequence: '剪纸成为民间不可或缺的艺术形式，你的名字在长安城中传开了。',
              reference: '唐代诗人李商隐在《人日即事》中写道：「镂金作胜传荆俗，剪彩为人起晋风」，描述了当时剪纸的流行。',
              insight: '贴近生活的艺术才有持久生命力。'
            },
            {
              id: '2',
              icon: '🎭',
              title: '开发表演用途',
              description: '创作皮影戏道具',
              narrative: '你将剪纸技艺与皮影戏结合，创作出了精美的皮影造型。你与皮影戏班合作，为他们制作各种人物和场景的皮影。每当夜幕降临，戏班里的灯光亮起，你的剪纸作品在幕布上活灵活现，赢得了观众的阵阵喝彩。',
              consequence: '剪纸技艺得到延伸，拓展了应用领域，你也成为了皮影戏班的重要合作伙伴。',
              reference: '宋代《东京梦华录》记载了皮影戏的繁荣景象，说明唐代已经有了皮影戏的雏形。',
              insight: '跨界融合能创造新的艺术生命。'
            }
          ]
        },
        '宋代': {
          role: '商铺老板',
          description: `你来到了${eraName}，这是商业繁荣的时代。你在杭州的清河坊开了一家剪纸店铺，剪纸已经可以作为商品出售了。你的店铺生意兴隆，经常有达官贵人前来光顾。`,
          question: '面对商业化的浪潮，你会如何应对？',
          options: [
            {
              id: '1',
              icon: '💰',
              title: '批量生产销售',
              description: '开设作坊，降低成本',
              narrative: '你开设了剪纸作坊，雇佣了十几名工人，采用分工合作的方式批量生产剪纸作品。你设计图案，工人们负责剪刻，大大提高了生产效率，降低了成本。你的作品价格亲民，很快走进了千家万户。',
              consequence: '剪纸进入千家万户，但由于批量生产，作品逐渐同质化，一些人开始批评你的作品缺乏艺术性。',
              reference: '宋代手工业发达，出现了大量前店后厂的模式，《清明上河图》中就描绘了许多手工业店铺。',
              insight: '商业化可以让艺术更普及，但也可能稀释艺术性。'
            },
            {
              id: '2',
              icon: '👑',
              title: '追求高端定制',
              description: '专为贵族定制精品',
              narrative: '你坚持手工精制，为贵族阶层提供定制服务。你研究各种复杂的剪纸技法，如阴刻、阳刻、套色等，每件作品都独一无二。你的店铺成为了贵族们争相光顾的地方，甚至有官员将你的作品作为贡品献给皇帝。',
              consequence: '你的作品成为身份象征，价格昂贵，普通百姓难以问津，逐渐脱离了民间基础。',
              reference: '宋代贵族墓葬中出土了大量精美的剪纸冥器，制作工艺精湛，说明当时已经有了高端剪纸作品。',
              insight: '艺术价值与商业价值需要找到平衡点。'
            }
          ]
        },
        '明清': {
          role: '非遗传承人',
          description: `你来到了${eraName}，这是剪纸艺术的鼎盛时期。各地形成了独特的剪纸风格，如河北蔚县剪纸、江苏扬州剪纸、福建漳浦剪纸等。你是一位著名的剪纸艺人，经常被邀请到各地交流技艺。`,
          question: '面对多样化的剪纸风格，你会如何传承？',
          options: [
            {
              id: '1',
              icon: '📚',
              title: '整理记录技法',
              description: '将各地技法编撰成册',
              narrative: '你开始系统地整理各地剪纸技法，走访了全国十几个剪纸流派，记录了各种技法的详细步骤。经过十年的努力，你编撰了第一部剪纸技艺手册《剪纸谱》，详细介绍了各种剪纸技法和图案。',
              consequence: '剪纸技艺有了系统的传承依据，后人可以通过你的书籍学习剪纸技艺。',
              reference: '明清时期出现了大量民间艺术专著，如《考工记》等，为传统工艺的传承提供了重要资料。',
              insight: '文字记录是文化传承的重要方式。'
            },
            {
              id: '2',
              icon: '🎓',
              title: '开馆授徒',
              description: '广收弟子，传承技艺',
              narrative: '你在苏州开设了剪纸馆，广收弟子，无论贫富贵贱，只要有兴趣都可以来学习。你将自己的技艺毫无保留地传授给弟子们，并且鼓励他们创新。你的弟子遍布各地，成为了各地剪纸的骨干力量。',
              consequence: '剪纸技艺得到广泛传播，弟子遍布各地，形成了新的剪纸流派。',
              reference: '清末民初涌现出许多著名的剪纸艺人，如张万国、王秀兰等，他们的技艺都是通过师徒传承的方式保留下来的。',
              insight: '人的传承是文化延续的根本。'
            }
          ]
        }
      },
      '景泰蓝': {
        '元代': {
          role: '工匠',
          description: `你来到了${eraName}，景泰蓝工艺刚刚传入中国。你在大都的官营作坊里工作，看到来自波斯的工匠正在教授一种新的工艺——在铜胎上掐丝，然后填充珐琅釉料。`,
          question: '面对这种外来工艺，你会如何学习？',
          options: [
            {
              id: '1',
              icon: '🔥',
              title: '研究烧制技术',
              description: '学习铜胎掐丝技术',
              narrative: '你专注于研究铜胎的制作工艺和掐丝技术，每天观察波斯工匠的操作，记录每一个步骤。你发现铜胎的厚度和掐丝的密度对成品质量有很大影响，于是反复试验，终于掌握了精湛的掐丝技术。',
              consequence: '中国化的铜胎制作技艺逐渐成熟，为后世景泰蓝的发展奠定了基础。',
              reference: '元代墓葬中出土了带有明显外来风格的金属器物，如掐丝珐琅杯、碗等，说明当时已经开始学习和吸收外来工艺。',
              insight: '技术的掌握是工艺传承的基础。'
            },
            {
              id: '2',
              icon: '🎨',
              title: '融合本土审美',
              description: '结合中国传统纹样',
              narrative: '你开始尝试将中国传统纹样融入景泰蓝设计，将波斯的几何图案与中国的云纹、龙纹相结合。你设计的作品既有外来工艺的精致，又有中国传统的韵味，受到了宫廷的喜爱。',
              consequence: '景泰蓝开始具有中国特色，逐渐从外来工艺转变为中国传统工艺。',
              reference: '元代宫廷开始使用带有中国纹样的珐琅器物，如掐丝珐琅龙纹碗等。',
              insight: '本土化是外来艺术生存发展的必由之路。'
            }
          ]
        },
        '明代': {
          role: '宫廷匠人',
          description: `你来到了${eraName}，景泰蓝已经成为皇家御用工艺。你在御用监工作，负责为宫廷制作景泰蓝器物。景泰年间，皇帝对景泰蓝特别喜爱，经常亲自过问制作情况。`,
          question: '在皇室的支持下，你会如何发展？',
          options: [
            {
              id: '1',
              icon: '👑',
              title: '追求极致工艺',
              description: '精益求精，制作精品',
              narrative: '你在皇室支持下，专注于提升工艺水平，选用最好的材料，雇佣最优秀的工匠。你设计了许多新的图案，如缠枝莲纹、八宝纹等，制作出了登峰造极的作品。皇帝对这些作品赞不绝口，将它们作为国礼送给外国使节。',
              consequence: '明代景泰蓝工艺达到历史巅峰，成为中国传统工艺的代表之一。',
              reference: '「景泰蓝」名称即来源于明景泰年间，这一时期的景泰蓝工艺达到了前所未有的高度。',
              insight: '顶级支持可以造就顶级艺术。'
            },
            {
              id: '2',
              icon: '📖',
              title: '总结工艺规范',
              description: '制定行业标准',
              narrative: '你开始总结景泰蓝制作的各项规范，从铜胎制作到掐丝、点蓝、烧制、磨光，每一个步骤都制定了详细的标准。你编写了《珐琅作则》，成为景泰蓝制作的权威指南。',
              consequence: '景泰蓝工艺有了可传承的技术标准，为后世的发展提供了重要参考。',
              reference: '明代留下了大量关于珐琅制作的文献记载，如《天工开物》中就有关于珐琅制作的描述。',
              insight: '标准化是工艺传承的重要保障。'
            }
          ]
        },
        '清代': {
          role: '民间艺人',
          description: `你来到了${eraName}，景泰蓝工艺从宫廷走向民间。你在京城开了一家景泰蓝作坊，为民间制作各种景泰蓝器物。随着对外贸易的发展，你的作品开始出口到欧洲。`,
          question: '面对民间市场的需求，你会如何调整？',
          options: [
            {
              id: '1',
              icon: '🏠',
              title: '开发民用产品',
              description: '制作小型实用器物',
              narrative: '你开始制作鼻烟壶、首饰、茶具等小型实用器物，让景泰蓝走入寻常百姓家。你设计了许多适合民间使用的图案，如吉祥如意、福寿双全等，价格也更加亲民。',
              consequence: '景泰蓝在民间获得新的生命，成为百姓喜爱的工艺品。',
              reference: '清代出现了大量精美的珐琅鼻烟壶，成为当时社会的时尚物品。',
              insight: '艺术的生命力在于走进生活。'
            },
            {
              id: '2',
              icon: '🌍',
              title: '开拓对外贸易',
              description: '出口海外市场',
              narrative: '你开始将景泰蓝作品出口到欧洲，根据欧洲人的审美偏好调整设计。你的作品在欧洲引起了轰动，成为贵族们争相收藏的珍品。你还在广州设立了分厂，专门生产外销景泰蓝。',
              consequence: '中国工艺品在国际上获得极高声誉，景泰蓝成为东西方文化交流的重要媒介。',
              reference: '清代广州一口通商，大量珐琅器物出口海外，在欧洲掀起了「中国风」热潮。',
              insight: '文化交流让艺术更具价值。'
            }
          ]
        },
        '现代': {
          role: '非遗传承人',
          description: `你来到了${eraName}，景泰蓝面临传承与发展的挑战。随着现代工业的发展，传统工艺受到了冲击，许多年轻人不愿意学习这门复杂的技艺。你是一位著名的景泰蓝大师，感到责任重大。`,
          question: '在现代社会，你会如何传承这门手艺？',
          options: [
            {
              id: '1',
              icon: '🏫',
              title: '学校教育传承',
              description: '将技艺引入职业院校',
              narrative: '你推动景泰蓝技艺进入职业院校教育体系，编写了详细的教材，在多所职业院校开设了景泰蓝专业。你亲自授课，培养了一批专业人才，为景泰蓝的传承注入了新的活力。',
              consequence: '景泰蓝有了系统的教育传承体系，年轻一代开始了解和学习这门技艺。',
              reference: '2006年景泰蓝技艺被列入国家级非物质文化遗产，许多职业院校开始开设相关专业。',
              insight: '教育是文化传承的根本途径。'
            },
            {
              id: '2',
              icon: '🎨',
              title: '创新设计理念',
              description: '融合现代审美',
              narrative: '你尝试将现代设计理念融入传统景泰蓝，与现代设计师合作，创造出符合当代审美的作品。你设计的景泰蓝首饰、家居用品等受到了年轻人的喜爱，在国际设计展上获得了奖项。',
              consequence: '景泰蓝在现代设计中焕发新生，吸引了更多人的关注。',
              reference: '当代设计师将景泰蓝应用于珠宝、家居等领域，如知名品牌卡地亚就曾推出景泰蓝系列产品。',
              insight: '创新是最好的传承。'
            }
          ]
        }
      },
      '苏绣': {
        '宋代': {
          role: '民间女子',
          description: `你来到了${eraName}，苏绣技艺正在形成。你是苏州的一位民间女子，从小学习刺绣。苏州的丝绸业发达，为刺绣提供了良好的材料基础。`,
          question: '你会如何提升刺绣技艺？',
          options: [
            {
              id: '1',
              icon: '🌸',
              title: '专攻花鸟题材',
              description: '以自然之美为师',
              narrative: '你专注于观察和绣制花鸟题材，每天清晨到花园里观察花鸟的形态和色彩，然后回到家中精心绣制。你的作品生动传神，花鸟仿佛要从绣布上飞出来一样，受到了当地百姓的喜爱。',
              consequence: '苏绣以花鸟见长的特色逐渐形成，成为苏绣的重要传统题材。',
              reference: '宋代苏绣作品以写实著称，《清秘藏》中记载：「宋人之绣，针线细密，用线一、二丝，用针如发细者为之。设色精妙，光彩射目。」',
              insight: '源于自然的艺术最具生命力。'
            },
            {
              id: '2',
              icon: '📜',
              title: '借鉴绘画技法',
              description: '将书画艺术融入刺绣',
              narrative: '你尝试将绘画的技法和构图融入刺绣，学习宋代画家的山水、人物画法，将其转化为刺绣语言。你还研究了不同针法的表现力，创造出了新的针法。',
              consequence: '苏绣开始向艺术化方向发展，从实用工艺转变为艺术形式。',
              reference: '宋代刺绣开始出现大量仿绘画的作品，如《绣山水图》等，被称为「画绣」。',
              insight: '跨艺术融合能开辟新境界。'
            }
          ]
        },
        '明代': {
          role: '绣庄老板',
          description: `你来到了${eraName}，苏绣已经名满天下。你在苏州开设了一家绣庄，雇佣了几十名绣工。你的绣庄制作的作品被选为宫廷贡品，深受皇室喜爱。`,
          question: '面对旺盛的市场需求，你会如何经营？',
          options: [
            {
              id: '1',
              icon: '👑',
              title: '服务皇家贡品',
              description: '为宫廷提供精品',
              narrative: '你的绣庄成为宫廷贡品指定供应商，你精选最好的丝线和绣工，制作出精雕细琢的作品。你还根据宫廷的要求，设计了许多符合皇家审美的图案，如龙凤呈祥、万寿无疆等。',
              consequence: '苏绣工艺达到前所未有的精细程度，成为皇家御用的奢侈品。',
              reference: '明代文献记载了苏绣进贡宫廷的盛况，如《苏州府志》中就有相关记载。',
              insight: '追求极致可以造就艺术巅峰。'
            },
            {
              id: '2',
              icon: '📚',
              title: '总结针法技法',
              description: '系统化刺绣针法',
              narrative: '你开始总结和记录各种刺绣针法，经过多年的整理，编撰了苏绣针法秘籍《绣谱》，详细介绍了苏绣的各种针法和技巧。这本书成为苏绣传承的重要依据。',
              consequence: '苏绣有了系统的技法理论，为后世的发展提供了指导。',
              reference: '明代出现了《十洲记》等刺绣专著，为刺绣技法的传承做出了重要贡献。',
              insight: '理论总结是技艺传承的基石。'
            }
          ]
        },
        '清代': {
          role: '刺绣大师',
          description: `你来到了${eraName}，苏绣进入全盛时期。你是一位著名的刺绣大师，门下弟子众多。这一时期，苏绣技艺达到了巅峰，出现了许多著名的绣工和作品。`,
          question: '在巅峰时期，你会如何突破？',
          options: [
            {
              id: '1',
              icon: '🖼️',
              title: '绣制名画',
              description: '以针代笔，绣制名画',
              narrative: '你开始尝试用刺绣复制名画，选择了宋代张择端的《清明上河图》作为蓝本。你组织了几十名绣工，耗时三年，终于完成了这幅巨作。绣品不仅复制了原画的构图和色彩，还通过不同的针法表现出了原画的质感和层次。',
              consequence: '苏绣的艺术地位达到历史最高，成为与绘画相媲美的艺术形式。',
              reference: '清代出现了大量著名的绣画作品，如沈寿的《耶稣像》等，曾在国际展览中获得金奖。',
              insight: '艺术追求无止境。'
            },
            {
              id: '2',
              icon: '👩‍🏫',
              title: '广收女弟子',
              description: '传授刺绣技艺',
              narrative: '你开设绣庄，广收女弟子，无论出身贵贱，只要有天赋都可以来学习。你将自己的技艺毫无保留地传授给弟子们，并且鼓励她们创新。你的弟子遍布苏州各地，成为了苏绣的传承者。',
              consequence: '苏绣技艺在民间得到广泛传播，形成了许多新的绣庄和流派。',
              reference: '清代苏州刺绣从业者达数万人，形成了「家家养蚕，户户刺绣」的景象。',
              insight: '传承需要开放的心态。'
            }
          ]
        },
        '当代': {
          role: '非遗传承人',
          description: `你来到了${eraName}，苏绣面临传承与创新的抉择。随着现代生活方式的改变，传统刺绣的市场逐渐缩小，许多年轻人对刺绣缺乏兴趣。你是一位国家级非遗传承人，感到责任重大。`,
          question: '在现代社会，你会如何传承苏绣？',
          options: [
            {
              id: '1',
              icon: '🏛️',
              title: '建立博物馆',
              description: '展示苏绣历史',
              narrative: '你建立了苏绣博物馆，系统展示苏绣的历史与发展。博物馆收集了从宋代到现代的苏绣作品，还设有互动展区，让观众亲身体验刺绣的魅力。你还定期举办苏绣展览和讲座，向公众普及苏绣知识。',
              consequence: '苏绣有了专业的展示和传播平台，引起了更多人的关注。',
              reference: '苏州刺绣博物馆是中国最著名的刺绣专题博物馆，成立于1986年。',
              insight: '保护的前提是记录和展示。'
            },
            {
              id: '2',
              icon: '💻',
              title: '数字化保护',
              description: '利用现代科技记录',
              narrative: '你运用摄影、录像等现代科技，系统记录苏绣的针法和作品。你还开发了苏绣数字化教学系统，通过视频和互动软件向学生传授刺绣技艺。你将苏绣作品上传到互联网，让更多人了解苏绣。',
              consequence: '苏绣技艺得到了科学的保存，通过现代科技传播到了世界各地。',
              reference: '数字化非遗保护成为新趋势，许多非遗项目都建立了数字化档案。',
              insight: '科技为文化保护提供新可能。'
            }
          ]
        }
      }
    };

    const heritageScenes = sceneTemplates[heritageName] || sceneTemplates['剪纸'];
    const eraScenes = heritageScenes[eraName] || heritageScenes['唐代'];
    const scene = eraScenes.options[decisionIndex % eraScenes.options.length];

    return {
      role: eraScenes.role,
      description: eraScenes.description,
      question: eraScenes.question,
      options: eraScenes.options
    };
  },

  onSelectOption(e) {
    const optionId = e.currentTarget.dataset.id;
    this.setData({ selectedOptionId: optionId });
  },

  onConfirmChoice() {
    if (!this.data.selectedOptionId) {
      wx.showToast({ title: '请先选择一个选项', icon: 'none' });
      return;
    }

    const selectedOption = this.data.currentScene.options.find(opt => opt.id === this.data.selectedOptionId);
    if (!selectedOption) return;

    wx.showLoading({ title: '时光流转中...' });

    setTimeout(() => {
      wx.hideLoading();

      this.setData({
        result: {
          era: this.data.currentEra,
          narrative: selectedOption.narrative,
          consequence: selectedOption.consequence,
          reference: selectedOption.reference,
          insight: selectedOption.insight,
          source: 'local'
        },
        step: 'result'
      });
    }, 1500);
  },

  continueJourney() {
    const nextDecision = this.data.currentDecision + 1;

    if (nextDecision < this.data.totalDecisions) {
      this.loadScene(this.data.currentEra, nextDecision);
    } else {
      const nextEraIndex = this.data.currentEraIndex + 1;
      const heritageEras = this.data.currentHeritage.eras;

      if (nextEraIndex < heritageEras.length) {
        const newUnlocked = [...this.data.unlockedEras, nextEraIndex];
        this.setData({
          unlockedEras: newUnlocked,
          step: 'timeline'
        });
        wx.showToast({ title: '已解锁新时代！', icon: 'success' });
      } else {
        wx.showToast({ title: '恭喜完成时光之旅！', icon: 'success' });
        setTimeout(() => {
          this.setData({ step: 'select' });
        }, 1500);
      }
    }
  },

  shareJourney() {
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShareAppMessage() {
    const heritageName = this.data.currentHeritage ? this.data.currentHeritage.name : '非遗';
    const eraName = this.data.result ? this.data.result.era : '古代';

    return {
      title: `我在非遗时光机中穿越到了${eraName}的${heritageName}！`,
      path: `/traditional/traditional/pages/timeMachine/timeMachine`
    };
  },

  goBack() {
    this.setData({ step: 'select', currentHeritage: null });
  },

  toggleWenxinPanel() {
    this.setData({ wenxinPanelOpen: !this.data.wenxinPanelOpen });
  },

  onWenxinInput(e) {
    this.setData({ wenxinInput: e.detail.value });
  },

  sendWenxinMessage() {
    const question = this.data.wenxinInput.trim();
    if (!question) return;

    const userMessage = { type: 'user', content: question };
    const updatedMessages = [...this.data.wenxinMessages, userMessage];
    this.setData({ wenxinMessages: updatedMessages, wenxinInput: '' });

    wx.showLoading({ title: '文心先生思考中...' });

    setTimeout(() => {
      const answer = this.getWenxinAnswer(question);
      const aiMessage = { type: 'ai', content: answer };
      this.setData({ wenxinMessages: [...this.data.wenxinMessages, aiMessage] });
      wx.hideLoading();
    }, 1000);
  },

  askSuggestion(e) {
    const question = e.currentTarget.dataset.question;
    this.setData({ wenxinInput: question });
    this.sendWenxinMessage();
  },

  getWenxinAnswer(question) {
    const heritageName = this.data.currentHeritage ? this.data.currentHeritage.name : '';
    const eraName = this.data.currentEra || '';

    if (question.includes('什么') && question.includes('剪纸')) {
      return '剪纸是中国传统民间艺术，用剪刀或刻刀在纸上剪刻出各种图案，用于装饰窗户、墙壁等。剪纸艺术已有千年历史，2009年被列入联合国教科文组织非物质文化遗产。剪纸不仅是一种艺术形式，更是中华民族文化的重要载体，承载着人们对美好生活的向往和对传统文化的传承。';
    }

    if (question.includes('起源') && question.includes('剪纸')) {
      return `关于剪纸的起源，学术界有不同的看法。有学者认为剪纸起源于汉代纸张发明之后，也有学者认为其雏形可以追溯到更早的镂空金银箔片艺术。${eraName ? `在${eraName}时期，剪纸艺术已经有了初步发展。${this.getEraInfo('剪纸', eraName)}` : '汉代时，纸张的发明为剪纸的产生提供了物质基础，当时的人们开始用剪刀在纸上剪刻简单的图案，用于祭祀和装饰。'}`;
    }

    if (question.includes('传承') || question.includes('保护')) {
      return '非遗传承需要多方面努力：1）政府层面的政策支持与资金扶持，建立传承基地和保护机制；2）教育机构的专业人才培养，将非遗纳入学校教育体系；3）社会层面的宣传推广，通过媒体、展览等方式提高公众认知；4）传承人的坚守与创新，在保持传统的基础上融入现代元素。每一项都不可或缺，只有全社会共同努力，才能让非遗在现代社会焕发新生。';
    }

    if (question.includes('价值') || question.includes('意义')) {
      return '非遗的价值是多方面的：1）历史价值 - 承载着丰富的历史文化信息，是研究古代社会的重要资料；2）艺术价值 - 展现独特的审美特色，体现了劳动人民的创造力；3）社会价值 - 增强民族认同感，促进文化多样性；4）经济价值 - 可转化为文化生产力，促进地方经济发展。非遗是民族文化的瑰宝，是人类共同的文化财富。';
    }

    if (question.includes('景泰蓝')) {
      return '景泰蓝，又称铜胎掐丝珐琅，是中国传统工艺的瑰宝。它始于元代，盛于明代景泰年间，以其精湛的工艺和华丽的色彩而闻名。景泰蓝制作工艺复杂，包括制胎、掐丝、点蓝、烧蓝、磨光、镀金等多个步骤，每件作品都需要经过数十道工序才能完成。景泰蓝不仅是实用器物，更是艺术珍品，体现了中国传统工艺的高超水平。';
    }

    if (question.includes('苏绣')) {
      return '苏绣是苏州地区的传统刺绣工艺，始于宋代，盛于明清。苏绣以针法精细、色彩淡雅、构图巧妙而著称，被誉为「东方艺术明珠」。苏绣的针法丰富多样，有平针、套针、乱针等数十种针法，能够表现出各种复杂的图案和质感。苏绣的代表作品有《清明上河图》《百鸟朝凤》等，这些作品不仅技艺精湛，更展现了中国传统文化的魅力。';
    }

    if (heritageName && question.includes(heritageName)) {
      return `关于${heritageName}，这是中国传统工艺美术的杰出代表。${eraName ? `在${eraName}时期，${heritageName}有了重要的发展。${this.getEraInfo(heritageName, eraName)}` : ''}它不仅是一件艺术品，更承载着深厚的文化内涵和匠人智慧。${heritageName}的制作工艺精湛，需要经过多道工序才能完成，体现了中国传统工艺的严谨和精细。`;
    }

    if (eraName && (question.includes('时代') || question.includes('历史'))) {
      return `${eraName}是一个重要的历史时期。这个时期的非遗艺术往往呈现出独特的风格和特色，反映了当时的社会风貌和审美取向。${heritageName ? `在${eraName}时期，${heritageName}的发展尤为显著，${this.getEraInfo(heritageName, eraName)}` : ''}通过时光机体验，您可以更直观地感受不同时代的非遗魅力，了解它们是如何随着历史的变迁而演变的。`;
    }

    return '感谢你的提问！非遗文化博大精深，每一项技艺都蕴含着先人的智慧。建议您可以通过时光机深入体验不同时代的非遗演变，这样会有更直观的了解哦~';
  },

  getEraInfo(heritageName, eraName) {
    const eraInfos = {
      '剪纸': {
        '汉代': '当时剪纸主要用于祭祀和装饰，工艺简单，图案粗犷。',
        '唐代': '剪纸艺术普及到民间，用于节庆装饰，图案开始丰富多样。',
        '宋代': '剪纸开始商业化，出现了专门的剪纸店铺，工艺更加精细。',
        '明清': '剪纸艺术达到鼎盛，形成了不同的地方风格，题材更加广泛。'
      },
      '景泰蓝': {
        '元代': '景泰蓝工艺传入中国，开始本土化，主要制作简单的器物。',
        '明代': '景泰年间，景泰蓝工艺达到巅峰，成为皇家御用工艺。',
        '清代': '景泰蓝从宫廷走向民间，开始制作小型实用器物。',
        '现代': '景泰蓝面临传承挑战，同时也在现代设计中焕发新生。'
      },
      '苏绣': {
        '宋代': '苏绣技艺开始形成，以写实著称，针法逐渐丰富。',
        '明代': '苏绣成为宫廷贡品，工艺更加精细，图案更加华丽。',
        '清代': '苏绣进入全盛时期，出现了大量著名的绣工和作品。',
        '当代': '苏绣面临传承与创新的抉择，通过数字化保护等方式延续发展。'
      }
    };
    return eraInfos[heritageName] && eraInfos[heritageName][eraName] ? eraInfos[heritageName][eraName] : '';
  }
});