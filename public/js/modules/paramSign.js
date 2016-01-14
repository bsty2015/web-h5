/*
 * create
 **/
define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var cache = undefined;
	return {
		sendData:function(callback){
			if(cache){
				callback(cache);
				return;
			}
			$.ajax({
				url: '/sign',
				success: function (data) {
					cache =data;
					callback(cache);
				}
			});
		}
	};

});