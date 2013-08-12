var fs = require('fs');
var $ = $ || require('jquery');

function FileDatabase(folder) {
	this.folder = folder;
};

FileDatabase.prototype.find = function(login) {
	var file = this.folder + '/player.' + login;
	if (!fs.existsSync(file)) return undefined;
	
	var content = fs.readFileSync(file);
	var player = $.parseJSON(content.toString());
	return player;
};

FileDatabase.prototype.createPlayer = function(player) {
	var file = this.folder + '/player.' + player.login;
	if (!fs.existsSync(file)) {
		fs.writeFileSync(file, JSON.stringify(player));		
	}
};

module.exports = FileDatabase;