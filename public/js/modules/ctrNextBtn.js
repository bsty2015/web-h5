define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	require('commonModule');
	var oInput = $('.CTRHidden');
	var NextBtn = $('.next-btn');
	var oText = $('#loadingText').val();
	var loadingHtml = '<div id="parent"><div id="loading"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div><div id="loadingText"><p>' + oText + '</p></div></div></div></div>';
	$('input').bind('input propertychange', function() {
//		if(oInput.val().length>11){
//			//login.html	控制输入位数为11位。
//			var num=oInput.val().substr(0,11);
//			oInput.val(num);
//					    
//		}
			if (verifyPhone(oInput.val())) {
				NextBtn.removeClass('btn-55-normal');
				NextBtn.addClass('btn-55-green')
			}
			else {
				NextBtn.addClass('btn-55-normal');
				NextBtn.removeClass('btn-55-green');
			}
		})
});

