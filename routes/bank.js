var express = require('express'),
    BankController = require('../controllers/bankController'),
    router = express.Router();
var bank = new BankController();

router.get('/bank/*', bank.checkLogin);

router.get('/bank/add', bank.add);

router.get('/bank/list', bank.list);

router.all('/bank/validcode', bank.validCode);

router.post('/bank/sendCode', bank.sendCode);

router.all('/bank/repeatCode', bank.repeatCode);



module.exports = router;
