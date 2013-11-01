module.exports = {
	equalsTo: function(challenge) {
		return function(item) {
			return item.checker.indexOf(challenge) != -1;
		};
	}
};