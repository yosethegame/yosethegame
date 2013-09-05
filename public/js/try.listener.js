var $ = $ || require('jquery');

function TryListener() {	
};

TryListener.prototype.try = function(challenge) {
	this.startAnimation();
	this.hideResults();
	$.get('/try-all-up-to?challenge=' + challenge + '&login=' + $('#login').text() + '&server=' + $('#server').val())
		.success(this.displayResults);
};

TryListener.prototype.displayResults = function(data) {
	TryListener.prototype.stopAnimation();
	TryListener.prototype.showResults();
	var results = $.parseJSON(data);
	
	var result = results[0];
	$('#result_1 .challenge').text(result.challenge);
	$('#result_1 .status').text(result.code);
	$('#result_1 .expected').text(JSON.stringify(result.expected));
	$('#result_1 .got').text(JSON.stringify(result.got));
	var canContinue = true;
	if (result.code != 200) {
		canContinue = false;
	}

	if (canContinue) {
		$('#continue').removeClass('hidden').addClass('visible');
	}
};

TryListener.prototype.startAnimation = function() {
	$('#avatar').addClass('rotate');	
};
TryListener.prototype.stopAnimation = function() {
	$('#avatar').removeClass('rotate');	
};
TryListener.prototype.hideResults = function() {
	$('#results').removeClass('visible').addClass('hidden');	
};
TryListener.prototype.showResults = function() {
	$('#results').removeClass('hidden').addClass('visible');	
};

var module = module || {};
module.exports = TryListener;