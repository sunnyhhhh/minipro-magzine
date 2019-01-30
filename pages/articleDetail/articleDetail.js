// pages/articleDetail/articleDetail.js

var request = require("../../utils/request.js");
var audio = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail: {},
    danmuList: [{
        text: '我是你爸爸',
        color: '#000000',
        time: 12
      },
      {}
    ],
    videoMaskHidden: false,
    audioPlaying: false,
    audioCurTime: 0,
    progressPercent: 0,
    progressCircleLeft:0,
    progressWidth:520,
    originCircleX:0,
    getOriginAudioX: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    this.getData(options.id);
    console.log(this.data.articleDetail.banner);
  },

  getData: function (id) {
    var that = this;
    request({
      url: '/getArticleDetail/' + id,
      success: function (res) {
        console.log(res);
        that.setData({
          articleDetail: res
        })
      }
    });
  },

  onVideoTap: function () {
    this.setData({
      videoMaskHidden: true
    });
    var video = wx.createVideoContext('myVideo');
    video.play();
  },

  onAudioPlayTap: function () {

    // var audio = wx.getBackgroundAudioManager();

    this.onListenMusic();
    this.updateAudioData();
  },

  onListenMusic: function () {
    var isplay = this.data.audioPlaying;
    // var audio = wx.getBackgroundAudioManager();

    var that = this;

    if (isplay == true) {
      audio.pause();
    } else {
      audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
      audio.title = 'music'
      // this.onAudioPlay();
    }

    audio.onPause(function () {
      that.setData({
        audioPlaying: false
      });
    });

    audio.onEnded(function () {
      that.setData({
        audioPlaying: false
      });
    });

    audio.onPlay(function () {
      that.setData({
        audioPlaying: true
      });
    });

    audio.onStop(function () {
      that.setData({
        audioPlaying: false
      })
    });
  },

  updateAudioData: function () {
    var audioDuration = this.data.articleDetail.audio.duration;

    var that = this;

    audio.onTimeUpdate(function () {
      var audioCurTime = audio.currentTime.toFixed();
      // 歌曲播放进度
      var percent = audioCurTime / audioDuration;
      var progressPercent = percent * 100;

      // 小圆圈位置
      var progressWidth = that.data.progressWidth;
      var left = progressWidth * percent;

      that.setData({
        audioCurTime: audioCurTime,
        progressPercent: progressPercent,
        progressCircleLeft: left
      });
    })
  },

  onAudioStart:function(e){
    var flag = this.data.getOriginAudioX;
    if(!flag){
      var radio = this.getPhoneRadio();
      this.setData({
        originCircleX: e.touches[0].pageX * radio,
        getOriginAudioX: true
      });
    }
  },

  onAudioPlay: function(){
    audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    audio.title = 'music';
    this.onListenMusic();
    this.updateAudioData();
  },

  onAudioCircleMove:function(e){
    var radio = this.getPhoneRadio();
    var originX = this.data.originCircleX;
    var moveX = e.touches[0].pageX * radio;
    
    var curLeft = moveX - originX;

    if(curLeft < 0){
      curLeft = 0;
    }else if(curLeft > this.data.progressWidth){
      curLeft = this.data.progressWidth;
    }

    var progressPercent = curLeft / this.data.progressWidth * 100;
    var curTime = ((curLeft / this.data.progressWidth) * (this.data.articleDetail.audio.duration)).toFixed();

    this.onAudioPlay();
    // audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    // audio.title = 'music';
    audio.seek(Number(curTime));
    // this.onListenMusic();
    // this.updateAudioData();

    this.setData({
      progressCircleLeft: curLeft,
      progressPercent: progressPercent,
      audioCurTime: curTime
    })
  },

  getPhoneRadio: function(){
    var radio = 0;
    wx.getSystemInfo({
      success: function(res) {
        var screenX = res.screenWidth;
        radio = 750 / screenX;
      }
    });
    return radio;
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