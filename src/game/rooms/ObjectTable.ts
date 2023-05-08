import Tile from "../tiles/Tile";
import { gen2DArray } from "../../utils";

type IterateFunction = (object: Tile, x: number, y: number) => void;

type ObjectTable = {
    table: Array<Array<Tile>>,
    getObject: (x: number, y: number) => Tile,
    getObjectWithRow: (row: number, col: number) => Tile,
    setObject: (x: number, y: number, object: Tile) => void,
    setObjectWithRow: (row: number, col: number, object: Tile) => void,
    removeObject: (x: number, y: number) => void,
    iterate: (fn: IterateFunction) => void
}

// This object represents a table of objects, indexed with [x][y]
const ObjectTable = (width: number, height: number, defaultItem: Tile=null): ObjectTable => ({
    table: gen2DArray(width, height, defaultItem),

    // Gets the object at a given position
    getObject(x: number, y: number): Tile {
        return this.table[x][y];
    },

    // Gets the object at a given position using row/column indexing
    getObjectWithRow(row: number, col: number): Tile {
        return this.table[col][row];
    },

    // Sets the object at a given position
    setObject(x: number, y: number, object: Tile) {
        this.table[x][y] = object;
    },

    // Sets the object at a given position using a row and column (since these are y and x)
    setObjectWithRow(row: number, col: number, object: Tile) {
        this.table[col][row] = object;
    },

    // Removes an object from the object table
    removeObject(x: number, y: number) {
        this.table[x][y] = null;
    },

    // Iterates over the object table using a function (that accepts parameters object, x, y)
    iterate(fn: IterateFunction) {
        this.table.forEach((row: Array<Tile>, x: number) => {
            row.forEach((col: Tile, y: number) => {
                fn(col, x, y);
            });
        });
    }
});

export default ObjectTable