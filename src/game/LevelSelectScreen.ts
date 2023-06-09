import { GameState } from '../utils/enums';
import { generateTextForValue, localStorageLoadInt } from '../utils/utils';
import Game from './Game';
import { LevelCollection, LevelTemplate } from './level/LevelTemplate';
import levels from './level/levels';
import * as $ from "jquery";

// This object represents an entry in the level select screen, tracking the most coins collected and least steps used
type LevelSelectEntry = {
    name: string,
    mostCoins: number,
    leastSteps: number,
    template: LevelTemplate,
    generateID: () => string,
    generateHTML: () => string
}

// Generates a LevelSelectEntry
const LevelSelectEntry = (name: string, template: LevelTemplate): LevelSelectEntry => ({
    name,
    mostCoins: localStorageLoadInt(`${name}-mostCoins`, null),
    leastSteps: localStorageLoadInt(`${name}-leastSteps`, null),
    template,

    // Generates the id to use for this entry for html (replace spaces with underscores to make it work with html)
    generateID(): string {
        return `level-select--${this.name.split(" ").join("_")}`;
    },

    // Generates HTML for the entry
    generateHTML(): string {
        return [
            `<div id="${this.generateID()}" class="level-select-row">`,
            `<div class="level-select-name flex-center">${this.name}</div>`,
            `<div class="level-select-best-coins" style="grid-column: 3;">${generateTextForValue(this.mostCoins, "coin")}</div>`,
            `<div class="level-select-best-steps" style="grid-column: 4;">${generateTextForValue(this.leastSteps, "step")}</div>`
        ].join("");
    }
})

// This object handles level selection
type LevelSelectScreen = {
    game: Game,
    levels: Array<LevelSelectEntry>,
    addLevel: (name: string, template: LevelTemplate) => void,
    reloadHTML: () => void,
    getLevel: (name: string) => LevelSelectEntry,
    updateStats: (name: string, coins: number, steps: number) => void
}

const LevelSelectScreen = (game: Game, levels: LevelCollection): LevelSelectScreen => {
    let object: LevelSelectScreen = {
        game,
        levels: [],

        // Adds a level template
        addLevel(name: string, template: LevelTemplate) {
            const newLevel = LevelSelectEntry(name, template);

            this.levels.push(newLevel);
        },

        // Reloads the HTML
        reloadHTML() {
            $("#level-select-container").empty();

            this.levels.forEach((entry: LevelSelectEntry) => {
                $("#level-select-container").append(entry.generateHTML());

                // Let's also add an onclick event to the new object
                $(`#${entry.generateID()}`).on("click", () => {
                    this.game.setState(GameState.Game);
                    this.game.loadLevel(levels[entry.name]);
                });
            });
        },

        // Gets the level with the given name
        getLevel(name: string): LevelSelectEntry {
            return this.levels.filter((entry: LevelSelectEntry) => entry.name === name)[0];
        },

        // Updates the stats of a level
        updateStats(name: string, coins: number, steps: number) {
            let changed = false;

            this.levels.forEach((entry: LevelSelectEntry) => {
                if (entry.name === name) {
                    // Update best coins/steps if they are better than the previous ones
                    if (entry.mostCoins === null || coins > entry.mostCoins) {
                        entry.mostCoins = coins;
                        localStorage.setItem(`${entry.name}-mostCoins`, coins.toString());
                        changed = true;
                    }

                    if (entry.leastSteps === null || steps < entry.leastSteps) {
                        entry.leastSteps = steps;
                        localStorage.setItem(`${entry.name}-leastSteps`, steps.toString());
                        changed = true;
                    }
                }
            });

            if (changed)
                this.reloadHTML();
        }
    }

    // Set up levels
    Object.entries(levels).forEach(entry => {
        object.addLevel(entry[0], entry[1]);
    });

    object.reloadHTML();
    
    return object;
};

// The level select screen uses a singleton pattern
LevelSelectScreen.instance = null;

LevelSelectScreen.getInstance = (game: Game): LevelSelectScreen => {
    if (LevelSelectScreen.instance === null) {
        LevelSelectScreen.instance = LevelSelectScreen(game, levels);
    } else {
        return LevelSelectScreen.instance;
    }
}

export default LevelSelectScreen