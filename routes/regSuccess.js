var express = require('express');
var router = express.Router();

router.get('/regSuccess', function (req, res, next) {
    res.render('register/regSuccess');
});

module.exports = router;
