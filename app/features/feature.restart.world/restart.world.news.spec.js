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
               login: 'zoupo',
               score: 10,
               portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id] } ]
			}];
			database.news = [];
			restartworld({ url: '/players/zoupo/restart/world/1' }, { end: function() {}, writeHead: function() {} }, database);
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
                login: 'zoupo',
                avatar: 'avatar-of-zoupo',
                score: 20,
                portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id,
                                                             database.worlds[1].levels[0].id] } ]
                }];
                database.news = [];
                restartworld({ url: '/players/zoupo/restart/world/2' }, { end: function() {}, writeHead: function() {} }, database);
         });

         it('does log one news', function(done) {
             database.getNews(function(news) {
                 expect(news.length).toEqual(1);
                 done(); 
             });
         });

         it('does log one news with restarted world info', function(done) {
             database.getNews(function(news) {
                 expect(news[0].text).toContain(database.worlds[1].name);
                 done(); 
             });
         });

         it('does log one news linking to the server of the player', function(done) {
             database.getNews(function(news) {
                 expect(news[0].url).toEqual('any');
                 done(); 
             });
         });

         it('does log one news displaying the avatar of the player', function(done) {
             database.getNews(function(news) {
                 expect(news[0].image).toEqual('avatar-of-zoupo');
                 done(); 
             });
         });
     });
});