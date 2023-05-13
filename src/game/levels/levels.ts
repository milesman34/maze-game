import { Point } from "../../utils/Point";
import { Direction } from "../../utils/enums";
import { RoomLink } from "../rooms/RoomLink";
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

const colors = {
    red: 0xFF0000,
    green: 0x00FF00,
    blue: 0x0000FF,
    lightBlue: 0x00FFFF,
    yellow: 0xFFFF00,
    purple: 0xFF00FF
}

const levels = LevelTemplate.makeTemplates([
    {
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
                    ...defCharMap
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
                    ...defCharMap,
                    "E": LevelEnd()
                },
                params: {
                    scale: 2
                }
            }
        ])
    },

    {
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
                    ...defCharMap,
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
    // {
    //     name: "locked",
    //     startingRoom: "start",
    //     rooms: RoomTemplate.makeTemplates([
    //         {
    //             name: "start",
    //             stringArray: [
    //                 "AAA AAA",
    //                 "A     A",
    //                 "       ",
    //                 "A     A",
    //                 "AAADAAA",
    //                 "AAAEAAA",
    //                 "AAAAAAA"
    //             ],
    //             charMap: {
    //                 ...defCharMap,
    //                 "E": LevelEnd(),
    //                 "D": Lock({
    //                     color: colors.blue,
    //                     amount: 3
    //                 })
    //             },
    //             params: {
    //                 startPos: Point(3, 2),
    //                 scale: 2,
    //                 roomLinks: {
    //                     "(-1, 2)": {
    //                         name: "room1",
    //                         position: Point(8, 4)
    //                     }
    //                 }
    //             }
    //         },

    //         {
    //             name: "room1",
    //             stringArray: [
    //                 "AAAAAAAAA",
    //                 "A   A   A",
    //                 "A AAA A A",
    //                 "A     A A",
    //                 "A AAAAA  ",
    //                 "  A   A A",
    //                 "AAADAAA A",
    //                 "A       A",
    //                 "AAAA AAAA"
    //             ],
    //             charMap: {
    //                 ...defCharMap,
    //                 "D": Lock({
    //                     color: colors.red
    //                 })
    //             },
    //             objects: {
    //                 "(7, 1)": blueCoin,
    //                 "(2, 1)": standardCoin,
    //                 "(3, 1)": standardCoin,
    //                 "(4, 3)": standardCoin,
    //                 "(3, 5)": blueCoin,
    //                 "(4, 5)": blueCoin,
    //                 "(5, 5)": blueCoin,
    //                 "(5, 7)": standardCoin,
    //                 "(6, 7)": standardCoin,
    //                 "(1, 7)": standardCoin,
    //                 "(2, 7)": standardCoin
    //             },
    //             params: {
    //                 scale: 2,
    //                 roomLinks: {
    //                     "(9, 4)": {
    //                         name: "start",
    //                         position: Point(0, 2)
    //                     },

    //                     "(4, 9)": {
    //                         name: "room2",
    //                         position: Point(4, 0)
    //                     },

    //                     "(-1, 5)": {
    //                         name: "room4",
    //                         position: Point(8, 5)
    //                     }
    //                 }
    //             }
    //         },

    //         {
    //             name: "room2",
    //             stringArray: [
    //                 "AAAA AAAA",
    //                 "A       A",
    //                 "ALAA AAGA",
    //                 "A A   A A",
    //                 "A A   A A",
    //                 "A A   A A",
    //                 "A A   A A",
    //                 "  A   A  ",
    //                 "AAAA AAAA"
    //             ],
    //             charMap: {
    //                 ...defCharMap,
    //                 "L": Lock({ color: colors.lightBlue }),
    //                 "G": Lock({ color: colors.green })
    //             },
    //             objects: {
    //                 "(1, 3)": blueCoin,
    //                 "(1, 4)": blueCoin,
    //                 "(7, 3)": blueCoin,
    //                 "(7, 4)": blueCoin,
    //                 "(3, 4)": standardCoin,
    //                 "(5, 4)": standardCoin,
    //                 "(3, 6)": standardCoin,
    //                 "(5, 6)": standardCoin
    //             },
    //             params: {
    //                 scale: 2,
    //                 roomLinks: {
    //                     "(4, -1)": {
    //                         name: "room1",
    //                         position: Point(4, 8)
    //                     },

    //                     "(4, 9)": {
    //                         name: "room3",
    //                         position: Point(4, 0)
    //                     },

    //                     "(9, 7)": {
    //                         name: "room6",
    //                         position: Point(0, 7)
    //                     }
    //                 }
    //             }
    //         },

    //         {
    //             name: "room3",
    //             stringArray: [
    //                 "AAAA AAAA",
    //                 "A       A",
    //                 "A       A",
    //                 "A  AYA  A",
    //                 "A  ADA  A",
    //                 "A  AAA  A",
    //                 "A   A   A",
    //                 "A   A   A",
    //                 "AAAAAAAAA"
    //             ],
    //             charMap: {
    //                 ...defCharMap,
    //                 "D": Key({
    //                     color: colors.blue
    //                 }),
    //                 "Y": Lock({
    //                     color: colors.yellow,
    //                     amount: 2
    //                 })
    //             },
    //             objects: {
    //                 "(2, 3)": standardCoin,
    //                 "(1, 4)": standardCoin,
    //                 "(2, 5)": standardCoin,
    //                 "(2, 7)": blueCoin,
    //                 "(6, 3)": standardCoin,
    //                 "(7, 4)": standardCoin,
    //                 "(6, 5)": standardCoin,
    //                 "(6, 7)": blueCoin  
    //             },
    //             params: {
    //                 scale: 2,
    //                 roomLinks: {
    //                     "(4, -1)": {
    //                         name: "room2",
    //                         position: Point(4, 8)
    //                     }
    //                 }
    //             }
    //         },

    //         {
    //             name: "room4",
    //             stringArray: [
    //                 "AAAAYAAAA",
    //                 "  A     A",
    //                 "A A A A A",
    //                 "A   AAA A",
    //                 "A A A A A",
    //                 "A   A A  ",
    //                 "A A A A A",
    //                 "        A",
    //                 "AAAAAAAAA"
    //             ],
    //             charMap: {
    //                 ...defCharMap,
    //                 "Y": Lock({ color: colors.yellow })
    //             },
    //             objects: {
    //                 "(4, 1)": standardCoin,
    //                 "(5, 1)": standardCoin,
    //                 "(6, 1)": standardCoin,
    //                 "(5, 2)": standardCoin,
    //                 "(5, 4)": standardCoin,
    //                 "(1, 4)": blueCoin
    //             },
    //             params: {
    //                 scale: 2,
    //                 roomLinks: {
    //                     "(9, 5)": {
    //                         name: "room1",
    //                         position: Point(0, 5)
    //                     },

    //                     "(-1, 1)": {
    //                         name: "room5",
    //                         position: Point(8, 1)
    //                     },

    //                     "(-1, 7)": {
    //                         name: "room5",
    //                         position: Point(8, 7)
    //                     }
    //                 }
    //             }
    //         },

    //         {
    //             name: "room5",
    //             stringArray: [
    //                 "AAAAAAAAA",
    //                 "A        ",
    //                 "A AAAAHAA",
    //                 "AGA     A",
    //                 "AAAA AA A",
    //                 "ADA     A",
    //                 "A AAAAIAA",
    //                 "A        ",
    //                 "AAAAAAAAA",
    //             ],
    //             charMap: {
    //                 ...defCharMap,
    //                 "D": Key({ color: colors.red }),
    //                 "G": Key({ color: colors.green }),
    //                 "H": Lock({ color: colors.red }),
    //                 "I": Lock({ color: colors.green })
    //             },
    //             objects: {
    //                 "(1, 2)": blueCoin,
    //                 "(1, 6)": blueCoin,
    //                 "(3, 3)": blueCoin,
    //                 "(3, 5)": blueCoin,
    //                 "(4, 4)": standardCoin,
    //                 "(7, 4)": standardCoin
    //             },
    //             params: {
    //                 scale: 2,
    //                 roomLinks: {
    //                     "(9, 1)": {
    //                         name: "room4",
    //                         position: Point(0, 1)
    //                     },

    //                     "(9, 7)": {
    //                         name: "room4",
    //                         position: Point(0, 7)
    //                     }
    //                 }
    //             }
    //         },

    //         {
    //             name: "room6",
    //             stringArray: [
    //                 "AAAAAAAAA",
    //                 "A       A",
    //                 "A       A",
    //                 "A  AAA  A",
    //                 "A  RYR  A",
    //                 "A  AAA  A",
    //                 "A       A",
    //                 "        A",
    //                 "AAAAAAAAA"
    //             ],
    //             charMap: {
    //                 ...defCharMap,
    //                 "Y": Key({ color: colors.yellow }),
    //                 "R": Lock({ color: colors.red})
    //             },
    //             params: {
    //                 scale: 2,
    //                 roomLinks: {
    //                     "(-1, 7)": {
    //                         name: "room2",
    //                         position: Point(8, 7)
    //                     }
    //                 }
    //             }
    //         }
    //     ])
    // }
]);

export default levels