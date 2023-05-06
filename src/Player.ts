import Game from "./Game";
import { Point } from "./Point";
import app from "./app";
import { Direction } from "./enums";
import { Level } from "./levels/Level";
import levels from "./levels/levels";
import * as PIXI from "pixi.js";

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
type Player = {
    game: Game,
    level: Level,
    position: Point,
    sprite: PIXI.Sprite,
    draw: () => void,
    deleteSprite: () => void,
    destroy: () => void,
    move: (direction: Direction) => void,
    handleKeypress: (key: string) => void
}

type PlayerParams = {
    game: Game,
    level?: Level,
    position: Point
}

const Player = ({game, position, level = null}: PlayerParams) => {
    let object: Player = {
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
            if (this.sprite === null)
                return;

            app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        },

        // Destroys the player
        destroy() {
            this.deleteSprite();
        },

        // Moves the player in a direction
        move(direction) {
            if (this.level === null)
                return;

            const offset = directionOffsets[direction];
            const newPosition = this.position.add(offset);

            // Check if current position is an end position
            if (this.level.isEndPosition(newPosition)) {
                // Now we need to switch to the next level
                const nextPos = this.level.getLevelLinkAt(newPosition);

                this.game.loadLevel(levels[nextPos.name], nextPos.position);

                return;
            }

            if (this.level.isPositionValid(newPosition)) {
                this.deleteSprite();
                this.position = this.position.add(offset);
                this.draw();

                // Gets the object at that position and handles collision aspects
                let object = this.level.getObjectAt(this.position);

                if (object !== null)
                    object.handleCollision();
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