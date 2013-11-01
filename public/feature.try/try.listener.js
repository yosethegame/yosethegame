var $           = $ || require('jquery');
var renderScore = renderScore || require('../js/utils/render.score');

function TryListener() {	
}

TryListener.prototype.try = function(worldNumber) {
	startAnimation();
	hideResults();
	$.get('/try?login=' + $('#login').text() + '&server=' + $('#server').val() + '&world=' + worldNumber)
		.success(this.displayResults);
};

TryListener.prototype.displayResults = function(received) {
	stopAnimation();
	showResults();
	var data = $.parseJSON(received);
	var results = data.results;
	if (results.length === 0) return;
	
	var result_n_html = $('#result_1')[0].outerHTML;
	$('.result').remove();

	var canContinue = true;
	for (var i=0; i<results.length; i++) {
		var result_i_html = result_n_html.replace('result_1', 'result_' + (i+1));
		$('#results').append(result_i_html);

		var result = results[i];
		$('#result_' + (i+1) + ' .challenge').text(result.title);
		$('#result_' + (i+1) + ' .status').text(result.code == 200 ? 'success': 'fail');
		$('#result_' + (i+1) + ' .expected').text(typeof result.expected == 'string' ? result.expected: JSON.stringify(result.expected));
		$('#result_' + (i+1) + ' .got').text(typeof result.got == 'string' ? result.got: JSON.stringify(result.got));

		if (result.code != 200) {
			canContinue = false;
			$('#result_' + (i+1)).addClass('danger').removeClass('success');
		} else {
			$('#result_' + (i+1)).addClass('success').removeClass('danger');
		}
	}

	if (canContinue) {
		$('#continue').removeClass('hidden').addClass('visible');
		$('#try').prop('disabled', true);
		$('#score').text(renderScore(data.score));
	} else {
		$('#continue').removeClass('visible').addClass('hidden');
		$('#try').prop('disabled', false);
	}
	
	if ($('#scroll-anchor')[0].scrollIntoView !== undefined) $('#scroll-anchor')[0].scrollIntoView(true);
};

var startAnimation = function() {
	$('#avatar').addClass('rotate');	
};
var stopAnimation = function() {
	$('#avatar').removeClass('rotate');	
};
var hideResults = function() {
	$('#results').removeClass('visible').addClass('hidden');	
};
var showResults = function() {
	$('#results').removeClass('hidden').addClass('visible');	
};

var module = module || {};
module.exports = TryListener;