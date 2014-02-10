module.exports = {
	validate: function(requestSent, remoteResponse, content, callback) {
		callback({
			code: 200,
			expected: 'a correct expected value',
			got: 'a correct actual value'
		});
	}
};