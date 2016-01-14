var express = require('express'),
    ForgetController = require('../controllers/forgetController'),
    router = express.Router();

var forget = new ForgetController();

router.get('/forgetPage', forget.ComeIn);
//router.get('/forget/forget-tel', forget.forgetTel);
//router.all('/forget/forget-code', forget.sendCode);

//router.get('/forget/forget-passwd', forget.forgetPasswd);

//router.post('/forget/verifyCode', forget.verifyCode);

//router.post('/forget/verifyTelephone', forget.verifyTelephone);

router.post('/forget', forget.forget);

module.exports = router;
