/*
 ** 	以后，微信活动路由，都写在此文件中
 **	contoler则写在wechatactivitycontroller.js中
 **	防止多人开发时文件过多而造成的杂乱问题。
 **
 */

var express = require('express');
var router = express.Router();
var WechatController = require('../controllers/wechatController');
var wechat = new WechatController();
var RegisterController = require('../controllers/registerController');
var register = new RegisterController();
var Base = require('../controllers/baseController'),
    util = require('util');
var base = new Base();
var WechatActivityController = require('../controllers/wechatActivityController');
var wechatActivity = new WechatActivityController();
var ProductController = require('../controllers/productController');
var product = new ProductController();

router.get('/xmas', wechatActivity.render);


router.get('/xmasThird', wechatActivity.xmasThird);
router.get('/ypdct',wechatActivity.ypdctRender);

router.get('/redreg', function (req, res) {
    req.session.wechat_Dec_activity = '/wregsucc';
    var code = req.query.code;
    var telephone = req.session.telephone || undefined;
    var isRegisted = false;
    if (req.session.userId) {
        isRegisted = true;
        res.redirect('/user/home')
    } else if (code) {
        base.postJson({
            url: req.API_HOST + '/api/user/queryInviteTel',
            form: {
                code: code
            }
        }, function (result) {
            if (result.err_code == '0' && result.data) {
                res.cookie('code', code, {
                    maxAge: 3600000 * 24 * 7,
                    httpOnly: true
                });
                telephone = result.data.telephone;
                req.session.telephone = telephone;
            }
            res.render('wechat_dec_activity/redreg', {
                telephone: telephone,
                userId: req.session.userId,
                isRegisted: isRegisted
            });
        }, req);
    } else {
        res.render('wechat_dec_activity/redreg', {
            telephone: telephone,
            msg: req.flash('msg'),
            userId: req.session.userId,
            isRegisted: isRegisted
        });
    }
});

//router.post('/register', register.register);

router.get('/wechatbind', function (req, res, next) {
    var isLogin = false;
    var telephone = '';

    if (req.session.userId) {
        base.postJson({
            url: req.API_HOST + '/api/wechat/isbind',
            form: {
                source: '集财圈儿',
                userId: req.session.userId
            }
        }, function (result) {
            if (result.err_code == '0' && result.data.isbind) {
                res.redirect('/ypdct#back');
            } else {
                isLogin = true;
                telephone = req.session.user.telephone;
                res.render('wechat_dec_activity/wechatbind', {
                    isLogin: isLogin,
                    telephone: telephone,
                    msg: req.flash('msg')
                });
            }
        }, req);

    } else {
        res.render('wechat_dec_activity/wechatbind', {
            isLogin: isLogin,
            telephone: telephone,
            msg: req.flash('msg')
        });
    }
});

router.get('/toReg', function (req, res, next) {
    req.session.backURL = '/wechatbind';
    res.redirect('/regpage');
})

router.get('/wregsucc', function (req, res, next) {
    res.render('wechat_dec_activity/wregsucc');
});

router.get('/redenv', function (req, res, next) {
    res.locals.isCanShare = false;
    if (req.session.userId) {
        base.postJson({
            url: req.API_HOST + '/api/wechat/totalRedAmt',
            form: {
                userId: req.session.userId
            }
        }, function (result) {
            if (result.err_code == '0') {
                //console.log(result.data.totalRedAmt+"=========");
                res.render('wechat_dec_activity/redenv', {totalRedAmt: result.data.totalRedAmt});
            } else {
                res.render('wechat_dec_activity/redenv', {totalRedAmt: 0});
            }
        }, req);
    } else {
        res.render('wechat_dec_activity/redenv', {totalRedAmt: 0});
    }
});


router.get('/myred', wechat.redlist);

router.get('/getred', function (req, res, next) {
    res.render('wechat_dec_activity/second/getred');
});

router.get('/xmas/prolist', product.checkLogin, product.prolist);


//router.get('/xmasThird', function (req, res, next) {
//  res.render('wechat_dec_activity/third/xmasThird');
//});

router.get('/xmasThird/product', product.checkLogin, product.productThird)

module.exports = router;