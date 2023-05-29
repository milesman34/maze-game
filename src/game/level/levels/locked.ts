import { Point } from "../../../utils/Point";
import { Direction } from "../../../utils/enums";
import { RoomLink } from "../../rooms/RoomLink";
import { RoomTemplate } from "../../rooms/RoomTemplate";
import Key from "../../tiles/Key";
import LevelEnd from "../../tiles/LevelEnd";
import Lock from "../../tiles/Lock";
import Portal from "../../tiles/Portal";
import WallWithMarker from "../../tiles/WallWithMarker";
import colors from "../colors";
import defaultCharMap from "../defaultCharmap";

export default {
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
                ...defaultCharMap,
                "F": Lock({ color: colors.blue, amount: 3 }),
                "G": Portal({ color: colors.lightBlue, destination: {
                    name: "lightbluehub",
                    position: Point(8, 4)
                }}),
                "H": Portal({ color: colors.green, destination: {
                    name: "greenhub",
                    position: Point(4, 10)
                }}),
                "I": Portal({ color: colors.cyan, destination: {
                    name: "cyanhub",
                    position: Point(0, 5)
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
                }, Direction.Left),
                RoomLink.createForTemplate(Point(4, 8), {
                    name: "end",
                    position: Point(2, 0)
                }, Direction.Down)
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
                ...defaultCharMap,
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
                ...defaultCharMap,
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
                ...defaultCharMap,
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
                ...defaultCharMap,
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
                ...defaultCharMap,
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
                }),
                "G": Portal({
                    color: colors.lime,
                    destination: {
                        name: "bonus2",
                        position: Point(4, 4)
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
                ...defaultCharMap
            },
            params: {
                scale: 2
            }
        },
        {
            name: "bonus2",
            stringArray: [
                "   B     ",
                "B       B",
                "     B   ",
                "   B   B ",
                "  B G    ",
                "      B  ",
                "   B     ",
                "B    B   ",
                "  B     B"
            ],
            charMap: {
                ...defaultCharMap,
                "G": Portal({
                    color: colors.lime,
                    destination: {
                        name: "lightbluekeyleft",
                        position: Point(9, 1)
                    }
                })
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
                ...defaultCharMap,
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
                ...defaultCharMap,
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
                ...defaultCharMap,
                "P": Key({ color: colors.pink })
            }
        },
        {
            name: "greenhub",
            stringArray: [
                "   A A   ",
                "   A A   ",
                "   ECG   ",
                "         ",
                "   ECG   ",
                "   ACA   ",
                "   DCF   ",
                "         ",
                "   DCF   ",
                "   A A   ",
                "   APA   "
            ],
            charMap: {
                ...defaultCharMap,
                "P": Portal({
                    color: colors.green,
                    destination: {
                        name: "start",
                        position: Point(4, 0)
                    }
                }),
                "D": WallWithMarker({ color: colors.red }),
                "E": WallWithMarker({ color: colors.orange }),
                "F": WallWithMarker({ color: colors.yellow }),
                "G": WallWithMarker({ color: colors.lime }),
            },
            roomLinks: [
                RoomLink.createForTemplate(Point(4, 0), {
                    name: "greenkey",
                    position: Point(1, 8)
                }, Direction.Up),

                RoomLink.createForTemplate(Point(3, 3), {
                    name: "greenroom1",
                    position: Point(10, 5)
                }, Direction.Left),

                RoomLink.createForTemplate(Point(3, 7), {
                    name: "greenroom2",
                    position: Point(10, 5)
                }, Direction.Left),

                RoomLink.createForTemplate(Point(5, 3), {
                    name: "greenroom3",
                    position: Point(0, 5)
                }, Direction.Right),

                RoomLink.createForTemplate(Point(5, 7), {
                    name: "greenroom4",
                    position: Point(0, 5)
                }, Direction.Right),
            ]
        },
        {
            name: "greenkey",
            stringArray: [
                "AAAAAAAAA",
                "ABBBKBBBA",
                "ADAEAFAGA",
                "AEAFAGADA",
                "AFAGADAEA",
                "A CCCCC A",
                "A AAAAA A",
                "A CCCCC A",
                "A AAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "K": Key({ color: colors.blue }),
                "D": Lock({ color: colors.red }),
                "E": Lock({ color: colors.orange }),
                "F": Lock({ color: colors.yellow }),
                "G": Lock({ color: colors.lime })
            },
            params: {
                scale: 2
            }
        },
        {
            name: "greenroom1",
            stringArray: [
                "AAAAAAAAAAA",
                "AC    CCABA",
                "AACA AAAACA",
                "A CACCACCCA",
                "A AAA ACACA",
                "A CKA   A  ",
                "A AAACAAAAA",
                "AC ABCC  CA",
                "AACAAAAA AA",
                "AC   B   CA",
                "AAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "K": Key({ color: colors.orange })
            }
        },
        {
            name: "greenroom2",
            stringArray: [
                "AAAAAAAAAAA",
                "AAAAAAA   A",
                "ACACBKACACA",
                "ACACAAA ACA",
                "ACACAB  ACA",
                "ACA AAACA  ",
                "ACA  C  ACA",
                "A  CACACACA",
                "A AAAAAAAAA",
                "AC C C B BA",
                "AAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "K": Key({ color: colors.red })
            }
        },
        {
            name: "greenroom3",
            stringArray: [
                "AAAAAAAAAAA",
                "ABCA CAC CA",
                "AACAA C AAA",
                "A  A CAC  A",
                "ACAACAAAACA",
                "  AKCCA C A",
                "ACAAAAA A A",
                "AC  C   ABA",
                "A AAAAACAAA",
                "A CBAC C CA",
                "AAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "K": Key({ color: colors.lime })
            }
        },
        {
            name: "greenroom4",
            stringArray: [
                "AAAAAAAAAAA",
                "ACAAACA C A",
                "ACAK C CACA",
                "ACAAAAAAACA",
                "ACACACA   A",
                "  ACABACACA",
                "A     AAACA",
                "A AAA ABC A",
                "A ABACAAA A",
                "A CCA CCC A",
                "AAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "K": Key({ color: colors.yellow })
            }
        },
        {
            name: "cyanhub",
            stringArray: [
                "AAAAAAAAAAA",
                "ABACCABBAAA",
                "ACACAACCEAA",
                "A A  AAAAAA",
                "A  CCAACCCA",
                "P A AA  AFA",
                "ACACA   AAA",
                "ACA A CCCGA",
                "ACACA AAAAA",
                "ADA B CCCHA",
                "AAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "P": Portal({ color: colors.cyan, destination: {
                    name: "start",
                    position: Point(8, 4)
                }}),
                "D": Portal({ color: colors.blue, destination: {
                    name: "cyanhub",
                    position: Point(8, 2)
                }}),
                "E": Portal({ color: colors.blue, destination: {
                    name: "cyanhub",
                    position: Point(1, 9)
                }}),
                "F": Portal({ color: colors.red, destination: {
                    name: "cyan3",
                    position: Point(7, 9)
                }}),
                "G": Portal({ color: colors.green, destination: {
                    name: "cyan2",
                    position: Point(4, 1)
                }}),
                "H": Portal({ color: colors.yellow, destination: {
                    name: "cyan2",
                    position: Point(2, 1)
                }})
            }
        },
        {
            name: "cyan2",
            stringArray: [
                "AAAAAAAAAAA",
                "ACHAG CC BA",
                "ACAAAAAACAA",
                "ACA AC  C A",
                "A C A ACAIA",
                "A AAACAAAAA",
                "A CBC  CCAA",
                "A AAAAAACCA",
                "A AC L AACA",
                "AMAJAA BB A",
                "AAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "G": Portal({ color: colors.green, destination: {
                    name: "cyanhub",
                    position: Point(9, 7)
                }}),
                "H": Portal({ color: colors.yellow, destination: {
                    name: "cyanhub",
                    position: Point(9, 9)
                }}),
                "I": Portal({ color: colors.purple, destination: {
                    name: "cyan3",
                    position: Point(9, 4)
                }}),
                "J": Portal({ color: colors.magenta2, destination: {
                    name: "cyan3",
                    position: Point(3, 9)
                }}),
                "L": Portal({ color: colors.orange, destination: {
                    name: "cyan3",
                    position: Point(9, 2)
                }}),
                "M": Portal({ color: colors.pink, destination: {
                    name: "cyan3",
                    position: Point(2, 2)
                }})
            }
        },
        {
            name: "cyan3",
            stringArray: [
                "AAAAAAAAAAA",
                "ABCCBA CCCA",
                "AAMAAA ACLA",
                "ACCACACAAAA",
                "AA   C  AIA",
                "AAAACCAAABA",
                "ABAAAAABACA",
                "A   CCC ACA",
                "ACAAACAAABA",
                "ACCJAKAF  A",
                "AAAAAAAAAAA"
            ],
            charMap: {
                ...defaultCharMap,
                "K": Key({ color: colors.blue }),
                "F": Portal({ color: colors.red, destination: {
                    name: "cyanhub",
                    position: Point(9, 5)
                }}),
                "I": Portal({ color: colors.purple, destination: {
                    name: "cyan2",
                    position: Point(9, 4)
                }}),
                "J": Portal({ color: colors.magenta2, destination: {
                    name: "cyan2",
                    position: Point(3, 9)
                }}),
                "L": Portal({ color: colors.orange, destination: {
                    name: "cyan2",
                    position: Point(5, 8)
                }}),
                "M": Portal({ color: colors.pink, destination: {
                    name: "cyan2",
                    position: Point(1, 9)
                }})
            }
        },
        {
            name: "end",
            stringArray: [
                "AA AA",
                "ABBBA",
                "ABEBA",
                "ABBBA",
                "AAAAA"
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