/**
 * time:2015年11月9日11:06:30
 * user：zhongciyisheng@live.com
 * 描述：荠菜观影季的路由。
 */
var express = require('express'),
    movieController = require('../controllers/movieController'),
    router = express.Router();

var movie2 = new movieController();
router.get('/movieseason', movie2.page_come_in);

module.exports = router;