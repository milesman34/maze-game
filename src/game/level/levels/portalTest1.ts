import { Point } from "../../../utils/Point";
import { RoomTemplate } from "../../rooms/RoomTemplate";
import LevelEnd from "../../tiles/LevelEnd";
import Portal from "../../tiles/Portal";
import colors from "../colors";
import defaultCharMap from "../defaultCharmap";

export default {
    name: "portal test 1",
    startingRoom: "start",
    rooms: RoomTemplate.makeTemplates([
        {
            name: "start",
            stringArray: [
                "AAAAAAAAA",
                "A C  C DA",
                "AAAAAAAAA",
                "AF CCC JA",
                "AAAACAAAA",
                "AEAAHAABA",
                "A AAAAABA",
                "A CIAKC A",
                "AAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "E": LevelEnd(),
                "D": Portal({ color: colors.blue, destination: {
                    name: "start",
                    position: Point(1, 3)
                }}),
                
                "F": Portal({ color: colors.blue, destination: {
                    name: "start",
                    position: Point(7, 1)
                }}),
                
                "H": Portal({ color: colors.green, destination: {
                    name: "start",
                    position: Point(3, 7)
                }}),
                
                "I": Portal({ color: colors.green, destination: {
                    name: "start",
                    position: Point(4, 5)
                }}),
                
                "J": Portal({ color: colors.red, destination: {
                    name: "start",
                    position: Point(5, 7)
                }}),
                
                "K": Portal({ color: colors.red, destination: {
                    name: "start",
                    position: Point(7, 3)
                }})
            },
            params: {
                scale: 2,
                startPos: Point(1, 1)
            }
        }
    ])
}