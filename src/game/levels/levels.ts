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
    purple: 0xB600FF,
    cyan: 0x009583,
    magenta: 0xFF00FF,
    pink: 0xF499FF,
    orange: 0xFFAA00,
    lime: 0x97FF00,
    magenta2: 0xFF009B
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
    },

    {
        name: "portal test 2",
        startingRoom: "start",
        rooms: RoomTemplate.makeTemplates([
            {
                name: "start",
                stringArray: [
                    "AAAAAAAAA",
                    "A CCC  FA",
                    "A AAA AAA",
                    "A  C   GA",
                    "AAABAAAAA",
                    "A        ",
                    "ACAAACACA",
                    "ACCIACACA",
                    "AAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "F": Portal({ color: colors.blue, destination: {
                        name: "room1",
                        position: Point(4, 2)
                    }}),

                    "G": Portal({ color: colors.red, destination: {
                        name: "room2",
                        position: Point(4, 7)
                    }}),

                    "I": Portal({ color: colors.green, destination: {
                        name: "room3",
                        position: Point(3, 1)
                    }})
                },
                params: {
                    scale: 2,
                    startPos: Point(1, 1)
                },
                roomLinks: [
                    RoomLink.createForTemplate(
                        Point(8, 5),
                        {
                            name: "room1",
                            position: Point(0, 5)
                        },
                        Direction.Right
                    )
                ]
            },

            {
                name: "room1",
                stringArray: [
                    "AAAAAAAAA",
                    "AAAAAAAAA",
                    "AAAAFAAAA",
                    "AAAACAAAA",
                    "AAAACAAAA",
                    "   CCC   ",
                    "ACAAAAACA",
                    "A  BHB  A",
                    "AAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "F": Portal({ color: colors.blue, destination: {
                        name: "start",
                        position: Point(7, 1)
                    }}),

                    "H": Portal({ color: colors.yellow, destination: {
                        name: "room3",
                        position: Point(4, 3)
                    }})
                },
                params: {
                    scale: 2,
                    startPos: Point(1, 1)
                },
                roomLinks: [
                    RoomLink.createForTemplate(
                        Point(8, 5),
                        {
                            name: "room2",
                            position: Point(0, 5)
                        },
                        Direction.Right
                    )
                ]
            },

            {
                name: "room2",
                stringArray: [
                    "AAAAAAAAA",
                    "AAAAKAAAA",
                    "AAAACAAAA",
                    "AAAACAAAA",
                    "A   B   A",
                    "   ACA   ",
                    "A  ACA  A",
                    "ACCAGACCA",
                    "AAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,

                    "G": Portal({ color: colors.red, destination: {
                        name: "start",
                        position: Point(7, 3)
                    }}),
                    
                    "K": Portal({ color: colors.purple, destination: {
                        name: "room3",
                        position: Point(5, 1)
                    }})
                },
                params: {
                    scale: 2,
                    startPos: Point(1, 1)
                },
                roomLinks: [
                    RoomLink.createForTemplate(
                        Point(8, 5),
                        {
                            name: "room3",
                            position: Point(0, 5)
                        },
                        Direction.Right
                    )
                ]
            },

            {
                name: "room3",
                stringArray: [
                    "AAAAAAAAA",
                    "AAAI KAAA",
                    "ABAAAAABA",
                    "ACAAHAACA",
                    "A AA AA A",
                    "  AAEAA A",
                    "A AAAAA A",
                    "A  CCC  A",
                    "AAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "E": LevelEnd(),
                    "H": Portal({ color: colors.yellow, destination: {
                        name: "room1",
                        position: Point(4, 7)
                    }}),

                    "I": Portal({ color: colors.green, destination: {
                        name: "start",
                        position: Point(3, 7)
                    }}),

                    "K": Portal({ color: colors.purple, destination: {
                        name: "room2",
                        position: Point(4, 1)
                    }})
                },
                params: {
                    scale: 2,
                    startPos: Point(1, 1)
                }
            }
        ])
    },

    {
        name: "locked",
        startingRoom: "start",
        rooms: RoomTemplate.makeTemplates([
            {
                name: "start",
                stringArray: [
                    "AAALHLAAA",
                    "A       A",
                    "A       A",
                    "K       M",
                    "G       I",
                    "K       M",
                    "A       A",
                    "A       A",
                    "AAAJFJAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "F": Lock({ color: colors.blue, amount: 3 }),
                    "G": Portal({ color: colors.lightBlue, destination: {
                        name: "lightbluehub",
                        position: Point(8, 4)
                    }}),
                    "H": Portal({ color: colors.green, destination: {
                        name: "start",
                        position: Point(4, 4)
                    }}),
                    "I": Portal({ color: colors.cyan, destination: {
                        name: "start",
                        position: Point(4, 4)
                    }}),
                    "J": WallWithMarker({ color: colors.blue }),
                    "K": WallWithMarker({ color: colors.lightBlue }),
                    "L": WallWithMarker({ color: colors.green }),
                    "M": WallWithMarker({ color: colors.cyan })
                },
                params: {
                    scale: 2,
                    startPos: Point(4, 4)
                },
                roomLinks: [
                    RoomLink.createForTemplate(Point(0, 4), {
                        name: "bonus1",
                        position: Point(6, 3)
                    }, Direction.Left)
                ]
            },
            {
                name: "lightbluehub",
                stringArray: [
                    "AAAK KAAA",
                    "ACCA ACCA",
                    "ACC   CCA",
                    "AAAA AAAA",
                    "AIHG CC F",
                    "AAAA AAAA",
                    "ACC   CCA",
                    "ACCA ACCA",
                    "AAAL LAAA",
                ],
                charMap: {
                    ...defCharMap,
                    "F": Portal({ color: colors.lightBlue, destination: {
                        name: "start",
                        position: Point(0, 4)
                    }}),
                    "G": Lock({ color: colors.lightBlue }),
                    "H": Lock({ color: colors.magenta }),
                    "I": Key({ color: colors.blue }),
                    "K": WallWithMarker({ color: colors.lightBlue }),
                    "L": WallWithMarker({ color: colors.magenta })
                },
                params: {
                    scale: 2
                },
                roomLinks: [
                    RoomLink.createForTemplate(Point(4, 0), {
                        name: "lightbluekeyhub",
                        position: Point(7, 14)
                    }, Direction.Up),
                    RoomLink.createForTemplate(Point(4, 8), {
                        name: "magentakey",
                        position: Point(7, 0)
                    }, Direction.Down)
                ]
            },
            {
                name: "lightbluekeyhub",
                stringArray: [
                    "AAAAAAA AAAAAAA",
                    "A  CCC  ACCC  A",
                    "ACAAAAA AACAACA",
                    "A ACCC  A  ABBA",
                    "ACAAAAABACAAAAA",
                    "A            BA",
                    "AAAACAAAAACA AA",
                    "     APKQACACC ",
                    "ACAAAAAAAACACCA",
                    "A     A ACCAAAA",
                    "AAA ACA       A",
                    "ACCCACACACACACA",
                    "AA AAAA AAA A A",
                    "A  C  C CCABABA",
                    "AAAAAAA AAAAAAA",
                ],
                charMap: {
                    ...defCharMap,
                    "K": Key({ color: colors.lightBlue }),
                    "P": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyright",
                            position: Point(9, 4)
                        }
                    }),
                    "Q": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyright",
                            position: Point(9, 6)
                        }
                    })
                },
                roomLinks: [
                    RoomLink.createForTemplate(Point(14, 7), {
                        name: "lightbluekeyright",
                        position: Point(0, 5)
                    }, Direction.Right),
                    RoomLink.createForTemplate(Point(7, 0), {
                        name: "lightbluekeyup",
                        position: Point(5, 10)
                    }, Direction.Up),
                    RoomLink.createForTemplate(Point(0, 7), {
                        name: "lightbluekeyleft",
                        position: Point(10, 5)
                    }, Direction.Left)
                ]
            },
            {
                name: "lightbluekeyright",
                stringArray: [
                    "AAAAAAAAAAA",
                    "ACC   A C A",
                    "AAA A ACACA",
                    "A CCA C ACA",
                    "A A AAA APA",
                    "  A  CACAAA",
                    "A A A A AQA",
                    "ACCCACAAACA",
                    "AAAAA A   A",
                    "ABC C   ACA",
                    "AAAAAAAAAAA",
                ],
                charMap: {
                    ...defCharMap,
                    "P": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyhub",
                            position: Point(6, 7)
                        }
                    }),
                    "Q": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyhub",
                            position: Point(8, 7)
                        }
                    })
                }
            },
            {
                name: "lightbluekeyup",
                stringArray: [
                    "AAAAAAAAAAA",
                    "A  CPAQC  A",
                    "A AAAAAAA A",
                    "ACA CBC ACA",
                    "ACA AAA ACA",
                    "A A     A A",
                    "A  CACAC  A",
                    "ACAAACAAACA",
                    "ACACACACACA",
                    "ABA     ABA",
                    "AAAAA AAAAA",
                ],
                charMap: {
                    ...defCharMap,
                    "P": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyleft",
                            position: Point(1, 4)
                        }
                    }),
                    "Q": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyleft",
                            position: Point(1, 6)
                        }
                    })
                }
            },
            {
                name: "lightbluekeyleft",
                stringArray: [
                    "AAAAAAAAAAA",
                    "ABC     LGA",
                    "ACAAACAAAAA",
                    "ACA   A C A",
                    "APCCACACACA",
                    "AAAAAC  A  ",
                    "AQCCACAAACA",
                    "ACACA   ACA",
                    "A   AAA AAA",
                    "ABA CCC CBA",
                    "AAAAAAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "L": Lock({ color: colors.lime }),
                    "P": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyup",
                            position: Point(4, 1)
                        }
                    }),
                    "Q": Portal({
                        color: colors.lightBlue,
                        destination: {
                            name: "lightbluekeyup",
                            position: Point(6, 1)
                        }
                    })
                }
            },
            {
                name: "bonus1",
                stringArray: [
                    "AAAAAAA",
                    "A  B  A",
                    "A BBB A",
                    "ABBBBB ",
                    "A BBB A",
                    "A  B  A",
                    "AAAAAAA",
                ],
                charMap: {
                    ...defCharMap
                },
                params: {
                    scale: 2
                }
            },
            {
                name: "magentakey",
                stringArray: [
                    "AAAAAAA AAAAAAA",
                    "ACA  CA  ACCBBA",
                    "ACCCA C  ACAAAA",
                    "AAAAAAA    ACCA",
                    "M C A CCAAAAACA",
                    " CCCA AAA B ABA",
                    "M C ACCCABKBABA",
                    "AMPMAAA A B ABA",
                    "ACC     AAQAA A",
                    "AAA CAC  C A  A",
                    "AC CAAAC A   AA",
                    "AACAA AA A C CA",
                    "A CCAAAC A AAAA",
                    "ACA CAC  A C CA",
                    "AAAAAAL LAAAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "P": Lock({ color: colors.pink }),
                    "Q": Lock({ color: colors.purple }),
                    "K": Key({ color: colors.magenta }),
                    "L": WallWithMarker({ color: colors.pink }),
                    "M": WallWithMarker({ color: colors.purple })
                },
                roomLinks: [
                    RoomLink.createForTemplate(Point(7, 14), {
                        name: "pinkkey",
                        position: Point(5, 0)
                    }, Direction.Down),
                    RoomLink.createForTemplate(Point(0, 5), {
                        name: "purplekey",
                        position: Point(10, 5)
                    }, Direction.Left)
                ]
            },
            {
                name: "purplekey",
                stringArray: [
                    "AAAAAAAAAAA",
                    "A C C ACACA",
                    "A A A A C A",
                    "ACACACACACA",
                    "APABA CCA A",
                    "ACACAAAAA  ",
                    "A ABA ACA A",
                    "A AAACA CCA",
                    "ACAC  AAA A",
                    "A C A CBC A",
                    "AAAAAAAAAAA",
                ],
                charMap: {
                    ...defCharMap,
                    "P": Key({ color: colors.purple })
                }
            },
            {
                name: "pinkkey",
                stringArray: [
                    "AAAAA AAAAA",
                    "AB CACACCCA",
                    "AAA   CCACA",
                    "A  CACAAAAA",
                    "A AAACA   A",
                    "ABA C C ACA",
                    "ACA AAAAABA",
                    "A C APC   A",
                    "ACAAAAA AAA",
                    "A CCC C CBA",
                    "AAAAAAAAAAA",
                ],
                charMap: {
                    ...defCharMap,
                    "P": Key({ color: colors.pink })
                }
            }
        ])
    }
]);

export default levels