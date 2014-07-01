var extractMap = require('../../challenge.common/lib/extract.map');
var findCandidate = require('../../challenge.common/lib/find.candidate');

var matcher = {

    validate: function(url, remoteResponse, content, callback) {

		var sentMap = extractMap(url);
		var expectedMoveCount = findCandidate(url, this.candidates).expectedMoveCount;		
		var expectedMessage = expectedMoveCount + ' moves to minimize the flight to water and fire. map = ' + JSON.stringify(sentMap);

        callback({
            code: 200,
            expected: expectedMessage,
            got: 'You did it!'
		});
	}
};

var Requester = require('./emergency.requester');
matcher.candidates = new Requester().candidates;

module.exports = matcher;