import Game from "./Game";
import { GameState } from "./enums";
import rooms from "./rooms/rooms";
import * as $ from "jquery";
import app from "./app";

// Sets up app
$("#canvas-container").append(app.view as any);

// Sets up the game
let game = Game(GameState.Game);

// Sets the room for the game
game.loadRoom(rooms.start);

// Add keypress event listener
document.addEventListener("keydown", event => {
    game.handleKeypress(event.key);
});