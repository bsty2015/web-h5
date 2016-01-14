seajs.use(['https://res.wx.qq.com/open/js/jweixin-1.0.0.js?r=99898','signParam','jquery'],function(wx,signParam){
    var appId = $('#J_appId').val();
    var imgVal = undefined;
    var imgUrl = $('#J_imgUrl');
    if(imgUrl && imgUrl.length >0){
        imgVal = $('#J_imgUrl').val();
    }
    var imgUrl = imgVal || 'http://m.jicai.com/img/shareLogo.png';
    var title = $('#J_shareTitle').val() ||'集财';
    var link = $('#J_shareLink').val() || 'http://m.jicai.com/invite';
    var desc = $('#J_shareDesc').val()|| '集财理财平台';
    var pyqTitle = $('#J_sharepyqTitle').val()|| title;
    signParam.sendData(function(data){
        $.extend(data,{appId:appId,url:document.location.href})
        $.ajax({
            type:'post',
            url:API_HOST+'/api/wechat/sig',
            dataType:'jsonp',
            data:data,
            success:function(data){
                wx.config({
                    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ]
                });
                wx.ready(function(){
                    init();
                });
                //init();
            }
        });
    });

    function init(){
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: pyqTitle, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {

            },
            cancel: function () {

            }
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享到QQ
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }

});