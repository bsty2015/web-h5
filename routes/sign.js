var express = require('express'),
    BaseController = require('../controllers/baseController.js'),
    router = express.Router();

var base = new BaseController();

//router.post('/sign',base.checkLogin);
router.all('/sign', function (req, res) {
    base.signAjax(req, res);
    var userId = req.session.userId || '';
    var data = {
        accessToken: res.locals.accessToken,
        timestamp: res.locals.timestamp,
        sign: res.locals.sign,
        userId: userId
    };
    //res.writeHead(200, { 'Content-Type': 'application/json' });
    res.json(data);
});

module.exports = router;