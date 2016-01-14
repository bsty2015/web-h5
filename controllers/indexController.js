var request = require('request');
var Base = require('./baseController');
var util = require('util');
var base = new Base();
function IndexController() {
}
util.inherits(IndexController, Base);
IndexController.prototype.list = function (req, res) {
    req.session.backURL = undefined;
    res.locals.isCanShare = false;
    res.locals.bottomMeu = 'home';
    if (req.hostname.indexOf("mpz.jicai.com") != -1) { //**----- 百度 ------**
        res.render('mpz', {
            title: 'Express uuuuu'
        });
    } else {
        base.postJson({
            url: req.API_HOST + '/api/banner/list'
        }, function (result) {
            if (result.err_code == '0') {
                res.render('index', {banners: result.data.banners});
            } else {
                msg = result.err_msg;
                res.render('index_err', {msg: result.err_msg});
            }
        }, req);
    }

};
module.exports = IndexController;