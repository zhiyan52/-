// 典藏寻宝游戏页面
Page({
  data: {
    // 游戏状态
    timeLeft: 120, // 120秒倒计时
    foundTreasures: 0,
    totalTreasures: 0,
    totalReward: 0,
    gameOver: false,
    
    // 当前场景
    currentScene: {
      id: 1,
      name: '故宫太和殿',
      image: 'https://picsum.photos/800/600?random=1',
      thumbnail: 'https://picsum.photos/400/200?random=11',
      treasures: []
    },
    
    // 场景列表
    scenes: [
      {
        id: 1,
        name: '故宫太和殿',
        image: 'https://picsum.photos/800/600?random=1',
        thumbnail: 'https://picsum.photos/400/200?random=11',
        totalCount: 3,
        foundCount: 0,
        treasures: [
          {
            id: 101,
            name: '九龙壁',
            icon: '🏛️',
            x: 25,
            y: 40,
            found: false,
            reward: 15
          },
          {
            id: 102,
            name: '御玺',
            icon: '🖋️',
            x: 65,
            y: 35,
            found: false,
            reward: 20
          },
          {
            id: 103,
            name: '青花瓷',
            icon: '🏺',
            x: 45,
            y: 60,
            found: false,
            reward: 10
          }
        ]
      },
      {
        id: 2,
        name: '敦煌莫高窟',
        image: 'https://picsum.photos/800/600?random=2',
        thumbnail: 'https://picsum.photos/400/200?random=12',
        totalCount: 3,
        foundCount: 0,
        treasures: [
          {
            id: 201,
            name: '飞天壁画',
            icon: '🪶',
            x: 30,
            y: 25,
            found: false,
            reward: 25
          },
          {
            id: 202,
            name: '佛经卷轴',
            icon: '📜',
            x: 55,
            y: 50,
            found: false,
            reward: 15
          },
          {
            id: 203,
            name: '彩塑佛像',
            icon: '🗿',
            x: 75,
            y: 40,
            found: false,
            reward: 20
          }
        ]
      },
      {
        id: 3,
        name: '苏州园林',
        image: 'https://picsum.photos/800/600?random=3',
        thumbnail: 'https://picsum.photos/400/200?random=13',
        totalCount: 3,
        foundCount: 0,
        treasures: [
          {
            id: 301,
            name: '太湖石',
            icon: '🪨',
            x: 20,
            y: 60,
            found: false,
            reward: 10
          },
          {
            id: 302,
            name: '紫砂壶',
            icon: '🍵',
            x: 60,
            y: 30,
            found: false,
            reward: 15
          },
          {
            id: 303,
            name: '苏绣',
            icon: '🧵',
            x: 40,
            y: 45,
            found: false,
            reward: 20
          }
        ]
      }
    ],
    
    // 计时器
    timer: null
  },
  
  onLoad: function(options) {
    this.initGame();
    this.startTimer();
  },
  
  // 初始化游戏
  initGame: function() {
    const firstScene = this.data.scenes[0];
    this.setData({
      currentScene: firstScene,
      totalTreasures: this.calculateTotalTreasures(),
      totalReward: 0
    });
  },
  
  // 计算总宝藏数
  calculateTotalTreasures: function() {
    let total = 0;
    this.data.scenes.forEach(scene => {
      total += scene.treasures.length;
    });
    return total;
  },
  
  // 开始计时器
  startTimer: function() {
    this.data.timer = setInterval(() => {
      if (this.data.timeLeft > 0) {
        this.setData({
          timeLeft: this.data.timeLeft - 1
        });
      } else {
        this.endGame();
      }
    }, 1000);
  },
  
  // 结束游戏
  endGame: function() {
    clearInterval(this.data.timer);
    this.setData({
      gameOver: true
    });
  },
  
  // 返回首页
  goBack: function() {
    clearInterval(this.data.timer);
    wx.navigateBack();
  },
  
  // 显示提示
  showHint: function() {
    wx.showModal({
      title: '寻宝提示',
      content: '仔细观察场景中的细节，点击可疑的地方寻找隐藏的文物。每个场景都有多个隐藏文物，完成所有场景可获得额外奖励。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },
  
  // 场景点击
  onSceneTap: function(e) {
    const sceneId = e.currentTarget.dataset.scene;
    console.log('点击场景:', sceneId);
  },
  
  // 找到宝藏
  onTreasureFound: function(e) {
    const treasureId = e.currentTarget.dataset.id;
    const scenes = this.data.scenes;
    let foundTreasures = this.data.foundTreasures;
    let totalReward = this.data.totalReward;
    
    // 遍历场景和宝藏
    for (let i = 0; i < scenes.length; i++) {
      for (let j = 0; j < scenes[i].treasures.length; j++) {
        if (scenes[i].treasures[j].id === treasureId && !scenes[i].treasures[j].found) {
          // 标记为已找到
          scenes[i].treasures[j].found = true;
          scenes[i].foundCount++;
          foundTreasures++;
          totalReward += scenes[i].treasures[j].reward;
          
          // 更新当前场景
          if (scenes[i].id === this.data.currentScene.id) {
            this.setData({
              currentScene: scenes[i]
            });
          }
          
          // 显示找到宝藏的提示
          wx.showToast({
            title: `找到${scenes[i].treasures[j].name}！+${scenes[i].treasures[j].reward}积分`,
            icon: 'success'
          });
          
          // 检查是否完成所有场景
          if (foundTreasures === this.data.totalTreasures) {
            // 额外奖励
            totalReward += 50;
            wx.showToast({
              title: '恭喜完成所有场景！额外+50积分',
              icon: 'success'
            });
            this.endGame();
          }
          
          break;
        }
      }
    }
    
    // 更新游戏状态
    this.setData({
      scenes: scenes,
      foundTreasures: foundTreasures,
      totalReward: totalReward
    });
  },
  
  // 切换场景
  switchScene: function(e) {
    const sceneId = e.currentTarget.dataset.id;
    const scene = this.data.scenes.find(s => s.id === sceneId);
    
    if (scene) {
      this.setData({
        currentScene: scene
      });
    }
  },
  
  // 再玩一次
  playAgain: function() {
    // 重置游戏数据
    const resetScenes = this.data.scenes.map(scene => {
      return {
        ...scene,
        foundCount: 0,
        treasures: scene.treasures.map(treasure => ({
          ...treasure,
          found: false
        }))
      };
    });
    
    this.setData({
      scenes: resetScenes,
      currentScene: resetScenes[0],
      foundTreasures: 0,
      totalReward: 0,
      timeLeft: 120,
      gameOver: false
    });
    
    // 重新开始计时
    this.startTimer();
  }
});