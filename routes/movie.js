var express = require('express'),
    router = express.Router(),
    movieController = require('../controllers/movieController');

var movie = new movieController();

/**
 * 中秋节-老用户页面
 */
router.get('/movie', movie.status);
router.get('/movie/wp', movie.status);//微票过来的
router.post('/moviereg', movie.moviereg);

module.exports = router;


