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
    if (game.isState(GameState.Title)) {
        game.setState(GameState.LevelSelect);
    }
});

// Add onclick listener for exit level button
$("#exit-level-button").on("click", function() {
    if (game.isState(GameState.Game)) {
        game.level.unloadRoom();
        game.setState(GameState.LevelSelect);
    }
});

// Add onclick listener for restart button
$("#level-restart-button").on("click", function() {
    if (game.isState(GameState.LevelEnd)) {
        game.reloadCurrentLevel();
        game.setState(GameState.Game);
    }
});

// Add onclick listener for select new level button
$("#select-new-level-button").on("click", function() {
    if (game.isState(GameState.LevelEnd)) {
        game.setState(GameState.LevelSelect);
    }
});