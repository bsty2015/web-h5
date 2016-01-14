define(function(require, exports, module) {
	//	 通过 require 引入依赖
	require('jquery');
	/*
	 * 活动结束提醒
	 */
	$('.thunderCodeSecond').click(function(){
		window.location.href='https://m.jicai.com/product/list';
	})
	$('.thunderNextBtn').click(function(){
		window.location.href='https://m.jicai.com/product/list';
	})
	$('.thunderEnd').click(function(){
		window.location.href='https://m.jicai.com/product/list';
	})
	$('.invitationEndBtn').click(function(){
		window.location.href='https://m.jicai.com/product/list';
		$('.invitationEnd').css('display','none');
	})
	function showMsg(M) {
		$('#msTip').slideDown('slow');
		$('#msTip input').val(M);
		setTimeout(function() {
			$('#msTip').slideUp('slow');
		}, 3000)
	}
	/*
	 * form 校验信息填写完整
	 */
	var btn = $('#invitationSendCode');
	$('#msTip input').css({
		'background': '#4C5460',
		'border-color': '#4C5460'
	});
	$('input').bind('input propertychange', function() {
		$('#code').val($('#code').val().substr(0, 6));
		$('#passwd').val($('#passwd').val().substr(0, 16));
		$('#telephone').val($('#telephone').val().substr(0, 11));
		if ($('#telephone').val().length == 11) {
			$('#invitationSendCode').css('background', 'rgb(81, 198, 255)');
			if ($('#passwd').val().length > 5 && $('#passwd').val().length < 16 && $('#code').val().length == 6) {
				$('#regParent').addClass('active');
				$('#invitationReg').css('border', 'none');
				$('form').attr('action', '/register/thirdRegister');
			} else {
				$('#regParent').removeClass('active');
				$('#invitationReg').css('border', '1px solid #fff');
				return false;
			}
		} else {
			$('#invitationSendCode').css('background', '#F16064');
		}
	})
	timer = null;
	btn.click(function() {
		var tel = $('#telephone').val();
		var num = 60;
		if ($('#telephone').val().length == 11) {
			$.ajax({
				type: "post",
				dataType: 'jsonp',
				url: API_HOST + '/api/validateTelephone',
				data: {
					telephone: tel
				},
				error: function(data) {
					alert('加载错误')
				},
				success: function(data) {
					if(data.err_code=='0'){
						
					if (data.data.isExist == true) {
						showMsg('该账号已注册');
						return false;
					} else if (data.data.isExist == false) {
						clearInterval(timer);
						timer = setInterval(function() {
							num--;
							if (num == 0) {
								//					$('form').attr('action','/register/thirdRegister');
								btn.attr('disabled', false);
								$('#invitationSendCode').text('重新发送');
								clearInterval(timer);
							} else if (num > 0) {
								//					$('form').attr('action','javascript:;');
								btn.attr('disabled', true);
								var oText = '重新发送' + num;
							}
							$('#invitationSendCode').text(oText)
						}, 1000)
						$.ajax({
							type: "post",
							dataType: 'jsonp',
							url: API_HOST + '/api/msg/code',
							data: {
								telephone: tel
							},
							error: function(er) {
								console.log(er)
							},
							success: function() {
								showMsg('验证码已发送');
							},
							async: true
						});
					}
					}
					else{
						showMsg(data.err_msg);
					}
				},
			});
		} else if ($('#telephone').val().length !== 11) {
			showMsg('请输入正确的手机号码')
		}
		return false;
	})
	if($('#msTip2 input').val()!==''&&$('#msTip2 input').val()!==undefined){
		$('#msTip2').css('display','block')
	}
	$('#msTip2 input').bind('input change',function(){
			$('#msTip2').css('display','block');
	})
	$('#msTip2 button').click(function(){
		$('#msTip2').css('display','none')
	})
	
});