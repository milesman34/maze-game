import { ObjectType } from "../../utils/enums";
import { Color } from "../../utils/types";
import { Room } from "../rooms/Room";
import Tile from "./Tile";
import * as PIXI from "pixi.js";

// This represents a tile which has a colored square marker 
type WallWithMarker = Tile

type WallWithMarkerParams = {
    room?: Room,
    color: Color
}

const WallWithMarker = ({room = null, color}: WallWithMarkerParams): WallWithMarker => {
    let tile = Tile({ room, path: "", solid: true, type: ObjectType.Wall });

    let template = new PIXI.Graphics();
    template.beginFill(color);
    template.drawRect(8, 8, 16, 16);

    return {
        ...tile,

        // Draws the tile
        draw() {
            this.drawer.draw("wall", this.position, PIXI.Sprite.from("./assets/standard_wall.png"));
            
            this.drawer.draw("marker", this.position, new PIXI.Graphics(template.geometry));
        },

        deleteSprite() {
            this.drawer.delete("wall");
            this.drawer.delete("marker");
        }
    }
}

export default WallWithMarker;