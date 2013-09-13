module.exports = {
	validate: function(requestSent, remoteResponse, content, callback) {
		callback( {
			code: 404,
			expected: 'a correct expected value'
		});
	}
};