var removeTrailingSlashOf = require('../../levels.common/remove.trailing.slash');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
}

Requester.prototype.url = function() {
	return this.server + '/ping';
};

var module = module || {};
module.exports = Requester;