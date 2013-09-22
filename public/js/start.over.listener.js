var $ = $ || require('jquery');

function Start() {	
};

Start.prototype.over = function() {
	$.get('/start-over?login=' + $('#login').text()).success(this.reload);
};

Start.prototype.reload = function() {
	window.location.reload();
};

var module = module || {};
module.exports = Start;