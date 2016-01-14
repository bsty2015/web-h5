define(function(require, exports, module) {
	require('jquery');
	require('juicer');
	require('numeral');
	require('juicerUtils');
	var signParam = require('signParam');
	var userId = window.userId
	var content = $('#xmas_reg_show2 ul')

	function requestData() {
		signParam.sendData(function(data) {
			$.ajax({
				type: "POST",
				dataType: "jsonp",
				url: API_HOST + '/api/wechat/redlistForXmas',
				data: data,
				error: function() {

				},
				success: function(data) {
					if (data.err_code == '0') {
						var tplId = '#wechat-xmas-tpl';
						var html = juicer(tplId, data.data);
						content.html(html);
					};
				}
			});
		})
	};
	requestData();
});