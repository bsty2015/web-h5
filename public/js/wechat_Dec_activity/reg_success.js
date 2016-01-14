define(function(require,exports,module){
	require('jquery');
		var Browser = require("/js/analyzingSystem");
	//	new Browser();

	function Browser2() {
		Browser.call(this);
	};
	for (var i in Browser.prototype) {
		Browser2.prototype[i] = Browser.prototype[i];
	};
	Browser2.prototype.fnWechat = function() {
		var This = this;
		$('.container').css('display','block');
		$('.box').css('display','none');
	};
	Browser2.prototype.fnOther = function() {
		$('.container').css('display','none');
		$('.box').css('display','block');
	};
	new Browser2();
});