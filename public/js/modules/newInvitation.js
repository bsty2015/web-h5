define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	require('/js/jquery_md5'); //md5
	var oText = $('#loadingText').val();
	var loadingHtml = '<div id="parent"><div id="loading"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div><div id="loadingText"><p>' + oText + '</p></div></div></div></div>';
	var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
	var goUrl = $('#url')
	var mmsgSpeed = 3000; //提示信息显示时间
	var tel = $('#telephone').val(); //电话号码
	var mTimer = null;
	var code = $('#code').val(); //验证码
	var psd = $('#passwd').val(); //密码

	function mmsg(m) { //提示信息方法
		clearTimeout(mTimer);
		$('#mmsg').val("");
		$('#mmsg').slideDown('slow', function() {
			mTimer = setTimeout(function() {
				$('#mmsg').slideToggle('slow');
			}, mmsgSpeed);
			$('#mmsg').val(m);
		});

	};
	telLenCtr();
	formLenCtr();
	sendStyleCtr();
	getImgFn(); //图片验证码加载
	function formLenCtr() { //表单
		$('form').on('input propertychange', function() {
			var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
			var tel = $('#telephone').val(); //电话号码
			var code = $('#code').val(); //验证码
			var psd = $('#passwd').val(); //密码
			var oImgCode = $('#imgCode input').val();
			if (telReg.test($('#telephone').val()) && code.length > 5 && psd.length > 5 && oImgCode.length > 3) {
				$('.reg-btn').css('background-color', '#feea59');
			} else {
				$('.reg-btn').css('background-color', '#feea59');
			}
		})
	}
	//点击图片改变
	$('#imgCode img').click(function() {
		getImgFn();
	});

	function getImgFn() {
		oDate = new Date(); //时间
		oTimeStamp = oDate.getTime(); //时间戳
		oRandom = (Math.random() * 100).toString(); //随机数
		oKey = $.md5(oTimeStamp.toString() + oRandom);
		$('#imgCode img').attr('src', API_HOST + '/api/captcha/getImage' + '?key=' + oKey);
	};

	function telLenCtr() { //手机号
		$('#telephone').on('input propertychange', function() {
			if (telReg.test($('#telephone').val())) {
				$('form .send-code').css('background-color', '#51c3ff')
			} else {
				$('form .send-code').css('background', '#f16064');
				$('form .send-code').css('border', '1px solid #fff');
			}
		})
	}
	$('form .send-code').click(function() { //发送信息按钮点击事件
		var oImgCode = $('#imgCode input').val();
		if ($('#telephone').val().length < 1) {
			mmsg("手机号码不能为空！");
		} else if (!telReg.test($('#telephone').val())) {
			mmsg("请输入正确的手机号码！");
		} else if (!oImgCode || oImgCode.length < 3) {
			mmsg('图片验证码错误，点击可刷新图片。');
		} else {
			verifyFn();
		}
	});
	//发送验证码按钮状态控制
	function sendStyleCtr() {
		$('form .reg_page_form_top').on('input propertychange', function() {
			sendStyleCtr2();
		});
	};
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
				$('#invitationSendCode').text('发送验证码');
				$('#invitationSendCode').attr('disabled', false);
				clearInterval(oSendCodeTimer);
			} else {
				oSendCodeNum--;
				$('form .reg_page_form_top').off();
				$('#invitationSendCode').attr('disabled', true);
				$('form .send-code').css('background-color', 'rgb( 254, 64, 90)');
				$('form .send-code').css('color', '#fff');
				$('#invitationSendCode').text(oSendCodeNum + "s");
			};
		}, 1000);
	};
	//发送验证码按钮状态控制方法
	function sendStyleCtr2() {
		var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
		if (telReg.test($('#telephone').val())) {
			var oImgCode = $('#imgCode input').val();
			if (!oImgCode || $('#imgCode input').val().length < 4) {
				$('form .send-code').css('background-color', 'rgb( 254, 64, 90)');
				$('form .send-code').css('color', '#fff');
			} else {
				$('form .send-code').css('background-color', '#feea59');
				$('form .send-code').css('color', '#d46f6f');

			};
		};
	};

	function verifyFn() {
		var tel = $('#telephone').val(); //电话号码
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
						mmsg('该手机号码已经注册');
					} else {
						sendCodeFn();
					};
				};
			},
			async: true
		});
	};

	function sendCodeFn() {
		var tel = $('#telephone').val(); //电话号码
		var code = $('#validateCode').val(); //验证码
		var psd = $('#passwd').val(); //密码
		var oImgCode = $('#imgCode input').val();
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
	$('form .reg-btn').click(function() { //注册按钮点击事件
			if ($('#telephone').val().length < 1) {
				mmsg('请输入正确的手机号码');
			} else if (!telReg.test($('#telephone').val())) {
				mmsg('手机号码格式错误');
			} else {
				var oImgCode = $('#imgCode input').val();
				if (!oImgCode || oImgCode.length < 1) {
					mmsg('请输入图片中的验证码');
				} else if (oImgCode && oImgCode.length < 4) {
					mmsg('请输入正确的图片验证码');
				} else {
					//					sendCodeFn();
					var oCode = $('#code').val();
					var oPsd = $('#passwd').val();
					if (!oCode || oCode.length < 1) {
						mmsg('请输入正确的短信验证码');
					} else if (oCode && oCode.length < 6) {
						mmsg('请输入正确的短信验证码');
					} else if (!oPsd || oPsd.length < 1) {
						mmsg('请输入6~16位密码');
					} else if (oPsd && oPsd.length < 6) {
						mmsg('请输入6~16位密码');
					} else {
						codeVerify();
					};
				};
			};
		})
		//短信验证码校验
	function codeVerify() {
		var tel = $('#telephone').val(); //电话号码
		var code = $('#code').val(); //验证码
		$.ajax({
			type: "post",
			url: API_HOST + "/api/msg/code/verify",
			dataType: 'jsonp',
			data: {
				telephone: tel,
				code: code
			},
			success: function(v) {
				if (v.err_code == '0') {
					$('#invitationForm').attr('action', '/inviteReg')
					$(document.body).before(loadingHtml);
					$('#invitationForm').submit();
				} else {
					mmsg(v.err_msg);
				};
			},
			async: true
		});
	};
});