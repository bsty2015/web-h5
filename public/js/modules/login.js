define(function(require, exports, module) {
	require('jquery');
    $('.loginBtn').click(function(){
	  var telValue=$(".tel").val();
	  var passTel=$(".password").val();
	  var pattern=/^1[\d]{10}$/;
		if(telValue.length==0){
			errorTip("手机号码不可以为空");
		 }else if(telValue.length!=" "&&telValue.length<11 || !pattern.test(telValue)){
		 	errorTip("请输入正确的手机号码");
		 	    
		 }else if(passTel.length==0&&telValue!= ""){
		 	errorTip("密码不可以为空");
		}else{
					$('.login-Form').attr('action','/login');
		}

	});
	
	function errorTip(tip){
		var speed=2000;
		 $(".errorTip").html(tip).slideDown("slow");
			 setTimeout(function(){
			 	 $(".errorTip").html(tip).slideUp("slow");
			 },speed);
		
	};

})