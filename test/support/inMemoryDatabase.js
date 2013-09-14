function InMemoryDatabase() {
	this.players = [];
};

InMemoryDatabase.prototype.withPlayers = function(players) {
	this.players = players;
	return this;
};

InMemoryDatabase.prototype.find = function(login, callback) {
	var player;
	for(i=0; i<this.players.length; i++) {
		if (this.players[i].login == login) {
			player = this.players[i];
		}
	}
	callback(player);
};

InMemoryDatabase.prototype.savePlayer = function (player) {
};

module.exports = InMemoryDatabase;