var removeTrailingSlashOf = require('../../../common/lib/remove.trailing.slash');
var equal = require('deep-equal');

function Requester(server) {
	this.server = removeTrailingSlashOf(server);
	
	this.candidates = [
        { map: ['......', 
				'.W..P.',
				'......',
				'......',
				'......',
				'...FW.'], expectedMoveCount: 5 },
				
        { map: ['..........', 
				'......F...',
				'..........',
				'.W.P...W..',
				'..........'], expectedMoveCount: 7 },
				
        { map: ['...........', 
				'..W..P...W.',
				'.......F...'], expectedMoveCount: 7 },
				
        { map: ['W..', 
				'...',
				'.P.',
				'...',
				'...',
				'...',
				'F.W'], width: 3, expectedMoveCount: 7 },
    ];
}

Requester.prototype.url = function() {
	var map = this.map();
	return this.server + '/fire/geek?' + 'width=' + map[0].length + '&map=' + map.join('');
};

Requester.prototype.candidateIndex = function() {
    return Math.floor(Math.random() * this.candidates.length);
};

Requester.prototype.map = function() {
	return this.candidates[this.candidateIndex()].map;
};

var module = module || {};
module.exports = Requester;
