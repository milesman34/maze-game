import Player from "./Player";
import { Point } from "./Point";
import { GameState } from "./enums";
import { Level } from "./levels/Level";
import LevelTemplate from "./levels/LevelTemplate";

type Game = {
    state: GameState,
    level: Level,
    player: Player,
    score: number,
    getState: () => GameState,
    setState: (state: GameState) => void,
    getLevel: () => Level,
    setLevel: (level: Level) => void,
    loadLevel: (levelTemplate: LevelTemplate, position?: Point) => void,
    getScore: () => number,
    setScore: (score: number) => void,
    addScore: (score: number) => void,
    getPlayer: () => Player,
    getCenterOffset: () => Point,
    handleKeypress: (key: string) => void
}

// This object handles the game state management
const Game = (state: GameState) => {
    let object: Game = {
        // Current game state
        state,

        // Current level
        level: null,

        // Player object
        player: null,

        // Current score
        score: 0,

        // Gets the current game state
        getState(): GameState {
            return this.state;
        },

        // Sets the new game state
        setState(state: GameState) {
            this.state = state;
        },

        // Gets the current level
        getLevel(): Level {
            return this.level;
        },

        // Sets the current level
        setLevel(level: Level) {
            this.level = level;
        },

        // Loads a level from a template
        // Starting position can optionally be provided
        loadLevel(levelTemplate: LevelTemplate, position: Point = null) {
            // Destroy old level if needed
            if (this.level !== null) {
                this.level.destroy();
            }

            let level = Level.loadFromTemplate(this, levelTemplate);

            this.level = level;

            this.player = Player({
                game: this,
                position: position === null ? this.level.getStartPos() : position,
                level: this.level
            });

            this.player.draw();

            level.draw();
        },

        // Gets the current score
        getScore(): number {
            return this.score;
        },

        // Sets the current score
        setScore(score: number) {
            this.score = score;
            $("#score-container").text(`Score: ${score}`);
        },

        // Adds to the current score
        addScore(amount: number) {
            this.setScore(this.score + amount);
        },

        // Gets the current player
        getPlayer(): Player {
            return this.player;
        },

        // Gets the current center offset for the level
        getCenterOffset(): Point {
            return this.level.getCenterOffset();
        },

        // Handles a keypress (pass event.key)
        handleKeypress(key: string) {
            if (this.state === GameState.Game) {
                this.player.handleKeypress(key);
            }
        }
    }

    object.setScore(0);

    return object;
};

export default Game