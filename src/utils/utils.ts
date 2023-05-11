import * as _ from "lodash";

// Generates a 2D array filled with an item
const gen2DArray = <T>(rows: number, cols: number, item: T): Array<Array<T>> => {
    let result = [];

    for (let i = 0; i < rows; i++) {
        let row = [];

        for (let j = 0; j < cols; j++) {
            row.push(item);
        }

        result.push(row);
    }

    return result;
}

export {
    gen2DArray
}