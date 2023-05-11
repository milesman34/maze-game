import * as PIXI from "pixi.js";
import { Room } from "../rooms/Room";
import Tile from "./Tile";
import { Color } from "../../utils/types";
import { ObjectType } from "../../utils/enums";
import { Point } from "../../utils/Point";

// This represents a key which can be collected
type Lock = Tile & {
    color: Color,
    initialAmount: number,
    amount: number,
    getColor: () => Color,
    setKeys: (amount: number) => void,
    subtractKeys: (amount: number) => void,
    drawKeyText: () => void
}

type KeyParams = {
    room?: Room,
    color?: Color,
    amount?: number
}

const Lock = ({room = null, color = 0xFFFFFF, amount = 1}: KeyParams): Lock => {
    let tile = Tile({ path: "", room, solid: true, type: ObjectType.Lock });

    return {
        ...tile,

        color,

        // Number of keys required to unlock this
        initialAmount: amount,
        amount,

        // Gets the color
        getColor(): Color {
            return this.color;
        },

        // Sets the amount of keys
        setKeys(amount: number) {
            this.amount = amount;

            if (this.amount <= 0)
                this.destroy();
            else {
                this.drawKeyText();
            }
        },

        // Subtracts from the amount of keys needed
        subtractKeys(amount: number) {
            this.setKeys(this.amount - amount);
        },

        // Attempts to use a key on the lock
        useKey(color: Color, amount: number = 1) {
            if (this.color === color) {
                this.subtractKeys(amount);
            }
        },

        // Draws text based on the number of keys needed
        drawKeyText() {
            this.drawer.delete("text");
            this.drawer.drawCenteredText("text", this.position, this.amount.toString());
        },

        // Draws the tile
        draw() {
            this.drawer.draw("wall", this.position, PIXI.Sprite.from("./assets/standard_wall.png"));
            this.drawer.draw("lock", this.position, PIXI.Sprite.from("./assets/lock.png"));
            this.drawKeyText();

            this.applyFilters();
        },

        // Deletes the object's sprite
        deleteSprite() {
            this.drawer.delete("wall");
            this.drawer.delete("lock");
            this.drawer.delete("text");
        },

        // Color of the key
        applyFilters() {
            this.drawer.changeColor("lock", color);
        },

        // Override of update(), updates key amount to what it should be and deletes tile if it is low enough
        update() {
            const collectedKeys = this.level.getCollectedKeys();

            // Finds what the amount should be at this point
            const amount = this.initialAmount - (collectedKeys[this.color] ?? 0)

            if (this.amount !== amount) {
                this.setKeys(amount);
            }
        }
    }
}

export default Lock