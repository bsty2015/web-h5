var request = require('request');
var Base = require('./baseController');
var util = require('util');
var base = new Base();
function ProductController() {
}
util.inherits(ProductController, Base);
ProductController.prototype.list = function (req, res) {
    req.session.backURL = undefined;
    res.locals.isCanShare = false;
    res.locals.bottomMeu = 'product';
    base.postJson({
        url: req.API_HOST + '/api/product/list',
        form: {pageSize: 100000}
    }, function (result) {
        if (result.err_code == '0') {
            req.session.activity = '无';
            res.render('product/product', {products: result.data.products});
        } else {
            msg = result.err_msg;
            res.render('product/product', {msg: result.err_msg});
        }
    }, req);
};

ProductController.prototype.detail = function (req, res) {
    res.locals.isCanShare = false;
    var id = req.params.id;
    base.postJson({
        url: req.API_HOST + '/api/product/detail',
        form: {id: id}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('product/product-detail', {product: result.data.product, msg: ''});
        } else {
            msg = result.err_msg;
            res.render('product/product-detail', {msg: result.err_msg});
        }
    });
};

ProductController.prototype.details = function (req, res) {
    var id = req.params.id;
    base.postJson({
        url: req.API_HOST + '/api/product/assetDetail',
        form: {id: id}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('product/details', {detail: result.data.assetDetail});
        } else {
            msg = result.err_msg;
            res.render('product/details', {msg: result.err_msg});
        }
    });
};


ProductController.prototype.virtualList = function (req, res) {
    var userId = req.session.userId;
    base.postJson({
        url: req.API_HOST + '/api/product/virtualList',
        form: {userId: req.session.userId}
    }, function (result) {
        if (result.err_code == '0') {
            req.session.activity = '无';
            res.render('virtualGifts/exper', {products: result.data.products});
        } else {
            msg = result.err_msg;
            res.render('virtualGifts/exper', {msg: result.err_msg, products: []});
        }
    });
}


ProductController.prototype.virtualDetail = function (req, res) {
    var proId = req.params.proId;
    base.postJson({
        url: req.API_HOST + '/api/product/virtualDetail',
        form: {proId: proId}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('virtualGifts/productList', {product: result.data.product});
        } else {
            msg = result.err_msg;
            res.render('virtualGifts/productList', {msg: result.err_msg});
        }
    });
}

ProductController.prototype.productDetail = function (req, res) {
    base.postJson({
        url: req.API_HOST + '/api/product/virtualPro',
        form: {proId: req.params.id, userId: req.session.userId}
    }, function (result) {
    }, req);
    base.postJson({
        url: req.API_HOST + '/api/user/invest/productDetail',
        form: {id: req.params.id}
    }, function (result) {
        if (result.err_code == '0') {
            console.log('date' + new Date(result.data.investProDetail.expireDate));
            res.render('virtualGifts/details', {investProDetail: result.data.investProDetail});
        } else {
            msg = result.err_msg;
            res.render('virtualGifts/details', {msg: result.err_msg});
        }
    }, req);
};

ProductController.prototype.registerTel = function (req, res) {
    req.session.backURL = '/virtual/list';
    req.session.errorBackURL = '/expintro';
    res.render('virtualGifts/expintro', {telephone: req.flash('telephone'), msg: req.flash('msg')});
};
ProductController.prototype.virtualInvest = function (req, res, next) {
    var productId = req.params.id;
    var cardId = req.query.cardId || req.flash('cardId');
    var investAmt = 1;
    req.session.productId = productId;
    base.postJson({
        url: req.API_HOST + '/api/product/virtualList',
        form: {userId: req.session.userId}
    }, function (result) {
        console.info(result.data.products[0]);
        if (result.err_code == '0' && result.data.products[0].isSale == '1') {
            res.render('virtualGifts/exper', {products: result.data.products});
        } else {
            base.postJson({
                url: req.API_HOST + '/api/invest/pay',
                form: {userId: req.session.userId, productId: productId, cardId: cardId}
            }, function (result) {
                console.info(result.data.product.name + "=======" + result.data.product.category);
                if (result.err_code == '0') {
                    var card = result.data.card;
                    if (card != null || card != undefined) {
                        req.session.cardId = card.id;
                    }
                    req.session.virtualPay = true;
                    res.render('virtualGifts/purchase',
                        {
                            product: result.data.product,
                            card: card,
                            remainAmt: result.data.remainAmt,
                            investAmt: investAmt,
                            profit: result.data.profit,
                            ownCards: result.data.ownCards,
                            productId: productId,
                            msg: req.flash('msg')
                        });
                } else {
                    res.locals.msg = result.err_msg;
                    res.render('virtualGifts/purchase');
                }
            }, req);
        }
    });

};


ProductController.prototype.prolist = function (req, res) {
    var isBind = req.session.isBind || false;
    if (!isBind) {
        base.postJson({
            url: req.API_HOST + '/api/wechat/isbind',
            form: {
                source: '集财圈儿',
                userId: req.session.userId
            }
        }, function (result) {
            if (result.err_code == '0' && !result.data.isbind) {
                res.render('wechat_dec_activity/wechatauth');
            } else {
                req.session.isBind = true;
                queryActivityProList(req, res);
            }
        }, req);
    } else {
        queryActivityProList(req, res);
    }

}

function queryActivityProList(req, res) {
    base.postJson({
        url: req.API_HOST + '/api/product/xmas/prolist',
        form: {userId: req.session.userId}
    }, function (result) {
        if (result.err_code == '0') {
            req.session.activity = '圣诞';
            res.render('wechat_dec_activity/second/productlist', {products: result.data.products});
        } else {
            res.render('wechat_dec_activity/second/productlist', {products: result.data.products});
        }
    }, req);
}


ProductController.prototype.productThird = function (req, res) {
    var isBind = req.session.isBind || false;
    if (!isBind) {
        base.postJson({
            url: req.API_HOST + '/api/wechat/isbind',
            form: {
                source: '集财圈儿',
                userId: req.session.userId
            }
        }, function (result) {
            if (result.err_code == '0' && !result.data.isbind) {
                res.render('wechat_dec_activity/wechatauth');
            } else {
                req.session.isBind = true;
                 proListThird(req, res);
            }
        }, req);
    } else {
        proListThird(req, res);
    }

}

function  proListThird(req, res) {
    base.postJson({
        url: req.API_HOST + '/api/product/third/prolist',
    }, function (result) {
        if (result.err_code == '0') {
            req.session.activity = '贺岁第三弹';
            res.render('wechat_dec_activity/third/product', {products: result.data.products});
        } else {
            res.render('wechat_dec_activity/third/product', {products: result.data.products});
        }
    }, req);
}


module.exports = ProductController;