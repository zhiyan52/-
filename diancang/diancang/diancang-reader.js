Page({
  data: {
    book: {
      id: 0,
      title: '',
      author: '',
      era: '',
      chapters: []
    },
    currentChapterIndex: 0,
    currentChapter: {},
    showChapters: false,
    showToolBar: false,
    fontSize: 28,
    theme: 'light'
  },

  onLoad: function (options) {
    const id = options.id;
    this.loadBookData(id);
  },

  // 加载书籍数据
  loadBookData: function (id) {
    // 模拟书籍数据
    const books = {
      1: {
        id: 1,
        title: '《永乐大典》',
        author: '解缙等',
        era: '明代',
        chapters: [
          {
            title: '卷一',
            content: '永乐大典，明成祖朱棣命解缙、姚广孝等主持编纂的一部大型类书。全书正文22877卷，凡例和目录60卷，装成11095册，约3.7亿字，汇集了古今图书七八千种。'
          },
          {
            title: '卷二',
            content: '永乐大典的编纂始于永乐元年（1403年），永乐六年（1408年）完成。全书按韵目编排，是中国古代最大的百科全书，被誉为"世界有史以来最大的百科全书"。'
          },
          {
            title: '卷三',
            content: '永乐大典的编纂目的是"凡书契以来经史子集百家之书，至于天文、地志、阴阳、医卜、僧道、技艺之言，备辑为一书"。'
          }
        ]
      },
      101: {
        id: 101,
        title: '《论语》',
        author: '孔子弟子及再传弟子',
        era: '春秋',
        chapters: [
          {
            title: '学而篇',
            content: '子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"'
          },
          {
            title: '为政篇',
            content: '子曰："为政以德，譬如北辰，居其所而众星共之。"'
          },
          {
            title: '八佾篇',
            content: '子曰："夷狄之有君，不如诸夏之亡也。"'
          }
        ]
      },
      201: {
        id: 201,
        title: '《周易》',
        author: '周文王',
        era: '西周',
        chapters: [
          {
            title: '乾卦',
            content: '乾：元，亨，利，贞。初九：潜龙，勿用。九二：见龙在田，利见大人。九三：君子终日乾乾，夕惕若，厉无咎。九四：或跃在渊，无咎。九五：飞龙在天，利见大人。上九：亢龙有悔。用九：见群龙无首，吉。'
          },
          {
            title: '坤卦',
            content: '坤：元，亨，利牝马之贞。君子有攸往，先迷后得，主利。西南得朋，东北丧朋。安贞吉。初六：履霜，坚冰至。六二：直方大，不习无不利。六三：含章可贞。或从王事，无成有终。六四：括囊，无咎无誉。六五：黄裳，元吉。上六：龙战于野，其血玄黄。用六：利永贞。'
          }
        ]
      }
    };

    // 获取对应ID的书籍数据
    const book = books[id] || books[101];
    this.setData({
      book: book,
      currentChapter: book.chapters[0]
    });
  },

  // 返回上一页
  goBack: function () {
    wx.navigateBack();
  },

  // 显示菜单
  showMenu: function () {
    this.setData({
      showToolBar: !this.data.showToolBar
    });
  },

  // 切换显示菜单
  toggleMenu: function () {
    this.setData({
      showToolBar: !this.data.showToolBar
    });
  },

  // 切换目录显示
  toggleChapters: function () {
    this.setData({
      showChapters: !this.data.showChapters
    });
  },

  // 选择章节
  selectChapter: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentChapterIndex: index,
      currentChapter: this.data.book.chapters[index],
      showChapters: false
    });
  },

  // 上一章
  prevChapter: function () {
    const index = this.data.currentChapterIndex;
    if (index > 0) {
      this.setData({
        currentChapterIndex: index - 1,
        currentChapter: this.data.book.chapters[index - 1]
      });
    } else {
      wx.showToast({
        title: '已经是第一章',
        icon: 'none'
      });
    }
  },

  // 下一章
  nextChapter: function () {
    const index = this.data.currentChapterIndex;
    const chapters = this.data.book.chapters;
    if (index < chapters.length - 1) {
      this.setData({
        currentChapterIndex: index + 1,
        currentChapter: chapters[index + 1]
      });
    } else {
      wx.showToast({
        title: '已经是最后一章',
        icon: 'none'
      });
    }
  },

  // 调整字体大小
  adjustFont: function () {
    wx.showActionSheet({
      itemList: ['小', '中', '大'],
      success: (res) => {
        let fontSize = 24;
        switch (res.tapIndex) {
          case 0:
            fontSize = 24;
            break;
          case 1:
            fontSize = 28;
            break;
          case 2:
            fontSize = 32;
            break;
        }
        this.setData({
          fontSize: fontSize
        });
      }
    });
  },

  // 调整主题
  adjustTheme: function () {
    wx.showActionSheet({
      itemList: ['浅色', '深色', '护眼'],
      success: (res) => {
        let theme = 'light';
        switch (res.tapIndex) {
          case 0:
            theme = 'light';
            break;
          case 1:
            theme = 'dark';
            break;
          case 2:
            theme = 'eye';
            break;
        }
        this.setData({
          theme: theme
        });
      }
    });
  }
});