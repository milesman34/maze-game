import Point from "../Point";

// This object represents a tile in the game
const Tile = ({path, position = Point(0, 0), level = {}, solid = false, handleCollision = function() {}}) => {
    let object = {
        // Track the current sprite
        sprite: null,

        // Current position
        position,

        // Reference to the game/level
        game: null,

        level,

        // Is the object solid?
        solid,
        
        isSolid() {
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

        // Destroys the object
        destroy() {
            if (this.sprite === null)
                return;

            app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;

            this.level.removeObjectAt(this.position);
        }
    }

    return object;
}

export default Tile;