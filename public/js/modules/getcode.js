define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var oTime = $("#time");
	var oReset = $("#repetSend");
	var  url = oReset.attr('data-url');
	var oForm=$("#bankcodeform");
	var oCode = $(".getcode");
	//oCode.on('input',function(){
	//	var  val = oCode.val();
	//	if(/\d{6}/.test(val)){
	//		oReset.attr('disable',true);
	//		oForm.submit();
	//	}
	//});
	//regcode.html验证下一步按钮

		var num = 60;
		var timer = setInterval(function() {
			if (num <= 1) {
				clearInterval(timer);
				oTime.text("");
				oReset.attr('href',url);
			} else {
				num--;
				oTime.text(num + '(s)');
				oReset.attr('href',"javascript:;");
			}
		}, 1000);

});