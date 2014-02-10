var matcher = require('./lib/open.response.matcher');
var array = require('../../../utils/lib/array.utils');

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
      
      it('have expected open cells', function() {
          array.forEach(matcher.candidates, function(candidate) {
              expect(candidate.expectedOpenCells).toBeDefined();
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
			
			matcher.target = function() {
			    return {
                    grid: [
                        ['bomb' , 'empty', 'empty'],
                        ['empty', 'empty', 'empty'],
                        ['empty', 'empty', 'bomb' ]
                    ],
                    cellId: 'cell-3x1',
                    expectedOpenCells: [ {id:'cell-2x1'}, {id:'cell-2x2'}, {id:'cell-3x2'} ]
                };
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
				expect(status.expected).toContain("Playing on cell-3x1 reveals the following safe cells:");
				expect(status.expected).toContain("cell-2x1");
				expect(status.expected).toContain("cell-2x2");
				expect(status.expected).toContain("cell-3x2");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("cell-2x2 classes = 'any'");
				done();
			});
		});
	   
   });
   
   describe("fails when one of the expected open cells does not contain the expected bomb count", function() {
      
        beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1"></label>' +
							'<label id="cell-1x2"></label>' +
							'<label id="cell-1x3"></label>' +
							
							'<label id="cell-2x1" class="safe">1</label>' +
							'<label id="cell-2x2" class="safe">any</label>' +
							'<label id="cell-2x3"></label>' +
							
							'<label id="cell-3x1" class="safe"></label>' +
							'<label id="cell-3x2" class="safe">1</label>' +
							'<label id="cell-3x3"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.target = function() {
			    return {
                    grid: [
                        ['bomb' , 'empty', 'empty'],
                        ['empty', 'empty', 'empty'],
                        ['empty', 'empty', 'bomb' ]
                    ],
                    cellId: 'cell-3x1',
                    expectedOpenCells: [ {id:'cell-2x1', text:'1'}, {id:'cell-2x2', text:'2'}, {id:'cell-3x2', text:'1'} ]
                };
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
				expect(status.expected).toContain("Playing on cell-3x1 reveals the following safe cells:");
				expect(status.expected).toContain("cell-2x1 (text = '1')");
				expect(status.expected).toContain("cell-2x2 (text = '2')");
				expect(status.expected).toContain("cell-3x2 (text = '1')");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("cell-2x2 text = 'any'");
				done();
			});
		});
	   
   });
   
   describe("passes when the open cells contain the expected bomb count", function() {
      
        beforeEach(function() {
			content = '<html><body>' +
							'<label id="title">Minesweeper</label>' +

							'<label id="cell-1x1"></label>' +
							'<label id="cell-1x2"></label>' +
							'<label id="cell-1x3"></label>' +
							
							'<label id="cell-2x1" class="safe">1</label>' +
							'<label id="cell-2x2" class="safe">2</label>' +
							'<label id="cell-2x3"></label>' +
							
							'<label id="cell-3x1" class="safe"></label>' +
							'<label id="cell-3x2" class="safe">1</label>' +
							'<label id="cell-3x3"></label>' +
							
							'<script>function load() { }</script>' +
					  '</body></html>';			

			remote = require('http').createServer(
				function (request, response) {
					response.write(content);
					response.end();
				})
			.listen(6000);	
			
			matcher.target = function() {
			    return {
                    grid: [
                        ['bomb' , 'empty', 'empty'],
                        ['empty', 'empty', 'empty'],
                        ['empty', 'empty', 'bomb' ]
                    ],
                    cellId: 'cell-3x1',
                    expectedOpenCells: [ {id:'cell-2x1', text:'1'}, {id:'cell-2x2', text:'2'}, {id:'cell-3x2', text:'1'} ]
                };
			};
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
				expect(status.expected).toContain("Playing on cell-3x1 reveals the following safe cells:");
				expect(status.expected).toContain("cell-2x1 (text = '1')");
				expect(status.expected).toContain("cell-2x2 (text = '2')");
				expect(status.expected).toContain("cell-3x2 (text = '1')");
				done();
			});
		});
		
		it('sets actual', function(done) {
			matcher.validate('http://localhost:6000/minesweeper', {}, {}, function(status) {
				expect(status.got).toContain("it works :)");
				done();
			});
		});
	   
   });
   
});