var $ = $ || require('jquery');

var thisPowerOfTwoListener;

PowerOfTwoListener = function() {
	thisPowerOfTwoListener = this;
};

PowerOfTwoListener.prototype.try = function() {
	$.get("/tryPowerOfTwo?server=" + $('#server').val()).success(this.success);
};

PowerOfTwoListener.prototype.clear = function() {
	$('#success_section').removeClass('hidden');
	$('#error_section').addClass('hidden');
	$('#error').text('');
	$('#expected').text('');
	$('#got').text('');
};

PowerOfTwoListener.prototype.success = function(data) {
	thisPowerOfTwoListener.clear();
	$('#success_section').addClass('visible');
	$('#success').text('success!' + ' ' + data);
};

var module = module || {};
module.exports = PowerOfTwoListener;