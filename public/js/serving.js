var servecontent = require('./serve-content.js');
var pong         = require('../challenge.ping/pong.js');

String.prototype.startsWith = function (prefix) {
	return this.indexOf(prefix) == 0;
}

serving = function(folder) {
	
	return function (request, response) {
		if (request.url.startsWith('/ping?server=')) {
			pong(request, response);
		}
		else if (request.url.startsWith('/players/ericminio')) {
			var mongo = require('mongodb');
			var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/yose';
			mongo.Db.connect(mongoUri, function (err, db) {
			  db.collection('players', function(er, collection) {
			    collection.find({ login: 'ericminio'}, {safe: true}, function(er,rs) {
					response.write(rs);
					response.end();
			    });
			  });
			});
		}
		else {
			servecontent(folder, request, response);
		}
	};
};

module.exports = serving;
