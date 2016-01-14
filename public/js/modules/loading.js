define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var oText = $('#loadingText').val();
	var loadingHtml = '<div id="parent"><div id="loading"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div><div id="loadingText"><p>' + oText + '</p></div></div></div></div>';
	var tel = $("input[name='telephone']");
	var psw = $("input[name='passwd']");
	var loginBtn = $(".loginBtn");
	$('input').bind('input propertychange', function() {
		    var val = tel.val();
			if (val && val.length == 11 && psw && psw.val() !== '') {
				//			alert(tel.val())
				loginBtn.removeClass('btn-55-normal');
				loginBtn.addClass('btn-55-green');
			} else {
				loginBtn.addClass('btn-55-normal');
			}
		})
		//login.html
	$('#next').click(function() {
			var url = $('form').attr('data-url');
			if (oText !== undefined && tel.val().length == 11 && psw.val() !== '') {
				$(document.body).before(loadingHtml);
				setTimeout(function() {
					$('form').attr('action', url).submit();
				}, 40)
			}
		})
		//user/invest.html
	$('#J_invest').click(function() {
			var url = $('form').attr('data-url');
			$('form').attr('action', 'javascript:;')
			if ($('#J_investAmt').val() !== '') {
				$(document.body).before(loadingHtml);
				setTimeout(function() {
					$('form').attr('action', url).submit();

				}, 40)
			}
		})
		//pay-send-code.HTML
	$('#rePay').click(function() {
			var url = $('form').attr('data-url');
			$('form').attr('action', 'javascript:;');
			if ($('.getcode').val() !== '') {
				$(document.body).before(loadingHtml);
				setTimeout(function() {
					$('form').attr('action', url).submit();

				}, 40)
			}
		})
		//add-bank.html
	$('#addBankNbtn').click(function() {
			var nval = $("#username").val();
			var ival = $('#idcardno').val();
			var bval = $('#J_cardno').val();
			var pval = $('#phone').val();
			var url = $('form').attr('data-url');
			$('form').attr('action', 'javascript:;');
			if (nval.length > 1 && ival.length > 10 && bval.length > 15 && pval.length > 10) {
				$(document.body).before(loadingHtml);
				setTimeout(function() {
					$('form').attr('action', url).submit();

				}, 40)
			}
		})
		//bank-code.html;
	$('#bankCodeNextBtn').click(function() {
			var url = $('form').attr('data-url');
			$('form').attr('action', 'javascript:;');
			if ($('.getcode').val() !== '') {
				$(document.body).before(loadingHtml);
				setTimeout(function() {
					$('form').attr('action', url).submit();

				}, 40)
			}
		})
		//recode.html
	$('#recodeNextBtn').click(function() {
			var url = $('form').attr('data-url');
			$('form').attr('action', 'javascript:;');
			if ($('#reCode').val() !== '') {
				$(document.body).before(loadingHtml);
				setTimeout(function() {
					$('form').attr('action', url).submit();

				}, 40)
			}
		})
		//regTel.html
	$('#regTelNextBtn').click(function() {
			var url = $('form').attr('data-url');
			$('form').attr('action', 'javascript:;');
			if ($('.reg-phone').val() !== '') {
				$(document.body).before(loadingHtml);
				setTimeout(function() {
					$('form').attr('action', url).submit();

				}, 40)
			}
		})
		//thunder.html
	$('#invitationReg').click(function() {
			var url = $('form').attr('data-url');
			$('form').attr('action', 'javascript:;');
			//		if ($('.reg-phone').val() !== '') {
			$(document.body).before(loadingHtml);
			setTimeout(function() {
					$('form').attr('action', url).submit();

				}, 40)
				//		}
		})
});