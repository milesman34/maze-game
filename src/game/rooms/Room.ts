import ObjectTable from "./ObjectTable";
import { Point, PointString } from "../../utils/Point";
import * as _ from "lodash";
import * as constants from "../../utils/constants"
import Tile from "../tiles/Tile";
import app from "../../app";
import { RoomTemplate } from "./RoomTemplate";
import Level from "../level/Level";
import { IterateFunction } from "../../utils/types";
import { directionOffsets } from "../../utils/enums";
import { RoomLink } from "./RoomLink";
import Player from "../Player";

// This type represents a map from characters to room objects
type RoomCharMap = Record<PointString, Tile>;

// This object represents a room in the game
// The room handles drawing as well
type Room = {
    name: string,
    width: number,
    height: number,
    scale: number,
    level: Level,
    tileSize: number,
    startPos: Point,
    roomLinks: Record<PointString, RoomLink>,
    objectTable: ObjectTable,
    getStartPos: () => Point,
    getWidth: () => number,
    getHeight: () => number,
    getPlayer: () => Player,
    makeObject: (tile: Tile) => Tile,
    loadFromLayout: (stringArray: Array<String>, charMap: RoomCharMap) => void,
    loadObjects: (objects: Record<PointString, Tile>) => void,
    draw: () => void,
    unload: () => void,
    calculatePosition: (pos: Point) => Point,
    isPositionValid: (pos: Point) => boolean,
    getObjectAt: (pos: Point) => Tile,
    removeObjectAt: (pos: Point) => void,
    setRoomLinkSource: (link: RoomLink) => void,
    isRoomLink: (pos: Point) => boolean,
    getRoomLinkAt: (pos: Point) => RoomLink,
    iterate: (fn: IterateFunction) => void
}

type RoomParams = {
    name?: string,
    width?: number,
    height?: number,
    startPos?: Point,
    level?: Level,
    scale?: number,
    roomLinks?: Array<RoomLink>
}

const Room = ({
    name = "",

    width = constants.numTiles, 
    height = constants.numTiles,
    
    // While there can be multiple start positions, this is where the player will start by default if they aren't sent elsewhere
    startPos = Point(0, 0), 
    level = null,
    scale = 1,

    // Track end positions, mapping position to object of form (room name, position)
    roomLinks = []
}: RoomParams = {}): Room => {
    let object: Room = {
        // Name of the room
        name,

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

        // List of links to other rooms (recommended to be on outside of maze) (will require special loading)
        roomLinks: {},

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

        // Returns a reference to the player
        getPlayer(): Player {
            return this.level.getPlayer();
        },

        // Creates an instance of an object
        makeObject(tile: Tile): Tile {
            let newObject = _.cloneDeep(tile);
            newObject.setRoom(this);
            newObject.setLevel(this.level);  

            return newObject;
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
                        let newObject = this.makeObject(charMap[char]);
                        newObject.setPosition(Point(col, row));

                        this.objectTable.setObjectWithRow(row, col, newObject);
                    }
                }
            }
        },

        // Loads objects from a record into the room
        loadObjects(objects: Record<PointString, Tile>) {
            Object.entries(objects).forEach(value => {
                let position = Point.fromPointString(value[0]);
                
                let newObject = this.makeObject(value[1]);

                newObject.setPosition(position);

                this.objectTable.setObject(position.x, position.y, newObject);
            });
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

        // Sets up a room link with this room being the source
        setRoomLinkSource(link: RoomLink) {
            // First we have to get the new position based on the directional offset
            let newPoint = link.source.position.add(directionOffsets[link.direction]);

            if (newPoint.toString() in this.roomLinks)
                return;

            this.roomLinks[newPoint.toString()] = RoomLink({
                source: {
                    name: this.name,
                    position: link.source.position
                },

                destination: link.destination,

                direction: link.direction
            });
        },

        // Returns if a given position is an end position
        isRoomLink(pos: Point): boolean {
            return pos.toString() in this.roomLinks;
        },

        // Gets the link to the next room based on an end position
        getRoomLinkAt(pos: Point): RoomLink {
            return this.roomLinks[pos.toString()];
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
    // let room = Room.loadFromLayout(level, roomTemplate.stringArray, roomTemplate.charMap, roomTemplate.params);
    let room = Room({level, name: roomTemplate.name, roomLinks: roomTemplate.roomLinks, ...roomTemplate.params});

    room.loadFromLayout(roomTemplate.stringArray, roomTemplate.charMap);
    room.loadObjects(roomTemplate.objects);

    return room;
}

export {
    Room,
    RoomCharMap,
    RoomParams
}