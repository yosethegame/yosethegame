var $ = $ || require('jquery');

PowerOfTwoListener = function() {
};

PowerOfTwoListener.prototype.try = function() {
	$.get("/tryPowerOfTwo?server=" + $('#server').val()).success(this.success);
};

PowerOfTwoListener.prototype.success = function() {
	$('#success_section').removeClass('hidden');
	$('#success_section').addClass('visible');
	$('#error_section').addClass('hidden');
	$('#error').text('');
	$('#expected').text('');
	$('#got').text('');
	
	$('#success').text('success!');
};

var module = module || {};
module.exports = PowerOfTwoListener;