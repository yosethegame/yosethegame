function Plane(x, y) {
    this.x = x;
    this.y = y;
}

Plane.prototype.move = function(offset) {
    this.x += offset.dx;
    this.y += offset.dy;
};

module.exports = Plane;