/**
 * time:2015年11月4日17:55:49.
 * user：zhongciyisheng@live.com.
 * tips：新的注册页面
 */
define(function(require, exports, module) {
	require('jquery'); //jq
	require('/js/jquery_md5'); //md5
	var oText = $('#loadingText').val();
	var loadingHtml = '<div id="parent"><div id="loading"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div><div id="loadingText"><p>' + oText + '</p></div></div></div></div>';
	var oDate = new Date(); //时间
	var oTimeStamp = oDate.getTime(); //时间戳
	var oRandom = (Math.random() * 100).toString(); //随机数
	var oKey = $.md5(oTimeStamp.toString() + oRandom);
	var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
	var mmsgSpeed = 3000; //提示信息显示时间
	var oTimer_mmsg = null;
	var tel = $('form #telephone').val(); //电话号码
	var code = $('form #validateCode').val(); //验证码
	var psd = $('form #passwd').val(); //密码

	init(); //总函数，也是初始化函数.

	function formCtr() {
		$('#oSendCodeBtn').click(function() {
			if ($('form #telephone').val().length < 1) {
				mmsg('请输入正确的手机号码');
			} else if (!telReg.test($('form #telephone').val())) {
				mmsg('手机号码格式错误');
			} else {
				var oImgCode = $('#imgCode').val();
				if (!oImgCode || oImgCode.length < 1) {
					mmsg('图片验证码错误，点击刷新');
				} else if (oImgCode && oImgCode.length < 4) {
					mmsg('图片验证码错误，点击刷新');
				} else {
					verifyFn();
				}
			};
		});
		$('#btn_Confirm').click(function() {
			if ($('form #telephone').val().length < 1) {
				mmsg('请输入正确的手机号码');
			} else if (!telReg.test($('form #telephone').val())) {
				mmsg('手机号码格式错误');
			} else {
				var oImgCode = $('#imgCode').val();
				if (!oImgCode || oImgCode.length < 1) {
					mmsg('请输入图片中的验证码');
				} else if (oImgCode && oImgCode.length < 4) {
					mmsg('请输入正确的图片验证码');
				} else {
					//					sendCodeFn();
					var oCode = $('#validateCode').val();
					var oPsd = $('#passwd').val();
					if (!oCode || oCode.length < 1) {
						mmsg('请输入正确的短信验证码');
					} else if (oCode && oCode.length < 6) {
						mmsg('请输入正确的短信验证码');
					} else if (!oPsd || oPsd.length < 1) {
						mmsg('请输入6~16位密码');
					} else if (oPsd && oPsd < 6) {
						mmsg('请输入6~16位密码');
					} else {
						//
						$('.reg_page_form').attr('action', '/forget')
						$(document.body).before(loadingHtml);
					};
				};
			};
		});
	};
	// 初始化
	function init() {
		getImgFn(); //加载图片
		formCtr();
		sendStyleCtr2();
		sendStyleCtr();
		btn_ConfirmCtr();
		btn_ConfirmCtr2();
	};
	$('#psdImg').click(function() {
		var oVal = $('#passwd').val();
		if (oVal) {
			var oSrc = $('#passwd').attr('type');
			if (oSrc == 'password') {
				$('#passwd').attr('type', 'text');
				$('#psdImg').attr('src', '/img/passwordActive.png');
			} else if (oSrc == 'text') {
				$('#passwd').attr('type', 'password');
				$('#psdImg').attr('src', '/img/password.png');
			};
		};
	});
	//发送验证码倒计时
	function sendCodeTime() {

		oSendCodeTimer = null;
		oSendCodeNum = 60;
		var oTime = 60;
		clearInterval(oSendCodeTimer);
		oSendCodeTimer = setInterval(function() {
			if (oSendCodeNum <= 0) {
				oSendCodeNum = oTime;
				sendStyleCtr2();
				$('#oSendCodeBtn').text('发送验证码');
				$('form #oSendCodeBtn').attr('disabled', false);
				clearInterval(oSendCodeTimer);
			} else {
				oSendCodeNum--;
				$('form .reg_page_form_top').off();
				$('form #oSendCodeBtn').attr('disabled', true);
				$('form #oSendCodeBtn').css('background', '#ddd');
				$('#oSendCodeBtn').text(oSendCodeNum + "s");
			};
		}, 1000);
	};
	//发送验证码按钮状态控制
	function sendStyleCtr() {
		$('form .reg_page_form_top').on('input propertychange', function() {
			sendStyleCtr2();
		});
	};
	//发送验证码按钮状态控制方法
	function sendStyleCtr2() {
		var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
		if (telReg.test($('form #telephone').val())) {
			var oImgCode = $('form #imgCode').val();
			if (!oImgCode || $('form #imgCode').val().length < 4) {
				$('form #oSendCodeBtn').css('background', '#ddd');
			} else {
				$('form #oSendCodeBtn').css('background', '#00CD98');
			};
		};
	};
	//确认按钮样式控制
	function btn_ConfirmCtr() {
		$('form').on('input propertychange', function() {
			btn_ConfirmCtr2();
		});
	};
	//确认按钮样式控制 方法
	function btn_ConfirmCtr2() {
		var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
		var tel = $('form #telephone').val(); //电话号码
		var code = $('form #validateCode').val(); //验证码
		var psd = $('form #passwd').val(); //密码
		var imgCode = $('#imgCode').val();
		if (telReg.test($('form #telephone').val()) && code.length > 5 && psd.length > 5 && imgCode.length > 3) {
			$('#btn_Confirm').css('background-color', '#00CD98')
		} else {
			$('#btn_Confirm').css('background-color', '#ddd')
		};
	};
	//发送验证码方法
	function sendCodeFn() {
		var tel = $('form #telephone').val(); //电话号码
		var code = $('form #validateCode').val(); //验证码
		var psd = $('form #passwd').val(); //密码
		var oImgCode = $('#imgCode').val();
		$.ajax({
			type: "post",
			url: API_HOST + "/api/msg/generateCode",
			dataType: 'jsonp',
			data: {
				telephone: tel,
				key: oKey,
				imgCode: oImgCode
			},
			success: function(v) {
				if (v.err_code == '0') {
					mmsg('验证码已发送');
					sendCodeTime();
				} else if (v.err_code != '0') {
					mmsg(v.err_msg);
				};
			},
			async: true
		});
	};

	function verifyFn() {
		var tel = $('form #telephone').val(); //电话号码
		$.ajax({
			type: "post",
			url: API_HOST + "/api/validateTelephone",
			dataType: 'jsonp',
			data: {
				telephone: tel
			},
			success: function(v) {
				if (v.err_code == '0') {
					if (v.data.isExist == true) {
						sendCodeFn();
					} else {
						mmsg('该手机号码尚未注册');
					};
				};
			},
			async: true
		});
	};

	function mmsg(mmsg) { //提示信息方法
		clearTimeout(oTimer_mmsg);
		$('#mmsg').val(" ");
		$('#mmsg').slideDown('slow', function() {
			oTimer_mmsg = setTimeout(function() {
				$('#mmsg').slideToggle('slow');
			}, mmsgSpeed)
			$('#mmsg').val(mmsg);
		});
	};

	function getImgFn() {
		$('#oRandomImg').attr('src', API_HOST + '/api/captcha/getImage' + '?key=' + oKey);
	};
	$('#oRandomImg').click(function() { //点击加载图片
		getImgFn();
	});
});