import { Point } from "../../utils/Point"
import { Direction } from "../../utils/enums"

// This type represents a room/position pair
type RoomPosition = {
    name: string,
    position: Point
}

// This represents a link to another room
type RoomLink = {
    source: RoomPosition,
    destination: RoomPosition,
    direction: Direction
}

type RoomLinkParams = {
    source: RoomPosition,
    destination: RoomPosition,
    direction: Direction
}

const RoomLink = ({source, destination, direction}: RoomLinkParams): RoomLink => ({
    // Source of the link
    source,

    // Destination of the link
    destination,

    // Direction that the player must move to enter through the link
    direction
});

// Creates a RoomLink based on a source position, destination, and direction, used for helping with level/room templates
RoomLink.createForTemplate = (source: Point, destination: RoomPosition, direction: Direction): RoomLink => {
    return RoomLink({
        source: {
            name: "",
            position: source
        },

        destination,
        direction
    });
}

export { RoomLink, RoomPosition }