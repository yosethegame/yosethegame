var failWhenTheAnswer = require('./fail.when.the.answer');
var failWhenTheHeader = require('./fail.when.the.header');
var failWhenTheRemoteResponse = require('./fail.when.the.remote.response');
var failWhenTheMoves = require('./fail.when.the.moves');

module.exports = {

	doesNotRespectTheInterfaceOfWorldFire : function(matcher) {
			
		describe('World Fire Interface', function() {
			
			it('makes format-related verifications of the answer', function() {
				failWhenTheAnswer.doesNotContainAMap(matcher);
				failWhenTheAnswer.doesNotContainTheSentMap(matcher);
				failWhenTheAnswer.isNull(matcher);
				failWhenTheAnswer.isNotAJsonObject(matcher);
			});
	
			it('makes header-related verifications', function() {
				failWhenTheHeader.isNotApplicationJson(matcher);
			});	
	
			it('makes remote-response-related verifications', function() {
				failWhenTheRemoteResponse.isUndefined(matcher);
				failWhenTheRemoteResponse.hasStatusCodeOtherThan200(matcher);
			});
	
			it('makes moves-related verifications', function() {
				failWhenTheMoves.areMissing(matcher);
				failWhenTheMoves.areActuallyAString(matcher);
				failWhenTheMoves.areActuallyANumber(matcher);
				failWhenTheMoves.areMissingOneDxOrOneDy(matcher);
				failWhenTheMoves.haveUnauthorizedOffsets(matcher);
			});
		});
	},
};