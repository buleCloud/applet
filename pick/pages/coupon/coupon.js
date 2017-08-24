  // coupon.js
var app = getApp()
var getCardUrl = app.globalData.host + "/applet/coupon/get"
var zbCardType = 1;
var wonCardType = 2;
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    zbCardInfo: {},
    ownCardInfo: {},
  },

  bindClick: function (event) {
    var card_id = event.currentTarget.dataset.cardid;
    var card_ext = event.currentTarget.dataset.cardext;
    console.log(card_id)
    console.log(card_ext)
    wx.addCard({
      cardList: [
        {
          cardId: card_id,
          cardExt: card_ext
        }
      ],
      success: function (res) {
        console.log(res.cardList) // 卡券添加结果
      },
      fail: function(res) {
        console.log(res);
      }

    })
  },

  onLoad: function (options) {
    var that = this;

    // 参数唯一标识存储
    var uide = app.globalData.uide;

    // 小程序标识
    var appletSsid = wx.getStorageSync(app.globalData.ssidFlag);
    console.log("coupon|" + uide + "|" + appletSsid)
    this.getCouponInfo(appletSsid, uide, zbCardType, function (res) {//获取小程序coupon数据
      console.log(res)
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          ownCardInfo: res.data.data
        })
      }
    })

    this.getCouponInfo(appletSsid, uide, wonCardType, function (res) {
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        that.setData({
          zbCardInfo: res.data.data
        })
      }
    })
  },

  getCouponInfo: function (ssid, uide, cardType, succ) {
    var postParam = {
      ssid: ssid,
      uide: uide,
      card_type: cardType
    }
    app.getRequest(getCardUrl, postParam, function (res) {
      succ && succ(res)
    })
  }
})