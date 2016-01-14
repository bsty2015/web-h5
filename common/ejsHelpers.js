/**
 * Created by lrh on 16/6/15.
 */
var dateUtil = require('dateutil');
var numeral = require('numeral');

module.exports = function (app) {
    app.locals.dateUtil = dateUtil;
    app.locals.numeral = numeral;

    app.locals.formatDateStr = function (val, format) {
        return new Date(val).pattern(format);
    };
    app.locals.formatYMDDate = function (val, format) {
        var d = new Date(val);
        if (format == undefined) {
            return d.pattern("yyyy-MM-dd");
        } else {
            return d.pattern(format);
        }
    };

    app.locals.formatYMDHMS = function (val) {
        var d = new Date(val);
        return d.pattern('yyyy-MM-dd HH:mm:ss');
    };
    app.locals.formatCurrency = function (val) {
        if (val == null || val == undefined) {
            return 0;
        }
        return numeral(val).format("0,0[.]00");
    };
    app.locals.isEmpty = function (val) {
        if (val == null || val == undefined || val.trim() == '') {
            return true;
        }
        return false;
    };
    app.locals.isNotEmpty = function (val) {
        if (val == null || val == undefined || val.trim() == '') {
            return false;
        }
        return true;
    };

    app.locals.outString = function (val) {
        if (val == undefined || val == null) {
            return '';
        }
        return val;
    };
    app.locals.selectButtonMeu = function (val, menu, activClass, unactiveClass) {
        if (val == menu) {
            return activClass;
        } else {
            return unactiveClass || '';
        }
    };

    //保留两位小数
    //功能：将浮点数四舍五入，取小数点后2位
    app.locals.toDecimal = function (val) {
        var f = parseFloat(val);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(val * 100) / 100;
        return f;
    };

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

}