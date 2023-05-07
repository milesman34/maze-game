import ObjectTable from "./ObjectTable";
import { Point, PointString } from "../Point";
import * as _ from "lodash";
import * as constants from "../constants"
import Game from "../Game";
import Tile from "../tiles/Tile";
import app from "../app";
import LevelTemplate from "./LevelTemplate";

// This type represents a link to another level
type LevelLink = {
    name: string,
    position: Point
}

// This type represents a map from characters to level objects
type LevelCharMap = Record<PointString, Tile>;

// This object represents a level in the game
// The level could handle drawing as well
type Level = {
    width: number,
    height: number,
    scale: number,
    game: Game,
    tileSize: number,
    startPos: Point,
    endPositions: Record<PointString, LevelLink>,
    objectTable: ObjectTable,
    getStartPos: () => Point,
    getWidth: () => number,
    getHeight: () => number,
    setGame: (game: Game) => void,
    loadFromLayout: (stringArray: Array<String>, charMap: LevelCharMap) => void,
    draw: () => void,
    destroy: () => void,
    getPixelWidth: () => number,
    getPixelHeight: () => number,
    getCenterOffset: () => Point,
    calculatePosition: (pos: Point) => Point,
    isPositionValid: (pos: Point) => boolean,
    getObjectAt: (pos: Point) => Tile,
    removeObjectAt: (pos: Point) => void,
    isEndPosition: (pos: Point) => boolean,
    getLevelLinkAt: (pos: Point) => LevelLink
}

type LevelParams = {
    width?: number,
    height?: number,
    startPos?: Point,
    game?: Game,
    scale?: number,
    endPositions?: Record<PointString, LevelLink>
}

const Level = ({
    width = constants.numTiles, 
    height = constants.numTiles,
    
    // While there can be multiple start positions, this is where the player will start by default if they aren't sent elsewhere
    startPos = Point(0, 0), 
    game = null, 
    scale = 1,

    // Track end positions, mapping position to object of form (level name, position)
    endPositions = {}
} = {}): Level => {
    let object: Level = {
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
        getStartPos(): Point {
            return this.startPos;
        },

        // Gets the width of the level
        getWidth(): number {
            return this.width;
        },

        // Gets the height of the level
        getHeight(): number {
            return this.height;
        },

        // Sets the game
        setGame(game: Game) {
            this.game = game;
        },

        // Sets up a maze based on an array of strings that maps out the layout + an object that maps characters to game objects
        loadFromLayout(stringArray: Array<string>, charMap: LevelCharMap) {
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

            this.objectTable.iterate((object: Tile, x: number, y: number) => {
                if (object !== null) {
                    object.draw();
                }
            });
        },

        // Destroys this level if needed
        destroy() {
            this.objectTable.iterate((object: Tile, x: number, y: number) => {
                if (object !== null) {
                    object.deleteSprite();
                }
            });

            this.game.getPlayer().deleteSprite();
        },

        // Calculates the number of pixels wide the level is
        getPixelWidth(): number {
            return this.width * this.tileSize;
        },

        // Calculates the number of pixels high the level is
        getPixelHeight(): number {
            return this.height * this.tileSize;
        },

        // Calculates the offset needed to center the drawn level
        getCenterOffset(): Point {
            return Point(
                Math.round((constants.canvasSize - this.getPixelWidth()) / 2),
                Math.round((constants.canvasSize - this.getPixelHeight()) / 2),
            );
        },

        // Calculates the position of an object adjusted to tileSize
        calculatePosition(pos: Point): Point {
            return Point(
                pos.x * this.tileSize,
                pos.y * this.tileSize
            );
        },

        // Checks if a position is valid for this level
        isPositionValid(pos: Point): boolean {
            // Check if position is out of bounds
            if (pos.x < 0 || pos.x >= this.width || pos.y < 0 || pos.y >= this.height)
                return false;

            // Get the object at that position
            let object = this.getObjectAt(pos);

            return object === null || !object.isSolid();
        },

        // Gets the object at a given position
        getObjectAt(pos: Point): Tile {
            return this.objectTable.getObject(pos.x, pos.y);
        },

        // Removes the object at a given position
        removeObjectAt(pos: Point) {
            this.objectTable.removeObject(pos.x, pos.y);
        },

        // Returns if a given position is an end position
        isEndPosition(pos: Point): boolean {
            return pos.toString() in this.endPositions;
        },

        // Gets the link to the next level based on an end position
        getLevelLinkAt(pos: Point): LevelLink {
            return this.endPositions[pos.toString()];
        }
    };

    return object;
};

// Loads a level from a layout (supports extra parameters)
Level.loadFromLayout = (game: Game, stringArray: Array<string>, charMap: LevelCharMap, params: LevelParams) => {
    let level = Level({...params, game});

    level.loadFromLayout(stringArray, charMap);

    return level;
}

// Loads a level from a template
Level.loadFromTemplate = (game: Game, levelTemplate: LevelTemplate) => {
    return Level.loadFromLayout(game, levelTemplate.stringArray, levelTemplate.charMap, levelTemplate.params);
}

export {
    LevelLink,
    Level,
    LevelCharMap,
    LevelParams
}