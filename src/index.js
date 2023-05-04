import Game from "./Game";
import Level from "./Level";
import Point from "./Point";
import { GameState } from "./enums";
import * as constants from "./constants";
import Wall from "./tiles/Wall";
import Coin from "./tiles/Coin";

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
        "A ACA C A A",
        "A A A A A A",
        "A       A A",
        "A AAAAAAA A",
        "A    CC   A",
        "AAAAAAAAAAA"
    ], 
    {
        "A": Wall({
            path: "./assets/tiles/standard_wall.png"
        }),

        "C": Coin()
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