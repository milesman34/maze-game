import * as PIXI from "pixi.js";
import { Room } from "../rooms/Room";
import Tile from "./Tile";
import { Color } from "../../utils/types";

// This represents a key which can be collected
type Lock = Tile

type KeyParams = {
    room?: Room,
    color?: Color
}

const Lock = ({room = null, color = 0xFFFFFF}: KeyParams): Lock => {
    let tile = Tile({ path: "", room, solid: true });

    return {
        ...tile,

        // Draws the tile
        draw() {
            this.drawer.draw("wall", this.position, PIXI.Sprite.from("./assets/tiles/standard_wall.png"));
            this.drawer.draw("lock", this.position, PIXI.Sprite.from("./assets/tiles/lock.png"));

            this.applyFilters();
        },

        // Deletes the object's sprite
        deleteSprite() {
            this.drawer.delete("wall");
            this.drawer.delete("lock");
        },

        // Color of the key
        applyFilters() {
            this.drawer.changeColor("lock", color);
        }
    }
}

export default Lock