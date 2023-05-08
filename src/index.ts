import Game from "./game/Game";
import { GameState } from "./enums";
import * as $ from "jquery";
import app from "./app";
import levels from "./game/levels/levels";

// Sets up app
$("#canvas-container").append(app.view as any);

// Sets up the game
let game = Game(GameState.Game);

// Sets the room for the game
game.loadLevel(levels.level1);

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});