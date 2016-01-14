/*
 * user:无双
 * time：2015-12-22 17:39:42
 * des：专写活动页面
 */
var request = require('request');
var Base = require('./baseController');
var util = require('util');
var async = require('async');
var base = new Base();

function wechatActivityController() {}
util.inherits(wechatActivityController, Base);

wechatActivityController.prototype.render = function(req, res) {
	var userId = req.session.userId;
	req.session.xmasurl = '/xmas'; //方便注册成功时跳回
	var xmasInfo = null;
	if (userId) {
		base.postJson({
			url: req.API_HOST + '/api/wechat/getRedAmt',
			form: {
				userId: userId,
				redactivityType: '圣诞'
			}
		}, function(result) {
			if (result.err_code == '0') {
				res.render('wechat_dec_activity/second/xmas', {
					xmasInfo: result.data
				});
			}
		}, req);
	} else {
		res.render('wechat_dec_activity/second/xmas', {
			xmasInfo: xmasInfo
		});
	}
};

wechatActivityController.prototype.ypdctRender = function(req, res) {
	userInfo = {};
	var userId = req.session.userId;
	req.session.xmasurl3 = '/ypdct'; //方便注册成功时跳回
	base.postJson({
		url: req.API_HOST + '/api/wechat/isNotHasXmasRed'
	}, function(result) {
		if (result.err_code == 0) {
			if (result.data.isEnough == 1) {
				//有库存
				console.log('.............true')
				userInfo.isEnough = true;
				fnrender();
			} else {
								console.log('.............false'+req.API_HOST)
				//no ku cun
				userInfo.isEnough = false;
				fnrender();
			}
		}
	},req);

	function fnrender() {
		if (userId) {
			userInfo.userId = userId;
			base.postJson({
				url: req.API_HOST + '/api/wechat/getRedAmt',
				form: {
					userId: userId,
					type: "投资",
					redactivityType: '贺岁第三弹'

				}
			}, function(result) {
				if (result.err_code == '0') {
					userInfo.amt = result.data.amt;
					userInfo.date = result.data.date;
					userInfo.type = result.data.type;
					res.render('wechat_dec_activity/third/ypdct', userInfo)
				}
			}, req)
		} else {
			res.render('wechat_dec_activity/third/ypdct', userInfo)
		}
	}
};

wechatActivityController.prototype.xmasThird = function(req, res) {
	var userId = req.session.userId;
	req.session.xmasThirdurl = '/xmasThird'; //方便注册成功时跳回
	var xmasInfo = null;
	async.series({
		xmasShow: function(callback) {
			if (userId) {
				base.postJson({
					url: req.API_HOST + '/api/wechat/getRedAmt',
					form: {
						userId: userId,
						redactivityType: 贺岁第三弹
					}
				}, function(result) {
					if (result.err_code == "0") {
						callback(null, result.data);
					} else {
						callback(null, result.err_msg);
					}
				});
			} else {
				callback(null, xmasInfo);
			}

		},
		xmasThirdGetRed: function(callback) {
			base.postJson({
				url: req.API_HOST + '/api/wechat/redlistForXmas',
				form: {
					userId: userId
				}

			}, function(result) {
				if (result.err_code == "0") {
					callback(null, result.data);
				} else {
					callback(null, result.err_msg);
				}
			});
		}

	}, function(err, results) {
		//console.log(results.xmasShow.amt+"============"+results.xmasThirdGetRed);
		res.render('wechat_dec_activity/third/xmasThird', {
			xmasInfo: results.xmasShow,
			myred: results.xmasThirdGetRed
		});
	});
};


module.exports = wechatActivityController;