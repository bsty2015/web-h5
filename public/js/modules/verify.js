define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	require('commonModule');
	var oldVal = '';
	var oText = $('#loadingText').val();
	var loadingHtml = '<div id="parent"><div id="loading"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div><div id="loadingText"><p>' + oText + '</p></div></div></div></div>';
	var telephone = $('#telephone');
	var msTip = $('#msTip');
	$('#telephone').bind('input propertychange',function(){
		var val = telephone.val();
		if(val == '' || (val && val.length < 12)){
			oldVal = telephone.val();
		}else{
			telephone.val(oldVal);
		}
	});
	$('form').submit(function(){
		
		if(!verifyPhone(telephone.val())){
			$('#msg').val('手机格式错误');
			msTip.slideDown('slow', function() {
				setInterval(function() {
					msTip.slideUp('slow');
				}, 3000)
			})
			return false;
		}
		else{
			$(document.body).before(loadingHtml);
		}
	});
});