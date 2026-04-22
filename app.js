// app.js
App({
  onLaunch: function () {
    this.globalData = {
      env: "cloud1-8glc9jqob91870fc",
      openid: null
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }
  },
});
