define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var clientH = $(window).height();
	/*
	 * 判断终端类型
	 */
	var ua = navigator.userAgent.toLowerCase();
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid == true) {
			/*
		 * 控制显示隐藏
		 */
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			$('.iosDown').click(function() {
			//			window.location.href = '/app';
			$('.share').slideDown('slow');
		})
		$('.shareHidden').click(function() {
			$('.share').slideToggle('slow');
		});
		}
		else{
			$('.iosDown').click(function() {
						window.location.href = '/app';
//			window.location.href='https://itunes.apple.com/cn/app/ji-cai/id1024955696?l=en&mt=8';
		})
		}
	} else if (isiOS == true) {
		/*
		 * 控制显示隐藏
		 */
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			$('.iosDown').click(function() {
			//			window.location.href = '/app';
			$('.share').slideDown('slow');
		})
		$('.shareHidden').click(function() {
			$('.share').slideToggle('slow');
		});
		}
		else{
			$('.iosDown').click(function() {
			//			window.location.href = '/app';
			window.location.href='https://itunes.apple.com/cn/app/ji-cai/id1024955696?l=en&mt=8';
		})
		}
	} else {
		$('.iAppSet').click(function() {
			window.location.href = '/app';
		})
	}
});