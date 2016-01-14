var Base = require('./baseController'),
    util = require('util');
var base = new Base();

function BankController() {
}
util.inherits(BankController, Base);

BankController.prototype.add = function (req, res) {
    var bank = base.getStr(req.flash('bank')) || {};

    base.postJson({
        url: req.API_HOST + '/api/user/userInfo',
        form: {
            userId: req.session.userId
        }
    }, function (result) {
        if (result.err_code == '0') {
            var userInfo = result.data.userInfo;
            req.session.user = userInfo;
            bank.idcardno = userInfo.identity || bank.idcardno;
            bank.username = userInfo.realName || bank.username;
        }
        res.render('bank/add-bank', {
            bank: bank,
            isVerify: req.session.user.isVerify,
            msg: req.flash('msg')
        });

    }, req);

};

BankController.prototype.list = function (req, res) {
    req.session.investbindBack = null;
    base.postJson({
        url: req.API_HOST + '/api/card/list',
        form: {
            userId: req.session.userId
        }
    }, function (result) {
        if (result.err_code == '0') {
            res.render('bank/bank-list', {
                cards: result.data.cards
            });
        } else {
            res.render('bank/bank-list', {
                msg: result.err_msg
            });
        }
    }, req);
};

BankController.prototype.validCode = function (req, res) {
    if (req.session.source == 'sendCode') {
        req.session.source = null;
        res.render('bank/bank-code', {
            phone: req.session.phone || {},
            msg: req.flash('msg')
        });
    } else {
        var sendData = {};
        sendData.username = req.body.username;
        sendData.idcardno = req.body.idcardno;
        sendData.cardno = req.body.cardno;
        sendData.phone = req.body.phone;
        sendData.userId = req.session.userId;
        console.log(req.session.requestid);
        base.postJson({
            url: req.API_HOST + '/api/pay/bindcard',
            form: sendData
        }, function (result) {
            if (result.err_code == '0') {
                req.session.requestid = result.data.requestid;
                req.session.phone = req.body.phone;
                res.render('bank/bank-code', {
                    phone: req.body.phone
                });
            } else {
                req.flash('msg', result.err_msg);
                req.flash('bank', sendData);
                res.redirect('/bank/add');
            }
        }, req);
    }
};

BankController.prototype.sendCode = function (req, res) {
    var sendData = {};
    sendData.validatecode = req.body.validatecode;
    sendData.requestid = req.session.requestid;
    sendData.userId = req.session.userId;
    var movie2_url = req.session.movie2_url; //来自于movieControler.js。意为荠菜观影季的url
    if (!/\d{6}/.test(sendData.validatecode)) {
        req.flash('msg', '验证码格式错误');
        req.session.source = 'sendCode';
        res.redirect('/bank/validcode');
    } else {
        base.postJson({
            url: req.API_HOST + '/api/pay/bindcard/confirm',
            form: sendData
        }, function (result) {
            if (result.err_code == '0') {
                if (req.session.investbindBack != null || req.session.investbindBack != undefined) {
                    res.redirect(req.session.investbindBack);
                } else if (movie2_url) {
                    res.redirect(movie2_url);//这里说明是从荠菜观影季过来的，认证后跳回去。
                } else {
                    res.redirect('/bank/list');
                }
            } else {
                req.flash('msg', result.err_msg);
                req.session.source = 'sendCode';
                res.redirect('/bank/validcode');
            }
        }, req);
    }
};

BankController.prototype.repeatCode = function (req, res) {
    base.postJson({
        url: req.API_HOST + '/api/pay/sendmsg',
        form: {
            requestid: req.session.requestid
        }
    }, function (result) {
        var msg = '';
        if (result.err_code == '0') {
            msg = '短信已发送';
        } else {
            msg = result.err_msg;
        }
        req.flash('msg', msg);
        req.session.source = 'sendCode';
        res.redirect('/bank/validcode');
    }, req);
};
module.exports = BankController;