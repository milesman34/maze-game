import Point from "../Point";
import { blueCoin, standardCoin, standardWall } from "../tiles/tileTemplates";
import LevelTemplate from "./LevelTemplate";

// Default charmap
const defCharmap = {
    "A": standardWall,
    "B": blueCoin,
    "C": standardCoin
}

// This object maps a string/number to level objects
const levels = {
    "start": LevelTemplate(
        [
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
        defCharmap,
        {
            startPos: Point(1, 1),
            scale: 2,
            endPositions: {
                "(8, 9)": {
                    name: "level2",
                    position: Point(8, 0)
                }
            }
        }
    ),

    "level2": LevelTemplate(
        [
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
        defCharmap,
        {
            startPos: Point(8, 0),
            scale: 2,
            endPositions: {
                "(4, 9)": {
                    name: "level3",
                    position: Point(4, 0)
                }
            } 
        }
    ),

    "level3": LevelTemplate(
        [
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
        defCharmap,
        {
            startPos: Point(4, 0),
            scale: 2 
        }
    )
}

export default levels;