//create by 2220003888 deal-dail.html
define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var onff = true;
	$('footer a').click(function() {
		var target = $(this)
		var sw = target.attr('data-switch');
		if(sw == 'on'){
			$('footer a').attr('data-switch','off');
			$('footer a').removeClass('active').siblings().removeClass('active');
			$('footer a').children().html('&#xe650;');
		}else{
			$('footer a').attr('data-switch','off');
			$('footer a').removeClass('active').siblings().removeClass('active');
			$('footer a').children().html('&#xe650;');
			target.attr('data-switch','on');
			$(this).addClass('active').siblings().addClass('active');
			$(this).children('span').html('&#xe64e;');
		}
	})

});