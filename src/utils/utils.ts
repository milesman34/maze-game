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

// Is an object empty?
const isObjectEmpty = (obj: Object) => Object.keys(obj).length === 0;

// Attempts to load an integer value from localstorage
const localStorageLoadInt = (name: string, defaultValue: number = 0) => {
    let local = localStorage.getItem(name);

    if (local === null) {
        return defaultValue;
    } else {
        return parseInt(local);
    }
}

export {
    gen2DArray,
    isObjectEmpty,
    localStorageLoadInt
}