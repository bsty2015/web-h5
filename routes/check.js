/**
 * Created by lrh on 13/8/15.
 */
var fs = require('fs');
var express = require('express'),
    router = express.Router();
router.get('/status/check', function (req, res, next) {
    var status = fs.readFileSync('../status');
    res.status(status);
    if (status == '200') {
        res.send('ok');
    } else {
        res.send('err');
    }
});
module.exports = router;