import Player from "./Player";

// This object handles the game state management
const Game = state => ({
    // Current game state
    state,

    // Current level
    level: null,

    // Player object
    player: null,

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

    // Gets the current center offset for the level
    getCenterOffset() {
        return this.level.getCenterOffset();
    }
});

export default Game