// String representation of a point
type PointString = string;

// This object represents a point
type Point = {
    x: number,
    y: number,
    add: (other: Point) => Point,
    toArray: () => Array<number>,
    toString: () => string
}

const Point = (x: number, y: number): Point => ({
    x,
    y,

    // Adds 2 points
    add(other: Point): Point {
        return Point(this.x + other.x, this.y + other.y);
    },

    // Converts it to an array for destructuring
    toArray(): Array<number> {
        return [this.x, this.y];
    },

    // Converts to a string for checking arrays
    toString(): string {
        return `(${this.x}, ${this.y})`
    }
});

export {
    Point, PointString
};