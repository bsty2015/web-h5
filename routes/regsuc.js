var express = require('express');
var router = express.Router();

router.get('/regsuc', function (req, res, next) {
    res.render('register/regsuc');
});

module.exports = router;
