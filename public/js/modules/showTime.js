define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	//售罄点击时代码
	$('.outBuy').click(function() {
			$('#msTip').slideDown('slow');
			$('#msTip input').val('亲~产品木有啦，下次来早点哟~');
			setTimeout(function() {
				$('#msTip').slideUp('slow');
			}, 3000)

		})
		//预售点击时代码
	$('.preBuy').click(function() {
			$('#msTip').slideDown('slow');
			$('#msTip input').val('亲~还在预售中啦，再等等啦~');
			setTimeout(function() {
				$('#msTip').slideUp('slow');
			}, 3000)
		})

	var remainTime = $('#J_remainTime');
	if(remainTime){
		outTime(Number(remainTime.val()));
	}
	function outTime(dataTime) {
		var d = Math.floor(dataTime/1000);

		timer = setInterval(function ws() {
			var h = Math.floor(d/3600);
			var m = Math.floor(((d%3600)/60));
			var s = ((d%3600)%60);
			if (d == 0) {
				clearInterval(timer);
				window.location.reload();
			}
			d--;

			$('.outTime').text(fillzero(h)+':'+fillzero(m) + ':' + fillzero(s) + ' 后开售');
		}, 1000)
	}
	function fillzero(n) {
		if (n < 10) {
			return "0" + n;
		} else {
			return "" + n;
		}
	}

});