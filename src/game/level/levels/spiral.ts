import { Point } from "../../../utils/Point";
import { Direction } from "../../../utils/enums";
import { RoomLink } from "../../rooms/RoomLink";
import { RoomTemplate } from "../../rooms/RoomTemplate";
import Key from "../../tiles/Key";
import LevelEnd from "../../tiles/LevelEnd";
import Lock from "../../tiles/Lock";
import WallWithMarker from "../../tiles/WallWithMarker";
import colors from "../colors";
import defaultCharMap from "../defaultCharmap";

export default {
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
				...defaultCharMap,
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
				RoomLink.createForTemplate(Point(7, 14),
				{
					name: "down",
					position: Point(7, 0)
				},
				Direction.Down
				),
				
				RoomLink.createForTemplate(Point(7, 0),
				{
					name: "up",
					position: Point(7, 14)
				},
				Direction.Up
				),
				
				RoomLink.createForTemplate(Point(0, 7),
				{
					name: "left",
					position: Point(14, 7)
				},
				Direction.Left
				),
				
				RoomLink.createForTemplate(Point(14, 7),
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
				...defaultCharMap,
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
				...defaultCharMap,
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
				...defaultCharMap,
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
				...defaultCharMap,
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
}