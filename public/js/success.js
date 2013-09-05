var qs 				= require('querystring');
var extract 		= require('./utils/array.utils');
var thePlayer 		= require('./utils/player.utils');
var withAttribute 	= require('./utils/array.matchers');
var error 			= require('./utils/http.errors.utils');
var theHost 		= require('./utils/host.utils');

theFormIsUnIncomplete = function(form) {
	return form.login == undefined || form.challenge == undefined || form.server == undefined;
}

logSuccess = function(form, database) {
	var player = database.find(form.login);		
	if (thePlayer.isANew(player)) {
		player.portfolio = [];
	}		
	player.portfolio.push( { 
			title: extract.firstItemIn(database.challenges, withAttribute.fileEqualsTo(form.challenge)).title,
			server: form.server 
		} 
	);
	database.savePlayer(player);
}

success = function(request, response, database) {
	var host = request.headers.host;
	if (theHost.isNotUnAuthorized(host)) return error.unauthorized(response);	
	if (request.method != 'POST') return error.methodNotAllowed(response);
	
	var body = '';
    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
		var form = qs.parse(body);			
		if (theFormIsUnIncomplete(form)) return error.badRequest(response);
		logSuccess(form, database);
		response.end();
    });
	
};

module.exports = success;