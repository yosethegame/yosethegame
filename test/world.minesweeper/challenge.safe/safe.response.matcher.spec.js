var matcher = require('../../../public/world.minesweeper/challenge.safe/safe.response.matcher');

describe('Safe cells in Minesweeper game', function() {
   
   	describe("fails when playing on a empty cell does not set the class of the cell to 'safe':", function() {
   	    
   	    beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="any" onclick="play(1, 2)"></label>' +
							'<label id="cell-1x3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.useData([ [ 'bomb' , 'empty', 'bomb'] ]);		
			matcher.playOnCell(1, 2);		
		});
		
		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.expected).toContain("#cell-1x2 with class containing 'safe'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x2 class = 'any'");
				done();
			});
		});
		
    });
    
    describe("fails when playing on a empty cell does not display the number of bomb around:", function() {
   	    
   	    beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="safe" onclick="play(1, 2)">1</label>' +
							'<label id="cell-1x3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.useData([ [ 'bomb' , 'empty', 'bomb'] ]);		
			matcher.playOnCell(1, 2);
			matcher.expectBombAroundCount('2');		
		});
		
		afterEach(function() {
			remote.close();
		});

		it('sets code to 501', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.code).toEqual(501);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.expected).toContain("text containing '2'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-1x2 text = '1'");
				done();
			});
		});
		 
    });
    
    describe("passes when playing on a empty cell displays the expected number of bomb around:", function() {
   	    
   	    beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1" onclick="play(1, 1)"></label>' +
							'<label id="cell-1x2" class="safe" onclick="play(1, 2)">2</label>' +
							'<label id="cell-1x3" onclick="play(1, 3)"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.useData([ [ 'bomb' , 'empty', 'bomb'] ]);		
			matcher.playOnCell(1, 2);
			matcher.expectBombAroundCount('2');		
		});
		
		afterEach(function() {
			remote.close();
		});

		it('sets code to 200', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.code).toEqual(200);
				done();
			});
		});
		
		it('sets expected', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.expected).toEqual("#cell-1x2 with class containing 'safe' and text containing '2'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toEqual("#cell-1x2 with class containing 'safe' and text containing '2'");
				done();
			});
		});
		 
    });
    
});