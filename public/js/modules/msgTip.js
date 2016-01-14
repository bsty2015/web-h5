define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var msg = $("#msg");
	var msTip = $('#msTip');
	var val = msg.val();
	if (val != undefined && val.length > 0) {
		msTip.slideDown('slow', function() {
			setInterval(function() {
				msTip.slideUp('slow');
			}, 3000)
		})
	}
});