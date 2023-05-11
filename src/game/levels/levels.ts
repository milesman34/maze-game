import { Point } from "../../utils/Point";
import { RoomTemplate } from "../rooms/RoomTemplate";
import Key from "../tiles/Key";
import LevelEnd from "../tiles/LevelEnd";
import Lock from "../tiles/Lock";
import { blueCoin, standardCoin, standardWall } from "../tiles/tileTemplates";
import { LevelTemplate } from "./LevelTemplate";

// Default charmap
const defCharMap = {
    "A": standardWall,
    "B": blueCoin,
    "C": standardCoin
}

const levels = LevelTemplate.makeTemplates([
    {
        name: "locked",
        startingRoom: "start",
        rooms: RoomTemplate.makeTemplates([
            {
                name: "start",
                stringArray: [
                    "AAA AAA",
                    "A     A",
                    "       ",
                    "A     A",
                    "AAA AAA",
                    "AAAEAAA",
                    "AAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "L": Lock({
                        color: 0x0000FF,
                        amount: 3
                    }),
                    "E": LevelEnd()
                },
                params: {
                    startPos: Point(3, 2),
                    scale: 2,
                    roomLinks: {
                        "(-1, 2)": {
                            name: "room1",
                            position: Point(2, 1)
                        }
                    }
                }
            },

            {
                name: "room1",
                stringArray: [
                    "AAAAAAAAA",
                    "A       A",
                    "A       A",
                    "A       A",
                    "A       A",
                    "A       A",
                    "A       A",
                    "A       A",
                    "AAAAAAAAA"
                ],
                charMap: defCharMap,
                params: {
                    scale: 2
                }
            }
        ])
    }
]);

export default levels