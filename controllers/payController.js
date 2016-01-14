var Base = require('./baseController'),
    util = require('util'),
    request = require('request');
var base = new Base();

function PayController() {
}
util.inherits(PayController, Base);

PayController.prototype.pay = function (req, res) {
    var investAmt = req.body.investAmt;
    var cardId = req.session.cardId;
    base.postJson({
        url: req.API_HOST + '/api/pay/invest',
        form: {
            userId: req.session.userId,
            cardId: cardId,
            investAmt: investAmt,
            activity: req.session.activity,
            productId: req.session.productId
        }
    }, function (result) {
        if (result.err_code == '0') {
            req.session.activity = '无';
            req.session.requestid = result.data.requestid;
            req.session.phone = result.data.phone;
            res.locals.phone = result.data.phone;
            res.render('pay/pay-send-code');
        } else {
            req.flash('msg', result.err_msg);
            req.flash('cardId', cardId);
            if (req.session.virtualPay) {
                req.session.virtualPay = null;
                res.redirect('/virtual/invest/' + req.session.productId);
            } else {
                req.flash('investAmt', investAmt);
                res.redirect('/user/invest/' + req.session.productId);
            }

        }
    }, req);
};

PayController.prototype.repeatPay = function (req, res) {
    var cardId = req.session.cardId;
    base.postJson({
        url: req.API_HOST + '/api/pay/repeatpay',
        form: {
            userId: req.session.userId,
            cardId: req.body.cardId,
            orderId: req.body.orderId,
        }
    }, function (result) {
        if (result.err_code == '0') {
            req.session.requestid = result.data.requestid;
            req.session.phone = result.data.phone;
            res.locals.phone = result.data.phone;
            res.render('pay/pay-send-code');
        } else {
            req.flash('msg', result.err_msg);
            req.flash('cardId', cardId);
            res.redirect('/user/invest/repayInvest/' + req.body.orderId + "?cardId=" + req.body.cardId);
        }
    }, req);
};


PayController.prototype.payConfirm = function (req, res) {
    var validatecode = req.body.validatecode;
    if (!/\d{6}/.test(validatecode)) {
        res.render('pay/pay-send-code', {
            phone: req.session.phone,
            msg: '验证码格式错误'
        });
    } else {
        base.postJson({
            url: req.API_HOST + '/api/pay/invest/confirm',
            form: {
                requestid: req.session.requestid,
                validatecode: validatecode
            }
        }, function (result) {
            if (result.err_code == '0') {
                res.redirect('/invest/paystatus');
            } else {
                res.render('pay/pay-send-code', {
                    phone: req.session.phone,
                    msg: result.err_msg
                });
            }
        }, req);
    }
};

PayController.prototype.repeatCode = function (req, res) {

    base.postJson({
        url: req.API_HOST + '/api/pay/sendmsg',
        form: {
            requestid: req.session.requestid
        }
    }, function (result) {
        if (result.err_code == '0') {
            res.locals.msg = '短信已发送';
        } else {
            res.locals.msg = result.err_msg;
        }
        res.render('pay/pay-send-code', {
            phone: req.session.phone
        });
    }, req);
};

PayController.prototype.checkPayStatus = function (req, res) {
    base.postJson({
        url: req.API_HOST + '/api/pay/invest/status',
        form: {
            requestid: req.session.requestid
        }
    }, function (result) {
        var msg = result.err_msg;
        var num = 0;
        if (result.err_code == '0') {
            paySuccess(req, res, result);
        } else if (result.data == 'fail') {
            res.render('pay/pay-failure', {
                msg: result.err_msg
            });
        } else {
            res.render('pay/pay-wait', {
                num: num
            });
        }
    }, req);
};

PayController.prototype.repeatInvest = function (req, res) {
    base.postJson({
        url: req.API_HOST + '/api/user/invest/product',
        form: {
            userId: req.session.userId,
            status: '支付中'
        }
    }, function (result) {
        if (result.err_code == '0') {
            res.render('pay/pay-not-list', {
                products: result.data.products
            });
        } else {
            msg = result.err_msg;
            res.render('pay/pay-not-list', {
                msg: result.err_msg,
                products: {}
            });
        }
    }, req);
};

function paySuccess(req, res, result) {
    res.render('pay/pay-success', {
        repayDate: result.data.repayDate,
        requestid: result.data.requestid,
        investAmt: result.data.investAmt
    });
}

module.exports = PayController;