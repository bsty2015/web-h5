define(function(require, exports, module) {
	require('jquery');

function isWx() { //判断微信系统
	var browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return { //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				//              iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
				//              iPad: u.indexOf('iPad') > -1, //是否iPad
				//              webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') { //是微信，跳转到应用宝
		$(".down-app").attr("href", "http://a.app.qq.com/o/simple.jsp?pkgname=com.jc.jicai_android");
	} else {
		if (browser.versions.ios == true) { //ios跳转到。。。
			$(".down-app").attr("href", "https://itunes.apple.com/cn/app/ji-cai/id1024955696");
		} else if (browser.versions.android == true) { //安卓跳转地址。。
			$(".down-app").attr("href", "/downloadAndroid");
		} else {
			//其他系统。。
			$(".down-app").attr("href", "/product/list");
			}

		}
	}
	isWx();
})