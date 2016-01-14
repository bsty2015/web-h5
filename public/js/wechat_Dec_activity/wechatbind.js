define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
//	$(".nobind-btn").click(function(){
//		  $(".box").css("display","block");
//		  $(".container").css("display","none");
//	})
//	
	$('.nobind-btn').click(function(){
		$('.container').hide();
		$('.box').show();
		$('.tel').val('');
	});

	$('.bind-ok').click(function(){
	  var telValue=$(".tel").val();
	  var passTel=$(".password").val();
	    var pattern=/^1[\d]{10}$/;
		if(telValue.length==0){
			errorTip("手机号码不可以为空");
		 }else if(telValue.length!=" "&&telValue.length<11 || !pattern.test(telValue)){
		 	errorTip("请输入正确的手机号码");
		 	    
		 }else if(passTel.length==0&&telValue!= ""){
		 	errorTip("密码不可以为空");
		}else if(passTel.length>0 && passTel.length<6 && telValue!= ""){
			errorTip("密码长度不小于6位");
		}else{
					$('.bind-form').attr('action','/wc/auth');
		}

	});
	
	function errorTip(tip){
		var speed=2000;
		 $(".errorTip").html(tip).slideDown("slow");
			 setTimeout(function(){
			 	 $(".errorTip").html(tip).slideUp("slow");
			 },speed);
		
	};
	$('.bind-yes').click(function(){
		$('.bind-form').attr('action','/wc/auth');
	});
	

});