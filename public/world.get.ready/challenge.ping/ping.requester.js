function Requester(server) {
	this.server = server;
}

Requester.prototype.url = function() {
	return this.server + '/ping';
};

var module = module || {};
module.exports = Requester;