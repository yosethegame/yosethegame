var array = require('../utils/lib/array.utils');

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

InMemoryDatabase.prototype.allPlayers = function(callback) {
	callback(this.players);
};

InMemoryDatabase.prototype.savePlayer = function (player, callback) {
	callback(player);
};

InMemoryDatabase.prototype.createPlayer = function (player, callback) {
	this.players.push(player);
	callback();
};

InMemoryDatabase.prototype.playerCount = function (callback) {
	callback(this.players.length);
};

InMemoryDatabase.prototype.getScoreCommunity = function (callback) {
    var total = 0;
    array.forEach(this.players, function(player) {
        total += player.score;
    });
	callback(total);
};

InMemoryDatabase.prototype.findPlayersMatching = function(criteria, callback) {
    var found = [];
    array.forEach(this.players, function(player) {
        var asString = JSON.stringify(player);
        if (asString.indexOf(criteria) !== -1) {
            found.push(player);
        }
    });
    callback(found);
};

module.exports = InMemoryDatabase;