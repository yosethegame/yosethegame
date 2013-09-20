var $ = $ || require('jquery');

function Restart() {	
};

Restart.prototype.game = function() {
	$.get('/restart-game?login=' + $('#login').text());
};

var module = module || {};
module.exports = Restart;