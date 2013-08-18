var $ = $ || require('jquery');

PowerOfTwoListener = function() {
};

PowerOfTwoListener.prototype.try = function() {
	$.get("/tryPowerOfTwo?server=" + $('#server').val());
};

var module = module || {};
module.exports = PowerOfTwoListener;