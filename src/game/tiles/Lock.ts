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
    let tile = Tile({ path: "./assets/tiles/lock.png", room, solid: true });

    return {
        ...tile,

        // Color of the key
        applyFilters() {
            // const colorMatrix = new PIXI.ColorMatrixFilter();
            // this.sprite.filters = [colorMatrix];
            // colorMatrix.tint(color);
        }
    }
}

export default Lock