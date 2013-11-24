var qs = require('querystring');

post = function(request, response, database) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
		var form = qs.parse(body);	
		database.find(form.login, function(player) {
            player.avatar = form.avatar;
            database.savePlayer(player, function() {
                response.writeHead(204);
                response.end();
            });
		});
    });
	
};

module.exports = post;