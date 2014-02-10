var Browser = require('zombie');
var array = require('../../../../utils/lib/array.utils');

module.exports = {
    
    candidates: [
        {
            grid: [
                ['bomb' , 'empty', 'empty'],
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'bomb' ]
            ],
            cellId: 'cell-3x1',
            expectedOpenCells: [ {id:'cell-2x1', text:'1'}, {id:'cell-2x2', text:'2'}, {id:'cell-3x2', text:'1'} ]
        },
        {
            grid: [
                ['empty', 'empty', 'bomb' ],
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty']
            ],
            cellId: 'cell-3x1',
            expectedOpenCells: [ {id:'cell-1x1', text:''}, {id:'cell-1x2', text:'1'},
                                 {id:'cell-2x1', text:''}, {id:'cell-2x2', text:'1'}, {id:'cell-2x3', text:'1'},
                                                           {id:'cell-3x2', text:''} , {id:'cell-3x3', text:'' }
            ]
        },
        {
            grid: [
                ['bomb' , 'bomb' , 'bomb' ],
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty']
            ],
            cellId: 'cell-3x3',
            expectedOpenCells: [ 
                                 {id:'cell-2x1', text:'2'}, {id:'cell-2x2', text:'3'}, {id:'cell-2x3', text:'2'},
                                 {id:'cell-3x1', text:'' }, {id:'cell-3x2', text:'' } 
            ]
        },
        {
            grid: [
                ['empty', 'empty', 'bomb' ],
                ['bomb' , 'empty', 'empty'],
                ['empty', 'empty', 'empty']
            ],
            cellId: 'cell-3x3',
            expectedOpenCells: [ {id:'cell-2x2', text:'2'}, {id:'cell-2x3', text:'1'},
                                 {id:'cell-3x2', text:'1' } 
            ]
        }        
    ],
    
    target: function() {
        return this.candidates[this.candidateIndex()];
    },
    
	candidateIndex: function() {
        return Math.floor(Math.random() * this.candidates.length);
	},
	
	buildExpected: function(target) {
        var expected = "Playing on " + target.cellId + " reveals the following safe cells:";
		var safeCells = '';
		array.forEach(target.expectedOpenCells, function(cell) {
            safeCells += " " + cell.id + " (text = '" + cell.text + "')";
		});
		expected += safeCells;

		return expected;
	},
	
	validate: function(url, remoteResponse, content, callback) {
		var self = this;
		var target = this.target();		
		var expected = this.buildExpected(target);
		
		var browser = new Browser();		
		browser.visit(url).
            then(function() {
                browser.document.grid = target.grid;
                var result = browser.evaluate('load()');
                browser.click('[id=' + target.cellId + ']');
            }).
            then(function() {
                array.forEach(target.expectedOpenCells, function(cell) {
                    var classes = browser.query('#' + cell.id).className;
                    if (classes.indexOf('safe') === -1) {
                        throw "Error : " + cell.id + " classes = '" + classes + "'";
                    }
                });
            }).
            then(function() {
                array.forEach(target.expectedOpenCells, function(cell) {
                    var text = browser.text('#' + cell.id);
                    if (text != cell.text) {
                        throw "Error : " + cell.id + " text = '" + text + "'";
                    }
                });
            }).
			then(function() {
				callback({
					code: 200,
					expected: expected,
					got: 'it works :)'
				});
			}).
			fail(function(error) {
				callback({
					code: 501,
					expected: expected,
					got: error.toString()
				});
			});
	}
	
};