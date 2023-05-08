import { RoomCharMap, RoomParams } from "./Room";

// This type represents a collection of rooms mapped via their names
type RoomCollection = Record<string, RoomTemplate>

// This object represents a template for a room to be created with the Room.loadFromTemplate function
type RoomTemplate = {
    name: string,
    stringArray: Array<string>,
    charMap: RoomCharMap,
    params: RoomParams
    getName: () => string
}

type RoomTemplateParams = {
    name: string,
    stringArray: Array<string>,
    charMap: RoomCharMap,
    params: RoomParams
}

const RoomTemplate = ({name, stringArray, charMap, params}: RoomTemplateParams): RoomTemplate => ({
    name,
    stringArray,
    charMap,
    params,

    getName(): string {
        return this.name;
    }
});

// Makes a series of room template
RoomTemplate.makeTemplates = (templates: Array<RoomTemplateParams>): RoomCollection => {
    let result: RoomCollection = {};

    templates.forEach(param => {
        result[param.name] = RoomTemplate(param);
    });

    return result;
}

export { RoomTemplate, RoomCollection };