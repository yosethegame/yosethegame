var checkThatStatusIs = require('../../levels.common/status.checker');
var matcher 		  = require('../../../public/world.minesweeper/challenge.board/board.response.matcher');

describe('Minesweeper response matcher', function() {

	var status;
	
	describe('Fails when the page is missing #title:', function() {
		content = '<html><body>' +
						'<label id="not-title">anything</label>' +
				  '</body></html>';			
		status = matcher.computeStatus({ headers: {'content-type': 'text/html' } }, content);
		
		checkThatStatusIs(status, {
			code: 501,
			expected: 'A page with an element #title',
			got: 'A page missing element #title'
		});
	});
	
	describe('Fails when #title does not contain Minesweeper:', function() {
		content = '<html><body>' +
						'<label id="title">anything</label>' +
				  '</body></html>';			
		status = matcher.computeStatus({ headers: {'content-type': 'text/html' } }, content);
		
		checkThatStatusIs(status, {
			code: 501,
			expected: "A page with an element #title containing 'Minesweeper'",
			got: "#title text = 'anything'"
		});
	});
	
	describe('Fails when the page is missing cell-1x3:', function() {
		content = '<html><body>' +
						'<label id="title">Minesweeper</label>' +

						'<label id="cell-1x1"></label>' +
						'<label id="cell-1x2"></label>' +
				  '</body></html>';
		status = matcher.computeStatus({ headers: {'content-type': 'text/html' } }, content);

		checkThatStatusIs(status, {
			code: 501,
			expected: 'a 8x8 cells grid',
			got: 'missing element #cell-1x3'
		});
	});
	
	describe('Fails when the page is missing cell-2x1:', function() {
		content = '<html><body>' +
						'<label id="title">Minesweeper</label>' +

						'<label id="cell-1x1"></label>' +
						'<label id="cell-1x2"></label>' +
						'<label id="cell-1x3"></label>' +
						'<label id="cell-1x4"></label>' +
						'<label id="cell-1x5"></label>' +
						'<label id="cell-1x6"></label>' +
						'<label id="cell-1x7"></label>' +
						'<label id="cell-1x8"></label>' +
				  '</body></html>';
		status = matcher.computeStatus({ headers: {'content-type': 'text/html' } }, content);

		checkThatStatusIs(status, {
			code: 501,
			expected: 'a 8x8 cells grid',
			got: 'missing element #cell-2x1'
		});
	});
});