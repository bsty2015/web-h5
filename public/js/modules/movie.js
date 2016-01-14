define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var oText = $('#loadingText').val();
	var loadingHtml = '<div id="parent"><div id="loading"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div><div id="loadingText"><p>' + oText + '</p></div></div></div></div>';
	var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
	var goUrl = $('#url')
	var mmsgSpeed = 3000; //提示信息显示时间
	var tel = $('form #telephone').val(); //电话号码
	var code = $('form #validateCode').val(); //验证码
	var psd = $('form #passwd').val(); //密码
	function mmsg(mmsg) { //提示信息方法
		$('#mmsg').slideDown('slow', function() {
			setTimeout(function() {
				$('#mmsg').slideToggle('slow');
			}, mmsgSpeed)
			$('#mmsg').val(mmsg);
		});
	}
	telLenCtr();
	formLenCtr();

	function formLenCtr() { //表单
		$('form').on('input propertychange', function() {
			var telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
			var tel = $('form #telephone').val(); //电话号码
			var code = $('form #validateCode').val(); //验证码
			var psd = $('form #passwd').val(); //密码
			if (telReg.test($('form #telephone').val()) && code.length > 5 && psd.length > 5) {
				$('.reg-btn').css('background-color', 'rgb( 4, 150, 254)')
			} else {
				$('.reg-btn').css('background-color', 'rgb( 165,165,165)')
			}
		})
	};

	function telLenCtr() { //手机号
		$('form #telephone').on('input propertychange', function() {
			if (telReg.test($('form #telephone').val())) {
				$('form .send-code').css('background-color', 'rgb( 254, 64, 90)')
			} else {
				$('form .send-code').css('background-color', 'rgb( 165,165,165)')
			}
		})
	};
	$('form .send-code').click(function() { //发送信息按钮点击事件
		if ($('form #telephone').val().length < 1) {
			mmsg('手机号码不能为空！')
		} else if (!telReg.test($('form #telephone').val())) {
			mmsg('手机号码不对！');
		} else {
			var tel = $('form #telephone').val(); //电话号码
			$.ajax({
				type: "post",
				dataType: 'jsonp',
				url: API_HOST + "/api/validateTelephone",
				data: {
					telephone: tel
				},
				success: function(v) { //v代表接收的结果
					if (v.err_code == 0) {
						if (v.data.isExist == true) {
							mmsg('该号码已被注册！');
						} else {
							var tel = $('form #telephone').val(); //电话号码
							$.ajax({
								type: "post",
								dataType: 'jsonp',
								url: API_HOST + "/api/msg/code",
								data: {
									telephone: tel
								},
								success: function() {
									mmsg('验证码已发送！');
									clearInterval(itimer);
									var iNum = 60; //初始化时间
									var itimer = null; //定时器
									itimer = setInterval(function() {
										if (iNum <= 0) {
											telLenCtr();
											$('form .send-code').text('重新发送');
											iNum = 60;
											$('form .send-code').attr('disabled', false);
											if ($('form #telephone').val().length == 11) {
												$('form .send-code').css('background-color', 'rgb( 254, 64, 90)')
											} else {
												$('form .send-code').css('background-color', 'rgb( 165,165,165)')
											}
											clearInterval(itimer);
										} else {
											iNum--;
											$('form #telephone').off();
											$('form .send-code').attr('disabled', 'disabled');
											$('form .send-code').text(iNum);
											$('form .send-code').css('background-color', 'rgb( 165,165,165)');
										}
									}, 1000)
								}
							});
						}
					}
					//					msg('验证码已发送！');
				},
				error: function(v) {
					mmsg('网络错误,请稍后再试或者检查您的网络')
				}
			});
			//			return false; //防止form提交。  
		}
	});

	$('form .reg-btn').click(function() { //注册按钮点击事件
		var tel = $('form #telephone').val(); //电话号码
		var code = $('form #validateCode').val(); //验证码
		var psd = $('form #passwd').val(); //密码
		if (!telReg.test($('form #telephone').val()) || code.length < 5 || psd.length < 6) {

			mmsg('请将信息填写完整再提交！');
			console.log(tel.length)
			console.log(code.length)
			console.log(psd.length);
		} else {
			formLenCtr();
			$('form').attr('action', '/moviereg');
			$(document.body).before(loadingHtml);
		}
	})
});