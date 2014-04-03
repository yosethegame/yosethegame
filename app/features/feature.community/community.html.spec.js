var cheerio = require('cheerio');

describe("community.html", function() {

	var page;

	beforeEach(function() {	
		page = cheerio.load(require('fs').readFileSync('./app/features/feature.community/lib/community.html').toString());
	});
	
	describe("page's elements:", function() {
		
		describe('player count placeholder', function() {

            it('exists', function() {
                expect(page('#player-count').length).toEqual(1);
            });

            it('has a default count to be replaced', function() {
                expect(page('#player-count').html()).toEqual('&nbsp;4');
            });
		});
		
		describe('community score placeholder', function() {

            it('exists', function() {
                expect(page('#score-community').length).toEqual(1);
            });

            it('has a default value to be replaced', function() {
                expect(page('#score-community').html()).toEqual('000040');
            });
		});
		
		describe('search player link', function() {

            it('exists', function() {
                expect(page('a#search-players-link').length).toEqual(1);
            });

            it('targets the search player page', function() {
                expect(page('a#search-players-link').attr('href')).toEqual('/players/search/criteria');
            });
		});
		
		describe('player list', function() {
			
			it('exists', function() {
				expect(page('#players').length).toEqual(1);
			});
			
			it('has a title for the players column', function() {
				expect(page('#players-title').length).toEqual(1);
			});
			
			it('has a title for the score column', function() {
				expect(page('#score-title').length).toEqual(1);
			});
			
			it('contains a template for the lines', function() {
				expect(page('#players .player').length).toEqual(1);
			});
			
			describe('line template', function() {
				
				it('contains an empty placeholder for the link to the dashboard', function() {
					expect(page('#players .player a').attr('href')).toEqual('');
				});
				
				it('contains an empty placeholder for the avatar', function() {
					expect(page('#players .player img.avatar').attr('src')).toEqual('');
				});
				
				it('contains an empty placeholder for the leading zeros before the score', function() {
					expect(page('#players .player .hall-of-fame-score-leading-zeros').text()).toEqual('0000');
				});

				it('contains an empty placeholder for the score', function() {
					expect(page('#players .player .hall-of-fame-score').text()).toEqual('1234567');
				});
			});
			
		});
		
		describe('News section', function() {

            it('has a placeholder for the list', function() {
                expect(page('#news-list').length).toEqual(1);
            });

            it('has a template for each news', function() {
                expect(page('#news-list .news').length).toEqual(1);
            });

            describe('line template', function() {

                it('has an image', function() {
                    expect(page('#news-list .news img').length).toEqual(1);
                });

                it('uses an image to link somewhere else', function() {
                    expect(page('#news-list .news a>img').length).toEqual(1);
                });
                
                it('has a placeholder for the news-date', function() {
                    expect(page('#news-list .news .news-date').length).toEqual(1);
                });

                it('has a placeholder for the news-content', function() {
                    expect(page('#news-list .news .news-content').length).toEqual(1);
                });
            });
		});
	});
		
});