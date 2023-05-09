import { Point } from "../../Point";
import * as PIXI from "pixi.js";
import { Room } from "../rooms/Room";
import app from "../../app";
import Level from "../levels/Level";

// This object represents a tile in the game
type Tile = {
    sprite: PIXI.Sprite,
    position: Point,
    level: Level,
    room: Room,
    solid: boolean,
    isSolid: () => boolean,
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
        // Track the current sprite
        sprite: null,

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

        // Applies any necessary filters to the sprite
        applyFilters() {},

        // Handles a collision
        handleCollision,

        // Draws the tile
        draw() {
            if (this.sprite !== null)
                return;

            let sprite = PIXI.Sprite.from(path);

            let position = this.room.calculatePosition(this.position);

            sprite.x = position.x;
            sprite.y = position.y;

            app.stage.addChild(sprite);

            this.sprite = sprite;

            this.applyFilters();
        },

        // Deletes the object's sprite
        deleteSprite() {
            if (this.sprite === null)
                return;

            app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
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