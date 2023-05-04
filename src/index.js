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
        "AAAAAAAAAAA",
        "A         A",
        "A AAAAAAA A",
        "A AC  C A A",
        "A ACAAA   A",
        "A ACABC A A",
        "A A A A A A",
        "A       A A",
        "A AAAAAAA A",
        "A    CC   A",
        "AAAAAAAAAAA"
    ], 
    {
        "A": standardWall,
        "B": blueCoin,
        "C": standardCoin
    }, 
    {
        startPos: Point(1, 1)
    }
);

game.setLevel(level);

level.draw();

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});