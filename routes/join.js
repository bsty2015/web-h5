var express = require('express');
var router = express.Router();

router.get('/join', function (req, res, next) {
    res.render('invite/join');

});
module.exports = router;