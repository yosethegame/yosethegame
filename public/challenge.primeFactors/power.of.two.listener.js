var $ = $ || require('jquery');

var thisPowerOfTwoListener;

PowerOfTwoListener = function() {
	thisPowerOfTwoListener = this;
};

PowerOfTwoListener.prototype.try = function() {
	thisPowerOfTwoListener.clear();
	$('#avatar').addClass('rotate');
	$.get("/tryPowerOfTwo?server=" + $('#server').val()).success(this.success).error(this.error);
};

PowerOfTwoListener.prototype.clear = function() {
	$('#success').text('');
	$('#received').text('');
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
	$('#avatar').removeClass('rotate');
	thisPowerOfTwoListener.clear();
	thisPowerOfTwoListener.show('#success_section');
	thisPowerOfTwoListener.hide('#error_section');
	$('#success').text('success!');
	$('#received').text(data);
};

PowerOfTwoListener.prototype.error = function(err) {
	$('#avatar').removeClass('rotate');
	thisPowerOfTwoListener.clear();
	thisPowerOfTwoListener.hide('#success_section');
	thisPowerOfTwoListener.show('#error_section');
	$('#error').text('error ' + err.status);
	
	if(err.responseText != null) {
		var gotIndex = err.responseText.indexOf(',"got":');
		var expected = err.responseText.substring('{"expected":}'.length-1, gotIndex);
		var actual = err.responseText.substring(gotIndex + ',"got":'.length);

		$('#expected').text(expected);
		$('#got').text(actual.substring(0, actual.length-1));
	}
};

var module = module || {};
module.exports = PowerOfTwoListener;