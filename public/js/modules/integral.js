define(function(require, exports, module) {
	// 通过 require 引入依赖
	require('jquery');
	var signParam = require('signParam');
	$('#nav a').each(function(i) {
		var index = $('#nav a').index($(this));
		$(this).click(function() {
			$('article').eq(index).slideDown().siblings().slideUp();
			$(this).addClass('active').siblings().removeClass('active');
		})
	}); //END
	//  *******************************
	$('.integralCtr').click(function() { //show it;
		$('#rule').slideDown('slow');
	});
	$('.hidden').click(function() { //show it;
		$('#rule').slideUp('slow');
	});
	$('#rule').click(function() { //show it;
			$('#rule').slideUp('slow');
		})
		//============================================================
	get();
	$('.change').click(change)
	$('.get').click(get)

	function get() {
		signParam.sendData(function(data){
			$.extend(data,{userId:$('#getID').val(),isExchange:false,pageSize:10000});
			$.ajax({
				type: "POST",
				dataType: "jsonp",
				url: API_HOST + '/api/credit/list',
				data:data,
				error: function() {
					var html = '<i style="font-size: 10rem;color: #c1c1c1;display: block;text-align: center;margin-top:2rem" class="iconfont FontColor120">&#xe642;</i>';
					//				var html = '<i style="font-size: 10rem;color: #c1c1c1;display: block;text-align: center;margin-top:2rem" class="iconfont FontColor120">积分商城即将上线，敬请期待。</i>';
					$(document.body).css('background', '#f5f5f5');
					$('article').css('background', '#f5f5f5');
					$('.integralGet').html(html);
				},
				success: function(datas) {
					if(datas.err_code == '-2'){
						window.location.href='/signout';
						return;
					}
					//不足2位补0
					function zeroFull(n) {
						if (n < 10) {
							return "0" + n;
						} else {
							return "" + n
						}
					}
					//总积分
					$('.integralL').text(datas.data.totalCredit)
					var integralGetHtml = '';
					$.each(datas.data.credits, function(i, v) {
						integralGetHtml += '<section><p>' + v.source + '</p><ul><li><span>+</span><span>' + v.award + '</span></li><li>' + new Date(v.date).pattern("yyyy-MM-dd") + '</li></ul></section>';
						$('.integralGet').html(integralGetHtml);
					});
					//设置样式
					$('.integralGet section').attr('class', 'bg-white border1-ef pTop1 pleft2 pBottom1');
					$('.integralChange section').attr('class', 'bg-white border1-ef pTop1 pleft2 pBottom1');
					$('footer p').attr('class', 'FontSize14 integralTitle');
					$('footer ul').attr('class', 'clear');
					$('footer li:even').attr('class', 'fl integralSL alignM integralNum');
					$('footer li:odd').attr('class', 'fr integralSR alignM integralData FontSize12 firstfont');
					$('footer li span:even').attr('class', 'FontSize16');
					$('footer li span:odd').attr('class', 'firstfont FontSize18');
				}


			});
		});

	}
	//获取数据并处理数据
	function change() {
		signParam.sendData(function(data){
			$.extend(data,{userId:$('#getID').val(),isExchange:true,pageSize:10000});
			$.ajax({
				type: "post",
				dataType: 'jsonp',
				url: API_HOST + "/api/credit/list",
				data:data,
				async: true,
				success: function(data) {
					if (data.data.credits.length == 0) {
						//					var html = '<i style="font-size: 10rem;color: #c1c1c1;display: block;text-align: center;margin-top:2rem" class="iconfont FontColor120">&#xe642;</i>';
						var html = '<i style="font-size: 2rem;color: #c1c1c1;display: block;text-align: center;margin-top:8rem" class="iconfont FontColor120">积分商城即将上线，敬请期待。</i>';
						$(document.body).css('background', '#f5f5f5');
						$('article').css('background', '#f5f5f5');
						$('.integralChange').html(html);
					} else {

					}
				}
			});
		});

	}

	Date.prototype.pattern = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
			"H+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		var week = {
			"0": "/u65e5",
			"1": "/u4e00",
			"2": "/u4e8c",
			"3": "/u4e09",
			"4": "/u56db",
			"5": "/u4e94",
			"6": "/u516d"
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}

});