import Game from "./Game";
import { GameState } from "./enums";
import * as constants from "./constants";
import levels from "./levels/levels";
import Level from './levels/Level';

// Initialize app
window.app = new PIXI.Application({ width: constants.canvasSize, height: constants.canvasSize });

$("#canvas-container").append(app.view);

// Sets up the game
let game = Game(GameState.Game);

let level = Level.loadFromTemplate(game, levels.start);

game.setLevel(level);

level.draw();

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});