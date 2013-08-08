function InMemoryDatabase() {
	this.players = [];
};

InMemoryDatabase.prototype.withPlayers = function(players) {
	this.players = players;
	return this;
};

InMemoryDatabase.prototype.find = function(login) {
	for(i=0; i<this.players.length; i++) {
		if (this.players[i].login == login) {
			return this.players[i];
		}
	}
};

module.exports = InMemoryDatabase;