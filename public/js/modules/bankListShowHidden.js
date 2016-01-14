//define(function(require, exports, module) {
//	// 通过 require 引入依赖
//	require('jquery');
//	var investButton = $('#J_invest');
//	var productId = $('#J_productId').val();
//	$('#J_investAmt').on('input', function() {
//		var investAmt = $(this).val().trim();
//		if (/[1-9]\d*$/.test(investAmt)) {
//			$('#msg').text('');
//			investButton.prop('disabled', false);
//			$.ajax({
//				type: 'post',
//				url: API_HOST + '/api/invest/profit',
//				dataType: 'jsonp',
//				data: {
//					productId: productId,
//					investAmt: investAmt
//				},
//				success: function(data) {
//					if (data.err_code == '0') {
//						$('#J_profit').text(data.data.profit);
//					}
//				}
//			});
//		}
//	});
//	investButton.click(function(){
//		if(!/[1-9]\d*$/.test($('#J_investAmt').val())){
//			$("#msg").val("理财金额只能为数字");
//			return false;
//		}
//	});
//	//显示我的银行列	表invest.html 
//	$('.ws').click(function(){
//		$('.showHidden').slideDown('slow');
//	})
//	$('.controlBtn').click(function(){
//		$('.showHidden').slideToggle('slow');
//	})
//});
//====================================
define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var contract = $('.bingding-agree');
	var investButton = $('#J_invest');
	var productId = $('#J_productId').val();

	$('#J_investAmt').bind('input propertychange', function() {
		initInvestAmt();
	});
	investButton.click(function(){
		if(!/[1-9]\d*$/.test($('#J_investAmt').val())){
			$("#msg").val("理财金额只能为数字");
			return false;
		}
	});
	//显示我的银行列表invest.html

	$('.ws').click(function(){
		var investAmt = $('#J_investAmt').val();
		$('.ownCard').each(function(){
			if(investAmt){
				var ownCard = $(this);
				ownCard.attr('href',ownCard.attr('href')+'&investAmt='+investAmt);
			}
		});
		$('.showHidden').slideDown('slow');
	})
	$('.controlBtn').click(function(){
		$('.showHidden').slideToggle('slow');
	})


	function initInvestAmt(){
		var investAmt = $('#J_investAmt').val();
		if(investAmt == '0'){
			$('#msg').val('投资金额不能为零');
			$('#J_investAmt').val('');
			return;
		}
		if (/[1-9]\d*$/.test(investAmt)) {
			$('#msg').text('');
			investButton.prop('disabled', false);

			$.ajax({
				type: 'post',
				url: API_HOST + '/api/invest/profit',
				dataType: 'jsonp',
				data: {
					productId: productId,
					investAmt: investAmt
				},
				success: function(data) {
					if (data.err_code == '0') {
						$('#J_profit').text(data.data.profit);
					}else{
						$('#J_profit').text(0);
					}
				}
			});
			contract.attr('href',contract.attr('href')+'&investAmt='+investAmt);
			$('#J_investAmt').val(investAmt);
		}else if(investAmt != ''){
			investAmt = parseInt(investAmt);
			if(!isNaN(investAmt)){
				$('#J_investAmt').val(investAmt);
			}else {
				$('#J_investAmt').val("");
				$('#J_profit').text(0);
				$('#msg').val('投资金额只能为数字');
				investAmt = 0;
			}
			contract.attr('href',contract.attr('href')+'&investAmt='+investAmt);
		}else{
			$('#J_investAmt').val("");
			$('#J_profit').text(0);
		}
	}
	initInvestAmt();
});