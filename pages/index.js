// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeData:{
      date:"1月26日",
      title:"欢迎来到青芒杂志"
    },
    recommend: "",
    markList: "",
    articleList: [],
    likeList: {
      0: true,
      1: false,
      2: true,
      3: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.getLikeData();
  },

  showMoreTap: function(e){
    console.log(e);
    wx.showActionSheet({
      itemList: ['内容过期了','不是关于' + e.currentTarget.dataset.articletype + '的内容','显示更多不是'+ e.currentTarget.dataset.articletype+'的内容'],
      itemColor:"#abcedf",
      success(res){
        // console.log(res);
        wx.showToast({
          title:'成功',
          icon:'success',
          duration:2000
        });
      }
    })
  },
 
  onLikeTap: function(e){
    var nowIndex = e.currentTarget.dataset.articleindex;
    var likeList = this.data.likeList;
    var isLike = likeList[nowIndex];
    likeList[nowIndex] = !isLike;
    this.setData({
      likeList: likeList
    });
    wx.setStorageSync('likeList', likeList);
    // console.log(nowIndex);
  },

  getLikeData: function(){
    var likeList = wx.getStorageSync('likeList');
    if(!likeList){
      likeList = {};
    }
    this.setData({
      likeList: likeList
    });
  },

  toNextPageTap: function(e){
    // console.log(e.currentTarget.dataset);
    var articleTypeIndex = e.currentTarget.dataset.articletypeid;
    wx.navigateTo({
      url: '/pages/type/type?typeId=' + articleTypeIndex,
      success: function(res){
        // success
        // console.log(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  getData: function(){
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        // console.log(res);
        that.setData({
          homeData: res.data,
          recommend: res.data.recommend,
          markList: res.data.markType,
          articleList: res.data.articleList
        });
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
    console.log("refresh");
    setTimeout(function(){
      wx.stopPullDownRefresh();
      console.log('refresh over');
    },1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('pull down over');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})