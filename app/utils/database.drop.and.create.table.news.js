var pg = require('pg');

var dropAndCreateTablePlayers = function(url, done) {
	client = new pg.Client(url);
	client.connect(function(err) {
		client.query('drop table news', function(err, result) {
			client.query('create table news(date timestamp with time zone, json varchar(5000))', function(err, result) {
				client.end();
				expect(err).toEqual(null);
				done();
			});			
		});			
	});
};

module.exports = dropAndCreateTablePlayers;
