var Base = require('./baseController'),
    util = require('util');
var base = new Base();

function InvitationController() {
}
util.inherits(InvitationController, Base);

InvitationController.prototype.invite = function (req, res) {
    var code = req.query.code;
    var telephone = undefined;
    var isRegisted = false;
    if (req.session.userId) {
        isRegisted = true;
        res.redirect('/user/home')

    }
    if (code) {

        base.postJson({
            url: req.API_HOST + '/api/user/queryInviteTel',
            form: {
                code: code
            }
        }, function (result) {
            if (result.err_code == '0' && result.data) {
                res.cookie('code', code, {
                    maxAge: 3600000 * 24 * 7,
                    httpOnly: true
                });
                telephone = result.data.telephone;
                req.session.telephone = telephone;
            }
            res.render('invite/invitation', {
                telephone: telephone,
                userId: req.session.userId,
                isRegisted: isRegisted
            });
        }, req);
    } else {
        res.render('invite/invitation', {
            telephone: req.session.telephone,
            msg: req.flash('msg'),
            userId: req.session.userId,
            isRegisted: isRegisted
        });
    }
};
InvitationController.prototype.inviteList = function (req, res) {
    var upai = '';
    base.postJson({
        url: req.API_HOST + '/api/invite/list',
        form: {
            userId: req.session.userId,
            pageSize: 10000
        }
    }, function (result) {
        var invites = [];
        if (result.err_code == '0') {
            invites = result.data.invites;
        }
        res.render('invite/invitation-list', {
            invites: invites,
            upai: result.data.encodeLink,
            code: req.session.user.userKey
        });
    }, req);

};
InvitationController.prototype.inviteReg = function (req, res) {
    var passwd = req.body.passwd; //密码
    var tel = req.body.telephone; //电话
    var validateCode = req.body.validateCode; //短信验证码
    var code = req.cookies.code || '';
    if (tel == null || req == undefined || tel.trim() == '' || validateCode == null || validateCode.trim() == '') {
        req.flash('msg', '请填写完整信息');
    } else {
        base.postJson({
            url: req.API_HOST + '/api/register',
            form: {
                telephone: tel,
                passwd: passwd,
                platform: 'h5',
                inviteCode: code,
                source: res.locals.cs,
                validateCode: validateCode
            }
        }, function (result) {
            if (result.err_code == '0') {
                req.session.regenerate(function () {
                    req.session.userId = result.data.user.id;
                    req.session.user = result.data.user;
                    req.session.accessToken = result.data.user.accessToken;
                    req.session.save(); //保存一下修改后的Session
                    req.flash('userId', req.session.userId);
                    res.redirect('/join');
                });
            } else {
                console.log('msg' + result.err_msg);
                req.flash('msg', result.err_msg);
                req.flash('telephone', tel);
                req.flash('validateCode', validateCode);
                res.redirect('/invite');

            }
        });
    }
}
module.exports = InvitationController;