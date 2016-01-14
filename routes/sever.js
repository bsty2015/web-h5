var express = require('express');
var router = express.Router();

router.get('/aboutforUs', function (req, res, next) {
    res.render('other/aboutforus');
});

module.exports = router;
