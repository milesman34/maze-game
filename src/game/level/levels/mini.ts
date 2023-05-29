import { Point } from "../../../utils/Point";
import { RoomTemplate } from "../../rooms/RoomTemplate";
import Key from "../../tiles/Key";
import LevelEnd from "../../tiles/LevelEnd";
import Lock from "../../tiles/Lock";
import colors from "../colors";
import defaultCharMap from "../defaultCharmap";

export default {
    name: "mini",
    startingRoom: "start",
    rooms: RoomTemplate.makeTemplates([
        {
            name: "start",
            stringArray: [
                "AAAAAAAAAAAAAAA",
                "A  CCA BA   AMA",
                "AA AAA AA ACACA",
                "A    A CC ACCCA",
                "A AA AAAA AAAAA",
                "A BA L       CA",
                "AAAA AA AAA AAA",
                "A    AA CCA DEA",
                "A AACAA AAA AAA",
                "A KABAC      CA",
                "AAAAAAAAAAANAAA",
                "ACACAACA      A",
                "AMA    ACAAAA A",
                "A   AA CC ABC A",
                "AAAAAAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "E": LevelEnd(),
                "L": Lock({ color: colors.blue }),
                "K": Key({ color: colors.blue }),
                "D": Lock({ color: colors.red, amount: 2 }),
                "M": Key({ color: colors.red }),
                "N": Lock({ color: colors.red })
            },
            params: {
                startPos: Point(1, 1),
                scale: 1
            }
        }
    ])
}