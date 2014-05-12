whatIsBelowPlaneIn = function(map, plane) {
    
    if (plane.y < 0) { return undefined; }
    if (plane.y > (map.length-1)) { return undefined; }
    
    return map[plane.y][plane.x];
};

module.exports = whatIsBelowPlaneIn;