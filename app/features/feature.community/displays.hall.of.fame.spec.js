var DatabaseWithChallenges = require('../../support/database.with.levels');
var cheerio = require('cheerio');
var page = require('./lib/community.request');

describe('Community page > Hall of fame', function() {

    var database = new DatabaseWithChallenges();
    var response = { write: function(html) { this.html = html; }, end: function() {} };
    var mock = { insertPlayerList: function() {} };
    
    beforeEach(function() {
        spyOn(mock, 'insertPlayerList').andReturn('any');
        page.hallOfFame = mock;
    });
    
    afterEach(function() {
        page.hallOfFame = require('./lib/hall.of.fame');
    });
    
    it('displays the hall of fame', function() {        
        page({}, response, database);
                    
        expect(mock.insertPlayerList).toHaveBeenCalled();
    });
});
