var $ = $ || require('jquery');

function Start() {	
};

Start.prototype.over = function() {
	$.get('/start-over?login=' + $('#login').text());
};

var module = module || {};
module.exports = Start;