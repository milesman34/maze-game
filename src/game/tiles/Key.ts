import * as PIXI from "pixi.js";
import { Room } from "../rooms/Room";
import Tile from "./Tile";
import { Color } from "../../utils/types";

// This represents a key which can be collected
type Key = Tile

type KeyParams = {
    room?: Room,
    color?: Color
}

const Key = ({room = null, color = 0xFFFFFF}: KeyParams): Key => {
    let tile = Tile({ path: "./assets/tiles/key.png", room, solid: false });

    return {
        ...tile,

        handleCollision() {
            this.level.collectKey(color);
            this.destroy();
        },

        // Color of the key
        applyFilters() {
            this.drawer.changeColor("sprite", color);
        }
    }
}

export default Key