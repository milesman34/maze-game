import { Point } from "../../utils/Point";
import { Direction } from "../../utils/enums";
import { RoomLink } from "../rooms/RoomLink";
import { RoomTemplate } from "../rooms/RoomTemplate";
import Key from "../tiles/Key";
import LevelEnd from "../tiles/LevelEnd";
import Lock from "../tiles/Lock";
import Portal from "../tiles/Portal";
import WallWithMarker from "../tiles/WallWithMarker";
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
    },

    {
        name: "spiral",
        startingRoom: "hub",
        rooms: RoomTemplate.makeTemplates([
            {
                name: "hub",
                stringArray: [
                    "AAAAAAL LAAAAAA",
                    "AC           CA",
                    "A AAAAAAAAAAA A",
                    "A AC   F   CA A",
                    "A A AAAAAAA A A",
                    "A A AB   BA A A",
                    "M A A AAA A A K",
                    "  AGA AEA AIA  ",
                    "M A A A A A A K",
                    "A A AB BA A A A",
                    "A A AAAAA A A A",
                    "A AC   H BA A A",
                    "A AAAAAAAAA A A",
                    "AC           CA",
                    "AAAAAAJ JAAAAAA",
                ],
                charMap: {
                    ...defCharMap,
                    "E": LevelEnd(),
                    "F": Lock({ color: colors.blue }),
                    "G": Lock({ color: colors.red }),
                    "H": Lock({ color: colors.green }),
                    "I": Lock({ color: colors.yellow }),
                    "J": WallWithMarker({ color: colors.blue }),
                    "K": WallWithMarker({ color: colors.green }),
                    "L": WallWithMarker({ color: colors.red }),
                    "M": WallWithMarker({ color: colors.yellow })
                },
                params: {
                    startPos: Point(7, 1),
                    scale: 1
                },
                roomLinks: [
                    RoomLink.createForTemplate(
                        Point(7, 14),
                        {
                            name: "down",
                            position: Point(7, 0)
                        },
                        Direction.Down
                    ),

                    RoomLink.createForTemplate(
                        Point(7, 0),
                        {
                            name: "up",
                            position: Point(7, 14)
                        },
                        Direction.Up
                    ),

                    RoomLink.createForTemplate(
                        Point(0, 7),
                        {
                            name: "left",
                            position: Point(14, 7)
                        },
                        Direction.Left
                    ),

                    RoomLink.createForTemplate(
                        Point(14, 7),
                        {
                            name: "right",
                            position: Point(0, 7)
                        },
                        Direction.Right
                    )
                ]
            },

            {
                name: "down",
                stringArray: [
                    "AAAAAAA AAAAAAA",
                    "ACC          CA",
                    "AAA AAAAAAAAACA",
                    "A   CACA     CA",
                    "ACAAAA H AA AAA",
                    "A  ACC ACACCCAA",
                    "AACABA A ACCCAA",
                    "A  ABACGCACCCAA",
                    "ACAAAAAA AA AAA",
                    "A CC CCACAC CCA",
                    "AAAA AAA AAAAIA",
                    "A    A   A    A",
                    "ABAAAABAAA BB A",
                    "A   F  CCA    A",
                    "AAAAAAAAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "F": Key({color: colors.blue}),
                    "G": Lock({color: colors.red}),
                    "H": Lock({color: colors.yellow}),
                    "I": Lock({color: colors.green})
                },
                params: {
                    scale: 1
                }
            },

            {
                name: "up",
                stringArray: [
                    "AAAAAAAAAAAAAAA",
                    "ACCC     BBBABA",
                    "AA AAAAAABBBACA",
                    "A B A AFAAGAACA",
                    "ACBCA C ABCBACA",
                    "A B HCACACBCA A",
                    "AAAAA C ABCBA A",
                    "ABC   AAAAIAA A",
                    "AAACA     CCC A",
                    "A  CACAAACAAA A",
                    "A AAACAAACA   A",
                    "ACAAACAAACACAAA",
                    "A AAA     A  CA",
                    "A         AAABA",
                    "AAAAAAA AAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "F": Key({color: colors.red}),
                    "G": Lock({color: colors.blue}),
                    "H": Lock({color: colors.yellow}),
                    "I": Lock({color: colors.green})
                },
                params: {
                    scale: 1
                }
            },

            {
                name: "right",
                stringArray: [
                    "AAAAAAAAAAAAAAA",
                    "ABBBBAAAA     A",
                    "ABBBB   IBAAABA",
                    "AHAAAAAAA     A",
                    "ACCA  CBAAAAACA",
                    "ACCA AAAAF   CA",
                    "A AA C CAAAAACA",
                    "    C AAA     A",
                    "A AA C CA AAAAA",
                    "ACCA AAAA CABCA",
                    "AA A  CC  AAABA",
                    "ACCA  AA  CGBCA",
                    "A AA  CC AAAABA",
                    "ACBACAAACCCABCA",
                    "AAAAAAAAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "F": Key({color: colors.green}),
                    "G": Lock({color: colors.red}),
                    "H": Lock({color: colors.yellow}),
                    "I": Lock({color: colors.blue})
                },
                params: {
                    scale: 1
                }
            },

            {
                name: "left",
                stringArray: [
                    "AAAAAAAAAAAAAAA",
                    "ACC CCA     CCA",
                    "AAACABA B AAACA",
                    "ABACAAACBCAC  A",
                    "A     A B AIAAA",
                    "AAAAACA   AC  A",
                    "ACBCACAAAAAAACA",
                    "ABBBH CCCCC    ",
                    "ACBCACAAAAACAAA",
                    "AAAAACA   A  CA",
                    "ACCC  A B AAAGA",
                    "AACAAAACBCA  CA",
                    "AA   AA B ACAAA",
                    "ABCACFA     CCA",
                    "AAAAAAAAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "F": Key({color: colors.yellow}),
                    "G": Lock({color: colors.red}),
                    "H": Lock({color: colors.blue}),
                    "I": Lock({color: colors.green})
                },
                params: {
                    scale: 1
                }
            }
        ])
    },

    {
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
                    ...defCharMap,
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
]);

export default levels