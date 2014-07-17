var failsAnswering = require('./fails.answering.request');

module.exports = {
	
	isEmpty: function(matcher) {
        failsAnswering({}).whenTheHeaderIsEmpty(matcher);
	},
	
	isNotApplicationJson: function(matcher) {
        failsAnswering({}).whenTheHeaderIsNotApplicationJson(matcher);
	},
};