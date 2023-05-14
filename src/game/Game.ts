import { GameState } from "../utils/enums";
import LevelSelectScreen from "./LevelSelectScreen";
import Player from "./Player";
import Level from "./levels/Level";
import { LevelTemplate } from "./levels/LevelTemplate";
import levels from "./levels/levels";
import * as $ from "jquery";

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
const Game = (state: GameState = GameState.Title) => {
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

            $("#main-app").children().hide();
            $("#header-ui").hide();
            
            switch (this.state) {
                case GameState.Title:
                $("#title-screen").show();
                break;
                
                case GameState.LevelSelect:
                $("#level-select-screen").show();

                let levelSelect = LevelSelectScreen.getInstance(this);
                break;
                
                case GameState.Game:
                $("#canvas-container").show();
                $("#header-ui").show();
                break;
            }
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