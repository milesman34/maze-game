import { Point } from "../../../utils/Point";
import { Direction } from "../../../utils/enums";
import { RoomLink } from "../../rooms/RoomLink";
import { RoomTemplate } from "../../rooms/RoomTemplate";
import LevelEnd from "../../tiles/LevelEnd";
import defaultCharMap from "../defaultCharmap";

export default {
    name: "first level",
    startingRoom: "start",
    rooms: RoomTemplate.makeTemplates([
        {
            name: "start",
            stringArray: [
                "AAAAAAAAA",
                "A     CCA",
                "AAA AAAAA",
                "ACA   CCA",
                "A A A AAA",
                "A   A C  ",
                "A AAAAA A",
                "ACAB    A",
                "AAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap
            },
            params: {
                startPos: Point(1, 1),
                scale: 2
            },
            roomLinks: [
                RoomLink.createForTemplate(Point(8, 5), {
                    name: "end",
                    position: Point(0, 5)
                }, Direction.Right)
            ]
        },
        
        {
            name: "end",
            stringArray: [
                "AAAAAAAAA",
                "ABACAC  A",
                "A A C A A",
                "A A A A A",
                "A A AAA A",
                "  A   A A",
                "A A AAA A",
                "A C CAAEA",
                "AAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "E": LevelEnd()
            },
            params: {
                scale: 2
            }
        }
    ])
}