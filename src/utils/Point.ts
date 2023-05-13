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
    toString(): PointString {
        return `(${this.x}, ${this.y})`
    }
});

// Generates a Point from a PointString
Point.fromPointString = (string: PointString): Point => {
    let x = parseInt(string.split(", ")[0].split("(")[1]);
    let y = parseInt(string.split(", ")[1].split(")")[0]);

    return Point(x, y);
}

export {
    Point, PointString
};