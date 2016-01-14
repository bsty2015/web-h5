var request = require('request');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var clearEncoding = 'utf8';
var cipherEncoding = 'base64'; // hex, base64
var algorithm = 'aes-128-ecb';
var key = 'S-ret#ass&h2.PsI';

function BaseController() {

}
BaseController.prototype.checkLogin = function (req, res, next) {
    var userId = req.session.userId;
    req.session.loginBackUrl = req.originalUrl;
    if (userId == null) {
        res.redirect('/login');
    } else {
        next();
    }

};

BaseController.prototype.postJson = function (data, callback, req) {
    data = data || {};
    data.strictSSL = 'false';
    if (req && data.form) {
        data.form.accessToken = req.session.accessToken || req.body.accessToken || req.query.accessToken || req.cookies.accessToken || '';
        data.form.platform = 'h5';
    }
    if (req) {
        data.headers = {
            'X-Forwarded-For': req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip
        };
    }

    request.post(data, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var result = JSON.parse(body);
                callback(result);
            } catch (e) {
                console.log('err', e.stack);
            }
        }
    });
};

BaseController.prototype.isEmpty = function (val) {
    if (val == undefined || val == null || val.trim() == '') {
        return true;
    } else {
        return false;
    }
};
BaseController.prototype.getStr = function (val) {
    if (val instanceof Array) {
        return val[0];
    } else {
        return val;
    }
}

BaseController.prototype.md5 = function (val, salt) {
    return crypto.createHash('md5').update(val + salt).digest("hex");
}

BaseController.prototype.md5Param = function (val, salt) {
    var tmp = val.sort() || [];
    var str = '';
    val.forEach(function (item) {
        str += item;
    });
    md5.update(str.trim() + salt);
    return md5.digest('hex');
}

BaseController.prototype.encryptAES = function (data) {
    var iv = new Buffer('');
    var cipherChunks = [];
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    return cipherChunks.join('');
}

BaseController.prototype.decryptionAES = function (data, key) {
    var iv = new Buffer('');
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));
    return cipherChunks.join('');
}

BaseController.prototype.signAjax = function (req, res) {
    var timestamp = new Date().getTime();//时间戳
    var accessToken = this.encryptAES(req.session.accessToken + ":" + timestamp);
    var sign = this.md5(accessToken, timestamp + key);
    res.locals.accessToken = accessToken;
    res.locals.timestamp = timestamp;
}

module.exports = BaseController;