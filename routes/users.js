var express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/userController');

var user = new UserController();

router.get('/user/*', user.checkLogin, user.selectMenu);

router.get('/user/home', user.home);

router.get('/user/info', user.userInfo);

router.get('/user/productList', user.productList);


router.get('/user/productDetail/:id', user.productDetail);

router.get('/user/invest/:id', user.invest);

router.get('/user/changePassword', user.changePasswd);

router.post('/user/savePassword', user.savePasswd);

router.get('/user/unpay', user.unpayList);

router.all('/user/invest/repayInvest/:orderId', user.repeatInvest);

router.all('/user/credit', user.queryCredit);

router.all('/user/cash', user.queryCash);

router.all('/user/dealDetail', user.queryDealDetail);

module.exports = router;

