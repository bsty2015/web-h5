/*
 * create
 **/
define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var signParam = require('signParam');
	var msg = $("#msg");
	var msTip = $('#msTip');
	var userId = $('#userId').val();
	console.log(userId)
	var val = msg.val();
	var requestid = '';
	//=====================
	if (val != undefined && val.length > 0) {
		msTip.slideDown('slow', function() {
			setInterval(function() {
				msTip.slideUp('slow');
			}, 3000)
		})
	}

	function showMsg(m) {
		$('#msTip').slideDown('slow');
		$('#msTip input').val(m);
		setTimeout(function() {
			$('#msTip').slideUp('slow');
		}, 3000)
	};
	$('.ctrHidenTh').click(function() {
			$('.thunderCode').css('display', 'none')
		})
		//此处应该分割一下，显示框框。
		//		$('.thunderNextBtn').click(function(){
		//			$('.thunderCode').css('display','block');
		//		});
		//此处应该分割一下。作用，点击获取数据。
	$('.thunderNextBtn').click(function getdata() {
		//银行卡
		var cardno = $('#cardno').val();
		//身份证
		var idcardno = $('#idcardno').val();
		//姓名
		var username = $('#username').val();
		//手机号
		var phone = $('#phone').val();
		var tmp = {
			userId: userId,
			cardno: cardno,
			idcardno: idcardno,
			username: username,
			phone: phone
		};
		//id
		signParam.sendData(function(data){
			$.extend(data,tmp);
			$.ajax({
				type: "post",
				dataType: 'jsonp',
				url: API_HOST + "/api/pay/bindcard",
				data:data,
				error: function(data) {
					console.log(data.data);
				},
				success: function(data) {
					if ($('#username').val() !== '' && $('#idcardno').val() !== '' && $('#cardno').val() !== '' && $('#phone').val() !== '') {
						if (data.err_code == '0') {
							requestid = data.data.requestid;
							showMsg('正在提交，请稍后！')
							ctrCodeBtn();
							$('.thunderCode').css('display', 'block');
						} else {
							showMsg((data.err_msg));
						}
					} else {
						showMsg((data.err_msg));
					}

				},
				async: true
			});
		});

	})
	$('.getThunderCode').click(function() {
		getcode();
		ctrCodeBtn();
		//						alert(2)
	})

	function ctrCodeBtn() {
		var timer = null;
		var num = 60;
		clearInterval(this.timer);
		$('.getThunderCode span').text(num)
		this.timer = setInterval(function() {
			num--;
			$('.getThunderCode span').text(num + "后")
			if (num == 0) {
				$('.getThunderCode').attr('disabled', false);
				$('.getThunderCode span').text("")
				clearInterval(this.timer);
			} else {
				$('.getThunderCode').attr('disabled', true);
			}
		}, 1000)
	}

	function getcode() {
		signParam.sendData(function(data) {
			$.extend(data, {requestid: requestid});
			$.ajax({
				type: "post",
				dataType: 'jsonp',
				url: API_HOST + "/api/pay/sendmsg",
				data: data,
				success: function(data) {
					if (data.err_code == '0') {
						showMsg(data.err_msg)
					} else {
						showMsg(data.err_msg)
					}
				},
				error: function(data) {
					showMsg(data.err_msg)
				},
				async: true
			});

		});

	}
	$('.btnCode').click(function() {
			var code = $('#code').val();
			if (code.length == 6) {
				$('.btnCode').text("正在提交中");
			} else {
				if ($('.thunderCodeSecond').val() == "" || $('.thunderCodeSecond').val() == undefined) {
					showMsg('请输入验证码')
				} else {
					showMsg('请输入6位正确的验证码');
				}
				return;
			}

		signParam.sendData(function(data) {
			$.extend(data, {
				validatecode: code,
				userId: userId,
				requestid: requestid
			});
			$.ajax({
				type: "post",
				dataType: 'jsonp',
				url: API_HOST + "/api/pay/bindcard/confirm",
				data: data,
				success: function(data) {
					if (data.err_code == '0') {
						window.location.href = '/product/list';

					} else {

						$('.btnCode').attr('disabled', false);
						$('.btnCode').text('开始集财');
						showMsg('请输入6位正确的验证码');

					}
				},
				error: function(data) {
					console.log("data.err_msg")
				},
				async: true
			});
		});


		})
		//此处应该分割一下。作用：控制输入位数。
	$('form').bind('input propertychange', function() {
		$('#idcardno').val($('#idcardno').val().substr(0, 18));
		$('#cardno').val($('#cardno').val().substr(0, 19));
		$('#phone').val($('#phone').val().substr(0, 11));
	})
	$('.thunderCode').bind('input propertychange', function() {
		$('.thunderCodeSecond').val($('.thunderCodeSecond').val().substr(0, 6));
	})
});