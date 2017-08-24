//index.js
var app = getApp()//获取应用实例
var getMediaUrl = app.globalData.host + "/applet/media/info/get";
var tmpSsid = null;
var getRecommendUrl = app.globalData.host + "/applet/menus/get";
var getConfigUrl = app.globalData.host + "/applet/index/config";
var menuType = 1
Page({
  data: {
    // 参数传递字段
    uide: null,
    userInfo: {},
    mediaInfo: {}, // 小程序Info
    menuInfo: {},
    stateInfo: {}, 
  },
  // 导航函数
  bindViewTap: function (event) {
    var urlBind = event.currentTarget.dataset.navUrl;
    var url = "../" + urlBind + "/" + urlBind;
    wx.navigateTo({
      url: url
    })
  },
  bindHrefitem: function (e) {
    let lid = e.currentTarget.dataset.lid;
    wx.navigateTo({
      url: '../discount/discount?menu_lid=' + lid
    })
  },
  onLoad: function (option) {
    var that = this
    app.getUserInfo(function (userInfo) {// 获取用户基础信息
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })

    // 参数唯一标识存储
    var uide = 0
    if (option.uide) {
      uide = option.uide;
    }
    app.globalData.uide = uide

    // 获取扩展数据
    var encryptAppid = null;
    app.getExtEncrptyAppid(function (res) {
      encryptAppid = res;
    })
    console.log("extApp:" + encryptAppid)

    // 第三方登录
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);
    if (appletSsid && appletSsid != "undefined") {// 第三方登陆过
      wx.checkSession({
        success: function (res) {
          console.log("check session success...")
          app.ssidCheck(appletSsid, encryptAppid, uide, function (res) {
            console.log(res)
            if (res.data.statusCode != 200) {
              app.tLogin(encryptAppid, uide)
            }
          });
        },
        fail: function (res) {
          console.log("check session fail...")
          app.tLogin(encryptAppid, uide);
        }
      })
    } else {
      console.log('applet ssid is no-exist');
      app.tLogin(encryptAppid, uide);
    }


    // 获取扩展数据
    var appid = null;
    app.getExtEncrptyAppid(function (res) {
      appid = res;
    })
    that.getMediaInfo(appid, app.globalData.uide, function (res) {
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          mediaInfo: res.data.data.media_vo
        })
      }
    })

    that.getMenuInfo(appid, uide, function (res) {//获取小程序recommend数据
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          menuInfo: res.data.data
        })
      }
    })  
    that.getConfig(appid, function (res) {//获取config
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          stateInfo: res.data.data
        })
      }
    })      
  },

  onReady: function () {

  },

  //media首页
  getMediaInfo: function (appid, uide, succ) {
    var postParam = {
      appid: appid,
      uide: uide
    }
    app.getRequest(getMediaUrl, postParam, function (res) {
      succ && succ(res)
    });
  },
  //config
  getConfig: function (appid,succ) {
    var postParam = {
      appid: appid
    }
    app.getRequest(getConfigUrl, postParam, function (res) {
      succ && succ(res)
    });
  },  
  //底部推荐数
  getMenuInfo: function (appid, uide, succ) {
    var postParam = {
      appid: appid,
      uide: uide,
      menu_type: menuType
    }
    app.getRequest(getRecommendUrl, postParam, function (res) {
      succ && succ(res)
    })
  }
})
