var express = require('express'),
    router = express.Router(),
    WechatController = require('../controllers/wechatController');

var wc = new WechatController();

router.get('/wc', wc.verify);

router.all('/wc/auth', wc.authVarify);

router.all('/wc/auth/callback', wc.authCallBack);

module.exports = router;

