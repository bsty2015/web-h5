var express = require('express'),
    router = express.Router(),
    PayController = require('../controllers/payController');

var pay = new PayController();

router.all('/invest/pay', pay.pay);

router.all('/invest/payConfirm', pay.payConfirm);

router.all('/invest/paystatus', pay.checkPayStatus);

router.all('/invest/repeatCode', pay.repeatCode);

router.all('/invest/succ', function (req, res) {
    res.render('pay/pay-success');
});

router.all('/invest/fail', function (req, res) {
    res.render('pay/pay-failure');
});
router.all('/invest/wait', function (req, res) {
    res.render('pay/pay-wait');
});

router.all('/invest/repeatPay', pay.repeatPay);


module.exports = router;

