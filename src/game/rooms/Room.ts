import ObjectTable from "./ObjectTable";
import { Point, PointString } from "../../utils/Point";
import * as _ from "lodash";
import * as constants from "../../utils/constants"
import Tile from "../tiles/Tile";
import app from "../../app";
import { RoomTemplate } from "./RoomTemplate";
import Level from "../levels/Level";
import { IterateFunction } from "../../utils/types";
import { ObjectType } from "../../utils/enums";

// This type represents a link to another room
type RoomLink = {
    name: string,
    position: Point
}

// This type represents a map from characters to room objects
type RoomCharMap = Record<PointString, Tile>;

// This object represents a room in the game
// The room handles drawing as well
type Room = {
    width: number,
    height: number,
    scale: number,
    level: Level,
    tileSize: number,
    startPos: Point,
    endPositions: Record<PointString, RoomLink>,
    objectTable: ObjectTable,
    getStartPos: () => Point,
    getWidth: () => number,
    getHeight: () => number,
    loadFromLayout: (stringArray: Array<String>, charMap: RoomCharMap) => void,
    draw: () => void,
    unload: () => void,
    // getPixelWidth: () => number,
    // getPixelHeight: () => number,
    // getCenterOffset: () => Point,
    calculatePosition: (pos: Point) => Point,
    isPositionValid: (pos: Point) => boolean,
    getObjectAt: (pos: Point) => Tile,
    removeObjectAt: (pos: Point) => void,
    isEndPosition: (pos: Point) => boolean,
    getRoomLinkAt: (pos: Point) => RoomLink,
    iterate: (fn: IterateFunction) => void
}

type RoomParams = {
    width?: number,
    height?: number,
    startPos?: Point,
    level?: Level,
    scale?: number,
    endPositions?: Record<PointString, RoomLink>
}

const Room = ({
    width = constants.numTiles, 
    height = constants.numTiles,
    
    // While there can be multiple start positions, this is where the player will start by default if they aren't sent elsewhere
    startPos = Point(0, 0), 
    level = null,
    scale = 1,

    // Track end positions, mapping position to object of form (room name, position)
    endPositions = {}
}: RoomParams = {}): Room => {
    let object: Room = {
        // Room dimensions
        width,
        height,

        // Scale of the room
        scale,

        // Reference to the level
        level,

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

        // Gets the width of the room
        getWidth(): number {
            return this.width;
        },

        // Gets the height of the room
        getHeight(): number {
            return this.height;
        },

        // Sets up a maze based on an array of strings that maps out the layout + an object that maps characters to game objects
        loadFromLayout(stringArray: Array<string>, charMap: RoomCharMap) {
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
                        let newObject = _.cloneDeep(charMap[char]);
                        newObject.setRoom(this);
                        newObject.setLevel(this.level);
                        newObject.setPosition(Point(col, row));

                        this.objectTable.setObjectWithRow(row, col, newObject);
                    }
                }
            }
        },

        // Draws the room
        draw() {
            app.stage.scale.set(this.scale, this.scale);

            this.objectTable.iterate((object: Tile, x: number, y: number) => {
                object?.draw();
            });
        },

        // Unloads the room
        unload() {
            this.objectTable.iterate((object: Tile, x: number, y: number) => {
                object?.deleteSprite();
            });

            this.level.deletePlayerSprite();
        },

        // // Calculates the number of pixels wide the room is
        // getPixelWidth(): number {
        //     return this.width * this.tileSize * this.scale;
        // },

        // // Calculates the number of pixels high the room is
        // getPixelHeight(): number {
        //     return this.height * this.tileSize * this.scale;
        // },

        // // Calculates the offset needed to center the drawn room
        // getCenterOffset(): Point {
        //     return Point(
        //         Math.round((constants.canvasSize - this.getPixelWidth()) / 2),
        //         Math.round((constants.canvasSize - this.getPixelHeight()) / 2),
        //     );
        // },

        // Calculates the position of an object adjusted to tileSize
        calculatePosition(pos: Point): Point {
            return Point(
                pos.x * this.tileSize,
                pos.y * this.tileSize
            );
        },

        // Checks if a position is valid for this room
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

        // Gets the link to the next room based on an end position
        getRoomLinkAt(pos: Point): RoomLink {
            return this.endPositions[pos.toString()];
        },

        // Iterates over the objects in the room
        iterate(fn: IterateFunction) {
            this.objectTable.iterate(fn);
        }
    };

    return object;
};

// Loads a room from a layout (supports extra parameters)
Room.loadFromLayout = (level: Level, stringArray: Array<string>, charMap: RoomCharMap, params: RoomParams): Room => {
    let room = Room({...params, level});

    room.loadFromLayout(stringArray, charMap);

    return room;
}

// Loads a room from a template
Room.loadFromTemplate = (level: Level, roomTemplate: RoomTemplate): Room => {
    return Room.loadFromLayout(level, roomTemplate.stringArray, roomTemplate.charMap, roomTemplate.params);
}

export {
    RoomLink,
    Room,
    RoomCharMap,
    RoomParams
}