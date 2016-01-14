var express = require('express'),
    LoginController = require('../controllers/loginController'),
    router = express.Router();

var login = new LoginController();

router.get('/login', login.index);

router.post('/login', login.login);

router.all('/signout', login.signout);

module.exports = router;