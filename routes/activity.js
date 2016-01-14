var express = require('express');
var router = express.Router();

router.get('/activity', function (req, res, next) {
    res.render('other/activity');
});

module.exports = router;
