// This object represents a tile in the game
const Tile = ({path, level = {}, solid = false, handleCollision = function() {}}) => {
    let object = {
        // Track the current sprite
        sprite: null,

        // Reference to the game
        level,

        // Is the object solid?
        solid,
        
        isSolid() {
            return this.solid;
        },

        // Handles a collision
        handleCollision,

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
        },

        // Destroys the object
        destroy() {
            if (this.sprite === null)
                return;

            app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }
    }

    return object;
}

export default Tile;