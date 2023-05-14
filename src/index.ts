import Game from "./game/Game";
import { GameState } from "./utils/enums";
import * as $ from "jquery";
import app from "./app";
import * as PIXI from "pixi.js";

// Fix scaling mode to not be blurry
PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;

// Sets up app
$("#canvas-container").append(app.view as any);

// Sets up the game
let game = Game();

game.setState(GameState.Title);

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});

// Add onclick listener for start button
$("#start-button").on("click", function() {
    if (game.getState() === GameState.Title) {
        game.setState(GameState.LevelSelect);
    }
});