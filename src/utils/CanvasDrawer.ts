import * as PIXI from "pixi.js"
import { Room } from "../game/rooms/Room";
import { Point } from "./Point";
import app from "../app";
import { Color } from "./types";

// This object can be attached to another object to allow it to draw on the screen
type PIXIObject = PIXI.Graphics | PIXI.Sprite;

type CanvasDrawer = {
    sprites: Record<string, PIXIObject>,
    room: Room,
    setRoom: (room: Room) => void,
    hasSprite: (name: string) => boolean,
    draw: (name: string, position: Point, object: PIXIObject) => void,
    delete: (name: string) => void,
    changeColor: (name: string, color: Color) => void
}

type CanvasDrawerParams = {
    room?: Room
}

const CanvasDrawer = ({room = null}: CanvasDrawerParams): CanvasDrawer => ({
    // Reference to current room
    room,
    
    // Maps name of sprite to sprite objects that were drawn
    sprites: {},

    // Sets the room
    setRoom(room: Room) {
        this.room = room;
    },

    // Does the sprite with the given name exist
    hasSprite(name: string): boolean {
        return name in this.sprites && this.sprites[name] !== null;  
    },
    
    // Draws something on the screen (requires unique name)
    draw(name: string, position: Point, object: PIXIObject) {
        if (this.hasSprite(name))
            return;
        
        let sprite = object;
        
        position = this.room.calculatePosition(position);
        
        sprite.x = position.x;
        sprite.y = position.y;
        
        app.stage.addChild(sprite);
        
        this.sprites[name] = sprite;
    },
    
    // Deletes something from the screen
    delete(name: string) {
        if (!this.hasSprite(name))
            return;

        const sprite = this.sprites[name];
        
        app.stage.removeChild(sprite);
        sprite.destroy()
        this.sprites[name] = null;
    },

    // Changes the color of a sprite
    changeColor(name: string, color: Color) {
        if (!this.hasSprite(name))
            return;

        const colorMatrix = new PIXI.ColorMatrixFilter();
        this.sprites[name].filters = [colorMatrix];
        colorMatrix.tint(color);
    }
});

export default CanvasDrawer;