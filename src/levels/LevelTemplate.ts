import { LevelCharMap, LevelParams } from "./Level";

// This object represents a template for a level to be created with the Level.loadFromTemplate function
type LevelTemplate = {
    name: string,
    stringArray: Array<string>,
    charMap: LevelCharMap,
    params: LevelParams
    getName: () => string
}

const LevelTemplate = (name: string, stringArray: Array<string>, charMap: LevelCharMap, params: LevelParams): LevelTemplate => ({
    name,
    stringArray,
    charMap,
    params,

    getName(): string {
        return this.name;
    }
});

export default LevelTemplate;