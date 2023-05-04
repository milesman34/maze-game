import { MazeObjectType } from "./enums";

// This object represents a tile in the game
const Tile = ({path, level = {}, type=MazeObjectType.Wall}) => {
    let object = {
        // Track the current sprite
        sprite: null,

        // Reference to the game
        level,

        // Type of tile
        type,

        // Gets the type of object
        getType() {
            return this.type;
        },

        // Draws the tile at a given position
        drawAt(pos) {
            if (this.sprite !== null)
                return;

            let sprite = PIXI.Sprite.from(path);

            let position = this.level.calculatePosition(pos);

            sprite.x = position.x;
            sprite.y = position.y;

            app.stage.addChild(sprite);

            this.sprite = sprite;
        }
    }

    return object;
}

export default Tile;