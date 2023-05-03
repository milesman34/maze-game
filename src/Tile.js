import { tileSize } from "./constants";

// This object represents a tile in the game
const Tile = ({path, level = {}}) => {
    let object = {
        // Track the current sprite
        sprite: null,

        // Reference to the game
        level,

        // Draws the tile at a given position
        drawAt(x, y) {
            if (this.sprite !== null)
                return;

            let sprite = PIXI.Sprite.from(path);

            let position = this.level.calculatePosition(x, y);

            sprite.x = position.x;
            sprite.y = position.y;

            app.stage.addChild(sprite);

            this.sprite = sprite;
        }
    }

    return object;
}

export default Tile;