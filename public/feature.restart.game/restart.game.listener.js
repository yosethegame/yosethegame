var $ = $ || require('jquery');

function Restart() {	
}

Restart.prototype.game = function() {
	$.get('/restart-game?login=' + $('#login').text()).success(this.reload);
};

Restart.prototype.reload = function() {
	window.location.reload(true);
};

var module = module || {};
module.exports = Restart;