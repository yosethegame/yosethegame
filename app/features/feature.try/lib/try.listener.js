var renderScore = renderScore || require('../../common/lib/render.score');

function TryListener($) {
    this.page = $;
    thisListener = this;
}

TryListener.prototype.try = function(worldNumber, levelNumber) {
	startAnimation();
	hideResults();
	thisListener.page.get('/try?login=' + thisListener.page('#login').text() + '&server=' + thisListener.page('#server').val() + '&world=' + worldNumber + '&level=' + levelNumber)
		.success(this.displayResults);
};

TryListener.prototype.displayResults = function(data) {
	stopAnimation();
	showResults();
	var results = data.results;
	if (results.length === 0) return;
	
	var result_n_html = thisListener.page('#result_1')[0].outerHTML;
	thisListener.page('.result').remove();

	var canContinue = true;
	for (var i=0; i<results.length; i++) {
		var result_i_html = result_n_html.replace('result_1', 'result_' + (i+1));
		thisListener.page('#results').append(result_i_html);

		var result = results[i];
		thisListener.page('#result_' + (i+1) + ' .challenge').text(result.title);
		thisListener.page('#result_' + (i+1) + ' .status').text(result.code == 200 ? 'success': 'fail');
		thisListener.page('#result_' + (i+1) + ' .expected').text(typeof result.expected == 'string' ? result.expected: JSON.stringify(result.expected));
		thisListener.page('#result_' + (i+1) + ' .got').text(typeof result.got == 'string' ? result.got: JSON.stringify(result.got));

		if (result.code != 200) {
			canContinue = false;
			thisListener.page('#result_' + (i+1)).addClass('danger').removeClass('success');
		} else {
			thisListener.page('#result_' + (i+1)).addClass('success').removeClass('danger');
		}
	}

	if (canContinue) {
		thisListener.page('#continue').removeClass('hidden').addClass('visible');
		thisListener.page('#try').prop('disabled', true);
		thisListener.page('#score').text(renderScore(data.score));
	} else {
		thisListener.page('#continue').removeClass('visible').addClass('hidden');
		thisListener.page('#try').prop('disabled', false);
	}
	
	if (thisListener.page('#scroll-anchor')[0].scrollIntoView !== undefined) thisListener.page('#scroll-anchor')[0].scrollIntoView(true);
};

var startAnimation = function() {
	thisListener.page('#avatar').addClass('rotate');	
};
var stopAnimation = function() {
	thisListener.page('#avatar').removeClass('rotate');	
};
var hideResults = function() {
	thisListener.page('#results').removeClass('visible').addClass('hidden');	
};
var showResults = function() {
	thisListener.page('#results').removeClass('hidden').addClass('visible');	
};

var module = module || {};
module.exports = TryListener;