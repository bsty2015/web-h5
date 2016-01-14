define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	$('.showShare').click(function(){
		$('.share').slideDown('slow');
	});
	$('.shareHidden').click(function () {
		$('.share').slideToggle('slow');
	});
	/*查看奖励规则浮层代码start*/
    function openNew(){
      var sWidth=document.body.scrollWidth;
	  var sHeight=document.body.scrollHeight;
		$("#mask").css("height",sHeight);
		$("#mask").css("width",sWidth);
		$("#mask").css("display","block");
		$('.img-mask').css("display","none");
		$(".rule").css("display","block");
		$("#mask").click(function(){
			 $(this).css("display","none");
			  $(".rule").css("display","none");
		})
		$(".rule").click(function(){
			$("#mask").css("display","none");
			 $(".rule").css("display","none");
		})
	}
	$(".button").click(function(){
		openNew();
		return false;
	})
	 /*查看奖励规则浮层代码end*/
	
	/*微信浮层代码start*/
	 function openNew2(){
      var sWidth=document.body.scrollWidth;
	  var sHeight=document.body.scrollHeight;

		$("#mask").css("height",sHeight);
		$("#mask").css("width",sWidth);
		 $('.img-mask').css("display","block");
		$("#mask").css("display","block");
		$(".img-mask").css("display","block");
		$("#mask").click(function(){
			 $(this).css("display","none");
			  $(".img-mask").css("display","none");
		})
		$(".img-mask").click(function(){
			$("#mask").css("display","none");
			 $(".img-mask").css("display","none");
		})
	}
	$(".img-click").click(function(){
		openNew2();
		return false;
	})
	/*微信浮层代码end*/
})