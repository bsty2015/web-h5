define(function(require, exports, module) {
	//	// 通过 require 引入依赖
	require('jquery');
	//	var timer = null;
	var regSetPassword = $('.regSetPassword');
	var regShowPassword = $('.regShowPassword');
	var PasswordBtn = $('.PasswordBtn');
	regShowPassword.click(function() {
		regSetPassword.attr('type', 'number');
		regShowPassword.css('regShowPasswordActive iconfont display-block');
	})
	regShowPassword.click(function() {
		regSetPassword.attr('type', 'password');
		regShowPassword.css('regShowPassword iconfont display-block');
	})
	timer = setInterval(function() {
			var val = regSetPassword.val();
			if (val && val.length < 6) {
				PasswordBtn.attr('disabled', true);
				PasswordBtn.css('btn-55-normal PasswordBtn');
			} else {
				//					clearInterval(timer);
				PasswordBtn.css('btn-55-green PasswordBtn');
				PasswordBtn.attr('disabled', false);
			}
		}, 40)
		//change-password.html
	var onff = true;
	$('#oldPsdBtn').click(function() {
		if (onff) {
			$('#oldPsd').attr('type', 'text');
			onff = false;
		} else {
			$('#oldPsd').attr('type', 'password');
			onff = true;
		}
	});
	var onFF = true;
	$('.newPsdBtn').click(function() {
		if (onFF) {
			$('#newPsd').attr('type', 'text');
			onFF = false;
		} else {
			$('#newPsd').attr('type', 'password');
			onFF=true;
		}
	})

});