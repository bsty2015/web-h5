/**
 * Created by lrh on 16/6/15.
 */
window.assertHost = document.getElementById('assert_host').content;
seajs.config({
    base: window.assertHost,
    alias: {
        "jquery": "https://jicaicdn.b0.upaiyun.com/js/jquery-2.1.4.js",
        "numeral": "https://jicaicdn.b0.upaiyun.com/js/numeral.min.js",
        "juicer": "https://jicaicdn.b0.upaiyun.com/js/juicer-min.js",
        "jweixin": "https://res.wx.qq.com/open/js/jweixin-1.0.0.js",
        "signParam": "https://jicaicdn.b0.upaiyun.com/js/modules/paramSign",
        "commonModule": "https://jicaicdn.b0.upaiyun.com/js/modules/common",
        "socketIO": "https://jicaicdn.b0.upaiyun.com/js/socket.io.js",
        "json2": "https://jicaicdn.b0.upaiyun.com/js/json2.min.js",
        "juicerUtils": "https://jicaicdn.b0.upaiyun.com/js/juicer_utils.js"
    }

})
window.API_HOST = document.getElementById('api_host').content;
// 由zhongciyisheng@live.com创建于2015年12月11日，方便js文件直接获取用户id.
window.userId = document.getElementById('userId').content;
seajs.use(window.assertHost + '/js/modules/SetInput');
seajs.use(window.assertHost + '/js/modules/loading-config');
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}