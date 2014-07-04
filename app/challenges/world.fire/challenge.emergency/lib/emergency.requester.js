var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');
var equal = require('deep-equal');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	
	this.candidates = [
        { map: ".......W..P......................FW.", width: 6, expectedMoveCount: 5 },
        { map: "................F..............W.P...W............", width: 10, expectedMoveCount: 7 },
        { map: ".............W..P...W........F...", width: 11, expectedMoveCount: 7 },
        { map: "W......P..........F.W", width: 3, expectedMoveCount: 7 },
    ];
}

Requester.prototype.url = function() {
	return this.server + '/fire/geek?' + 'width=' + this.mapWidth() + '&map=' + this.map();
};

var module = module || {};
module.exports = Requester;
