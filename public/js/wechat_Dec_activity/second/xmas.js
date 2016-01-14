define(function(require, exports, module) {
	require('jquery');
	var Browser = require("/js/analyzingSystem");
	var signParam = require('signParam');

	function Browser2() {
		Browser.call(this);
	};

	for (var i in Browser.prototype) {
		Browser2.prototype[i] = Browser.prototype[i];
	};

	Browser2.prototype.fnWechat = function() {
		$('.xmas-end').css('display','block');
		$('#xmas_ws_open').click(function() {
			$('#xmas_reg_show2').fadeIn();
		});
		$('#xmas-close').click(function() {
			$('#xmas_reg_show2').fadeOut();
		});
		//new WechatActivity();
		//		$.ajax({
		//			type: "post",
		//			url: API_HOST + "/api/wechat/isNotHasXmasRed",
		//			dataType: 'jsonp',
		//			success: function(result) {
		//				if (result.err_code == '0') {
		//					if (result.data.isEnough == '1') {
		//						$('.xmas-iswx').css('display', 'block');
		//					} else if (result.data.isEnough == '0') {
		//						$('.xmas-iswx').css('display', 'none');
		//						$('.xmas-end').css('display', 'block');
		//						$('#xmas_ws_open button').text('查看我的红包');
		//						$('#xmas_ws_open').on('click', function() {
		//							$(this).attr('href', 'javascript:;');
		//							$('#xmas_reg_show2').show();
		//							$('#xmas_set_bg').css('display', 'block');
		//							$('#xmas_reg_show').hide();
		//							$('#xmas-close').click(function() {
		//								$('#xmas_reg_show2').fadeOut(800);
		//								$('#xmas_set_bg').css('display', 'none');
		//							});
		//						});
		//					}
		//				}
		//			},
		//			async: true
		//		});
	};

	Browser2.prototype.fnOther = function() {
		$('.xmas-end').css('display','block');
		var This = this;
		$('#xmas_reg_show').css('display', 'none');
		$('.clickObj').attr('href', 'javascript:;');
		$('.clickObj button').css('background', '#999999');
		$.ajax({
			type: "post",
			url: API_HOST + "/api/wechat/isNotHasXmasRed",
			dataType: 'jsonp',
			success: function(result) {
				if (result.err_code == '0') {
					if (result.data.isEnough == '1') {
						$('.xmas-nonwx').css('display', 'block');
					} else if (result.data.isEnough == '0') {
						$('.xmas-nonwx').css('display', 'none');
						$('.xmas-end').css('display', 'block');
						$('#xmas_ws_open button').text('查看我的红包');
						$('#xmas_ws_open').on('click', function() {
							$(this).attr('href', 'javascript:;');
							$('#xmas_reg_show2').show();
							$('#xmas_set_bg').css('display', 'block');
							$('#xmas_reg_show').hide();
							$('#xmas-close').click(function() {
								$('#xmas_reg_show2').fadeOut(800);
								$('#xmas_set_bg').css('display', 'none');
							});
						});
					}
				}
			},
			async: true
		});
	};

	function WechatActivity() {
		this.clickObj = $('.clickObj');
		this.userId = window.userId;
		if (userId) {
			this.fnChechk();
			this.fnstatus();
			if (window.location.hash == '#back') {
				$('#xmas_set_bg').css('display', 'block');
				$('#xmas_reg_show').css('display', 'block');
			};
		} else {

		};

	};

	WechatActivity.prototype.fnAjax = function(url, succFn, result) {
		var This = this;
		signParam.sendData(function(data) {
			$.ajax({
				type: "POST",
				url: API_HOST + url,
				dataType: 'jsonp',
				data: data,
				success: function(result) {
					if (result.err_code == '0') {
						succFn(result);
					}
				},
				async: true
			});
		});
	};


	WechatActivity.prototype.fnChechk = function() {
		var This = this;
		This.fnAjax('/api/wechat/isbind', function(result) {
			if (result.data.isbind) {
				$('#xmas-close').click(function() {
					$('#xmas_reg_show2').fadeOut(800);
					$('#xmas_set_bg').css('display', 'none');
				});
				//				return false;
			} else {
				This.clickObj.attr('href', '/wechatbind');
				//				This.clickObj.unbind();
			}
		});
	};

	WechatActivity.prototype.fnstatus = function() {
		var This = this;
		$('#xmas_ws_open').on('click', function() {
			var redListFlag = $(this).attr('data-flag');
			if ('red-list' === redListFlag) {
				$('#xmas_set_bg').css('display', 'block');
				$('#xmas_reg_show2').show();
			} else {
				$('#xmas_set_bg').css('display', 'block');
				$('#xmas_reg_show').show();
			}

		});
	};




	new Browser2();
});