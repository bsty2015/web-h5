/**
 * created by zhongciyisheng@live.com on 2015年9月18日 17:15:24
 * 中秋节活动相关。
 */
var request = require('request');
var Base = require('./baseController');
var util = require('util');
var base = new Base();

function midAutumnFestivalController() {
}
util.inherits(midAutumnFestivalController, Base);
midAutumnFestivalController.prototype.status = function (req, res) {
    req.session.loginBackUrl = '/midatminv';//定义中秋页面跳转，当未登录用户登录完成时，跳回中秋介绍！
    res.locals.isCanShare = false;
    var startDate = "2015-09-21"; //活动开始时间。
    var endDate = "2015-09-25"; //活动结束时间。
    var userId = req.session.userId; //获取userid。
    //  res.locals.bottomMeu = 'product';
    var emptyData = {
        isLogin: undefined, //判断是否登录。
        isBuy: false, //判断是否购买
        mid: {
            invites: []
        },
        iNum: 0 //获得总金额
    };
    if (req.session.userId) {
        base.postJson({
            url: req.API_HOST + '/api/invite/moon',
            form: {
                //			userId: userId,
                userId: userId,
                startDate: startDate,
                endDate: endDate
            }
        }, function (result) {
            var mid = result.data;
            console.mid
            var iNum = '';
            var is_invested = '';
            if (result.err_code == '0') {
                iNum = mid.corpus + mid.totalinviteAmt;
                is_invested = result.data.is_invested; //判断是否购买。
                res.render('midAutumnFestival/midatminv', {
                    isLogin: userId, //判断是否登录。
                    isBuy: is_invested, //判断是否购买
                    mid: mid,
                    iNum: iNum //获得总金额
                });
                console.info(is_invested)
            } else {
                emptyData.msg = result.err_msg;
                res.render('midAutumnFestival/midatminv', emptyData);
            }
        }, req);
    } else {
        res.render('midAutumnFestival/midatminv', emptyData);
    }

};
/**
 * 中秋节新用户入口
 */
midAutumnFestivalController.prototype.midatmreg = function (req, res) {
    req.session.backURL = '/midatminv';
    res.locals.isCanShare = false;
    var startDate = "2015-09-21"; //活动开始时间。
    var endDate = "2015-09-26"; //活动结束时间。
    var userId = req.session.userId; //获取userid。
    //  res.locals.bottomMeu = 'product';
    var emptyData = {
        isLogin: undefined, //判断是否登录。
        isBuy: false, //判断是否购买
        mid: {
            invites: []
        },
        iNum: 0 //获得总金额
    };
    if (req.session.userId) {
        base.postJson({
            url: req.API_HOST + '/api/invite/moon',
            form: {
                //			userId: userId,
                userId: userId,
                startDate: startDate,
                endDate: endDate
            }
        }, function (result) {
            var mid = result.data;
            console.mid
            var iNum = '';
            var is_invested = '';
            if (result.err_code == '0') {
                iNum = mid.corpus + mid.totalinviteAmt;
                is_invested = result.data.is_invested; //判断是否购买。
                res.render('midAutumnFestival/midatminv', {
                    isLogin: userId, //判断是否登录。
                    isBuy: is_invested, //判断是否购买
                    mid: mid,
                    iNum: iNum //获得总金额
                });
                console.info(is_invested)
            } else {
                emptyData.msg = result.err_msg;
                res.render('midAutumnFestival/midatminv', emptyData);
            }
        }, req);
    } else {
        res.render('midAutumnFestival/midatmreg', emptyData);
    }

};


module.exports = midAutumnFestivalController;