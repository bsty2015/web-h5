var Base = require('./baseController'),
    util = require('util'),
    request = require('request');
var base = new Base();
function SocketIoPayController() {
}
util.inherits(SocketIoPayController, Base);

SocketIoPayController.prototype.connect = function (client) {
    var _this = this;
    client.on('payCheck', function (data) {
        //添加投资记录判断记录是否存在和这笔记录是否已完成
        console.log(data.orderId + "=========");
        base.postJson({
            url: req.API_HOST + '/api/invest/isExistOrderId',
            form: {
                orderId: data.orderId
            }
        }, function (result) {
            if (result.err_code == '0' && result.data != '') {

            } else {
                _this.joinRoom(client, result.data);
            }
        }, req);
    });
};

SocketIoPayController.prototype.joinRoom = function (client, data) {
    if (data.orderId) {
        client.join(data.orderId);
    }

};
module.exports = SocketIoPayController;