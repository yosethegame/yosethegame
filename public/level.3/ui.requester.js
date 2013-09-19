function Requester(server) {
	this.server = server;
};

Requester.prototype.url = function() {
	return this.server + '/ui';
};

var module = module || {};
module.exports = Requester;