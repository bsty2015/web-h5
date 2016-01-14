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
		//微信环境
		new WechatActivity();
	};
	Browser2.prototype.fnOther = function() {
		//非微信环境
		//		new WechatActivity();
		$('.btn_wrap p').css('display', 'none');
		$('.text_wrap .nowchat').css('display', 'block');
		$('.text_wrap .wechat').css('display', 'none');
		$.ajax({
			type: "post",
			dataType:'jsonp',
			url: API_HOST + "/api/wechat/isNotHasXmasRed",
			success: function(result) {
				if (result.err_code == '0') {
					if (result.data.isEnough == '0') {
						$('.text_wrap .end').css('display', 'block');
					};
				};
			},
			async: true
		});
	};

	function WechatActivity() {
		this.fnCheckData()
		this.userId = window.userId;

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
				if (window.location.hash == '#back') {
					$('.ws_mask').fadeIn(400);
				};
				$('#changeLink').click(function() {
					$('.ws_mask').fadeIn(400)
				});
				var closeBtn = $('#xmas-close');
				if (closeBtn) {
					closeBtn.click(function() {
						$('.ws_mask').fadeOut(400)
					});
				}
			} else {
				$('#changeLink').attr('href', '/wechatbind');
				//				This.clickObj.unbind();
			}
		});
		signParam.sendData(function(data) {
			$.ajax({
				type: "POST",
				url: API_HOST + '/api/wechat/getRedAmt',
				dataType: 'jsonp',
				data: {
					userId: userId,
					type: "投资",
					redactivityType: '贺岁第三弹'
				},
				success: function(result) {
					if (result.err_code == '0') {
						if (result.data.amt > 0) {
							$('.text_wrap .wechat').css('display', 'none');
						}
					} else {
						console.log(result)
					}
				},
				async: true
			});
		});

	};

	//检查库存。
	WechatActivity.prototype.fnCheckData = function() {
		var This = this;
		This.fnAjax('/api/wechat/isNotHasXmasRed', function(result) {
			if (result.data.isEnough == '1') {
				//有库存
				if (userId) {
					This.fnChechk();
				}
			} else {
				//无库存
				if (userId) {
					$('#changeLink').click(function() {
						$('.ws_mask').fadeIn(400)
					});
					var closeBtn = $('#xmas-close');
					if (closeBtn) {
						closeBtn.click(function() {
							$('.ws_mask').fadeOut(400)
						});
					}
				}
				$('#ws_end_ctr button').text('查看我的红包');
				if (userId) {
					$('#changeLink').click(function() {
						$('.ws_mask').fadeIn(400)
					});
					$('#ws_end_ctr a').attr('href', 'javascript:;');
				};
				$('.text_wrap .end').css('display', 'block');
				$('.text_wrap .wechat').css('display', 'none');
			}
		});
	};

	new Browser2();

});