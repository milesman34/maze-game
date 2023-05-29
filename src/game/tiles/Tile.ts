import { Point } from "../../utils/Point";
import * as PIXI from "pixi.js";
import { Room } from "../rooms/Room";
import Level from "../level/Level";
import CanvasDrawer from "../../utils/CanvasDrawer";
import { ObjectType } from "../../utils/enums";
import { Color } from "../../utils/types";

// This object represents a tile in the game
type Tile = {
    drawer: CanvasDrawer,
    position: Point,
    level: Level,
    room: Room,
    type: ObjectType,
    solid: boolean,
    path: string,
    isSolid: () => boolean,
    getType: () => ObjectType,
    setRoom: (room: Room) => void,
    setLevel: (level: Level) => void,
    setPosition: (position: Point) => void,
    applyFilters: () => void,
    handleCollision: () => void,
    draw: () => void,
    deleteSprite: () => void,
    destroy: () => void,
    useKey: (color: Color, amount?: number) => void,
    update: () => void
}

type TileParams = {
    path: string,
    position?: Point,
    room?: Room,
    solid?: boolean,
    type?: ObjectType,
    handleCollision?: () => void
}

const Tile = ({
    path, position = Point(0, 0), room = null, solid = false, type = ObjectType.Default, handleCollision = function() {}
}: TileParams): Tile => {
    let object: Tile = {
        // Draws objects on the canvas
        drawer: CanvasDrawer({ room }),

        // Current position
        position,

        // Reference to the level/room
        level: null,

        room,

        // Type of the object
        type,

        // Is the object solid?
        solid,

        // Path to the image file for the tile
        path,
        
        isSolid(): boolean {
            return this.solid;
        },

        // Gets the object's type
        getType(): ObjectType {
            return this.type;
        },

        // Sets the current room
        setRoom(room: Room) {
            this.room = room;
            this.drawer.setRoom(room);
        },

        // Sets the current level
        setLevel(level: Level) {
            this.level = level;
        },

        // Sets the current position
        setPosition(position: Point) {
            this.position = position;
        },

        // Applies any necessary filters to the sprite
        applyFilters() {},

        // Handles a collision
        handleCollision,

        // Uses a key on the object (needs to be overriden to function)
        useKey(color: Color, amount: number = 0) {},

        // Draws the tile
        draw() {
            this.drawer.draw("sprite", this.position, PIXI.Sprite.from(path));

            this.applyFilters();
        },

        // Deletes the object's sprite
        deleteSprite() {
            this.drawer.delete("sprite");
        },

        // Destroys the object
        destroy() {
            this.deleteSprite();

            this.room.removeObjectAt(this.position);
        },

        // Force-updates a tile
        update() {}
    }

    return object;
}

export default Tile;