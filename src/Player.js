import Point from "./Point";
import { Direction } from "./enums";

let template = new PIXI.Graphics();

template.beginFill(0xffffff);
template.drawRect(4, 4, 24, 24);

// Maps directions to offsets
const directionOffsets = {
    [Direction.Up]: Point(0, -1),
    [Direction.Down]: Point(0, 1),
    [Direction.Left]: Point(-1, 0),
    [Direction.Right]: Point(1, 0)
}

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

            let position = this.level.calculatePosition(this.position);

            sprite.x = position.x;
            sprite.y = position.y;

            app.stage.addChild(sprite);

            this.sprite = sprite;
        },

        // Deletes the player graphics
        deleteSprite() {
            app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        },

        // Moves the player in a direction
        move(direction) {
            const offset = directionOffsets[direction];
            const newPosition = this.position.add(offset);

            if (this.level.isPositionValid(newPosition)) {
                this.deleteSprite();
                this.position = this.position.add(offset);
                this.draw();
            }
        },

        // Handles a keypress (pass event.key)
        handleKeypress(key) {
            switch (key) {
                case "ArrowDown":
                    this.move(Direction.Down);
                    break;

                case "ArrowUp":
                    this.move(Direction.Up);
                    break;

                case "ArrowLeft":
                    this.move(Direction.Left);
                    break;

                case "ArrowRight":
                    this.move(Direction.Right);
                    break;
            }
        }
    }

    return object;
}

export default Player;