define(function(require, exports, module) {
	// 通过 require 引入依赖

	window.verifyPhone = function(phone){
		return /^(13|15|18)\d{9}$|^(145|147)\d{8}$|^(1700|1705|1709)\d{7}$|^(176|177|178)\d{8}$/.test(phone);
	}
});