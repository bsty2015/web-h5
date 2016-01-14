define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	//头部图片在输入时改变状态代码
	var aCtrHeadImg = document.getElementsByClassName('ctr-h-img');
	var oHeadImg = document.getElementsByClassName('head-img')[0];
	for (var i = 0; i < aCtrHeadImg.length; i++) {
		aCtrHeadImg[i].onclick = function() {
			oHeadImg.style.width = '60%';
			oHeadImg.style.margin = "0 auto"
		}
	}

	//解决输入框文字提示问题
	var aInput = document.getElementsByTagName('input');
	for (var i = 0; i < aInput.length; i++) {
		aInput[i].onfocus = function() {
			$(this).addClass('input');
		};
		aInput[i].onblur = function() {
			$(this).removeClass('input');
		};
	};
	//设置手机号码长度
	$('.setInputLen').bind('input propertychange', function() {
			if ($('.setInputLen').val().length > 11) {
				$('.setInputLen').val($('.setInputLen').val().substr(0, 11))
			}
		})
		//设置银行卡号码长度
	$('.setBankLen').bind('input propertychange', function() {
			if ($('.setBankLen').val().length > 19) {
				$('.setBankLen').val($('.setBankLen').val().substr(0, 19))
			}
		})
		//设置身份证长度
	$('.setIDLen').bind('input propertychange', function() {
			if ($('.setIDLen').val().length > 18) {
				$('.setIDLen').val($('.setIDLen').val().substr(0, 18))
			}
		})
		//recode.html,当满足6位才变绿,且不允许输入超过6位
	$('#reCode').bind('input propertychange', function() {
			if ($('#reCode').val().length > 6) {
				$('#reCode').val($('#reCode').val().substr(0, 6));
			} else if ($('#reCode').val().length == 6) {
				$('#recodeNextBtn').addClass('btn-55-green').removeClass('btn-55-normal');
			} else {
				$('#recodeNextBtn').addClass('btn-55-normal').removeClass('btn-55-green');
			}
		})
		//fogetcode.html,当满足6位才变绿,且不允许输入超过6位。
	$('#forgetcode').bind('input propertychange', function() {
			if ($('#forgetcode').val().length > 6) {
				$('#forgetcode').val($('#forgetcode').val().substr(0, 6));
			} else if ($('#forgetcode').val().length == 6) {
				$('#fogetcodeNextBtn').addClass('btn-55-green').removeClass('btn-55-normal');
			} else {
				$('#fogetcodeNextBtn').addClass('btn-55-normal').removeClass('btn-55-green');
			}
		})
		//fogetpasssword.html,当满足6位才变绿,且不允许输入超过16位。
	$('#fotgetpassword').bind('input propertychange', function() {
		if ($('#fotgetpassword').val().length > 5 && $('#fotgetpassword').val().length < 17) {
			$('#fotgetNextBtn').addClass('btn-55-green').removeClass('btn-55-normal');
		} else if ($('#fotgetpassword').val().length == 17) {
			$('#fotgetpassword').val($('#fotgetpassword').val().substr(0, 16));
		} else {
			$('#fotgetNextBtn').addClass('btn-55-normal').removeClass('btn-55-green');
		}
	})
	//fogetpasssword.html,当满足6位才变绿,且不允许输入超过16位。
	$('#regSetPassword').bind('input propertychange', function() {
		if ($('#regSetPassword').val().length > 5 && $('#regSetPassword').val().length < 17) {
			$('#PasswordBtn').addClass('btn-55-green').removeClass('btn-55-normal');
		} else if ($('#regSetPassword').val().length == 17) {
			$('#regSetPassword').val($('#regSetPassword').val().substr(0, 16));
		} else {
			$('#PasswordBtn').addClass('btn-55-normal').removeClass('btn-55-green');
		}
	})
		//pay-send-code.html
	$('#paycode').bind('input propertychange', function() {
			if ($('#paycode').val().length > 6) {
				$('#paycode').val($('#paycode').val().substr(0, 6));
			} else if ($('#paycode').val().length == 6) {
				$('#rePay').addClass('btn-55-green').removeClass('btn-55-normal');
			} else {
				$('#rePay').addClass('btn-55-normal').removeClass('btn-55-green');
			}
		})
		//change-password.html
	$('.retun_btn').attr('disabled', "true");
	$('#change_password').bind('input propertychange', function() {
		if ($('#oldPsd').val().length > 5 && $('#newPsd').val().length > 5 && $('#newPsd').val().length < 17) {
			$('#change_password .chps_confirm').css('background', 'rgb(95, 109, 184)');
		} else if ($('#newPsd').val().length == 17) {
			$('#newPsd').val($('#newPsd').val().substr(0, 16));
		}
				else {
					$('#change_password .chps_confirm').css('background', '#ccc')
				}
	})
	//bank-code.html
	$('.bank-code-ctr').bind('input propertychange', function() {
			$('.bank-code-ctr').val($('.bank-code-ctr').val().substr(0,6))
		})
});