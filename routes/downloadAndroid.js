var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/downloadAndroid', function (req, res, next) {
    res.download(path.join(__dirname, '../public/androidapk/app-gplay-release2015-09-25-16-52.apk'));
});
router.get('/Appdown', function (req, res, next) {
//res.download(path.join(__dirname, '../public/androidapk/app-gplay-release2015-09-25-16-52.apk'));
    res.render('appdown/appdown')
});

module.exports = router;
