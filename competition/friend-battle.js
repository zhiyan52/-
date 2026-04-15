Page({
  data: {
    onlineCount: 128,
    rooms: [
      {
        id: 1,
        name: '古建爱好者房间',
        host: '小明',
        players: 1,
        status: 'waiting'
      },
      {
        id: 2,
        name: '非遗知识PK',
        host: '小红',
        players: 2,
        status: 'playing'
      }
    ],
    friends: [
      {
        id: 1,
        rank: 1,
        name: '古建达人',
        avatar: 'https://picsum.photos/70/70?random=11',
        score: 5280
      },
      {
        id: 2,
        rank: 2,
        name: '非遗守护者',
        avatar: 'https://picsum.photos/70/70?random=12',
        score: 4850
      },
      {
        id: 3,
        rank: 3,
        name: '典藏专家',
        avatar: 'https://picsum.photos/70/70?random=13',
        score: 4320
      }
    ]
  },

  onLoad: function (options) {
    // 加载房间列表和好友数据
  },

  createRoom: function () {
    wx.showLoading({
      title: '创建房间中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      const roomId = Math.floor(Math.random() * 900000) + 100000;
      wx.showModal({
        title: '房间创建成功',
        content: `房间号：${roomId}\n请将房间号分享给好友`,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: `/competition/room-detail?roomId=${roomId}&role=host`
            });
          }
        }
      });
    }, 800);
  },

  joinRoom: function () {
    wx.showModal({
      title: '加入房间',
      editable: true,
      placeholderText: '请输入6位房间号',
      success: (res) => {
        if (res.confirm && res.content) {
          if (res.content.length === 6) {
            wx.showLoading({
              title: '加入中...'
            });
            setTimeout(() => {
              wx.hideLoading();
              wx.navigateTo({
                url: `/competition/room-detail?roomId=${res.content}&role=guest`
              });
            }, 500);
          } else {
            wx.showToast({
              title: '房间号格式错误',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  quickMatch: function () {
    wx.showLoading({
      title: '匹配中...'
    });

    let matchCount = 0;
    const matchTimer = setInterval(() => {
      matchCount++;
      if (matchCount >= 3) {
        clearInterval(matchTimer);
        wx.hideLoading();
        wx.showToast({
          title: '匹配成功',
          icon: 'success'
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '/competition/quiz-page?type=battle'
          });
        }, 1000);
      }
    }, 1000);
  },

  enterRoom: function (e) {
    const roomId = e.currentTarget.dataset.id;
    const room = this.data.rooms.find(r => r.id === roomId);

    if (room && room.players < 2) {
      wx.navigateTo({
        url: `/competition/room-detail?roomId=${roomId}&role=guest`
      });
    } else {
      wx.showToast({
        title: '房间已满',
        icon: 'none'
      });
    }
  },

  challengeFriend: function (e) {
    const friendId = e.currentTarget.dataset.id;
    const friend = this.data.friends.find(f => f.id === friendId);

    wx.showModal({
      title: '发起挑战',
      content: `确定要向 ${friend.name} 发起挑战吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '挑战已发送',
            icon: 'success'
          });
        }
      }
    });
  },

  viewMoreFriends: function () {
    wx.showToast({
      title: '更多好友功能开发中',
      icon: 'none'
    });
  }
});