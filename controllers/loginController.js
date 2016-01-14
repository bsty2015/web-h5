require('seajs');
var regexUtil = require('../public/common/regexUtil'),
    Base = require('./baseController'),
    util = require('util'),
    uuid = require('node-uuid');
var base = new Base();

function LoginController() {
}
util.inherits(LoginController, Base);
LoginController.prototype.index = function (req, res) {
    console.log('login:' + req.originalUrl);
    //res.locals.csrf = req.csrfToken();
    res.render('login', {
        telephone: req.flash('telephone'),
        msg: req.flash('msg')
    });
};

LoginController.prototype.login = function (req, res) {
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
        res.render('login', {
            msg: msg,
            telephone: tel
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
                    if (loginBackUrl) {
                        res.redirect(loginBackUrl);
                    } else if (movie2_url) {
                        res.redirect(movie2_url);
                    } else {
                        res.redirect('/user/home');
                    }
                    ;
                });
            } else {
                res.render('login', {
                    msg: result.err_msg,
                    telephone: tel
                });
            }
        }, req);
    }
};

LoginController.prototype.signout = function (req, res) {
    req.session.regenerate(function () {
        res.redirect('/login');
    });

};
module.exports = LoginController;