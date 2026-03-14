Page({
  data: {
    msg: "开始拼图",
    size: 4,
    pieces: [],
    correct: [],
    steps: 0,
    time: "00:00",
    startTime: null,
    timer: null
  },

  onLoad() {
    this.init();
  },

  onShow() {
    this.startTimer();
  },

  onHide() {
    this.stopTimer();
  },

  onUnload() {
    this.stopTimer();
  },

  onShareAppMessage() {
    return {
      title: "我在玩超美的古雅拼图！",
      path: "/pages/puzzle/puzzle"
    };
  },

  init() {
    const size = this.data.size;
    const pieces = [];
    const w = 160;
    for (let i = 0; i < size * size; i++) {
      const row = Math.floor(i / size);
      const col = i % size;
      pieces.push({
        x: -col * w,
        y: -row * w,
        index: i
      });
    }
    this.setData({
      pieces,
      correct: JSON.parse(JSON.stringify(pieces)),
      steps: 0
    });
    this.shuffle();
  },

  shuffle() {
    let arr = JSON.parse(JSON.stringify(this.data.correct));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.setData({
      pieces: arr,
      msg: "开始拼图",
      steps: 0
    });
    this.startTimer();
  },

  onTap(e) {
    const idx = e.currentTarget.dataset.index;
    const { size, pieces } = this.data;
    const row = Math.floor(idx / size);
    const col = idx % size;
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

    for (let [dr, dc] of dirs) {
      const r = row + dr;
      const c = col + dc;
      if (r < 0 || r >= size || c < 0 || c >= size) continue;
      const nIdx = r * size + c;

      let newPieces = [...pieces];
      [newPieces[idx], newPieces[nIdx]] = [newPieces[nIdx], newPieces[idx]];

      this.setData({
        pieces: newPieces,
        steps: this.data.steps + 1
      });

      this.checkWin();
      return;
    }
  },

  checkWin() {
    const { pieces, correct } = this.data;
    const win = pieces.every((p, i) => p.index === correct[i].index);
    if (win) {
      this.stopTimer();
      this.setData({
        msg: `🎉 拼图完成！用时${this.data.time}，步数${this.data.steps}`
      });
    }
  },

  startTimer() {
    this.stopTimer();
    this.setData({ startTime: Date.now() });
    const timer = setInterval(() => {
      const diff = Date.now() - this.data.startTime;
      const m = Math.floor(diff / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      this.setData({ time: `${m}:${s}` });
    }, 1000);
    this.setData({ timer });
  },

  stopTimer() {
    clearInterval(this.data.timer);
  }
});