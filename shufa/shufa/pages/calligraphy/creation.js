// shufa/shufa/pages/calligraphy/creation.js
Page({
  data: {
    // 轮播图数据
    swiperList: [
      {
        id: 1,
        title: '春日诗词',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/13772bd1a1123fa20a8d1c0d634a37ef.jpg?sign=53abd30c12ce479040daf7c7918c8f33&t=1776170674',
        desc: '集字创作'
      },
      {
        id: 2,
        title: '名家碑帖',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/b5e2fd8972e70119c2c60278f3efdab7.jpg?sign=05592a921aba78a0dcb447df0fb3989c&t=1776170843',
        desc: '临摹学习'
      },
      {
        id: 3,
        title: '书法艺术',
        image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/bb970afb745bf5d92737faeeb572cc8e.jpg?sign=0e2f855f8cb42d0abee8b6a03628b084&t=1776170965',
        desc: '艺术欣赏'
      }
    ],
    swiperCurrent: 0,
    inputText: '',
    selectedStyle: 'regular',
    styleOptions: [
      { id: 'regular', name: '楷书', icon: '✍️' },
      { id: 'running', name: '行书', icon: '💨' },
      { id: 'cursive', name: '草书', icon: '🎨' },
      { id: 'official', name: '隶书', icon: '📜' },
      { id: 'seal', name: '篆书', icon: '🔤' }
    ],
    templateOptions: [
      { id: 'scroll', name: '条幅', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0e79487f291b924f7a8144217a9ed24c.jpg?sign=1b526c2773b34204cb83782493789272&t=1776085321' },
      { id: 'banner', name: '横幅', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/297c2d001f43a7a2a274a2f95a6996b2.jpg?sign=a89cacf1d6807b2c88d188d287f73d60&t=1776085367' },
      { id: 'fan', name: '折扇', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7b16516c4e0584d906f8b23954ffd31c.jpg?sign=a5a6e30a7c8967c52be105ad95272435&t=1776085649' },
      { id: 'round', name: '团扇', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/60ee417d26bf85f2eb8aa01feee6e997.jpg?sign=dbee414bf11585d540eefc94e136b8ab&t=1776085512' },
      { id: 'couple', name: '对联', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9a29fa3114c26996009854c1e7724559.jpg?sign=4f07914b65104665ed8dcd3578235fcb&t=1776085753' },
      { id: 'square', name: '斗方', image: 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9f167ad341c4693acdd0428fd4a8fd3e.jpg?sign=ff0ba242118b1b492ee0077bedc6a7a2&t=1776085914' }
    ],
    selectedTemplate: 'scroll',
    sealOptions: [
      { id: 'yin1', name: '引首章', images: [
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0331a0fada5147a526aebd193534fa4d.png?sign=80eb6de219f4b6f8aa0f251ada2a0c1b&t=1776134553',
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/98d1f53f8b7cb2074d5368db3e90c152.png?sign=0c85bd1da470af7a0d09dfe6041126cc&t=1776134944',
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/c5415fd28a36ff9d2980941929ce8cab.png?sign=16504a2f07f987f37a32ff719c86b603&t=1776134996'
      ]},
      { id: 'yin2', name: '姓名章', images: [
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/119a7af6e1c9cb796ab875c67effbb24.png?sign=dcbc5ce7e5f205b5419eadb160f6e5c0&t=1776134627',
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/413d11717f8fb8edd786ba4d37e85d80.png?sign=79f9df32889546ed8d0bbdd30a26e756&t=1776134697',
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/2aa89059687293d102794cac13bc06f2.png?sign=dcda7ee56c43878334f4855e855d8001&t=1776135201'
      ]},
      { id: 'yin3', name: '闲章', images: [
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0dae8215e0a478ed2ed84d80b3f84ea4.png?sign=f2d588666973a708ab839626e3827f59&t=1776136061',
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7015b23af3b3a5f8e6f9123e066916b2.png?sign=e4eab4ace8b9185e92b1b30395157bdd&t=1776136189',
        'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/003a4d835a75460516aee824048b589d.png?sign=de2e986ff99cfafc3d26dd5c50095503&t=1776136215'
      ]}
    ],
    selectedSeal: 'yin1',
    previewImage: '',
    showPreview: false,
    imageColumns: [
      {
        title: '楷书作品',
        images: [
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/2edea9c36044efba33056d71fa94587a.jpg?sign=3be99edf52d21e578adee7d784470d55&t=1776136356',
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/e4ae8bacb2d53520531c4130524728df.jpg?sign=81bf212c3edac2ee63215a675f66b4e4&t=1776136380',
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/4842b81925f086c2729e77753c76641b.jpg?sign=ba1dbc05b261717a61ed8d2b41bebe00&t=1776136403','https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/326291ca1ab7666ab8ce2d19b4ca3b03.jpg?sign=2910ecf28e12a5206e098a58df3b840f&t=1776136446','https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/21db759253dee22871ee914ffd7e09e7.jpg?sign=eac827366b79aa3f3407c7b91d57d17a&t=1776138787'
        ]
      },
      {
        title: '行书作品',
        images: [
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/0a9b7e9ab811c58b4abf323c8c625d87.jpg?sign=7e5f5d2ef1ec578b59816d7eb85c60ba&t=1776136581',
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/2868520258a91de733630ee29a54255f.jpg?sign=ec8229f98ebf9bb9ae093549389ec95d&t=1776136604',
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/92f70c5fc0500a1da12bc068c0db2f06.jpg?sign=73957d86207605e82f5976fba434eb36&t=1776136631','https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/233d32c9572fb9828f5a04ce5b4b34d8.jpg?sign=976fe2220c20943d8a0c2b1f872f85f2&t=1776136661','https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/3ade63c158715b7128affc04cf992f29.jpg?sign=30c2cba8ce5712bc25ef51f3919a94b9&t=1776136697'
        ]
      },
      {
        title: '草书作品',
        images: [
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/fd98c0bc1f54156e4df10c5073ef4c2e.jpg?sign=8fd2d2ec893cdd826742f2db1a9550b8&t=1776137012',
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/07a909ec988820827f6951416b34f8d7.jpg?sign=75e97ac00dd6c201bcb0ace4c69e7893&t=1776137042',
          'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/9319db300ece003ab0ae4371b375ec62.jpg?sign=138c0ee8f8b3705f3638652633a5c211&t=1776137069','https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/a9e533f4a0f48bf0f18d6b02d9b8a883.jpg?sign=aea9ebf6acdcc8b3fe69f1291d5c66c5&t=1776137110','https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/a4aa97abc94a89a7744728b072c5985c.png?sign=cb7beffa6971d606be4b7d5cf03e3809&t=1776137142'
        ]
      }
    ]
  },

  onLoad() {
    this.initCreation();
  },

  initCreation() {
    console.log('初始化集字创作');
  },

  onSwiperChange(e) {
    this.setData({ swiperCurrent: e.detail.current });
  },

  handleInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  selectStyle(e) {
    const style = e.currentTarget.dataset.style;
    this.setData({ selectedStyle: style });
  },

  selectTemplate(e) {
    const template = e.currentTarget.dataset.template;
    this.setData({ selectedTemplate: template });
  },

  selectSeal(e) {
    const seal = e.currentTarget.dataset.id;
    this.setData({ selectedSeal: seal });
  },

  generateCalligraphy() {
    if (!this.data.inputText.trim()) {
      wx.showToast({ title: '请输入文字内容', icon: 'error' });
      return;
    }

    // 模拟生成书法作品
    const previewImage = 'https://636c-cloud1-8glc9jqob91870fc-1401141450.tcb.qcloud.la/shuhua/7065908c8ee948baf94da92d8a23159b.jpg?sign=fae9cc6170a0966ad9e67cb9104a82d6&t=1776081395';
    this.setData({ previewImage, showPreview: true });
  },

  saveCreation() {
    if (!this.data.previewImage) {
      wx.showToast({ title: '请先生成作品', icon: 'error' });
      return;
    }

    wx.showToast({ title: '作品已保存', icon: 'success' });
  },

  shareCreation() {
    if (!this.data.previewImage) {
      wx.showToast({ title: '请先生成作品', icon: 'error' });
      return;
    }

    wx.showToast({ title: '分享功能开发中', icon: 'none' });
  },

  closePreview() {
    this.setData({ showPreview: false });
  },

  goBack() {
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '集字坊 | 古雅文轩',
      path: '/shufa/shufa/pages/calligraphy/creation',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20calligraphy%20creation%20art&image_size=landscape_16_9'
    };
  }
});
