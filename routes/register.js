var express = require('express'),
    RegisterController = require('../controllers/registerController'),
    router = express.Router();

var register = new RegisterController();

//router.get('/register/register-passwd', register.registerPasswd);

//router.post('/register/verifyCode', register.verifyCode);

//router.post('/register/verifyTelephone', register.verifyTelephone);

router.post('/register', register.register);

//router.post('/register/thirdRegister', register.thirdRegister);


module.exports = router;
