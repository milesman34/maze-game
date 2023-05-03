import { tileSize } from "./constants";

let template = new PIXI.Graphics();

template.beginFill(0xffffff);
template.drawRect(4, 4, 24, 24);

// This object represents the player
const Player = ({game, position, level = {}}) => {
    let object = {
        // Link to game object
        game,
        
        // Link to level object
        level,

        // Current player position
        position,

        // Current sprite object
        sprite: null,

        // Draws the player
        draw() {
            if (this.sprite !== null)
                return;

            let sprite = new PIXI.Graphics(template.geometry);

            let position = this.level.calculatePosition(this.position.x, this.position.y);

            sprite.x = position.x;
            sprite.y = position.y;

            app.stage.addChild(sprite);

            this.sprite = sprite;
        }
    }

    return object;
}

export default Player;