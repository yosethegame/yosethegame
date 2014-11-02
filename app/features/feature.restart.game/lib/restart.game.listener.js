function Restart($) {
    this.page = $;
}

Restart.prototype.game = function() {
	this.page.get('/restart-game?login=' + this.page('#login').text()).success(this.reload);
};

Restart.prototype.reload = function() {
	window.location.reload(true);
};

var module = module || {};
module.exports = Restart;