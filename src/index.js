import Game from "./Game";
import Level from "./Level";
import Point from "./Point";
import Tile from "./Tile";
import { GameState } from "./enums";
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
        "A A     A A",
        "A A AAA   A",
        "A A A   A A",
        "A A A A A A",
        "A       A A",
        "A AAAAAAA A",
        "A         A",
        "AAAAAAAAAAA"
    ], 
    {
        "A": Tile({
            path: "./assets/tiles/standard_wall.png"
        })
    }, 
    {
        startPos: Point(1, 1)
    }
);

game.setLevel(level);

level.draw();