var express = require('express');
router = express.Router(),
    productController = require('../controllers/productController');
var virtual = new productController();
/*
 * 1元体验金部分代码。
 * 列表页、购买页面
 */
router.get('/virtual/detail/:proId', virtual.virtualDetail);

router.get('/buy', function (req, res, next) {
    res.render('virtualGifts/purchase');
});

router.all('/virtual/list', virtual.virtualList);

router.get('/virtual/invest/:id', virtual.checkLogin, virtual.virtualInvest);

router.get('/expintro', virtual.registerTel);
/*
 * 活动规则
 */
router.get('/virtual/rule', function (req, res, next) {
    res.render('virtualGifts/rule');
});

router.get('/virtual/productDetail/:id', virtual.productDetail);

module.exports = router;
