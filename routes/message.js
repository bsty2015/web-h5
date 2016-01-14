var express = require('express'),
    MessageController = require('../controllers/messageController'),
    router = express.Router();
var message = new MessageController();

router.get('/user/message', message.list);

router.get('/user/messageDetail/:id', message.detail);


module.exports = router;
