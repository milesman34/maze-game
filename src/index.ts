import Game from "./Game";
import { GameState } from "./enums";
import levels from "./levels/levels";
import * as $ from "jquery";
import app from "./app";

// Sets up app
$("#canvas-container").append(app.view as any);

// Sets up the game
let game = Game(GameState.Game);

// Sets the level for the game
game.loadLevel(levels.start);

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});