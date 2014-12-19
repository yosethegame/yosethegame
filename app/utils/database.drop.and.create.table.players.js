var pg = require('pg');

var dropAndCreateTablePlayers = function(url, done) {
	client = new pg.Client(url);
	client.connect(function(err) {
		client.query('drop table players', function(err, result) {
			client.query('create table players(login varchar(50), json varchar(5000), score integer, creation_date timestamp with time zone)', function(err, result) {
				client.end();
				expect(err).toEqual(null);
				done();
			});			
		});			
	});
};

module.exports = dropAndCreateTablePlayers;
