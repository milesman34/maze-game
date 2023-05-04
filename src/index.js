import Game from "./Game";
import Level from "./Level";
import Point from "./Point";
import { GameState } from "./enums";
import * as constants from "./constants";
import { blueCoin, standardCoin, standardWall } from "./tiles/tileTemplates";

// Initialize app
window.app = new PIXI.Application({ width: constants.canvasSize, height: constants.canvasSize });

$("#canvas-container").append(app.view);

// Sets up the game
let game = Game(GameState.Game);

let level = Level.loadFromLayout(
    game,
    [
        "AAAAAAAAAA",
        "A        A",
        "A A AAAACA",
        "AAA   A  A",
        "ABA A ACAA",
        "A A   A  A",
        "A A A A AA",
        "ACACACAC A",
        "A   A    A",
        "AAAAAAAAAA"
    ], 
    {
        "A": standardWall,
        "B": blueCoin,
        "C": standardCoin
    }, 
    {
        startPos: Point(1, 1),
        scale: 2
    }
);

game.setLevel(level);

level.draw();

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});