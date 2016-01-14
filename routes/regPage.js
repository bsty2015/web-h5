var express = require('express'),
    oRegisterController = require('../controllers/registerController');
var router = express.Router();
var oRegPage = new oRegisterController();
router.get('/regpage', oRegPage.regPage);
module.exports = router;