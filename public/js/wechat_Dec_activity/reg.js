define(function(require, exports, module) {
	require('jquery');

	function CreatedComReg() {
		require('/js/jquery_md5');
		this.oText = $('#loadingText').val();
		this.loadingHtml = '\
							<div id="parent">\
								<div id="loading">\
									<div id="circleG">\
										<div id="circleG_1" class="circleG">\
										</div>\
									<div id="circleG_2" class="circleG">\
									</div>\
								<div id="circleG_3" class="circleG">\
							</div>\
							<div id="loadingText">\
							<p>' + this.oText + '</p>\
							</div></div></div></div>\
							';
		this.telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
		this.mmsgSpeed = 3000; //提示信息显示时间
		this.oTimer_mmsg = null;
		this.tel = $('#telephone').val(); //电话号码
		this.code = $('#validateCode').val(); //验证码
		this.psd = $('#passwd').val(); //密码
		this.sendCodeBtn = $('#oSendCodeBtn');
		this.img = $('#oRandomImg');
		this.confirmBtn = $('#btn_Confirm');
		var This = this;

		this.sendStyleCtr();
		this.btn_ConfirmCtr();
		This.getImgFn(); //进来图片就加载

		this.sendCodeBtn.click(function() { //发送验证码
			This.sendCodeBtnFn();
		});
		this.confirmBtn.click(function() { //发送验证码
			This.confirmBtnFn();
		});

		this.img.click(function() {
			This.imgClick();
		});
		//					$(document.body).before(this.loadingHtml);
	};
	CreatedComReg.prototype.sendCodeBtnFn = function() {
		var This = this;
		this.tel = $('#telephone').val(); //电话号码
		if (this.tel.length < 1) {
			This.mmsg('请输入正确的手机号码');
		} else if (!This.telReg.test(This.tel)) {
			This.mmsg('手机号码格式错误');
		} else {
			var oImgCode = $('#imgCode').val();
			if (!oImgCode || oImgCode.length < 1) {
				This.mmsg('图片验证码错误，点击刷新');
			} else if (oImgCode && oImgCode.length < 4) {
				This.mmsg('图片验证码错误，点击刷新');
			} else {
				This.verifyFn();
			}
		};
	};
	CreatedComReg.prototype.confirmBtnFn = function() {
		var This = this;
		this.tel = $('#telephone').val(); //电话号码
		if (This.tel.length < 1) {
			This.mmsg('请输入正确的手机号码');
		} else if (!This.telReg.test(This.tel)) {
			This.mmsg('手机号码格式错误');
		} else {
			var oImgCode = $('#imgCode').val();
			if (!oImgCode || oImgCode.length < 1) {
				This.mmsg('请输入图片中的验证码');
			} else if (oImgCode && oImgCode.length < 4) {
				This.mmsg('请输入正确的图片验证码');
			} else {
				//					sendCodeFn();
				var oCode = $('#validateCode').val();
				var oPsd = $('#passwd').val();
				if (!oCode || oCode.length < 1) {
					This.mmsg('请输入正确的短信验证码');
				} else if (oCode && oCode.length < 6) {
					This.mmsg('请输入正确的短信验证码');
				} else if (!oPsd || oPsd.length < 1) {
					This.mmsg('请输入6~16位密码');
				} else if (oPsd && oPsd < 6) {
					This.mmsg('请输入6~16位密码');
				} else {
					This.codeVerify();
				};
			};
		};
	};
	//短信验证码校验
	CreatedComReg.prototype.codeVerify = function() {
		var This = this;
		var tel = $('#telephone').val(); //电话号码
		var code = $('#validateCode').val(); //验证码
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
					$('form').attr('action', '/register');
					$('form').submit();
					$(document.body).before(This.loadingHtml);
				} else {
					This.mmsg(v.err_msg);
				};
			},
			async: true
		});
	};

	//发送验证码倒计时
	CreatedComReg.prototype.sendCodeTime = function() {
		var This = this;
		this.oSendCodeTimer = null;
		this.oSendCodeNum = 60;
		var oTime = 60;
		clearInterval(this.oSendCodeTimer);
		this.oSendCodeTimer = setInterval(function() {
			if (This.oSendCodeNum <= 0) {
				This.oSendCodeNum = oTime;
				This.sendStyleCtr2();
				$('#oSendCodeBtn').text('获取验证码');
				$('#oSendCodeBtn').attr('disabled', false);
				clearInterval(This.oSendCodeTimer);
			} else {
				This.oSendCodeNum--;
				$('form').off();
				$('#oSendCodeBtn').attr('disabled', true);
				$('#oSendCodeBtn').css('background', 'rgb( 165, 165, 165)');
				$('#oSendCodeBtn').text(This.oSendCodeNum + "s");
			};
		}, 1000);
	};
	//发送验证码按钮状态控制
	CreatedComReg.prototype.sendStyleCtr = function() {
		var This = this;
		$('form').on('input propertychange', function() {
			This.sendStyleCtr2();
		});
	};

	//发送验证码按钮状态控制方法
	CreatedComReg.prototype.sendStyleCtr2 = function() {
		var This = this;
		var tel = $('#telephone').val();
		this.telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
		if (this.telReg.test(tel)) {
			var oImgCode = $('#imgCode').val();
			if (!oImgCode || $('#imgCode').val().length < 4) {
				$('#oSendCodeBtn').css('background', 'rgb( 165, 165, 165)');
			} else {
				$('#oSendCodeBtn').css('background', 'rgb( 165, 165, 165)');
			};
		};
	};

	//确认按钮样式控制
	CreatedComReg.prototype.btn_ConfirmCtr = function() {
		var This = this;
		$('form').on('input propertychange', function() {
			This.btn_ConfirmCtr2();
		});
	};
	//确认按钮样式控制 方法
	CreatedComReg.prototype.btn_ConfirmCtr2 = function() {
		this.telReg = /1[3|5|7|8|][0-9]{9}/; //手机号码正则
		this.tel = $('#telephone').val(); //电话号码
		this.code = $('#validateCode').val(); //验证码
		this.psd = $('#passwd').val(); //密码
		this.imgCode = $('#imgCode').val();
		if (this.telReg.test(this.tel) && this.code.length > 5 && this.psd.length > 5 && this.imgCode.length > 3) {
			$('#btn_Confirm').css('background-color', 'rgb( 255, 172, 42)')
		} else {
			$('#btn_Confirm').css('background-color', 'rgb( 255, 172, 42)')
		};
	};

	//发送验证码方法
	CreatedComReg.prototype.sendCodeFn = function() {
		var This = this;
		var tel = $('#telephone').val() //电话号码
		var code = $('#validateCode').val(); //验证码
		var psd = $('#passwd').val(); //密码
		var oImgCode = $('#imgCode').val();
		$.ajax({
			type: "post",
			url: API_HOST + "/api/msg/generateCode",
			dataType: 'jsonp',
			data: {
				telephone: tel,
				key: this.key,
				imgCode: oImgCode
			},
			success: function(v) {
				if (v.err_code == '0') {
					This.mmsg('验证码已发送');
					This.sendCodeTime();
				} else if (v.err_code != '0') {
					This.mmsg(v.err_msg);
				};
			},
			async: true
		});
	};
	CreatedComReg.prototype.verifyFn = function() {
		var This = this;
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
						This.mmsg('该手机号码已经注册');
					} else {
						This.sendCodeFn();
					};
				} else {
					This.mmsg(v.err_msg);
				}
			},
			async: true
		});
	};

	CreatedComReg.prototype.mmsg = function(mmsg) { //提示信息方法
		var This = this;
		clearTimeout(This.oTimer_mmsg);
		$('#mmsg').val(" ");
		$('#mmsg').slideDown('slow', function() {
			oTimer_mmsg = setTimeout(function() {
				$('#mmsg').slideToggle('slow');
			}, This.mmsgSpeed)
			$('#mmsg').val(mmsg);
		});
	};
	CreatedComReg.prototype.getImgFn = function() {
		var This = this;
		this.date = new Date(); //时间
		this.tiemTmp = this.date.getTime(); //时间戳
		this.random = (Math.random() * 100).toString(); //随机数
		this.key = $.md5(this.tiemTmp.toString() + this.random);
		//		console.log(this.key)

		This.img.attr('src', API_HOST + '/api/captcha/getImage' + '?key=' + this.key);
	};
	CreatedComReg.prototype.imgClick = function() {
		var This = this;
		This.getImgFn();
	};
	new CreatedComReg();
});