var express = require('express');
var router = express.Router();

router.get('/fqa', function (req, res, next) {
    res.render('other/fqa');
});

module.exports = router;
