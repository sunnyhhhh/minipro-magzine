// pages/type/type.js
var request = require('../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',
    title:'',
    markList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getData(options.typeId);
    
    // wx.request({
    //   url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/' + options.typeId,
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //     console.log(res);
    //     if(res.data.code == 0){
    //       that.setData({
    //         imgSrc: res.data.data.imgSrc,
    //         title: res.data.data.title
    //       });
    //     }else{
    //       wx.showToast({
    //         title:'请求错误',
    //         icon:'none'
    //       });
    //     }
        
    //   },
    //   fail: function() {
    //     // fail
    //     wx.showToast({
    //       title:'请求错误',
    //       icon:'none'
    //     });
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // });

    // wx.request({
    //   url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeList/' + options.typeId,
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //     if(res.data.code == 0){
    //       that.setData({
    //         markList: res.data.data
    //       });
    //     }else{
    //       wx.showToast({
    //         title:'请求错误',
    //         icon:'none'
    //       });
    //     }
        
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
  },

  getData: function(typeId){
    var that = this;
    request({
      url: '/getArticleTypeTitleInfo/' + typeId,
      success: function(res) {
        that.setData({
          imgSrc: res.imgSrc,
          title: res.title
        });
      }
    });

    request({
      url: '/getArticleTypeList/' + typeId,
      success: function(res){
        that.setData({
          markList: res
        });
      }
    });
  },

  onDetailTap: function(e){
    console.log(e.currentTarget.dataset.articleid);
    var id = e.currentTarget.dataset.articleid;
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail?id=' + id,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})