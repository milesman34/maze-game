import { GameState } from "../enums";
import Player from "./Player";
import Level from "./levels/Level";
import { LevelTemplate } from "./levels/LevelTemplate";

type Game = {
    state: GameState,
    level: Level,
    player: Player,
    setPlayer: (player: Player) => void,
    getLevel: () => Level,
    setLevel: (level: Level) => void,
    loadLevel: (template: LevelTemplate) => void,
    getState: () => GameState,
    setState: (state: GameState) => void,
    handleKeypress: (key: string) => void
}

// This object handles the game state management
const Game = (state: GameState) => {
    let object: Game = {
        // Current game state
        state,

        // Current level
        level: null,

        // Reference to player
        player: null,

        // Sets the player
        setPlayer(player: Player) {
            this.player = player;
        },

        // Gets the current level
        getLevel(): Level {
            return this.level;
        },

        // Sets the current level
        setLevel(level: Level) {
            this.level = level;
        },

        // Loads a level based on a template
        loadLevel(template: LevelTemplate) {
            this.level = Level({
                game: this,
                ...template
            });

            this.level.load();
        },

        // Gets the current game state
        getState(): GameState {
            return this.state;
        },

        // Sets the new game state
        setState(state: GameState) {
            this.state = state;
        },

        // Handles a keypress (pass event.key)
        handleKeypress(key: string) {
            if (this.state === GameState.Game) {
                this.player.handleKeypress(key);
            }
        }
    }

    return object;
};

export default Game