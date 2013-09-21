var pg = require('pg');
var $ = require('jquery');

function PostgreSql(url) {
	this.url = url;	
};

PostgreSql.prototype.createPlayer = function(player, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select count(1) from players where login = '" + player.login + "'";
		client.query(sql, function(err, result) {
			var count = result.rows[0].count;
			if (count == 0) {
				sql = "insert into players(login, json) values('" + player.login + "', '" + JSON.stringify(player) + "')";
				client.query(sql, function(err, result) {
					client.end();
					callback();
				});
			} else {
				client.end();
				callback();
			}
		});
		
	});
};

PostgreSql.prototype.find = function(login, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select json from players where login = '" + login + "'";
		client.query(sql, function(err, result) {
			client.end();
			callback($.parseJSON(result.rows[0].json));
		});
	});
};

PostgreSql.prototype.save = function(player, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "update players set json = '" + JSON.stringify(player) + "' where login = '" + player.login + "'";
		client.query(sql, function(err, result) {
			client.end();
			callback();
		});
	});
};

module.exports = PostgreSql;