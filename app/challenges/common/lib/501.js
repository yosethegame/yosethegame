module.exports = {
    
    withValues: function(expected, got) {
        return {
            code: 501,
            expected: expected,
            got: got
        };
    }
};