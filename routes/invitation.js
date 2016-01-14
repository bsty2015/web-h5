var express = require('express');
var Base = require('../controllers/baseController');
var base = new Base();
var router = express.Router();

router.get('/tencent', function (req, res, next) {
    res.render('other/invitation', {
        msg: req.flash('msg')
    });
});
router.get('/thunder', function (req, res, next) {
    res.locals.isCanShare = false;
    res.render('other/thunder', {
        msg: req.flash('msg')
    });
});
//迅雷活动认证：thunder-verify.html
router.get('/thunderVerify', base.checkLogin, function (req, res, next) {
    req.flash('userId', req.session.userId);
    res.render('other/thunder-verify', {
        msg: req.flash('msg'),
        userId: req.flash('userId')
    });
});
//迅雷活动详细页面thunder-verify-sub.html
router.get('/thunderVerifySub', function (req, res, next) {
    res.render('other/thunder-verify-sub', {
        msg: req.flash('msg')
    });
});
/*
 * 迅雷第二期活动页面
 */
router.get('/thunder/second', function (req, res, next) {
    var xluserid = res.locals.xluserid = req.query.xluserid || '';
    var time = res.locals.time = req.query.time || '';
    var sign = res.locals.sign = req.query.sign || '';
    if (sign != base.md5('time=' + time + '&xluserid=' + xluserid, 'j6v8fa1oph3bkc')) {
        req.flash('msg', '迅雷账号错误，这会影响到迅雷会员的发放。请返回迅雷活动页面重新登录扫描二维码。');
    } else {
        res.cookie('xluserid', xluserid);
        res.cookie('time', time);
        res.cookie('sign', sign);
    }
    res.render('other/thunder-second', {
        msg: req.flash('msg')
    })
})
/*
 * ios、Android下载页面
 */
router.get('/app', function (req, res, next) {
    res.render('other/download');
})

module.exports = router;