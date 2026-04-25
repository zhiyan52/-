const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router');
const axios = require('axios');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// 经典古文题目库
const classicalTexts = [
  { name: '《论语》', source: '论语', difficulty: '基础' },
  { name: '《道德经》', source: '道德经', difficulty: '基础' },
  { name: '《诗经》', source: '诗经', difficulty: '基础' },
  { name: '《孟子》', source: '孟子', difficulty: '中等' },
  { name: '《庄子》', source: '庄子', difficulty: '中等' },
  { name: '《左传》', source: '左传', difficulty: '中等' },
  { name: '《礼记》', source: '礼记', difficulty: '中等' },
  { name: '《尚书》', source: '尚书', difficulty: '较难' },
  { name: '《大学》', source: '大学', difficulty: '基础' },
  { name: '《中庸》', source: '中庸', difficulty: '中等' },
  { name: '《荀子》', source: '荀子', difficulty: '较难' },
  { name: '《墨子》', source: '墨子', difficulty: '较难' },
  { name: '《楚辞》', source: '楚辞', difficulty: '较难' },
  { name: '《战国策》', source: '战国策', difficulty: '中等' },
  { name: '《吕氏春秋》', source: '吕氏春秋', difficulty: '较难' }
];

exports.main = async (event, context) => {
  const router = new TcbRouter({ event });

  // 生成题目
  router.use(async (ctx, next) => {
    ctx.body = await generateQuestion();
    await next();
  });

  return router.exec();
};

// 随机选择经典文本
function selectRandomText() {
  const index = Math.floor(Math.random() * classicalTexts.length);
  return classicalTexts[index];
}

// 随机生成错误选项
function generateWrongOptions(correctAnswers, count = 3) {
  const allOptions = [];
  const classicalQuotes = [
    '学而时习之', '温故知新', '学而不思则罔', '思而不学则殆',
    '三人行', '必有我师', '见贤思齐', '不耻下问',
    '知之者不如好之者', '好之者不如乐之者',
    '己所不欲', '勿施于人', '成人之美', '与人为善',
    '富贵不能淫', '贫贱不能移', '威武不能屈',
    '天将降大任于斯人', '必先苦其心志', '劳其筋骨',
    '上善若水', '水善利万物而不争',
    '道可道', '非常道', '名可名', '非常名',
    '相濡以沫', '不如相忘于江湖',
    '井蛙不可以语海', '夏虫不可以语冰',
    '北冥有鱼', '其名为鲲', '鲲之大', '不知其几千里',
    '满招损', '谦受益', '戒骄戒躁',
    '玉不琢不成器', '人不学不知义',
    '投我以木桃', '报之以琼瑶', '永以为好',
    '关关雎鸠', '在河之洲', '窈窕淑女', '君子好逑',
    '桃之夭夭', '灼灼其华', '之子于归', '宜其室家',
    '蒹葭苍苍', '白露为霜', '所谓伊人', '在水一方',
    '昔我往矣', '杨柳依依', '今我来思', '雨雪霏霏',
    '知之为知之', '不知为不知', '是知也',
    '学而不厌', '诲人不倦', '因材施教', '循循善诱',
    '三军可夺帅', '匹夫不可夺志',
    '君子坦荡荡', '小人长戚戚',
    '逝者如斯夫', '不舍昼夜',
    '不积跬步', '无以至千里', '不积小流', '无以成江海'
  ];

  // 过滤掉正确答案
  const availableOptions = classicalQuotes.filter(q => !correctAnswers.includes(q));

  // 随机选择
  while (allOptions.length < count && availableOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableOptions.length);
    const option = availableOptions.splice(randomIndex, 1)[0];
    if (option) allOptions.push(option);
  }

  // 如果还不够，随机生成一些
  while (allOptions.length < count) {
    allOptions.push(`错误选项${allOptions.length + 1}`);
  }

  return allOptions;
}

// 生成题目
async function generateQuestion() {
  try {
    // 随机选择文本
    const selectedText = selectRandomText();

    // 调用DeepSeek API
    const prompt = `请为以下经典文本生成一道古文填空题目。

经典文本：《${selectedText.name}》
要求：
1. 题目格式为JSON，包含以下字段：
   - source: 来源（如《论语》）
   - content: 内容数组，包含type为'text'或'blank'的对象
   - options: 选项数组，包含正确答案和3个错误选项
   - explanation: 解析说明

2. content格式示例：
   [
     { "type": "text", "text": "子曰：" },
     { "type": "blank", "index": 0, "correct": "学而时习之" },
     { "type": "text", "text": "，不亦说乎？" }
   ]

3. 选项应包含4个经典古文短语，1个正确，3个错误

4. 请只返回JSON格式，不要有其他内容

请生成题目：`;

    const aiResult = await cloud.callAI({
      model: 'deepseek',
      messages: [
        { role: 'system', content: '你是一位专业的中国古代文学专家，擅长生成古文填空题目。你的任务是根据给定的经典文本，生成格式正确的JSON格式古文填空题目。请确保题目准确、解析详细。' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    // 解析AI返回的结果
    let questionData;
    try {
      const jsonMatch = aiResult.result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        questionData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('无法解析AI返回结果');
      }
    } catch (parseError) {
      // 如果解析失败，使用默认题目
      return generateFallbackQuestion(selectedText);
    }

    // 验证题目格式
    if (!questionData.source || !questionData.content || !questionData.options || !questionData.explanation) {
      return generateFallbackQuestion(selectedText);
    }

    // 确保有4个选项
    const correctAnswers = questionData.content
      .filter(item => item.type === 'blank')
      .map(item => item.correct);

    if (questionData.options.length < 4) {
      const wrongOptions = generateWrongOptions(correctAnswers, 4 - questionData.options.length);
      questionData.options = [...questionData.options, ...wrongOptions];
    }

    // 打乱选项顺序
    questionData.options = shuffleArray(questionData.options);

    // 添加题目ID
    questionData.id = Date.now();

    return {
      success: true,
      question: questionData
    };

  } catch (error) {
    console.error('生成题目失败：', error);
    return generateFallbackQuestion(selectRandomText());
  }
}

// 生成备用题目（当AI生成失败时）
function generateFallbackQuestion(selectedText) {
  const fallbackQuestions = [
    {
      id: Date.now(),
      source: selectedText.name,
      content: [
        { type: 'text', text: '子曰：学而时习之，' },
        { type: 'blank', index: 0, correct: '不亦说乎' },
        { type: 'text', text: '？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？' }
      ],
      options: ['不亦说乎', '不亦乐乎', '不亦君子乎', '不亦悲乎'],
      explanation: `这句话出自《论语·学而》，是孔子关于学习和交友的名言。`
    },
    {
      id: Date.now(),
      source: selectedText.name,
      content: [
        { type: 'text', text: '上善若水，水善利万物而不争，' },
        { type: 'blank', index: 0, correct: '处众人之所恶' },
        { type: 'text', text: '，故几于道。' }
      ],
      options: ['处众人之所恶', '水善利万物', '为而不争', '上善若水'],
      explanation: `这句话出自《道德经》第八章，表达了老子"无为"的思想。`
    }
  ];

  return {
    success: true,
    question: fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
  };
}

// 打乱数组顺序
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
