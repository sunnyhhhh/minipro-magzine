
var baseUrl = 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine';

function request(params){
    wx.request({
        url: baseUrl + params.url,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
            // success
            if(res.data.code == 0){
                params.success(res.data.data);
            }else{
                showError();
            }
        },
        fail: function() {
            // fail
            showError();
        },
        complete: function() {
            // complete
        }
    })
}

function showError(){
    wx.showToast({
        title:'请求错误',
        icon:'none'
    });
}

module.exports = request;