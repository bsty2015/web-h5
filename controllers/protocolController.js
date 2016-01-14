var Base = require('./baseController'),
    util = require('util'),
    request = require('request');
var base = new Base();
function ProtocolController() {
}
util.inherits(ProtocolController, Base);

ProtocolController.prototype.debtContract = function (req, res, next) {
    var accessToken = req.query.accessToken || req.cookies.accessToken || req.body.accessToken;
    base.postJson({
        url: req.API_HOST + '/api/user/contract',
        form: {
            orderId: req.params.orderId,
        }
    }, function (result) {
        if (result.err_code == '0') {
            res.render('protocol/contract-agreement', {contract: result.data.contract});
        } else {
            var err = new Error('协议不存在');
            err.status = 500;
            next(err);
        }
    }, req);
};

ProtocolController.prototype.investContract = function (req, res, next) {
    var productId = req.query.productId || req.body.productId;
    var investAmt = req.query.investAmt || req.body.investAmt;
    var userId = req.session.userId || req.query.userId || req.body.userId;
    base.postJson({
        url: req.API_HOST + '/api/user/invest/contract',
        form: {
            userId: userId,
            productId: productId,
            investAmt: investAmt,
        }
    }, function (result) {
        if (result.err_code == '0') {
            res.render('protocol/contract-agreement', {contract: result.data.contract});
        } else {
            var err = new Error('协议不存在');
            err.status = 500;
            next(err);
        }
    }, req);
};
module.exports = ProtocolController;