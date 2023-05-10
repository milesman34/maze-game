import { Point } from "../../utils/Point";
import * as PIXI from "pixi.js";
import { Room } from "../rooms/Room";
import Level from "../levels/Level";
import CanvasDrawer from "../../utils/CanvasDrawer";

// This object represents a tile in the game
type Tile = {
    drawer: CanvasDrawer,
    position: Point,
    level: Level,
    room: Room,
    solid: boolean,
    isSolid: () => boolean,
    setRoom: (room: Room) => void,
    setLevel: (level: Level) => void,
    setPosition: (position: Point) => void,
    applyFilters: () => void,
    handleCollision: () => void,
    draw: () => void,
    deleteSprite: () => void,
    destroy: () => void
}

type TileParams = {
    path: string,
    position?: Point,
    room?: Room,
    solid?: boolean,
    handleCollision?: () => void
}

const Tile = ({
    path, position = Point(0, 0), room = null, solid = false, handleCollision = function() {}
}: TileParams): Tile => {
    let object: Tile = {
        // Draws objects on the canvas
        drawer: CanvasDrawer({ room }),

        // Current position
        position,

        // Reference to the level/room
        level: null,

        room,

        // Is the object solid?
        solid,
        
        isSolid(): boolean {
            return this.solid;
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
        }
    }

    return object;
}

export default Tile;