define(function (require, exports, module) {
    // 通过 require 引入依赖
    require('jquery');

    function Browser() {
        //		var This = this;
        var u = navigator.userAgent,
            app = navigator.appVersion;
        this.trident = u.indexOf('Trident') > -1;
        this.presto = u.indexOf('Presto') > -1; //opera内核
        this.webKit = u.indexOf('AppleWebKit') > -1; //苹果、谷歌内核
        this.gecko = u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1; //火狐内核
        this.mobile = !!u.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
        this.ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        this.android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或uc浏览器
        this.ua = window.navigator.userAgent.toLowerCase();
        if (this.ua.match(/MicroMessenger/i) == 'micromessenger') { //是微信
            this.fnWechat();
            if (this.ios == true) {
                this.fnIos();
            } else if (this.android == true) {
                this.fnAndroid();
            }
            ;
        } else {
            this.fnOther();
        }
        ;
    };
    Browser.prototype.fnWechat = function () {
        var This = this;
        //微信环境处理
        //		alert(2)

    };
    Browser.prototype.fnIos = function () {
        var This = this;
        //ios
    };
    Browser.prototype.fnAndroid = function () {
        var This = this;
        //Android
    };
    Browser.prototype.fnOther = function () {
        var This = this;
    };

    module.exports = Browser;
});