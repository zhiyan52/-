// 智能导览页面 - 非遗技艺全流程学习
Page({
  data: {
    categories: ["剪纸", "宣纸", "刺绣", "皮影"],
    currentCategory: "剪纸",
    isLoading: false,
    processData: null,
    aiQuestion: "",
    aiResponse: "",
    // 本地非遗技艺工序数据
    processDatabase: {
      "剪纸": {
        steps: [
          {
            title: "起稿",
            description: "在纸上画出要剪的图案，可以使用铅笔轻轻勾勒，便于修改。",
            tips: "起稿时要注意线条的流畅性，关键部位要画清楚"
          },
          {
            title: "折叠",
            description: "根据图案的对称性，将纸张折叠成合适的层数。",
            tips: "折叠时要整齐，确保剪出来的图案对称"
          },
          {
            title: "剪刻",
            description: "使用剪刀或刻刀按照图案进行剪刻，先剪内部细节，再剪外部轮廓。",
            tips: "剪刻时要保持手稳，用力均匀，转弯处要小心"
          },
          {
            title: "展开",
            description: "小心展开剪好的纸张，整理平整。",
            tips: "展开时要轻柔，避免撕坏纸张"
          },
          {
            title: "装裱",
            description: "将剪好的作品装裱起来，便于保存和展示。",
            tips: "装裱时要保持作品平整，避免褶皱"
          }
        ],
        history: "剪纸是中国最古老的民间艺术之一，起源于西汉时期，发展于南北朝，兴盛于明清。最初用于宗教仪式，后来逐渐成为民间装饰艺术。",
        quote: "剪纸不仅是一种技艺，更是一种文化传承。每一刀都蕴含着对生活的热爱和对美的追求。 - 剪纸大师 张老师"
      },
      "宣纸": {
        steps: [
          {
            title: "选料",
            description: "选择优质的青檀树皮和沙田稻草作为原料。",
            tips: "原料的质量直接影响宣纸的品质，要选择纤维长、韧性好的材料"
          },
          {
            title: "蒸煮",
            description: "将原料放入锅中蒸煮，去除杂质，软化纤维。",
            tips: "蒸煮时间要控制好，过长会破坏纤维，过短则杂质去除不彻底"
          },
          {
            title: "打浆",
            description: "将蒸煮后的原料打成纸浆，加入适量的水和胶料。",
            tips: "打浆要均匀，确保纤维充分分散"
          },
          {
            title: "抄纸",
            description: "用竹帘将纸浆抄起，形成湿纸。",
            tips: "抄纸时要手法均匀，确保纸张厚度一致"
          },
          {
            title: "压榨",
            description: "将湿纸压榨脱水。",
            tips: "压榨要适度，避免过度压榨破坏纸张结构"
          },
          {
            title: "烘干",
            description: "将压干的纸张烘干。",
            tips: "烘干温度要控制好，避免纸张变形"
          },
          {
            title: "整理",
            description: "将烘干的纸张整理、切割成标准尺寸。",
            tips: "整理时要保持纸张平整，避免褶皱"
          }
        ],
        history: "宣纸起源于唐代宣州（今安徽宣城），故名宣纸。自唐代以来，一直是中国书画的首选用纸，有'纸中之王'的美誉。",
        quote: "宣纸的制作是天地人合一的过程，每一张纸都凝聚着匠人的心血和智慧。 - 宣纸制作大师 李师傅"
      },
      "刺绣": {
        steps: [
          {
            title: "选料",
            description: "选择合适的底料和丝线。",
            tips: "底料要选择质地均匀、韧性好的面料，丝线要颜色鲜艳、光泽度高"
          },
          {
            title: "描图",
            description: "将图案描在底料上。",
            tips: "描图时要线条清晰，位置准确"
          },
          {
            title: "配线",
            description: "根据图案选择合适颜色的丝线。",
            tips: "配线要考虑整体色调的协调，突出主题"
          },
          {
            title: "刺绣",
            description: "按照图案进行刺绣，运用不同的针法表现不同的效果。",
            tips: "刺绣时要针法熟练，线条流畅，色彩过渡自然"
          },
          {
            title: "整理",
            description: "完成刺绣后，整理作品，去除多余的线头。",
            tips: "整理时要小心，避免损坏绣面"
          }
        ],
        history: "中国刺绣历史悠久，起源于新石器时代，发展于商周，兴盛于明清。四大名绣（苏绣、湘绣、粤绣、蜀绣）各具特色。",
        quote: "刺绣是用针线在布上作画，每一针每一线都承载着绣娘的情感和技艺。 - 刺绣大师 王师傅"
      },
      "皮影": {
        steps: [
          {
            title: "选皮",
            description: "选择优质的牛皮或驴皮。",
            tips: "要选择厚度均匀、质地坚韧的皮革"
          },
          {
            title: "制皮",
            description: "将皮革浸泡、刮薄、晾干。",
            tips: "制皮要均匀，厚度适中，便于雕刻"
          },
          {
            title: "画稿",
            description: "在皮革上画出皮影的图案。",
            tips: "画稿要线条清晰，比例准确"
          },
          {
            title: "雕刻",
            description: "按照画稿雕刻皮影。",
            tips: "雕刻时要手法精细，特别是面部表情和服饰细节"
          },
          {
            title: "上色",
            description: "给雕刻好的皮影上色。",
            tips: "上色要鲜艳，对比强烈，符合传统审美"
          },
          {
            title: "装订",
            description: "将皮影的各个部分装订起来，安装操纵杆。",
            tips: "装订要牢固，确保皮影能够灵活活动"
          }
        ],
        history: "皮影戏起源于西汉，兴盛于宋代，是中国民间传统戏剧形式之一。通过灯光照射皮影，在幕布上形成影像进行表演。",
        quote: "皮影戏是光与影的艺术，每一个皮影都有自己的灵魂和故事。 - 皮影制作大师 陈师傅"
      }
    }
  },

  onLoad() {
    // 加载默认品类的工序数据
    this.loadProcessData(this.data.currentCategory);
  },

  onCategoryChange(e) {
    const category = this.data.categories[e.detail.value];
    this.setData({
      currentCategory: category,
      aiResponse: "",
      aiQuestion: ""
    }, () => {
      this.loadProcessData(category);
    });
  },

  loadProcessData(category) {
    this.setData({ isLoading: true });

    // 从本地数据库加载工序数据
    setTimeout(() => {
      const processData = this.data.processDatabase[category];
      this.setData({
        processData: processData,
        isLoading: false
      });
    }, 500);
  },

  onAIQuestionInput(e) {
    this.setData({
      aiQuestion: e.detail.value
    });
  },

  getAIInsight() {
    const question = this.data.aiQuestion.trim();
    if (!question) {
      wx.showToast({
        title: '请输入您的问题',
        icon: 'none'
      });
      return;
    }

    this.setData({ isLoading: true });

    // 调用 DeepSeek API 获取 AI 讲解
    this.callDeepSeekAI(question).then(response => {
      this.setData({
        aiResponse: response,
        isLoading: false
      });
    }).catch(error => {
      this.setData({ isLoading: false });
      wx.showToast({
        title: '获取讲解失败，请重试',
        icon: 'none'
      });
      console.error('AI 调用失败:', error);
    });
  },

  callDeepSeekAI(question) {
    return new Promise((resolve, reject) => {
      // 模拟 DeepSeek API 调用
      // 实际项目中，这里应该调用真实的 DeepSeek API
      setTimeout(() => {
        const category = this.data.currentCategory;
        const insights = {
          "剪纸": {
            "如何选择剪纸的纸张": "选择剪纸纸张时，应选择质地坚韧、薄厚适中的纸张，如大红纸、宣纸或特种剪纸纸。纸张太脆容易断裂，太厚则不易剪刻。最好选择颜色鲜艳、有一定韧性的纸张。",
            "剪纸有哪些常见的针法": "剪纸的常见针法包括：阳刻（保留图案线条，刻去背景）、阴刻（刻去图案线条，保留背景）、阴阳结合刻（阳刻和阴刻相结合）、折叠刻（通过折叠纸张一次剪刻出多个相同图案）等。",
            "如何保存剪纸作品": "保存剪纸作品时，应避免阳光直射，防止褪色；保持干燥，避免潮湿；可以用宣纸或专业装裱材料装裱，放入镜框中保存；避免折叠和挤压，防止损坏。"
          },
          "宣纸": {
            "宣纸和普通纸有什么区别": "宣纸与普通纸的主要区别在于原料和制作工艺。宣纸使用青檀树皮和沙田稻草为原料，经过复杂的传统工艺制作而成，具有柔韧性好、吸墨性强、耐久性长等特点，适合书画创作。普通纸则多使用木浆，工艺简单，性能较差。",
            "宣纸的等级如何划分": "宣纸按质量分为特净、净皮、棉料三个等级。特净是最好的，原料中青檀树皮比例最高；净皮次之；棉料则稻草比例较高。按规格分为三尺、四尺、五尺、六尺、八尺等。",
            "如何辨别宣纸的真伪": "辨别宣纸真伪可以从以下几点入手：看色泽（正品宣纸颜色自然，有光泽）、摸手感（质地柔软，有韧性）、听声音（抖动时声音清脆）、测试吸墨性（吸墨均匀，不洇墨）、查看标识（正品宣纸有明确的品牌和产地标识）。"
          },
          "刺绣": {
            "刺绣有哪些常见的针法": "刺绣常见的针法包括：平针、套针、扎针、长短针、打子针、盘金绣、锁边绣等。不同的针法适用于不同的图案和效果，如平针适合大面积填充，套针适合表现色彩过渡，打子针适合表现点缀效果。",
            "如何选择刺绣的丝线": "选择刺绣丝线时，应考虑丝线的材质（如桑蚕丝、棉线、丝线等）、颜色（要与底料协调）、粗细（根据图案的大小和细节选择）。优质的丝线光泽度好，韧性强，不易断。",
            "刺绣时如何避免线头": "避免线头的方法：起针时将线头藏在底料背面；绣制过程中保持线的张力均匀；结束时将线头藏在绣线下面；使用专门的刺绣剪刀修剪线头，保持绣面整洁。"
          },
          "皮影": {
            "皮影的制作材料有哪些": "传统皮影主要使用牛皮或驴皮制作，因为这些皮革质地坚韧，透明度好，适合雕刻。现在也有使用羊皮、猪皮等材料的。选择皮革时要注意厚度均匀，没有疤痕。",
            "皮影戏的表演技巧": "皮影戏表演需要掌握以下技巧：操纵杆的灵活运用，控制皮影的动作；配合灯光和音乐，营造氛围；通过皮影的动作和表情表现角色的性格和情绪；掌握不同场景的切换技巧。",
            "皮影如何保养": "皮影的保养要注意：避免阳光直射，防止褪色；保持干燥，避免潮湿和虫蛀；存放时要平放在阴凉干燥处，避免折叠；定期检查，发现问题及时修复；表演时要轻拿轻放，避免损坏。"
          }
        };

        // 查找对应的回答
        let response = "抱歉，我无法回答这个问题。您可以尝试询问关于" + this.data.currentCategory + "的具体制作工艺或历史文化相关问题。";

        if (insights[category]) {
          for (let key in insights[category]) {
            if (question.includes(key)) {
              response = insights[category][key];
              break;
            }
          }
        }

        resolve(response);
      }, 1000);
    });
  }
});
