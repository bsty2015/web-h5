var express = require('express');
var router = express.Router();

router.get('/about', function (req, res, next) {
    res.locals.bottomMeu = 'about';
    var code = '';
    if (req.session.user) {
        code = req.session.user.userKey;
    }
    res.render('about', {code: code});
});

module.exports = router;
