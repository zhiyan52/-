Page({
  data: {
    questions: [
      // 预制题目1-10：《论语》、《道德经》、《诗经》
      {
        id: 1,
        source: '《论语》',
        content: [
          { type: 'text', text: '子曰：' },
          { type: 'blank', index: 0, correct: '学而时习之' },
          { type: 'text', text: '，不亦' },
          { type: 'blank', index: 1, correct: '说乎' },
          { type: 'text', text: '？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？' }
        ],
        options: ['学而时习之', '温故而知新', '学而不思则罔', '说乎', '君子乎', '乐乎'],
        explanation: '这句话出自《论语·学而》，意思是：孔子说："学习并且按时温习，不是很愉快吗？有志同道合的人从远方来，不是很快乐吗？人家不了解我，我却不恼怒，不是有才德的人吗？"',
        fullSentence: '子曰：学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？'
      },
      {
        id: 2,
        source: '《道德经》',
        content: [
          { type: 'text', text: '道可道，' },
          { type: 'blank', index: 0, correct: '非常道' },
          { type: 'text', text: '；名可名，' },
          { type: 'blank', index: 1, correct: '非常名' },
          { type: 'text', text: '。' }
        ],
        options: ['非常道', '非常名', '无名天地之始', '有名万物之母', '上善若水', '道法自然'],
        explanation: '这句话出自《道德经》第一章，意思是：可以用言语表达的道，不是永恒的道；可以用名称命名的名，不是永恒的名。',
        fullSentence: '道可道，非常道；名可名，非常名。'
      },
      {
        id: 3,
        source: '《诗经》',
        content: [
          { type: 'text', text: '关关雎鸠，' },
          { type: 'blank', index: 0, correct: '在河之洲' },
          { type: 'text', text: '。窈窕淑女，' },
          { type: 'blank', index: 1, correct: '君子好逑' },
          { type: 'text', text: '。' }
        ],
        options: ['在河之洲', '君子好逑', '辗转反侧', '寤寐求之', '钟鼓乐之', '琴瑟友之'],
        explanation: '这句话出自《诗经·关雎》，意思是：关关和鸣的雎鸠，栖息在河中的小洲。贤良美好的女子，是君子的佳偶。',
        fullSentence: '关关雎鸠，在河之洲。窈窕淑女，君子好逑。'
      },
      {
        id: 4,
        source: '《大学》',
        content: [
          { type: 'text', text: '大学之道，在明明德，在亲民，' },
          { type: 'blank', index: 0, correct: '在止于至善' },
          { type: 'text', text: '。' }
        ],
        options: ['在止于至善', '在明明德', '在亲民', '在修身齐家', '在格物致知', '在诚意正心'],
        explanation: '这句话出自《大学》开篇，意思是：大学的宗旨在于弘扬光明正大的品德，在于使人弃旧图新，在于使人达到最完善的境界。',
        fullSentence: '大学之道，在明明德，在亲民，在止于至善。'
      },
      {
        id: 5,
        source: '《中庸》',
        content: [
          { type: 'text', text: '天命之谓性，率性之谓道，' },
          { type: 'blank', index: 0, correct: '修道之谓教' },
          { type: 'text', text: '。' }
        ],
        options: ['修道之谓教', '率性之谓道', '天命之谓性', '择善而从', '不偏不倚', '中和位育'],
        explanation: '这句话出自《中庸》开篇，意思是：上天所赋予人的本性叫做性，遵循本性叫做道，修养道叫做教。',
        fullSentence: '天命之谓性，率性之谓道，修道之谓教。'
      },
      {
        id: 6,
        source: '《论语》',
        content: [
          { type: 'text', text: '子曰：' },
          { type: 'blank', index: 0, correct: '三人行' },
          { type: 'text', text: '，必有我师焉。择其善者而从之，' },
          { type: 'blank', index: 1, correct: '其不善者而改之' },
          { type: 'text', text: '。' }
        ],
        options: ['三人行', '必有我师', '其不善者而改之', '见贤思齐', '温故知新', '学而不厌'],
        explanation: '这句话出自《论语·述而》，意思是：孔子说："几个人一起走路，其中必定有人可以做我的老师。我选择他们的优点来学习，看到他们的缺点就引以为戒，加以改正。"',
        fullSentence: '子曰：三人行，必有我师焉。择其善者而从之，其不善者而改之。'
      },
      {
        id: 7,
        source: '《道德经》',
        content: [
          { type: 'text', text: '上善若水，水善利万物而不争，' },
          { type: 'blank', index: 0, correct: '处众人之所恶' },
          { type: 'text', text: '，故几于道。' }
        ],
        options: ['处众人之所恶', '上善若水', '为而不争', '柔弱胜刚强', '无为而治', '道法自然'],
        explanation: '这句话出自《道德经》第八章，意思是：最高的善就像水一样，水善于滋润万物而不与万物相争，停留在众人都不喜欢的地方，所以最接近于道。',
        fullSentence: '上善若水，水善利万物而不争，处众人之所恶，故几于道。'
      },
      {
        id: 8,
        source: '《诗经》',
        content: [
          { type: 'text', text: '蒹葭苍苍，' },
          { type: 'blank', index: 0, correct: '白露为霜' },
          { type: 'text', text: '。所谓伊人，' },
          { type: 'blank', index: 1, correct: '在水一方' },
          { type: 'text', text: '。' }
        ],
        options: ['白露为霜', '在水一方', '蒹葭萋萋', '白露未晞', '道阻且长', '溯洄从之'],
        explanation: '这句话出自《诗经·蒹葭》，意思是：河边芦苇一片苍茫，深秋的白露凝结成霜。我所思念的那个人，就在河水的那一方。',
        fullSentence: '蒹葭苍苍，白露为霜。所谓伊人，在水一方。'
      },
      {
        id: 9,
        source: '《论语》',
        content: [
          { type: 'text', text: '子曰：' },
          { type: 'blank', index: 0, correct: '学而不思则罔' },
          { type: 'text', text: '，思而不学则' },
          { type: 'blank', index: 1, correct: '殆' },
          { type: 'text', text: '。' }
        ],
        options: ['学而不思则罔', '殆', '学而时习之', '温故知新', '思而不学则殆', '不亦说乎'],
        explanation: '这句话出自《论语·为政》，意思是：孔子说："只学习而不思考，就会迷惑；只思考而不学习，就会疑惑。"',
        fullSentence: '子曰：学而不思则罔，思而不学则殆。'
      },
      {
        id: 10,
        source: '《诗经》',
        content: [
          { type: 'text', text: '桃之夭夭，' },
          { type: 'blank', index: 0, correct: '灼灼其华' },
          { type: 'text', text: '。之子于归，' },
          { type: 'blank', index: 1, correct: '宜其室家' },
          { type: 'text', text: '。' }
        ],
        options: ['灼灼其华', '宜其室家', '其叶蓁蓁', '有蕡其实', '宜其家室', '宜其家人'],
        explanation: '这句话出自《诗经·桃夭》，意思是：桃花盛开，繁盛艳丽。这个姑娘出嫁了，一定会让家庭和顺美满。',
        fullSentence: '桃之夭夭，灼灼其华。之子于归，宜其室家。'
      },

      // 预制题目11-20：《孟子》、《庄子》、《左传》
      {
        id: 11,
        source: '《孟子》',
        content: [
          { type: 'text', text: '天将降大任于斯人也，必先苦其心志，' },
          { type: 'blank', index: 0, correct: '劳其筋骨' },
          { type: 'text', text: '，饿其体肤，' },
          { type: 'blank', index: 1, correct: '空乏其身' },
          { type: 'text', text: '，行拂乱其所为。' }
        ],
        options: ['劳其筋骨', '空乏其身', '动心忍性', '增益其所不能', '苦其心志', '饿其体肤'],
        explanation: '这句话出自《孟子·告天下》，意思是：所以上天要把重大任务交给这个人，一定会先使他的心意苦恼、筋骨劳累、身体饥饿、穷困潦倒，做事经常受干扰。',
        fullSentence: '天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为。'
      },
      {
        id: 12,
        source: '《庄子》',
        content: [
          { type: 'text', text: '北冥有鱼，其名为鲲。鲲之大，' },
          { type: 'blank', index: 0, correct: '不知其几千里也' },
          { type: 'text', text: '。化而为鸟，其名为鹏。鹏之背，' },
          { type: 'blank', index: 1, correct: '不知其几千里也' },
          { type: 'text', text: '。' }
        ],
        options: ['不知其几千里也', '扶摇直上', '九万里', '水击三千里', '负青天', '图南'],
        explanation: '这句话出自《庄子·逍遥游》，意思是：北海有一条鱼，它的名字叫做鲲。鲲的巨大，不知道有几千里。变化成为鸟，它的名字叫做鹏。鹏的背，不知道有几千里。',
        fullSentence: '北冥有鱼，其名为鲲。鲲之大，不知其几千里也。化而为鸟，其名为鹏。鹏之背，不知其几千里也。'
      },
      {
        id: 13,
        source: '《左传》',
        content: [
          { type: 'text', text: '' },
          { type: 'blank', index: 0, correct: '唇亡齿寒' },
          { type: 'text', text: '。辅车相依，' },
          { type: 'blank', index: 1, correct: '唇齿相依' },
          { type: 'text', text: '。' }
        ],
        options: ['唇亡齿寒', '唇齿相依', '皮之不存', '毛将焉附', '风雨同舟', '和衷共济'],
        explanation: '这句话出自《左传·僖公五年》，意思是：嘴唇没有了，牙齿就会寒冷。脸颊和牙床相互依存，嘴唇和牙齿相互依赖。',
        fullSentence: '唇亡齿寒。辅车相依，唇齿相依。'
      },
      {
        id: 14,
        source: '《孟子》',
        content: [
          { type: 'text', text: '得道者多助，' },
          { type: 'blank', index: 0, correct: '失道者寡助' },
          { type: 'text', text: '。寡助之至，' },
          { type: 'blank', index: 1, correct: '亲戚畔之' },
          { type: 'text', text: '。多助之至，天下顺之。' }
        ],
        options: ['失道者寡助', '亲戚畔之', '天下顺之', '得道多助', '君子以仁行礼', '国恒亡'],
        explanation: '这句话出自《孟子·公孙丑下》，意思是：施行仁政的人，帮助他的人就多；不施行仁政的人，帮助他的人就少。帮助他的人少到极点，连内外亲属都会背叛他。',
        fullSentence: '得道者多助，失道者寡助。寡助之至，亲戚畔之。多助之至，天下顺之。'
      },
      {
        id: 15,
        source: '《论语》',
        content: [
          { type: 'text', text: '己所不欲，' },
          { type: 'blank', index: 0, correct: '勿施于人' },
          { type: 'text', text: '。' }
        ],
        options: ['勿施于人', '己所欲者', '推己及人', '将心比心', '成人之美', '与人方便'],
        explanation: '这句话出自《论语·颜渊》，意思是：自己所不愿意的事情，不要强加给别人。',
        fullSentence: '己所不欲，勿施于人。'
      },
      {
        id: 16,
        source: '《礼记》',
        content: [
          { type: 'text', text: '玉不琢，不成器；' },
          { type: 'blank', index: 0, correct: '人不学，不知道' },
          { type: 'text', text: '。' }
        ],
        options: ['人不学，不知道', '学而知之', '教学相长', '玉不琢不成器', '知之者不如好之者', '学而时习之'],
        explanation: '这句话出自《礼记·学记》，意思是：玉石不经过雕琢，就不能成为器物；人不经过学习，就不懂得道理。',
        fullSentence: '玉不琢，不成器；人不学，不知道。'
      },
      {
        id: 17,
        source: '《尚书》',
        content: [
          { type: 'text', text: '满招损，' },
          { type: 'blank', index: 0, correct: '谦受益' },
          { type: 'text', text: '。' }
        ],
        options: ['谦受益', '满招损', '戒骄戒躁', '虚怀若谷', '谦谦君子', '卑以自牧'],
        explanation: '这句话出自《尚书·大禹谟》，意思是：骄傲自满会招来损失，谦虚谨慎会得到好处。',
        fullSentence: '满招损，谦受益。'
      },
      {
        id: 18,
        source: '《孟子》',
        content: [
          { type: 'text', text: '富贵不能淫，' },
          { type: 'blank', index: 0, correct: '贫贱不能移' },
          { type: 'text', text: '，威武不能屈，' },
          { type: 'blank', index: 1, correct: '此之谓大丈夫' },
          { type: 'text', text: '。' }
        ],
        options: ['贫贱不能移', '此之谓大丈夫', '威武不能屈', '贫贱不能淫', '富贵不能屈', '大丈夫'],
        explanation: '这句话出自《孟子·滕文公下》，意思是：富贵不能使他的心惑乱，贫贱不能使他的节操改变，威武不能使他的意志屈服，这才叫做大丈夫。',
        fullSentence: '富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫。'
      },
      {
        id: 19,
        source: '《庄子》',
        content: [
          { type: 'text', text: '相濡以沫，' },
          { type: 'blank', index: 0, correct: '不如相忘于江湖' },
          { type: 'text', text: '。' }
        ],
        options: ['不如相忘于江湖', '相濡以沫', '不如两忘', '江湖再见', '各自逍遥', '相忘道途'],
        explanation: '这句话出自《庄子·大宗师》，意思是：泉水干了，鱼儿相互吐唾沫湿润对方，与其这样艰难地活着，不如彼此相忘于江湖，各自自由地游动。',
        fullSentence: '相濡以沫，不如相忘于江湖。'
      },
      {
        id: 20,
        source: '《左传》',
        content: [
          { type: 'text', text: '皮之不存，' },
          { type: 'blank', index: 0, correct: '毛将焉附' },
          { type: 'text', text: '。' }
        ],
        options: ['毛将焉附', '唇亡齿寒', '皮之不存', '根之不固', '源之不清', '流之不远'],
        explanation: '这句话出自《左传·僖公十四年》，意思是：皮肤都不存在了，毛发还能附着在哪里呢？比喻事物失去了基础，就无法存在。',
        fullSentence: '皮之不存，毛将焉附。'
      },

      // 预制题目21-30：《礼记》、《诗经》、《论语》其他经典
      {
        id: 21,
        source: '《礼记》',
        content: [
          { type: 'text', text: '学，然后知不足；' },
          { type: 'blank', index: 0, correct: '教，然后知困' },
          { type: 'text', text: '。知不足，然后能自反也；知困，' },
          { type: 'blank', index: 1, correct: '然后能自强也' },
          { type: 'text', text: '。' }
        ],
        options: ['教，然后知困', '然后能自强也', '教学相长', '学而不厌', '温故知新', '见贤思齐'],
        explanation: '这句话出自《礼记·学记》，意思是：学习了，然后才能知道自己的不足；教人了，然后才能知道自己的困惑。知道不足，然后才能自我反思；知道困惑，然后才能自我勉励。',
        fullSentence: '学，然后知不足；教，然后知困。知不足，然后能自反也；知困，然后能自强也。'
      },
      {
        id: 22,
        source: '《诗经》',
        content: [
          { type: 'text', text: '投我以木桃，' },
          { type: 'blank', index: 0, correct: '报之以琼瑶' },
          { type: 'text', text: '。匪报也，' },
          { type: 'blank', index: 1, correct: '永以为好也' },
          { type: 'text', text: '。' }
        ],
        options: ['报之以琼瑶', '永以为好也', '投我以木李', '报之以琼玖', '永以为期', '匪报也'],
        explanation: '这句话出自《诗经·木瓜》，意思是：他送我木桃，我用美玉来报答。这不是为了报答，是想永远相好。',
        fullSentence: '投我以木桃，报之以琼瑶。匪报也，永以为好也。'
      },
      {
        id: 23,
        source: '《论语》',
        content: [
          { type: 'text', text: '子曰：' },
          { type: 'blank', index: 0, correct: '知之者不如好之者' },
          { type: 'text', text: '，' },
          { type: 'blank', index: 1, correct: '好之者不如乐之者' },
          { type: 'text', text: '。' }
        ],
        options: ['知之者不如好之者', '好之者不如乐之者', '学而时习之', '温故知新', '学而不厌', '不亦说乎'],
        explanation: '这句话出自《论语·雍也》，意思是：孔子说："懂得它的人，不如喜爱它的人；喜爱它的人，不如以它为乐的人。"',
        fullSentence: '子曰：知之者不如好之者，好之者不如乐之者。'
      },
      {
        id: 24,
        source: '《孟子》',
        content: [
          { type: 'text', text: '老吾老，以及人之老；幼吾幼，' },
          { type: 'blank', index: 0, correct: '以及人之幼' },
          { type: 'text', text: '。' }
        ],
        options: ['以及人之幼', '天下可运于掌', '推己及人', '老吾老以及人之老', '幼吾幼以及人之幼', '四海一家'],
        explanation: '这句话出自《孟子·梁惠王上》，意思是：尊敬自己的长辈，进而尊敬别人的长辈；爱护自己的孩子，进而爱护别人的孩子。',
        fullSentence: '老吾老，以及人之老；幼吾幼，以及人之幼。'
      },
      {
        id: 25,
        source: '《道德经》',
        content: [
          { type: 'text', text: '为学日益，' },
          { type: 'blank', index: 0, correct: '为道日损' },
          { type: 'text', text: '。损之又损，以至于' },
          { type: 'blank', index: 1, correct: '无为' },
          { type: 'text', text: '，无为而无不为。' }
        ],
        options: ['为道日损', '无为', '为学日益', '道法自然', '上善若水', '绝学无忧'],
        explanation: '这句话出自《道德经》第四十八章，意思是：追求学问的人，知识一天比一天增加；追求道的人，私欲一天比一天减少。减少再减少，一直到达"无为"的境界。',
        fullSentence: '为学日益，为道日损。损之又损，以至于无为，无为而无不为。'
      },
      {
        id: 26,
        source: '《礼记》',
        content: [
          { type: 'text', text: '饮食男女，' },
          { type: 'blank', index: 0, correct: '人之大欲存焉' },
          { type: 'text', text: '。死亡贫苦，' },
          { type: 'blank', index: 1, correct: '人之大恶存焉' },
          { type: 'text', text: '。' }
        ],
        options: ['人之大欲存焉', '人之大恶存焉', '欲壑难填', '生死攸关', '贫贱不移', '浩然正气'],
        explanation: '这句话出自《礼记·礼运》，意思是：饮食和男女情爱，是人们最大的欲望。死亡和贫苦，是人们最大的厌恶。',
        fullSentence: '饮食男女，人之大欲存焉。死亡贫苦，人之大恶存焉。'
      },
      {
        id: 27,
        source: '《诗经》',
        content: [
          { type: 'text', text: '昔我往矣，' },
          { type: 'blank', index: 0, correct: '杨柳依依' },
          { type: 'text', text: '。今我来思，' },
          { type: 'blank', index: 1, correct: '雨雪霏霏' },
          { type: 'text', text: '。' }
        ],
        options: ['杨柳依依', '雨雪霏霏', '依依不舍', '雨雪纷纷', '杨柳青青', '雨雪濛濛'],
        explanation: '这句话出自《诗经·采薇》，意思是：回想当初出征时，杨柳轻轻飘动。如今回来的时候，大雪纷纷扬扬。',
        fullSentence: '昔我往矣，杨柳依依。今我来思，雨雪霏霏。'
      },
      {
        id: 28,
        source: '《论语》',
        content: [
          { type: 'text', text: '三军可夺帅也，' },
          { type: 'blank', index: 0, correct: '匹夫不可夺志也' },
          { type: 'text', text: '。' }
        ],
        options: ['匹夫不可夺志也', '三军可夺帅', '志存高远', '匹夫之勇', '不可夺志', '志在千里'],
        explanation: '这句话出自《论语·子罕》，意思是：军队的主帅可以被人夺去，但一个普通人的志向却不能被人改变。',
        fullSentence: '三军可夺帅也，匹夫不可夺志也。'
      },
      {
        id: 29,
        source: '《庄子》',
        content: [
          { type: 'text', text: '井蛙不可以语于海者，' },
          { type: 'blank', index: 0, correct: '拘于虚也' },
          { type: 'text', text: '；夏虫不可以语于冰者，' },
          { type: 'blank', index: 1, correct: '笃于时也' },
          { type: 'text', text: '。' }
        ],
        options: ['拘于虚也', '笃于时也', '束于教也', '限于境也', '困于时也', '蔽于见也'],
        explanation: '这句话出自《庄子·秋水》，意思是：不能和井里的青蛙谈论大海，因为它受居住地方的限制；不能和夏天才有的虫子谈论冰，因为它受生长时间的限制。',
        fullSentence: '井蛙不可以语于海者，拘于虚也；夏虫不可以语于冰者，笃于时也。'
      },
      {
        id: 30,
        source: '《左传》',
        content: [
          { type: 'text', text: '' },
          { type: 'blank', index: 0, correct: '言之无文' },
          { type: 'text', text: '，行而不远。' }
        ],
        options: ['言之无文', '行而不远', '文以载道', '言为心声', '文采飞扬', '言之凿凿'],
        explanation: '这句话出自《左传·襄公二十五年》，意思是：语言没有文采，就传播不远。',
        fullSentence: '言之无文，行而不远。'
      }
    ],
    currentQuestionIndex: 0,
    selectedOptions: [],
    showAnswer: false,
    isCorrect: false,
    activeBlankIndex: null,
    currentQuestion: null,
    canSubmit: false,
    aiQuestion: null,
    isLoadingAI: false,
    showAIQuestion: false,
    showWordMeaningPopup: false,
    showSentenceMeaningPopup: false,
    selectedWord: '',
    wordMeaning: '',
    fullSentence: '',
    sentenceMeaning: ''
  },

  onLoad: function (options) {
    this.initQuestion();
  },

  initQuestion: function () {
    const currentQuestion = this.data.questions[this.data.currentQuestionIndex];
    const blankCount = currentQuestion.content.filter(item => item.type === 'blank').length;
    const selectedOptions = new Array(blankCount).fill('');

    this.setData({
      selectedOptions: selectedOptions,
      showAnswer: false,
      isCorrect: false,
      activeBlankIndex: null,
      currentQuestion: currentQuestion,
      canSubmit: false
    });
  },

  isOptionSelected: function (option) {
    return this.data.selectedOptions.indexOf(option) !== -1;
  },

  selectBlank: function (e) {
    if (this.data.showAnswer) return;

    const index = e.currentTarget.dataset.index;
    this.setData({
      activeBlankIndex: index
    });
  },

  selectOption: function (e) {
    if (this.data.showAnswer) return;

    const optionIndex = e.currentTarget.dataset.index;
    const option = e.currentTarget.dataset.option;
    const currentQuestion = this.data.currentQuestion;
    let selectedOptions = [...this.data.selectedOptions];

    // 确定要填充的空白位置
    let targetIndex = this.data.activeBlankIndex;
    if (targetIndex === null) {
      // 如果没有选中的空白，找第一个空的
      targetIndex = selectedOptions.findIndex(o => o === '');
    }

    if (targetIndex !== -1) {
      // 检查这个选项是否已经在其他位置使用过
      const existingIndex = selectedOptions.findIndex((o, i) => o === option && i !== targetIndex);
      if (existingIndex !== -1) {
        selectedOptions[existingIndex] = '';
      }

      selectedOptions[targetIndex] = option;

      // 自动选择下一个空的
      const nextBlankIndex = selectedOptions.findIndex((o, i) => o === '' && i !== targetIndex);

      // 检查是否可以提交
      const canSubmit = selectedOptions.every(o => o !== '');

      this.setData({
        selectedOptions: selectedOptions,
        activeBlankIndex: nextBlankIndex !== -1 ? nextBlankIndex : null,
        canSubmit: canSubmit
      });
    }
  },

  submitAnswer: function () {
    if (!this.data.canSubmit) return;

    const currentQuestion = this.data.currentQuestion;
    const blanks = currentQuestion.content.filter(item => item.type === 'blank');
    let isCorrect = true;

    for (let i = 0; i < blanks.length; i++) {
      if (this.data.selectedOptions[i] !== blanks[i].correct) {
        isCorrect = false;
        break;
      }
    }

    this.setData({
      showAnswer: true,
      isCorrect: isCorrect
    });
  },

  resetQuestion: function () {
    this.initQuestion();
  },

  nextQuestion: function () {
    if (this.data.currentQuestionIndex < this.data.questions.length - 1) {
      this.setData({
        currentQuestionIndex: this.data.currentQuestionIndex + 1
      });
      this.initQuestion();
    } else {
      wx.showToast({
        title: '练习完成！',
        icon: 'success',
        duration: 2000
      });
      setTimeout(() => {
        this.goBack();
      }, 2000);
    }
  },

  generateAIQuestion: function () {
    this.setData({ isLoadingAI: true });

    wx.cloud.callFunction({
      name: 'generate-fill-question',
      data: {}
    }).then(res => {
      if (res.result && res.result.success) {
        this.setData({
          aiQuestion: res.result.question,
          showAIQuestion: true,
          isLoadingAI: false
        });
        wx.showToast({
          title: '题目生成成功',
          icon: 'success'
        });
      } else {
        this.setData({ isLoadingAI: false });
        wx.showToast({
          title: '生成失败，请重试',
          icon: 'none'
        });
      }
    }).catch(err => {
      console.error('AI题目生成失败：', err);
      this.setData({ isLoadingAI: false });
      wx.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      });
    });
  },

  useAIQuestion: function () {
    if (!this.data.aiQuestion) return;

    const aiQuestion = this.data.aiQuestion;
    const questions = [...this.data.questions, aiQuestion];

    this.setData({
      questions: questions,
      currentQuestionIndex: questions.length - 1,
      aiQuestion: null,
      showAIQuestion: false
    });

    this.initQuestion();
    wx.showToast({
      title: '已添加新题目',
      icon: 'success'
    });
  },

  discardAIQuestion: function () {
    this.setData({
      aiQuestion: null,
      showAIQuestion: false
    });
    wx.showToast({
      title: '已放弃该题目',
      icon: 'none'
    });
  },

  goBack: function () {
    wx.navigateBack();
  },

  // 显示词语释义
  showWordMeaning: function (e) {
    const word = e.currentTarget.dataset.word;
    if (!word || word.trim() === '') return;

    // 模拟AI生成词语释义
    const wordMeaning = this.getWordMeaning(word);

    this.setData({
      showWordMeaningPopup: true,
      selectedWord: word,
      wordMeaning: wordMeaning
    });
  },

  // 关闭词语释义弹窗
  closeWordMeaningPopup: function () {
    this.setData({
      showWordMeaningPopup: false,
      selectedWord: '',
      wordMeaning: ''
    });
  },

  // 显示完整句子释义
  showFullSentenceMeaning: function () {
    const currentQuestion = this.data.currentQuestion;
    if (!currentQuestion) return;

    const fullSentence = currentQuestion.fullSentence || '';
    const sentenceMeaning = currentQuestion.explanation || '';

    this.setData({
      showSentenceMeaningPopup: true,
      fullSentence: fullSentence,
      sentenceMeaning: sentenceMeaning
    });
  },

  // 关闭完整句子释义弹窗
  closeSentenceMeaningPopup: function () {
    this.setData({
      showSentenceMeaningPopup: false,
      fullSentence: '',
      sentenceMeaning: ''
    });
  },

  // 获取词语释义（模拟AI功能）
  getWordMeaning: function (word) {
    // 简单的词语释义映射，实际应用中可以调用AI API
    const meaningMap = {
      '子曰': '孔子说',
      '学而时习之': '学习并且按时温习',
      '说乎': '愉快吗',
      '有朋自远方来': '有志同道合的人从远方来',
      '不亦乐乎': '不是很快乐吗',
      '人不知而不愠': '人家不了解我，我却不恼怒',
      '不亦君子乎': '不是有才德的人吗',
      '道可道': '可以用言语表达的道',
      '非常道': '不是永恒的道',
      '名可名': '可以用名称命名的名',
      '非常名': '不是永恒的名',
      '关关雎鸠': '关关和鸣的雎鸠',
      '在河之洲': '栖息在河中的小洲',
      '窈窕淑女': '贤良美好的女子',
      '君子好逑': '是君子的佳偶',
      '大学之道': '大学的宗旨',
      '在明明德': '在于弘扬光明正大的品德',
      '在亲民': '在于使人弃旧图新',
      '在止于至善': '在于使人达到最完善的境界',
      '天命之谓性': '上天所赋予人的本性叫做性',
      '率性之谓道': '遵循本性叫做道',
      '修道之谓教': '修养道叫做教',
      '三人行': '几个人一起走路',
      '必有我师焉': '其中必定有人可以做我的老师',
      '择其善者而从之': '我选择他们的优点来学习',
      '其不善者而改之': '看到他们的缺点就引以为戒，加以改正',
      '上善若水': '最高的善就像水一样',
      '水善利万物而不争': '水善于滋润万物而不与万物相争',
      '处众人之所恶': '停留在众人都不喜欢的地方',
      '故几于道': '所以最接近于道',
      '蒹葭苍苍': '河边芦苇一片苍茫',
      '白露为霜': '深秋的白露凝结成霜',
      '所谓伊人': '我所思念的那个人',
      '在水一方': '就在河水的那一方',
      '学而不思则罔': '只学习而不思考，就会迷惑',
      '思而不学则殆': '只思考而不学习，就会疑惑',
      '桃之夭夭': '桃花盛开',
      '灼灼其华': '繁盛艳丽',
      '之子于归': '这个姑娘出嫁了',
      '宜其室家': '一定会让家庭和顺美满',
      '天将降大任于斯人也': '上天要把重大任务交给这个人',
      '必先苦其心志': '一定会先使他的心意苦恼',
      '劳其筋骨': '筋骨劳累',
      '饿其体肤': '身体饥饿',
      '空乏其身': '穷困潦倒',
      '行拂乱其所为': '做事经常受干扰',
      '北冥有鱼': '北海有一条鱼',
      '其名为鲲': '它的名字叫做鲲',
      '鲲之大': '鲲的巨大',
      '不知其几千里也': '不知道有几千里',
      '化而为鸟': '变化成为鸟',
      '其名为鹏': '它的名字叫做鹏',
      '鹏之背': '鹏的背',
      '唇亡齿寒': '嘴唇没有了，牙齿就会寒冷',
      '辅车相依': '脸颊和牙床相互依存',
      '唇齿相依': '嘴唇和牙齿相互依赖',
      '得道者多助': '施行仁政的人，帮助他的人就多',
      '失道者寡助': '不施行仁政的人，帮助他的人就少',
      '寡助之至': '帮助他的人少到极点',
      '亲戚畔之': '连内外亲属都会背叛他',
      '多助之至': '帮助他的人多到极点',
      '天下顺之': '天下的人都会归顺他',
      '己所不欲': '自己所不愿意的事情',
      '勿施于人': '不要强加给别人',
      '玉不琢': '玉石不经过雕琢',
      '不成器': '就不能成为器物',
      '人不学': '人不经过学习',
      '不知道': '就不懂得道理',
      '满招损': '骄傲自满会招来损失',
      '谦受益': '谦虚谨慎会得到好处',
      '富贵不能淫': '富贵不能使他的心惑乱',
      '贫贱不能移': '贫贱不能使他的节操改变',
      '威武不能屈': '威武不能使他的意志屈服',
      '此之谓大丈夫': '这才叫做大丈夫',
      '相濡以沫': '鱼儿相互吐唾沫湿润对方',
      '不如相忘于江湖': '不如彼此相忘于江湖，各自自由地游动',
      '皮之不存': '皮肤都不存在了',
      '毛将焉附': '毛发还能附着在哪里呢',
      '学': '学习了',
      '然后知不足': '然后才能知道自己的不足',
      '教': '教人了',
      '然后知困': '然后才能知道自己的困惑',
      '知不足': '知道不足',
      '然后能自反也': '然后才能自我反思',
      '知困': '知道困惑',
      '然后能自强也': '然后才能自我勉励',
      '投我以木桃': '他送我木桃',
      '报之以琼瑶': '我用美玉来报答',
      '匪报也': '这不是为了报答',
      '永以为好也': '是想永远相好',
      '知之者': '懂得它的人',
      '不如好之者': '不如喜爱它的人',
      '好之者': '喜爱它的人',
      '不如乐之者': '不如以它为乐的人',
      '老吾老': '尊敬自己的长辈',
      '以及人之老': '进而尊敬别人的长辈',
      '幼吾幼': '爱护自己的孩子',
      '以及人之幼': '进而爱护别人的孩子',
      '为学日益': '追求学问的人，知识一天比一天增加',
      '为道日损': '追求道的人，私欲一天比一天减少',
      '损之又损': '减少再减少',
      '以至于无为': '一直到达"无为"的境界',
      '无为而无不为': '无为却没有什么事情做不成',
      '饮食男女': '饮食和男女情爱',
      '人之大欲存焉': '是人们最大的欲望',
      '死亡贫苦': '死亡和贫苦',
      '人之大恶存焉': '是人们最大的厌恶',
      '昔我往矣': '回想当初出征时',
      '杨柳依依': '杨柳轻轻飘动',
      '今我来思': '如今回来的时候',
      '雨雪霏霏': '大雪纷纷扬扬',
      '三军可夺帅也': '军队的主帅可以被人夺去',
      '匹夫不可夺志也': '但一个普通人的志向却不能被人改变',
      '井蛙不可以语于海者': '不能和井里的青蛙谈论大海',
      '拘于虚也': '因为它受居住地方的限制',
      '夏虫不可以语于冰者': '不能和夏天才有的虫子谈论冰',
      '笃于时也': '因为它受生长时间的限制',
      '言之无文': '语言没有文采',
      '行而不远': '就传播不远'
    };

    return meaningMap[word] || `"${word}"的释义：${word}是古代经典中的一个词语，具体含义需要结合上下文理解。`;
  }
});
