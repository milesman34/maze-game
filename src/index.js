import Game from "./Game";
import { GameState } from "./enums";
import * as constants from "./constants";
import levels from "./levels/levels";

// Initialize app
window.app = new PIXI.Application({ width: constants.canvasSize, height: constants.canvasSize });

$("#canvas-container").append(app.view);

// Sets up the game
let game = Game(GameState.Game);

// Sets the level for the game
game.loadLevel(levels.start);

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});