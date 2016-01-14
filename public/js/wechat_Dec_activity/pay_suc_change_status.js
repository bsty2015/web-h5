define(function(require, exports, module) {
	require('jquery');
	var signParam = require('signParam');
	var requestid = $('#requestid').val();
	var paysucc_wrap = $('#pay_succ_wrap');
	var paysucc_btn = $('#pay_succ_wrap button');
	//	var wechat_bag_url = '/redenv';
	var wechat_bag_url = '/ypdct#back';
	var wechat_bag_text = '领取红包';

	if (requestid) {
		signParam.sendData(function(data) {
			data.InvestorderId = requestid;
			$.ajax({
				type: "post",
				url: API_HOST + "/api/wechat/isget",
				dataType: 'jsonp',
				data: data,
				success: function(result) {
					if (result.err_code == '0') {
						if (result.data.isget == true) {
							console.log('if:' + result.data.amt);
							console.log('if:' + result.data.type);
							paysucc_wrap.attr('href', wechat_bag_url);
							paysucc_btn.text(wechat_bag_text);
						} else {
							console.log('else:' + result.data.isget);
						};
					};
				},
				async: true
			});
		});
	};
});