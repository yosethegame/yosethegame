var response        = require('../../support/fake.response');
var Database        = require('../../support/database.with.levels');
var restartworld    = require('./lib/restart.world.request');

describe('When restarting world', function() {
   
	beforeEach(function() {		
		database = new Database();
	});
	
   describe('#1', function() {
       
        beforeEach(function() {		
            database.players = [{
               login: 'bilou',
               score: 10,
               portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id] } ]
			}];
			database.news = [];
			restartworld({ url: '/players/bilou/restart/world/1' }, { end: function() {}, writeHead: function() {} }, database);
        });

        it('does not log any news', function(done) {
            database.getNews(function(news) {
                expect(news.length).toEqual(0);
                done(); 
            });
        });

    });
    
    describe('#2', function() {

         beforeEach(function() {		
             database.players = [{
                login: 'bilou',
                score: 20,
                portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id,
                                                             database.worlds[1].levels[0].id] } ]
                }];
                database.news = [];
                restartworld({ url: '/players/bilou/restart/world/2' }, { end: function() {}, writeHead: function() {} }, database);
         });

         it('does log one news', function(done) {
             database.getNews(function(news) {
                 expect(news.length).toEqual(1);
                 done(); 
             });
         });

     });
});