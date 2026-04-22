// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 文化助手系统提示词
const SYSTEM_PROMPT = `你是中国传统文化的AI助手，专注于为用户提供关于中国传统文化的知识解答。

你的专长领域包括：
1. 古建筑：故宫、天坛、颐和园、圆明园等古建筑的历史、建筑特点和文化价值
2. 非物质文化遗产：昆曲、古琴、京剧、苏绣、景德镇陶瓷等非遗项目的介绍
3. 民俗文化：传统节日（春节、中秋、端午等）的习俗和意义
4. 典藏文化：古籍文献、书法碑帖、传世名画等
5. 书画艺术：中国书法和国画的技法、名家作品欣赏

你可以：
- 解答用户关于传统文化的问题
- 智能推荐用户感兴趣的文化内容
- 生成个性化的文化学习计划
- 解读古籍名句和传统文化典故

请用简洁、有趣的方式回答问题，并适当使用Emoji增加趣味性。如果用户问题与文化无关，请礼貌地引导他们回到文化话题。`

// 云函数入口函数
exports.main = async (event, context) => {
  const { question, userId } = event

  try {
    // 调用微信云开发AI能力
    const response = await getAIResponse(question, userId)

    return {
      code: 200,
      message: '获取AI回答成功',
      data: response
    }
  } catch (error) {
    console.error('AI云函数错误:', error)
    return {
      code: 500,
      message: '服务器错误',
      error: error.message
    }
  }
}

// 调用微信云开发AI能力获取回答
async function getAIResponse(question, userId) {
  try {
    // 首先尝试使用微信云开发的AI能力
    try {
      // 检查是否有可用的AI能力
      const result = await cloud.callFunction({
        name: 'ai',
        data: {
          action: 'chat',
          question: question,
          systemPrompt: SYSTEM_PROMPT
        }
      })

      if (result && result.result && result.result.answer) {
        const answer = result.result.answer
        const actions = generateActions(question, answer)
        return {
          answer: answer,
          actions: actions,
          timestamp: new Date().toISOString()
        }
      }
    } catch (aiError) {
      console.log('微信云AI能力不可用，使用本地智能问答系统:', aiError)
    }

    // 如果微信云AI能力不可用，使用本地智能问答系统
    const answer = generateCulturalAnswer(question)
    const actions = generateActions(question, answer)

    return {
      answer: answer,
      actions: actions,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('AI调用错误:', error)

    // 如果出错，返回友好错误信息
    return {
      answer: '抱歉，AI助手暂时无法回答您的问题。请稍后再试，或者您可以尝试问一些关于古建筑、非遗文化、民俗等方面的问题。',
      actions: [
        { text: '了解古建筑', action: 'ask', question: '什么是中国古建筑？' },
        { text: '了解非遗文化', action: 'ask', question: '什么是非物质文化遗产？' },
        { text: '制定学习计划', action: 'ask', question: '如何制定文化学习计划？' }
      ],
      timestamp: new Date().toISOString()
    }
  }
}

// 生成文化相关的回答（模拟）
function generateCulturalAnswer(question) {
  const lowerQuestion = question.toLowerCase()

  // 基于问题内容生成智能回答
  if (lowerQuestion.includes('天坛')) {
    return '天坛位于中国北京市东城区，是明清两代皇帝祭天、祈求五谷丰登的场所。它始建于明永乐十八年（1420年），是中国现存最大的古代祭祀性建筑群。天坛的主要建筑包括圜丘坛、祈年殿、皇穹宇等，以其独特的建筑风格和深厚的文化内涵而闻名于世。1998年，天坛被联合国教科文组织列入《世界遗产名录》。'
  } else if (lowerQuestion.includes('故宫') || lowerQuestion.includes('紫禁城')) {
    return '故宫，又称紫禁城，位于中国北京市中心，是明清两代的皇家宫殿。它始建于明永乐四年（1406年），永乐十八年（1420年）建成，是世界上现存规模最大、保存最为完整的木质结构古建筑之一。故宫占地面积约72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。1987年，故宫被联合国教科文组织列入《世界遗产名录》。'
  } else if (lowerQuestion.includes('颐和园')) {
    return '颐和园位于中国北京市海淀区，是中国现存规模最大、保存最完整的皇家园林。它始建于清朝乾隆年间（1750年），原名清漪园，后在光绪年间（1888年）重建并改名为颐和园。颐和园占地面积约290公顷，主要由万寿山和昆明湖组成，有各种宫殿、园林建筑3000余间。1998年，颐和园被联合国教科文组织列入《世界遗产名录》。'
  } else if (lowerQuestion.includes('古建筑') || lowerQuestion.includes('古建')) {
    return '中国古建筑是指中国古代劳动人民创造的具有独特风格的建筑体系，以木结构为主，讲究对称、和谐和与自然的融合。常见的类型包括宫殿、寺庙、园林、民居等。例如故宫的太和殿、天坛的祈年殿都是中国古建筑的杰出代表。这些建筑不仅是实用的空间，更是中国传统文化的重要载体，体现了中国人的审美观念和哲学思想。'
  } else if (lowerQuestion.includes('非遗') || lowerQuestion.includes('非物质文化遗产')) {
    return '非物质文化遗产是指各族人民世代相传并视为其文化遗产组成部分的各种传统文化表现形式，以及与传统文化表现形式相关的实物和场所。中国的非遗项目非常丰富，包括昆曲、京剧、书法、剪纸、刺绣、陶瓷等。这些非遗项目是中华民族智慧的结晶，承载着历史记忆和文化认同，需要我们共同保护和传承。'
  } else if (lowerQuestion.includes('民俗') || lowerQuestion.includes('传统节日')) {
    return '中国传统节日是中华民族文化的重要组成部分，每个节日都有其独特的起源和习俗。例如春节是中国最重要的传统节日，人们会贴春联、放鞭炮、吃团圆饭；中秋节则是团圆的节日，人们会赏月、吃月饼；端午节则有赛龙舟、吃粽子的习俗。这些传统节日不仅是家人团聚的时刻，也是传承传统文化的重要载体。'
  } else if (lowerQuestion.includes('典藏') || lowerQuestion.includes('文物')) {
    return '中国的典藏文物是中华民族的宝贵财富，包括古籍文献、书法碑帖、传世名画、青铜器、陶瓷等。例如《永乐大典》是中国古代最大的百科全书，《清明上河图》则生动描绘了北宋都城的繁华景象。这些文物不仅具有艺术价值，更是研究中国历史文化的重要资料，需要我们精心保护和研究。'
  } else if (lowerQuestion.includes('书画') || lowerQuestion.includes('书法') || lowerQuestion.includes('国画')) {
    return '中国书画艺术是中华民族特有的艺术形式，有着悠久的历史和独特的审美价值。书法讲究用笔、结构和章法，常见的书体有篆书、隶书、楷书、行书和草书。国画则注重意境和笔墨，题材包括山水、花鸟、人物等。王羲之、颜真卿、齐白石等都是中国书画史上的杰出代表，他们的作品至今仍被人们所珍视。'
  } else if (lowerQuestion.includes('学习计划') || lowerQuestion.includes('计划')) {
    return '制定文化学习计划可以从以下几个方面入手：\n1. 确定学习目标：明确你想了解的文化领域\n2. 制定时间安排：合理分配学习时间\n3. 选择学习资源：书籍、博物馆、线上课程等\n4. 实践体验：参观文化景点、参加文化活动\n5. 记录与分享：写学习笔记，与他人交流\n\n例如，如果你对古建筑感兴趣，可以先学习基本理论，然后参观当地的古建筑，最后尝试绘制建筑草图，这样可以更深入地理解古建筑文化。'
  } else if (lowerQuestion.includes('古籍') || lowerQuestion.includes('名句')) {
    return '中国古籍中蕴含着丰富的智慧和哲理，许多名句至今仍被人们引用。例如"天行健，君子以自强不息"出自《周易》，鼓励人们要像天体运行一样刚健有力，不断自我提升；"己所不欲，勿施于人"出自《论语》，强调待人接物的基本原则；"海内存知己，天涯若比邻"出自王勃的《送杜少府之任蜀州》，表达了友情的珍贵。这些名句不仅语言优美，更传递了深刻的人生哲理。'
  } else if (lowerQuestion.includes('在哪') || lowerQuestion.includes('位置') || lowerQuestion.includes('地址')) {
    return '你询问的是哪个文化景点的位置呢？我可以为你提供关于故宫、天坛、颐和园、长城等著名文化景点的位置信息。例如，故宫位于北京市中心，天坛位于北京市东城区，颐和园位于北京市海淀区。'
  } else {
    return '你好！我是中国传统文化的AI助手，很高兴为你解答关于中国传统文化的问题。你可以问我关于古建筑、非物质文化遗产、民俗文化、典藏文物、书画艺术等方面的问题，我会为你提供详细而有趣的回答。例如，你可以问"什么是中国古建筑？"、"非物质文化遗产有哪些类别？"或者"如何制定文化学习计划？"等问题。'
  }
}

// 根据问题类型生成推荐动作
function generateActions(question, answer) {
  const actions = []
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('古建筑') || lowerQuestion.includes('古建')) {
    actions.push(
      { text: '查看古建雅韵模块', action: 'navigate', url: '/gujian/home/home' },
      { text: '了解更多古建筑知识', action: 'ask', question: '中国古建筑的主要结构类型有哪些？' }
    )
  } else if (lowerQuestion.includes('非遗') || lowerQuestion.includes('非物质文化遗产')) {
    actions.push(
      { text: '查看非遗匠心模块', action: 'navigate', url: '/pages/feiyi/pages/index/index' },
      { text: '了解具体的非遗项目', action: 'ask', question: '中国有哪些著名的非物质文化遗产？' }
    )
  } else if (lowerQuestion.includes('学习计划') || lowerQuestion.includes('计划')) {
    actions.push(
      { text: '调整学习计划', action: 'ask', question: '如何根据我的兴趣调整学习计划？' },
      { text: '查看模块总览', action: 'navigate', url: '/moudules/modules/modules' }
    )
  } else if (lowerQuestion.includes('民俗') || lowerQuestion.includes('传统节日')) {
    actions.push(
      { text: '查看民俗百味模块', action: 'navigate', url: '/mingsu/mingsu/mingsu' },
      { text: '了解具体节日习俗', action: 'ask', question: '春节有哪些传统习俗？' }
    )
  } else if (lowerQuestion.includes('典藏') || lowerQuestion.includes('文物')) {
    actions.push(
      { text: '查看典藏拾珠模块', action: 'navigate', url: '/diancang/diancang/diancang' },
      { text: '了解更多文物知识', action: 'ask', question: '《永乐大典》的历史价值是什么？' }
    )
  } else if (lowerQuestion.includes('书画') || lowerQuestion.includes('书法') || lowerQuestion.includes('国画')) {
    actions.push(
      { text: '查看书画雅集模块', action: 'navigate', url: '/shuhua/shuhua/shuhua' },
      { text: '了解书法知识', action: 'ask', question: '王羲之的《兰亭集序》有什么特别之处？' }
    )
  } else {
    // 默认推荐
    actions.push(
      { text: '了解古建筑', action: 'ask', question: '什么是中国古建筑？' },
      { text: '了解非遗文化', action: 'ask', question: '什么是非物质文化遗产？' },
      { text: '制定学习计划', action: 'ask', question: '如何制定文化学习计划？' }
    )
  }

  return actions
}