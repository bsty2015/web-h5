var express = require('express');
router = express.Router(),
    midAutumnFestivalController = require('../controllers/midAutumnFestivalController');

var midAutumn = new midAutumnFestivalController();

/**
 * 中秋节-老用户页面
 */
router.get('/midatminv', midAutumn.status);
/**
 * 中秋节-新用户页面
 */
router.get('/midatmreg', midAutumn.midatmreg);
module.exports = router;


