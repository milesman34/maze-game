import ObjectTable from "../ObjectTable";
import Point from "../Point";
import _ from "lodash";
import * as constants from "../constants"

// This object represents a level in the game
// The level could handle drawing as well
const Level = ({
    width = constants.numTiles, 
    height = constants.numTiles,
    
    // While there can be multiple start positions, this is where the player will start by default if they aren't sent elsewhere
    startPos = Point(0, 0), 
    game = {}, 
    scale = 1,

    // Track end positions, mapping position to object of form (level name, position)
    endPositions = {}
} = {}) => {
    let object = {
        // Level dimensions
        width,
        height,

        // Scale of the level
        scale,

        // Reference to the game
        game,

        // Tile size
        tileSize: constants.tileSize,

        // Starting position
        startPos,

        // List of end positions
        endPositions,

        // Creates the 2D object array (for consistency, index with [x][y])
        objectTable: ObjectTable(width, height),

        // Gets the player's starting position
        getStartPos() {
            return this.startPos;
        },

        // Gets the width of the level
        getWidth() {
            return this.width;
        },

        // Gets the height of the level
        getHeight() {
            return this.height;
        },

        // Sets the game
        setGame(game) {
            this.game = game;
        },

        // Sets up a maze based on an array of strings that maps out the layout + an object that maps characters to game objects
        loadFromLayout(stringArray, charMap) {
            // Reset object table if dimensions are off
            if (stringArray[0].length != this.width || stringArray.length != this.height) {
                this.width = stringArray[0].length;
                this.height = stringArray.length;
                this.objectTable = ObjectTable(this.width, this.height);
            }

            for (let row = 0; row < this.height; row++) {
                for (let col = 0; col < this.width; col++) {
                    let char = stringArray[row][col];
                
                    // The character maps to something in the map, so we know the given object exists there
                    if (char in charMap) {
                        // We need to find a better way to handle making sure its a unique object, maybe a dedicated copy function which can handle arrays or objects
                        let newObject = {..._.cloneDeep(charMap[char]), level: this, game: this.game, position: Point(col, row)};

                        this.objectTable.setObjectWithRow(row, col, newObject);
                    }
                }
            }
        },

        // Draws the level
        draw() {
            app.stage.scale.set(this.scale, this.scale);

            this.objectTable.iterate((object, x, y) => {
                if (object !== null) {
                    object.draw();
                }
            });
        },

        // Destroys this level if needed
        destroy() {
            this.objectTable.iterate((object, x, y) => {
                if (object !== null) {
                    object.destroy();
                }
            });

            this.game.getPlayer().destroy();
        },

        // Calculates the number of pixels wide the level is
        getPixelWidth() {
            return this.width * this.tileSize;
        },

        // Calculates the number of pixels high the level is
        getPixelHeight() {
            return this.height * this.tileSize;
        },

        // Calculates the offset needed to center the drawn level
        getCenterOffset() {
            return Point(
                Math.round((constants.canvasSize - this.getPixelWidth()) / 2),
                Math.round((constants.canvasSize - this.getPixelHeight()) / 2),
            );
        },

        // Calculates the position of an object adjusted to tileSize
        calculatePosition(pos) {
            return Point(
                pos.x * this.tileSize,
                pos.y * this.tileSize
            );
        },

        // Checks if a position is valid for this level
        isPositionValid(pos) {
            // Check if position is out of bounds
            if (pos.x < 0 || pos.x >= this.width || pos.y < 0 || pos.y >= this.height)
                return false;

            // Get the object at that position
            let object = this.getObjectAt(pos);

            return object === null || !object.isSolid();
        },

        // Gets the object at a given position
        getObjectAt(pos) {
            return this.objectTable.getObject(pos.x, pos.y);
        },

        // Removes the object at a given position
        removeObjectAt(pos) {
            this.objectTable.removeObject(pos.x, pos.y);
        },

        // Returns if a given position is an end position
        isEndPosition(pos) {
            return pos.toString() in this.endPositions;
        },

        // Gets the corresponding position object that an end position leads to
        getEndPositionLocation(pos) {
            return this.endPositions[pos.toString()];
        }
    };

    return object;
};

// Loads a level from a layout (supports extra parameters)
Level.loadFromLayout = (game, stringArray, charMap, params) => {
    let level = Level({...params, game});

    level.loadFromLayout(stringArray, charMap);

    return level;
}

// Loads a level from a template
Level.loadFromTemplate = (game, levelTemplate) => {
    return Level.loadFromLayout(game, levelTemplate.stringArray, levelTemplate.charMap, levelTemplate.params);
}

export default Level