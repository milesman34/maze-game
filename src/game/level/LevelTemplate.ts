import { RoomCollection } from "../rooms/RoomTemplate"

// This type represents a collection of levels mapped by their names
type LevelCollection = Record<string, LevelTemplate>

// This object represents a template for a level to be created
type LevelTemplate = {
    name: string,
    startingRoom: string,
    rooms: RoomCollection
}

type LevelTemplateParams = {
    name: string,
    startingRoom: string,
    rooms: RoomCollection
}

const LevelTemplate = ({ name, startingRoom, rooms }: LevelTemplateParams) => ({
    name,
    startingRoom,
    rooms
});

// Makes a series of level templates
LevelTemplate.makeTemplates = (templates: Array<LevelTemplateParams>): LevelCollection => {
    let result: LevelCollection = {};

    templates.forEach(param => {
        result[param.name] = LevelTemplate(param);
    });

    return result;
}

export { LevelCollection, LevelTemplate }