var express = require('express');
var router = express.Router();

router.get('/404', function (req, res, next) {
    res.render('other/404');
});

module.exports = router;
