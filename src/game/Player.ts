import { Point } from "../utils/Point";
import { Direction } from "../utils/enums";
import { Room } from "./rooms/Room";
import * as PIXI from "pixi.js";
import Level from "./levels/Level";
import CanvasDrawer from "../utils/CanvasDrawer";

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
    level: Level,
    room: Room,
    position: Point,
    drawer: CanvasDrawer
    draw: () => void,
    deleteSprite: () => void,
    destroy: () => void,
    move: (direction: Direction) => void,
    handleKeypress: (key: string) => void
}

type PlayerParams = {
    level?: Level,
    room?: Room,
    position: Point
}

const Player = ({position, level = null, room = null}: PlayerParams) => {
    let object: Player = {
        // Link to level object
        level,
        
        // Link to room object
        room,

        // Current player position
        position,

        // Draws objects on the screen
        drawer: CanvasDrawer({ room }),

        // Draws the player
        draw() {
            this.drawer.draw("sprite", this.position, new PIXI.Graphics(template.geometry));
        },

        // Deletes the player graphics
        deleteSprite() {
            this.drawer.delete("sprite");
        },

        // Destroys the player
        destroy() {
            this.deleteSprite();
        },

        // Moves the player in a direction
        move(direction: Direction) {
            if (this.room === null)
                return;

            const offset = directionOffsets[direction];
            const newPosition = this.position.add(offset);

            // Check if current position is an end position
            if (this.room.isRoomLink(newPosition)) {
                // Now we need to switch to the next room
                const nextPos = this.room.getRoomLinkAt(newPosition);

                this.level.loadRoomFromLink(nextPos);

                return;
            }

            if (this.room.isPositionValid(newPosition)) {
                this.deleteSprite();
                this.position = this.position.add(offset);
                this.draw();

                // Gets the object at that position and handles collision aspects
                let object = this.room.getObjectAt(this.position);

                if (object !== null)
                    object.handleCollision();
            }
        },

        // Handles a keypress (pass event.key)
        handleKeypress(key: string) {
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