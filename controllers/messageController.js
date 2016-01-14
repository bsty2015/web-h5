var request = require('request');
var Base = require('./baseController');
var base = new Base();
function MessageController() {
}

MessageController.prototype.list = function (req, res) {
    res.locals.bottomMeu = 'ucenter';
    base.postJson({
        url: req.API_HOST + '/api/message/list',
        form: {userId: req.session.userId, pageSize: 100000}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('message/message', {messages: result.data.messages});
        } else {
            msg = result.err_msg;
            res.render('message/message', {msg: result.err_msg});
        }
    }, req);
};

MessageController.prototype.detail = function (req, res) {
    res.locals.bottomMeu = 'ucenter';
    var msgId = req.params.id;
    base.postJson({
        url: req.API_HOST + '/api/message/detail',
        form: {userId: req.session.userId, msgId: msgId}
    }, function (result) {
        if (result.err_code == '0') {
            res.render('message/message-detail', {messageItem: result.data.messageItem});
        } else {
            msg = result.err_msg;
            res.render('message/message-detail', {msg: result.err_msg});
        }
    }, req);
};
module.exports = MessageController;