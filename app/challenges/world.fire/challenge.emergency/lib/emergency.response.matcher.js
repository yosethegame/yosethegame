module.exports = {

    validate: function(url, remoteResponse, content, callback) {

        callback({
            code: 200,
            expected: '',
            got: 'You did it!'
		});
	}
};