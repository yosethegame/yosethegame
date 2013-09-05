var cheerio = require('cheerio');

String.prototype.lastSegment = function() {
	var index = this.toString().lastIndexOf('/');
	return this.toString().substring(index + 1);
}

String.prototype.hide = function(selector) {
	var page = cheerio.load(this);
	var before = page(selector);
	var after = page(selector).addClass('hidden').removeClass('visible');
	return page('html').toString().replace(before, after);
}

String.prototype.show = function(selector) {
	var page = cheerio.load(this);
	var before = page(selector);
	var after = page(selector).addClass('visible').removeClass('hidden');
	return page('html').toString().replace(before, after);
}

