var express = require('express');
var router = express.Router();

router.get('/movieDownload', function (req, res, next) {
    res.render('other/movieDownload');

});

module.exports = router;