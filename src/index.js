import Game from "./Game";
import Level from "./Level";
import Point from "./Point";
import Tile from "./Tile";
import { GameState, MazeObjectType } from "./enums";
import * as constants from "./constants";

// Initialize app
window.app = new PIXI.Application({ width: constants.canvasSize, height: constants.canvasSize });

$("#canvas-container").append(app.view);

// Sets up the game
let game = Game(GameState.Game);

let level = Level.loadFromLayout(
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
        "A": Tile({
            path: "./assets/tiles/standard_wall.png",
            type: MazeObjectType.Wall
        }),

        "C": Tile({
            path: "./assets/tiles/coin.png",
            type: MazeObjectType.Coin
        })
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