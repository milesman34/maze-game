import Game from "./game/Game";
import { GameState } from "./utils/enums";
import * as $ from "jquery";
import app from "./app";
import levels from "./game/levels/levels";
import * as PIXI from "pixi.js";

// Fix scaling mode to not be blurry
PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

// Sets up app
$("#canvas-container").append(app.view as any);

// Sets up the game
let game = Game(GameState.Game);

// Sets the room for the game
game.loadLevel(levels.locked);

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});