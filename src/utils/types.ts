import Tile from "../game/tiles/Tile";

// Hex color type
type Color = number;

type IterateFunction = (object: Tile, x: number, y: number) => void;

export { Color, IterateFunction }