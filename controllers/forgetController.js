var regexUtil = require('../public/common/regexUtil'),
    request = require('request'),
    uuid = require('node-uuid'),
    apiHost = global.API_HOST;
var Base = require('./baseController');
var base = new Base();

function ForgetController() {

}
ForgetController.prototype.ComeIn = function (req, res) {
    res.render('forget/forget-page', {msg: req.flash('msg')});
};
ForgetController.prototype.sendCode = function (req, res) {
    var tel = req.session.forgetTel;
    if (tel == null || tel == undefined) {
        req.session.forgetFlage = false;
        res.redirect('/forget/forget-tel');
    } else {
        console.log(tel);
        if (regexUtil.verifyTelephone(tel)) {
            base.postJson({
                url: req.API_HOST + '/api/msg/code',
                form: {
                    telephone: tel,
                    bus: 'reg'
                }
            }, function (result) {
                res.render('forget/forgetCode', {
                    telephone: tel,
                    msg: '验证码发送成功'
                });
            }, req);
        } else {
            req.flash('msg', '电话号码格式错误');
            req.flash('telephone', tel);
            res.redirect('/forget/forget-tel');
        }
    }

};

ForgetController.prototype.verifyCode = function (req, res) {
    var code = req.body.code;
    var telephone = req.session.forgetTel;
    if (!/\d{6}/.test(code)) {
        res.render('forget/forgetCode', {
            telephone: telephone,
            msg: '验证码输入错误,请重新发送'
        });
    } else if (telephone == null || telephone == undefined) {
        req.session.forgetFlage = false;
        res.redirect('/forget/forget-tel');
    } else {
        base.postJson({
            url: req.API_HOST + '/api/msg/code/verify',
            form: {
                code: code,
                telephone: telephone
            }
        }, function (result) {
            req.flash('telephone', telephone);
            if (result.err_code == '0') {
                req.session.forgetFlage = true;
                req.session.forgetCode = code;
                res.redirect('/forget/forget-passwd');
            } else {
                res.render('forget/forgetCode', {
                    telephone: telephone,
                    msg: '验证码发送错误,请重新发送'
                });
            }
        }, req);
    }
};

ForgetController.prototype.verifyTelephone = function (req, res) {
    var tel = req.body.telephone;
    base.postJson({
        url: req.API_HOST + '/api/validateTelephone',
        form: {
            telephone: tel
        }
    }, function (result) {
        req.flash('telephone', tel);
        var isExist = result.data.isExist;
        if (result.err_code == '0') {
            if (!isExist) {
                req.flash('msg', '账号未注册,请先注册');
                res.redirect('/forget/forget-tel');
            } else {
                req.session.forgetTel = req.body.telephone;
                res.redirect('/forget/forget-code');
            }
        } else {
            req.flash('msg', result.err_msg);
            res.redirect('/forget/forget-tel');
        }
    }, req);
};


ForgetController.prototype.forget = function (req, res) {
    var passwd = req.body.passwd;
    var tel = req.body.telephone;
    var validateCode = req.body.validateCode;
    //	var forgetFlage = req.session.forgetFlage;
    if (tel == null || req == undefined || tel.trim() == '') {
        req.session.forgetFlage = false;
        res.redirect('/forgetPage');
    } else {
        base.postJson({
            url: req.API_HOST + '/api/user/forgetPasswd',
            form: {
                telephone: tel,
                passwd: passwd,
                validateCode: validateCode
            }
        }, function (result) {
            if (result.err_code == '0') {
                req.session.forgetFlage = false;
                req.session.forgetTel = null;
                req.session.forgetCode = null;
                req.flash('msg', '密码修改成功，请重新登录');
                res.redirect('/login');
            } else {
                req.flash('msg', result.err_msg);
                req.flash('telephone', tel);
                res.redirect('/forgetPage');
            }
        }, req);
    }

};


ForgetController.prototype.forgetPasswd = function (req, res) {
    res.render('forget/forgetPassword', {
        msg: req.flash('msg'),
        telephone: req.flash('telephone')
    });
};

ForgetController.prototype.forgetTel = function (req, res) {
    res.render('forget/forgetTel', {
        telephone: req.flash('telephone'),
        msg: req.flash('msg')
    });
};

module.exports = ForgetController;