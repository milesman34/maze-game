import { ObjectType } from "../../utils/enums";
import { Color } from "../../utils/types";
import { Room } from "../rooms/Room";
import { RoomPosition } from "../rooms/RoomLink";
import * as PIXI from "pixi.js";
import Tile from "./Tile";

// This represents a portal to another location in the maze
type Portal = Tile & {
    color: Color,
    destination: RoomPosition
}

type PortalParams = {
    room?: Room,
    color: Color,
    destination: RoomPosition
}

const Portal = ({room = null, color, destination}: PortalParams): Portal => {
    let tile = Tile({ path: "", room, solid: false, type: ObjectType.Portal});

    return {
        ...tile,

        color,
        destination,

        // Draws the tile
        draw() {
            this.drawer.draw("sprite", this.position, PIXI.Sprite.from("./assets/portal.png"));

            this.applyFilters();
        },

        handleCollision() {
            let player = this.room.getPlayer();
            let level = player.level;

            // This type of teleportation is easier, since the rooms match
            if (this.destination.name === this.room.name) {
                player.setPosition(this.destination.position);
            } else {
                level.loadRoom(this.destination.name, this.destination.position);
            }
        },

        // Color of the key
        applyFilters() {
            this.drawer.changeColor("sprite", this.color);
        },
    }
}

export default Portal