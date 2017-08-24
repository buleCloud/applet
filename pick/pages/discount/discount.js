// menu.js
var app = getApp()
var getDiscountUrl = app.globalData.host + "/applet/menu/info/get";
var postUrl = app.globalData.host + '/applet/menu/like/eating/add';
var menuType = 2
var menu_lid;
Page({
  /*** 页面的初始数据*/
  data: {
   menuInfo: {},
   isDefault:false,
   numbers:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    menu_lid = options.menu_lid;
    var that = this;
    var postParam = {
      menu_lid: menu_lid
    }
    app.getRequest(getDiscountUrl, postParam, function (res) {
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        var like_count ;
        if (res.data.data.like_eating_count != null && res.data.data.like_eating_count != ''){
          like_count = res.data.data.like_eating_count;
        }else{
          like_count = 0;
        }
        that.setData({
          menuInfo: res.data.data,
          numbers: like_count
        })
      }
    })    
  },

  addWantEatNumber:function(e){
    let that = this;  
    that.setData({
      isDefault: true,
      numbers: that.data.numbers +1
    });
    var postParam = {
      menu_lid: menu_lid
    }
    app.getRequest(postUrl, postParam, function (res) {
      if (res.statusCode == 200 && res.data.statusCode == 200) {
        // that.setData({
        //   menuInfo: res.data.data
        // })
      }
    })    
  }
})