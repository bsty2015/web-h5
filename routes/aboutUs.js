var express = require('express');
var router = express.Router();

router.get('/aboutUs', function (req, res, next) {
    res.render('other/aboutUs');
});

module.exports = router;
