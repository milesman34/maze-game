import { GameState } from '../utils/enums';
import Game from './Game';
import { LevelCollection, LevelTemplate } from './levels/LevelTemplate';
import levels from './levels/levels';
import * as $ from "jquery";

// This object represents an entry in the level select screen, tracking the most coins collected and least steps used
type LevelSelectEntry = {
    name: string,
    mostCoins: number,
    leastSteps: number,
    template: LevelTemplate,
    generateTextForValue: (num: number, name: string) => string,
    generateID: () => string,
    generateHTML: () => string
}

// Generates a LevelSelectEntry
const LevelSelectEntry = (name: string, template: LevelTemplate): LevelSelectEntry => ({
    name,
    mostCoins: null,
    leastSteps: null,
    template,

    // Generates a display string for a value (name should not be plural)
    generateTextForValue(num: number, name: string): string {
        if (num === null) {
            return `--- ${name}s`;
        } else {
            return `${num} ${name}${num === 1 ? "" : "s"}`;
        }
    },

    // Generates the id to use for this entry for html (replace spaces with underscores to make it work with html)
    generateID(): string {
        return `level-select--${this.name.split(" ").join("_")}`;
    },

    // Generates HTML for the entry
    generateHTML(): string {
        return [
            `<div id="${this.generateID()}" class="level-select-row">`,
            `<div class="level-select-name flex-center">${this.name}</div>`,
            `<div class="level-select-best-coins" style="grid-column: 3;">${this.generateTextForValue(this.mostCoins, "coin")}</div>`,
            `<div class="level-select-best-steps" style="grid-column: 4;">${this.generateTextForValue(this.leastSteps, "step")}</div>`
        ].join("");
    }
})

// This object handles level selection
type LevelSelectScreen = {
    game: Game,
    levels: Array<LevelSelectEntry>,
    addLevel: (name: string, template: LevelTemplate) => void,
    reloadHTML: () => void
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