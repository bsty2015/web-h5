require('seajs');
var regexUtil = require('../public/common/regexUtil'),
	request = require('request'),
	uuid = require('node-uuid'),
	apiHost = global.API_HOST;
var Base = require('./baseController');
var base = new Base();

function RegisterController() {

}

RegisterController.prototype.sendCode = function(req, res) {
	var tel = req.session.regTel;
	if (tel == null || tel == undefined) {
		req.session.regFlage = false;
		res.redirect('/register/register-tel');
	} else {
		if (regexUtil.verifyTelephone(tel)) {
			base.postJson({
				url: req.API_HOST + '/api/msg/code',
				form: {
					telephone: tel,
					bus: 'reg'
				}
			}, function(result) {
				if (result.err_code == '0') {
					res.render('register/regCode', {
						telephone: tel
					});
				} else {
					res.render('register/regCode', {
						telephone: tel,
						msg: result.err_msg
					});
				}
			}, req);
		} else {
			req.flash('msg', '电话号码格式错误');
			req.flash('telephone', tel);
			res.redirect('/register/register-tel');
		}
	}

};

RegisterController.prototype.verifyCode = function(req, res) {
	var code = req.body.code;
	var telephone = req.session.regTel;
	if (!/\d{6}/.test(code)) {
		res.render('register/regCode', {
			telephone: telephone,
			msg: '验证码输入错误,请重新发送'
		});
	} else if (telephone == null || telephone == undefined) {
		req.session.regFlage = false;
		res.redirect('/register/register-tel');
	} else {
		base.postJson({
			url: req.API_HOST + '/api/msg/code/verify',
			form: {
				code: code,
				telephone: telephone
			}
		}, function(result) {
			req.flash('telephone', telephone);
			if (result.err_code == '0') {
				req.session.regFlage = true;
				req.session.registerCode = code;
				res.redirect('/register/register-passwd');
			} else {
				res.render('register/regCode', {
					telephone: telephone,
					msg: '验证码输入错误,请重新发送'
				});
			}
		});
	}
};

RegisterController.prototype.verifyTelephone = function(req, res) {
	var tel = req.body.telephone;
	var errorBackURL = req.session.errorBackURL;
	base.postJson({
		url: req.API_HOST + '/api/validateTelephone',
		form: {
			telephone: tel
		}
	}, function(result) {
		req.flash('telephone', tel);
		var isExist = true;
		if (result.err_code == '0') {
			isExist = result.data.isExist;
		}
		if (result.err_code == '0' && !isExist) {
			req.session.regTel = tel;
			res.redirect('/register/register-code');

		} else {
			if (isExist && result.data) {
				req.flash('msg', '手机号码已被注册');
				if (errorBackURL && errorBackURL != '') {
					res.redirect(errorBackURL);
				} else {
					res.redirect('/register/register-tel');
				}
			} else {
				req.flash('msg', result.err_msg);
				res.redirect('/register/register-tel');
			}
		}
	});
};

RegisterController.prototype.register = function(req, res) {
	var passwd = req.body.passwd; //从页面获取密码
	//	var tel = req.session.regTel;
	var movie2_url = req.session.movie2_url;
	var tel = req.body.telephone; //从页面获取手机号码
	var regFlage = req.session.regFlage; //
	//	var validateCode = req.session.registerCode;
	var validateCode = req.body.validateCode; //验证码，从页面获取
	var code = req.cookies.code || '';
	var backURL = req.session.backURL;
	var wechat_Dec_activity = req.session.wechat_Dec_activity;
	var xmasurl = req.session.xmasurl;
	var xmasurl3 = req.session.xmasurl3;
	var xmasThirdurl = req.session.xmasThirdurl;
	var cs = res.locals.cs;

	if (xmasurl) {
		cs = 'xmas';
	} else if (xmasThirdurl) {
		cs = 'xmasThirdurl';
	} else if (xmasurl3) {
		cs = 'ypdct';
	};
	if (tel == null || req == undefined || tel.trim() == '' || validateCode == null || validateCode.trim() == '') {
		req.session.regFlage = false;
		//		res.redirect('/register/register-tel');
		if (wechat_Dec_activity) {
			res.redirect('/redreg');
		} else {
			res.redirect('/regpage');
		}
	} else {
		base.postJson({
			url: req.API_HOST + '/api/register',
			form: {
				telephone: tel,
				passwd: passwd,
				validateCode: validateCode,
				inviteCode: code,
				platform: 'h5',
				source: cs
			}
		}, function(result) {
			if (result.err_code == '0') {
				req.session.regFlage = false;
				req.session.regTel = null;
				req.session.registerCode = null;
				req.session.regenerate(function() {
					req.session.userId = result.data.user.id;
					req.session.user = result.data.user;
					req.session.accessToken = result.data.user.accessToken;
					req.session.backURL = undefined;
					req.session.save(); //保存一下修改后的Session
					if (backURL) {
						res.redirect(backURL);
					} else if (movie2_url) {
						res.redirect(movie2_url);
					} else if (wechat_Dec_activity) {
						res.redirect(wechat_Dec_activity);
					} else if (xmasurl) {
						req.session.xmasurl = null;
						res.render('wechat_dec_activity/wechatauth');
					} else if (xmasThirdurl) {
						req.session.xmasThirdurl = null;
						res.render('wechat_dec_activity/wechatauth');
					} else if (xmasurl3) {
						req.session.xmasurl3 = null;
						res.render('wechat_dec_activity/wechatauth');
					} else {
						res.redirect('/regsuc');
					}

				});
			} else {
				req.flash('msg', result.err_msg);
				req.flash('telephone', tel);
				if (wechat_Dec_activity) {
					res.redirect('/redreg');
				} else {
					res.redirect('/regPage');
				}
			}
		});
	}

};
RegisterController.prototype.regPage = function(req, res) {
	res.render('register/regPage', {
		msg: req.flash('msg')
	});
};

RegisterController.prototype.thirdRegister = function(req, res) {
	var passwd = req.body.passwd;
	var tel = req.body.telephone;
	var cs = res.locals.cs;
	var validateCode = req.body.validateCode;
	var code = req.cookies.code || '';
	var xluserid = req.cookies.xluserid || req.body.xluserid || '';
	var time = req.cookies.time || req.body.time || '';
	var sign = req.cookies.sign || req.body.sign || '';

	if (tel == null || req == undefined || tel.trim() == '' || validateCode == null || validateCode.trim() == '') {
		req.flash('msg', '请填写完整信息');
		if (cs == "thunder") {
			res.redirect('/thunder/second');
		} else if (cs == "tencent") {
			res.redirect('/tencent');
		}
	} else {
		base.postJson({
			url: req.API_HOST + '/api/register',
			form: {
				telephone: tel,
				passwd: passwd,
				validateCode: validateCode,
				source: res.locals.cs,
				inviteCode: code,
				xluserid: xluserid,
				platform: 'h5',
				time: time,
				sign: sign
			}
		}, function(result) {
			if (result.err_code == '0') {
				req.session.regenerate(function() {
					req.session.userId = result.data.user.id;
					req.session.user = result.data.user;
					req.session.accessToken = result.data.user.accessToken;
					req.session.save(); //保存一下修改后的Session
					if (cs == "thunder") {
						req.flash('userId', req.session.userId);
						res.redirect('/thunderVerify');
					} else {
						res.redirect('/user/home');
					}
				});
			} else {
				console.log('msg' + result.err_msg);
				req.flash('msg', result.err_msg);
				req.flash('telephone', tel);
				req.flash('validateCode', validateCode);
				if (cs == "thunder") {
					res.redirect('/thunder');
				} else {
					res.redirect('/tencent');
				}
			}
		});
	}

};

RegisterController.prototype.registerPasswd = function(req, res) {
	res.render('register/regPassword', {
		msg: req.flash('msg'),
		telephone: req.flash('telephone')
	});
};
RegisterController.prototype.registerTel = function(req, res) {
	console.log('code:' + req.cookies.code);

	res.render('register/regTel', {
		telephone: req.flash('telephone'),
		msg: req.flash('msg')
	});
};
module.exports = RegisterController;