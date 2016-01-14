define(function(require, exports, module) {
	//	 通过 require 引入依赖
	require('jquery');
	//绑定input开始代码
//	$('#J_cardno').bind('input propertychange', function() {
//		$('#J_cardno').val($('#J_cardno').val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "))
//
//	});
	//****************************
	$('input').bind('input propertychange', function() {
		var nval = $("#username").val();
		var ival = $('#idcardno').val();
		var bval = $('#J_cardno').val();
		var pval = $('#phone').val();
		if (nval.length >1 && ival.length > 10 && bval.length > 15 && pval.length > 10) {
			$('.next-btn').addClass('btn-55-green').removeClass('btn-55-normal');
			
		}
		else{$('.next-btn').removeClass('btn-55-green').addClass('btn-55-normal')}
	})

});