import { Point } from "../../utils/Point";
import { RoomTemplate } from "../rooms/RoomTemplate";
import Key from "../tiles/Key";
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
        name: "level1",
        startingRoom: "start",
        rooms: RoomTemplate.makeTemplates([
            {
                name: "start",
                stringArray: [
                    "AAAAAAAAAA",
                    "A AAAAAAAA",
                    "A AAAAAAAA",
                    "A        A",
                    "A AAAAAA A",
                    "ACAACAAACA",
                    "ACAA     A",
                    "ACAA AAA A",
                    "AAAABAAA A",
                    "AAAAAAAA A"
                ],
                charMap: defCharMap,
                params: {
                    startPos: Point(1, 1),
                    scale: 2,
                    endPositions: {
                        "(8, 10)": {
                            name: "room2",
                            position: Point(8, 0)
                        }
                    }
                }
            },
            
            {
                name: "room2",
                stringArray: [
                    "AAAAAAAA A",
                    "AAA      A",
                    "ABAA AAA A",
                    "AL A ACA A",
                    "AKAA A A A",
                    "AJAA     A",
                    "AC   AAAAA",
                    "AAAA AAAAA",
                    "ACC     BA",
                    "AAAA AAAAA"
                ],
                charMap: {
                    ...defCharMap,
                    "J": Key({ color: 0xFF7700}),
                    "K": Key({ color: 0x55FFAA}),
                    "L": Key({ color: 0x00AAFF})
                },
                params: {
                    startPos: Point(8, 0),
                    scale: 2,
                    endPositions: {
                        "(4, 10)": {
                            name: "room3",
                            position: Point(4, 0)
                        },
                        
                        "(8, -1)": {
                            name: "start",
                            position: Point(8, 9)
                        }
                    }
                }
            },
            
            {
                name: "room3",
                stringArray: [
                    "AAAA AAAAA",
                    "A        A",
                    "A AAAAAA A",
                    "A  C C A A",
                    "A C C CA A",
                    "A  C C A A",
                    "A C C CA A",
                    "A AAAAAA A",
                    "A   A     ",
                    "AAA AAAAAA"
                ],
                charMap: defCharMap,
                params: {
                    startPos: Point(4, 0),
                    scale: 2,
                    endPositions: {
                        "(4, -1)": {
                            name: "room2",
                            position: Point(4, 9)
                        },
        
                        "(3, 10)": {
                            name: "room4",
                            position: Point(1, 0)
                        },
        
                        "(10, 8)": {
                            name: "room6",
                            position: Point(0, 2)
                        }
                    }
                }
            },
        
            {
                name: "room4",
                stringArray: [
                    "A AAA",
                    "A C A",
                    "ALAKA",
                    "A C A",
                    "AAA A"
                ],
                charMap: {
                    ...defCharMap,
                    "K": Lock({ color: 0x55FFAA}),
                    "L": Lock({ color: 0x00AAFF})
                },
                params: {
                    startPos: Point(1, 1),
                    scale: 4,
                    endPositions: {
                        "(1, -1)": {
                            name: "room3",
                            position: Point(3, 9)
                        },
        
                        "(3, 5)": {
                            name: "room5",
                            position: Point(3, 0)
                        }
                    }
                }
            },
        
            {
                name: "room5",
                stringArray: [
                    "AAA A",
                    "A   A",
                    "A AAA",
                    "A   A",
                    "AAA A",
                    "A   A",
                    "A AAA",
                    "ABBBA",
                    "ABBBA",
                    "AAAAA"
                ],
                charMap: defCharMap,
                params: {
                    startPos: Point(3, 1),
                    scale: 2,
                    endPositions: {
                        "(3, -1)": {
                            name: "room4",
                            position: Point(3, 4)
                        }
                    }
                }
            },
        
            {
                name: "room6",
                stringArray: [
                    "AAAAAAAAAA",
                    "ACACACACCA",
                    "  A   ACCA",
                    "A   A   AA",
                    "AAAAAAAAAA"
                ],
                charMap: defCharMap,
                params: {
                    startPos: Point(0, 2),
                    scale: 2,
                    endPositions: {
                        "(-1, 2)": {
                            name: "room3",
                            position: Point(9, 8)
                        }
                    }
                }
            }
        ])
    }
]);

export default levels