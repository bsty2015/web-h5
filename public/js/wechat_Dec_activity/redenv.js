define(function(require, exports, module) {
	require('jquery');
	var Browser = require("/js/analyzingSystem");

	function Browser2() {
		Browser.call(this);
	};
	for (var i in Browser.prototype) {
		Browser2.prototype[i] = Browser.prototype[i];
	};
	Browser2.prototype.fnWechat = function() {
		new WechatActivity();
						$('.end_wechat_text').css('display','block')
	};
	Browser2.prototype.fnOther = function() {
		var This = this;
				$('.end_wechat_text').css('display','block')
		$('.change_src').attr('src', '/img/wechat_Dec_activity/cai1.png');
		this.clickObj = $('.cai-img');
//		$('.non_wechat_text').css('display', 'block');
//		this.clickObj.attr('href', 'javascript:;');
	};



	function WechatActivity() {
		var This = this;
		this.check = $('.wechat_bind_box');
		this.a = $('.wechat_show_box .show_btn a')
		this.num = $('.wechat_show_box .show_num strong');
		this.msg = $('.wechat_show_box .show_msg');
		this.yuan = $('.wechat_show_box .show_num span')
		this.title = $('.wechat_show_box .title');
		this.showBtn = $('.wechat_show_box .show_btn button');
		this.userId = window.userId;
		this.clickObj = $('.cai-img');
		this.box = $('.wechat_show_box');
				$('.change_src').attr('src', '/img/wechat_Dec_activity/cai2.png');
		this.con = '<img src=\"/img/wechat_Dec_activity/redmoney.png\"/>'
		('.end_wechat_text').css('display','block')
//		if (userId) {
//			this.fnBagClick();
//			this.fnChechk();
//			if (window.location.hash == '#back') {
//				$('.cai-img').trigger('click');
//			}
//		};

	};

	WechatActivity.prototype.fnAjax = function(url, succFn, result) {
		var This = this;
		$.ajax({
			type: "POST",
			url: API_HOST + url,
			dataType: 'jsonp',
			data: {
				userId: This.userId
			},
			success: function(result) {
				if (result.err_code == '0') {
					succFn(result);
				}
			},
			async: true
		});
	};

	WechatActivity.prototype.fnBagClick = function() {
		var This = this;
		This.clickObj.click(function() {
//			This.fndDown();
		});
	};
	WechatActivity.prototype.fndDown = function() {
		var This = this;
		This.fnAjax('/api/wechat/openred', function(result) {
			This.box.css('display', 'block');
			console.log(result.data.amt);
			if (result.data.status == '0') {
				This.showBtn.click(function() {
					This.fndDown();
				});
				This.num.text(result.data.amt);
				This.showBtn.text('接着拆');
				This.msg.text('还有一个红包待领取');

			} else {

				This.a.attr('href', '/product/list');
				//This.showBtn.text('购买集财');
				This.showBtn.text('继续理财');
				//This.msg.text('购买集财领取红包');
				This.msg.text('');
				This.num.html(This.con);

			};
			//else if (result.data.status == '2') {
            //
			//	/*分享代码start*/
			//	This.showBtn.click(function() {
			//		$('.share').slideDown('slow');
			//		This.box.css('display', 'none');
			//	})
			//	This.showBtn.text('邀请好友');
			//	This.num.html(This.con);
			//	This.msg.text('邀请好友获得更多红包');
			//}

			if (result.data.amt > 0) {

				This.title.text('恭喜你获得');
				This.num.text(result.data.amt);

			} else {
				This.yuan.text('');
				//This.title.text('您还没赢取到红包');
				This.title.text('红包已发完');
			};
		});
	};

	WechatActivity.prototype.fnChechk = function() {
		var This = this;
		$('.change_src').attr('src', '/img/wechat_Dec_activity/cai2.png');
		This.fnAjax('/api/wechat/isbind', function(result) {
			if (result.data.isbind) {
//				return false;
			} else {
				This.clickObj.attr('href', '/wechatbind');
//				This.clickObj.unbind();
			}
		});
	};
	new Browser2();


});