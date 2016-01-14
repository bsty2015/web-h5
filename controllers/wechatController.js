var Base = require('./baseController'),
    util = require('util'),
    crypto = require('crypto');
var uuid = require('node-uuid');
var base = new Base();
var async = require('async');
var CODE_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_userinfo#wechat_redirect";
var returnUrl = 'http://h5.jc.com/wc/auth/callback';

function WechatController() {
}
util.inherits(WechatController, Base);

WechatController.prototype.verify = function (req, res) {
    var signature = req.query.signature;

    var token = "JicaiHJJNJG6767678";
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;

    var strArr = [token, timestamp, nonce];
    strArr.sort();

    var msg = strArr[0] + strArr[1] + strArr[2];
    var shasum = crypto.createHash('sha1');
    shasum.update(msg);
    var sha1 = shasum.digest('hex');
    if (sha1 == signature) {
        res.send(echostr);
    } else {
        res.send("errorjicai");
    }
};

WechatController.prototype.redlist = function (req, res) {
    //console.log("=======myred run============");
    async.series({
            getReds: function (callback) {
                base.postJson({
                    url: req.API_HOST + '/api/wechat/getredlist',
                    form: {
                        userId: req.session.userId
                    }
                }, function (result) {
                    if (result.err_code == '0') {
                        callback(null, result.data.wxred);
                    } else {
                        callback(null, '');
                    }
                }, req);
            },
            expiredReds: function (callback) {
                base.postJson({
                    url: req.API_HOST + '/api/wechat/getredlist',
                    form: {
                        userId: req.session.userId,
                        flag: "Expired"
                    }
                }, function (result) {
                    if (result.err_code == '0') {
                        callback(null, result.data.wxred);
                    } else {
                        callback(null, '');
                    }
                }, req);
            }
        },
        function (err, results) {
            //console.log(results.getReds);
            //console.log(results.expiredReds);
            var Reds = results.getReds;
            var count = 0;
            if (Reds != null && Reds != undefined) {
                for (var i = 0; i < Reds.length; i++) {
                    count += parseFloat(Reds[i].amt);
                }
            } else {
                count = 0;
            }
            res.render('wechat_dec_activity/myred', {
                getReds: results.getReds,
                expiredReds: results.expiredReds,
                count: count,
                msg: ''
            });
        });
}

WechatController.prototype.authVarify = function (req, res) {
    var passwd = req.body.passwd || undefined;
    if (req.session.userId && !passwd) {
        base.postJson({
            url: req.API_HOST + '/api/wechat/isbind',
            form: {
                source: '集财圈儿',
                userId: req.session.userId
            }
        }, function (result) {
            if (result.err_code == '0' && !result.data.isbind) {
                res.render('wechat_dec_activity/wechatauth');
            } else {
                req.flash('msg', '该账号已绑定微信账号');
                res.redirect('/wechatbind');
            }
        }, req);

    } else {
        login(req, res);
    }

};

WechatController.prototype.authCallBack = function (req, res) {
    var code = req.query.code;
    if (code) {
        base.postJson({
            url: req.API_HOST + '/api/wechat/auth',
            form: {
                code: code,
                userId: req.session.userId
            }
        }, function (result) {
            if (result.err_code == '0') {
                req.session.isBind = true;
//              res.redirect('/xmas#back');
//             res.redirect('/xmasThird#back');
               res.redirect('/ypdct#back');
            } else {
                req.flash('msg', result.err_msg);
                res.redirect('/wechatbind');
            }
        }, req);
    } else {
        req.flash('msg', '账号绑定失败');
        res.redirect('/wechatbind');
    }


};

function login(req, res) {
    var isLogin = false;
    if (req.session.userId) {
        isLogin = true;
    }
    var isReturn = false;
    var passwd = req.body.passwd;
    var tel = req.body.telephone;
    var msg = '';
    if (base.isEmpty(tel)) {
        isReturn = true;
        msg = '电话码号不能为空';
    }
    if (base.isEmpty(passwd)) {
        isReturn = true;
        msg = '密码不能为空';
    }
    if (isReturn) {
        res.render('wechat_dec_activity/wechatbind', {
            msg: msg,
            telephone: tel,
            isLogin: isLogin
        });
    } else {
        base.postJson({
            url: req.API_HOST + '/api/login',
            form: {
                userName: tel,
                passwd: passwd
            }
        }, function (result) {
            if (result.err_code == '0') {
                var loginBackUrl = req.session.loginBackUrl;
                var movie2_url = req.session.movie2_url;
                req.session.regenerate(function () {
                    req.session.userId = result.data.user.id;
                    req.session.user = result.data.user;
                    req.session.accessToken = result.data.user.accessToken;
                    req.session.save(); //保存一下修改后的Session

                    base.postJson({
                        url: req.API_HOST + '/api/wechat/isbind',
                        form: {
                            source: '集财圈儿',
                            userId: req.session.userId
                        }
                    }, function (result) {
                        if (result.err_code == '0' && !result.data.isbind) {
                            res.render('wechat_dec_activity/wechatauth');
                        } else {
//                          res.redirect('/xmas#back');
                           res.redirect('/ypdct#back');
                        }
                    }, req);
                });
            } else {
                res.render('wechat_dec_activity/wechatbind', {
                    msg: result.err_msg,
                    telephone: tel,
                    isLogin: isLogin
                });
            }
        }, req);
    }
};

module.exports = WechatController;