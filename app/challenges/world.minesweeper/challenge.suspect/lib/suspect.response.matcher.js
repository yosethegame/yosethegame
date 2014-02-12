module.exports = {

	data: [
		['empty', 'empty', 'bomb',  'empty', 'bomb',  'empty', 'empty', 'empty'],
		['bomb',  'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['bomb',  'empty', 'empty', 'bomb',  'empty', 'bomb', 'empty', 'bomb' ],
		['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		['empty', 'empty', 'empty', 'empty', 'bomb',  'empty', 'empty', 'empty'],
		['empty', 'empty', 'bomb',  'empty', 'bomb',  'bomb',  'empty', 'empty'],
		['bomb' , 'empty', 'empty', 'empty', 'empty', 'empty', 'bomb',  'empty'],
	],
	
	candidates: [
        { row: 2, column: 1 }, 
        { row: 1, column: 5 }, 
        { row: 7, column: 3 }, 
        { row: 4, column: 8 }, 
        { row: 8, column: 1 }, 
        { row: 4, column: 6 }, 
        { row: 1, column: 3 }, 
	],

	cellIndex: function() {
        return Math.floor(Math.random()*7);
	},
	
	cellId: function(index) {
        var position = this.candidates[index];
        return 'cell-' + position.row + 'x' + position.column;
	},
	
    validate: function(url, remoteResponse, content, callback) {
		callback({
			code: 501,
			expected: 'To be defined',
			got: 'To be defined'
		});
	}
	
};