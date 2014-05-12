var error501 = require('../../../common/lib/501');
var array    = require('../../../../utils/lib/array.utils');

var answerHasMoves = function(answer, callback) {
    
    if(answer.moves === undefined) {
        callback(error501.withValues('A Json object with map and moves', 'missing field "moves"'));
        return false;
    }

    if(answer.moves.length === undefined) {
        callback(error501.withValues('moves should be in an array', 'moves = ' + answer.moves));
        return false;
    }
    
    var stop = false;
    array.forEach(answer.moves, function(move) {
        if (move.dx === undefined || move.dy === undefined) {
            callback(error501.withValues('Each move should have fields dx and dy', 'moves = ' + JSON.stringify(answer.moves)));
            stop = true;
            return;
        }
        if (move.dx*move.dx > 1 || move.dy*move.dy > 1) {
            callback(error501.withValues('Possible values for dx and dy are -1, 0 or 1', 'one move { dx:' + move.dx + ', dy:' + move.dy + ' }'));
            stop = true;
            return;
        }
    });
    if (stop) { return false; }

    return true;
};

module.exports = answerHasMoves;