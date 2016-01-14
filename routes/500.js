var express = require('express');
var router = express.Router();

router.get('/500', function (req, res, next) {
    res.render('other/500');
});

module.exports = router;
