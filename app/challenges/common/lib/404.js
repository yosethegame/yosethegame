module.exports = {
    
    withValues: function(expected, got) {
        return {
            code: 404,
            expected: expected,
            got: got
        };
    }
};