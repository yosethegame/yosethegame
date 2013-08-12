var fs = require('fs');
var $  = $ || require('jquery');

function FileDatabase(folder) {
	this.folder = folder;
};

FileDatabase.prototype.find = function(login) {
	return this.playerFileExists(login) ?  this.buildPlayerFromFile(login) : undefined;
};

FileDatabase.prototype.playerFile = function(login) {
	return this.folder + '/player.' + login;
};

FileDatabase.prototype.playerFileExists = function(login) {
	return fs.existsSync(this.playerFile(login));
}

FileDatabase.prototype.buildPlayerFromFile = function(login) {
	return $.parseJSON(this.readPlayerFile(login));
}

FileDatabase.prototype.readPlayerFile = function(login) {
	return fs.readFileSync(this.playerFile(login)).toString();
};

FileDatabase.prototype.createPlayer = function(player) {
	if (!this.playerFileExists(player.login)) {
		this.savePlayer(player);
	}
};

FileDatabase.prototype.savePlayer = function(player) {
	fs.writeFileSync(this.playerFile(player.login), JSON.stringify(player));
};

module.exports = FileDatabase;