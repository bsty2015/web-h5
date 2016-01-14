define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	//show banklist for bankAdd page
	$('.show-bList-btn').click(function() {
		$('.add-bank-list').show('slow');
	});
	$('.CTRHidden').click(function() {
			$('.add-bank-list').hide('slow');
		})
		//  ========== 
		//  = Banner = 
		//  ========== 
	$.ajax({
		dataType: 'jsonp',
		type: "post",
		url: API_HOST+'/api/bank',
		async: true,
		success: function(data) {
			$.each(data.data.banks, function(i,v) {
				var bList='';
				bList+='<li class="clear pleft2 border1-c5"><p class="fl alignM bank-bg '+v.bankCode+'"></p><p class="fl alignM"><span class="FontColorLblue FontSize16">'+v.name+'</span><br /><span>限额&nbsp;&nbsp;<span>'+v.oneLimitAmt+'</span>万/笔&nbsp;&nbsp;<span>'+v.dayLimitAmt+'</span>万/日 &nbsp;&nbsp;<span>'+v.mothLimitAmt+'</span>万/月</span></p></li>';
				console.log(bList);
				$('#addBList').append(bList);
			});
		}
	});

});