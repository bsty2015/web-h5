define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	$(".red-status a").click(function(){
		    $(this).removeClass("out-red").addClass("get-red").siblings().removeClass("get-red").addClass("out-red");
		    var i=$(this).index();
		     $(".red-list ul").eq(i).css("display","block").siblings().css("display","none");
	});
});