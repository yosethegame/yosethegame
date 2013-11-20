var matcher = require('../../../public/world.minesweeper/challenge.open/open.response.matcher');
var array = require('../../../public/js/utils/array.utils');

describe('Open challenge response matcher', function() {
   
   it('chooses a grid', function() {
       expect(matcher.target().grid).toBeDefined();
   });
   
   it ('chooses a cell', function() {
       expect(matcher.target().cellId).toBeDefined();
   });
   
   describe('chosen grid', function() {
      
      var grid;
      
      beforeEach(function() {
          grid = matcher.target().grid;
      });
      
      it('has 3 lines', function() {
          expect(grid.length).toEqual(3);
      });
      
      it('has 3 columns', function() {
          array.forEach(grid, function(line) {
              expect(line.length).toEqual(3);
          });
      });
      
      it('is chosen randomly', function() {
          var same = true;
          array.forEach([1, 2, 3, 4, 5], function(n) {
              var next = matcher.target().grid;
              if (next != grid) { same = false; }
          });
          
          expect(same).toBe(false);
      });
       
   });
   
   describe('Expectation data', function() {
      
      it('have expected css classes', function() {
          array.forEach(matcher.candidates, function(candidate) {
              expect(candidate.expectedSafeCells).toBeDefined();
          });
      });
       
      it('have expected content', function() {
          array.forEach(matcher.candidates, function(candidate) {
              expect(candidate.expectedContent).toBeDefined();
          });
      });
       
   });
   
   describe("fails when one of the expected open cells does not contain the class 'safe'", function() {
      
        beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1"></label>' +
							'<label id="cell-1x2"></label>' +
							'<label id="cell-1x3"></label>' +
							
							'<label id="cell-2x1" class="safe"></label>' +
							'<label id="cell-2x2" class="any"></label>' +
							'<label id="cell-2x3"></label>' +
							
							'<label id="cell-3x1" class="safe"></label>' +
							'<label id="cell-3x2" class="safe"></label>' +
							'<label id="cell-3x3"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.target = {
                grid: [
                    ['bomb' , 'empty', 'empty'],
                    ['empty', 'empty', 'empty'],
                    ['empty', 'empty', 'bomb' ]
                ],
                cellId: '#cell-3x1',
                expectedSafeCells: [
                    [''    , ''    , ''],
                    ['safe', 'safe', ''],
                    ['safe', 'safe', '']
                ],
                expectedContent: [
                    ['' , '', '' ],
                    ['1', '2', '' ],
                    ['' , '1', '' ]
                ]
            };
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
				expect(status.expected).toContain("#cell-2x2 classes containing 'safe'");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("#cell-2x2 classes = 'any'");
				done();
			});
		});
	   
   });
   
});