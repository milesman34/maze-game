import { Point } from "../../../utils/Point";
import { Direction } from "../../../utils/enums";
import { RoomLink } from "../../rooms/RoomLink";
import { RoomTemplate } from "../../rooms/RoomTemplate";
import LevelEnd from "../../tiles/LevelEnd";
import Portal from "../../tiles/Portal";
import colors from "../colors";
import defaultCharMap from "../defaultCharmap";

export default {
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
                ...defaultCharMap,
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
                RoomLink.createForTemplate(Point(8, 5),
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
                ...defaultCharMap,
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
                RoomLink.createForTemplate(Point(8, 5),
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
                ...defaultCharMap,
                
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
                RoomLink.createForTemplate(Point(8, 5),
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
                ...defaultCharMap,
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
}