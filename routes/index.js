var express = require('express');
var IndexController = require('../controllers/indexController');
var router = express.Router();
var index = new IndexController();

/* GET home page. */
router.get('/', index.list);

/*
 * 	TIME：2015-12-31 11:44:18
 * 	USER：wushuang
 * 	DEC：邮政/银行额度调整公共详情页
 * 	PAGE：bank_cmsg_1231.html
 */ 
router.get('/bank/msg/1231', function(req,res,next){
	res.render('other/bank_cmsg_1231')
});

//**----- 百度 ------**
//router.get('/mpz', function(req, res, next) {
//res.locals.isCanShare = false;
// 	console.log('--------------------------'+req.hostname)
//res.render('mpz', { title: 'Express uuuuu' });
//});

module.exports = router;