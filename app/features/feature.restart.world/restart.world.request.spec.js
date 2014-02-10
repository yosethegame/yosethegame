var response	    = require('../../support/fake.response');
var Database        = require('../../support/database.with.levels');
var restartworld    = require('./lib/restart.world.request');

describe('Restart world', function() {
   
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
			restartworld({ url: '/players/bilou/restart/world/1' }, { end: function() {}, writeHead: function() {} }, database);
        });

        it('is innefective', function(done) {
            database.find('bilou', function(player) {
			    expect(player.portfolio[0].achievements.length).toEqual(1);
                done(); 
            });
        });

        it('does not change the score', function(done) {
            database.find('bilou', function(player) {
			    expect(player.score).toEqual(10);
                done(); 
            });
        });
    });
    
    describe('#2 when player has done levels 1.1 and 2.1', function() {

         beforeEach(function() {		
             database.players = [{
                login: 'bilou',
                score: 20,
                portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id,
                                                             database.worlds[1].levels[0].id] } ]
 			}];
 			restartworld({ url: '/players/bilou/restart/world/2' }, { end: function() {}, writeHead: function() {} }, database);
         });

         it('removes 2.1 from portfolio', function(done) {
             database.find('bilou', function(player) {
                 expect(player.portfolio[0].achievements[0]).toEqual(database.worlds[0].levels[0].id);
                 expect(player.portfolio[0].achievements.length).toEqual(1);
                 done(); 
             });
         });

         it('sets the score back to 10', function(done) {
             database.find('bilou', function(player) {
 			    expect(player.score).toEqual(10);
                 done(); 
             });
         });
     });

     describe('#2 when player has done levels 1.1, 2.1 and 2.2,', function() {

          beforeEach(function() {		
              database.players = [{
                 login: 'bilou',
                 score: 30,
                 portfolio: [ { server: 'any', achievements: [database.worlds[0].levels[0].id,
                                                              database.worlds[1].levels[0].id,
                                                              database.worlds[1].levels[1].id] } ]
  			}];
  			restartworld({ url: '/players/bilou/restart/world/2' }, { end: function() {}, writeHead: function() {} }, database);
          });

          it('only keeps level 1.1 in portfolio', function(done) {
              database.find('bilou', function(player) {
                  expect(player.portfolio[0].achievements[0]).toEqual(database.worlds[0].levels[0].id);
                  expect(player.portfolio[0].achievements.length).toEqual(1);
                  done(); 
              });
          });

          xit('sets the score back to 10', function(done) {
              database.find('bilou', function(player) {
  			    expect(player.score).toEqual(10);
                  done(); 
              });
          });
      });
});