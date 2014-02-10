module.exports = {
	validate: function(requestSent, remoteResponse, content, callback) {
		callback({
			code: 501,
			expected: 'a correct expected value',
			got: 'an incorrect value'
		});
	}
};