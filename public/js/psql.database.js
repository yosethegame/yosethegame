var pg 		= require('pg');
var $ 		= require('jquery');
var array 	= require('./utils/array.utils');

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
			if (result && result.rows[0]) {
				callback($.parseJSON(result.rows[0].json));
			} else {
				callback(undefined);
			}
		});
	});
};

PostgreSql.prototype.savePlayer = function(player, callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "update players set json = '" + JSON.stringify(player) + "' where login = '" + player.login + "'";
		client.query(sql, function(err, result) {
			client.end();
			callback();
		});
	});
};

PostgreSql.prototype.allPlayers = function(callback) {
	client = new pg.Client(this.url);
	client.connect(function(err) {
		var sql = "select login, json from players";
		client.query(sql, function(err, result) {
			client.end();
			var players = [];
			array.forEach(result.rows, function(row) {
				players.push($.parseJSON(row.json))
			});
			callback(players);
		});
	});
};

module.exports = PostgreSql;