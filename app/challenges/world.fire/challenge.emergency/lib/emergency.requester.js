var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');
var equal = require('deep-equal');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	
	this.candidates = [
        { map: "....PFWW", width: 4, expectedMoveCount: 5 },
        { map: "PFWW....", width: 4, expectedMoveCount: 5 },
        { map: "....WWFP", width: 4, expectedMoveCount: 5 },
        { map: "WWFP....", width: 4, expectedMoveCount: 5 },
    ];
}

Requester.prototype.url = function() {
	return this.server + '/fire/geek?' + 'width=' + this.mapWidth() + '&map=' + this.map();
};

var module = module || {};
module.exports = Requester;
