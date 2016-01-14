define(function(require, exports, module) {
    require('jquery');
	var Browser = require("/js/analyzingSystem");
	var signParam = require('signParam');
	function Browser2() {
		Browser.call(this);
	};

	for (var i in Browser.prototype) {
		Browser2.prototype[i] = Browser.prototype[i];
	};

	Browser2.prototype.fnWechat = function() {
		new WechatActivity();
		$.ajax({
			type:"post",
			url: API_HOST + "/api/wechat/gotEnough3",
			type: "jsonp",
			success:function(result){
				if(result.err_code == "0"){
					if(result.data.isEnough == '1'){
						$(".mask").css("display","block");
						$(".regred").css("display","block");
						$(".send-p").css("display","block");
					}else if(result.data.isEnough == '0'){
						$(".mask").css("display","none");
						$(".regred").css("display","none");
						$(".send-p").css("display","none");
						$(".info-end").css("display","block");
						$("#btn_open1 button").text("查看我的红包");
						$("#btn_open1").on("click",function(){
							  $(this).attr("href","javascript:;");
							  $(".myred").css("display","block");
							  $(".mask").css("display","block");
							  $(".regred").hide();
							  $("#return-a").click(function (){
							  	  $(".myred").fadeOut(800);
							  	  $(".mask").css("display","none");
							  });
						})
					}
				}
			},
			async:true
		});
		
	};

	Browser2.prototype.fnOther = function() {
		var This = this;
		$(".no-weixin").css("display","block");
		$(".weixin").css("display","none");
	     $.ajax({
	     	type:"post",
	     	url: API_HOST + "/api/wechat/gotEnough3",
			type: "jsonp",
			success:function(result){
				if(result.err_code == "0"){
					if(result.data.isEnough == '1'){
						$(".mask").css("display","block");
						$(".regred").css("display","block");
						$(".send-p").css("display","block");
					}else if(result.data.isEnough == '0'){
						$(".mask").css("display","none");
						$(".regred").css("display","none");
						$(".send-p").css("display","none");
						$(".info-end").css("display","block");
						$("#btn_open1 button").text("查看我的红包");
						$("#btn_open1").on("click",function(){
							  $(this).attr("href","javascript:;");
							  $(".myred").css("display","block");
							  $(".mask").css("display","block");
							  $(".regred").hide();
							  $("#return-a").click(function (){
							  	  $(".myred").fadeOut(800);
							  	  $(".mask").css("display","none");
							  });
						})
					}
				}
			},
	     	async:true
	     });
	};
	

	function WechatActivity(){
		 this.clickBtn = $(".clickBtn");
		 this.userId = window.userId;
		 if(userId) {
		 	this.fnCheck();
		 	this.fnStatus();
		 	if(window.location.hash == "#back"){
		 		$(".mask").css("display","block");
		 		$(".regred").css("display","block");
		 		$(".send-p").css("display","block");
		 	};
		 	
		 } else{
		 	
		 }
	};
	
	WechatActivity.prototype.fnAjax = function(url , succFn , result) {
		 
		 var This = this;
		signParam.sendData(function(data) {
			$.ajax({
				type: "POST",
				url: API_HOST + url,
				dataType: 'jsonp',
				data: data,
				success: function(result) {
					if (result.err_code == '0') {
						succFn(result);
					}
				},
				async: true
			});
		});
	};
	
		WechatActivity.prototype.fnCheck = function (){
			 var This = this;
			 This.fnAjax('/api/wechat/isbind',function(result){
			 	 if(result.data.isBind){
			 	 	  $("#return-a").click(function(){
			 	 	  	  $(".myred").css("display","none");
			 	 	  	  $(".mask").css("display","none");
			 	 	  	  $(".send-p").css("display","none");
			 	 	  });
			 	 } else{
			 	 	   This.clickBtn.attr("href","/wechatbind");
			 	 }
			 });
		};
		
		WechatActivity.prototype.fnStatus=function (){
			  var This = this;
			  $("#btn_open1").click(function(){
			  	      	$(".mask").css("display","block");
			  	    	$(".myred").css("display","block");
			  	    	$(".send-p").css("display","block");
			  });
			 $("#return-a").click(function(){
			 	 	  	  $(".myred").css("display","none");
			 	 	  	  $(".mask").css("display","none");
			 	 	  	   $(".send-p").css("display","none");
			 	 	  });
			 $("#btn_open").click(function(){
			 	        $(".mask").css("display","block");
			  	    	$(".regred").css("display","block");
			  	    	$(".send-p").css("display","block");
			 });
			
		};
	
	new Browser2();
	
});