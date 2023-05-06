import { LevelCharMap, LevelParams } from "./Level";

// This object represents a template for a level to be created with the Level.loadFromTemplate function
type LevelTemplate = {
    stringArray: Array<string>,
    charMap: LevelCharMap,
    params: LevelParams
}

const LevelTemplate = (stringArray: Array<string>, charMap: LevelCharMap, params: LevelParams) => ({
    stringArray,
    charMap,
    params
});

export default LevelTemplate;