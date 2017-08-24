// home.js
var app = getApp()
var url = app.globalData.host + "/applet/home/get"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    homeInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 参数唯一标识存储
    var uide = app.globalData.uide;
    // 小程序标识
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);
    console.log(uide + "|" + appletSsid)
    this.getHomeInfo(appletSsid, uide, function (res) {//获取小程序home数据
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          homeInfo: res.data.data.home_vo
        })
      }
    })
  },

  getHomeInfo: function (ssid, uide, succ) {
    var postParam = {
      ssid: ssid,
      uide: uide
    }
    app.getRequest(url, postParam, function (res) {
      succ && succ(res)
    })
  }
})