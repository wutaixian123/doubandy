//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
    })
  },
  globalData: {
    userInfo: null
  },
  globalUrl:{
    "url":"https://douban.uieee.com"
  },

})