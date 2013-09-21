var array = require('../../public/js/utils/array.utils');

function InMemoryDatabase() {
	this.players = [];
};

InMemoryDatabase.prototype.withPlayers = function(players) {
	this.players = players;
	return this;
};

InMemoryDatabase.prototype.find = function(login, callback) {
	callback(array.firstItemIn(this.players, function(player) {
		return player.login == login;
	}));
};

InMemoryDatabase.prototype.savePlayer = function (player, callback) {
	callback(player);
};

module.exports = InMemoryDatabase;