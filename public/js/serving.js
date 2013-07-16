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
			var mongodb = require('mongodb');
			var MONGOHQ_URL="mongodb://yose:yose@dharma.mongohq.com:10038/yose";
			mongodb.Db.connect(MONGOHQ_URL, function(error, client) {
				var collection = new mongodb.Collection(client, 'players');
				var documents = collection.find({ login: 'ericminio' });
				documents.toArray(function(error, docs) {
					me = docs[0];
			        client.close();
			
					response.write('<img src="' + me.avatar + '" >');
					response.end();
		      	});
			});
		}
		else {
			servecontent(folder, request, response);
		}
	};
};

module.exports = serving;
