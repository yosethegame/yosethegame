var DatabaseWithChallenges = require('../../support/database.with.levels');
var cheerio = require('cheerio');
var page = require('./lib/community.request');

describe('Community page > Hall of fame', function() {

    var database = new DatabaseWithChallenges();
    var response = { write: function(html) { this.html = html; }, end: function() {} };
    
    it('displays the hall of fame', function() {
        var mock = { insertPlayerList: function() {} };
        spyOn(mock, 'insertPlayerList').andReturn('any');
        page.hallOfFame = mock;
        page({}, response, database);
                    
        expect(mock.insertPlayerList).toHaveBeenCalled();
    });
});
