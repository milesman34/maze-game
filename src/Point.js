// This object represents a point
const Point = (x, y) => ({
    x,
    y,

    // Adds 2 points
    add(other) {
        return Point(this.x + other.x, this.y + other.y);
    },

    // Converts it to an array for destructuring
    toArray() {
        return [this.x, this.y];
    },

    // Converts to a string for checking arrays
    toString() {
        return `(${this.x}, ${this.y})`
    }
});

export default Point;