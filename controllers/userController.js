var Base = require('./baseController'),
    util = require('util'),
    request = require('request');
var base = new Base();
var async = require('async');

function UserController() {
}
util.inherits(UserController, Base);

UserController.prototype.selectMenu = function (req, res, next) {
    res.locals.bottomMeu = 'ucenter';
    next();
};
UserController.prototype.home = function (req, res) {
    req.session.inviteSource = true;
    req.session.investbindBack = null;
    var msg = req.flash('msg');
    base.postJson({
        url: req.API_HOST + '/api/user/index',
        form: {userId: req.session.userId}
    }, function (result) {
        if (result.err_code == '0') {
            req.session.totalAmt = result.data.userInfo.totalAssetAmt;
            req.session.user = result.data.userInfo;
            var backURL = req.session.backURL;
            if (backURL && backURL != '') {
                req.session.backURL = '';
                res.redirect(backURL);
            } else {
                res.render('user/home', {user: result.data.userInfo, msg: msg});
            }
        } else if (msg == '投资者账号不存在') {
            res.redirect('/signout');
        } else {
            res.redirect('/signout');
        }
    }, req);
};

UserController.prototype.productList = function (req, res) {
    var status = req.query.status;
    req.app.locals.ac = req.query.ac;
    if (status == undefined) {
        status = '待还款';
    }
    async.series({
            holder: function (callback) {
                base.postJson({
                    url: req.API_HOST + '/api/user/invest/product',
                    form: {
                        userId: req.session.userId,
                        status: '待还款'
                    }
                },function(result) {
                    if (result.err_code == '0') {
                        callback(null, result.page.totalNum);
                    } else {
                        callback(null, '');
                    }
                }, req);
            },
            casher: function (callback) {
                base.postJson({
                    url: req.API_HOST + '/api/user/invest/product',
                    form: {
                        userId: req.session.userId,
                        status: '已还款'
                    }
                },function(result) {
                    if (result.err_code == '0') {
                        callback(null, result.page.totalNum);
                    } else {
                        callback(null, '');
                    }
                }, req);
            },
        },
        function (err, results) {
            res.render('user/invest-product-list',{holdNum:results.holder,cashNum:results.casher});
        });
};

UserController.prototype.productDetail = function (req, res) {
    base.postJson({
        url: req.API_HOST + '/api/user/invest/productDetail',
        form: {id: req.params.id}
    }, function (result) {
        if (result.err_code == '0') {
            console.log('date' + new Date(result.data.investProDetail.expireDate));
            res.render('user/invest-product-detail', {investProDetail: result.data.investProDetail});
        } else {
            msg = result.err_msg;
            res.render('user/invest-product-detail', {msg: result.err_msg});
        }
    }, req);
};

UserController.prototype.invest = function (req, res, next) {
    req.session.virtualPay = null;
    var productId = req.params.id;
    var cardId = req.query.cardId || req.flash('cardId');
    var investAmt = req.flash('investAmt') || '';
    if (req.query.investAmt) {
        investAmt = req.query.investAmt;
    }
    //console.log(req.session.activity+"============");
    req.session.productId = productId;
    base.postJson({
        url: req.API_HOST + '/api/invest/pay',
        form: {userId: req.session.userId, productId: productId, cardId: cardId}
    }, function (result) {
        if (result.err_code == '0') {
            var card = result.data.card;
            if (card != null || card != undefined) {
                req.session.cardId = card.id;
            } else {
                req.session.investbindBack = '/user/invest/' + productId;
            }
            res.render('user/invest',
                {
                    product: result.data.product,
                    card: card,
                    remainAmt: result.data.remainAmt,
                    investAmt: investAmt,
                    profit: result.data.profit,
                    ownCards: result.data.ownCards,
                    productId: productId, msg: req.flash('msg')
                });
        } else {
            empty = {
                product: {},
                card: null,
                remainAmt: 0,
                investAmt: 0,
                profit: 0,
                ownCards: [],
                productId: productId,
                msg: result.err_msg
            };
            res.render('user/invest', empty);
        }
    }, req);
};


UserController.prototype.userInfo = function (req, res) {
    base.postJson({
        url: req.API_HOST + '/api/user/userInfo',
        form: {userId: req.session.userId}
    }, function (result) {
        if (result.err_code == '0') {
            req.session.user = result.data.userInfo;
            res.render('user/user-info', {user: result.data.userInfo, msg: req.flash('msg')});
        } else {
            msg = result.err_msg;
            res.render('user/user-info', {msg: result.err_msg});
        }
    }, req);
};

UserController.prototype.changePasswd = function (req, res) {
    res.render('user/change-password');
};

UserController.prototype.savePasswd = function (req, res) {
    var oldPasswd = req.body.oldPasswd;
    var newPasswd = req.body.newPasswd;
    base.postJson({
        url: req.API_HOST + '/api/user/changePasswd',
        form: {userId: req.session.userId, oldPasswd: oldPasswd, newPasswd: newPasswd}
    }, function (result) {
        var msg = '';
        if (result.err_code == '0') {
            req.flash('msg', '密码修改成功');
            res.redirect('/user/info');
        } else {
            res.render('user/change-password', {msg: result.err_msg});
        }


    }, req);
};

UserController.prototype.unpayList = function (req, res) {
    var msg = req.flash('msg');
    base.postJson({
        url: req.API_HOST + '/api/user/invest/product',
        form: {userId: req.session.userId, status: '支付中'}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('user/pay-not-list', {products: result.data.products, msg: msg});
        } else {
            msg = result.err_msg;
            res.render('user/pay-not-list', {msg: result.err_msg, products: {}});
        }
    }, req);
};

UserController.prototype.repeatInvest = function (req, res, next) {
    var orderId = req.params.orderId;
    var cardId = req.query.cardId;
    var msg = req.flash('msg');
    base.postJson({
        url: req.API_HOST + '/api/invest/repeatpay',
        form: {userId: req.session.userId, orderId: orderId, cardId: cardId}
    }, function (result) {
        if (result.err_code == '0') {
            var card = result.data.card;
            if (card != null || card != undefined) {
                req.session.cardId = card.id;
            } else {
                req.session.investbindBack = '/user/invest/repayInvest/' + orderId;
            }
            res.render('user/repay-invest',
                {
                    product: result.data.product,
                    card: card,
                    investAmt: result.data.investAmt,
                    profit: result.data.profit,
                    ownCards: result.data.ownCards,
                    orderId: orderId,
                    msg: msg
                });
        } else {
            empty = {
                product: {},
                card: null,
                remainAmt: 0,
                investAmt: 0,
                profit: 0,
                ownCards: [],
                productId: productId,
                msg: result.err_msg
            };
            res.render('user/repay-invest', empty);
        }
    }, req);
};


UserController.prototype.queryDealDetail = function (req, res, next) {
    var type = req.query.type || 'all';
    var url = '/api/deal/list';
    if (type == 'corpus') {
        url = '/api/user/corpus/list';
    } else if (type == 'profit') {
        url = '/api/profit/list';
    } else if (type == 'cash') {
        url = '/api/cash/list';
    } else if (type == 'pay') {
        url = '/api/deal/paylist';
    }
    base.postJson({
        url: req.API_HOST + url,
        form: {userId: req.session.userId, pageSize: 10000}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('user/deal-detail', {details: result.data.details, type: type});
        } else {
            res.render('user/deal-detail', {msg: result.err_msg});
        }
    }, req);

};

UserController.prototype.queryCash = function (req, res, next) {
    base.postJson({
        url: req.API_HOST + '/api/cash/list',
        form: {userId: req.session.userId, pageSize: 10000}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('user/cash', {details: result.data.details});
        } else {
            res.render('user/cash', {msg: result.err_msg});
        }
    }, req);
};

UserController.prototype.queryCredit = function (req, res, next) {
    res.render('user/credit', {userId: req.session.userId});
};

module.exports = UserController;