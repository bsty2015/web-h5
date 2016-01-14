var express = require('express');
var router = express.Router();

router.get('/sever', function (req, res, next) {
    res.render('other/sever');
});

module.exports = router;
