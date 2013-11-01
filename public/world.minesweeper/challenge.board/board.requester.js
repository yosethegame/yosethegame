function Requester(server) {
	this.server = server;
}

Requester.prototype.url = function() {
	return this.server + '/minesweeper';
};

var module = module || {};
module.exports = Requester;