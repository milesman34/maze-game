import Player from "./Player";
import { GameState } from "./enums";

// This object handles the game state management
const Game = state => {
    let object = {
        // Current game state
        state,

        // Current level
        level: null,

        // Player object
        player: null,

        // Current score
        score: 0,

        // Gets the current game state
        getState() {
            return this.state;
        },

        // Sets the new game state
        setState(state) {
            this.state = state;
        },

        // Gets the current level
        getLevel() {
            return this.level;
        },

        // Sets the current level
        setLevel(level) {
            this.level = level;

            this.player = Player({
                game: this,
                position: this.level.getStartPos(),
                level: this.level
            });

            this.player.draw();
        },

        // Gets the current score
        getScore() {
            return this.score;
        },

        // Sets the current score
        setScore(score) {
            this.score = score;
            $("#score-container").text(`Score: ${score}`);
        },

        // Adds to the current score
        addScore(amount) {
            this.setScore(this.score + amount);
        },

        // Gets the current center offset for the level
        getCenterOffset() {
            return this.level.getCenterOffset();
        },

        // Handles a keypress (pass event.key)
        handleKeypress(key) {
            if (this.state === GameState.Game) {
                this.player.handleKeypress(key);
            }
        }
    }

    object.setScore(0);

    return object;
};

export default Game