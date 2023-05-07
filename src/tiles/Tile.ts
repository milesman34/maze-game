import Game from "../Game";
import { Point } from "../Point";
import * as PIXI from "pixi.js";
import { Level } from "../levels/Level";
import app from "../app";

// This object represents a tile in the game
type Tile = {
    sprite: PIXI.Sprite,
    position: Point,
    game: Game,
    level: Level,
    solid: boolean,
    isSolid: () => boolean,
    handleCollision: () => void,
    draw: () => void,
    deleteSprite: () => void,
    destroy: () => void
}

type TileParams = {
    path: string,
    position?: Point,
    level?: Level,
    solid?: boolean,
    handleCollision?: () => void
}

const Tile = ({
    path, position = Point(0, 0), level = null, solid = false, handleCollision = function() {}
}: TileParams): Tile => {
    let object: Tile = {
        // Track the current sprite
        sprite: null,

        // Current position
        position,

        // Reference to the game/level
        game: null,

        level,

        // Is the object solid?
        solid,
        
        isSolid(): boolean {
            return this.solid;
        },

        // Handles a collision
        handleCollision,

        // Draws the tile
        draw() {
            if (this.sprite !== null)
                return;

            let sprite = PIXI.Sprite.from(path);

            let position = this.level.calculatePosition(this.position);

            sprite.x = position.x;
            sprite.y = position.y;

            app.stage.addChild(sprite);

            this.sprite = sprite;
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

            this.level.removeObjectAt(this.position);
        }
    }

    return object;
}

export default Tile;