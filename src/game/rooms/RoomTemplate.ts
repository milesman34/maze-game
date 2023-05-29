import { PointString } from "../../utils/Point";
import Tile from "../tiles/Tile";
import { RoomCharMap, RoomParams } from "./Room";
import { RoomLink } from "./RoomLink";

// This type represents a collection of rooms mapped via their names
type RoomCollection = Record<string, RoomTemplate>

// This object represents a template for a room to be created with the Room.loadFromTemplate function
type RoomTemplate = {
    name: string,
    stringArray: Array<string>,
    charMap: RoomCharMap,
    objects: Record<PointString, Tile>,
    params: RoomParams,
    roomLinks: Array<RoomLink>,
    getName: () => string
}

type RoomTemplateParams = {
    name: string,
    stringArray?: Array<string>,
    charMap: RoomCharMap,
    objects?: Record<PointString, Tile>,
    params?: RoomParams,
    roomLinks?: Array<RoomLink>
}

const RoomTemplate = ({name, stringArray = [], charMap, objects = {}, params = {scale: 1}, roomLinks = []}: RoomTemplateParams): RoomTemplate => ({
    name,
    stringArray,
    charMap,
    
    // There could be extra objects which are mapped based on their position
    objects,

    // Extra parameters for the room
    params,

    // Links from this room to another room (only need to be defined on one side)
    roomLinks,

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