 // pages/craftsmanship/craftsmanship.js
Page({
  data: {
    currentProjectIndex: 0,
    currentStepIndex: 0,
    isAnimating: false,
    progressPercent: 0,
    
    // 非遗项目数据
    projects: [
      {
        id: 'paper-cutting',
        name: '剪纸',
        icon: '/images/craft/paper-cutting-icon.png',
        cover: '/images/craft/paper-cutting-cover.jpg',
        description: '中国剪纸是一种用剪刀或刻刀在纸上剪刻花纹，用于装点生活或配合其他民俗活动的民间艺术。',
        steps: [
          {
            name: '选纸备料',
            description: '选用质地柔韧、色泽纯正的宣纸或红纸，根据作品大小裁切合适尺寸。纸张厚度以0.1-0.2mm为宜，太薄易破，太厚难剪。',
            image: '/images/craft/paper-cutting/step1.jpg',
            isKeyStep: false
          },
          {
            name: '起稿构图',
            description: '在纸上轻轻勾勒出图案轮廓，确定对称轴线。传统剪纸讲究"图必有意，意必吉祥"，常见题材有花鸟鱼虫、福禄寿喜。',
            image: '/images/craft/paper-cutting/step2.jpg',
            isKeyStep: false
          },
          {
            name: '折叠定位',
            description: '将纸张沿对称轴折叠，多层叠加一次剪出重复图案。折叠次数根据图案复杂度决定，一般为2-8层。',
            image: '/images/craft/paper-cutting/step3.jpg',
            isKeyStep: false
          },
          {
            name: '起刀下剪',
            description: '剪刀从图案中心或边缘开始，先剪内部镂空部分，再剪外轮廓。起刀要稳，刀尖先刺入纸面，再顺势推进。',
            image: '/images/craft/paper-cutting/step4.jpg',
            isKeyStep: true,
            detailTitle: '起刀细节：毫厘之间的精准',
            detailImages: [
              '/images/craft/paper-cutting/detail1.jpg',
              '/images/craft/paper-cutting/detail2.jpg',
              '/images/craft/paper-cutting/detail3.jpg'
            ],
            detailDescription: '起刀时剪刀与纸面呈45度角，刀尖先轻刺入纸面约1mm，确认位置无误后顺势推进。关键要领：手腕悬空，仅用手指力量控制剪刀开合，确保线条流畅不断。'
          },
          {
            name: '镂空剪刻',
            description: '用剪刀尖在图案内部剪出月牙纹、锯齿纹、水滴纹等装饰纹样。这是剪纸最具特色的技法，需要极强的手眼协调能力。',
            image: '/images/craft/paper-cutting/step5.jpg',
            isKeyStep: true,
            detailTitle: '镂空技法：锯齿纹的剪法',
            detailImages: [
              '/images/craft/paper-cutting/detail4.jpg',
              '/images/craft/paper-cutting/detail5.jpg'
            ],
            detailDescription: '锯齿纹剪法：剪刀尖刺入纸面后，以1-2mm间距连续剪出三角形缺口。要求每个锯齿大小均匀，间距一致，整体呈现流畅的波浪状。高手可在1cm宽度内剪出20个以上的锯齿。'
          },
          {
            name: '修整外轮廓',
            description: '沿外轮廓线剪去多余部分，保持线条流畅圆润。外轮廓决定作品的整体造型，必须一气呵成，避免反复修补。',
            image: '/images/craft/paper-cutting/step6.jpg',
            isKeyStep: false
          },
          {
            name: '展开整形',
            description: '小心展开折叠的纸张，用镊子轻压平整。检查各层是否对齐，如有错位需用剪刀微调修正。',
            image: '/images/craft/paper-cutting/step7.jpg',
            isKeyStep: false
          },
          {
            name: '装裱保存',
            description: '将完成的剪纸作品衬以白纸或色纸，装框或粘贴于窗棂、灯笼上。注意避光防潮，以延长保存时间。',
            image: '/images/craft/paper-cutting/step8.jpg',
            isKeyStep: false
          }
        ]
      },
      {
        id: 'embroidery',
        name: '刺绣',
        icon: '/images/craft/embroidery-icon.png',
        cover: '/images/craft/embroidery-cover.jpg',
        description: '刺绣是针线在织物上绣制的各种装饰图案的总称，是中国民间传统手工艺之一，至少有二三千年历史。',
        steps: [
          {
            name: '选料绷框',
            description: '选择真丝、缎面或棉布作为底布，用绣绷将布料绷紧固定。绷框松紧度以手指轻弹布料发出清脆声响为宜。',
            image: '/images/craft/embroidery/step1.jpg',
            isKeyStep: false
          },
          {
            name: '配线选色',
            description: '根据图案需要选择丝线颜色。传统苏绣常用"劈丝"技法，将一根丝线劈成1/2、1/4、1/8甚至1/16细度，以适应不同部位的精细程度。',
            image: '/images/craft/embroidery/step2.jpg',
            isKeyStep: false
          },
          {
            name: '劈线分丝',
            description: '将丝线一端润湿，用手指捻开，逐根分离。劈线越细，绣出的图案越精致，但难度也越大。',
            image: '/images/craft/embroidery/step3.jpg',
            isKeyStep: true,
            detailTitle: '劈线绝技：一根丝线十六分',
            detailImages: [
              '/images/craft/embroidery/detail1.jpg',
              '/images/craft/embroidery/detail2.jpg',
              '/images/craft/embroidery/detail3.jpg'
            ],
            detailDescription: '劈线时先将丝线一端在舌尖轻抿湿润，然后用指甲将线头捻开成扇形，再逐根分离。一根丝线通常由16根细丝组成，高手可劈至1/32，绣出的花瓣薄如蝉翼，近乎透明。'
          },
          {
            name: '穿针引线',
            description: '将劈好的丝线穿入绣花针，线尾打结固定。针号根据丝线粗细选择，细线用9-11号针，粗线用5-7号针。',
            image: '/images/craft/embroidery/step4.jpg',
            isKeyStep: false
          },
          {
            name: '起针定线',
            description: '从图案背面起针，线尾打结藏于布底。起针位置要准确，避免在正面留下线头痕迹。',
            image: '/images/craft/embroidery/step5.jpg',
            isKeyStep: false
          },
          {
            name: '平绣铺底',
            description: '用平针绣铺满图案底色，针脚间距均匀，排列整齐。平绣是基础针法，要求针脚长短一致，拉线力度均匀。',
            image: '/images/craft/embroidery/step6.jpg',
            isKeyStep: false
          },
          {
            name: '套针渐变',
            description: '用套针技法表现色彩渐变效果。后一针压在前一针的1/2或1/3处，形成自然的过渡层次。',
            image: '/images/craft/embroidery/step7.jpg',
            isKeyStep: true,
            detailTitle: '套针渐变：色彩的丝滑过渡',
            detailImages: [
              '/images/craft/embroidery/detail4.jpg',
              '/images/craft/embroidery/detail5.jpg'
            ],
            detailDescription: '套针关键：后一针必须准确压在前一针的中点位置，针脚长度保持3-4mm。通过调整压针比例（1/2、1/3、1/4）控制渐变速度，配合劈线粗细变化，实现如油画般的色彩层次。'
          },
          {
            name: '细节勾勒',
            description: '用滚针、打籽绣等技法勾勒轮廓和点缀细节。叶脉、花蕊等精细部位需用1/16细线，一针一线精心刻画。',
            image: '/images/craft/embroidery/step8.jpg',
            isKeyStep: false
          },
          {
            name: '收针藏线',
            description: '绣完后将线头藏入背面针脚中，用剪刀贴布面剪断。检查正面无跳线、背面无线头，作品才算完成。',
            image: '/images/craft/embroidery/step9.jpg',
            isKeyStep: false
          },
          {
            name: '整烫装裱',
            description: '从绣绷取下作品，反面垫湿布低温熨烫平整。装框时选用无酸卡纸，避免丝线氧化变色。',
            image: '/images/craft/embroidery/step10.jpg',
            isKeyStep: false
          }
        ]
      },
      {
        id: 'lacquerware',
        name: '漆器',
        icon: '/images/craft/lacquerware-icon.png',
        cover: '/images/craft/lacquerware-cover.jpg',
        description: '漆器是中国古代在化学工艺及工艺美术方面的重要发明，以生漆涂在各种器物的表面上所制成的日常器具及工艺品。',
        steps: [
          {
            name: '制胎成型',
            description: '以木、竹、铜为胎，经旋削、拼接、打磨制成器形。胎体要求厚薄均匀，表面平整无裂缝。',
            image: '/images/craft/lacquerware/step1.jpg',
            isKeyStep: false
          },
          {
            name: '裱布固胎',
            description: '在胎体表面裱糊夏布（苎麻布），用生漆调糨糊粘贴，增强胎体强度，防止开裂变形。',
            image: '/images/craft/lacquerware/step2.jpg',
            isKeyStep: false
          },
          {
            name: '刮灰找平',
            description: '用生漆调瓦灰或砖灰，分层刮涂胎体表面。每层干透后打磨平整，通常需刮灰3-5遍，直至表面如镜面般平滑。',
            image: '/images/craft/lacquerware/step3.jpg',
            isKeyStep: false
          },
          {
            name: '髹漆打底',
            description: '用毛刷蘸取生漆均匀涂刷器物表面。髹漆需在温湿度适宜的环境中进行（温度25-30℃，湿度70-80%）。',
            image: '/images/craft/lacquerware/step4.jpg',
            isKeyStep: true,
            detailTitle: '髹漆手法：薄而均匀的奥秘',
            detailImages: [
              '/images/craft/lacquerware/detail1.jpg',
              '/images/craft/lacquerware/detail2.jpg'
            ],
            detailDescription: '髹漆要诀：毛刷与器面呈30度角，手腕悬空，以"之"字形路线均匀推进。每层漆厚约0.05mm，薄如蝉翼。厚则起皱，薄则不匀，全凭手感把控。'
          },
          {
            name: '荫干打磨',
            description: '髹漆后将器物放入荫房（恒温恒湿暗室），待漆层半干时取出，用细砂纸或头发打磨。重复髹漆-荫干-打磨工序20-30遍。',
            image: '/images/craft/lacquerware/step5.jpg',
            isKeyStep: false
          },
          {
            name: '推光提亮',
            description: '用植物油拌瓦灰，用手掌反复推擦漆面，直至出现镜面光泽。推光需持续数小时，手掌温度使漆膜分子重新排列，形成温润内敛的光泽。',
            image: '/images/craft/lacquerware/step6.jpg',
            isKeyStep: true,
            detailTitle: '推光绝技：手掌里的温度',
            detailImages: [
              '/images/craft/lacquerware/detail3.jpg',
              '/images/craft/lacquerware/detail4.jpg'
            ],
            detailDescription: '推光时手掌需保持温热，蘸取少量植物油和细瓦灰，以画圆方式均匀推擦。力度要适中，太轻则不出光，太重则伤漆膜。一件精品漆器需推光3-5遍，耗时数日。'
          },
          {
            name: '描绘纹饰',
            description: '用漆或矿物颜料在漆面上描绘图案。技法包括描金、描漆、螺钿镶嵌、蛋壳镶嵌等，各具特色。',
            image: '/images/craft/lacquerware/step7.jpg',
            isKeyStep: false
          },
          {
            name: '罩漆保护',
            description: '在纹饰表面再罩一层透明漆，保护图案不被磨损。罩漆需极薄，以不影响纹饰清晰度为度。',
            image: '/images/craft/lacquerware/step8.jpg',
            isKeyStep: false
          },
          {
            name: '最终推光',
            description: '再次推光打磨，使漆面达到"温润如玉、光可鉴人"的效果。最终检验：将器物置于灯光下，表面应无橘皮、无气泡、无刷痕。',
            image: '/images/craft/lacquerware/step9.jpg',
            isKeyStep: false
          }
        ]
      },
      {
        id: 'bamboo-weaving',
        name: '竹编',
        icon: '/images/craft/bamboo-icon.png',
        cover: '/images/craft/bamboo-cover.jpg',
        description: '竹编是用山上毛竹剖劈成丝或片，然后经过切丝、刮纹、打光和劈细等工序，编结成各种用具和工艺品。',
        steps: [
          {
            name: '选竹伐材',
            description: '选择生长3-4年的毛竹，竹节间距长、竹壁厚实、色泽均匀。冬伐竹不易虫蛀，是最佳采伐时节。',
            image: '/images/craft/bamboo/step1.jpg',
            isKeyStep: false
          },
          {
            name: '剖竹去节',
            description: '将竹子剖成竹片，去除竹节和竹青。剖竹需顺着竹纤维方向，一刀到底，避免劈裂。',
            image: '/images/craft/bamboo/step2.jpg',
            isKeyStep: false
          },
          {
            name: '劈篾分层',
            description: '将竹片纵向劈成细篾条。劈篾是最考验功力的环节，需根据器物需要劈出不同粗细的篾丝。',
            image: '/images/craft/bamboo/step3.jpg',
            isKeyStep: true,
            detailTitle: '劈篾绝技：一刀十六片',
            detailImages: [
              '/images/craft/bamboo/detail1.jpg',
              '/images/craft/bamboo/detail2.jpg',
              '/images/craft/bamboo/detail3.jpg'
            ],
            detailDescription: '劈篾时左手握竹片，右手持劈刀，刀尖对准竹片中心，顺势下劈。高手可将一指宽的竹片一刀劈成16根细丝，每根粗细均匀如发丝。关键在于"眼准、手稳、力匀"。'
          },
          {
            name: '刮青去黄',
            description: '用刮刀去除篾条表面的竹青和竹黄，使篾丝表面光滑。刮青后的篾丝柔韧度提高，色泽也更均匀。',
            image: '/images/craft/bamboo/step4.jpg',
            isKeyStep: false
          },
          {
            name: '煮篾防蛀',
            description: '将篾丝放入沸水中煮30分钟，去除糖分和淀粉，防止虫蛀霉变。煮后晾干，篾丝色泽由青转黄，更加耐久。',
            image: '/images/craft/bamboo/step5.jpg',
            isKeyStep: false
          },
          {
            name: '编底起头',
            description: '采用"挑一压一"或"挑二压二"等基本编法，编织器物的底部。底部是器物的根基，必须平整牢固。',
            image: '/images/craft/bamboo/step6.jpg',
            isKeyStep: false
          },
          {
            name: '立编围身',
            description: '将篾丝立起作为"经"，横向编织作为"纬"，一圈圈向上围合形成器身。编围时要保持力度均匀，器身才不歪斜。',
            image: '/images/craft/bamboo/step7.jpg',
            isKeyStep: true,
            detailTitle: '立编围身：经纬交错的韵律',
            detailImages: [
              '/images/craft/bamboo/detail4.jpg',
              '/images/craft/bamboo/detail5.jpg'
            ],
            detailDescription: '立编要诀：经篾必须垂直等距，纬篾穿插时要拉紧压实。每编一圈需用"勒子"（竹制工具）勒紧，确保器身紧密无隙。转角处需特殊处理，使器身圆润过渡。'
          },
          {
            name: '收边锁口',
            description: '编至所需高度后，将经篾向内折回，用纬篾锁紧固定。收边方法有插锁、缠锁、编锁等，决定器物的最终形态。',
            image: '/images/craft/bamboo/step8.jpg',
            isKeyStep: false
          },
          {
            name: '打磨修整',
            description: '用细砂纸打磨器物表面，去除毛刺。检查各部位是否牢固，松动处用胶水加固。',
            image: '/images/craft/bamboo/step9.jpg',
            isKeyStep: false
          },
          {
            name: '上漆保养',
            description: '涂刷清漆或桐油保护，增加光泽度和防水性。竹编器物忌暴晒忌潮湿，定期保养可使用数十年。',
            image: '/images/craft/bamboo/step10.jpg',
            isKeyStep: false
          }
        ]
      }
    ]
  },

  onLoad() {
    this.updateCurrentData();
  },

  // 切换非遗项目
  switchProject(e) {
    const projectId = e.currentTarget.dataset.id;
    const index = this.data.projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      this.setData({
        currentProjectIndex: index,
        currentStepIndex: 0,
        isAnimating: false
      }, () => {
        this.updateCurrentData();
      });
    }
  },

  // 滑动切换步骤
  onSwiperChange(e) {
    const index = e.detail.current;
    this.setData({
      currentStepIndex: index,
      isAnimating: false
    }, () => {
      this.updateProgress();
    });
  },

  // 点击时间轴圆点跳转
  jumpToStep(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentStepIndex: index,
      isAnimating: false
    }, () => {
      this.updateProgress();
    });
  },

  // 上一步
  prevStep() {
    if (this.data.currentStepIndex > 0) {
      this.setData({
        currentStepIndex: this.data.currentStepIndex - 1,
        isAnimating: false
      }, () => {
        this.updateProgress();
      });
    }
  },

  // 下一步
  nextStep() {
    const maxIndex = this.data.projects[this.data.currentProjectIndex].steps.length - 1;
    if (this.data.currentStepIndex < maxIndex) {
      this.setData({
        currentStepIndex: this.data.currentStepIndex + 1,
        isAnimating: false
      }, () => {
        this.updateProgress();
      });
    }
  },

  // 切换慢动作动画
  toggleAnimation() {
    this.setData({
      isAnimating: !this.data.isAnimating
    });
  },

  // 预览高清细节图
  previewDetailImage(e) {
    const src = e.currentTarget.dataset.src;
    const currentStep = this.data.projects[this.data.currentProjectIndex].steps[this.data.currentStepIndex];
    wx.previewImage({
      current: src,
      urls: currentStep.detailImages
    });
  },

  // 更新当前项目数据
  updateCurrentData() {
    const project = this.data.projects[this.data.currentProjectIndex];
    const step = project.steps[this.data.currentStepIndex];
    this.setData({
      currentProject: project,
      currentStep: step
    });
    this.updateProgress();
  },

  // 更新进度条
  updateProgress() {
    const project = this.data.projects[this.data.currentProjectIndex];
    const percent = ((this.data.currentStepIndex + 1) / project.steps.length) * 100;
    this.setData({
      progressPercent: percent
    });
  }
});
