var qs = require('querystring');

postNewPlayer = function(request, response, database) {

	var body = '';
    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
		var form = qs.parse(body);	
		var player = { login: form.login, avatar: form.avatar };	
		database.createPlayer(player, function() {
			response.end();
		});
    });

};

module.exports = postNewPlayer;