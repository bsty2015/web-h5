define(function(require, exports, module) {
	// 通过 require 引入依赖
	var numberRex = '0,0[.]00';
	require('jquery');
	require('numeral');
	require('juicer');
	var signParam = require('signParam');
	var status = '待还款';
	var hideBar = $('#J_hide_bar');
	var content = $("#J_content");
	function formatNumber(val) {
		if (val == undefined || val == 'null') {
			return 0;
		}
		return numeral(val).format(numberRex);
	}
	function formatDate(val) {
		return new Date(val).pattern("yyyy-MM-dd");
	}

	juicer.register('formatNumber',formatNumber);
	juicer.register('formatDate',formatDate);
	$('nav a').click(function() {
		status = $(this).attr('data-status');
		var index = $('nav a').index(this);
		$(this).addClass('active').siblings().removeClass('active');
		$('footer article').hide();
		$('footer article').eq(index).show();
		requestData();
	})

	function requestData(){
		signParam.sendData(function(data){
			$.extend(data,{userId: $('#getID').val(), status: status, pageSize: 100000})
			$.ajax({
				type: "POST",
				dataType: "jsonp",
				url: API_HOST + '/api/user/invest/product',
				data: data,
				error: function () {

				},
				success: function (data) {
					if(data.err_code == '-2'){
						window.location.href='/signout';
						return;
					}
					$('#totalAmt').html(formatNumber(data.data.totalAmt));
					if(data.err_code == '0' && data.data.products.length >0){
						hideBar.hide();
						var tplId = '#invest_have_tpl';
						if(status == '待还款'){
							tplId = '#invest_have_tpl';
						}else{
							tplId = '#invest_not_tpl';
						}
						var html = juicer(tplId,data.data);
						content.html(html);
					}else{
						content.empty();
						hideBar.show();
					}
				}
			});
		});

	}
	requestData();
});