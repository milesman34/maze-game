import { GameState } from "../utils/enums";
import { generateTextForValue } from "../utils/utils";
import LevelSelectScreen from "./LevelSelectScreen";
import Player from "./Player";
import Level from "./level/Level";
import { LevelTemplate } from "./level/LevelTemplate";
import levels from "./level/levels";
import * as $ from "jquery";

type Game = {
    state: GameState,
    level: Level,
    player: Player,
    coins: number,
    steps: number,
    setPlayer: (player: Player) => void,
    getLevel: () => Level,
    setLevel: (level: Level) => void,
    loadLevel: (template: LevelTemplate) => void,
    reloadCurrentLevel: () => void,
    getState: () => GameState,
    isState: (state: GameState) => boolean
    setState: (state: GameState) => void,
    handleKeypress: (key: string) => void,
    setCoins: (coins: number) => void,
    setSteps: (steps: number) => void
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
        
        // Track the coins/steps from the most recent level
        coins: 0,
        steps: 0,
        
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

        // Reloads the current level
        reloadCurrentLevel() {
            this.loadLevel(levels[this.level.name]);  
        },
        
        // Gets the current game state
        getState(): GameState {
            return this.state;
        },

        // Returns if the current state is equal to the given one
        isState(state: GameState): boolean {
            return this.state === state;
        },
        
        // Sets the new game state
        setState(state: GameState) {
            this.state = state;
            
            $("#main-app").children().hide();
            $("#header-ui").hide();
            
            let levelSelect = LevelSelectScreen.getInstance(this);
            
            switch (this.state) {
                case GameState.Title:
                $("#title-screen").show();
                break;
                
                case GameState.LevelSelect:
                $("#level-select-screen").show();
                break;

                case GameState.LevelEnd:
                $("#level-end-screen").show();

                $("#level-end-title").text(`Completed ${this.level.name}`);
                
                // steps cannot be zero if a level was completed
                if (this.steps > 0) {
                    levelSelect.updateStats(this.level.name, this.coins, this.steps);
                }

                // Let's get the best coins/steps from the level selector
                let levelEntry = levelSelect.getLevel(this.level.name);

                $("#level-end-coins").text(`${generateTextForValue(this.coins, "coin")} (best: ${generateTextForValue(levelEntry.mostCoins, "coin")})`);
                $("#level-end-steps").text(`${generateTextForValue(this.steps, "step")} (best: ${generateTextForValue(levelEntry.leastSteps, "step")})`);
                break;
                
                case GameState.Game:
                $("#canvas-container").show();
                $("#header-ui").show();
                break;
            }
        },
        
        // Handles a keypress (pass event.key)
        handleKeypress(key: string) {
            if (this.isState(GameState.Game)) {
                this.player.handleKeypress(key);
            }
        },
        
        // Sets the number of coins
        setCoins(coins: number) {
            this.coins = coins;
        },
        
        // Sets the number of steps
        setSteps(steps: number) {
            this.steps = steps;
        }
    }
    
    return object;
};

export default Game