var express = require('express');
var router = express.Router();

router.get('/safety', function (req, res, next) {
    res.render('other/safety');
});

module.exports = router;
