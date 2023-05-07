import { Point } from "../Point";
import { blueCoin, standardCoin, standardWall } from "../tiles/tileTemplates";
import LevelTemplate from "./LevelTemplate";

// Default charmap
const defCharMap = {
    "A": standardWall,
    "B": blueCoin,
    "C": standardCoin
}

// This object maps a string/number to level objects
const levels = LevelTemplate.makeTemplates([
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
                    name: "level2",
                    position: Point(8, 0)
                }
            }
        }
    },
    
    {
        name: "level2",
        stringArray: [
            "AAAAAAAA A",
            "AAA      A",
            "ABAA AAA A",
            "A  A ACA A",
            "A AA A A A",
            "A AA     A",
            "AC   AAAAA",
            "AAAA AAAAA",
            "ACC     BA",
            "AAAA AAAAA"
        ],
        charMap: defCharMap,
        params: {
            startPos: Point(8, 0),
            scale: 2,
            endPositions: {
                "(4, 10)": {
                    name: "level3",
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
        name: "level3",
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
                    name: "level2",
                    position: Point(4, 9)
                },

                "(3, 10)": {
                    name: "level4",
                    position: Point(1, 0)
                },

                "(10, 8)": {
                    name: "level6",
                    position: Point(0, 2)
                }
            }
        }
    },

    {
        name: "level4",
        stringArray: [
            "A AAA",
            "A C A",
            "ACACA",
            "A C A",
            "AAA A"
        ],
        charMap: defCharMap,
        params: {
            startPos: Point(1, 1),
            scale: 4,
            endPositions: {
                "(1, -1)": {
                    name: "level3",
                    position: Point(3, 9)
                },

                "(3, 5)": {
                    name: "level5",
                    position: Point(3, 0)
                }
            }
        }
    },

    {
        name: "level5",
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
                    name: "level4",
                    position: Point(3, 4)
                }
            }
        }
    },

    {
        name: "level6",
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
                    name: "level3",
                    position: Point(9, 8)
                }
            }
        }
    }
]);

export default levels;