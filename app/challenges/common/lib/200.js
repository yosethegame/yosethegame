module.exports = {
    
    withValues: function(expected, got) {
        return {
            code: 200,
            expected: expected,
            got: got
        };
    }
};