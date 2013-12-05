var tryRequest  = require('../../public/feature.try/try.request');
var Database    = require('../support/database.with.levels');
var checker = require('../support/response.always.valid');

describe('Trying levels', function() {

    var database = new Database();
    var annessou = { login: 'asm', portfolio: [ {server: 'http://any'} ] };
    
    beforeEach(function(done) {
        var levels = [ database.worlds[0].levels[0] ];
        tryRequest.tryLevelsStartingAtIndex(0, levels, {}, annessou, database, {}, [], function(output) {
            done();
        }); 
    });
    
    it('injects the player into the checker', function() {
        expect(checker.player).toEqual(annessou);
    });
});