// recommend.js
var app = getApp()
var getRecommendUrl = app.globalData.host + "/applet/menu/get"
var menuType = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuInfo: {},
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    currentIndex:"",
    scrollY: true,
    scrollTop: 100,
    menuType: menuType,
  },

  changeCurrent(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  bindHref: function (e) {
    let lid = e.currentTarget.dataset.lids;
    wx.navigateTo({
      url: '../discount/discount?menu_lid=' + lid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = options.menu_type;
    if (query) {
      menuType = query;
    }
    if(query == 2){
      wx.setNavigationBarTitle({
        title: '菜品折扣'
      })
    }
    var that = this;

    // 参数唯一标识存储
    var uide = app.globalData.uide;
    // 小程序标识
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);
    console.log("recommend|" + uide + "|" + appletSsid)
    console.log(appletSsid)
    this.getMenuInfo(appletSsid, uide, function (res) {//获取小程序recommend数据
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          menuInfo: res.data.data,
          menuType:query
        })
      }
    })
  },

  getMenuInfo: function (ssid, uide, succ) {
    var postParam = {
      ssid: ssid,
      uide: uide,
      menu_type: menuType
    }
    app.getRequest(getRecommendUrl, postParam, function (res) {
      succ && succ(res)
    })
  }
})