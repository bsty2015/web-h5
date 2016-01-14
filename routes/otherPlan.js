var express = require('express');
var router = express.Router();

router.get('/plan', function (req, res, next) {
    res.render('other/plan');
});

module.exports = router;
