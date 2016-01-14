var express = require('express');
var router = express.Router();
var ProtocolController = require('../controllers/protocolController');
var protocol = new ProtocolController();
router.get('/useragreement', function (req, res, next) {
    res.render('protocol/user-agreement');
});
router.all('/contract/:orderId', protocol.debtContract);

router.all('/pay/contract', protocol.investContract);

module.exports = router;
