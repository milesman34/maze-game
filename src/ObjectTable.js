import { gen2DArray } from "./utils";

// This object represents a table of objects, indexed with [x][y]
const ObjectTable = (width, height, defaultItem=null) => ({
    table: gen2DArray(width, height, defaultItem),

    // Gets the object at a given position
    getObject(x, y) {
        return this.table[x][y];
    },

    // Gets the object at a given position using row/column indexing
    getObjectWithRow(row, col) {
        return this.table[col][row];
    },

    // Sets the object at a given position
    setObject(x, y, object) {
        this.table[x][y] = object;
    },

    // Sets the object at a given position using a row and column (since these are y and x)
    setObjectWithRow(row, col, object) {
        this.table[col][row] = object;
    },

    // Removes an object from the object table
    removeObject(x, y) {
        this.table[x][y] = null;
    },

    // Iterates over the object table using a function (that accepts parameters object, x, y)
    iterate(fn) {
        this.table.forEach((row, x) => {
            row.forEach((col, y) => {
                fn(col, x, y);
            });
        });
    }
});

export default ObjectTable