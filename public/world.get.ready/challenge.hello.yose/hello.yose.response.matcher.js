module.exports = {

    expected: "A page containing the text 'Hello Yose'",

	computeStatus: function(remoteResponse, content) {

        if (remoteResponse === undefined) {
            return {
                code: 404,
                expected: this.expected,
                got: 'Error: 404'
            };
        }
        
        if (content.indexOf('Hello Yose') == -1) {
            return {
                code: 501,
                expected: this.expected,
                got: "Error: missing text 'Hello Yose'"
            };
        }

		return {
			code: 200,
			expected: this.expected,
			got: this.expected
		};
	},

	validate: function(url, remoteResponse, content, callback) {
		callback(this.computeStatus(remoteResponse, content));
	}
	
};