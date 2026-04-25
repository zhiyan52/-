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
        craftsman: '王老艺人',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/paper-cut1.png',
        history: '蔚县剪纸是河北省蔚县的传统民间艺术，起源于明代，至今已有500多年历史。它以刀刻为主，色彩艳丽，构图饱满，题材广泛，包括花卉、鸟兽、人物、戏曲故事等。蔚县剪纸在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '起稿',
            desc: '根据题材内容，用铅笔在纸上画出图案轮廓，要求线条流畅，构图合理。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process1.png'
          },
          {
            step: '剪刻',
            desc: '将画好的图案放在宣纸上，用刻刀或剪刀进行剪刻，要求刀法熟练，线条细腻。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process2.png'
          },
          {
            step: '染色',
            desc: '将剪刻好的作品放在染色盘上，用毛笔蘸取颜料进行染色，要求色彩鲜艳，层次分明。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process3.png'
          },
          {
            step: '装裱',
            desc: '将染色完成的作品进行装裱，使其更加美观，便于保存和展示。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process4.png'
          }
        ],
        value: '蔚县剪纸具有重要的文化价值，它不仅是一种民间艺术形式，更是中华民族优秀传统文化的重要组成部分。它反映了劳动人民的生活情趣和审美观念，具有浓郁的地方特色和民族风格。目前，蔚县剪纸正面临着传承和发展的挑战，需要更多的人关注和保护。'
      },
      4: {
        id: 4,
        title: '苏绣',
        category: '刺绣',
        craftsman: '张大师',
        era: '现代',
        image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/embroidery1.png',
        history: '苏绣是苏州地区的传统刺绣工艺，起源于三国时期，至今已有1700多年历史。它以精细、雅洁著称，被誉为"东方明珠"。苏绣在2006年被列入第一批国家级非物质文化遗产名录。',
        process: [
          {
            step: '设计',
            desc: '根据题材内容，设计刺绣图案，要求构图合理，色彩协调。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process1.png'
          },
          {
            step: '配线',
            desc: '根据设计图案，选择合适的丝线，要求色彩鲜艳，质地优良。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process2.png'
          },
          {
            step: '刺绣',
            desc: '用针将丝线在绣料上穿刺，以缝迹构成花纹，要求针法熟练，线条细腻。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process3.png'
          },
          {
            step: '装裱',
            desc: '将刺绣完成的作品进行装裱，使其更加美观，便于保存和展示。',
            image: 'cloud://cloud1-8glc9jqob91870fc.636c-cloud1-8glc9jqob91870fc-1401141450/traditional/fine-art/process4.png'
          }
        ],
        value: '苏绣具有重要的文化价值，它不仅是一种传统工艺，更是中华民族优秀传统文化的重要组成部分。它反映了劳动人民的智慧和创造力，具有浓郁的地方特色和民族风格。目前，苏绣正面临着传承和发展的挑战，需要更多的人关注和保护。'
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