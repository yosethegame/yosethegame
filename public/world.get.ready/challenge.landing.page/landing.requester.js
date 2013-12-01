var removeTrailingSlashOf = require('../../levels.common/remove.trailing.slash');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
}

Requester.prototype.url = function() {
	return this.server + '/';
};

var module = module || {};
module.exports = Requester;