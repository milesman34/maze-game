// Generates a 2D array filled with an item
const gen2DArray = (rows, cols, item) => {
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