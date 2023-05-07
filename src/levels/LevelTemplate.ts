import { LevelCharMap, LevelParams } from "./Level";

// This object represents a template for a level to be created with the Level.loadFromTemplate function
type LevelTemplate = {
    name: string,
    stringArray: Array<string>,
    charMap: LevelCharMap,
    params: LevelParams
    getName: () => string
}

type LevelTemplateParams = {
    name: string,
    stringArray: Array<string>,
    charMap: LevelCharMap,
    params: LevelParams
}

const LevelTemplate = ({name, stringArray, charMap, params}: LevelTemplateParams): LevelTemplate => ({
    name,
    stringArray,
    charMap,
    params,

    getName(): string {
        return this.name;
    }
});

// Makes a series of level template
LevelTemplate.makeTemplates = (templates: Array<LevelTemplateParams>): Record<string, LevelTemplate> => {
    let result: Record<string, LevelTemplate> = {};

    templates.forEach(param => {
        result[param.name] = LevelTemplate(param);
    });

    return result;
}

export default LevelTemplate;