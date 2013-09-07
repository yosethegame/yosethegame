function EmptyRequest(server) {
	this.server = server;
};

EmptyRequest.prototype.url = function() {
	return this.server;
};

var module = module || {};
module.exports = EmptyRequest;