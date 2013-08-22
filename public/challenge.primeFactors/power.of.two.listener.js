var $ = $ || require('jquery');

var thisPowerOfTwoListener;

PowerOfTwoListener = function() {
	thisPowerOfTwoListener = this;
};

PowerOfTwoListener.prototype.try = function() {
	$.get("/tryPowerOfTwo?server=" + $('#server').val()).success(this.success).error(this.error);
};

PowerOfTwoListener.prototype.clear = function() {
	$('#success').text('');
	$('#error').text('');
	$('#expected').text('');
	$('#got').text('');
};

PowerOfTwoListener.prototype.show = function(selector) {
	$(selector).removeClass('hidden');
	$(selector).addClass('visible');
};

PowerOfTwoListener.prototype.hide = function(selector) {
	$(selector).removeClass('visible');
	$(selector).addClass('hidden');
};

PowerOfTwoListener.prototype.success = function(data) {
	thisPowerOfTwoListener.clear();
	thisPowerOfTwoListener.show('#success_section');
	thisPowerOfTwoListener.hide('#error_section');
	$('#success').text('success!' + ' ' + data);
};

PowerOfTwoListener.prototype.error = function(err) {
	thisPowerOfTwoListener.clear();
	thisPowerOfTwoListener.hide('#success_section');
	thisPowerOfTwoListener.show('#error_section');
	$('#error').text('error ' + err.status);
};

var module = module || {};
module.exports = PowerOfTwoListener;